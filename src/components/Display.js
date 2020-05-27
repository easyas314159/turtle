import React from 'react';
import {connect} from 'react-redux';

import Beach from './Beach.js';

class Display extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let component = null;
		if (!!this.props.path) {
			component = (<Beach path={this.props.path}/>);
		}

		return (
			<div className='fullscreen display'>
				{component}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state.turtle;
}

export default connect(mapStateToProps)(Display);
