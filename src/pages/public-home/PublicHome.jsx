import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { myDb } from "../../firebase";

import "./PublicHome.css";

function PublicHome() {
  const [data, setData] = useState({});

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
  }, []);

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

  return (
    <>
      <section className="restaurant-card-view py-4 container">
        <div className="row justify-content-center">
          <div className="col-12 mb-5">
            <div className=" mb-3 col-4 mx-auto text-center">
              <div className="restaurant-search">
                <form onSubmit={(e) => e.preventDefault()}>
                  <label className="form-label h4">Find a restaurant</label>
                  <input
                    type="text"
                    className="from-control"
                    placeholder="Search restaurant..."
                    onChange={(e) => handleSearch(e)}
                  />
                </form>
              </div>
            </div>
            {/* <BootstrapCarousel /> */}
          </div>
          {!searchValue
            ? Object.keys(data).map((id, index) => {
                return (
                  <div className="col-md-4 mx-0 mb-4" key={index}>
                    <Link to={`/view/${id}`}>
                      <div className="card p-0 overflow-hidden h-100 shadow">
                        <img
                          src="../../images/1.jpg"
                          className="card-img-top img-fluid"
                          alt=""
                        />

                        <div className="card-body">
                          <h5 className="card-title">{data[id].name}</h5>
                          <p className="card-text">
                            Rating - {data[id].rating}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            : filteredItems.map(({ name, address, rating, id, index }) => {
                return (
                  <div className="col-md-4 mx-0 mb-4" key={index}>
                    <Link to={`/view/${id}`}>
                      <div className="card p-0 overflow-hidden h-100 shadow">
                        <img
                          src="../../images/1.jpg"
                          className="card-img-top img-fluid"
                          alt=""
                        />

                        <div className="card-body">
                          <h5 className="card-title">{name}</h5>
                          <p className="card-text">Rating - {rating}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
        </div>
      </section>
    </>
  );
}

export default PublicHome;
