import Link from "next/link";
import { getCategories } from "@/lib/api";

export default async function CategoriesPage({ searchParams }) {
  const params = await searchParams;

  const locale = params?.locale || "en";

  const categories = await getCategories(locale);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Explore
          </p>

          <div className="mt-3 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Categories
              </h1>

              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                Explore articles by topic and discover something new.
              </p>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <span className="mr-1 text-sm font-medium text-slate-500">
                Language:
              </span>

              <Link
                href="/categories?locale=en"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  locale === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                English
              </Link>

              <Link
                href="/categories?locale=gu"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  locale === "gu"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ગુજરાતી
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        {categories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.documentId}
                href={`/categories/${encodeURIComponent(
                  category.name
                )}?locale=${locale}`}
                className="group"
              >
                <article className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    #
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">
                    {category.name}
                  </h2>

                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600">
                    View Articles
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No categories found
            </h2>

            <p className="mt-2 text-slate-500">
              There are no categories available in this language yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}