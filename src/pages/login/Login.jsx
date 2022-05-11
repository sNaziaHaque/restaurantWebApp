import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { myFirebase, myAuth } from "../../firebase";

import "./Login.css";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const { setAuth } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const myFirestore = getFirestore(myFirebase);

  const handleInputChange = (e) => {};

  async function registerUser(email, password, role) {
    const infoUser = await createUserWithEmailAndPassword(
      myAuth,
      email,
      password
    )
      .then((user) => {
        setAuth({ user });

        const docRef = doc(myFirestore, `users/${user?.user?.uid}`);
        setDoc(docRef, { email: email, role: role });

        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const role = isRegister ? "manager" : null;

    if (!email || !password) {
      toast.error("Please provide value in each input field");
    } else {
      if (!isRegister) {
        // login
        signInWithEmailAndPassword(myAuth, email, password)
          .then((user) => {
            // logged in
            setAuth({ user });
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify({ user }));

            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } else {
        registerUser(email, password, role);
      }
    }
  };

  return (
    <div>
      <div className="login-form shadow p-3 mb-5 bg-white rounded">
        <form onSubmit={handleSubmit}>
          <h3>{isRegister ? "Register" : "Login"}</h3>
          <br />
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value={isRegister ? "Register" : "Login"}
          />
          <hr />
          <br />
          {isRegister ? "Already registered? " : "Not Registered? "}&nbsp;
          <button
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
