const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KnFl1KU6Pl5JZjLbYT3t0rP6JXuxRQe3jzmo5429yYuTGNB7Cxu8oqkZUxeZrgw1gmWHaXsHetpwZL6hBOaCaav00vF0Dyrt8"
);

// API

// - App onfig
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request received for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/restaurant-app-f93f0/us-central1/api
