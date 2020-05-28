import React from 'react';

import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

import NavOpen from './NavOpen.js';
import NavSettings from './NavSettings.js';

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
						<NavSettings />
						<NavItem>
							<NavLink target='_blank' href='https://github.com/easyas314159/turtle'>
								<i aria-hidden='true' className='fa fa-github' title='GitHub' />
								<span className='sr-only'>GitHub</span>
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}
