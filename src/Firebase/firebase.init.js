// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL35DTpdmDvyYLF7AqSuBoe8L-HKtQKGA",
  authDomain: "react-bill-98a27.firebaseapp.com",
  projectId: "react-bill-98a27",
  storageBucket: "react-bill-98a27.firebasestorage.app",
  messagingSenderId: "14910086121",
  appId: "1:14910086121:web:d6f5199ed5fd9f70828978",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
