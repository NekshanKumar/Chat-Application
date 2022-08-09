import firebase from "firebase/app";
import "firebase/auth";
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAIqq1PaatvQ8gxnaBiv1B8iGOlcn_m-QU",
    authDomain: "unichat-7e24d.firebaseapp.com",
    projectId: "unichat-7e24d",
    storageBucket: "unichat-7e24d.appspot.com",
    messagingSenderId: "1036908197359",
    appId: "1:1036908197359:web:5e62dda2721a1d30abb21a"
  }).auth();