"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-40 border-b"
      style={{ background: "var(--cream)", borderColor: "var(--teal-light)" }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight"
          style={{ color: "var(--teal-dark)" }}
        >
          Northbird & Co
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors"
                  style={{
                    color: active ? "var(--rust)" : "var(--teal-dark)",
                    borderBottom: active ? "2px solid var(--rust)" : "2px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
