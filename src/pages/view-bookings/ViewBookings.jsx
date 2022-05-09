import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { myDb } from "../../firebase";

import "./ViewBookings.css";

function ViewBookings() {
  const { user } = useContext(AuthContext);

  const [bookingData, setBookingData] = useState({});

  const truncate = (str, n) => {
    return str?.length > n
      ? "..." + str.substr(str.length - 4, str.length)
      : str;
  };

  useEffect(() => {
    if (user) {
      if (user?.role === "admin") {
        myDb.child("bookings").on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setBookingData({ ...snapshot.val() });
          } else {
            setBookingData({});
          }
        });
      } else {
        myDb
          .child("bookings")
          .orderByChild("resEmail")
          .equalTo(user?.email)
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setBookingData({ ...snapshot.val() });
            } else {
              setBookingData({});
            }
          });
      }
    }

    return () => {
      setBookingData({});
    };
  }, [user]);

  return (
    <div className="bookings-table">
      <div className="row">
        <h3>Bookings</h3>
        <br />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Restaurant Details</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>People</th>
              <th>Amount</th>
              <th>Payment Id</th>
              <th>Payment Status</th>
              <th>Booking Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(bookingData).map((id, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{bookingData[id].date}</td>
                  <td>{bookingData[id].time}</td>
                  <td>
                    {bookingData[id]?.resName}, {bookingData[id]?.resAddress}
                  </td>
                  <td>{bookingData[id].name}</td>
                  <td>{bookingData[id].email}</td>
                  <td>{bookingData[id].phone}</td>
                  <td>{bookingData[id].people}</td>
                  <td>{bookingData[id].bookingAmount}</td>
                  <td>{truncate(bookingData[id].paymentId, 5)}</td>
                  <td>{bookingData[id].paymentStatus}</td>
                  <td>{bookingData[id].bookingStatus}</td>

                  <td>
                    <Link to={`/edit-booking/${id}`}>
                      <button type="button" className="btn btn-secondary">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewBookings;
