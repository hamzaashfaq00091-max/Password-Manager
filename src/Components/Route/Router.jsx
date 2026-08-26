import { Route ,Routes } from "react-router-dom";


import Home from "../Dashboard/Home";
import Login from "../Pages/Signup/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Navbar from "../Navbar";
import Features from "../Features/Features";
import Dashboard from "../Dashboard/Dashboard/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/features" element={<Features />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      
    </Routes>
  );
};

export default AppRouter;