import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Missing from "./components/missing/Missing";
import RequireAuth from "./components/require-auth/RequireAuth";

import Home from "./pages/home/Home";
import PublicHome from "./pages/public-home/PublicHome";
import Login from "./pages/login/Login";
import ViewRestaurant from "./pages/view-restaurant/ViewRestaurant";
import AddEditRestaurant from "./pages/add-edit-restaurant/AddEditRestaurant";
import ViewBookings from "./pages/view-bookings/ViewBookings";
import EditBooking from "./pages/edit-booking/EditBooking";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public route */}
        <Route path="login" element={<Login />} />
        <Route path="home" element={<PublicHome />} />
        <Route path="view-restaurant/:id" element={<ViewRestaurant />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<AddEditRestaurant />} />
          <Route path="edit/:id" element={<AddEditRestaurant />} />
          <Route path="view-bookings" element={<ViewBookings />} />
          <Route path="edit-booking/:id" element={<EditBooking />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
export default App;
