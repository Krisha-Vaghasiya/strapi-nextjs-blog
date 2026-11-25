import Link from "next/link";
import { searchArticles } from "@/lib/api";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;

  const query = params?.q || "";
  const locale = params?.locale || "en";

  let articles = [];

  if (query) {
    articles = await searchArticles(query, locale);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <Link
            href={`/?locale=${locale}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <span>←</span>
            Back to Home
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Discover
              </p>

              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Search Articles
              </h1>

              <p className="mt-3 text-lg text-slate-600">
                Find articles about technology, programming, and more.
              </p>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <span className="mr-1 text-sm font-medium text-slate-500">
                Language:
              </span>

              <Link
                href={`/search?q=${encodeURIComponent(
                  query
                )}&locale=en`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  locale === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                English
              </Link>

              <Link
                href={`/search?q=${encodeURIComponent(
                  query
                )}&locale=gu`}
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

      {/* Search Section */}
      <section className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <form
          action="/search"
          method="GET"
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            name="q"
            placeholder="Search articles..."
            defaultValue={query}
            className="h-14 flex-1 rounded-xl border border-slate-300 bg-white px-5 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <input type="hidden" name="locale" value={locale} />

          <button
            type="submit"
            className="h-14 rounded-xl bg-blue-600 px-7 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Search
          </button>
        </form>

        {/* Search Result Heading */}
        {query && (
          <div className="mt-10">
            <p className="text-sm font-medium text-slate-500">
              Search results
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Results for{" "}
              <span className="text-blue-600">"{query}"</span>
            </h2>
          </div>
        )}

        {/* Empty Search */}
        {!query && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
              🔍
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Search for an article
            </h2>

            <p className="mt-2 text-slate-500">
              Enter a keyword above to find articles.
            </p>
          </div>
        )}

        {/* No Results */}
        {query && articles.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              😕
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              No articles found
            </h2>

            <p className="mt-2 text-slate-500">
              We couldn't find any articles matching "{query}".
            </p>

            <Link
              href={`/search?locale=${locale}`}
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Another Search
            </Link>
          </div>
        )}

        {/* Search Results */}
        {articles.length > 0 && (
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.documentId}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden bg-slate-100">
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
                  <div className="mb-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {article.category?.name || "Uncategorized"}
                    </span>
                  </div>

                  <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
                    {article.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {article.description}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <p className="text-xs text-slate-400">
                      Written by
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {article.author?.name || "Unknown"}
                    </p>
                  </div>

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
        )}
      </section>
    </main>
  );
}