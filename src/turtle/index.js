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

export function programFromSource(cmds) {
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

export function computePath(cmds) {
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
			for (let _ = 0; _ < d; _++) {
				[dx, dy] = [-dy, dx];
			}
			break;
		case 'R':
			for (let _ = 0; _ < d; _++) {
				[dx, dy] = [dy, -dx];
			}
			break;
		}
	}

	return path;
}

export function computeSelfIntersections(path) {
	const lines = [];
	for (let idx = 1; idx < path.length; idx++) {
		let p0 = path[idx-1];
		let p1 = path[idx];

		if (p0[0] > p1[0]) {
			[p0, p1] = [p1, p0];
		}
		if (p0[1] > p1[1]) {
			[p0, p1] = [p1, p0];
		}

		lines.push([p0, p1]);
	}

	const intersections = [];
	for (let curr = 1; curr < lines.length; curr++) {
		const l0 = lines[curr];

		for (let prev = 0; prev < curr; prev++) {
			const l1 = lines[prev];

			const isec = intersectLines(l0, l1);
			if(isec && !(curr - prev == 1 && typeof isec[0] === 'number')) {
				intersections.push(isec);
			}
		}
	}

	return intersections;
}

export function intersectLines(l0, l1) {
	if (l0[0][0] == l0[1][0] && l1[0][0] == l1[1][0]) {
		// Handle vertical lines with the same x coordinate
		if (l0[0][0] == l1[0][0]) {
			const y0 = Math.max(l0[0][1], l1[0][1]);
			const y1 = Math.min(l0[1][1], l1[1][1]);

			if (y0 < y1) {
				return [[l0[0][0], y0], [l0[0][0], y1]];
			}
		}
	} else if (l0[0][1] == l0[1][1] && l1[0][1] == l1[1][1]) {
		// Handle horizontal lines with the same y coordinate
		if (l0[0][1] == l1[0][1]) {
			const x0 = Math.max(l0[0][0], l1[0][0]);
			const x1 = Math.min(l0[1][0], l1[1][0]);

			if (x0 < x1) {
				return [[x0, l0[0][1]], [x1, l0[0][1]]];
			}
		}
	} else {
		// Handle lines at right angles to each other
		if (l0[0][1] == l0[1][1]) {
			// Make sure l0 is always the vertical line and l1 is always the horizontal line
			[l0, l1] = [l1, l0];
		}

		if (l1[0][0] <= l0[0][0] && l0[0][0] <= l1[1][0] && l0[0][1] <= l1[0][1] && l1[0][1] <= l0[1][1]) {
			return [l0[0][0], l1[0][1]];
		}
	}
}
