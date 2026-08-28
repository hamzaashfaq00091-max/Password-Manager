import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { decryptPassword } from "../../../../utils/crypto";

const Vault = () => {
  const [vaultItems, setVaultItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Password viewing/decryption
  const [selectedItem, setSelectedItem] = useState(null);
  const [masterPassword, setMasterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [decrypting, setDecrypting] = useState(false);
  const [decryptError, setDecryptError] = useState("");

  // Copy state
  const [copied, setCopied] = useState(false);

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

  // Search all vault items
  const filteredPasswords = vaultItems.filter((item) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    return (
      item.website?.toLowerCase().includes(searchText) ||
      item.username?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText)
    );
  });

  const handleViewPassword = (item) => {
    setSelectedItem(item);
    setMasterPassword("");
    setDecryptedPassword("");
    setDecryptError("");
    setShowPassword(false);
    setCopied(false);
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

  const handleCopyPassword = async () => {
    if (!decryptedPassword) return;

    try {
      await navigator.clipboard.writeText(decryptedPassword);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
    setMasterPassword("");
    setDecryptedPassword("");
    setDecryptError("");
    setShowPassword(false);
    setCopied(false);
  };

  return (
    <main className="min-h-screen flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="mb-2">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              ← Dashboard
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Vault
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all your saved passwords securely.
          </p>
        </div>

        <Link
          to="/add-password"
          className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
        >
          + Add Password
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search website, username or category..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      {/* Vault count */}
      {!loading && !error && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredPasswords.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {vaultItems.length}
            </span>{" "}
            passwords
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Loading your vault...
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

      {/* Empty Vault */}
      {!loading &&
        !error &&
        vaultItems.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

            <div className="text-4xl">
              🔐
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Your vault is empty
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your first password to get started.
            </p>

            <Link
              to="/add-password"
              className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Add Password
            </Link>
          </div>
        )}

      {/* Search Empty */}
      {!loading &&
        !error &&
        vaultItems.length > 0 &&
        filteredPasswords.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

            <div className="text-3xl">
              🔍
            </div>

            <h2 className="mt-3 text-sm font-semibold text-slate-900">
              No passwords found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Try searching with another website, username, or category.
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
                className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between ${
                  index !== filteredPasswords.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >

                {/* Website */}
                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                    🌐
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">

                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {item.website}
                      </h3>

                      {item.favorite && (
                        <span
                          className="text-sm"
                          title="Favorite"
                        >
                          ⭐
                        </span>
                      )}

                    </div>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {item.category || "Other"}
                    </p>
                  </div>
                </div>

                {/* Username + Actions */}
                <div className="flex items-center justify-between gap-3 sm:justify-end">

                  <span className="max-w-[200px] truncate text-sm text-slate-500">
                    {item.username}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleViewPassword(item)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`View ${item.website} password`}
                    title="View password"
                  >
                    👁
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      {/* Password Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            {!showPassword ? (
              <>
                {/* Unlock Form */}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    View Password
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter your master password to view the password for{" "}
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
                      onClick={closeModal}
                      className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={decrypting}
                      className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {decrypting
                        ? "Unlocking..."
                        : "Unlock"}
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

                <div className="mt-6 flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {copied ? "✓ Copied" : "📋 Copy"}
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
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

export default Vault;