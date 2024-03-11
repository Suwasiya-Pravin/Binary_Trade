import React from "react";
import "../Registration/SignUp.css";
const Contact = () => {
  const handleSubmit = () => {
    console.log("send msg");
  };
  return (
    <div className="signup-section">
      <h1 style={{ fontSize: "24px" }}>Contact Information</h1>
      <hr />
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="msg-box">
          <div className="input">
            <label>Name</label>
            <input type="text" placeholder="Please Enter Your Name" />
          </div>
        <div className="input">
          <label>Email Address</label>
          <input type="email" placeholder="Please Enter Your Email" />
        </div>
        </div>
        <div className="input">
          <label>Message</label>
          <textarea rows={8} type="text" placeholder="Please Enter Your Message" />
        </div>
        <hr />
        <div className="submit ">
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
