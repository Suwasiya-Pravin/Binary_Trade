import "./App.css";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer"
import Home from "./pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import About from "./pages/About/About";
import SignUp from "./pages/Registration/SignUp";
import DeveloperRegister from "./pages/Registration/DeveloperReg/DevSignUp";
import Login from "./pages/Login/Login"
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/ProjectPage/Project";
import SingleProject from "./pages/ProjectPage/SingleProject/SingleProject";
import UserDashboard from "./pages/Dashboard/UserDashboard/UserDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard/AdminDashboard"
import DeveloperDashboard from "./pages/Dashboard/DeveloperDashboard/DeveloperDashboard"
import Payment from "./pages/payments/Payment";
import { GlobalProvider } from "./GlobalState";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <GlobalProvider>
      <Header/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/projects/:slug" element={<SingleProject/>}/>
        <Route path="/payment/:slug" element={<Payment/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/developer/register" element={<DeveloperRegister/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/user/dashboard" element={<UserDashboard/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/developer/dashboard" element={<DeveloperDashboard/>}/>
      </Routes>
      
      <Footer/>
    </GlobalProvider>
    </>
  );
}

export default App;
