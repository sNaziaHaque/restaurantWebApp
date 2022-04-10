import React, { useState, useEffect } from "react";
import { Tabs, Tab, ListGroup } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import { useParams } from "react-router-dom";

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
            defaultActiveKey="profile"
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
            <form method="post" className="probootstrap-form">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="people">How Many People</label>
                    <div className="form-field">
                      <i className="icon icon-chevron-down"></i>
                      <select
                        name="people"
                        id="people"
                        className="form-control"
                      >
                        <option value="#">1 people</option>
                        <option value="#">2 people</option>
                        <option value="#">3 people</option>
                        <option value="#">4+ people</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="date">Date</label>
                    <div className="form-field">
                      <i className="icon icon-calendar"></i>
                      <input type="text" id="date" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="time">Time</label>
                    <div className="form-field">
                      <i className="icon icon-clock"></i>
                      <input type="text" id="time" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="name">Name</label>
                    <div className="form-field">
                      <i className="icon icon-user2"></i>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="email">Email</label>
                    <div className="form-field">
                      <i className="icon icon-mail"></i>
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label for="phone">Phone</label>
                    <div className="form-field">
                      <i className="icon icon-phone"></i>
                      <input
                        type="text"
                        id="phone"
                        className="form-control"
                        placeholder="Your phone"
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
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRestaurant;
