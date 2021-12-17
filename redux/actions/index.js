import {firebase} from "../../firebase/config";
import {USER_STATE_CHANGE,SET_LOADING, MEMBERS_STATE_CHANGE,HOUSE_STATE_CHANGE, UNDONECHORES_STATE_CHANGE, DONECHORES_STATE_CHANGE} from '../constants'

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchHouse(){
	return ((dispatch) => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
			.get()
            .then((snapshot)=>{
				if(snapshot.exists){
					console.log("has house", snapshot.data().household);
					dispatch({type: HOUSE_STATE_CHANGE, currentHouse: snapshot.data().household});
				}
			})
    })
}

export function fetchMembers(){
	return ((dispatch) => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
			.get()
            .then((snapshot)=>{
				if(snapshot.data().household){
					firebase.firestore()
					.collection('household')
					.doc(snapshot.data().household)
					.collection('members')
					.onSnapshot(querySnapshot =>{
						let members = querySnapshot.docs.map(doc=>{
							const data = doc.data()
							return data
						})
						dispatch({type:MEMBERS_STATE_CHANGE, members})
					})

				}
			})
    })

}

export function fetchDoneChores(){
	return ((dispatch) => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
			.get()
            .then((snapshot)=>{
				if(snapshot.data().household){
					firebase.firestore()
					.collection('household')
					.doc(snapshot.data().household)
					.collection('donechores')
					.onSnapshot(querySnapshot =>{
						let donechores = querySnapshot.docs.map(doc=>{
							const data = doc.data()
							return data
						})
						dispatch({type:DONECHORES_STATE_CHANGE, donechores})
					})

				}
			})
    })

}
export function fetchUndoneChores(){
	return ((dispatch) => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
			.get()
            .then((snapshot)=>{
				if(snapshot.data().household){
					firebase.firestore()
					.collection('household')
					.doc(snapshot.data().household)
					.collection('undonechores')
					.where('to' ,'==',snapshot.data().id)
					.onSnapshot(querySnapshot =>{
						let undonechores = querySnapshot.docs.map(doc=>{
							const data = doc.data()
							return data
						})
						dispatch({type:UNDONECHORES_STATE_CHANGE, undonechores})
					})

				}
			})
    })

}