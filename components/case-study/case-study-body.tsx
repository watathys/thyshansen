import { cn } from "@/lib/utils";
import type { CaseStudyTheme } from "@/lib/projects";

/**
 * The paper-white surface a cinematic case study reads on: the project's own
 * palette with dark neutral text, instead of the site's dark theme. Both entry
 * points wrap their content in it — the standalone `/projects/[slug]` page and
 * the homepage's card-to-case-study overlay — so the long-form page looks
 * identical once the transition lands.
 */
export function CaseStudyBody({
  theme,
  className,
  children,
}: {
  theme: CaseStudyTheme;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("text-zinc-900", className)}
      style={{ backgroundColor: theme.background }}
    >
      {children}
    </div>
  );
}
