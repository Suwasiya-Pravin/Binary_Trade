import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Payment.css";
const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { slug } = useParams();
  const handleRadioChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="payment-container">
      <div className="payment-method">
        <h2>Select a payment method</h2>
        -{slug}-
        <br />
        <h3>Online Payment Methods</h3>
        {["UPI", "Card", "Netbanking"].map((method) => (
          <label key={method}>
            <input
              type="radio"
              value={method}
              checked={paymentMethod === method}
              onChange={handleRadioChange}
            />
            {method}
          </label>
        ))}

        <button className="btn" disabled={!paymentMethod}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
