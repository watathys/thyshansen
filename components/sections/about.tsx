import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" className="border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="About" title="Background & Strategy" />

        {/* Bio Paragraph */}
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
          {site.bio}
        </p>

        {/* Headline Stat Strip */}
        {site.stats.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
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

        {/* Compact Fact Row / Grid */}
        {site.facts.length > 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
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
      </Container>
    </section>
  );
}
