import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB2lbyqWZHPeRCsvvMIbOA0mJMRjLyOdzA",
    authDomain: "react-app-44c1b.firebaseapp.com",
    projectId: "react-app-44c1b",
    storageBucket: "react-app-44c1b.appspot.com",
    messagingSenderId: "372865871779",
    appId: "1:372865871779:web:ac20501f534b1697d03416"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}