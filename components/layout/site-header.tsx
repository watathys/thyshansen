"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { lightCaseStudyRoute } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Fixed (not sticky) and fully transparent so it never sits behind a solid
 * color band of its own. The homepage hero and light case-study pages are
 * light, so the header text is dark there; every other page uses the dark
 * theme, so it stays light. Uses `usePathname` to flip the color without
 * duplicating the header.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const onLight =
    pathname === "/" || lightCaseStudyRoute(pathname) !== null;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/#top"
          className={cn(
            "text-eyebrow rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            onLight
              ? "text-zinc-900 hover:text-zinc-500"
              : "text-foreground hover:text-accent"
          )}
        >
          {site.name}
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-6">
          {site.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
                className={cn(
                  "text-eyebrow rounded-md px-1 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  onLight
                    ? "text-zinc-700 hover:text-zinc-500"
                    : "text-foreground hover:text-accent"
                )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
