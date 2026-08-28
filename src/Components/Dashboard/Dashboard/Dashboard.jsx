import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import Sidebar from "../SideBar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;