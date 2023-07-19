// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM3DanXRJkZgn9YsG_BRLFEqU3I62xk2E",
  authDomain: "react-course-6ea58.firebaseapp.com",
  projectId: "react-course-6ea58",
  storageBucket: "react-course-6ea58.appspot.com",
  messagingSenderId: "1889474831",
  appId: "1:1889474831:web:0abf3b37003f81e9a7c67a",
  measurementId: "G-7YVKQWQDGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);