import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/site";
import { Tag } from "@/components/ui/tag";
import { initials } from "@/lib/media";
import { publicFileExists } from "@/lib/media-server";

export function ProjectCard({
  project,
  isFeatured = false,
}: {
  project: Project;
  isFeatured?: boolean;
}) {
  const hasImage = publicFileExists(project.image);
  // Show up to 3 metric chips on cards
  const displayMetrics = project.metrics.slice(0, 3);

  if (isFeatured) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card-bg transition-colors hover:border-accent/50 lg:col-span-2 lg:flex-row">
        {/* Image / Media Tile */}
        <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:w-1/2 overflow-hidden bg-border/20">
          {hasImage && project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center bg-gradient-to-br from-card-bg to-border/40 p-8 text-center">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                {initials(project.name)}
              </span>
              <span className="mt-2 text-xs font-medium text-accent">
                Featured Case Study
              </span>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                ★ Featured Project
              </span>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Visit live ↗
                </a>
              ) : null}
            </div>

            <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Link
                href={`/work/${project.slug}`}
                className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {project.name}
              </Link>
            </h3>

            <p className="mt-3 text-base leading-relaxed text-muted">
              {project.oneLiner}
            </p>

            {/* Metric Chips */}
            {displayMetrics.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {displayMetrics.map((metric) => (
                  <span
                    key={metric}
                    className="inline-flex items-center rounded-md border border-accent/20 bg-accent/5 px-2.5 py-1 text-xs font-semibold text-foreground"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Bottom Row: Tags & View Link */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View project case study →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card-bg transition-colors hover:border-accent/40">
      {/* Image / Media Tile */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-border/20">
        {hasImage && project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-card-bg to-border/40 p-6 text-center">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {initials(project.name)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              <Link
                href={`/work/${project.slug}`}
                className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {project.name}
              </Link>
            </h3>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Live site ↗
              </a>
            ) : null}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.oneLiner}
          </p>

          {/* Metric Chips */}
          {displayMetrics.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {displayMetrics.map((metric) => (
                <span
                  key={metric}
                  className="inline-flex items-center rounded-md border border-border bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground"
                >
                  {metric}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Bottom Row: Tags & Link */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View project →
          </Link>
        </div>
      </div>
    </div>
  );
}
