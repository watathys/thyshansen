import { Container } from "@/components/layout/container";
import type { CaseStudyBlock } from "@/content/site";

/**
 * One numbered beat of a cinematic case study: a small two-digit label, a
 * short punchy header, then the prose. A section told straight through is a
 * single block of paragraphs; one broken into named beats gets a smaller
 * sub-heading per block. Anything passed as `children` (a media frame, stat
 * callouts, a lesson list) renders below the copy at full page width, so demos
 * can run wider than the text.
 */
export function CaseStudySection({
  number,
  title,
  blocks,
  accentText,
  children,
}: {
  number: string;
  title: string;
  blocks: CaseStudyBlock[];
  /** AA-safe accent for the small section number. */
  accentText: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-t border-zinc-200 pt-12 sm:pt-16">
      <Container>
        <div className="max-w-2xl">
          <p
            className="text-eyebrow text-xs font-bold tracking-[0.25em]"
            style={{ color: accentText }}
          >
            {number}
          </p>
          <h2 className="mt-4 text-3xl tracking-tight text-zinc-900 sm:text-4xl">
            {title}
          </h2>

          {blocks.length > 0 ? (
            <div className="mt-6 space-y-10">
              {blocks.map((block) => (
                <div
                  key={block.heading ?? block.body[0]}
                  className="space-y-4"
                >
                  {block.heading ? (
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
                      {block.heading}
                    </h3>
                  ) : null}
                  <ul className="space-y-3">
                    {block.body.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-relaxed text-zinc-600 sm:text-lg"
                      >
                        <span
                          className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-zinc-400"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
      {children}
    </section>
  );
}
