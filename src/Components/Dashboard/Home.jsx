import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2">

        {/* Left Content */}
        <div className="max-w-xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            <span>🔐</span>
            Secure Password Management
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
            Your passwords.
            <br />
            <span className="text-indigo-600">
              Safe and simple.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
            Vaultly helps you securely store, manage, and protect
            all your passwords in one simple place.
          </p>

          {/* Buttons */}
         <div className="mt-8 flex flex-col gap-3 sm:flex-row">

  <Link
    to="/signup"
    className="rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
  >
    Get Started →
  </Link>

  <Link
    to="/features"
    className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
  >
    Learn More
  </Link>

</div>

          {/* Security Features */}
          <div className="mt-8 flex flex-wrap gap-6">

            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="font-bold text-emerald-500">✓</span>
              Secure
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="font-bold text-emerald-500">✓</span>
              Simple
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="font-bold text-emerald-500">✓</span>
              Private
            </div>

          </div>

        </div>

        {/* Right Illustration */}
        <div className="relative flex min-h-115 items-center justify-center">

          {/* Main Vault Card */}
          <div className="w-full max-w-md rotate-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10">

            {/* Vault Header */}
            <div className="flex items-center gap-3 border-b border-slate-200 pb-5">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                🔐
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  My Vault
                </h3>

                <p className="text-xs text-slate-400">
                  Securely protected
                </p>
              </div>

              <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                ✓
              </div>

            </div>

            {/* Google */}
            <div className="flex items-center gap-3 border-b border-slate-100 py-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 font-bold text-red-600">
                G
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-800">
                  Google
                </h4>

                <p className="mt-1 text-xs text-slate-400">
                  ali@example.com
                </p>
              </div>

              <span className="text-xs tracking-widest text-slate-400">
                ••••••••
              </span>

            </div>

            {/* GitHub */}
            <div className="flex items-center gap-3 border-b border-slate-100 py-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 font-bold text-slate-800">
                G
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-800">
                  GitHub
                </h4>

                <p className="mt-1 text-xs text-slate-400">
                  ali123
                </p>
              </div>

              <span className="text-xs tracking-widest text-slate-400">
                ••••••••
              </span>

            </div>

            {/* Facebook */}
            <div className="flex items-center gap-3 py-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                f
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-800">
                  Facebook
                </h4>

                <p className="mt-1 text-xs text-slate-400">
                  ali@example.com
                </p>
              </div>

              <span className="text-xs tracking-widest text-slate-400">
                ••••••••
              </span>

            </div>

          </div>

          {/* Floating Security Card */}
          <div className="absolute bottom-8 right-0 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-xl shadow-slate-900/10">

            <span className="text-2xl">
              🛡️
            </span>

            <div>
              <p className="text-xs font-bold text-slate-800">
                Vault Protected
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                End-to-end security
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
};

export default Home;