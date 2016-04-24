'use strict';

import React from 'react-native';
import { LOAD, SAVE } from 'redux-storage';
import * as types from '../_actions/actions';

const initialState = {
	demo_mode_on: true,
	isOnboardingShow: false,
	launchCounter: 0,
	isLoading: true,
	dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	isFetchDataRequested: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD : return {
			...state,
			launchCounter: state.launchCounter + 1
		}

		case SAVE : return {
			...state
		}

		case types.IS_ONBOARDING_SHOW: return {
			...state,
			isOnboardingShow: action.status
		}

		case types.FETCH_DATA: return {
			...state,
			isFetchDataRequested: true,
			coords: action.coords
		}

		case types.FETCH_DATA_START :
			return {
				...state,
				isLoading: true
			}


		case types.FETCH_DATA_FINISHED: return {
			...state,
			city: action.response.city.name,
			cityId: action.response.city.id,
			country: action.response.city.country,
			forecast: action.response.list,
			formattedWeatherData: action.formatWeatherData,
			currentWeatherIndex: action.currentWeatherIndex,
			isLoading: false
		}

		case types.LOAD_SCREEN: return {
			...state,
			screen: action.screen
		}

		case types.SET_LOCATION : return {
			...state,
			location: action.location,
			coords: {lat: action.location.coords.latitude, lng: action.location.coords.longitude}
		}

		default : return {
			...state
		}
	}
}
 

