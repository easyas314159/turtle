import os
import sys
import time
import signal
import logging
import argparse
import tempfile

from functools import partial
from contextlib import ExitStack

from tornado import httpserver, ioloop, locks, web

from app import create_application

def get_cli_arguments():
	parser = argparse.ArgumentParser()

	parser.add_argument('--tmp-dir', default=None, help='')
	parser.add_argument('--debug', default=False, action='store_true')

	parser.add_argument('-I', '--if', dest='interface', default='127.0.0.1', help='')
	parser.add_argument('-p', '--port', type=int, default=8080, help='')

	return parser.parse_args()

async def main():
	args = get_cli_arguments()

	# Configure logging
	logging.getLogger().setLevel(logging.DEBUG if args.debug else logging.INFO)

	# Setup shutdown signal handlers
	stopped = locks.Event()
	shutdown_handler = partial(exit_handler, callback=lambda: stopped.set())

	signal.signal(signal.SIGINT, shutdown_handler)
	signal.signal(signal.SIGTERM, shutdown_handler) # Include SIGTERM so we play nice with docker

	with ExitStack() as stack:
		if args.tmp_dir is None:
			# Create a remporary directory and add it to the context so it gets cleaned up
			args.tmp_dir = stack.enter_context(tempfile.TemporaryDirectory())
		else:
			# Ensure the passed temporary directory exists
			os.makedirs(args.tmp_dir, exist_ok=True)

		# Create the application and start the web server
		app = create_application(args)
		server = httpserver.HTTPServer(app)
		server.listen(args.port, args.interface)

		logging.info('Listening on %s:%d', args.interface, args.port)

		# Wait for shutdown
		await stopped.wait()
		logging.info('Starting shutdown')

		elapsed = time.time()

		server.stop()

		elapsed = time.time() - elapsed
		logging.info('Shutdown completed in %.3fs', elapsed)

def exit_handler(sig, frame, callback=None):
	if callback:
		ioloop.IOLoop.current().add_callback_from_signal(callback)

if __name__ == '__main__':
	# Logging config needs to happen before the tornado ioloop
	# starts or tornado will hijack the logging config
	# See: https://github.com/tornadoweb/tornado/blob/stable/tornado/ioloop.py#L445
	logging.basicConfig(
		stream=sys.stderr,
		format='%(asctime)s %(name)s %(levelname)s - %(message)s',
	)
	logging.getLogger('py.warnings').setLevel(logging.ERROR)
	logging.captureWarnings(True)

	ioloop.IOLoop.current().run_sync(main)
