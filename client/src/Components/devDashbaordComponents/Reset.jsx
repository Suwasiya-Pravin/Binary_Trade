import React,{useState} from "react";
import axios from "axios";

export const Reset = () => {
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
        alert("Password has been updated successfully");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
