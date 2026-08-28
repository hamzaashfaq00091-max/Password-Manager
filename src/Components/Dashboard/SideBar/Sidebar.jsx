import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navigationItems = [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/vault", label: "Vault", icon: "🔐" },
    { to: "/favorites", label: "Favorites", icon: "⭐" },
    { to: "/categories", label: "Categories", icon: "📁" },
    { to: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
            }`
          }
        >
          <span>👤</span>
          <span>Profile</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;