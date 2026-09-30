import Link from "next/link";

/**
 * A destination shown as a pill under a hero card's copy (e.g. the Contact
 * card's Email / LinkedIn / Instagram row).
 */
export interface HeroSlideLink {
  label: string;
  url: string;
}

/**
 * Row of pill links for a hero slide that offers several destinations
 * instead of the single `ctaLabel` button. Styled to match the shared CTA
 * (accent text + a soft accent border) so it reads as part of the same
 * editorial panel.
 */
export function HeroSlideLinks({
  links,
  accent,
}: {
  links: HeroSlideLink[];
  accent: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((link) => {
        const external = link.url.startsWith("http");
        return (
          <Link
            key={link.label}
            href={link.url}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-eyebrow inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold transition-opacity duration-300 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm"
            style={{
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
            }}
          >
            {link.label}
            <span aria-hidden="true">{external ? "↗" : "→"}</span>
          </Link>
        );
      })}
    </div>
  );
}
