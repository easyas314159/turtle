export const TURTLE_OPEN = 'turtle/open';

export const loadProgram = (file) => (dispatch) => {
	dispatch({type: TURTLE_OPEN, program: {}});
};
