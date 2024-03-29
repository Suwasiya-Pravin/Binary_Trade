import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import useRazorpay from "react-razorpay";
import { toast } from "react-toastify";
import "./Payment.css";
import axios from "axios";
const PaymentMethod = () => {
  const navigate=useNavigate();
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
  }, [slug]);
  console.log(project._id);

  const makePayment = async () => {
    
    const response = await axios.get(
      `/api/v1/order/place-order/${project._id}`
    );
    console.log(response);
    const options = {
      key: "rzp_test_qGEfgGpgroFxOp",
      amount: response.data.amount,
      currency: "INR",
      name: "Binary Trade",
      description: "",
      image: "",
      order_id: response.data.id,
      handler: async function (response) {
        const res = await axios.post("/api/v1/order/verify-payment", response);
        if (res.status === 201) {
          console.log("Purchase successfull !");
          toast.success("Payment Done Successfully");
          navigate(`/projects/${project.slug}`)
        }
      },
      notes: {},
      theme: {
        color: "#3399cc",
      },
    };
    var rzp = new Razorpay(options);
    rzp.open();
  };
  console.log(project._id)
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
