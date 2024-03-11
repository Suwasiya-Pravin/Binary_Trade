import React,{useContext} from "react";
import { GlobalContext } from "../../GlobalState";
import "./Home.css";

const Home = () => {
  const { globalState } = useContext(GlobalContext);
  console.log(globalState)
  return (
    <div className="hero">
      <h1>Welcome to Binary Trade</h1>
      <p>Your one-stop shop for all software needs.</p>
      <button>Shop Now</button>
      <p style={{width:"100%",padding:"40px"}}>
        {JSON.stringify(globalState)}
      </p>
    </div>
  );
};

export default Home;
