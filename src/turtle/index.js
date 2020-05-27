export function compile(file) {
	let fileReader = new FileReader();

	return new Promise((resolve, reject) => {
		fileReader.onload = function (evt) {
			resolve(programFromSource(evt.target.result));
		};
		fileReader.onerror = function (evt) {
			console.log(evt);
			reject();
		};
		fileReader.readAsText(file);
	});
};

function programFromSource(cmds) {
	let errors = [];

	// Remove any invalid characters
	let instructionsOriginal = cmds.toUpperCase().replace(/[^FLR]/g, '');
	if(cmds.length != instructionsOriginal.length) {
		let invalid = cmds.length - instructionsOriginal.length;
		errors.push(`Removed ${invalid} commands`);
	}

	let instructionsOptimized = instructionsOriginal;

	// Convert all left turns to right turns and remove all blocks of 4 right turns
	instructionsOptimized = instructionsOptimized.replace(/L/g, 'RRR');
	instructionsOptimized = instructionsOptimized.replace(/RRRR/g, '');

	let path = computePath(instructionsOptimized);

	return {
		instructionsOriginal,
		instructionsOptimized,
		path,
		errors,
	};
}

function computePath(cmds) {
	let path = [[0, 0]];

	let x = 0, y = 0, dx = 0, dy = 1;
	for (let cmd of cmds.matchAll(/(F+|R+)/g)) {
		cmd = cmd[0];
		let d = cmd.length;

		switch(cmd[0]) {
			case 'F':
				x += d * dx;
				y += d * dy;

				path.push([x, y]);

				break;
			case 'L':
				[dx, dy] = [-dy, dx];
				break;
			case 'R':
				[dx, dy] = [dy, -dx];
				break;
		}
	}

	return path;
}
