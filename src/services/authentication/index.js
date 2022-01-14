// Firebase App (the core Firebase SDK) is always required and must be listed first
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';
import firebase from 'firebase/app';
// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

import config from '../../configurations/';

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// Initialize Firebase
firebase.initializeApp(config.firebaseConfig);
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const FirebaseAuth = firebase.auth();

export const PopupGoogleLogin = () => {
    return firebase.auth().signInWithPopup(GoogleAuthProvider);
};

export default firebase;
