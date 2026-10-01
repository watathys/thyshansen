"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { imageFitClass, initials } from "@/lib/media";
import {
  HeroSlideLinks,
  type HeroSlideLink,
} from "@/components/projects/hero-slide-links";
import type { ImageFit } from "@/content/site";
import type { MediaStatus } from "@/lib/media";

/**
 * A single panel in the homepage hero presentation — the left editorial
 * column (eyebrow, title, description, CTA, and a small picture-in-picture
 * thumbnail). The headline, eyebrow, and CTA use the slide's `accent`
 * (e.g. red); the body copy stays neutral so the accent is used sparingly —
 * just the words and the thin strip on the left edge.
 */
export interface HeroSlideData {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Where the title/CTA link to — a case study route or a same-page anchor. */
  href: string;
  /** CTA text before the arrow, e.g. "Open Case Study", "About Me". */
  ctaLabel: string;
  /**
   * Optional row of pill links shown instead of the single `ctaLabel`
   * button (used by the Contact card for Email / LinkedIn / Instagram).
   */
  links?: HeroSlideLink[];
  image?: string;
  /** How `image` fills its frame (`Project.imageFit`); defaults to `cover`. */
  imageFit?: ImageFit;
  /** Optional looping video snippet; falls back to `image` in the media stage. */
  video?: string;
  hasImage: boolean;
  /**
   * Server-resolved media availability for this project's cinematic case
   * study, parallel to its `sections` (see `site.caseStudies`). Present only
   * for projects that have a dedicated case study — the card-to-case-study
   * overlay uses it to render real footage or the placeholder frame without
   * touching the filesystem.
   */
  caseStudyMedia?: Array<MediaStatus | null>;
  /** Full-page background color (white for the intro, tints for others). */
  background: string;
  /** Accent color: headline, eyebrow, CTA, and the left strip. */
  accent: string;
}

/** Heavy, agency-style cubic bezier shared across the whole presentation. */
export const HERO_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * How long the media column's translate takes to settle on a slide change
 * (`HeroMediaStage`). The text panel's stagger below is tuned against this
 * so the last item's entrance lands close to when the column finishes —
 * otherwise the text keeps cascading in well after everything else has
 * settled, which reads as a second, disconnected animation rather than one
 * unified transition. Kept ~1s so the weighty `power4.out`-style ease has
 * room to breathe — the reference feel is a slow, deliberate glide, not a
 * snappy swap.
 */
export const HERO_SLIDE_DURATION = 1;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

/**
 * Editorial copy variants: the outgoing panel glides up and fades while the
 * incoming panel rises from below, with a subtle 0.05s stagger so the lines
 * cascade rather than swap as a block. Motion is opacity + a small
 * `y` offset only — no blur/filter, which caused perceived jitter.
 */
const item = {
  hidden: () => ({ y: 20, opacity: 0 }),
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: HERO_EASE },
  },
  exit: () => ({
    y: -20,
    opacity: 0,
    transition: { duration: 0.3, ease: HERO_EASE },
  }),
};

export function HeroSlidePanel({
  ref,
  slide,
  index,
  total,
  direction,
  onOpen,
}: {
  ref?: React.Ref<HTMLDivElement>;
  slide: HeroSlideData;
  index: number;
  total: number;
  direction: number;
  /** Intercepts "Open Case Study" clicks so the hero can run the FLIP. */
  onOpen?: (slide: HeroSlideData, e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const monogram = initials(slide.title);
  const accent = slide.accent;

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={direction}
      className="flex flex-col items-start"
    >
      <motion.p
        variants={item}
        custom={direction}
        className="text-eyebrow flex items-center gap-3 text-xs font-semibold sm:text-sm"
        style={{ color: accent }}
      >
        <span>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span
          className="h-px w-8"
          style={{ backgroundColor: accent, opacity: 0.5 }}
          aria-hidden="true"
        />
        <span>{slide.eyebrow}</span>
      </motion.p>

      <motion.h2
        variants={item}
        custom={direction}
        layoutId={`project-title-${slide.slug}`}
        className="mt-6 max-w-[13ch] text-[clamp(2.5rem,5.5vw,5.25rem)] leading-[0.95] font-bold tracking-tight"
        style={{ color: accent }}
      >
        {slide.title}
      </motion.h2>

      <motion.p
        variants={item}
        custom={direction}
        className="mt-6 max-w-[24rem] text-lg leading-relaxed text-zinc-700"
      >
        {slide.description}
      </motion.p>

      <motion.div variants={item} custom={direction} className="mt-8">
        {slide.links && slide.links.length > 0 ? (
          <HeroSlideLinks links={slide.links} accent={accent} />
        ) : (
          <Link
            href={slide.href}
            onClick={(e) => onOpen?.(slide, e)}
            className="group/cta text-eyebrow inline-flex items-center gap-3 rounded-full border px-6 py-3 text-xs font-bold transition-opacity duration-300 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm"
            style={{
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
            }}
          >
            {slide.ctaLabel}
            <span
              className="transition-transform duration-300 group-hover/cta:translate-x-1.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        )}
      </motion.div>

      <motion.div variants={item} custom={direction}>
        <div className="relative mt-10 hidden h-20 w-32 -rotate-2 overflow-hidden rounded-xl border border-zinc-200 shadow-sm sm:block">
          {slide.hasImage && slide.image ? (
            <Image
              src={slide.image}
              alt=""
              aria-hidden="true"
              fill
              sizes="128px"
              className={`object-[75%_25%] ${imageFitClass(slide.imageFit)}`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-sm font-bold text-zinc-400">
              {monogram}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
