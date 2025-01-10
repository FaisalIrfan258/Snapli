import firebase from 'firebase/app';
import 'firebase/auth'; // Import Firebase Authentication
import 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyAPUw3m65aAKLnlicn3Yuqgza8ppdqoJP8",
    authDomain: "snapli-92e71.firebaseapp.com",
    projectId: "snapli-92e71",
    storageBucket: "snapli-92e71.appspot.com",
    messagingSenderId: "663731162238",
    appId: "1:663731162238:android:82e112218d404247be1c2f",
    measurementId: "G-XXXXXXXXXX" // Optional, if you have Google Analytics set up
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
