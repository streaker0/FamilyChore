import React, {useState} from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import { firebase } from '../../../firebase/config'
import styles from './styles';

function CompleteChoreScreen(props) {
	
	const {currentDoneChores} = props;
	const checkOffChore = (cid, uid) =>{
				firebase.firestore().collection('household')
				.doc(props.currentHouse)
				.collection('donechores')
				.doc(cid)
				.get()
				.then((snapshot)=>{
					if(snapshot.exists){
						console.log(snapshot.data().points);
						firebase.firestore().collection('household')
							.doc(props.currentHouse)
							.collection('members')
							.doc(uid)
							.update({points: firebase.firestore.FieldValue.increment(parseInt(snapshot.data().points))})
							.then(()=>{
								firebase.firestore()
									.collection('household')
									.doc(props.currentHouse)
									.collection('donechores')
									.doc(cid)
									.delete()
									.then(() => {
										alert('Chore has been completed successfully')
									})
							})
					}
				})
	} 

	return(
		<SafeAreaView>
				<Text style = {styles.headerStyle} >Select The Chore You Want To Reward</Text>
			<FlatList
			data={currentDoneChores}
			renderItem={({item}) =>(
				<TouchableOpacity onPress= {() => checkOffChore(item.id, item.to)}>
					<View style={styles.viewStyle}> 
						<Text style = {styles.textStyle}>{item.name}</Text>
						<Text style = {styles.textStyle}>{item.owner}</Text>
						<Text style = {styles.textStyle}>{item.points}</Text>
					</View>
					<View style={styles.horizLine}/>
					
				</TouchableOpacity>
			)}
			/>
		</SafeAreaView>
		
	)

}
const mapStateToProps = (store) => ({
	currentHouse: store.houseState.currentHouse,
	currentDoneChores: store.choresState.currentDoneChores
})
//const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchHouse }, dispatch);

export default connect(mapStateToProps, null)(CompleteChoreScreen);