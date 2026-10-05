import Image from "next/image";
import { SideProjectsStep } from "@/components/projects/side-projects-step";
import type { SideProjectItem } from "@/content/site";

interface SideProjectsSectionProps {
  project: SideProjectItem;
  accent: string;
  accentText: string;
}

export function SideProjectsSection({
  project,
  accent,
  accentText,
}: SideProjectsSectionProps) {
  return (
    <section
      id={project.id}
      className="border-t border-zinc-200/80 pt-12 first-of-type:border-t-0 first-of-type:pt-0 sm:pt-16"
    >
      <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {project.name}
      </h2>
      <p className="mt-2 text-lg text-zinc-600 sm:text-xl">
        {project.tagline}
      </p>

      <div className="mt-8">
        <h3 className="text-base font-bold text-zinc-900 sm:text-lg">
          {project.aboutTitle}
        </h3>
        <div className="mt-3 space-y-4">
          {project.about.map((paragraph, index) => (
            <p
              key={index}
              className="max-w-[68ch] text-base leading-relaxed text-zinc-600 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-2 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-2">
        {project.meta.map(({ label, value }) => (
          <div key={label} className="contents">
            <dt className="font-semibold text-zinc-500">{label}</dt>
            <dd className="m-0 text-zinc-800">{value}</dd>
          </div>
        ))}
      </dl>

      {project.visitLink ? (
        <div className="mt-6 mb-8">
          <a
            href={project.visitLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-80"
            style={{
              color: accent,
              borderBottom: `2px solid ${accent}`,
            }}
          >
            {project.visitLink.label}
          </a>
        </div>
      ) : null}

      {project.photo ? (
        <figure className="my-8 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-100 shadow-sm">
          <div
            className="relative w-full"
            style={{ aspectRatio: project.photo.aspectRatio }}
          >
            <Image
              src={project.photo.src}
              alt={project.photo.alt}
              fill
              sizes="(min-width: 768px) 760px, 100vw"
              className="object-contain"
            />
          </div>
          {project.photo.caption ? (
            <figcaption className="border-t border-zinc-200/60 bg-white/70 px-4 py-2.5 text-xs text-zinc-500">
              {project.photo.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="mt-8 space-y-10">
        {project.steps.map((step) => (
          <SideProjectsStep
            key={step.kicker}
            step={step}
            accentText={accentText}
          />
        ))}
      </div>
    </section>
  );
}
