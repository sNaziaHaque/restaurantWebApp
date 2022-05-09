import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { myDb } from "../../firebase";

import "./EditBooking.css";

const initialState = {
  date: "",
  time: "",
  people: "",
  resName: "",
  resAddress: "",
  name: "",
  email: "",
  phone: "",
  bookingStatus: "",
};

function EditBooking() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const {
    date,
    time,
    people,
    resName,
    resAddress,
    name,
    email,
    phone,
    bookingStatus,
  } = state;

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
    <div className="edit-booking-form">
      <form onSubmit={handleSubmit}>
        <h3>Edit Booking Details</h3>
        <hr />
        <br />
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Date</label>
              <div className="form-field">
                <i className="icon icon-calendar"></i>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  value={date || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Time</label>
              <div className="form-field">
                <i className="icon icon-calendar"></i>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="form-control"
                  value={time || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="form-group">
            <label className="form-label">How Many People</label>
            <div className="form-field">
              <i className="icon icon-chevron-down"></i>
              <select
                name="people"
                id="people"
                className="form-control"
                onChange={handleInputChange}
                value={people}
              >
                <option value="">Choose here</option>
                <option value="1">1 people</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4+ people</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Restaurant name</label>
          <input
            type="text"
            className="form-control"
            id="resName"
            name="resName"
            value={resName || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Restaurant address</label>
          <textarea
            type="text"
            className="form-control"
            id="resAddress"
            name="resAddress"
            value={resAddress || ""}
            onChange={handleInputChange}
          />
        </div>
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
