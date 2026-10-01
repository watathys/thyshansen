import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import type { CaseStudyClosing } from "@/content/site";

/**
 * The closer: a "let's work together" pitch with contact buttons, then a
 * footer row that links back to the project archive and forward to the next
 * project in `site.projects`. Sits on the case study's light surface.
 */
export function CaseStudyClosing({
  closing,
  accentText,
  next,
}: {
  closing: CaseStudyClosing;
  /** AA-safe accent for the eyebrow. */
  accentText: string;
  /** The next project to visit, or `null` when there isn't one. */
  next: { name: string; href: string } | null;
}) {
  return (
    <Container>
      <div className="border-t border-zinc-200 pt-12 sm:pt-16">
        <p
          className="text-eyebrow text-xs font-bold"
          style={{ color: accentText }}
        >
          {closing.eyebrow}
        </p>
        <h2 className="mt-4 max-w-[18ch] text-4xl tracking-tight text-zinc-900 sm:text-5xl">
          {closing.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          {closing.body}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {closing.links.map((link) => (
            <ButtonLink key={link.url} href={link.url} variant="onLight">
              {link.label}
            </ButtonLink>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-zinc-200 pt-8">
          <Link
            href={closing.archiveHref}
            className="text-eyebrow rounded-md text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ← {closing.archiveLabel}
          </Link>

          {next ? (
            <Link
              href={next.href}
              className="group flex flex-col items-start text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:items-end"
            >
              <span className="text-eyebrow text-xs font-semibold text-zinc-500">
                Next project
              </span>
              <span className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-500 sm:text-3xl">
                {next.name}{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
