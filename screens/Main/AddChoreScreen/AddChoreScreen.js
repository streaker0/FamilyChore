import React, {useState} from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
//import { firebase } from '../../firebase/config'
import styles from './styles';

function AddChoreScreen(props) {
	console.log(props.currentMembers);
	const {currentMembers} = props;
	return(
		<SafeAreaView>
			<Text style = {styles.headerStyle} >Select Member You Want To Assign Chore To </Text>
			<FlatList
			data={currentMembers}
			renderItem={({item}) =>(
				<TouchableOpacity onPress= {() =>{props.navigation.navigate('SelectChore', {memberID:item.id, memberName:item.fullName})}}>
					<View style={styles.viewStyle}> 
						<Text style = {styles.textStyle}>{item.fullName}</Text>
					</View>
					<View style={styles.horizLine}/>
					
				</TouchableOpacity>
			)}
			/>
		</SafeAreaView>
		
	)

}
const mapStateToProps = (store) => ({
	currentMembers: store.membersState.currentMembers
})
//const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchHouse }, dispatch);

export default connect(mapStateToProps, null)(AddChoreScreen);
