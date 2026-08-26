import React from "react";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-xl font-bold tracking-tight text-indigo-600"
        >
          Vaultly
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/dashboard"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Dashboard
          </Link>

          <Link
            to="/vault"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Vault
          </Link>

          <Link
            to="/favorites"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Favorites
          </Link>

          <Link
            to="/categories"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Categories
          </Link>

          <Link
            to="/settings"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Settings
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Link
            to="/profile"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Profile
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Logout
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default DashboardNavbar;