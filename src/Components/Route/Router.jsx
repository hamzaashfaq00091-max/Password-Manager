import { Route, Routes } from "react-router-dom";


import Home from "../Dashboard/Home";
import Login from "../Pages/Signup/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Navbar from "../Navbar";
import Features from "../Features/Features";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import AddPassword from "../AddPassword/AddPassword";
import Vault from "../Pages/Signup/vault/Vault";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/features" element={<Features />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vault" element={<Vault />} />
      <Route
        path="/add-password" element={<AddPassword />}
      />
      
      

    </Routes>
  );
};

export default AppRouter;