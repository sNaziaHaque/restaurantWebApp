import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { myDb } from "../../firebase";

import "./AddEditRestaurant.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  rating: "",
};

function AddEditRestaurant() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  // Destructuring
  const { name, email, phone, address, rating } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    myDb.child("restaurants").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address || !rating) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        myDb.child("restaurants").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Restaurant added successfully");
          }
        });
      } else {
        myDb.child(`restaurants/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Restaurant updated successfully");
          }
        });
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <div className="add-edit-form shadow p-3 mb-5 bg-white rounded">
      <form onSubmit={handleSubmit}>
        <h3>{id ? "Edit restaurant" : "Add a restaurant"}</h3>
        <hr />
        <br />
        <div className="mb-3">
          <label className="form-label">Restaurant name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Restaurant email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Restaurant phone</label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phone"
            value={phone || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Restaurant Address</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={address || ""}
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
            value={rating || ""}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value={id ? "Update" : "Add"}
        />
      </form>
    </div>
  );
}

export default AddEditRestaurant;
