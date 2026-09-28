import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section id="top" className="py-24 sm:py-32">
      <Container>
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-accent">
          {site.education.school}
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {site.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/#work">View work</ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
