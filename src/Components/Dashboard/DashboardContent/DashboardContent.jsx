import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { decryptPassword } from "../../../utils/crypto";

const RecentPasswords = () => {
  const [vaultItems, setVaultItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [masterPassword, setMasterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [decrypting, setDecrypting] = useState(false);
  const [decryptError, setDecryptError] = useState("");

  useEffect(() => {
    const fetchVaultItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/vault",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch vault items"
          );
        }

        setVaultItems(data.vaultItems || []);
      } catch (error) {
        console.error("Fetch vault error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVaultItems();
  }, []);

  // Latest 3 passwords
  const recentPasswords = vaultItems.slice(0, 3);

  // Search
  const filteredPasswords = recentPasswords.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.website?.toLowerCase().includes(searchText) ||
      item.username?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText)
    );
  });

  // Dashboard statistics
  const totalPasswords = vaultItems.length;

  const totalFavorites = vaultItems.filter(
    (item) => item.favorite
  ).length;

  const totalCategories = new Set(
    vaultItems.map((item) => item.category)
  ).size;

  const handleViewPassword = (item) => {
    setSelectedItem(item);
    setMasterPassword("");
    setDecryptedPassword("");
    setDecryptError("");
    setShowPassword(false);
  };

  const handleDecryptPassword = async (e) => {
    e.preventDefault();

    if (!masterPassword.trim()) {
      setDecryptError("Please enter your master password.");
      return;
    }

    if (!selectedItem) {
      setDecryptError("No password selected.");
      return;
    }

    try {
      setDecrypting(true);
      setDecryptError("");

      const password = await decryptPassword(
        selectedItem.encryptedPassword,
        masterPassword,
        selectedItem.salt,
        selectedItem.iv
      );

      setDecryptedPassword(password);
      setShowPassword(true);
    } catch (error) {
      console.error("Decryption error:", error);

      setDecryptError(
        "Incorrect master password or unable to decrypt password."
      );
    } finally {
      setDecrypting(false);
    }
  };
  return (
    <main className="min-h-screen flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Welcome back 👋
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your passwords securely from your vault.
          </p>
        </div>

        <Link
          to="/add-password"
          className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
        >
          + Add Password
        </Link>

      </div>


      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Passwords */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Total Passwords
            </span>

            <span className="rounded-lg bg-indigo-50 p-2 text-lg">
              🔐
            </span>

          </div>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {loading ? "..." : totalPasswords}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Stored in your vault
          </p>

        </div>


        {/* Favorites */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Favorites
            </span>

            <span className="rounded-lg bg-yellow-50 p-2 text-lg">
              ⭐
            </span>

          </div>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {loading ? "..." : totalFavorites}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Frequently used accounts
          </p>

        </div>


        {/* Weak Passwords */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Weak Passwords
            </span>

            <span className="rounded-lg bg-red-50 p-2 text-lg">
              ⚠️
            </span>

          </div>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            -
          </p>

          <p className="mt-1 text-xs text-red-500">
            Password analysis coming soon
          </p>

        </div>


        {/* Categories */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Categories
            </span>

            <span className="rounded-lg bg-green-50 p-2 text-lg">
              📁
            </span>

          </div>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {loading ? "..." : totalCategories}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Organized categories
          </p>

        </div>

      </div>


      {/* Search */}
      <div className="mb-8">

        <div className="relative">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your passwords..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />

        </div>

      </div>


      {/* Recent Passwords */}
      <section>

        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Passwords
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your recently added accounts.
            </p>
          </div>

          <Link
            to="/vault"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View All
          </Link>

        </div>


        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">

            <p className="text-sm text-slate-500">
              Loading your passwords...
            </p>

          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

            <p className="text-sm text-red-600">
              {error}
            </p>

          </div>
        )}


        {/* Empty */}
        {!loading &&
          !error &&
          recentPasswords.length === 0 && (

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">

              <div className="text-3xl">
                🔐
              </div>

              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                No passwords yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add your first password to your vault.
              </p>

              <Link
                to="/add-password"
                className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Add Password
              </Link>

            </div>
          )}


        {/* Search Result Empty */}
        {!loading &&
          !error &&
          recentPasswords.length > 0 &&
          filteredPasswords.length === 0 && (

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">

              <div className="text-2xl">
                🔍
              </div>

              <p className="mt-2 text-sm text-slate-500">
                No passwords match your search.
              </p>

            </div>
          )}


        {/* Password List */}
        {!loading &&
          !error &&
          filteredPasswords.length > 0 && (

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

              {filteredPasswords.map((item, index) => (

                <div
                  key={item._id}
                  className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between ${index !== filteredPasswords.length - 1
                    ? "border-b border-slate-100"
                    : ""
                    }`}
                >

                  {/* Website */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                      🌐
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {item.website}
                      </h3>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {item.category || "Other"}
                      </p>

                    </div>

                  </div>


                  {/* Username + Actions */}
                  <div className="flex items-center gap-3">

                    <span className="hidden max-w-[180px] truncate text-sm text-slate-500 sm:block">
                      {item.username}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleViewPassword(item)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={`View ${item.website} password`}
                    >
                      👁
                    </button>
               
                  </div>

                </div>

              ))}

            </div>
          )}

      </section>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            {!showPassword ? (
              <>
                {/* Master Password Form */}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    View Password
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter your master password to view the password
                    for{" "}
                    <span className="font-medium text-slate-700">
                      {selectedItem.website}
                    </span>
                    .
                  </p>
                </div>

                <form onSubmit={handleDecryptPassword}>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Master Password
                  </label>

                  <input
                    type="password"
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                    placeholder="Enter your master password"
                    autoFocus
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  {decryptError && (
                    <p className="mt-2 text-sm text-red-500">
                      {decryptError}
                    </p>
                  )}

                  <div className="mt-6 flex justify-end gap-3">

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(null);
                        setMasterPassword("");
                        setDecryptedPassword("");
                        setDecryptError("");
                        setShowPassword(false);
                      }}
                      className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={decrypting}
                      className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {decrypting ? "Unlocking..." : "Unlock"}
                    </button>

                  </div>

                </form>
              </>
            ) : (
              <>
                {/* Decrypted Password */}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Password
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedItem.website}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="mb-2 text-xs font-medium text-slate-500">
                    Password
                  </p>

                  <p className="break-all font-mono text-sm text-slate-900">
                    {decryptedPassword}
                  </p>

                </div>

                <div className="mt-6 flex justify-end">

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem(null);
                      setMasterPassword("");
                      setDecryptedPassword("");
                      setDecryptError("");
                      setShowPassword(false);
                    }}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Done
                  </button>

                </div>
              </>
            )}

          </div>
        </div>
      )}

    </main>
  );
};

export default RecentPasswords;