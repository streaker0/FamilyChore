import React, {useState} from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../../firebase/config'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles';

function SelectChore(props) {
	const [name, setName] = useState('');
	const [points, setPoints] = useState(0);
	const createChore	= () =>{
		const data = {
			name: name,
			points: points,
			to: props.route.params.memberID,
			owner: props.route.params.memberName,
		}
		console.log(data);
		firebase.firestore()
		.collection('household')
		.doc(props.currentUser.household)
		.collection('undonechores')
		.add(data)
		.then(res =>{
			firebase.firestore()
		.collection('household')
		.doc(props.currentUser.household)
		.collection('undonechores')
		.doc(res.id)
		.update({id: res.id})
		.then(() =>{
			props.navigation.navigate('Main')
		})

		}
			
		)

	}
	return(
		
		<View>{console.log(props.route.params.memberID)}
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Chore Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='points'
                    placeholderTextColor="#aaaaaa"
					keyboardType = 'numeric'
                    onChangeText={(text) => setPoints(text)}
					value={points}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => createChore()}>
                    <Text style={styles.buttonTitle}>Create chore</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
	)

}
const mapStateToProps = (store) => ({
	currentUser:store.userState.currentUser,
	currentMembers: store.membersState.currentMembers
})

export default connect(mapStateToProps, null)(SelectChore);