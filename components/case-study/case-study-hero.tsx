import { Container } from "@/components/layout/container";
import { CaseStudyIntro } from "@/components/case-study/case-study-intro";
import type { CaseStudy } from "@/content/site";

/**
 * The standalone case-study opener: an oversized project name over the shared
 * `CaseStudyIntro` (tagline, first-person about, metadata rail). Text-only by
 * design — the demos start in the numbered sections below. Sits on the case
 * study's own light surface (see `CaseStudyBody`).
 */
export function CaseStudyHero({
  study,
  name,
  accentText,
  liveUrl,
}: {
  study: CaseStudy;
  /** The project's display name, e.g. "Junbi". */
  name: string;
  /** AA-safe accent for the small tracked labels. */
  accentText: string;
  /** Optional link to the live product. */
  liveUrl?: string;
}) {
  return (
    <header className="pt-28 pb-16 sm:pt-36 sm:pb-20">
      <Container>
        <p
          className="text-eyebrow text-xs font-bold tracking-[0.25em]"
          style={{ color: accentText }}
        >
          {study.eyebrow}
        </p>
        <h1 className="mt-5 text-[clamp(3rem,11vw,7rem)] leading-[0.9] font-black tracking-tight text-zinc-900">
          {name}
        </h1>
      </Container>

      <div className="mt-10 sm:mt-12">
        <CaseStudyIntro study={study} accentText={accentText} liveUrl={liveUrl} />
      </div>
    </header>
  );
}
