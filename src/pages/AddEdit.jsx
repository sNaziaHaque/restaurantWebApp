import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import fireDb from "../firebase";
import { toast } from "react-toastify";

import "./AddEdit.css";

function AddEdit() {
  return (
    <div>
      <div className="add-edit-form shadow p-3 mb-5 bg-white rounded">
        <form>
          <h3>Add a restaurant</h3>
          <br />
          <div className="mb-3">
            <label className="form-label">Restaurant name</label>
            <input
              type="text"
              className="form-control"
              id="restaurantName"
              name="restaurantName"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Restaurant Address</label>
            <textarea
              className="form-control"
              id="restaurantAddress"
              name="restaurantAddress"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Restaurant Rating</label>
            <input
              type="number"
              className="form-control"
              id="restaurantRating"
              name="restaurantRating"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEdit;
