import { useState } from "react";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import Sidebar from "../SideBar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;