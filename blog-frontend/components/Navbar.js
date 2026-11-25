import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-slate-900 transition hover:text-blue-600"
        >
          My<span className="text-blue-600">Blog</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/categories"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Categories
          </Link>

          <Link
            href="/search"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
}