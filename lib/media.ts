/**
 * Browser & Client safe media utilities.
 */

import type { ImageFit } from "@/content/site";

/** Builds the initials used in monogram fallbacks (e.g. "Journal App" -> "JA"). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Tailwind `object-fit` class for a project or slide image. Screenshots fill
 * their frame (`cover`); logo/brand marks are shown whole (`contain`) so a
 * portrait or landscape frame never crops them.
 */
export function imageFitClass(fit?: ImageFit): string {
  return fit === "contain" ? "object-contain" : "object-cover";
}
