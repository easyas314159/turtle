import {compile} from '../turtle';

export const TURTLE_OPEN = 'turtle/open';

export const loadProgram = (file) => (dispatch) => {
	compile(file)
		.catch(() => ({errors: [`Failed to load file: ${file.name}`]}))
		.then((program) => dispatch({type: TURTLE_OPEN, program}))
	;
};
