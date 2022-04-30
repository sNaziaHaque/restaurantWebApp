import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthProvider";

import { myDb } from "../../firebase";

import "./Home.css";

function Home() {
  const { user } = useContext(AuthContext);
  console.log("value", user?.role);

  const [data, setData] = useState({});
  const [bookingData, setBookingData] = useState({});

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    const searchTerm = e.target.value;

    // update search value
    setSearchValue(searchTerm);

    const filteredValues = Object.values(data).filter(
      ({ name }) => name.toLowerCase().indexOf(searchTerm) > -1
    );

    const filteredKeys = Object.keys(data).filter(
      (id) => data[id].name.toLowerCase().indexOf(searchTerm) > -1
    );

    for (let i = 0; i < filteredValues.length; i++) {
      filteredValues[i].id = filteredKeys[i];
      filteredValues[i].index = i;
    }

    // set filtered products in state
    setFilteredItems(filteredValues);
  }

  useEffect(() => {
    myDb.child("restaurants").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    myDb.child("bookings").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setBookingData({ ...snapshot.val() });
      } else {
        setBookingData({});
      }
    });

    return () => {
      setData({});
      setBookingData({});
    };
  }, []);

  useEffect(() => {
    console.log("bookingData", bookingData);
  }, [bookingData]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      myDb.child(`restaurants/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Restaurant deleted successfully");
        }
      });
    }
  };

  return (
    <>
      <div className="restaurant-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="searchInput"
            placeholder="Search restaurant..."
            onChange={(e) => handleSearch(e)}
          />
        </form>
      </div>

      {/* {user.role === 'admin' ? 'ADMIN' : 'USER'} */}
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
            {!searchValue
              ? Object.keys(data).map((id, index) => {
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
                })
              : filteredItems.map(({ name, address, rating, id, index }) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{name}</td>
                      <td>{address}</td>
                      <td>{rating}</td>
                      <td>
                        <Link to={`/edit/${id}`}>
                          <button type="button" className="btn btn-secondary">
                            Edit
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => onDelete(name)}
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
    </>
  );
}

export default Home;
