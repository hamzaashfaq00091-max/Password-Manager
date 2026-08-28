import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vault", {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to load categories");

        const counts = (data.vaultItems || []).reduce((result, item) => {
          const category = item.category || "Other";
          result[category] = (result[category] || 0) + 1;
          return result;
        }, {});
        setCategories(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <main className="min-h-screen flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
        <p className="mt-1 text-sm text-slate-500">Browse your vault by category.</p>
      </div>
      {loading && <p className="text-sm text-slate-500">Loading categories...</p>}
      {error && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</p>}
      {!loading && !error && categories.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Add a password to create your first category.
        </div>
      )}
      {!loading && !error && categories.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([category, count]) => (
            <Link
              key={category}
              to={`/vault?category=${encodeURIComponent(category)}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
            >
              <p className="font-semibold text-slate-900">{category}</p>
              <p className="mt-2 text-sm text-slate-500">{count} {count === 1 ? "password" : "passwords"}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Categories;
