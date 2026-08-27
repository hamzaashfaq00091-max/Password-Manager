import React from "react";
import { Link } from "react-router-dom";
const DashboardContent = () => {
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
          className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
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
            24
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
            6
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
            3
          </p>

          <p className="mt-1 text-xs text-red-500">
            Need your attention
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
            5
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
            placeholder="Search your passwords..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

      </div>

      {/* Recent Passwords */}
      <section>

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Passwords
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your recently added accounts.
            </p>
          </div>

          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View All
          </button>

        </div>

        {/* Password List */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

          {/* GitHub */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
                🌐
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  GitHub
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  github.com
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <span className="hidden text-sm text-slate-500 sm:block">
                ali@example.com
              </span>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="View GitHub password"
              >
                👁
              </button>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Copy GitHub password"
              >
                📋
              </button>

            </div>

          </div>

          {/* Gmail */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl">
                📧
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Gmail
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  gmail.com
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <span className="hidden text-sm text-slate-500 sm:block">
                ali@example.com
              </span>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="View Gmail password"
              >
                👁
              </button>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Copy Gmail password"
              >
                📋
              </button>

            </div>

          </div>

          {/* Netflix */}
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
                🎬
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Netflix
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  netflix.com
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <span className="hidden text-sm text-slate-500 sm:block">
                ali@example.com
              </span>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="View Netflix password"
              >
                👁
              </button>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Copy Netflix password"
              >
                📋
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default DashboardContent;