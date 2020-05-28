import React from 'react';
import {connect} from 'react-redux';

import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

import {loadProgram} from '../actions/turtle.js';

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.startOpen = this.startOpen.bind(this);
		this.handleOpen = this.handleOpen.bind(this);

		this.state = {
			open: false,
		};
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
			<Navbar color='light' light expand='md'>
				<NavbarBrand>Turtle</NavbarBrand>
				<NavbarToggler onClick={()=>this.setState({open: !this.state.open})} />
				<Collapse isOpen={this.state.open} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink onClick={this.startOpen}>Open</NavLink>
							<input type='file' ref={(el)=>this.uploader=el} onChange={this.handleOpen} className='d-none'/>
						</NavItem>
						<NavItem>
							<NavLink target='_blank' href='https://github.com/easyas314159/turtle'><span class="fa fa-github"></span></NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

export default connect(null, {loadProgram})(Navigation);
