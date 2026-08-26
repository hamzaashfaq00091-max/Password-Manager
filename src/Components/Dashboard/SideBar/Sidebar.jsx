import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      {/* <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link
          to="/dashboard"
          className="text-xl font-bold tracking-tight text-indigo-600"
        >
          Vaultly
        </Link>
      </div> */}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        <ul className="space-y-2">

          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <span>🏠</span>
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Vault */}
          <li>
            <Link
              to="/vault"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <span>🔐</span>
              <span>Vault</span>
            </Link>
          </li>

          {/* Favorites */}
          <li>
            <Link
              to="/favorites"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <span>⭐</span>
              <span>Favorites</span>
            </Link>
          </li>

          {/* Categories */}
          <li>
            <Link
              to="/categories"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <span>📁</span>
              <span>Categories</span>
            </Link>
          </li>

          {/* Settings */}
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <span>⚙️</span>
              <span>Settings</span>
            </Link>
          </li>

        </ul>

      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-200 p-4">

        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
        >
          <span>👤</span>
          <span>Profile</span>
        </Link>

      </div>

    </aside>
  );
};

export default Sidebar;