// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyA0UVyQeViBUArtY0kfWxkD3TzhoSnVfcw',
  authDomain: 'tcl-22-shopping-list.firebaseapp.com',
  projectId: 'tcl-22-shopping-list',
  storageBucket: 'tcl-22-shopping-list.appspot.com',
  messagingSenderId: '908757844017',
  appId: '1:908757844017:web:27af0d8875560207361510',
};

let fb = firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export { fb, db };
