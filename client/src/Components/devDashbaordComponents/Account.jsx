import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../GlobalState";
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

const Account = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    firstname: globalState.firstname,
    lastname: globalState.lastname,
    username: globalState.username,
    bio: globalState.bio,
    skills: globalState.skills,
    socialMedia: globalState.socialMedia,
    mobile: globalState.mobile,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an Axios POST request to your backend API
      const res = await axios.put("/api/v1/users/update-user", formData);
      console.log(res.data);
      setGlobalState(res.data.data);
      console.log(res.data);
      toast.success("Data Update Successfully");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  const onReload = () => {
    setFormData({
      firstname: globalState.firstname,
      lastname: globalState.lastname,
      username: globalState.username,
      bio: globalState.bio,
      skills: globalState.skills,
      socialMedia: globalState.socialMedia,
      mobile: globalState.mobile,
    });
  };
  useEffect(() => {
    onReload(); // eslint-disable-next-line
  }, []);

  return (
    <>
    <div className="signup-section publish-r">
      <h1>Account Details</h1>
      <hr />
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="msg-box">
          <div className="input">
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder="firstname"
              onChange={handleChange}
              value={formData.firstname}
            />
          </div>
          <div className="input">
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="lastname"
              value={formData.lastname}
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
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Bio</label>
          <textarea
            type="text"
            name="bio"
            placeholder="Tell About yourself"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="Enter Your skills(example java,c++ .. )"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Social Media link</label>
          <input
            type="text"
            name="socialMedia"
            placeholder="Enter your github Account"
            value={formData.socialMedia}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="submit ">
          <button className="btn">Save Changes</button>
        </div>
      </form>
    </div>
    <ToastContainer />
    </>
  );
};

export default Account;
