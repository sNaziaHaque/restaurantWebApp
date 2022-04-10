import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home/Home";
import AddEdit from "./pages/add-edit-restaurant/AddEditRestaurant";
import View from "./pages/view-restaurant/ViewRestaurant";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Layout from "./components/layout/Layout";
import Missing from "./components/missing/Missing";
import RequireAuth from "./components/require-auth/RequireAuth";

import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
import { myFirebase, myAuth } from "./firebase";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const firestore = getFirestore(myFirebase);

  async function getRole(uid) {
    const docRef = doc(firestore, `users/${uid}`);
    const responseDoc = await getDoc(docRef);
    const finalData = responseDoc.data().role;

    return finalData;
  }

  function setUserWithFirebaseAndRole(userFromFirebase) {
    getRole(userFromFirebase.uid).then((role) => {
      const userData = {
        uid: userFromFirebase.uid,
        email: userFromFirebase.email,
        role: role,
      };
      setUser(userData);
    });
  }

  myAuth.onAuthStateChanged((userFromFirebase) => {
    // Check for user status
    if (userFromFirebase) {
      if (!user) {
        setUserWithFirebaseAndRole(userFromFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public route */}
        <Route path="login" element={<Login />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<AddEdit />} />
          <Route path="edit/:id" element={<AddEdit />} />
          <Route path="view/:id" element={<View />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
export default App;
