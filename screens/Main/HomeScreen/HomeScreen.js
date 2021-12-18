import React,{ useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux'
import { TouchableHighlight } from 'react-native-gesture-handler';
import {fetchUser, fetchHouse} from '../../../redux/actions'
// import Leaderboard from'react-native-leaderboard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// const navToSettings = () => {
// 	//use navigation hook shown as below

// 	navigation.navigate('Settings')
// }
function HomeScreen(props) {
	const [user, setUser] = useState(props.currentUser);
	const [household, setHouse] = useState(props.currentHousehold);
	const {currentMembers} = props;
	const sortLeaderboard = (a, b)=>{
		if(a.points> b.points){
			return -1;
		}
		if(a.points< b.points){
			return 1;
		}
		return 0;
	}
	const leaderData = currentMembers.sort(sortLeaderboard);
	console.log(leaderData);
	
	if(user == null){
		return(
			<h1>Loading</h1>
		)
	}
    return (
        <View>
			<Text style = {styles.headerStyle} >Welcome</Text>
			<View style = {styles.container}> 
				<Text style = {styles.textStyle}>{user.fullName}</Text>
				<Text style = {styles.textStyle}> House ID: {user.household}</Text>
			</View>
            
			<Text style = {styles.headerStyle} >Leaderboard</Text>
			<FlatList style={styles.containerStyle}
			data={leaderData}
			renderItem={({item}) =>(
				<>
				<View style={styles.horizLine}/>
				<View style={styles.viewStyle}> 
						<Text style = {styles.textStyle}>{item.fullName}</Text>
						<Text style = {styles.textStyle}>{item.points} Points</Text>
					</View>
				<View style={styles.horizLine}/>
				</>
					

			)}
			/>
        </View>
    )
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
	currentHouse: store.houseState.currentHouse,
	currentMembers: store.membersState.currentMembers,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchHouse }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(HomeScreen);
