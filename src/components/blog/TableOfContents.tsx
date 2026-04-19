import { useEffect, useState } from "react";
import { extractHeadings } from "@/lib/blog";

export const TableOfContents = ({ body }: { body: string }) => {
  const headings = extractHeadings(body);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings.length]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop sticky TOC */}
      <nav className="hidden lg:block sticky top-24 self-start" aria-label="Table of contents">
        <p className="eyebrow text-copper-deep mb-4">On this page</p>
        <ul className="space-y-2.5 border-l border-border">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block pl-4 -ml-px border-l text-sm leading-snug transition-colors ${
                  active === h.id
                    ? "text-copper-deep border-copper-deep font-medium"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile dropdown */}
      <details className="lg:hidden mb-8 border border-border bg-muted/40 rounded-md">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium uppercase tracking-wider text-copper-deep">
          Jump to section
        </summary>
        <ul className="px-4 pb-4 pt-2 space-y-2">
          {headings.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`} className="text-sm text-foreground/80 hover:text-copper-deep block py-1">
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
};
