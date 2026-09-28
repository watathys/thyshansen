import fs from "node:fs";
import path from "node:path";

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
