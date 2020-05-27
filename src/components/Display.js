import React from 'react';
import {connect} from 'react-redux';

class Display extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return null;
	}
}

function mapStateToProps(state) {
	return state.turtle;
}

export default connect(mapStateToProps)(Display);
