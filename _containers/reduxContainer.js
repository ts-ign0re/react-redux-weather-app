'use strict';

import React, { Component, StatusBarIOS } from 'react-native';
import {bindActionCreators} from 'redux';
import Weather from '../_components/weather/Weather';
import * as actions from '../_actions/actions';
import { connect } from 'react-redux';

class WeatherReduxWrapper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Weather
				state={this.props.state.default}
				actions={this.props.actions} />
		);
	}
}

export default connect(state => ({
		state: state
	}),
	(dispatch) => ({
		actions: bindActionCreators(actions, dispatch)
	})
)(WeatherReduxWrapper);