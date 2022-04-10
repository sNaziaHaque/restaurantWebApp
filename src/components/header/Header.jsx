import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import { myAuth } from "../../firebase";

import AuthContext from "../../context/AuthProvider";

import "./Header.css";

const Header = () => {
  const { setAuth, auth } = useContext(AuthContext);

  const userEmail = auth?.user?.user?.email;
  const navigate = useNavigate();

  const location = useLocation();

  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddRestaurant");
    }
  }, [location]);

  return (
    <div className="header">
      <p className="logo">Restaurant App</p>
      {auth?.user ? (
        <>
          <div className="header-middle">
            <Link to="/">
              <p
                className={`${activeTab === "Home" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
              >
                Home
              </p>
            </Link>
            <Link to="/add">
              <p
                className={`${activeTab === "AddRestaurant" ? "active" : ""}`}
                onClick={() => setActiveTab("AddRestaurant")}
              >
                Add Restaurant
              </p>
            </Link>
          </div>
          <div className="header-right">
            <p>
              Logged in as <strong>{userEmail}</strong>
            </p>
            <button
              onClick={() => {
                signOut(myAuth);
                setAuth({});
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="header-middle">
            <Link to="/home">
              <p
                className={`${activeTab === "Home" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
              >
                Home
              </p>
            </Link>
          </div>
          <div className="header-right">
            <button
              onClick={() => {
                signOut(myAuth);
                setAuth({});
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
