import React from 'react';
import {connect} from 'react-redux';

import Navigation from './Navigation.js';
import Beach from './Beach.js';

class App extends React.Component {
	render() {
		return (
			<>
				<Navigation />
				<Beach />
			</>
		);
	}
}

export default connect(null, {})(App);
