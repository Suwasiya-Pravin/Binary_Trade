import React, { useState } from "react";
import "./DeveloperDashboard.css";
import { Reset } from "../../../Components/devDashbaordComponents/Reset";
import Projects from "../../../Components/devDashbaordComponents/Projects";
import Add from "../../../Components/devDashbaordComponents/Add";
import Account from "../../../Components/devDashbaordComponents/Account";
// import TotalBalance from "../../../Components/devDashbaordComponents/TotalBalance";


const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState("Account");
  const renderPage = () => {
    switch (currentPage) {
      case "Reset":
        return <Reset />;
      case "Account":
        return <Account />;
      case "Projects":
        return <Projects />;
      case "Add":
        return <Add />;
      default:
        return <></>;
    }
  };

  return (
    <div className="user-dashboard  bg-bl text-white ">
      <div className="navigation-menu">
        <h2>Navigation Menu</h2>
        <ul>
          <li
            className={currentPage === "Account" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Account")}>
            Account Details
          </li>
          <li
            className={currentPage === "Reset" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Reset")}>
            Reset Password
          </li>
          <li
            className={currentPage === "Add" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Add")}>
            Add Project
          </li>
          <li
            className={currentPage === "Projects" ? "menu-active" : ""}
            onClick={() => setCurrentPage("Projects")}>
            All Projects
          </li>
        </ul>
      </div>
      <div className="page-content">{renderPage()}</div>
    </div>
  );
};

export default UserDashboard;
