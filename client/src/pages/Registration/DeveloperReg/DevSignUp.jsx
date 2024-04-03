import React, { useState } from "react";
import "../SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// pravinsuwasiya45@gmail.com   password : developer
const DevSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    bio: "",
    skills: "",
    socialMedia: "",
    mobile: "",
    password: "",
    userType: "developer",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an Axios POST request to your backend API
      const res = await axios.post("/api/v1/users/dev-register", formData);
      const data = await res.data;
      console.log("Developer Register Successfully registered successfully!");
      console.log(data, data.success, data.msg, data.data);
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        bio: "",
        skills: "",
        socialMedia: "",
        mobile: "",
        password: "",
        userType: "developer",
      });
      // Redirect to login page or handle success message
      navigate("/signin");
    } catch (error) {
      console.error("Error registering user:", error.message);
      // Handle error (display error message, etc.)
    }
  };

  return (
<div className="bg-bl text-white">
<div className="signup-section bg-bl text-white">
      <h1 className="md:text-4xl text-2xl">Sell With Us , <span className="gradient">Coder !!</span></h1>
      <br />
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
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Bio</label>
          <textarea
            type="text"
            name="bio"
            placeholder="Tell About yourself"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="Enter Your skills(example java,c++ .. )"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Social Media link</label>
          <input
            type="text"
            name="socialMedia"
            placeholder="Enter your github Account"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
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
</div>
  );
};

export default DevSignUp;
