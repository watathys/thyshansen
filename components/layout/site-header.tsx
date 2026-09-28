import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";

const hasGallery = site.photos.length > 0 || site.videos.length > 0;

const navLinks = [
  { href: "/projects", label: "Projects" },
  ...(hasGallery ? [{ href: "/gallery", label: "Gallery" }] : []),
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            Contact
          </a>
        </nav>

        {/* Mobile nav — plain <details>/<summary>, no client JS needed */}
        <details className="group relative sm:hidden">
          <summary className="flex list-none items-center rounded-md p-2 text-foreground [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Menu</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-border bg-background p-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-border/40"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="block rounded-md px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-border/40"
            >
              Contact
            </a>
          </div>
        </details>
      </Container>
    </header>
  );
}
