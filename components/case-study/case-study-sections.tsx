import { CaseStudySection } from "@/components/case-study/case-study-section";
import { CaseStudyMediaFrame } from "@/components/case-study/case-study-media";
import { CaseStudyStats } from "@/components/case-study/case-study-stats";
import { CaseStudyLessons } from "@/components/case-study/case-study-lessons";
import type { CaseStudySection as CaseStudySectionData } from "@/content/site";
import type { MediaStatus } from "@/lib/media";

/**
 * The numbered spine of a cinematic case study — 01, 02, 03… — each beat a
 * short header plus a narrow first-person column, followed by its demo,
 * stat callouts, or lessons. Shared by the standalone page and the homepage's
 * card-to-case-study overlay so both read identically once the transition
 * lands.
 */
export function CaseStudySections({
  sections,
  media,
  accent,
  accentText,
}: {
  sections: CaseStudySectionData[];
  /** Server-resolved media availability, parallel to `sections`. */
  media: Array<MediaStatus | null>;
  /** The project's brand accent, for the big stat figures. */
  accent: string;
  /** AA-safe accent for the small numbers and labels. */
  accentText: string;
}) {
  return (
    <div className="space-y-12 sm:space-y-16">
      {sections.map((section, index) => (
        <CaseStudySection
          key={section.number}
          number={section.number}
          title={section.title}
          blocks={section.blocks}
          accentText={accentText}
        >
          {section.media ? (
            <CaseStudyMediaFrame
              media={section.media}
              status={
                media[index] ?? { hasMedia: false, hasPoster: false }
              }
              accent={accent}
              accentText={accentText}
            />
          ) : null}
          {section.stats ? (
            <CaseStudyStats stats={section.stats} accent={accent} />
          ) : null}
          {section.lessons ? (
            <CaseStudyLessons
              lessons={section.lessons}
              accentText={accentText}
            />
          ) : null}
        </CaseStudySection>
      ))}
    </div>
  );
}
