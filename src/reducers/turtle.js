import {TURTLE_OPEN} from '../actions/turtle.js';

const initialState = {
};

export default (state=initialState, action) => {
	switch (action.type) {
	case TURTLE_OPEN:
		return Object.assign({}, state, action.program);
	default:
		return state;
	}
};
