import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const DashboardNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      navigate("/login");
    }
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/vault": "My Vault",
    "/favorites": "Favorites",
    "/categories": "Categories",
    "/settings": "Settings",
    "/profile": "Profile",
    "/add-password": "Add Password",
  };

  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="rounded-lg p-2 text-xl text-slate-600 hover:bg-slate-100 md:hidden"
          >
            ☰
          </button>
          <NavLink
            to="/dashboard"
            className="text-xl font-bold tracking-tight text-indigo-600"
          >
            Vaultly
          </NavLink>
          <span className="hidden border-l border-slate-200 pl-3 text-sm font-medium text-slate-500 sm:block">
            {pageTitles[pathname] || "Dashboard"}
          </span>
        </div>

        <div className="flex items-center gap-4">

          <NavLink
            to="/profile"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Profile
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default DashboardNavbar;