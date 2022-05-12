/*
 * @Author: Liusong He
 * @Date: 2022-04-27 20:42:41
 * @LastEditTime: 2022-05-12 20:28:30
 * @FilePath: \6214\src\util\firebaseAuth.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import { useEffect, useState } from "react"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBoTXYlai40mi8LVRBK2gQm0dvSCKwMWwg",
//     authDomain: "hungry-monkey-8888.firebaseapp.com",
//     projectId: "hungry-monkey-8888",
//     storageBucket: "hungry-monkey-8888.appspot.com",
//     messagingSenderId: "200889206145",
//     appId: "1:200889206145:web:aa623537369aa70e311480"
// }
const firebaseConfig = {
    apiKey: "AIzaSyDRvN88FP7OLg7ZanrLJINNJ9uTXVXBI70",
    authDomain: "opendata-cw2-44a16.firebaseapp.com",
    projectId: "opendata-cw2-44a16",
    storageBucket: "opendata-cw2-44a16.appspot.com",
    messagingSenderId: "663389218820",
    appId: "1:663389218820:web:bcf6011e4c0f9abc4e2d51"
  };

// Initialize Firebase
const provider = new GoogleAuthProvider()
const app = initializeApp(firebaseConfig)
export const auth = getAuth()

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function logout() {
    return signOut(auth)
}

export function signWithGoogle() {
    return signInWithPopup(auth, provider)
}

// Custom Hook
export function useAuth() {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    }, [])

    return currentUser
}

export function splitName(str) {
    return str.trim().split(/\s+/)
}