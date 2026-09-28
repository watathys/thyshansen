/**
 * Small, dependency-free helpers shared across components.
 */

/** Joins class names, filtering out falsy values. Keeps className logic
 * readable without pulling in clsx/tailwind-merge for a small site. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
