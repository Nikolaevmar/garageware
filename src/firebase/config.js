import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD3S-Lz9BIH20i6XiuTEXYHAr-G9m9zC_U",
    authDomain: "garagemanagement-53cbf.firebaseapp.com",
    projectId: "garagemanagement-53cbf",
    storageBucket: "garagemanagement-53cbf.appspot.com",
    messagingSenderId: "337725820337",
    appId: "1:337725820337:web:d2811c122f5c73edec4190"
  };

// init firebase
firebase.initializeApp(firebaseConfig);

//init service
const firestore = firebase.firestore();
const fireauth = firebase.auth();
const fireStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { firestore, fireauth, fireStorage, timestamp };