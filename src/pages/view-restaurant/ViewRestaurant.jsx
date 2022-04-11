import React, { useState, useEffect } from "react";
import { Tabs, Tab, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";

import BookingForm from "../../components/booking-form/BookingForm";

import { myDb } from "../../firebase";

import "./ViewRestaurant.css";

function ViewRestaurant() {
  const [restaurant, setRestaurant] = useState({});

  const { id } = useParams();

  useEffect(() => {
    myDb
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
          Restaurant Overview
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
          <Tabs
            defaultActiveKey="lunch"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="breakfast" title="Breakfast">
              <ListGroup as="ul" className="menus">
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/1.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$14.99</span>
                    <h3>Baked Bread</h3>
                    <p>Crab / Potatoes / Rice</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/2.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$16.99</span>
                    <h3>Sandwich</h3>
                    <p>Potatoes / Egg</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/3.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$18.99</span>
                    <h3>Pancakes</h3>
                    <p>Wheat / Syrup</p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="lunch" title="Lunch">
              <ListGroup as="ul" className="menus">
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/1.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$22.99</span>
                    <h3>Baked Potato Pizza</h3>
                    <p>Crab / Potatoes / Rice</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/2.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$21.99</span>
                    <h3>Fried Potatoes with Garlic</h3>
                    <p>Potatoes / Rice</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/3.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$25.99</span>
                    <h3>Salted Fried Chicken</h3>
                    <p>Rice / Chicken</p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="dinner" title="Dinner">
              <ListGroup as="ul" className="menus">
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/1.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$22.99</span>
                    <h3>Steak</h3>
                    <p>Beef / Chicken / Rice</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/2.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$22.99</span>
                    <h3>Fried Chicken with Fris</h3>
                    <p>Potatoes / Rice</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <figure className="image">
                    <img
                      src="../../images/3.jpg"
                      alt="Free Bootstrap Template by uicookies.com"
                    />
                  </figure>
                  <div className="text">
                    <span className="price">$24.99</span>
                    <h3>Fried Rice with Chicken</h3>
                    <p>Rice / Chicken</p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>
        </div>
      </div>

      <BookingForm restaurantId={id} />
    </div>
  );
}

export default ViewRestaurant;
