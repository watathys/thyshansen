import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExperienceItem } from "@/components/experience/experience-item";

export function Experience() {
  return (
    <section id="resume" className="border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Resume" title="Where I've worked" />
        {site.experience.length > 0 ? (
          <div className="mt-4 divide-y divide-border">
            {site.experience.map((role) => (
              <ExperienceItem key={`${role.company}-${role.role}`} role={role} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted">
            Work experience entries will appear here once added to <code>content/site.ts</code>.
          </p>
        )}
      </Container>
    </section>
  );
}
