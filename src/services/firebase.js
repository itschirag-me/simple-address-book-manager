import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKA1J8E9rUE27zRJ6SV2nQTyVcmgyFFwo",
  authDomain: "dummy-social-project.firebaseapp.com",
  projectId: "dummy-social-project",
  storageBucket: "dummy-social-project.appspot.com",
  messagingSenderId: "383535417812",
  appId: "1:383535417812:web:a48abb23fbb8b79987ae41",
  measurementId: "G-PX2MKCS47P",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;
