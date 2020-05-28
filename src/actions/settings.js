export const SETTINGS_CHANGE = 'settings/change';

export const changeSettings = (settings) => (dispatch) => {
	dispatch({type: SETTINGS_CHANGE, settings});
};
