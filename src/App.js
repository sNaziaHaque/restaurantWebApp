import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home/Home";
import AddEditRestaurant from "./pages/add-edit-restaurant/AddEditRestaurant";
import ViewRestaurant from "./pages/view-restaurant/ViewRestaurant";
import Login from "./pages/login/Login";
import Layout from "./components/layout/Layout";
import Missing from "./components/missing/Missing";
import RequireAuth from "./components/require-auth/RequireAuth";

import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
import { myFirebase, myAuth } from "./firebase";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PublicHome from "./pages/public-home/PublicHome";

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
        <Route path="home" element={<PublicHome />} />
        <Route path="view/:id" element={<ViewRestaurant />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<AddEditRestaurant />} />
          <Route path="edit/:id" element={<AddEditRestaurant />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
export default App;
