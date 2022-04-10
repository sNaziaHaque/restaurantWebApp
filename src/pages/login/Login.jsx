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
        // navigate(from, { replace: true });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    const docRef = doc(myFirestore, `users/${infoUser.user?.uid}`);
    setDoc(docRef, { email: email, role: role });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const role = isRegister ? e.target.elements.role.value : null;

    if (!email || !password) {
      toast.error("Please provide value in each input field");
    } else {
      if (!isRegister) {
        // login
        signInWithEmailAndPassword(myAuth, email, password)
          .then((user) => {
            // logged in
            setAuth({ user });
            // navigate(from, { replace: true });
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
          {isRegister && (
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-control" name="role" id="role">
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          )}
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
