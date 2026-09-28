import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExperienceItem } from "@/components/experience/experience-item";

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Career & Ventures"
            title="Work Experience"
            description="Leading product development, full-stack engineering, D2C ventures, and media production."
          />
          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View full resume page →
          </Link>
        </div>

        {site.experience.length > 0 ? (
          <div className="mt-12 space-y-8">
            {site.experience.map((role, index) => (
              <ExperienceItem
                key={`${role.company}-${role.role}`}
                role={role}
                isLast={index === site.experience.length - 1}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted">
            Work experience entries will appear here once added to{" "}
            <code>content/site.ts</code>.
          </p>
        )}
      </Container>
    </section>
  );
}
