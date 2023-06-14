// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa1Q1JySB2NO_egkRnrDY6mVjZ_ywoRSo",
  authDomain: "expenses-tracker-caaaa.firebaseapp.com",
  projectId: "expenses-tracker-caaaa",
  storageBucket: "expenses-tracker-caaaa.appspot.com",
  messagingSenderId: "221868504705",
  appId: "1:221868504705:web:444af6020abc3131acbf80",
  measurementId: "G-5MLE98ZD69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);