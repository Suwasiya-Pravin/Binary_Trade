import React, { useState ,useContext} from "react";
import "../../pages/Registration/SignUp.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalState";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setGlobalState } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/users/login", { email, password });
      console.log("Logged in successfully:", response.data);
      setGlobalState(response.data.data)
      if(response.data.data.userType==='buyer'){
        navigate('/user/dashboard');
      }
      if(response.data.data.userType==='developer'){
        navigate('/developer/dashboard');
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login error (e.g., show error message)
    }
  };
  return (
    <div className="signup-section">
      <div className="google-facebook-div">
        <div className="f-g make-center">
          <i class="fa-brands fa-google"></i>
          <p>Sign In With Google</p>
        </div>
        <div className="f-g make-center">
          <i class="fa-brands fa-facebook-f"></i>
          <p>Sign In With Facebook</p>
        </div>
      </div>
      <div className="s-text">OR</div>
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="input">
          <label>Email Address</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <hr />
        <div className="submit ">
          <button className="btn">Submit</button>
          <p onClick={() => navigate("/signup")}>Back to Sign Up</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
