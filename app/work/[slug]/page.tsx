import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { Tag } from "@/components/ui/tag";
import { ButtonLink } from "@/components/ui/button-link";
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
    title: `${project.name} — Selected Work`,
    description: project.oneLiner,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasImage = publicFileExists(project.image);

  return (
    <article className="py-16 sm:py-24">
      <Container className="max-w-4xl">
        {/* Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ← Back to Selected Work
        </Link>

        {/* Title Header */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {project.featured ? (
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  Featured Case Study
                </span>
              ) : null}
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-muted sm:text-xl">
              {project.oneLiner}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 sm:shrink-0">
            {project.url ? (
              <ButtonLink href={project.url}>Visit Project ↗</ButtonLink>
            ) : null}
            {project.secondaryLinks?.map((link) => (
              <ButtonLink key={link.url} href={link.url} variant="secondary">
                {link.label} ↗
              </ButtonLink>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* Image / Media Banner */}
        <div className="mt-8 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card-bg">
          {hasImage && project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-card-bg to-border/40 p-8 text-center">
              <span className="text-5xl font-extrabold tracking-tight text-foreground">
                {initials(project.name)}
              </span>
              <span className="mt-3 text-sm text-muted">
                Case study media preview
              </span>
            </div>
          )}
        </div>

        {/* Structured Case Study Content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_260px]">
          {/* Main Case Study Body */}
          <div className="space-y-10">
            {/* Overview / Description */}
            <section>
              <h2 className="text-lg font-semibold text-foreground">Overview</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {project.description}
              </p>
            </section>

            {/* Problem Statement */}
            <section className="border-t border-border pt-8">
              <h2 className="text-lg font-semibold text-foreground">The Problem</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {project.problem}
              </p>
            </section>

            {/* What I Built */}
            <section className="border-t border-border pt-8">
              <h2 className="text-lg font-semibold text-foreground">
                What I Built
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {project.whatIBuilt}
              </p>
            </section>

            {/* My Role */}
            <section className="border-t border-border pt-8">
              <h2 className="text-lg font-semibold text-foreground">My Role</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {project.role}
              </p>
            </section>
          </div>

          {/* Sidebar: Results & Tech Stack */}
          <aside className="space-y-8 lg:border-l lg:border-border lg:pl-8">
            {/* Key Results */}
            {project.metrics.length > 0 ? (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Key Results
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {project.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="rounded-lg border border-border bg-card-bg px-3.5 py-2 text-sm font-semibold text-foreground"
                    >
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Tech Stack */}
            {project.techStack.length > 0 ? (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Tech Stack & Tools
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* External Links */}
            <div className="border-t border-border/60 pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                Links
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Official Site ↗
                  </a>
                ) : (
                  <span className="text-xs text-muted">
                    Private / Demo available upon request
                  </span>
                )}
                {project.secondaryLinks?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
