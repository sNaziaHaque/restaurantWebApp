import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import fireDb from "../firebase";
import { toast } from "react-toastify";

import "./AddEdit.css";

const initialState = {
  name: "",
  address: "",
  rating: "",
};

function AddEdit() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, address, rating } = state;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !rating) {
      toast.error("Please provide value in each input field");
    } else {
      fireDb.child("restaurants").push(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Restaurant added successfully");
        }
      });
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <div>
      <div className="add-edit-form shadow p-3 mb-5 bg-white rounded">
        <form onSubmit={handleSubmit}>
          <h3>Add a restaurant</h3>
          <br />
          <div className="mb-3">
            <label className="form-label">Restaurant name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Restaurant Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Restaurant Rating</label>
            <input
              type="number"
              className="form-control"
              id="rating"
              name="rating"
              value={rating}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEdit;
