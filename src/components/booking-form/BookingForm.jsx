import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { myDb } from "../../firebase";
import Payment from "../payment/Payment";

const promise = loadStripe(
  "pk_test_51KnFl1KU6Pl5JZjLTZ7UycftaESG7VAxP2CAhLzy0swg58QgtGCEkhNUAaOlN4BVDPe7iYZMpgVymsZaaRBhaCwC00pOeCdl5k"
);

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
    bookingAmount: 0,
    paymentStatus: "pending",
    paymentId: "",
  };

  const [state, setState] = useState(initialState);
  const [showBookingForm, setShowBookingForm] = useState(true);
  const [showBookingSubmitted, setShowBookingSubmitted] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [bookingKey, setBookingKey] = useState("");

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
      const key = myDb.child("bookings").push().key;
      setBookingKey(key);

      myDb.child(`bookings/${key}`).set(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Booking request submitted successfully");

          setShowBookingForm(false);
          setShowBookingSubmitted(true);
        }
      });
    }
  };

  const handlePaymentStatus = () => {
    setShowPaymentForm(false);
    setShowPaymentSuccess(true);
  };

  return (
    <div className="container shadow p-3 mb-5 bg-white rounded">
      {showBookingForm ? (
        <>
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
                <br />
              </form>
            </div>
          </div>
        </>
      ) : showBookingSubmitted ? (
        <>
          <div>Booking request successfully submitted</div>
          <button
            onClick={() => {
              setShowBookingSubmitted(false);
              setShowPaymentForm(true);
            }}
          >
            Proceed to payment
          </button>
        </>
      ) : showPaymentForm ? (
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Elements stripe={promise}>
              <Payment
                handlePaymentStatus={handlePaymentStatus}
                bookingKey={bookingKey}
              />
            </Elements>
          </div>
        </div>
      ) : showPaymentSuccess ? (
        <div>Payment successfully received!</div>
      ) : null}
    </div>
  );
}

export default BookingForm;
