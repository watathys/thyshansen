import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Products and projects built by ${site.name}.`,
};

export default function ProjectsPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Everything I've built"
          description="A mix of shipped products, side projects, and experiments — spanning software and a physical product."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {site.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
