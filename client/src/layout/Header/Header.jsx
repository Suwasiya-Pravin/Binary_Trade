import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Header/Header.css"; // Make sure this path is correct
import { GlobalContext } from "../../GlobalState";
import axios from "axios";
const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [loginMenuActive, setLoginMenuActive] = useState(false);
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [isLogin, setIsLogin] = useState(false); // eslint-disable-next-line
  const [userType, setUserType] = useState(globalState.userType);
  useEffect(() => {
    setUserType(globalState.userType);
  }, [globalState.userType]);
  const renderLink = () => {
    switch (userType) {
      case "buyer":
        return (
          <li>
            <NavLink className="nav-link" to="/user/dashboard">
              Dashboard
            </NavLink>
          </li>
        );
      case "developer":
        return (
          <li>
            <NavLink className="nav-link" to="/developer/dashboard">
              Dashboard
            </NavLink>
          </li>
        );
      case "admin":
        return (
          <li>
            <NavLink className="nav-link" to="/admin/dashboard">
              Dashboard
            </NavLink>
          </li>
        );
      default:
        return (
          <li>
            <NavLink className="nav-link" onClick={logOut}>
              Log Out
            </NavLink>
          </li>
        );
    }
  };
  useEffect(() => {
    setIsLogin(globalState.username !== undefined);
  }, [globalState.username]);
  console.log(isLogin);
  const toggleNav = () => {
    setNavActive(!navActive);
  };
  const toggleLoginMenu = () => {
    setLoginMenuActive(!loginMenuActive);
  };
  const logOut = async () => {
    alert("Are you want to logout ?");
    const data = await axios.post("/api/v1/users/logout");
    console.log(data.data);
    setGlobalState({});
    alert("you log out successfully");
  };
  return (
    <nav>
      <div className="logo">
        <h4 className="gradient">Binary Trade</h4>
      </div>
      <ul className={`nav-links ${navActive ? "nav-active bg-black-300" : ""}`}>
        <li style={{ "--i": 1 }}>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li style={{ "--i": 2 }}>
          <NavLink className="nav-link" to="/projects">
            Projects
          </NavLink>
        </li>
        <li style={{ "--i": 3 }}>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        <li style={{ "--i": 4 }}>
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </li>
        <li style={{ "--i": 5 }} onClick={toggleLoginMenu}>
          <span className="nav-link">
            {isLogin ? globalState?.username : "Welcome"}
          </span>
          {loginMenuActive &&
            (isLogin ? (
              <ul className="login-menu">
                {renderLink()}
                <li>
                  <NavLink className="nav-link" onClick={logOut}>
                    Log Out
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="login-menu">
                <li>
                  <NavLink className="nav-link" to="/signin">
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            ))}
        </li>
      </ul>
      <div className="burger bg-bl" onClick={toggleNav}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Header;
