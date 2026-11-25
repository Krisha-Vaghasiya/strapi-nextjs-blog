import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight"
            >
              My<span className="text-blue-500">Blog</span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Learn, explore and grow with technology. Discover
              useful articles about programming, web development,
              and modern technology.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Quick Links
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/categories"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Categories
              </Link>

              <Link
                href="/search"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Search
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 My Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}