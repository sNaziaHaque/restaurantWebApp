import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../../axios";
import { myDb } from "../../firebase";

function Payment({ handlePaymentStatus, bookingKey }) {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [totalAmount, setTotalAmount] = useState(0);

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // console.log("totalAmount", totalAmount);
    // Generate the special client secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currency subunits
        url: `/payments/create?total=${totalAmount * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [totalAmount]);

  console.log("THE CLIENT SECRET IS >>>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        console.log("paymentIntent", paymentIntent);

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        myDb.child(`bookings/${bookingKey}`).update({
          bookingAmount: totalAmount,
          paymentStatus: "done",
        });

        // setTimeout(() => navigate("/home"), 500);
        handlePaymentStatus();
      });
  };

  const handleChange = (event) => {
    // Listen for changes in CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment-form shadow p-3 mb-5 bg-white rounded">
      <form onSubmit={handleSubmit}>
        <p>Payment </p>
        <CardElement onChange={handleChange} />
        <div className="payment-amount">
          <CurrencyFormat
            value={totalAmount}
            thousandSeparator={true}
            // prefix={"$"}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              // formattedValue = $2,223
              // value ie, 2223
              setTotalAmount(formattedValue);
            }}
          />
          <button disabled={processing || disabled || succeeded}>
            <span>{processing ? <p>Processing</p> : "Pay Now"}</span>
          </button>
          {/* Errors */}
          {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  );
}

export default Payment;
