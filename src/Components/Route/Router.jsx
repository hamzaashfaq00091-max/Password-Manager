import { Route, Routes } from "react-router-dom";


import Home from "../Dashboard/Home";
import Login from "../Pages/Signup/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Navbar from "../Navbar";
import Features from "../Features/Features";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import DashboardContent from "../Dashboard/DashboardContent/DashboardContent";
import AddPassword from "../AddPassword/AddPassword";
import Vault from "../Pages/Signup/vault/Vault";
import Categories from "../Dashboard/Categories";
import Profile from "../Dashboard/Profile";
import Settings from "../Dashboard/Settings";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/features" element={<Features />} />
      <Route element={<Dashboard />}>
        <Route path="/dashboard" element={<DashboardContent />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/favorites" element={<Vault favoriteOnly />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-password" element={<AddPassword />} />
      </Route>
      
      

    </Routes>
  );
};

export default AppRouter;