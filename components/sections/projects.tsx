import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button-link";

export function Projects({
  limit,
  showHeading = true,
  showViewAll = false,
}: {
  limit?: number;
  showHeading?: boolean;
  showViewAll?: boolean;
}) {
  const projectsList = limit ? site.projects.slice(0, limit) : site.projects;

  return (
    <section id="work" className="border-t border-border py-20 sm:py-24">
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="Work"
            title="Selected Work"
            description="Products conceived, designed, and shipped across AI software, mobile apps, and physical consumer products."
          />
        ) : null}

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {projectsList.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isFeatured={Boolean(project.featured)}
            />
          ))}
        </div>

        {showViewAll ? (
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/projects" variant="secondary">
              View all projects
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
