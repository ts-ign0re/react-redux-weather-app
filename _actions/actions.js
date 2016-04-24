'use strict';

import React, { Network, AlertIOS } from 'react-native';

export const IS_ONBOARDING_SHOW = 'IS_ONBOARDING_SHOW';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_START = 'FETCH_DATA_START';
export const NETWORK_ERROR = 'NETWORK_ERROR';
export const FETCH_DATA_FINISHED = 'FETCH_DATA_FINISHED';
export const LOAD_SCREEN = 'LOAD_SCREEN';
export const SET_LOCATION = 'SET_LOCATION';
export const FORMATTED_DATA = 'FORMATTED_DATA';

const DEMO_API_KEY = 'c43bcc5b2e8e627317651479e63b93f7';

function API_ENDPOINT(lat, lon) {
	lat = lat.trim().replace('+', '');
	lon = lon.trim().replace('+', '');
	return 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon='+ lon + '&APPID=' + DEMO_API_KEY + '&units=metric';
}

export function setLocation(coords) {
	return {
		type: SET_LOCATION,
		location: coords
	}
}

export function loadScreen(state) {
	return {
		type: LOAD_SCREEN,
		screen: state
	}
}
export function isOnboardingShow(value) {
	return {
		type: IS_ONBOARDING_SHOW,
		status: value
	}
}

function fetchDataFailed(silensed) {
	return {
		type: NETWORK_ERROR,
		data: silensed
	}
}


export function fetchData(lat, lon) {
	return dispatch => {
		return API(lat, lon)
			.then(response => dispatch({type: FETCH_DATA_FINISHED, response}))
	}
}


export function fetchDataStart(lat, lon) {
	return {
		type: FETCH_DATA_START,
		data: {lat, lon}
	}
}

export function fetchDataFinished(response) {
	let forecast = response.list;
	let formattedForecast = {};

	forecast.map(i => {
		let mainData = {
			grnd_level: i.main.grnd_level,
			humidity: i.main.humidity,
			pressure: i.main.pressure,
			sea_level: i.main.sea_level,
			temp : i.main.temp,
			temp_kf : i.main.temp_kf,
			temp_max: i.main.temp_max,
			temp_min: i.main.temp_min
		}
		let image = i.weather[0].icon;
		let type = i.weather[0].main;
		let wind = {speed: i.wind.speed, deg: i.wind.deg};
		let key = i.dt_txt;
		let pressure = +i.main.pressure * 0.750062;
		formattedForecast[key] = {date: i.dt_txt, mainData, pressure, image, type, wind};
	});

	let elIndex = 0;
	let now = new Date().getTime();
	Object.keys(formattedForecast).map( (i, index) => {
		let current = new Date(i).getTime() + '';
		// hour = 3600 ms
		if (+now  > +current) {
			elIndex = new Date(current).toString();
		}
	});

	return {
		type: FETCH_DATA_FINISHED,
		response,
		formatWeatherData: formattedForecast,
		currentWeatherIndex: elIndex
	}
}

export function formatForecastForUI(data: Array) {
	return {
		type: FORMATTED_DATA,
		data: formattedForecast
	}
}

export function API(lat, lon) {
	return new Promise((success, error) => {
		let endPoint = API_ENDPOINT(lat, lon);
		fetch(endPoint)
			.then((response) => {
				if (response) {
					success(JSON.parse(response._bodyInit));
				} else {
					error(new Error('Network error'));
				}
			})
			.catch((e) => error(e));
	});
}