// eslint-disable-next-line import/no-unresolved
import firebase from 'firebase';

import { firebaseConfig } from '../configurations/firebase';

firebase.initializeApp(firebaseConfig);

console.log('a');

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogleRedirect = () => {
    firebase.auth().signInWithRedirect(googleProvider);
};
