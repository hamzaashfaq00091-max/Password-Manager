import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { decryptPassword, encryptPassword } from "../../../../utils/crypto";

const Vault = ({ favoriteOnly = false }) => {
  // =========================
  // Vault State
  // =========================

  const [vaultItems, setVaultItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // =========================
  // View Password State
  // =========================

  const [selectedItem, setSelectedItem] = useState(null);
  const [masterPassword, setMasterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [decrypting, setDecrypting] = useState(false);
  const [decryptError, setDecryptError] = useState("");
  const [copied, setCopied] = useState(false);

  // =========================
  // Edit State
  // =========================

  const [editingItem, setEditingItem] = useState(null);

  const [editWebsite, setEditWebsite] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editMasterPassword, setEditMasterPassword] = useState("");

  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");

  // =========================
  // Delete State
  // =========================

  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [searchParams] = useSearchParams();

  // =========================
  // Fetch Vault
  // =========================

  const fetchVaultItems = async () => {
    try {
      setLoading(true);
      setError("");

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
      setError(error.message || "Failed to fetch vault.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaultItems();
  }, []);

  // =========================
  // Search
  // =========================

  const filteredPasswords = vaultItems.filter((item) => {
    const searchText = (search || searchParams.get("category") || "")
      .toLowerCase()
      .trim();

    if (favoriteOnly && !item.favorite) return false;

    if (!searchText) return true;

    return (
      item.website?.toLowerCase().includes(searchText) ||
      item.username?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText)
    );
  });

  // =========================
  // View Password
  // =========================

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

  // =========================
  // Copy Password
  // =========================

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

  // =========================
  // Close View Modal
  // =========================

  const closeViewModal = () => {
    setSelectedItem(null);

    setMasterPassword("");
    setDecryptedPassword("");
    setDecryptError("");
    setShowPassword(false);
    setCopied(false);
  };

  // =========================
  // Open Edit Modal
  // =========================

  const handleEditPassword = (item) => {
    setEditingItem(item);

    setEditWebsite(item.website || "");
    setEditUsername(item.username || "");
    setEditCategory(item.category || "");
    setEditPassword("");
    setEditMasterPassword("");

    setEditError("");
  };

  // =========================
  // Close Edit Modal
  // =========================

  const closeEditModal = () => {
    if (savingEdit) return;

    setEditingItem(null);

    setEditWebsite("");
    setEditUsername("");
    setEditCategory("");
    setEditPassword("");
    setEditMasterPassword("");
    setEditError("");
  };

  // =========================
  // Save Edited Password
  // =========================

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingItem) {
      setEditError("No password selected.");
      return;
    }

    if (!editWebsite.trim()) {
      setEditError("Website is required.");
      return;
    }

    if (!editUsername.trim()) {
      setEditError("Username is required.");
      return;
    }

    if (!editMasterPassword.trim()) {
      setEditError("Master password is required.");
      return;
    }

    try {
      setSavingEdit(true);
      setEditError("");

      let passwordToSave = editPassword.trim();

      /*
       * If the user didn't enter a new password,
       * decrypt the existing password first.
       */
      if (!passwordToSave) {
        passwordToSave = await decryptPassword(
          editingItem.encryptedPassword,
          editMasterPassword,
          editingItem.salt,
          editingItem.iv
        );
      }

      const encryptedData = await encryptPassword(
        passwordToSave,
        editMasterPassword,
        editingItem.salt
      );

      const response = await fetch(
        `http://localhost:5000/api/vault/${editingItem._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            website: editWebsite.trim(),
            username: editUsername.trim(),
            category: editCategory,
            encryptedPassword: encryptedData.encryptedPassword,
            iv: encryptedData.iv,
            salt: encryptedData.salt,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update password"
        );
      }

      /*
       * If backend returns the updated vault item,
       * update the UI immediately.
       */
      if (data.vaultItem) {
        setVaultItems((prevItems) =>
          prevItems.map((item) =>
            item._id === editingItem._id
              ? data.vaultItem
              : item
          )
        );
      } else {
        /*
         * Otherwise refresh the vault from backend.
         */
        await fetchVaultItems();
      }

      // Close modal
      setEditingItem(null);

      setEditWebsite("");
      setEditUsername("");
      setEditCategory("");
      setEditPassword("");
      setEditMasterPassword("");
      setEditError("");
    } catch (error) {
      console.error("Update password error:", error);

      setEditError(
        error.message || "Failed to update password."
      );
    } finally {
      setSavingEdit(false);
    }
  };

  // =========================
  // Delete Password
  // =========================

  const handleDeletePassword = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the password for ${item.website}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(item._id);
      setDeleteError("");

      const response = await fetch(
        `http://localhost:5000/api/vault/${item._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete password"
        );
      }

      // Remove deleted item immediately
      setVaultItems((prevItems) =>
        prevItems.filter(
          (vaultItem) => vaultItem._id !== item._id
        )
      );
    } catch (error) {
      console.error("Delete password error:", error);

      setDeleteError(
        error.message || "Failed to delete password."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // JSX
  // =========================

  return (
    <main className="min-h-screen flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* =========================
          Header
      ========================== */}

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
            {favoriteOnly ? "Favorite Passwords" : "My Vault"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {favoriteOnly
              ? "Quickly access the accounts you use most."
              : "Manage all your saved passwords securely."}
          </p>
        </div>

        <Link
          to="/add-password"
          className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
        >
          + Add Password
        </Link>
      </div>

      {/* =========================
          Search
      ========================== */}

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

      {/* =========================
          Vault Count
      ========================== */}

      {!loading && !error && (
        <div className="mb-4">
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

      {/* =========================
          Loading
      ========================== */}

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Loading your vault...
          </p>
        </div>
      )}

      {/* =========================
          Error
      ========================== */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

          <p className="text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchVaultItems}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>

        </div>
      )}

      {/* =========================
          Delete Error
      ========================== */}

      {!loading && deleteError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {deleteError}
          </p>
        </div>
      )}

      {/* =========================
          Empty Vault
      ========================== */}

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

      {/* =========================
          Search Empty
      ========================== */}

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
              Try searching with another website,
              username, or category.
            </p>

          </div>
        )}

      {/* =========================
          Password List
      ========================== */}

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
                <div className="flex items-center justify-between gap-2 sm:justify-end">

                  <span className="max-w-[150px] truncate text-sm text-slate-500 sm:max-w-[200px]">
                    {item.username}
                  </span>

                  {/* View */}
                  <button
                    type="button"
                    onClick={() => handleViewPassword(item)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    title="View password"
                    aria-label={`View ${item.website} password`}
                  >
                    👁️
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => handleEditPassword(item)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                    title="Edit password"
                    aria-label={`Edit ${item.website}`}
                  >
                    ✏️
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDeletePassword(item)}
                    disabled={deletingId === item._id}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Delete password"
                    aria-label={`Delete ${item.website}`}
                  >
                    {deletingId === item._id
                      ? "..."
                      : "🗑️"}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      {/* =====================================================
          VIEW PASSWORD MODAL
      ====================================================== */}

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeViewModal();
            }
          }}
        >

          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">

            {!showPassword ? (
              <>
                {/* Unlock Header */}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    View Password
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter your master password to view the
                    password for{" "}
                    <span className="font-medium text-slate-700">
                      {selectedItem.website}
                    </span>
                    .
                  </p>
                </div>

                {/* Unlock Form */}

                <form onSubmit={handleDecryptPassword}>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Master Password
                  </label>

                  <input
                    type="password"
                    value={masterPassword}
                    onChange={(e) =>
                      setMasterPassword(e.target.value)
                    }
                    placeholder="Enter your master password"
                    autoFocus
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  {decryptError && (
                    <p className="mt-2 text-sm text-red-500">
                      {decryptError}
                    </p>
                  )}

                  <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">

                    <button
                      type="button"
                      onClick={closeViewModal}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:w-auto"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={decrypting}
                      className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
                {/* Password Header */}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Password
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedItem.website}
                  </p>
                </div>

                {/* Password */}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="mb-2 text-xs font-medium text-slate-500">
                    Password
                  </p>

                  <p className="break-all font-mono text-sm text-slate-900">
                    {decryptedPassword}
                  </p>

                </div>

                {/* Actions */}

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">

                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:w-auto"
                  >
                    {copied
                      ? "✓ Copied"
                      : "📋 Copy"}
                  </button>

                  <button
                    type="button"
                    onClick={closeViewModal}
                    className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 sm:w-auto"
                  >
                    Done
                  </button>

                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* =====================================================
          EDIT PASSWORD MODAL
      ====================================================== */}

      {editingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget &&
              !savingEdit
            ) {
              closeEditModal();
            }
          }}
        >

          {/* Modal */}

          <div
            className="
              flex
              w-full
              max-w-lg
              flex-col
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
              max-h-[90vh]
            "
          >

            {/* =========================
                Modal Header
            ========================== */}

            <div className="shrink-0 border-b border-slate-200 px-4 py-4 sm:px-6">

              <div className="flex items-center justify-between gap-4">

                <div className="min-w-0">

                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Edit Password
                  </h2>

                  <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                    Update your saved account information.
                  </p>

                </div>

                <button
                  type="button"
                  disabled={savingEdit}
                  onClick={closeEditModal}
                  className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                  aria-label="Close edit modal"
                >
                  ✕
                </button>

              </div>

            </div>

            {/* =========================
                Edit Form
            ========================== */}

            <form
              onSubmit={handleSaveEdit}
              className="flex min-h-0 flex-1 flex-col"
            >

              {/* Scrollable Content */}

              <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">

                {/* Website */}

                <div className="mb-4">

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Website
                  </label>

                  <input
                    type="text"
                    value={editWebsite}
                    onChange={(e) =>
                      setEditWebsite(e.target.value)
                    }
                    placeholder="example.com"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* Username */}

                <div className="mb-4">

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Username / Email
                  </label>

                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) =>
                      setEditUsername(e.target.value)
                    }
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* Category */}

                <div className="mb-4">

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Category
                  </label>

                  <select
                    value={editCategory}
                    onChange={(e) =>
                      setEditCategory(e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  >

                    <option value="">
                      Other
                    </option>

                    <option value="Social">
                      Social
                    </option>

                    <option value="Work">
                      Work
                    </option>

                    <option value="Finance">
                      Finance
                    </option>

                    <option value="Shopping">
                      Shopping
                    </option>

                    <option value="Entertainment">
                      Entertainment
                    </option>

                    <option value="Email">
                      Email
                    </option>

                    <option value="Education">
                      Education
                    </option>

                  </select>

                </div>

                {/* New Password */}

                <div className="mb-4">

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={editPassword}
                    onChange={(e) =>
                      setEditPassword(e.target.value)
                    }
                    placeholder="Leave empty to keep current password"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Leave this empty if you don't want to
                    change the current password.
                  </p>

                </div>

                {/* Master Password */}

                <div className="mb-2">

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Master Password
                  </label>

                  <input
                    type="password"
                    value={editMasterPassword}
                    onChange={(e) =>
                      setEditMasterPassword(e.target.value)
                    }
                    placeholder="Enter your master password"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Required to verify and save your changes.
                  </p>

                </div>

                {/* Edit Error */}

                {editError && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">

                    <p className="text-sm text-red-600">
                      {editError}
                    </p>

                  </div>
                )}

              </div>

              {/* =========================
                  Modal Footer
              ========================== */}

              <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 sm:px-6">

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    disabled={savingEdit}
                    onClick={closeEditModal}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {savingEdit
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>
      )}
      

    </main>
  );
};

export default Vault;