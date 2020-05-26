import React from 'react';
import {connect} from 'react-redux';

import {loadProgram} from '../actions/turtle.js';

class Beach extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='fullscreen beach'>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, {loadProgram})(Beach);
