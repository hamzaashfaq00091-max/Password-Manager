import React from "react";

const features = [
  {
    icon: "🔐",
    title: "Secure Password Storage",
    description:
      "Keep all your passwords safely organized in one secure vault instead of storing them in multiple places.",
  },
  {
    icon: "⚡",
    title: "Password Generator",
    description:
      "Generate strong and unique passwords with a single click whenever you create a new account.",
  },
  {
    icon: "🛡️",
    title: "Security First",
    description:
      "Protect your account and sensitive vault information with secure authentication and encryption.",
  },
  {
    icon: "🔎",
    title: "Quick Search",
    description:
      "Find the password you need quickly by searching for a website, username, or account.",
  },
  {
    icon: "📂",
    title: "Organize Your Vault",
    description:
      "Keep your accounts organized with categories so your important credentials are easy to find.",
  },
  {
    icon: "📋",
    title: "Easy Copy",
    description:
      "Quickly copy usernames and passwords when you need them without having to type them manually.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            Powerful Features
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything you need to
            <span className="text-indigo-600"> stay secure</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Vaultly gives you the tools you need to securely manage your
            passwords while keeping everything simple and easy to use.
          </p>

        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-900/5"
            >

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition group-hover:bg-indigo-100">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;