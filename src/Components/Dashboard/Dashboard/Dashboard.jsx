import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import Sidebar from "../SideBar/Sidebar";
import DashboardContent from "../DashboardContent/DashboardContent";

const Dashboard = () => {
  return (
    <div>
      <DashboardNavbar />

      <div className="flex">
        <Sidebar />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;