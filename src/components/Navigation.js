import React from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

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
						<NavItem>
							<NavLink>Open</NavLink>
						</NavItem>
						<NavItem>
							<NavLink target='_blank' href='https://github.com/easyas314159/turtle'>GitHub</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}
