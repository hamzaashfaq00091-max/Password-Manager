import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import Sidebar from "../SideBar/Sidebar";
import RecentPasswords from "../DashboardContent/DashboardContent";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <DashboardNavbar />

      <div className="flex">
        <Sidebar />
        <RecentPasswords />
      </div>
    </div>
  );
};

export default Dashboard;