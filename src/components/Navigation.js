import React from 'react';
import {connect} from 'react-redux';

import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

import NavOpen from './NavOpen.js';

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
	}

	render() {
		return (
			<Navbar color='light' light expand='md'>
				<NavbarBrand>Turtle</NavbarBrand>
				<NavbarToggler onClick={()=>this.setState({open: !this.state.open})} />
				<Collapse isOpen={this.state.open} navbar>
					<Nav className='ml-auto' navbar>
						<NavOpen />

						<NavItem>
							<NavLink target='_blank' href='https://github.com/easyas314159/turtle'><span class="fa fa-github"></span></NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}
