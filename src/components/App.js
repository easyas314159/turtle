import React from 'react';
import {connect} from 'react-redux';

import Navigation from './Navigation.js';

class App extends React.Component {
	render() {
		return (
			<Navigation />
		);
	}
}

export default connect(null, {})(App);
