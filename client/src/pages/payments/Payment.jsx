import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRazorpay from "react-razorpay";
import "./Payment.css";
import axios from "axios";
const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [project, setProject] = useState({});
  const [Razorpay] = useRazorpay();
  const { slug } = useParams();
  const handleRadioChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/single/slug/${slug}`
        );
        setProject(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);
  console.log(project._id);

  const makePayment = async () => {
    const response = await axios.get(
      `/api/v1/order/place-order/${project._id}`
    );
    console.log(response);
    const options = {
      key: "rzp_test_qGEfgGpgroFxOp", // Enter the Key ID generated from the Dashboard
      amount: response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "",
      order_id: response.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        console.log(response)
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };
  return (
    <div className="payment-container">
      <div className="payment-method">
        <h2>Select a payment method</h2>-{slug}-
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
        <button className="btn" disabled={!paymentMethod} onClick={makePayment}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
