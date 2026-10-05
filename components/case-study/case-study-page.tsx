import { notFound } from "next/navigation";
import {
  caseStudyTheme,
  findCaseStudy,
  nextCaseStudy,
} from "@/lib/projects";
import { mediaStatus } from "@/lib/media-server";
import { CaseStudyBody } from "@/components/case-study/case-study-body";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySections } from "@/components/case-study/case-study-sections";
import { CaseStudyClosing } from "@/components/case-study/case-study-closing";
import { SideProjectsBody } from "@/components/projects/side-projects-body";

/**
 * A project's cinematic case study, composed from `site.caseStudies`. All copy
 * and media live in `content/site.ts`; this only resolves media availability
 * and lays the beats out.
 *
 * The whole page reads on the project's own light palette (`CaseStudyBody`)
 * rather than the site's dark theme. The homepage's card-to-case-study
 * transition renders these same components (see `CaseStudyOverlay`), so
 * clicking a project on the main page lands on identical content.
 */
export function CaseStudyPage({ slug }: { slug: string }) {
  const data = findCaseStudy(slug);
  if (!data) notFound();

  const { study, project } = data;
  const theme = caseStudyTheme(project);

  if (slug === "side-projects") {
    return (
      <CaseStudyBody theme={theme} className="pb-20 sm:pb-28">
        <SideProjectsBody theme={theme} showHeader={true} />
      </CaseStudyBody>
    );
  }

  return (
    <CaseStudyBody theme={theme} className="pb-20 sm:pb-28">
      <CaseStudyHero
        study={study}
        name={project.name}
        accentText={theme.accentText}
        liveUrl={project.url}
      />

      <CaseStudySections
        sections={study.sections}
        media={study.sections.map((section) => mediaStatus(section.media))}
        accent={theme.accent}
        accentText={theme.accentText}
      />

      <div className="mt-12 sm:mt-16">
        <CaseStudyClosing
          closing={study.closing}
          accentText={theme.accentText}
          next={nextCaseStudy(project)}
        />
      </div>
    </CaseStudyBody>
  );
}
