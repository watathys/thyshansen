import fs from "node:fs";
import path from "node:path";

/**
 * Checks whether a `/public`-relative path resolves to a real file on disk.
 * Used by server components to decide whether to render an <Image> or a
 * clean fallback, so the site never shows a broken-image icon while content
 * (like project screenshots) is still a TODO in content/site.ts.
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

/** Builds the initials used in monogram fallbacks (e.g. "Journal App" -> "JA"). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
