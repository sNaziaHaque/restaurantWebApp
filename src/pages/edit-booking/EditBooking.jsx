import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { myDb } from "../../firebase";

import "./EditBooking.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
  bookingStatus: "",
};

function EditBooking() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, phone, bookingStatus } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    myDb.child("bookings").on("value", (snapshot) => {
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

    if (!name || !email || !phone || !bookingStatus) {
      toast.error("Please provide value in each input field");
    } else {
      myDb.child(`bookings/${id}`).set(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Booking updated successfully");
        }
      });

      setTimeout(() => navigate("/view-bookings"), 500);
    }
  };

  return (
    <div className="edit-booking-form shadow p-3 mb-5 bg-white rounded">
      <form onSubmit={handleSubmit}>
        <h3>Edit Booking Details</h3>
        <hr />
        <br />
        <div className="mb-3">
          <label className="form-label">Customer name</label>
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
          <label className="form-label">Customer email</label>
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
          <label className="form-label">Customer phone</label>
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
          <div className="form-group">
            <label htmlFor="people">Booking status</label>
            <div className="form-field">
              <i className="icon icon-chevron-down"></i>
              <select
                name="bookingStatus"
                id="bookingStatus"
                className="form-control"
                onChange={handleInputChange}
                value={bookingStatus}
              >
                <option value="">Choose here</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>
          </div>
        </div>
        <input type="submit" className="btn btn-primary" value="Update" />
      </form>
    </div>
  );
}

export default EditBooking;
