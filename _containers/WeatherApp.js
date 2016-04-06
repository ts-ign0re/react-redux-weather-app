'use strict';

import React, { Component } from 'react-native';
import storage, { decorators } from 'redux-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';

import * as reducers from '../_reducers/reducers';
import WeatherReduxWrapper from './reduxContainer';

const reducer = storage.reducer(combineReducers(reducers));
const engine = createEngine('WEATHER');
const middleWare = storage.createMiddleware(engine);
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(middleWare)(createStore);

const store = createStoreWithMiddleware(reducer, applyMiddleware(thunk, logger));

class WeatherApp extends Component {
	componentWillMount() {
		const load = storage.createLoader(engine);
		load(store);
	}
	render() {
		return (
			<Provider store={store}>
				<WeatherReduxWrapper />
			</Provider>
		);
	}
}

module.exports = WeatherApp;