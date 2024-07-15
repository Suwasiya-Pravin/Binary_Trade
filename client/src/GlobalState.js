// GlobalState.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    bio: '',
    favoriteProjects: [],
    mobile: '',
    projects: [],
    skills: [],
    socialMedia: '',
    tokens: [],
    transactions: [],
    userType: '',
    walletBalance: 0
  }); 
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/v1/users/get-user");
        console.log(response)
        setGlobalState(response.data.data);
      } catch (error) {
        console.error("Login failed:", error.message);
        setGlobalState({});
      }
    };
    getData();
  }, []);
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
