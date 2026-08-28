import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to load profile");
        setUser(data.user);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  return (
    <main className="min-h-screen flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="mt-1 text-sm text-slate-500">View your Vaultly account details.</p>
      </div>
      {loading && <p className="text-sm text-slate-500">Loading profile...</p>}
      {error && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</p>}
      {!loading && !error && user && (
        <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <dl className="space-y-5">
            <div><dt className="text-xs font-medium uppercase text-slate-400">Name</dt><dd className="mt-1 text-sm text-slate-900">{user.name || "Not available"}</dd></div>
            <div><dt className="text-xs font-medium uppercase text-slate-400">Email</dt><dd className="mt-1 text-sm text-slate-900">{user.email || "Not available"}</dd></div>
            <div><dt className="text-xs font-medium uppercase text-slate-400">User ID</dt><dd className="mt-1 break-all font-mono text-xs text-slate-500">{user.id || user.userId}</dd></div>
          </dl>
        </div>
      )}
    </main>
  );
};

export default Profile;
