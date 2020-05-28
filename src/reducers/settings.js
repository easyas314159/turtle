import {SETTINGS_CHANGE} from '../actions/settings.js';

const initialState = {
	showStart: true,
	showEnd: true,
	showPath: true,
	showIntersections: true,
	showOverlap: true,
};

export default (state=initialState, action) => {
	switch (action.type) {
	case SETTINGS_CHANGE:
		return Object.assign({}, state, action.settings);
	default:
		return state;
	}
};
