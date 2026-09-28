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
  const projects = limit ? site.projects.slice(0, limit) : site.projects;

  return (
    <section id="work" className="border-t border-border py-20 sm:py-24">
      <Container>
        {showHeading ? (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Work"
              title="Things I've built"
              description="A mix of shipped products, side projects, and experiments — spanning software and physical products."
            />
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {showViewAll ? (
          <div className="mt-10">
            <ButtonLink href="/projects" variant="secondary">
              View all projects
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
