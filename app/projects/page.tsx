import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description: `Products and projects built by ${site.name}.`,
};

export default function ProjectsPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Work"
          title="All Projects & Products"
          description="A complete look at products I've conceived, built, and shipped across software, AI, and consumer goods."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {site.projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isFeatured={Boolean(project.featured)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
