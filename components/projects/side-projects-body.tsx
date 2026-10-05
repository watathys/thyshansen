import { site } from "@/content/site";
import { SideProjectsSection } from "@/components/projects/side-projects-section";
import { CaseStudyClosing } from "@/components/case-study/case-study-closing";
import { nextCaseStudy } from "@/lib/projects";
import type { CaseStudyTheme } from "@/lib/projects";

interface SideProjectsBodyProps {
  theme: CaseStudyTheme;
  showHeader?: boolean;
}

export function SideProjectsBody({
  theme,
  showHeader = true,
}: SideProjectsBodyProps) {
  const content = site.sideProjects;
  const project = site.projects.find((entry) => entry.slug === "side-projects");
  const next = project ? nextCaseStudy(project) : null;

  return (
    <div
      className="text-zinc-900"
      style={{ backgroundColor: theme.background }}
    >
      <main className="mx-auto max-w-[760px] px-6 py-16 sm:py-24">
        {showHeader ? (
          <header className="mb-14">
            <p
              className="text-eyebrow text-xs font-bold tracking-[0.25em]"
              style={{ color: theme.accentText }}
            >
              {content.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.05] tracking-tight text-zinc-900">
              {content.title}
            </h1>
            <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-zinc-600 sm:text-xl">
              {content.lede}
            </p>
          </header>
        ) : (
          <div className="mb-14">
            <p className="max-w-[68ch] text-lg leading-relaxed text-zinc-600 sm:text-xl">
              {content.lede}
            </p>
          </div>
        )}

        <div className="space-y-16">
          {content.projects.map((item) => (
            <SideProjectsSection
              key={item.id}
              project={item}
              accent={theme.accent}
              accentText={theme.accentText}
            />
          ))}
        </div>

        <div className="mt-20 border-t border-zinc-200 pt-16 sm:mt-24">
          <CaseStudyClosing
            closing={content.closing}
            accentText={theme.accentText}
            next={next}
          />
        </div>
      </main>
    </div>
  );
}
