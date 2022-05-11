import firebase from 'firebase/compat/app';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCRQxF9FzowcwRz7DPc4R4nBFrnFLjR48c",
    authDomain: "food-delivery-7a99f.firebaseapp.com",
    databaseURL: "https://food-delivery-7a99f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "food-delivery-7a99f",
    storageBucket: "food-delivery-7a99f.appspot.com",
    messagingSenderId: "37736377979",
    appId: "1:37736377979:web:36be1a38980af0bb063cde",
    measurementId: "G-ZC148G3PP5"
  };

firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
// timestamp
const timestamp = firebase.firestore.Timestamp

export {projectAuth, projectFirestore, timestamp}