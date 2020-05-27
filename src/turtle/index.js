export function compile(file) {
	const fileReader = new FileReader();

	return new Promise((resolve, reject) => {
		fileReader.onload = function(evt) {
			resolve(programFromSource(evt.target.result));
		};
		fileReader.onerror = function(evt) {
			console.log(evt);
			reject(Error());
		};
		fileReader.readAsText(file);
	});
}

function programFromSource(cmds) {
	const errors = [];

	// Remove any invalid characters
	const instructionsOriginal = cmds.toUpperCase().replace(/[^FLR]/g, '');
	if (cmds.length != instructionsOriginal.length) {
		const invalid = cmds.length - instructionsOriginal.length;
		errors.push(`Removed ${invalid} commands`);
	}

	let instructionsOptimized = instructionsOriginal;

	// Convert all left turns to right turns and remove all blocks of 4 right turns
	instructionsOptimized = instructionsOptimized.replace(/L/g, 'RRR');
	instructionsOptimized = instructionsOptimized.replace(/RRRR/g, '');

	const path = computePath(instructionsOptimized);
	const intersections = computeSelfIntersections(path);

	return {
		instructionsOriginal,
		instructionsOptimized,
		path,
		intersections,
		errors,
	};
}

function computePath(cmds) {
	const path = [[0, 0]];

	let x = 0; let y = 0; let dx = 0; let dy = 1;
	for (let cmd of cmds.matchAll(/(F+|R+)/g)) {
		cmd = cmd[0];
		const d = cmd.length;

		switch (cmd[0]) {
		case 'F':
			x += d * dx;
			y += d * dy;

			path.push([x, y]);

			break;
		case 'L':
			for (let _ = 0; _ < d ; _++) {
				[dx, dy] = [-dy, dx];
			}
			break;
		case 'R':
			for (let _ = 0; _ < d ; _++) {
				[dx, dy] = [dy, -dx];
			}
			break;
		}
	}

	return path;
}

function computeSelfIntersections(path) {
	const hl = [], vl = [];

	// Split the lines into sets of horizontal and vertical
	// Flip horizontal lines so they are drawn left to right
	// Flip horizontal lines so they are drawn bottom to top
	for (let idx = 1; idx < path.length; idx++) {
		let p0 = path[idx-1];
		let p1 = path[idx];

		if(p0[0] == p1[0]) {
			if(p0[1] > p1[1]) {
				[p0, p1] = [p1, p0];
			}
			vl.push([p0, p1]);
		}

		if(p0[1] == p1[1]) {
			if(p0[0] > p1[0]) {
				[p0, p1] = [p1, p0];
			}
			hl.push([p0, p1]);
		}
	}

	// Sort vertical lines left to right and horizontal lines bottom to top
	vl.sort((a, b) => a[0][0] - b[0][0]);
	hl.sort((a, b) => a[0][1] - b[0][1]);

	let isec = []
	for (let vidx = 0; vidx < vl.length; vidx++) {
		const lv = vl[vidx];

		for (let hidx = 0; hidx < hl.length; hidx++) {
			const lh = hl[hidx];

			if(lh[0][1] <= lv[0][1]) {
				continue;
			} else if(lv[1][1] <= lh[0][1]) {
				break
			} else if(lh[0][0] < lv[0][0] && lv[0][0] < lh[1][0]) {
				isec.push([lv[0][0], lh[0][1]]);
			}
		}
	}

	return isec;
}
