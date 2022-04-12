// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCjrXm42M85B-fPRJjjkE14dUHYeMymNgo",
	authDomain: "react-shop-7fd43.firebaseapp.com",
	projectId: "react-shop-7fd43",
	storageBucket: "react-shop-7fd43.appspot.com",
	messagingSenderId: "856583639558",
	appId: "1:856583639558:web:c7e4e2e450b836025e2987",
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const firestore = firebase.firestore();
export default firestore; // exporting a firebase.firestore.Firestore object
