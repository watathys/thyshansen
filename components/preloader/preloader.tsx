"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  stagger,
  useAnimate,
  type AnimationPlaybackControlsWithThen,
  type AnimationSequence,
} from "framer-motion";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { HERO_EASE } from "@/components/projects/hero-slide";
import { PreloaderTitle } from "@/components/preloader/preloader-title";
import {
  PreloaderCards,
  type PreloaderCardData,
} from "@/components/preloader/preloader-cards";
import {
  hasPreloaderPlayed,
  markPreloaderPlayed,
} from "@/components/preloader/preloader-state";

/**
 * Page-load intro, orchestrated as one Framer Motion timeline:
 *
 *  1. INTRO  — dark screen. The hollow name rises into place and is filled
 *              left → right, the role/caption fade in, and the right-hand
 *              media cards resolve from skeletons.
 *  2. WIPE   — a slate-teal curtain sweeps in from the left (clip-path)
 *              while the name splits apart and the cards lift away.
 *  3. UNFURL — the curtain's trailing edge continues left → right, revealing
 *              the hero. `onReveal` fires as it starts so the hero's own
 *              entrance choreography overlaps the reveal.
 *
 * Afterwards the overlay is inert (`pointer-events: none`, `visibility:
 * hidden`) and then unmounted. Click / Escape / Enter fast-forwards it.
 * Reduced-motion users skip it entirely.
 */

/** Dramatic ease-out for entrances (≈ GSAP power4.out). */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Weighty ease for the wipe (≈ GSAP power3.inOut / the hero's own ease). */
const EASE_WIPE = HERO_EASE;

const CURTAIN_HIDDEN = "inset(0% 100% 0% 0%)";
const CURTAIN_COVER = "inset(0% 0% 0% 0%)";
const CURTAIN_GONE = "inset(0% 0% 0% 100%)";

const FAST_FORWARD = 3.5;
const FONT_WAIT_MS = 1200;

type Phase = "intro" | "reveal" | "done";

export function Preloader({
  cards,
  onReveal,
}: {
  cards: PreloaderCardData[];
  /** Fired when the curtain starts uncovering the hero. */
  onReveal: () => void;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  // Decided once per mount: only a full page load (module state fresh)
  // plays the intro. Kept separate from `phase` so phase changes mid-timeline
  // don't re-run the effect below.
  const [shouldPlay] = useState(() => !hasPreloaderPlayed());
  const [phase, setPhase] = useState<Phase>(shouldPlay ? "intro" : "done");

  const onRevealRef = useRef(onReveal);
  const controlsRef = useRef<AnimationPlaybackControlsWithThen | null>(null);
  const speedRef = useRef(1);
  /**
   * The latest scoped `animate` from `useAnimate`, held in a ref so the
   * timeline effect below stays keyed to the mount instead of re-running
   * whenever `animate`'s identity changes — `useAnimate` recreates it when
   * MotionConfig's motion settings resolve.
   *
   * That re-run was the bug: the scoped `animate` resolves selector strings
   * against `scope.current` and, unlike the global `animate`, does *not* fall
   * back to `document` when the scope is detached — so once `phase` hit
   * `"done"` (unmounting the overlay) a late re-run called
   * `null.querySelectorAll(...)` and threw.
   */
  const animateRef = useRef(animate);

  useEffect(() => {
    onRevealRef.current = onReveal;
  });

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  useEffect(() => {
    if (!shouldPlay) return;

    const finish = () => {
      markPreloaderPlayed();
      onRevealRef.current();
      setPhase("done");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const root = document.documentElement;
    root.classList.add("overflow-hidden");

    let cancelled = false;
    // True once there is nothing left to animate: the effect was cleaned up,
    // or the overlay that owns the scope has unmounted (in which case the
    // scoped `animate` would throw on a null scope — see `animateRef`).
    const detached = () => cancelled || !scope.current;

    const run = (sequence: AnimationSequence): Promise<unknown> => {
      if (detached()) return Promise.resolve();
      const controls = animateRef.current(sequence);
      controls.speed = speedRef.current;
      controlsRef.current = controls;
      return controls.then(
        () => undefined,
        () => undefined,
      );
    };

    const play = async () => {
      // Give the display serif a moment so the outline doesn't reflow
      // mid-animation (bounded — never blocks the intro for long).
      await Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, FONT_WAIT_MS)),
      ]);
      if (cancelled) return;
      // The scope never attached, or was already torn down: reveal the hero
      // directly rather than animating nothing and leaving the page stranded
      // behind a stale overlay.
      if (!scope.current) {
        finish();
        return;
      }

      // Stage 1 + 2: intro, then the curtain sweeps across and covers all.
      await run([
        [
          "[data-pl=line]",
          { y: ["110%", "0%"] },
          { duration: 1, ease: EASE_OUT, delay: stagger(0.1), at: 0.1 },
        ],
        [
          "[data-pl=card]",
          { opacity: 1, y: 0 },
          { duration: 1, ease: EASE_OUT, delay: stagger(0.12), at: 0.2 },
        ],
        [
          "[data-pl=meta]",
          { opacity: 1, y: 0 },
          { duration: 0.8, ease: EASE_OUT, at: 0.6 },
        ],
        [
          "[data-pl=caption]",
          { opacity: 1, y: 0, scale: 1 },
          { duration: 0.8, ease: EASE_OUT, at: 0.9 },
        ],
        [
          "[data-pl=fill]",
          { clipPath: "inset(0% 0% 0% 0%)" },
          { duration: 1, ease: EASE_WIPE, delay: stagger(0.14), at: 0.7 },
        ],
        [
          "[data-pl=skeleton]",
          { opacity: 0 },
          { duration: 0.7, ease: "easeOut", delay: stagger(0.15), at: 0.9 },
        ],

        // Wipe: curtain in, name splits, cards lift away.
        [
          "[data-pl=curtain]",
          { clipPath: CURTAIN_COVER },
          { duration: 1.05, ease: EASE_WIPE, at: 2 },
        ],
        [
          "[data-pl-split=up]",
          { y: ["0%", "-110%"] },
          { duration: 0.9, ease: EASE_WIPE, at: 2.1 },
        ],
        [
          "[data-pl-split=down]",
          { y: ["0%", "110%"] },
          { duration: 0.9, ease: EASE_WIPE, at: 2.1 },
        ],
        [
          "[data-pl=card]",
          { opacity: 0, y: -48 },
          { duration: 0.7, ease: EASE_WIPE, delay: stagger(0.06), at: 2.05 },
        ],
        [
          "[data-pl=meta], [data-pl=caption]",
          { opacity: 0, y: -16 },
          { duration: 0.5, ease: EASE_WIPE, at: 2.05 },
        ],
      ]);
      if (detached()) return;

      // Everything below the curtain is now hidden: make the overlay inert
      // for the reveal, and let the hero begin its own entrance.
      setPhase("reveal");
      onRevealRef.current();

      // Stage 3: unfurl — the curtain's trailing edge sweeps to the right.
      await run([
        [
          "[data-pl=curtain]",
          { clipPath: CURTAIN_GONE },
          { duration: 1.05, ease: EASE_WIPE },
        ],
      ]);
      if (detached()) return;

      root.classList.remove("overflow-hidden");
      markPreloaderPlayed();
      setPhase("done");
    };

    play();

    const skip = () => {
      speedRef.current = FAST_FORWARD;
      if (controlsRef.current) controlsRef.current.speed = FAST_FORWARD;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") skip();
    };
    const el = scope.current;
    el?.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
      root.classList.remove("overflow-hidden");
      el?.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, [shouldPlay, scope]);

  if (phase === "done") return null;

  return (
    <div
      ref={scope}
      data-preloader
      role="status"
      aria-live="polite"
      className={cn(
        "fixed inset-0 z-50 overflow-hidden",
        phase === "reveal" && "pointer-events-none",
      )}
    >
      <span className="sr-only">{site.preloader.label}</span>

      {/* Dark stage — hidden (not just covered) once the curtain has landed. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-preloader text-foreground",
          phase === "reveal" && "invisible",
        )}
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
          <div className="relative flex flex-col justify-center px-8 md:px-12 lg:px-16">
            <PreloaderTitle />

            <motion.p
              data-pl="caption"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              className="absolute bottom-8 left-8 max-w-[16rem] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs leading-snug text-zinc-400 md:bottom-10 md:left-12 lg:left-16"
            >
              {site.preloader.caption}
            </motion.p>
          </div>

          <PreloaderCards cards={cards} />
        </div>
      </div>

      {/* Slate-teal curtain: covers the dark stage, then uncovers the hero. */}
      <motion.div
        data-pl="curtain"
        aria-hidden="true"
        initial={{ clipPath: CURTAIN_HIDDEN }}
        className="absolute inset-0 bg-curtain"
      />

      {/* No-JS: never trap the page behind the overlay. */}
      <noscript>
        <style>{"[data-preloader]{display:none!important}"}</style>
      </noscript>
    </div>
  );
}
