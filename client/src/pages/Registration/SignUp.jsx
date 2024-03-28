import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const SignUpSchema = yup.object().shape({
  firstname: yup
    .string()
    .required("Firstname is required")
    .min(2, "Firstname must be at least 2 characters"),

  lastname: yup
    .string()
    .required("Lastname is required")
    .min(2, "Lastname must be at least 2 characters"),

  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Email is invalid")
    .min(5, "Email must be at least 5 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    userType: "buyer",
  };

  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  const TogglePasswordVisibility = ({ showPassword, setShowPassword }) => (
    <button
      type="button"
      className="absolute top-10 right-4 w-6 h-6 flex items-center justify-center focus:outline-none"
      onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? (
        <i className=" fa-solid fa-eye text-gray-500"></i>
      ) : (
        <i className=" fa-solid fa-eye-slash text-gray-500"></i>
      )}
    </button>
  );
  return (
    <div className="signup-section">
      <h1 className="text-3xl md:4xl text-center mb-12">
        Welcome To <span className="text-blue-600">Binary Trade</span>
      </h1>
      <br />
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            const res = await axios.post("/api/v1/users/register", values);
            const data = await res.data;
            console.log("User registered successfully!");
            console.log(data, data.success, data.msg, data.data);
            setSubmitting(false);
            resetForm();
            toast.success("Registered successfully!");
            navigate("/signin");
          } catch (error) {
            console.error("Error registering user:", error.message);
            setSubmitting(false);
            toast.error(error.message);
          }
        }}>
        {({ isSubmitting }) => (
          <Form className="form-signup">
            <div className="msg-box">
              <div className="input">
                Enter Your FirstName :
                <Field name="firstname" type="text" placeholder="Firstname" />
                <ErrorMessage
                  className="text-red-500"
                  name="firstname"
                  component="div"
                />
              </div>
              <div className="input">
                Enter Your Lastname :
                <Field name="lastname" type="text" placeholder="Lastname" />
                <ErrorMessage
                  className="text-red-500"
                  name="lastname"
                  component="div"
                />
              </div>
            </div>
            <div className="input">
              Enter Your Username :
              <Field name="username" type="text" placeholder="Username" />
              <ErrorMessage
                className="text-red-500"
                name="username"
                component="div"
              />
            </div>
            <div className="input">
              Enter Your Email :
              <Field name="email" type="email" placeholder="Email" />
              <ErrorMessage
                className="text-red-500"
                name="email"
                component="div"
              />
            </div>
            <div className="input">
              <label htmlFor="password">Enter Your Password</label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />

              <ErrorMessage
                className="text-red-500"
                name="password"
                component="div"
              />

              <TogglePasswordVisibility
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <button type="submit" className="btn w-20" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
      <br />
      <p className="flex justify-between">
        Already have an account?{" "}
        <NavLink to="/signin" className="text-blue-600">
          Back to Login
        </NavLink>
      </p>
    </div>
  );
};

export default SignUp;
