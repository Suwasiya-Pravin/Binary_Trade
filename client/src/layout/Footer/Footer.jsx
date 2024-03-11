import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footer">
            <div className="section">
                <h4>CUSTOMER SERVICE</h4>
                <ul>
                    <li>Contact Us</li>
                    <li>Sell With Us</li>
                    <li>Shipping</li>
                </ul>
            </div>

            <div className="section">
                <h4>LINKS</h4>
                <ul>
                    <li>Contact Us</li>
                    <li><NavLink to="/developer/register">Sell with Us</NavLink></li>
                    <li>Shipping</li>
                </ul>
            </div>

            <div className="newsletter">
                <h4>NEWSLETTER</h4>
                <p>Sign Up for Our Newsletter:</p>
                <input type="email" placeholder="Please Enter Your Email" />
                <button>Subscribe</button> 
            </div>
        </div>
    );
}

export default Footer;
