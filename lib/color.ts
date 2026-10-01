/**
 * Small, dependency-free color helpers for surfaces colored from content
 * (e.g. a case study's per-project palette). Framework-free and pure, so they
 * run in both server and client components.
 */

/** Minimum contrast for small text to stay legible (WCAG AA, normal text). */
const MIN_LABEL_CONTRAST = 4.5;

function parseHex(hex: string): [number, number, number] | null {
  const normalized = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
  return [0, 2, 4].map((offset) =>
    parseInt(normalized.slice(offset, offset + 2), 16),
  ) as [number, number, number];
}

function toHex(rgb: number[]): string {
  return `#${rgb
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function linearize(value: number): number {
  const channel = value / 255;
  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance of a `#rrggbb` color, or `null` if unparseable. */
export function relativeLuminance(hex: string): number | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  return (
    0.2126 * linearize(rgb[0]) +
    0.7152 * linearize(rgb[1]) +
    0.0722 * linearize(rgb[2])
  );
}

/** WCAG contrast ratio between two `#rrggbb` colors (1–21). */
export function contrastRatio(a: string, b: string): number {
  const luminanceA = relativeLuminance(a);
  const luminanceB = relativeLuminance(b);
  if (luminanceA === null || luminanceB === null) return 0;

  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Perceived-brightness test for a `#rrggbb` color. Used to pick a light or
 * dark text treatment for a surface colored from content, rather than
 * hardcoding which pages are light.
 */
export function isLightHexColor(hex: string): boolean {
  const luminance = relativeLuminance(hex);
  return luminance === null ? false : luminance > 0.5;
}

/**
 * A variant of `accent` that clears WCAG AA (4.5:1) for small text on
 * `background`, darkened only as far as it needs to be. Returns `accent`
 * untouched when it already passes, so a project's brand color is never
 * altered for a label that didn't need it — big display figures keep the true
 * brand hue, small tracked labels get this.
 */
export function readableAccent(accent: string, background: string): string {
  if (contrastRatio(accent, background) >= MIN_LABEL_CONTRAST) return accent;

  const rgb = parseHex(accent);
  if (!rgb) return accent;

  for (let mix = 0.02; mix <= 1; mix += 0.02) {
    const candidate = toHex(rgb.map((channel) => channel * (1 - mix)));
    if (contrastRatio(candidate, background) >= MIN_LABEL_CONTRAST) {
      return candidate;
    }
  }

  return "#000000";
}
