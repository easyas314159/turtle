import sys
import signal
import logging
import argparse
import tempfile

from functools import partial
from contextlib import ExitStack

from tornado import ioloop, locks

def get_cli_arguments():
	parser = argparse.ArgumentParser()

	parser.add_argument('--tmp-dir', default=None, help='')

	return parser.parse_args()

async def main():
	args = get_cli_arguments()

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

		# Wait for shutdown
		await stopped.wait()
		logging.info('Starting shutdown')

def exit_handler(sig, frame, callback=None):
	if callback:
		ioloop.IOLoop.current().add_callback_from_signal(callback)

if __name__ == '__main__':
	ioloop.IOLoop.current().run_sync(main)
