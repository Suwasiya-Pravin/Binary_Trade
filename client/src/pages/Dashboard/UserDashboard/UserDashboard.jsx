import React, { useState, useContext, useEffect } from "react";
import "./UserDashboard.css";
import Image from "../../../assets/product.jpg";
import axios from "axios";
import { GlobalContext } from "../../../GlobalState";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileOverview = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    firstname: globalState.firstname,
    lastname: globalState.lastname,
    username: globalState.username,
    mobile: globalState.mobile,
  });
  const setFormDataOnReload = () => {
    setFormData({
      firstname: globalState.firstname,
      lastname: globalState.lastname,
      username: globalState.username,
      mobile: globalState.mobile,
    });
  };
  useEffect(() => {
    // eslint-disable-next-line
    setFormDataOnReload(); // eslint-disable-next-line
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your API endpoint
      const response = await axios.put("/api/v1/users/update-user", formData);
      console.log("Response from server:", response.data);
      setGlobalState(response.data.data);
      toast.success("Profile Updated Successfully");
      // Handle success or any other logic here
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
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
              placeholder="Please Enter Your Firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="Please Enter Your Lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="input">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Please Enter Your Username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            placeholder="Please Enter Your Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>

        <div className="submit ">
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};
const Wishlist = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("/api/v1/users/all-favorites"); // Replace 'token' with the actual token
      setFavorites(response.data.data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);

  const DeleteFav = async (id) => {
    try {
      const response = await axios.delete("/api/v1/users/delete-favorite", {
        data: {
          projectId: id,
        },
      });

      if (response.data.success) {
        // handle successful deletion, e.g. update the UI
        console.log("Favorite project removed successfully");
        fetchFavorites();
        toast.warning("Project deleted from wishlist");
      } else {
        // handle error, e.g. show an error message
        console.log(response.data.msg);
      }
    } catch (error) {
      // handle network errors
      console.log(error.message);
    }
  };
  return (
    <div className="signup-section publish-r ">
      <h1>Wishlist</h1>
      <hr />
      {favorites.map((favorite) => (
        <div className="productCard p-card-dashboard" key={favorite._id}>
          <i
            className="fa-solid fa-circle-xmark close-icon"
            onClick={() => DeleteFav(favorite._id)}></i>
          <img src={Image} alt={favorite.title} />{" "}
          {/* Replace 'Image' with the actual image source */}
          <div
            onClick={() => navigate(`/projects/${favorite.slug}`)}
            style={{ cursor: "pointer" }}>
            <h4 className="productCategory">{favorite.category.name}</h4>
            <h3 className="productName">{favorite.title}</h3>
            <p>₹ {favorite.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Transaction = () => {
  return (
    <div className="signup-section publish-r ">
      <h1>Transaction</h1>
      <hr />
      <div className="productCard p-card-dashboard transcation">
        <div className="flex-row">
          <img src={Image} alt={"portfolio website"} />
          <div>
            <h4 className="productCategory">portfolio</h4>
            <h3 className="productName">PortFolio Website</h3>
            <p>$1000</p>
          </div>
        </div>
        <div>
          <button className="btn">Download</button>
        </div>
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("/api/v1/users/change-password", {
        currentPassword,
        newPassword,
      });
      if (response.data.success) {
        setCurrentPassword("");
        setNewPassword("");
        toast.success("Password Changes Successfully");
      } else {
        alert(response.data.msg);
        toast.error("Password is Incorrect");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Please Enter all Input");
    }
  };
  return (
    <div className="signup-section publish-r">
      <h1>Reset Password</h1>
      <hr />
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="input">
          <label>Current Password</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            className="show-password"
            onClick={(e) => {
              e.preventDefault();
              setShowCurrentPassword(!showCurrentPassword);
            }}>
            {showCurrentPassword ? (
              <i class="fa-regular fa-eye"></i>
            ) : (
              <i class="fa-regular fa-eye-slash"></i>
            )}
          </button>
        </div>
        <div className="input">
          <label>New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="show-password"
            onClick={(e) => {
              e.preventDefault();
              setShowNewPassword(!showNewPassword);
            }}>
            {showNewPassword ? (
              <i class="fa-regular fa-eye"></i>
            ) : (
              <i class="fa-regular fa-eye-slash"></i>
            )}
          </button>
        </div>

        <div className="submit ">
          <button className="btn">Reset</button>
        </div>
      </form>
    </div>
  );
};

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState("Profile");
  const renderPage = () => {
    switch (currentPage) {
      case "Profile":
        return <ProfileOverview />;
      case "Reset":
        return <ResetPassword />;
      case "Favorites":
        return <Wishlist />;
      case "Transaction":
        return <Transaction />;
      default:
        return (
          <div className="default-page">{/* Add your Profile here */}</div>
        );
    }
  };

  return (
    <div className="user-dashboard">
      <div className="navigation-menu">
        <h2>Navigation Menu</h2>
        <ul>
          <li
            className={currentPage === "Profile" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Profile")}>
            Profile
          </li>
          <li
            className={currentPage === "Reset" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Reset")}>
            Reset Password
          </li>
          <li
            className={currentPage === "Favorites" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Favorites")}>
            Favorites
          </li>
          <li
            className={currentPage === "Transaction" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Transaction")}>
            Transaction
          </li>
        </ul>
      </div>
      <div className="page-content">{renderPage()}</div>
    </div>
  );
};

export default UserDashboard;
