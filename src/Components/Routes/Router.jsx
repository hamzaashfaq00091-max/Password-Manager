import { Route ,Routes } from "react-router-dom";


import Home from "../Dashboard/Home";
import Login from "../Pages/Signup/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Navbar from "../Navbar";
import Features from "../Features/Features";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/features" element={<Features />} />
      
    </Routes>
  );
};

export default AppRouter;