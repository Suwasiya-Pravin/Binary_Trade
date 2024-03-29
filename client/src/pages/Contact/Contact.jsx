import React from "react";
import "../Registration/SignUp.css";
import { toast } from "react-toastify";
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message Send Successfully")
  };

  return (
    <div className="bg-white mt-16  ">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-start">
          <p className="mt-2 text-3xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl">
            Get in touch
          </p>
          <p className="mt-4 text-lg leading-7 text-gray-500 lg:mt-5 lg:text-xl">
            Have any questions or comments? We'd love to hear from you. Fill out
            the contact form below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="mt-10">
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
            <div className="submit ">
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>

        <div className="mt-10 md:mt-12">
          <div>
            <h2 className="mt-8 text-3xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl">
              Other ways to reach us
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            <div>
              <p className="text-lg leading-6 font-medium text-gray-900">
                Email
              </p>
              <p className="mt-2 text-base leading-6 text-gray-500">
                support@softwaremarketplace.com
              </p>
            </div>
            <div>
              <p className="text-lg leading-6 font-medium text-gray-900">
                Phone
              </p>
              <p className="mt-2 text-base leading-6 text-gray-500">
                +1 (123) 456-7890
              </p>
            </div>
            <div>
              <p className="text-lg leading-6 font-medium text-gray-900">
                Address
              </p>
              <p className="mt-2 text-base leading-6 text-gray-500">
                123 Software Marketplace Ave, Suite 1000, San Francisco, CA
                94111
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-lg leading-6 font-medium text-gray-900">
                Social Media
              </p>
              <div className="mt-2 flex space-x-6 text-lg leading-5 text-gray-500">
                <a href="https://www.linkedin.com/in/pravin-suwasiya-bb6404234/" className="font-medium text-gray-900 underline">
                <i class="fa-brands fa-x-twitter hover:text-blue-600"></i>
                </a>
                <span>|</span>
                <a href="https://www.linkedin.com/in/pravin-suwasiya-bb6404234/" className="font-medium text-gray-900 underline">
                <i class="fa-brands fa-linkedin-in hover:text-blue-600"></i>
                </a>
                <span>|</span>
                <a href="https://www.linkedin.com/in/pravin-suwasiya-bb6404234/" className="font-medium text-gray-900 underline">
                <i class="fa-brands fa-github hover:text-blue-600"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
