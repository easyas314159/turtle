import React from 'react';
import {connect} from 'react-redux';

import {NavItem, NavLink} from 'reactstrap';

import {loadProgram} from '../actions/turtle.js';

class NavOpen extends React.Component {
	constructor(props) {
		super(props);
		this.startOpen = this.startOpen.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}

	startOpen() {
		this.uploader.click();
	}

	handleOpen(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		this.props.loadProgram(evt.target.files[0]);
	}

	render() {
		return (
			<NavItem>
				<NavLink onClick={this.startOpen}>
					<i aria-hidden='true' class='fas fa-file-upload' title='Open' />
					<span class='sr-only'>Open</span>
				</NavLink>
				<input type='file' ref={(el)=>this.uploader=el} onChange={this.handleOpen} className='d-none'/>
			</NavItem>
		);
	}
};

export default connect(null, {loadProgram})(NavOpen);
