/*
 * @Author: Liusong He
 * @Date: 2022-04-27 20:42:41
 * @LastEditTime: 2022-05-02 17:22:05
 * @FilePath: \coursework_git\src\util\firebaseAuth.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import {useEffect, useState} from "react"

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
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
    apiKey: "AIzaSyDkbAfw990f1bxolouCDtvAME2uf-i9UcA",
    authDomain: "hungry-monkey-new-test.firebaseapp.com",
    projectId: "hungry-monkey-new-test",
    storageBucket: "hungry-monkey-new-test.appspot.com",
    messagingSenderId: "871706005060",
    appId: "1:871706005060:web:95d6930c224626cb813611"
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

export function signWithGoogle(){
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

export function splitName(str){
    return str.trim().split(/\s+/)
}