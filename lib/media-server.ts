import fs from "node:fs";
import path from "node:path";
import type { CaseStudyMedia } from "@/content/site";
import type { MediaStatus } from "@/lib/media";

/**
 * Server-only media utilities (uses node:fs).
 * DO NOT import in "use client" components.
 */
export function publicFileExists(relativePath?: string): boolean {
  if (!relativePath) return false;
  try {
    const filePath = path.join(process.cwd(), "public", relativePath);
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * Resolves whether a cinematic case study's media slot can render real footage
 * yet. `null` when the section has no media at all; otherwise a flag per file
 * that components can render from without touching the filesystem.
 */
export function mediaStatus(media?: CaseStudyMedia): MediaStatus | null {
  if (!media) return null;
  return {
    hasMedia: publicFileExists(media.src),
    hasPoster: publicFileExists(media.poster),
  };
}
