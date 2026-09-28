import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-20 sm:py-24">
      <Container className="flex flex-col items-start gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Let&apos;s talk product.
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
            Open to product management internships and new-grad roles. The
            fastest way to reach me is email.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href={`mailto:${site.email}`}>
            {site.email}
          </ButtonLink>
          <ButtonLink href={site.linkedin} variant="secondary">
            LinkedIn
          </ButtonLink>
          {site.instagram ? (
            <ButtonLink href={site.instagram} variant="secondary">
              Instagram
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
