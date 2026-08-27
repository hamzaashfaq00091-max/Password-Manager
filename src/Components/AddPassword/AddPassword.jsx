import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateSalt,encryptPassword } from "../../utils/crypto";

const AddPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
    category: "Other",
    favorite: false,
    masterPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.website ||
      !formData.username ||
      !formData.password ||
      !formData.masterPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Generate a random salt
      const salt = generateSalt();

      // Encrypt the website password
      const encryptedData = await encryptPassword(
        formData.password,
        formData.masterPassword,
        salt
      );

      // Send ONLY encrypted password data to backend
      const response = await fetch(
        "http://localhost:5000/api/vault",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            website: formData.website,
            username: formData.username,

            encryptedPassword:
              encryptedData.encryptedPassword,

            iv: encryptedData.iv,

            salt: encryptedData.salt,

            category: formData.category,

            favorite: formData.favorite,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save password"
        );
      }

      setSuccess("Password saved successfully!");

      // Clear sensitive fields
      setFormData((prev) => ({
        ...prev,
        password: "",
        masterPassword: "",
      }));

      // Go back to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
            Add Password
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Store a new password securely in your vault.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
                {success}
              </div>
            )}

            {/* Website */}
            <div>
              <label
                htmlFor="website"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Website
              </label>

              <input
                id="website"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                placeholder="github.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Username / Email
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Website Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Website Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter website password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />

              <p className="mt-2 text-xs text-slate-400">
                This password will be encrypted before being sent to
                the server.
              </p>
            </div>

            {/* Master Password */}
            <div>
              <label
                htmlFor="masterPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Master Password
              </label>

              <input
                id="masterPassword"
                name="masterPassword"
                type="password"
                value={formData.masterPassword}
                onChange={handleChange}
                placeholder="Enter your master password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />

              <p className="mt-2 text-xs text-slate-400">
                Your master password is used locally to encrypt the
                website password. It is not sent to the server.
              </p>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="Other">Other</option>
                <option value="Social">Social</option>
                <option value="Work">Work</option>
                <option value="Development">Development</option>
                <option value="Finance">Finance</option>
                <option value="Entertainment">
                  Entertainment
                </option>
              </select>
            </div>

            {/* Favorite */}
            <div className="flex items-center gap-3">

              <input
                id="favorite"
                name="favorite"
                type="checkbox"
                checked={formData.favorite}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <label
                htmlFor="favorite"
                className="text-sm text-slate-700"
              >
                Add to favorites
              </label>

            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

              <Link
                to="/dashboard"
                className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Encrypting & Saving..." : "Save Password"}
              </button>

            </div>

          </form>
        </div>

        {/* Security Information */}
        <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
          <div className="flex gap-3">

            <span className="text-lg">🔐</span>

            <div>
              <h3 className="text-sm font-semibold text-indigo-900">
                Your password is encrypted
              </h3>

              <p className="mt-1 text-xs leading-5 text-indigo-700">
                The website password is encrypted in your browser
                before it is sent to the Vaultly server.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
};

export default AddPassword;