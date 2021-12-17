import React, {useState} from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import { firebase } from '../../../firebase/config'
import styles from './styles';

function FinishChoreScreen(props) {
	
	const {currentUndoneChores} = props;

	const checkOffChore = (cid) =>{
			
				const undonechoreRef = firebase.firestore().collection('household')
				.doc(props.currentHouse)
				.collection('undonechores')
				const donechoreRef = firebase.firestore().collection('household')
				.doc(props.currentHouse)
				.collection('donechores')

				undonechoreRef
				.doc(cid)
				.get()
				.then((data) => {
					donechoreRef
					.doc(data.id)
					.set(data.data())
					.then(() => {
						undonechoreRef
						.doc(cid)
						.delete()
						.then(() => {
							alert('Chore has been completed successfully')
						})
					})


				})
	} 
	
	return(
		<SafeAreaView>
			<Text style = {styles.headerStyle} >Select Chore You Have Completed </Text>
			<FlatList
			data={currentUndoneChores}
			renderItem={({item}) =>(
				<TouchableOpacity onPress= {() => checkOffChore(item.id)}>
					<View style={styles.viewStyle}> 
						<Text style = {styles.textStyle}>{item.name}</Text>
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
	currentUndoneChores: store.choresState.currentUndoneChores
})
//const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchHouse }, dispatch);

export default connect(mapStateToProps, null)(FinishChoreScreen);