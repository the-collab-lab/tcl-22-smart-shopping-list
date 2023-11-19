// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyAa8sRqomXUfeBDAKB9t3Dnq9uQup9E5cE',
  authDomain: 'tcl-22-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-22-smart-shopping-list',
  storageBucket: 'tcl-22-smart-shopping-list.appspot.com',
  messagingSenderId: '116137204814',
  appId: '1:116137204814:web:e090827ae2837258b0371f',
};

let fb = firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export { fb, db };
