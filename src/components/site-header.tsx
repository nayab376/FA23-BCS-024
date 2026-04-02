import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/dashboard/client", label: "Client" },
  { href: "/dashboard/moderator", label: "Moderator" },
  { href: "/dashboard/admin", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-[rgba(244,239,228,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-semibold text-white">
            AP
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-900/60">
              AdFlow Pro
            </p>
            <p className="text-sm text-slate-600">Midterm marketplace starter</p>
          </div>
        </Link>

        <nav className="hidden flex-wrap items-center gap-2 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
