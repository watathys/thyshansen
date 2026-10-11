import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/content/site";

/**
 * The lead-in that opens a cinematic case study: the one-line tagline, the
 * first-person "about the project" column, and a compact metadata rail
 * (role / where it was built / dates) alongside a link to the live product.
 *
 * Rendered on the case study's own light, paper-white surface — see
 * `CaseStudyBody` — so text is dark neutral and only the small tracked labels
 * take the project accent.
 *
 * Deliberately title-free — the standalone page renders it under its big
 * project name (`CaseStudyHero`) and the homepage's card-to-case-study overlay
 * renders it under the shared project title that flies in during the wipe.
 */
export function CaseStudyIntro({
  study,
  accentText,
  liveUrl,
  showTagline = true,
}: {
  study: CaseStudy;
  /** AA-safe accent for the small tracked label. */
  accentText: string;
  /** Optional link to the live product. */
  liveUrl?: string;
  /** Whether to render the tagline here (set to false if rendered in hero). */
  showTagline?: boolean;
}) {
  const hasTagline = Boolean(showTagline && study.tagline);

  return (
    <Container>
      {hasTagline ? (
        <p className="max-w-2xl text-xl leading-snug text-zinc-600 sm:text-2xl">
          {study.tagline}
        </p>
      ) : null}

      <div
        className={cn(
          "grid gap-12 lg:grid-cols-[1fr_240px] lg:gap-16",
          hasTagline && "mt-14",
        )}
      >
        <div className="max-w-2xl">
          {study.aboutTitle ? (
            <h2
              className="text-eyebrow text-xs font-bold"
              style={{ color: accentText }}
            >
              {study.aboutTitle}
            </h2>
          ) : null}
          <div className={cn("space-y-5", study.aboutTitle && "mt-4")}>
            {study.about.map((paragraph) => (
              <p
                key={paragraph}
                className={cn(
                  "text-zinc-600",
                  study.aboutEmphasis
                    ? "text-3xl leading-snug tracking-tight sm:text-4xl"
                    : "text-base leading-relaxed sm:text-lg",
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <dl className="space-y-6 border-t border-zinc-200 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {study.meta.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-eyebrow text-xs font-bold text-zinc-400">
                {label}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed font-medium text-zinc-800">
                {value}
              </dd>
            </div>
          ))}
          {liveUrl && study.liveLabel ? (
            <div className="pt-2">
              <ButtonLink href={liveUrl} variant="onLight">
                {study.liveLabel}
              </ButtonLink>
            </div>
          ) : null}
        </dl>
      </div>
    </Container>
  );
}
