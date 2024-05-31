// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyAL504LtH6zS0bXXLrc3AFGiSO_756yEBg",
  authDomain: "petshop-717ee.firebaseapp.com",
  projectId: "petshop-717ee",
  storageBucket: "petshop-717ee.appspot.com",
  messagingSenderId: "64592729850",
  appId: "1:64592729850:web:37b0a308675eb463711b43",
  measurementId: "G-X8RTQBJ1CL"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

module.exports = storage;

const analytics = getAnalytics(app);
export const db = getFirestore(app)

