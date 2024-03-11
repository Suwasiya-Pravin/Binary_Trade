import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    userType: "buyer",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an Axios POST request to your backend API
      const res = await axios.post("/api/v1/users/register", formData);
      const data = await res.data;
      console.log("User registered successfully!");
      console.log(data, data.success, data.msg, data.data);
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        userType: "buyer",
      });
      // Redirect to login page or handle success message
      navigate("/signin");
    } catch (error) {
      console.error("Error registering user:", error.message);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="signup-section">
      <div className="google-facebook-div">
        <div className="f-g make-center">
          <i class="fa-brands fa-google"></i>
          <p>Sign Up With Google</p>
        </div>
        <div className="f-g make-center">
          <i class="fa-brands fa-facebook-f"></i>
          <p>Sign Up With Facebook</p>
        </div>
      </div>
      <div className="s-text">OR</div>
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="msg-box">
          <div className="input">
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder="firstname"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="lastname"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="submit ">
          <button className="btn">Submit</button>
          <p onClick={() => navigate("/signin")}>Back to Login</p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
