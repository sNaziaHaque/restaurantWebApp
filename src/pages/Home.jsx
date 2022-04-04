import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import fireDb from "../firebase";

import "./Home.css";

function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    fireDb.child("restaurants").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      fireDb.child(`restaurants/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Restaurant deleted successfully");
        }
      });
    }
  };

  return (
    <div className="restaurant-table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Restaurant Name</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].address}</td>
                <td>{data[id].rating}</td>
                <td>
                  <Link to={`/edit/${id}`}>
                    <button type="button" className="btn btn-secondary">
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${id}`}>
                    <button type="button" className="btn btn-secondary">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
