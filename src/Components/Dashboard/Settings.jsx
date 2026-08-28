import { useNavigate } from "react-router-dom";

const Settings = () => {
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

  return (
    <main className="min-h-screen flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your session and account access.</p>
      </div>
      <section className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">Session</h2>
        <p className="mt-1 text-sm text-slate-500">Sign out of Vaultly on this device.</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          Sign out
        </button>
      </section>
    </main>
  );
};

export default Settings;
