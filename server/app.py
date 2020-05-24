import os
import logging

from tornado import web

def create_application(args):
	static_resources = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

	logging.debug('Serving static resources from: %s', static_resources)
	logging.debug('Serving rendered results from: %s', args.tmp_dir)

	return web.Application(
		[
			('/', web.RedirectHandler, {'url': '/index.html'}),
			(r'/turtle/(.*\.svg)', web.StaticFileHandler, {'path': args.tmp_dir}),
			(r'/(.*)', web.StaticFileHandler, {'path': static_resources}),
		],
		compress_response=True,
		debug=args.debug,
	)
