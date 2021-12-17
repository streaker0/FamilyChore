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

	useEffect(() => {
		console.log(user);
		props.fetchUser();
			// const myTimeout = setTimeout(setUser(props.currentUser),200)
		setUser(props.currentUser);
		props.fetchHouse();
		setHouse(props.currentHouse)
		console.log(props.currentUser);
		console.log(props.currentHouse);
		console.log("loading");
	}, [props.id, props.currentHouse]);
	
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
				<Text style = {styles.textStyle}> House ID: {household}</Text>
			</View>
            
			<Text style = {styles.headerStyle} >Leaderboard</Text>
			<FlatList style={styles.containerStyle}
			data={currentMembers}
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
	loading:store.userState.loading,
	currentMembers: store.membersState.currentMembers,
	id: store.userState.id,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchHouse }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(HomeScreen);
