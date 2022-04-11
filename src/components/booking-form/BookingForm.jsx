import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { myDb } from "../../firebase";

function BookingForm({ restaurantId }) {
  const navigate = useNavigate();

  const initialState = {
    people: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    resId: restaurantId,
  };

  const [state, setState] = useState(initialState);

  const { people, date, time, name, email, phone, resId } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!people || !date || !time || !name || !email || !phone) {
      toast.error("Please provide value in each input field");
    } else {
      myDb.child("bookings").push(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Booking request submitted successfully");
        }
      });

      setTimeout(() => navigate("/home"), 500);
    }
  };

  return (
    <div className="container shadow p-3 mb-5 bg-white rounded">
      <div className="row">
        <div className="col-md-12 text-center probootstrap-animate">
          <div className="probootstrap-heading">
            {/* <h2 className="primary-heading">Booking</h2> */}
            <h3 className="secondary-heading">Reserve A Table</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 probootstrap-animate">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="people">How Many People</label>
                  <div className="form-field">
                    <i className="icon icon-chevron-down"></i>
                    <select
                      name="people"
                      id="people"
                      className="form-control"
                      onChange={handleInputChange}
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
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <div className="form-field">
                    <i className="icon icon-calendar"></i>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <div className="form-field">
                    <i className="icon icon-clock"></i>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <div className="form-field">
                    <i className="icon icon-user2"></i>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Your full name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="form-field">
                    <i className="icon icon-mail"></i>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Your email address"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <div className="form-field">
                    <i className="icon icon-phone"></i>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Your phone"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <input
                  type="submit"
                  name="submit"
                  id="submit"
                  value="Submit"
                  className="btn btn-lg btn-primary btn-block"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
