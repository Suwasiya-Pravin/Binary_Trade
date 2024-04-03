import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-container bg-bl text-white">
      <div className="footer">
        <div className="section bg-bl text-white">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/developer/register">Sell with Us</NavLink>
            </li>
          </ul>
        </div>

        <div className="section">
          <h4>Terms and Policy</h4>
          <ul>
            <li>
              <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to="/terms-and-conditions">Terms and Conditions</NavLink>
            </li>
          </ul>
        </div>

        <div className="newsletter">
          <h4>NEWSLETTER</h4>
          <p>Sign Up for Our Newsletter:</p>
          <input type="email" placeholder="Please Enter Your Email" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
