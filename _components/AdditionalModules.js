'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animatable from 'react-native-animatable';
import moment from 'moment';
const _ = require('lodash');

const { Component, View, Dimensions, ScrollView, ActivityIndicatorIOS, Image, Text, StyleSheet } = React;
const { width, height } = Dimensions.get('window');



export class Loader extends Component {
	render() {
		return (
			<View style={[{width, height, justifyContent: 'center', alignItems: 'center'}, this.props.style]}>
				<ActivityIndicatorIOS
					size="large"
					color="#fff"
				/>
			</View>
		)
	}
}

export class ListView extends Component {
	render() {
		return (
			<ScrollView onScroll={this.props.onScroll} contentContainerStyle={this.props.style} horizontal={false} removeClippedSubviews={true}>
				{this.props.children}
			</ScrollView>
		)
	}
}


export class ListItem extends Component {
	constructor(props) {
		super();
		var parseDate = moment(props.element.date);

		this.state = {
			date: parseDate.format('dddd'),
			time: parseDate.format('HH:mm')
		}
	}
	render() {

		return (
			<View style={styles.listItem}>
				<View style={[styles.listItemMetaTitle]}>
					<Text style={styles.listItemMetaText}>{this.state.date}</Text>
				</View>
				<View style={styles.listMetaWrapper}>
					<Text style={styles.listItemMetaText}>{this.state.time}</Text>
					<View>
						<Image source={{uri: this.props.element.image}} style={{width: 75, height: 50}} resizeMode='contain'/>
					</View>
					<View style={styles.listItemMetaWrap}>
						<Text style={styles.metaText}>{Math.round(this.props.element.mainData.temp_max)}°</Text>
						<View style={[styles.metaBlock,{width: 30, height: 30, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}]}>
							<Text style={{color: 'red', fontSize: 10, marginBottom: 5}}>C</Text>
							<View style={{transform: [{rotate: this.props.element.wind.deg + 'deg'}]}}><Text>↑</Text></View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}

export class WeatherPanel extends Component {
	render() {
		return (
			<View style={[styles.weatherMainData, {backgroundColor: '#50B6E7'}, this.props.style]}>
				<View style={{justifyContent: 'flex-start', flex: 1, paddingHorizontal: 10}}>
					{this.props.city &&
						<Text style={styles.city}>{this.props.city}</Text>
					}
					<Text style={styles.weatherTemp}>{Math.round(this.props.data.mainData.temp)}°</Text>

					<Text style={styles.weatherSmallText}>{_.capitalize(this.props.data.description)}</Text>
					<Text style={styles.weatherSmallText}>Humidity: {this.props.data.mainData.humidity}%</Text>
					<Text style={styles.weatherSmallText}>Pressure: {Math.round(this.props.data.pressure)} mm Hg</Text>
					<Text style={styles.weatherSmallText}>Wind: {Math.round(this.props.data.wind.speed)} m/s</Text>
				</View>
				<Image source={{uri: this.props.data.image}} resizeMode='cover' style={styles.mainImage}/>
			</View>
		)
	}

}


const styles = StyleSheet.create({
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(128,128,128, 0.2)'
	},
	listItemMetaTitle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	listMetaWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	listItemMetaWrap: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	listItemMetaText: {
		color: '#333',
		fontFamily: 'Helvetica',
		fontSize: 16,
		marginRight: 10
	},
	metaText: {
		width: width / 7 - 10,
		fontSize: 20,
		color: '#333',
		paddingLeft: 5,
		textAlign: 'right'
	},
	metaBlock: {
		width: width / 7 - 10,
		marginLeft: 5,
	},
	metaTextN: {
		color: '#046A9B'
	},
	weatherMainData: {
		width: width,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomWidth: 5,
		borderBottomColor: '#2DA2DB',
		paddingVertical: 20,
	},
	weatherTemp: {
		fontSize: 60,
		color: '#fff',
		fontFamily: 'HelveticaNeue-Thin'
	},
	weatherSmallText: {
		color: '#fff',
		fontFamily: 'HelveticaNeue-Light'
	},
	city: {
		backgroundColor: 'transparent',
		fontSize: 30,
		color: '#fff'
	},
	mainImage: {
		height: 200,
		width: 150
	}
});
 

