import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyCbv20qDdqr54QJjuYbcs1KwzfGlkIOqBk",
	authDomain: "family-chore-bab90.firebaseapp.com",
	databaseURL: "https://family-chore-bab90-default-rtdb.firebaseio.com",
	projectId: "family-chore-bab90",
	storageBucket: "family-chore-bab90.appspot.com",
	messagingSenderId: "469059472697",
	appId: "1:469059472697:web:aec606449047ce36936ce8",
	measurementId: "G-3BGTSZ91T5"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };