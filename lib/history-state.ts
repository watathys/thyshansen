/**
 * URL/history helpers for the in-place card-to-case-study transition.
 *
 * Next.js 16 patches `window.history.pushState`/`replaceState` so that any
 * call with a URL dispatches an `ACTION_RESTORE` into the App Router — i.e. a
 * full client navigation + re-render. That would tear down the hero and the
 * overlay we're trying to animate between.
 *
 * To own the URL (deep-linkable + Back-button-reversible) *without* a
 * re-render, we reach the native `History.prototype.pushState` directly. The
 * resulting entry carries no Next.js router state, so Next's own `popstate`
 * handler ignores it instead of force-reloading the page.
 */

export function pushStateWithoutRouter(url: string): void {
  if (typeof window === "undefined") return;
  History.prototype.pushState.call(window.history, null, "", url);
}

/**
 * True when `pathname` points at a project case study route — either the
 * generic `/work/:slug` detail page or a dedicated `/projects/:slug` page.
 * Non-project pages (e.g. `/about`) never trigger the overlay.
 */
export function isCaseStudyPath(pathname: string): boolean {
  return /^\/(work|projects)\/[^/]+$/.test(pathname);
}

/**
 * Extracts the slug from a `/work/:slug` or `/projects/:slug` pathname
 * (already URL-decoded).
 */
export function slugFromCaseStudyPath(pathname: string): string | null {
  const match = pathname.match(/^\/(?:work|projects)\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * True when `pathname` points at an overlay-supported route: either a project
 * case study (/work/:slug, /projects/:slug) or an editorial teaser card
 * (/gallery for Creatives, /resume for Work Experience, /about for About / Thys Hansen).
 */
export function isOverlayPath(pathname: string): boolean {
  return (
    isCaseStudyPath(pathname) ||
    pathname === "/gallery" ||
    pathname === "/resume" ||
    pathname === "/about"
  );
}

/**
 * Extracts the slide slug corresponding to an overlay pathname.
 */
export function slugFromOverlayPath(pathname: string): string | null {
  if (pathname === "/gallery") return "creatives";
  if (pathname === "/resume") return "work-experience";
  if (pathname === "/about") return "intro";
  return slugFromCaseStudyPath(pathname);
}


