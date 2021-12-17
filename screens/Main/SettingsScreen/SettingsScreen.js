import React,{ useState, useEffect } from 'react'
import { Text, View, TouchableOpacity,ScrollView} from 'react-native'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import {firebase} from '../../../firebase/config'


// const navToHome = () => {
// 	navigation.navigate('Home')
// }
const logOutFunction = () => {
	firebase
	.auth()
	.signOut()
	.then(() => {
		alert("You have been logged out");
	})
}
function SettingsScreen(props) {
	const navigation = useNavigation();
	const {currentUser} = props;
	console.log(currentUser);
	
	 if(currentUser.manager){
		return (
			<ScrollView>
				<TouchableOpacity> 
					<View style={styles.viewStyle}>
						<Text style = {styles.textStyle}>Add a member</Text>
					</View>
					<View style={styles.horizLine}/>
				</TouchableOpacity>
				<TouchableOpacity> 
					<View style={styles.viewStyle}>
						<Text style = {styles.textStyle}>Manage members</Text>
					</View>
					<View style={styles.horizLine}/>
				</TouchableOpacity>
				<TouchableOpacity> 
					<View style={styles.viewStyle}>
						<Text style = {styles.textStyle}>Manage profile</Text>
					</View>
					<View style={styles.horizLine}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>logOutFunction()}> 
					<View style={styles.viewStyle}>
						<Text style = {styles.textStyle}>Logout</Text>
					</View>
					<View style={styles.horizLine}/>
				</TouchableOpacity>
			</ScrollView>
		)
	 }else{
		return (
			<ScrollView>
				<TouchableOpacity> 
					<View style={styles.viewStyle}>
						<Text style = {styles.textStyle}>Leave Household</Text>
					</View>
					<View style={styles.horizLine}/>
				</TouchableOpacity>
				<TouchableOpacity> 
					<View style={styles.viewStyle}>
						<Text style = {styles.textStyle}>Manage profile</Text>
					</View>
					<View style={styles.horizLine}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>logOutFunction()}> 
					<View style={styles.viewStyle} >
						<Text style = {styles.textStyle}>Logout</Text>
					</View>
					<View style={styles.horizLine}/>
				</TouchableOpacity>
			</ScrollView>
		)
	 }
	

}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})
export default connect(mapStateToProps, null)(SettingsScreen);