import { Link, useLocation } from "react-router-dom";

const sectionDetails = {
  "/favorites": {
    title: "Favorites",
    description: "Your favorite password entries will appear here.",
  },
  "/categories": {
    title: "Categories",
    description: "Organize your vault entries by category here.",
  },
  "/settings": {
    title: "Settings",
    description: "Account and vault settings will appear here.",
  },
  "/profile": {
    title: "Profile",
    description: "Your profile details will appear here.",
  },
};

const DashboardSection = () => {
  const { pathname } = useLocation();
  const section = sectionDetails[pathname] || sectionDetails["/settings"];

  return (
    <main className="min-h-screen flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{section.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{section.description}</p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
};

export default DashboardSection;
