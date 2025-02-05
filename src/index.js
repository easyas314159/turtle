import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './scss/custom.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import store from './store.js';

import App from './components/App.js';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
