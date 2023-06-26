/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw2rxKV4QCisEAOKTP5Blz_s8YVw86Z58",
  authDomain: "note-app-b0d44.firebaseapp.com",
  projectId: "note-app-b0d44",
  storageBucket: "note-app-b0d44.appspot.com",
  messagingSenderId: "921940868134",
  appId: "1:921940868134:web:873c6a54a2ed9081e57ae7",
  measurementId: "G-CPV1NC8CE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
