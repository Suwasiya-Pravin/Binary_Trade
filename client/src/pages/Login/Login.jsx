import React, { useState, useContext } from "react";
import "../../pages/Registration/SignUp.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalState";
import axios from "axios";
import {toast } from 'react-toastify'
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setGlobalState } = useContext(GlobalContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Invalid email address");
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      try {
        const response = await axios.post("/api/v1/users/login", {
          email,
          password,
        });
        console.log("Logged in successfully:", response.data);
        toast.success("Login Successfully !!")
        setGlobalState(response.data.data);
        if (response.data.data.userType === "buyer") {
          navigate("/user/dashboard");
        }
        if (response.data.data.userType === "developer") {
          navigate("/developer/dashboard");
        }
        if (response.data.data.userType === "admin") {
          navigate("/admin/dashboard");
        }
        setEmailError("");
        setPasswordError("");
      } catch (error) {
        console.error("Login failed:", error.message);
        // Handle login error (e.g., show error message)
      }
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
 <div className="bg-bl text-white">
     <div className="signup-section bg-bl text-white">
       <h1 className="text-3xl md:text-5xl mb-12">
        Welcome Back <span className="text-blue-600 gradient">User !!</span>
      </h1>
      {/* <div className="google-facebook-div">
        <div className="f-g make-center">
          <i class="fa-brands fa-google"></i>
          <p>Sign In With Google</p>
        </div>
        <div className="f-g make-center">
          <i class="fa-brands fa-facebook-f"></i>
          <p>Sign In With Facebook</p>
        </div>
      </div>
      <div className="s-text">OR</div> */}
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="input">
          <label>Email Address</label>
          <input
            type="text"
            placeholder="Please Enter Your Email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="input">
          <label>Password</label>
          <input
            type={isPasswordVisible?'text':'password'}
            placeholder="Please Enter Your Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="absolute top-6 right-0 m-4 text-gray-600 hover:text-gray-900"
            onClick={togglePasswordVisibility}>
            <i className={`fa-solid ${isPasswordVisible?'fa-eye':'fa-eye-slash'} text-gray-500`}></i>
          </button>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <hr />
        <div className="submit ">
          <button className="btn">Submit</button>
          <p onClick={() => navigate("/signup")}>Back to Sign Up</p>
        </div>
      </form>
    </div>
 </div>
  );
};

export default Login;
