import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/site";
import { Tag } from "@/components/ui/tag";
import { publicFileExists, initials } from "@/lib/media";

export function ProjectCard({ project }: { project: Project }) {
  const hasImage = publicFileExists(project.image);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-colors hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-border/30">
        {hasImage && project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-border/60 to-border/20">
            <span className="text-2xl font-semibold tracking-tight text-muted">
              {initials(project.name)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
            {project.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {project.oneLiner}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
