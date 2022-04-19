// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDlEcMc_ApHxmIDHNjiBYQ_QAGJGD1qz5I",
	authDomain: "react-shop-94d11.firebaseapp.com",
	projectId: "react-shop-94d11",
	storageBucket: "react-shop-94d11.appspot.com",
	messagingSenderId: "110982793594",
	appId: "1:110982793594:web:3bd0f329efe4e23b17eec3",
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const firestore = firebase.firestore();
export default firestore; // exporting a firebase.firestore.Firestore object
