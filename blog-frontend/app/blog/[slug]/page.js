import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getArticleLocalizations,
} from "@/lib/api";

export default async function ArticlePage({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;

  const locale = query?.locale || "en";

  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const localizations = await getArticleLocalizations(
    article.documentId
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 lg:px-8">
          <Link
            href={`/?locale=${locale}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <span>←</span>
            Back to Home
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-medium text-slate-500 sm:inline">
              Language:
            </span>

            <div className="flex rounded-full bg-slate-100 p-1">
              {localizations.map((item) => {
                const isActive = item.locale === locale;

                return (
                  <Link
                    key={item.locale}
                    href={`/blog/${item.slug}?locale=${item.locale}`}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {item.locale === "en"
                      ? "English"
                      : "ગુજરાતી"}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-10 lg:px-8 lg:pt-16">
          {/* Category */}
          <div className="mb-6">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {article.category?.name || "Uncategorized"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
            {article.description}
          </p>

          {/* Author */}
          <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
              {(article.author?.name || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Written by
              </p>

              <p className="text-sm font-semibold text-slate-800">
                {article.author?.name || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {article.cover?.url && (
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
            <img
              src={`http://localhost:1337${article.cover.url}`}
              alt={article.title}
              className="max-h-[600px] w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
        <article className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-14">
          <div className="article-content">
            <ReactMarkdown>
              {article.content || ""}
            </ReactMarkdown>
          </div>
        </article>
      </section>

      {/* Bottom Navigation */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-10 lg:px-8">
          <Link
            href={`/?locale=${locale}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Articles
          </Link>
        </div>
      </section>
    </main>
  );
}