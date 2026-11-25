import Link from "next/link";
import { getArticlesByCategory } from "@/lib/api";

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;

  const locale = query?.locale || "en";
  const categoryName = decodeURIComponent(slug);

  const articles = await getArticlesByCategory(
    categoryName,
    locale
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <Link
            href={`/categories?locale=${locale}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <span>←</span>
            Back to Categories
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Category
              </p>

              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {categoryName}
              </h1>

              <p className="mt-3 text-slate-600">
                Explore articles from this category.
              </p>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <span className="mr-1 text-sm font-medium text-slate-500">
                Language:
              </span>

              <Link
                href={`/categories/${encodeURIComponent(
                  categoryName
                )}?locale=en`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  locale === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                English
              </Link>

              <Link
                href={`/categories/${encodeURIComponent(
                  categoryName
                )}?locale=gu`}
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

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              📚
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              No articles found
            </h2>

            <p className="mt-2 text-slate-500">
              There are no articles in this category for the selected
              language.
            </p>

            <Link
              href={`/categories?locale=${locale}`}
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {articles.length}{" "}
                  {articles.length === 1 ? "article" : "articles"}
                </p>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.documentId}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="h-56 overflow-hidden bg-slate-100">
                    {article.cover?.url ? (
                      <img
                        src={`http://localhost:1337${article.cover.url}`}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
                      {article.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {article.description}
                    </p>

                    <Link
                      href={`/blog/${article.slug}?locale=${locale}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3"
                    >
                      Read Article
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}