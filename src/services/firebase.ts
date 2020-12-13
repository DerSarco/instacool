import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyB7F9OsMAVsTDmQjfJc35B_kW1eYPW0S_M",
  authDomain: "instacool-c798b.firebaseapp.com",
  databaseURL: "https://instacool-c798b.firebaseio.com",
  projectId: "instacool-c798b",
  storageBucket: "instacool-c798b.appspot.com",
  messagingSenderId: "80258617680",
  appId: "1:80258617680:web:68b6a0e67e18154f2a1c55",
  measurementId: "G-XTRLSX1S55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();