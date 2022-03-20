import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTYKKOs3d7ADsjsDVX9gn0EnJ7Nlq1i68",
  authDomain: "restaurant-app-f93f0.firebaseapp.com",
  projectId: "restaurant-app-f93f0",
  storageBucket: "restaurant-app-f93f0.appspot.com",
  messagingSenderId: "773590295995",
  appId: "1:773590295995:web:64916f41299744df79509e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.database().ref();

export { db };
