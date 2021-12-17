import { StatusBar } from 'expo-status-bar';
import React , {Component }from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import {firebase} from './firebase/config'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import devToolsEnhancer from 'remote-redux-devtools';
import { LoginScreen,RegistrationScreen, RootScreen} from './screens'


const store = createStore(rootReducer, 
	compose(
		applyMiddleware(thunk), 
		window.devToolsExtension ? window.devToolsExtension() : f => f
	))

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
		this.setState({
			loggedIn: true,
			loaded: true,
			})
      }
    })

	
  }

	render(){
		const { loggedIn, loaded} = this.state;
  
		if (!loaded) {	
		return (	
			<>loading ...</>	
		)	
		}
	
	
		return ( 
			<Provider store={store}>
			{!loggedIn?
			(
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Login">
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Register" component={RegistrationScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			):(
				
				// <NavigationContainer>
					
				// 	<Stack.Navigator initialRouteName="House">
				// 		<Stack.Screen name="House" component={HouseScreen} />
				// 		<Stack.Screen name="Main" component={MainScreen} navigation={this.props.navigation}/>
				// 	</Stack.Navigator>	
				// </NavigationContainer>
				<RootScreen/>
			)}
			</Provider>
		);
	}
// 	{household ?
// 		(<Stack.Navigator initialRouteName="Main">
// 				<Stack.Screen name="Main" component={MainScreen} />
// 			</Stack.Navigator>)
// 		:(<Stack.Navigator initialRouteName="House">
// 				<Stack.Screen name="House" component={HouseScreen} />
// 				<Stack.Screen name="Main" component={MainScreen} navigation={this.props.navigation}/>
// 			</Stack.Navigator>	
// 			)
// }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
