import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { Tag } from "@/components/ui/tag";
import { ButtonLink } from "@/components/ui/button-link";
import { ProjectMetrics } from "@/components/projects/project-metrics";
import { publicFileExists, initials } from "@/lib/media";

export function generateStaticParams() {
  return site.projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return site.projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.oneLiner,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasImage = publicFileExists(project.image);

  return (
    <article className="py-20 sm:py-24">
      <Container className="max-w-3xl">
        <Link
          href="/projects"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← All projects
        </Link>

        <div className="mt-6 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-border/30">
          {hasImage && project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-border/60 to-border/20">
              <span className="text-4xl font-semibold tracking-tight text-muted">
                {initials(project.name)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-2 text-lg text-muted">{project.oneLiner}</p>
          </div>
          {project.url ? (
            <ButtonLink href={project.url}>Visit project</ButtonLink>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <p className="mt-8 text-base leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-10">
          <ProjectMetrics metrics={project.metrics} />
        </div>
      </Container>
    </article>
  );
}
