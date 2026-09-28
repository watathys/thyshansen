import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExperienceItem } from "@/components/experience/experience-item";

export function Experience() {
  if (site.experience.length === 0) return null;

  return (
    <section id="experience" className="border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <div className="mt-4 divide-y divide-border">
          {site.experience.map((role) => (
            <ExperienceItem key={`${role.company}-${role.role}`} role={role} />
          ))}
        </div>
      </Container>
    </section>
  );
}
