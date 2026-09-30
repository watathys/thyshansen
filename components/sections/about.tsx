import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

export function About({
  showBackLink = false,
  className,
}: {
  showBackLink?: boolean;
  className?: string;
} = {}) {
  const { education } = site;

  return (
    <section id="about" className={cn("py-16 sm:py-24", className)}>
      <Container className="space-y-12">
        {/* Optional Back to Home Link */}
        {showBackLink ? (
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              ← Back to Home
            </Link>
          </div>
        ) : null}

        {/* Section Heading & Bio */}
        <div>
          <SectionHeading eyebrow="About" title="Background & Strategy" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            {site.bio}
          </p>
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

        {/* Academic & Strategic Background Card */}
        <div className="rounded-2xl border border-border bg-card-bg p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="text-eyebrow font-sans text-xs font-bold text-accent">
                Academic Background
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
              View Resume PDF →
            </Link>
          </div>

          {education.honors.length > 0 ? (
            <div className="mt-6 border-t border-border/60 pt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Honors & Organizations
              </span>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                {education.honors.map((honor) => (
                  <li
                    key={honor}
                    className="rounded-md border border-border bg-background px-3 py-1 font-medium text-foreground"
                  >
                    {honor}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Compact Fact Row / Grid */}
        {site.facts.length > 0 ? (
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="text-eyebrow font-sans text-xs font-bold text-accent">
              Quick Facts
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
            View Resume & Experience
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            Get in Touch
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
