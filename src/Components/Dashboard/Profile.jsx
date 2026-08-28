import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to load profile");
      const profile = data.user;

      if (!profile || !profile.name || !profile.email) {
        throw new Error("Profile data is unavailable. Please restart the server and try again.");
      }

      setUser(profile);
      setFormData({ name: profile.name, email: profile.email });
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update profile");
      const profile = data.user;

      if (!profile || !profile.name || !profile.email) {
        throw new Error("The server returned incomplete profile data.");
      }

      setUser(profile);
      setFormData({ name: profile.name, email: profile.email });
      setSuccess("Profile updated successfully.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="mt-1 text-sm text-slate-500">View your Vaultly account details.</p>
      </div>
      {loading && <p className="text-sm text-slate-500">Loading profile...</p>}
      {!loading && error && (
        <div className="max-w-xl rounded-lg bg-red-50 p-4 text-sm text-red-600">
          <p>{error}</p>
          <button type="button" onClick={loadProfile} className="mt-3 font-semibold underline">Try again</button>
        </div>
      )}
      {!loading && !error && user && (
        <form onSubmit={handleSave} className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-slate-900">Account details</p>
              <p className="text-sm text-slate-500">Update the information connected to your account.</p>
            </div>
          </div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="profile-name">Name</label>
          <input id="profile-name" name="name" value={formData.name} onChange={handleChange} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="profile-email">Email</label>
          <input id="profile-email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-3 text-sm text-green-600">{success}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button type="button" onClick={handleLogout} className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">Log out</button>
          </div>
          <p className="mt-6 break-all text-xs text-slate-400">User ID: {user.id || user.userId}</p>
        </form>
      )}
    </main>
  );
};

export default Profile;
