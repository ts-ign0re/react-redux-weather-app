'use strict';

import React from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Loader, ListItem, ListView, WeatherPanel } from '../AdditionalModules';
import Icon from 'react-native-vector-icons/Ionicons';
import Animatable from 'react-native-animatable';
import Carousel from 'react-native-carousel';
import { API } from '../../_actions/actions';

const { Component, Dimensions, Network, Image, StyleSheet, AsyncStorage } = React;
const { width, height } = Dimensions.get('window');

// admob api
import { AdMob, BannerAdUnitId, InterstitialAdUnitId } from '../../ADMOB_API';

export default class Weather extends Component {

	constructor(props) {
		super();
		this.state = {
			animation: [null ,'slideOutUp', 'slideInDown']
		};

		// init admob on app start
		if (InterstitialAdUnitId.length > 0 && InterstitialAdUnitId !== 'Your Interstitial Ad Unit ID') {
			AdMob.loadInterstitial(InterstitialAdUnitId);
		}
	}

	componentDidMount() {
		// show banner on app start
		// at the bottom
		this.showInterstitial();

		// fullscreen ads
		this.showBanner();
	}

	/**
	 * Admob actions
	 */
	// fullscreen ads
	showInterstitial(){
		AdMob.showInterstitial();
	}

	// bottom banner ads
	showBanner(){
		AdMob.showBannerOnBottomOfTheView(BannerAdUnitId);
	}

	setCurrentLocation() {
		/*
		* DEMO MODE FOR SIMULATOR
		* DISABLE IN reducers.js ON REAL DEVICE
		* */
		if (this.props.state.demo_mode_on === true) {
			API('40.7142700', '-74.0059700').then(response => {
				AsyncStorage.clear(); // clear old data
				this.props.actions.fetchDataFinished(response);
			});

			return false;
		}
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.actions.setLocation(position);
				//if (this.props.state.location.timestamp !== position.timestamp) {
					let lat = position.coords.latitude + '';
					let lng = position.coords.longitude + '';
					API(lat, lng).then(response => {
						AsyncStorage.clear(); // clear old data
						this.props.actions.fetchDataFinished(response);
					});

				//}
			},
			(error) => alert(error.message),
			{enableHighAccuracy: false, timeout: 3600 * 1000, maximumAge: 1000}
		);
	}

	componentWillMount() {
		this.setCurrentLocation();
	}

	_onListScroll(data) {
		// refresh component
	}

	render() {

		let currentWeatherData = null
			if (this.props.state.formattedWeatherData) {
				currentWeatherData = this.props.state.formattedWeatherData[Object.keys(this.props.state.formattedWeatherData)[0]];
			}
		let weatherPanel = null;
		if (this.props.state.formattedWeatherData)
		{
			weatherPanel = Object.keys(this.props.state.formattedWeatherData).map(i => {
				return <WeatherPanel key={i} city={this.props.state.city} data={this.props.state.formattedWeatherData[i]}/>
			});
		}

		return (
			<Image style={styles.container}
        source={{uri: currentWeatherData ? '' : 'screen'}} resizeMode='cover'>
				{currentWeatherData && <WeatherPanel city={this.props.state.city} data={currentWeatherData}/>}

				{this.props.state.formattedWeatherData &&
					<ListView onScroll={(data) => this._onListScroll(data)} style={{width: width, backgroundColor: 'transparent'}}>
						{Object.keys(this.props.state.formattedWeatherData).map((i, index) => {
							return <ListItem
									index={index}
									days={this.props.state.dayOfWeek}
									key={i}
									element={this.props.state.formattedWeatherData[i]}/>
						})}
					</ListView>
				}
				{this.props.state.isLoading && <Loader spinnerIcon='spinner' spinnerSize={35} spinnerColor='#fff' style={styles.loader}/>}
			</Image>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	loader: {
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	plate: {
		padding: 10,
		backgroundColor: 'rgba(255,255,255,0.3)',
		width: width * 0.9,
		height: 100,
		borderRadius: 7,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	innerPlate: {
		width: width * 0.45 - 10,
	},
	innerPlateLeft: {
		borderRightWidth: 1,
		borderColor: 'rgba(255,255,255,0.2)'
	},
	textWhite: {
		fontSize: 22,
		color: '#fff'
	}
});
 

