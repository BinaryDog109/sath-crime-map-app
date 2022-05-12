import firebase from "firebase/compat/app";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRvN88FP7OLg7ZanrLJINNJ9uTXVXBI70",
  authDomain: "opendata-cw2-44a16.firebaseapp.com",
  projectId: "opendata-cw2-44a16",
  storageBucket: "opendata-cw2-44a16.appspot.com",
  messagingSenderId: "663389218820",
  appId: "1:663389218820:web:bcf6011e4c0f9abc4e2d51",
};

firebase.initializeApp(firebaseConfig);

// const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, timestamp };
