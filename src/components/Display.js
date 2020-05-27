import React from 'react';
import {connect} from 'react-redux';

import {AutoSizer} from 'react-virtualized';

import Beach from './Beach.js';

class Display extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let component = null;
		if (!!this.props.path) {
			component = (
				<AutoSizer>
					{({width, height}) => width === 0 || height === 0 ? null : (
						<Beach width={width} height={height} path={this.props.path} intersections={this.props.intersections}/>
					)}
				</AutoSizer>
			);
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
