import React, { useState, useEffect, Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../../firebase/config'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {NavigationContainer} from '@react-navigation/native'
import { fetchUser, fetchHouse, fetchMembers, fetchDoneChores, fetchUndoneChores } from '../../../redux/actions'
import {HouseScreen, MainScreen, SelectChoreScreen} from '../../index'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

export class Root extends Component {
    componentDidMount() {
        this.props.fetchUser();
		this.props.fetchHouse();
		this.props.fetchMembers();
		this.props.fetchDoneChores();
		this.props.fetchUndoneChores();
    }
    render() {
		const {currentUser, currentHouse, currentMembers} = this.props;
		console.log(currentUser);
		console.log(currentHouse);
		console.log(currentMembers);
        return (
			! (currentHouse == ''  || currentHouse == undefined) ?
			(
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Main">
						<Stack.Screen name="Main" component={MainScreen} />
						<Stack.Screen name="SelectChore" component={SelectChoreScreen} navigation={this.props.navigation}/>
					</Stack.Navigator>
				</NavigationContainer>
			)
			:(
				<NavigationContainer>
					<Stack.Navigator initialRouteName="House">
						<Stack.Screen name="House" component={HouseScreen} />
						<Stack.Screen name="Main" component={MainScreen} navigation={this.props.navigation}/>
						<Stack.Screen name="SelectChore" component={SelectChoreScreen} navigation={this.props.navigation}/>
					</Stack.Navigator>
				</NavigationContainer>	
			)
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
	currentHouse: store.houseState.currentHouse,
	currentMembers: store.membersState.currentMembers,
	currentDoneChores:store.choresState.currentDoneChores,
	
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchHouse, fetchMembers,fetchDoneChores, fetchUndoneChores }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Root);