import { Container } from "@/components/layout/container";
import type { Stat } from "@/content/site";

/**
 * Clean number callouts used in place of a demo when the milestone is a metric
 * (e.g. the growth section). Big figures in the project accent over small
 * tracked labels, laid out on a plain grid — no chart, no chrome.
 */
export function CaseStudyStats({
  stats,
  accent,
}: {
  stats: Stat[];
  /** The project's accent, used for the figures. */
  accent: string;
}) {
  return (
    <Container>
      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-zinc-200 pt-10 sm:mt-16 sm:grid-cols-3">
        {stats.map((stat) => (
          <li key={stat.label}>
            <p
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ color: accent }}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
