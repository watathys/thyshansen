/**
 * Route helpers for project case studies.
 */

import { site, type CaseStudy, type Project } from "@/content/site";
import { isLightHexColor, readableAccent } from "@/lib/color";

/**
 * The color roles a cinematic case study renders with — its project's own
 * palette rather than the site's dark theme.
 */
export interface CaseStudyTheme {
  /** The page surface: the project's background color. */
  background: string;
  /** The project's brand accent, for large figures and decorative marks. */
  accent: string;
  /**
   * An AA-safe variant of `accent` for small tracked labels (section numbers,
   * eyebrows), derived once here so components never hardcode a second hue.
   */
  accentText: string;
}

/**
 * The canonical case-study route for a project: its dedicated cinematic page
 * when one exists in `site.caseStudies`, otherwise the generic `/work/[slug]`
 * detail page. Keeps every card/menu link pointing at the best available page
 * without hardcoding routes in components.
 */
export function caseStudyHref(project: Project): string {
  const hasDedicatedPage = site.caseStudies.some(
    (study) => study.slug === project.slug,
  );
  return hasDedicatedPage
    ? `/projects/${project.slug}`
    : `/work/${project.slug}`;
}

/**
 * The project that follows `project` in `site.projects`, wrapped around at the
 * end, for a case study's "next project" link. `null` when there's only one
 * project (i.e. there is no next one).
 */
export function nextCaseStudy(
  project: Project,
): { name: string; href: string } | null {
  const index = site.projects.findIndex((entry) => entry.slug === project.slug);
  if (index === -1) return null;

  const next = site.projects[(index + 1) % site.projects.length];
  if (!next || next.slug === project.slug) return null;

  return { name: next.name, href: caseStudyHref(next) };
}

/** Resolves a project's cinematic case-study palette. */
export function caseStudyTheme(project: Project): CaseStudyTheme {
  const { background, accent } = project;
  return {
    background,
    accent,
    accentText: readableAccent(accent, background),
  };
}

/**
 * The case study in `site.caseStudies` for `slug` alongside its `Project`, or
 * `null` when that project has no cinematic page. The single lookup both the
 * route and its metadata use, so they can't disagree about which projects have
 * a case study.
 */
export function findCaseStudy(
  slug: string,
): { study: CaseStudy; project: Project } | null {
  const study = site.caseStudies.find((entry) => entry.slug === slug);
  const project = site.projects.find((entry) => entry.slug === slug);
  return study && project ? { study, project } : null;
}

/**
 * The theme of the cinematic case study at `pathname` when that page renders
 * on a light surface, otherwise `null`. Lets the fixed header and footer match
 * the page they frame without hardcoding routes — and without guessing, since
 * a `/projects/:slug` route only qualifies when it actually has a case study
 * with a light palette (the generic `/work/:slug` pages stay dark).
 */
export function lightCaseStudyRoute(pathname: string): CaseStudyTheme | null {
  const match = pathname.match(/^\/projects\/([^/]+)$/);
  if (!match) return null;

  const slug = decodeURIComponent(match[1]);
  const project = site.projects.find((entry) => entry.slug === slug);
  const isCinematic = site.caseStudies.some((entry) => entry.slug === slug);
  if (!project || !isCinematic) return null;

  const theme = caseStudyTheme(project);
  return isLightHexColor(theme.background) ? theme : null;
}
