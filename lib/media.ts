/**
 * Browser & Client safe media utilities.
 */

/** Builds the initials used in monogram fallbacks (e.g. "Journal App" -> "JA"). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
