import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import type { HeroSlideData } from "@/components/projects/hero-slide";

/**
 * Editorial body rendered below the shared-element hero when opening the
 * "Thys Hansen" (intro) card overlay on desktop: first-person intro, headline
 * metrics, academic background, quick facts, and contact CTAs. Copy comes from
 * `site.about` (shared with the `/about` page); metrics, facts, and education
 * from `site.stats` / `site.facts` / `site.education`.
 */
export function AboutOverlayBody({ slide }: { slide: HeroSlideData }) {
  const { about, education } = site;

  return (
    <div className="bg-background text-foreground">
      <Container className="py-20 sm:py-28 space-y-16">
        {/* Header & Intro */}
        <div>
          <p
            className="text-eyebrow text-xs font-bold tracking-[0.2em]"
            style={{ color: slide.accent }}
          >
            {slide.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            {about.title}
          </h2>
          <div className="mt-6 max-w-3xl space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Headline Stat Strip */}
        {site.stats.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col rounded-2xl border border-border bg-card-bg p-6 text-left"
              >
                <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm font-medium text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {/* Academic Background Card */}
        <div className="rounded-2xl border border-border bg-card-bg p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="text-eyebrow font-sans text-xs font-bold text-accent">
                {about.educationLabel}
              </span>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {education.school}
              </h3>
              <p className="mt-1 text-base font-medium text-muted">
                {education.degree}
                {education.emphasis ? ` · ${education.emphasis}` : ""}
              </p>
              <p className="mt-1 text-xs text-muted/80">
                Graduating {education.graduationDate}
                {education.gpa ? ` · GPA ${education.gpa}` : ""}
              </p>
            </div>

            <Link
              href="/resume"
              className="text-eyebrow inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent self-start sm:self-auto"
            >
              {about.resumeLinkLabel} →
            </Link>
          </div>

          {education.honors.length > 0 ? (
            <p className="mt-6 border-t border-border/60 pt-4 text-xs text-muted">
              <span className="font-semibold uppercase tracking-wider text-muted">
                {about.honorsLabel}:
              </span>{" "}
              {education.honors.join(" · ")}
            </p>
          ) : null}
        </div>

        {/* Compact Fact Row / Grid */}
        {site.facts.length > 0 ? (
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="text-eyebrow font-sans text-xs font-bold text-accent">
              {about.factsLabel}
            </h3>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col">
                  <dt className="text-xs font-medium text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <ButtonLink href="/resume" variant="primary">
            {about.resumeCtaLabel}
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            {about.contactCtaLabel}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
