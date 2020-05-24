import argparse

from tornado import ioloop

def get_cli_arguments():
	parser = argparse.ArgumentParser()

	return parser.parse_args()

async def main():
	args = get_cli_arguments()

if __name__ == '__main__':
	ioloop.IOLoop.current().run_sync(main)
