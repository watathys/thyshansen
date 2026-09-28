import { site } from "@/content/site";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links = [
    { href: `mailto:${site.email}`, label: site.email },
    { href: site.linkedin, label: "LinkedIn" },
    ...(site.instagram ? [{ href: site.instagram, label: "Instagram" }] : []),
  ];

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
