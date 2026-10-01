"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { lightCaseStudyRoute } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * The site footer. Dark by default, but it inherits the palette of a light
 * cinematic case study while you're on that page (via `usePathname`) so the
 * colored surface doesn't break into a dark band at the bottom.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const theme = lightCaseStudyRoute(pathname);
  const light = theme !== null;

  const linkClass = cn(
    "rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    light ? "hover:text-zinc-900" : "hover:text-foreground",
  );

  return (
    <footer
      className={cn(
        "border-t bg-background",
        light ? "border-zinc-200" : "border-border",
      )}
      // Inline style wins over `bg-background`, so the dark pages are untouched.
      style={theme ? { backgroundColor: theme.background } : undefined}
    >
      <Container
        className={cn(
          "flex flex-col gap-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between",
          light ? "text-zinc-500" : "text-muted",
        )}
      >
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={`mailto:${site.email}`} className={linkClass}>
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          {site.instagram ? (
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Instagram
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
