import React, { useState, useEffect, Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../../firebase/config'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchHouse } from '../../../redux/actions'
import {HomeScreen, SettingsScreen, AddChoreScreen, CompleteChoreScreen, FinishChoreScreen} from '../../index'
import {createStackNavigator} from '@react-navigation/stack'


const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}

export class Main extends Component {
    componentDidMount() {
        // this.props.fetchUser();
		// this.props.fetchHouse();
    }
    render() {
		 const {currentUser} = this.props;
		 const {currentDoneChores} = this.props
		 const choresTODO = currentDoneChores.length
		 console.log(choresTODO);
		// console.log(currentUser);


        return (
			currentUser.manager?
			(<Tab.Navigator initialRouteName="Home" labeled={false}>
					<Tab.Screen name="Home" component={HomeScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="home" color={color} size={26} />
							),
						}} />
					<Tab.Screen name="AddChore" component={AddChoreScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="playlist-plus" color={color} size={26} />
							),
						}} />
					<Tab.Screen name="CompleteChores" component={CompleteChoreScreen} options = {{tabBarBadge:choresTODO}}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="broom" color={color} size={26} />
							),
						}} />

					<Tab.Screen name="Settings" component={SettingsScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="cog-outline" color={color} size={26} />
							),
						}} />
				</Tab.Navigator>
		):(
			<Tab.Navigator initialRouteName="Home" labeled={false}>
				<Tab.Screen name="Home" component={HomeScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="home" color={color} size={26} />
						),
					}} />
				<Tab.Screen name="FinishChores" component={FinishChoreScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="broom" color={color} size={26} />
						),
					}} />

				<Tab.Screen name="Settings" component={SettingsScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="cog-outline" color={color} size={26} />
						),
					}} />
			</Tab.Navigator>
		)
            

        )
    }
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
	currentHouse: store.houseState.currentHouse,
	currentUndoneChores: store.choresState.currentUndoneChores,
	currentDoneChores: store.choresState.currentDoneChores
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchHouse }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);