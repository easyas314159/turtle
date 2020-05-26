import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './scss/custom.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import store from './store.js';

ReactDOM.render(
	<Provider store={store}>
	</Provider>,
	document.getElementById('app')
);
