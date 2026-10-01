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

/**
 * Whether an optional case-study media slot (a looping video/GIF, and its
 * poster) actually has files in /public. Resolved on the server — see
 * `mediaStatus` in `lib/media-server.ts` — and passed to components as a plain
 * flag, so client components never touch the filesystem.
 */
export interface MediaStatus {
  hasMedia: boolean;
  hasPoster: boolean;
}

/**
 * Parses an `aspect-ratio`-style string ("16 / 9") into a decimal, so a media
 * frame can size itself from it in CSS — e.g. capping a tall portrait shot at
 * a sane height instead of letting it run the full page width. Returns `null`
 * when the value isn't a usable ratio.
 */
export function aspectRatioValue(aspectRatio: string): number | null {
  const [width, height] = aspectRatio.split("/").map((part) => Number(part.trim()));
  if (!width || !height) return null;
  return width / height;
}

/** Whether a case-study media source is a screen recording rather than a still. */
export function isVideoSource(src?: string): boolean {
  return Boolean(src && /\.(mp4|webm|mov|ogv)$/i.test(src));
}

/** Whether a still media source is an animated GIF (needs `unoptimized`). */
export function isAnimatedImage(src?: string): boolean {
  return Boolean(src && src.toLowerCase().endsWith(".gif"));
}
