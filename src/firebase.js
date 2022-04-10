import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBTYKKOs3d7ADsjsDVX9gn0EnJ7Nlq1i68",
  authDomain: "restaurant-app-f93f0.firebaseapp.com",
  databaseURL: "https://restaurant-app-f93f0-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-f93f0",
  storageBucket: "restaurant-app-f93f0.appspot.com",
  messagingSenderId: "773590295995",
  appId: "1:773590295995:web:64916f41299744df79509e",
};

export const myFirebase = firebase.initializeApp(firebaseConfig);

export const myAuth = firebase.auth();

export const myDb = myFirebase.database().ref();
