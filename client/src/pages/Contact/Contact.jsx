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
      <div className="map-container">
        <iframe
          title="google-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.2139811281637!2d-122.0856021838681!3d37.42079867986253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sGoogle%20LLC!5e0!3m2!1sen!2sin!4v1678727237816!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <form onSubmit={handleSubmit} className="form-signup mt-10">
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
          <textarea
            rows={8}
            type="text"
            placeholder="Please Enter Your Message"
          />
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
