"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { site } from "@/content/site";
import {
  HeroSlidePanel,
  HERO_EASE,
  type HeroSlideData,
} from "@/components/projects/hero-slide";
import { HeroMediaStage } from "@/components/projects/hero-media-stage";
import { CaseStudyOverlay } from "@/components/projects/case-study-overlay";
import { MobileHeroSlides } from "@/components/projects/hero-slide-mobile";
import { QuickNavigator } from "@/components/projects/quick-navigator";
import { Preloader } from "@/components/preloader/preloader";
import { hasPreloaderPlayed } from "@/components/preloader/preloader-state";
import { cn } from "@/lib/utils";
import {
  isOverlayPath,
  pushStateWithoutRouter,
  slugFromOverlayPath,
} from "@/lib/history-state";

/**
 * Fullscreen editorial presentation that opens the homepage: an intro/about
 * card, one card per project, then Creatives and Work Experience teaser
 * cards. On desktop (lg+) it's a hijacked, one-slide-per-gesture experience
 * — the full-page background wipes between project themes, the left column
 * staggers its editorial copy, and the right column scrolls a persistent 3D
 * media stack. Wheel/touch intent is throttled so a fast flick can't skip
 * several slides. Below lg it falls back to a plain stacked layout that
 * scrolls natively with the page.
 */

/**
 * How long inputs stay locked after a slide change fires. This is the
 * `isAnimating` intent-lock from the spec: wheel/swipe/key input is swallowed
 * until the current glide has settled, so a fast flick or momentum tail can't
 * cut a tween short or skip slides. Sized to the ~1s `HeroMediaStage` glide.
 */
const NAV_INTERVAL = 1000;
/** Minimum accumulated (normalized) wheel delta to trigger one slide. */
const WHEEL_THRESHOLD = 40;
const SWIPE_THRESHOLD = 40;

/**
 * Normalize a `WheelEvent` delta into a consistent, pixel-equivalent unit so
 * touchpad inertia and line-mode mouse wheels both cross the same threshold
 * without erratic jumps. (`deltaMode` 1 = lines, 2 = pages.) A line maps to
 * ~40px and a page to ~800px so a single mouse-wheel notch registers as one
 * full "step" rather than needing several notches to accumulate.
 */
function normalizeWheelDelta(e: WheelEvent): number {
  const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? 800 : 1;
  return e.deltaY * unit;
}

export function HeroSlider({ slides }: { slides: HeroSlideData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inView, setInView] = useState(true);
  // False until the page-load intro's curtain starts uncovering the hero, so
  // the hero's entrance choreography plays *during* the reveal, not behind it.
  const [entered, setEntered] = useState(hasPreloaderPlayed);
  const handleReveal = useCallback(() => setEntered(true), []);

  const rootRef = useRef<HTMLElement | null>(null);

  // Card-to-case-study transition: which project is open. The shared title +
  // media are matched by `layoutId`, so no manual rect capture is needed.
  const [opened, setOpened] = useState<{ slug: string } | null>(null);
  const closingRef = useRef(false);

  // Quick-navigator drawer (desktop hover-scrub on the right pagination rail).
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [navigatorHover, setNavigatorHover] = useState<number | null>(null);
  // True briefly after each slide change so the idle float pauses during the
  // transition, then resumes once the tween has settled.
  const [transitioning, setTransitioning] = useState(false);
  // Synchronous intent-lock mirroring `transitioning` for the wheel/touch/
  // keyboard handlers (which read a ref to avoid stale-closure races).
  const animatingRef = useRef(false);

  const lastNavAt = useRef(0);
  const wheelAccum = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = slides.length;

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(count - 1, i)),
    [count],
  );

  const goTo = useCallback(
    (target: number, dir: number) => {
      const next = clamp(target);
      if (next === activeIndex) return;
      setDirection(dir);
      setActiveIndex(next);
      // Lock inputs for the duration of the glide (intent-lock) and pause the
      // idle float until it settles.
      animatingRef.current = true;
      setTransitioning(true);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => {
        animatingRef.current = false;
        setTransitioning(false);
      }, NAV_INTERVAL);
    },
    [clamp, activeIndex],
  );

  const tryNavigate = useCallback(
    (dir: number) => {
      if (animatingRef.current) return;
      if (performance.now() - lastNavAt.current < NAV_INTERVAL) return;
      const next = clamp(activeIndex + dir);
      if (next === activeIndex) return;
      lastNavAt.current = performance.now();
      goTo(next, dir);
    },
    [clamp, goTo, activeIndex],
  );

  const selectSlide = useCallback(
    (index: number) => {
      setNavigatorOpen(false);
      setNavigatorHover(null);
      if (index === activeIndex) return;
      if (animatingRef.current) return;
      if (performance.now() - lastNavAt.current < NAV_INTERVAL) return;
      lastNavAt.current = performance.now();
      goTo(index, index > activeIndex ? 1 : -1);
    },
    [goTo, activeIndex],
  );

  const router = useRouter();

  // Open a project's case study or editorial card in the shared-element
  // overlay. Returns `false` when nothing was opened — not an overlay path,
  // already open, or below the `lg` breakpoint — so callers can fall back
  // to plain navigation.
  const openCaseStudy = useCallback(
    (slide: HeroSlideData): boolean => {
      if (!isOverlayPath(slide.href)) return false;
      if (opened) return false;
      if (!window.matchMedia("(min-width: 1024px)").matches) return false;

      setOpened({ slug: slide.slug });
      pushStateWithoutRouter(slide.href);
      return true;
    },
    [opened],
  );

  // The "Open Case Study" CTA link in the left panel — FLIP from the active
  // card, preventing the native navigation to `/work/[slug]`.
  const handleOpen = useCallback(
    (slide: HeroSlideData, e?: { preventDefault?: () => void }) => {
      if (openCaseStudy(slide)) e?.preventDefault?.();
    },
    [openCaseStudy],
  );

  // A media card in the right column. Project cards open the shared-element
  // overlay; info cards (intro / Creatives / Experience) simply navigate.
  // External targets (e.g. the Contact card's `mailto:`) bypass the router.
  const handleCardClick = useCallback(
    (slide: HeroSlideData) => {
      if (openCaseStudy(slide)) return;
      if (slide.href.startsWith("mailto:") || slide.href.startsWith("http")) {
        window.location.href = slide.href;
        return;
      }
      router.push(slide.href);
    },
    [openCaseStudy, router],
  );

  // Close is always routed through the browser history so Back / Forward /
  // "← Back Home" share one code path (the popstate listener below).
  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    window.history.back();
  }, []);

  // Reverse of `handleOpen`: keep the URL + overlay in sync with the
  // browser's Back / Forward buttons.
  useEffect(() => {
    const onPopState = () => {
      const pathname = window.location.pathname;
      if (isOverlayPath(pathname)) {
        const slug = slugFromOverlayPath(pathname);
        const slide = slides.find((s) => s.slug === slug);
        if (slide) {
          setOpened({ slug: slide.slug });
        }
      } else {
        closingRef.current = false;
        setOpened(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [slides]);

  // Clear any pending transition timers on unmount.
  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  // Wheel intent: non-passive listener on the presentation itself so the
  // page never scrolls away mid-presentation (except at the boundaries).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (opened || navigatorOpen) return;
      // Intent-lock: while the current glide is still settling, swallow the
      // momentum tail (and reset any partial accumulation) so it can't queue
      // a second slide the moment the lock lifts.
      if (animatingRef.current) {
        wheelAccum.current = 0;
        return;
      }
      const delta = normalizeWheelDelta(e);
      const dir = delta > 0 ? 1 : delta < 0 ? -1 : 0;
      if (dir === 0) return;

      const atTop = activeIndex === 0 && dir < 0;
      const atBottom = activeIndex === count - 1 && dir > 0;
      if (atTop || atBottom) return; // release to native page scroll

      e.preventDefault();

      wheelAccum.current += delta;
      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        tryNavigate(wheelAccum.current > 0 ? 1 : -1);
        wheelAccum.current = 0;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [count, tryNavigate, activeIndex, opened, navigatorOpen]);

  // Touch swipe intent (touch laptops / tablets in landscape).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStart.current = t ? { x: t.clientX, y: t.clientY } : null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (opened) return;
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;
      const t = e.changedTouches[0];
      const dy = t.clientY - start.y;
      const dx = t.clientX - start.x;
      if (Math.abs(dy) > SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
        tryNavigate(dy < 0 ? 1 : -1);
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [tryNavigate, opened]);

  // Only grab arrow-key navigation while the presentation is on screen, so
  // we never hijack keys elsewhere on the page.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (opened || navigatorOpen) return;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case "ArrowRight":
          e.preventDefault();
          tryNavigate(1);
          break;
        case "ArrowUp":
        case "PageUp":
        case "ArrowLeft":
          e.preventDefault();
          tryNavigate(-1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0, -1);
          break;
        case "End":
          e.preventDefault();
          goTo(count - 1, 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, tryNavigate, goTo, count, opened, navigatorOpen]);

  if (count === 0) return null;

  const active = slides[activeIndex];
  const preloaderCards = slides.slice(1, 4);

  // Every slide gets a labelled dot in the quick-navigator rail (intro,
  // each project, Creatives, and Work Experience) so each dot corresponds
  // to a title.
  const navigatorItems = slides.map((slide, index) => ({
    label: slide.title,
    accent: slide.accent,
    slideIndex: index,
  }));

  // The idle float runs only once the hero has entered, and pauses while a
  // slide transition, the case-study overlay, or the navigator is active.
  const idleEnabled = entered && !opened && !transitioning && !navigatorOpen;

  // Resolve the full project data for the open overlay (content stays in
  // `site.projects`; the slide only carries the hero's visual fields).
  const openedSlide = opened
    ? slides.find((s) => s.slug === opened.slug)
    : undefined;
  const openedProject = opened
    ? site.projects.find((p) => p.slug === opened.slug)
    : undefined;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative">
        <Preloader cards={preloaderCards} onReveal={handleReveal} />

        {/* Real page <h1> for SEO/a11y — the per-slide serif titles are <h2>s. */}
        <h1 className="sr-only">
          {site.name} — {site.tagline}
        </h1>
        <div id="top" className="absolute top-0" aria-hidden="true" />

        {/* Desktop presentation (lg+) */}
        <section
          ref={rootRef}
          aria-label="Featured work"
          className="relative hidden h-dvh overflow-hidden lg:block"
        >
          {/* Full-page background — dims to near-black while the quick
              navigator is open. */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ backgroundColor: navigatorOpen ? "#0a0a0a" : active.background }}
            transition={{ duration: navigatorOpen ? 0.4 : 0.8, ease: HERO_EASE }}
            className="absolute inset-0"
          />

          {/* Thin vertical accent strip down the far-left edge */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ backgroundColor: active.accent, opacity: navigatorOpen ? 0 : 1 }}
            transition={{ duration: 0.4, ease: HERO_EASE }}
            className="absolute left-0 top-0 bottom-0 z-20 w-1.5"
          />

          <div className="relative z-10 h-full">
            {/* Left: editorial content — fades out immediately when the
                navigator opens. */}
            <motion.div
              initial={false}
              animate={{
                opacity: entered && !navigatorOpen ? 1 : 0,
                x: navigatorOpen ? -32 : 0,
              }}
              transition={{ duration: navigatorOpen ? 0.25 : 0.7, ease: HERO_EASE }}
              className={cn(
                "absolute inset-y-0 left-0 flex w-[min(44%,36rem)] items-center py-24 pl-12 pr-8 xl:pl-16",
                navigatorOpen && "pointer-events-none",
              )}
            >
              <div className="relative w-full">
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  {entered ? (
                    <HeroSlidePanel
                      key={active.slug}
                      slide={active}
                      index={activeIndex}
                      total={count}
                      direction={direction}
                      onOpen={handleOpen}
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: persistent vertical media stream — re-centers and
                flattens when the quick navigator is open. */}
            <motion.div
              initial={false}
              animate={{ opacity: entered ? 1 : 0 }}
              transition={{ duration: 1.1, ease: HERO_EASE, delay: 0.15 }}
              className={cn(
                "absolute inset-0 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                navigatorOpen ? "translate-x-0" : "translate-x-[22vw]",
              )}
            >
              <HeroMediaStage
                slides={slides}
                activeIndex={activeIndex}
                scrubIndex={navigatorOpen ? navigatorHover : null}
                flattened={navigatorOpen}
                idle={idleEnabled}
                onOpen={handleCardClick}
              />
            </motion.div>
          </div>

          <QuickNavigator
            items={navigatorItems}
            activeIndex={activeIndex}
            open={navigatorOpen}
            hoverIndex={navigatorHover}
            onOpenChange={setNavigatorOpen}
            onHoverChange={setNavigatorHover}
            onSelect={selectSlide}
          />
        </section>

        {/* Mobile / tablet stacked layout */}
        <MobileHeroSlides slides={slides} />

        {/* Card-to-case-study FLIP overlay (desktop only). */}
        <AnimatePresence>
          {opened && openedSlide ? (
            <CaseStudyOverlay
              key={opened.slug}
              slide={openedSlide}
              project={openedProject}
              onClose={handleClose}
            />
          ) : null}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}
