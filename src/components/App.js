import React from 'react';
import {connect} from 'react-redux';

import Navigation from './Navigation.js';
import Display from './Display.js';

class App extends React.Component {
	render() {
		return (
			<>
				<Navigation />
				<Display />
			</>
		);
	}
}

export default connect(null, {})(App);
