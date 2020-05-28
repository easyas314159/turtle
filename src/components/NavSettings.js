import React from 'react';
import {connect} from 'react-redux';

import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import {changeSettings} from '../actions/settings.js';

class NavSettings extends React.Component {
	render() {
		const {showPath, showStart, showEnd, showIntersections, showOverlap} = this.props;

		return (
			<UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					<i aria-hidden='true' class='fas fa-cog' title='Settings' />
					<span class='sr-only'>Settings</span>
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem onClick={()=>this.props.changeSettings({showPath: !showPath})}>
						{showPath ? 'Hide' : 'Show'} Path
					</DropdownItem>
					<DropdownItem onClick={()=>this.props.changeSettings({showStart: !showStart})}>
						{showStart ? 'Hide' : 'Show'} Start
					</DropdownItem>
					<DropdownItem onClick={()=>this.props.changeSettings({showEnd: !showEnd})}>
						{showEnd ? 'Hide' : 'Show'} End
					</DropdownItem>
					<DropdownItem onClick={()=>this.props.changeSettings({showIntersections: !showIntersections})}>
						{showIntersections ? 'Hide' : 'Show'} Intersections
					</DropdownItem>
					<DropdownItem onClick={()=>this.props.changeSettings({showOverlap: !showOverlap})}>
						{showOverlap ? 'Hide' : 'Show'} Overlap
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={()=>this.props.changeSettings({showPath: true, showStart: true, showEnd: true, showIntersections: true, showOverlap: true})}>
						Show All
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		);
	};
}

function mapStateToProps(state) {
	return state.settings;
}

export default connect(mapStateToProps, {changeSettings})(NavSettings);
