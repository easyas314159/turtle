import assert from 'assert';

import {programFromSource, computePath, computeSelfIntersections, intersectLines} from './index.js';

describe('turtle', () => {
	describe('programFromSource', () => {
		const cases = [
			['LR', {
				instructionsOriginal: 'LR',
				instructionsOptimized: '',
				path: [[0, 0]],
				intersections: [],
				errors: [],
			}],
			['FLbadRF', {
				instructionsOriginal: 'FLRF',
				instructionsOptimized: 'FF',
				path: [[0, 0], [0, 2]],
				intersections: [],
			}],
			['FLFRFFLFLFLFFRFLF', {
				instructionsOriginal: 'FLFRFFLFLFLFFRFLF',
				instructionsOptimized: 'FRRRFRFFRRRFRRRFRRRFFRFRRRF',
				path: [[0, 0], [0, 1], [-1, 1], [-1, 3], [-2, 3], [-2, 2], [0, 2], [0, 1], [1, 1]],
				intersections: [[-1, 2], [0, 1], [0, 1]],
				errors: [],
			}],
		];

		cases.forEach(([input, expect], index) => {
			describe(input, () => {
				let actual;

				before(() => {
					actual = programFromSource(input);
				});

				Object.keys(expect).forEach((key) => {
					it(key, () => {
						assert.deepStrictEqual(actual[key], expect[key]);
					})
				});
			})
		});
	});

	describe('intersectLines', () => {
		const cases = [
			[[[0, 0], [0, 1]], [[0, 0], [0, 1]], [[0, 0], [0, 1]]],
			[[[0, 0], [1, 0]], [[0, 0], [1, 0]], [[0, 0], [1, 0]]],
			[[[-1, 0], [1, 0]], [[0, -1], [0, 1]], [0, 0]],
		];

		cases.forEach(([l0, l1, expect], index) => {
			it(`${l0} ${l1}`, () => {
				assert.deepStrictEqual(intersectLines(l0, l1), expect);
			});
		})
	});
});
