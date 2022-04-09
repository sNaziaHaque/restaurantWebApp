import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import AddEdit from "./pages/add-edit-restaurant/AddEditRestaurant";
import View from "./pages/view-restaurant/ViewRestaurant";
import Header from "./components/header/Header";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<AddEdit />} />
          <Route exact path="/edit/:id" element={<AddEdit />} />
          <Route exact path="/view/:id" element={<View />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
