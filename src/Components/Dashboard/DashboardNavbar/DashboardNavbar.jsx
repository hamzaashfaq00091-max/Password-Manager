import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();

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

  const navigationItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/vault", label: "Vault" },
    { to: "/favorites", label: "Favorites" },
    { to: "/categories", label: "Categories" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink
          to="/dashboard"
          className="text-xl font-bold tracking-tight text-indigo-600"
        >
          Vaultly
        </NavLink>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">

          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-700 hover:text-indigo-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

        </div>

        {/* Right Side */}
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