import React, {useState, useEffect} from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { firebase } from '../../../firebase/config'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux'
import {fetchUser, fetchHouse} from '../../../redux/actions'

function HouseScreen(props) {
	const [houseID, setHID] = useState('');
	const [user, setUser] = useState(null);


	const createHouseHold = ()=>{
		const userID = firebase.auth().currentUser.uid
		const data = {
			owner:userID,
		}
		console.log(userID);
		const houseRef = firebase.firestore().collection('household')
        houseRef.add(data)
		.then((res) => {
			const data = {
				owner:userID,
				id:res.id,
				members:[],
			}
			console.log(res.id);
			const houseRef = firebase.firestore().collection('household')
			houseRef.doc(res.id)
			.set(data)

			console.log(data);
			const usersRef = firebase.firestore().collection('users')
			usersRef
				.doc(userID)
				.update({
					manager:true,
					household:res.id,
				})
				.then(() => {
					props.navigation.reset({
						index: 0,
						routes: [{ name: 'Main'}],
					  });
				})
				.catch((error =>{
					alert(error);
				}))
		})
			
	}
	const joinHouseHold = ()=>{

		if(houseID.length<20){
			alert('Your text is less than what is required.');
		}
		else{
			// const houseRef = firebase.firestore().collection('household');
			// houseRef
			// .where("id", "==", houseID)
			// .onSnapshot(querySnapshot =>{
			// 	querySnapshot.forEach(doc=>{
			// 		console.log(doc.id, " => ", doc.data());

			// 		const memberRef = houseRef.doc(doc.id).collection('members');
			// 		memberRef
			// 		.doc(user.id)
			// 		.set({id:user.id});
			// 		const data = {
			// 			id:user.id,
			// 			email:user.email,
			// 			fullName:user.fullName,
			// 			manager:false,
			// 			household:doc.id,
			// 		};
			// 		setUser(data)
		
			// 		console.log(data);
			// 		const usersRef = firebase.firestore().collection('users')
			// 		usersRef
			// 		.doc(user.id)
			// 		.update({
			// 			manager:false,
			// 			household:doc.id,
			// 		})
			// 		.then(() => {
			// 			props.navigation.reset({
			// 				index: 0,
			// 				routes: [{ name: 'Home'}],
			// 			  });
			// 		})
			// 		.catch((error =>{
			// 			alert(error);
			// 		}))
			// 	})
			// }
			// )
			const{currentUser} = props;
			const usersRef = firebase.firestore().collection('users')
			
			houseRef
			.doc(houseID)
			.get()
			.then((data) =>{
				if(data.exists){
					houseRef
					.doc(data.id)
					.collection('members')
					.doc(currentUser.id)
					.set({
						fullName:currentUser.fullName,
						id:currentUser.id,
						points:0
					})
					usersRef
					.doc(firebase.auth().currentUser.uid)
					.update({manager:false, household:houseID})
				}
			})
			
		}
	}
	
		return (
			<View>
				<View style={styles.textBoxContainer}>
					<Text>Create your own household</Text>
					<TouchableOpacity
							style={styles.button}
							onPress={() => createHouseHold()}>
							<Text style={styles.buttonTitle}>Create Household</Text>
					</TouchableOpacity>
				</View>
	
				<View>
					<Text>Join an existing Household</Text>
					<TextInput
						style={styles.input}
						placeholder='Household ID'
						placeholderTextColor="#aaaaaa"
						onChangeText={(Household_ID) => setHID(Household_ID)}
						value={houseID}
						underlineColorAndroid="transparent"
						autoCapitalize="none"
						maxLength = {20}
					/>
					<TouchableOpacity
							style={styles.button}
							onPress={() => joinHouseHold()}>
							<Text style={styles.buttonTitle}>Log in</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	
	
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
	currentHouse: store.houseState.currentHouse,
	id: store.userState.id,
	loading:store.userState.loading,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchHouse }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(HouseScreen);
