import Link from "next/link";
import { getArticles } from "@/lib/api";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const locale = params?.locale || "en";

  const articles = await getArticles(locale);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Welcome to MyBlog
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Learn, Explore &{" "}
              <span className="text-blue-600">Grow</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Discover helpful articles about technology, programming,
              web development, and more.
            </p>

            {/* Language Switcher */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="text-sm font-medium text-slate-500">
                Language:
              </span>

              <Link
                href="/?locale=en"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  locale === "en"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                English
              </Link>

              <Link
                href="/?locale=gu"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  locale === "gu"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ગુજરાતી
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Discover
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Latest Articles
          </h2>

          <p className="mt-2 text-slate-600">
            Explore our latest articles and learn something new.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.documentId}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Cover Image */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
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

                {/* Category Badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm backdrop-blur">
                    {article.category?.name || "Uncategorized"}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
                  {article.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {article.description}
                </p>

                {/* Author */}
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    {(article.author?.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Written by</p>

                    <p className="text-sm font-semibold text-slate-700">
                      {article.author?.name || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Read More */}
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

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-slate-900">
              No articles found
            </h3>

            <p className="mt-2 text-slate-500">
              There are no articles available in this language yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}