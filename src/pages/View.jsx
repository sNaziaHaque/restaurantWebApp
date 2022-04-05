import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import "./View.css";

function View() {
  const [restaurant, setRestaurant] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`restaurants/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRestaurant({ ...snapshot.val() });
        } else {
          setRestaurant({});
        }
      });
  }, [id]);

  return (
    <div>
      <div>
        <Carousel className="restaurant-carousal">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../images/1.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../images/2.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../images/3.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <h3>{restaurant.name}</h3>
      <div className="row">
        <div className="col-md-3 offset-md-1 shadow p-3 mb-5 bg-white rounded">
          Restaurant Info
          <hr />
          <div className="info-text">
            <p>
              <strong>Name: </strong> {restaurant.name}
            </p>
            <p>
              <strong>Address: </strong> {restaurant.address}
            </p>
            <p>
              <strong>Rating: </strong> {restaurant.rating}
            </p>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6 shadow p-3 mb-5 bg-white rounded">
          Menu
          <hr />
        </div>
      </div>
    </div>
  );
}

export default View;
