// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_W96PU0ntVbZFAzmbjYwAvrZPrdDhhcA",
  authDomain: "blog-two-69aeb.firebaseapp.com",
  projectId: "blog-two-69aeb",
  storageBucket: "blog-two-69aeb.appspot.com",
  messagingSenderId: "51453280965",
  appId: "1:51453280965:web:3636128c923ec7891066ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
//FOR GOOGLE AUTHENTICATION
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();