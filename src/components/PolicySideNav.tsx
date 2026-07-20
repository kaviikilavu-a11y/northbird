"use client";

import { useEffect, useState } from "react";

export interface PolicyNavItem {
  id: string;
  label: string;
}

/** Sticky side-nav that tracks scroll position across policy sections via IntersectionObserver. */
export default function PolicySideNav({ items }: { items: PolicyNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hidden md:block sticky top-28 self-start w-40 shrink-0" aria-label="Policy sections">
      <ul className="space-y-3">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-sm block transition-colors duration-200"
              style={{
                color: active === id ? "var(--rust)" : "#999",
                fontWeight: active === id ? 600 : 500,
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
