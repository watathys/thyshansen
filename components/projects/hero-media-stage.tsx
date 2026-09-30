"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { imageFitClass, initials } from "@/lib/media";
import { cn } from "@/lib/utils";
import {
  HERO_EASE,
  HERO_SLIDE_DURATION,
  type HeroSlideData,
} from "@/components/projects/hero-slide";

/**
 * The right-hand column of the hero: a single continuous vertical track of
 * clean, straight media cards (white, rounded, subtle shadow) that slides
 * inside a perspective-skewed viewport.
 *
 * Architecture (kept deliberately simple so the motion reads as one fluid
 * glide instead of a stack of independently-animated cards):
 *
 *   - A *viewport* wrapper sets `perspective: 1200px` with a
 *     `perspective-origin: 60% 50%`, so the 3D tilt is felt (not flat) but
 *     stays subtle.
 *   - A *track* element holds every card in a `flex-col` with a fixed
 *     `gap: 3rem` and carries a gentle 3D tilt
 *     (`rotateX(4deg) rotateY(-6deg) rotateZ(-1.5deg)` + `preserve-3d`).
 *   - Advancing a slide translates the **whole track** vertically with
 *     `translate3d(0, -offset, 0)` — the previous card glides up out of
 *     frame while the incoming card glides up from below in one continuous
 *     movement. No per-card mount/unmount, no fade swaps.
 *
 * Two "alive" effects layer on each card:
 *   1. An organic idle float — a slow up/down bob with a micro rotational
 *      sway (sine easing, ~4s, looping) so the stage breathes even when the
 *      user isn't interacting. Paused while a slide transition or the case
 *      study overlay is in flight (`idle`), and for reduced-motion users.
 *   2. A spring-damped mouse parallax tilt — moving the cursor leans the
 *      card slightly away from the pointer, settling back to rest when the
 *      cursor pauses.
 *
 * The track flattens toward the perspective center when the quick-navigator
 * drawer opens (`flattened`), and a hover-scrub index (`scrubIndex`) can
 * override which card sits in the focal center while the navigator is active.
 */

const CARD_WIDTH = 340;
const CARD_HEIGHT = 440;
/** Fixed track spacing — one `3rem` gap so translation is perfectly uniform. */
const CARD_GAP = 48;
const CARD_PITCH = CARD_HEIGHT + CARD_GAP;

/** Soft but responsive spring for the mouse-parallax tilt. */
const PARALLAX_SPRING = { stiffness: 150, damping: 22, mass: 0.6 };
/** Max tilt (deg) applied when the cursor reaches a card's edge. */
const MAX_TILT = 7;

/** The perspective-skew of the right column — kept gentle so the cards read
 *  as upright and face the viewer rather than leaning sharply. */
const TRACK_TILT = {
  rotateX: 4,
  rotateY: -6,
  rotateZ: -1.5,
};

function HeroMediaCard({
  slide,
  dull,
  idle,
  onOpen,
}: {
  slide: HeroSlideData;
  /** Grayscale/dim the card while the navigator is scrubbing. */
  dull: boolean;
  idle: boolean;
  onOpen?: (slide: HeroSlideData) => void;
}) {
  const monogram = initials(slide.title);
  const reduceMotion = useReducedMotion();

  // Parallax tilt — motion values spring back to rest when the cursor pauses.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, PARALLAX_SPRING);
  const springY = useSpring(rotateY, PARALLAX_SPRING);

  // Project slides open a case study; info cards (intro / Creatives /
  // Experience) navigate to their target. Either way the card is clickable.
  const isProject = slide.href.startsWith("/work/");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Tilt opposite to the cursor so the card leans away from the pointer.
    rotateY.set(px * -MAX_TILT);
    rotateX.set(py * -MAX_TILT);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.(slide);
    }
  };

  return (
    <motion.div
      data-media-card
      layoutId={`project-media-${slide.slug}`}
      role="button"
      tabIndex={0}
      aria-label={isProject ? `Open ${slide.title} case study` : `Go to ${slide.title}`}
      onClick={() => onOpen?.(slide)}
      onKeyDown={onKeyDown}
      initial={false}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      className={cn(
        "relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        dull && "media-card-dull",
      )}
    >
      {/* Mouse-parallax tilt layer */}
      <motion.div
        aria-hidden="true"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Idle float: continuous bob + micro sway. The wrapper bleeds past
            the card's top/bottom so the oscillation never exposes the card
            background. */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            reduceMotion
              ? undefined
              : idle
                ? { y: [-2, 2, -2], rotateZ: [-0.12, 0.12, -0.12] }
                : { y: 0, rotateZ: 0 }
          }
          transition={
            idle && !reduceMotion
              ? { duration: 4, ease: "easeInOut", repeat: Infinity }
              : { duration: 0.35, ease: "easeOut" }
          }
          className="absolute -inset-y-4 inset-x-0 will-change-transform"
        >
          {slide.video ? (
            <video
              src={slide.video}
              poster={slide.image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : slide.hasImage && slide.image ? (
            <Image
              src={slide.image}
              alt={`${slide.title} preview`}
              fill
              sizes={`${CARD_WIDTH}px`}
              className={imageFitClass(slide.imageFit)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-100 p-8 text-center">
              <span className="text-4xl font-bold text-zinc-400">{monogram}</span>
              <span className="text-eyebrow text-[10px] text-zinc-500">
                {slide.eyebrow}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroMediaStage({
  slides,
  activeIndex,
  scrubIndex,
  flattened,
  idle = true,
  onOpen,
}: {
  slides: HeroSlideData[];
  activeIndex: number;
  /** While scrubbing, which card should sit in the focal center. */
  scrubIndex?: number | null;
  /** Flattens the perspective skew when the quick-navigator opens. */
  flattened?: boolean;
  /** Enables the idle float/bob (paused during transitions / overlay). */
  idle?: boolean;
  onOpen?: (slide: HeroSlideData) => void;
}) {
  // The track is anchored so card 0's top sits at the stage's vertical
  // center; translating by -(halfCard + index*pitch) then centers the active
  // card. Horizontal centering is handled by the outer wrapper.
  const focusIndex = scrubIndex ?? activeIndex;
  const scrubbing = scrubIndex != null;
  const offsetY = -(CARD_HEIGHT / 2) - focusIndex * CARD_PITCH;

  return (
    <div
      className="relative h-full"
      style={{ perspective: 1200, perspectiveOrigin: "60% 50%" }}
    >
      {/* Tilt frame — a FIXED, viewport-size element that owns the 3D skew.
          Because its rotation origin is the viewport center (where the active
          card is always translated to), every slide's centered card sits at
          the same depth under `perspective` and renders the same size. (The
          earlier version tilted the giant track instead, so each slide's card
          landed at a different depth — making cards look different sizes.) */}
      <motion.div
        initial={false}
        animate={{
          rotateX: flattened ? 0 : TRACK_TILT.rotateX,
          rotateY: flattened ? 0 : TRACK_TILT.rotateY,
          rotateZ: flattened ? 0 : TRACK_TILT.rotateZ,
        }}
        transition={
          scrubbing
            ? { duration: 0.3, ease: HERO_EASE }
            : { duration: HERO_SLIDE_DURATION, ease: HERO_EASE }
        }
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className="absolute inset-0"
      >
        {/* Clip viewport: mask + overflow-hidden so cards fade at the top and
            bottom. Contains only the 2D vertical translation. */}
        <div
          className={cn(
            "relative h-full overflow-hidden",
            flattened
              ? "[mask-image:linear-gradient(to_bottom,transparent,black_4%,black_96%,transparent)]"
              : "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
          )}
        >
          {/* Centering anchor: the track's TOP edge sits at the viewport's
              vertical center, then `y` (offsetY) translates it so the active
              card centers. Only the X axis is pre-centered here. */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
            {/* The translating track — pure vertical glide, no rotation. */}
            <motion.div
              initial={false}
              animate={{ y: offsetY }}
              transition={
                scrubbing
                  ? { duration: 0.3, ease: HERO_EASE }
                  : { duration: HERO_SLIDE_DURATION, ease: HERO_EASE }
              }
              style={{ willChange: "transform" }}
            >
              <div
                className="flex flex-col items-center"
                style={{ gap: CARD_GAP }}
              >
                {slides.map((slide, i) => (
                  <HeroMediaCard
                    key={slide.slug}
                    slide={slide}
                    dull={scrubbing && i !== focusIndex}
                    idle={idle}
                    onOpen={onOpen}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
