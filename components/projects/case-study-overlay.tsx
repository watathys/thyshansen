"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site, type Project } from "@/content/site";
import { Container } from "@/components/layout/container";
import { HERO_EASE, type HeroSlideData } from "@/components/projects/hero-slide";
import { CaseStudyBody } from "@/components/case-study/case-study-body";
import { CaseStudyIntro } from "@/components/case-study/case-study-intro";
import { CaseStudySections } from "@/components/case-study/case-study-sections";
import { CaseStudyClosing } from "@/components/case-study/case-study-closing";
import { CreativesOverlayBody } from "@/components/projects/creatives-overlay-body";
import { ExperienceOverlayBody } from "@/components/projects/experience-overlay-body";
import { SideProjectsBody } from "@/components/projects/side-projects-body";
import { caseStudyTheme, nextCaseStudy } from "@/lib/projects";
import { imageFitClass, initials } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * The "Card-to-Case-Study" transition, rebuilt as a left-to-right wipe with
 * persistent shared elements:
 *
 *   1. A full-viewport curtain in the incoming project's accent color wipes
 *      across the screen left→right, covering the homepage UI beneath it.
 *   2. The project title and media card ride ABOVE the curtain as shared
 *      elements (`layoutId`), interpolating from their homepage positions
 *      into the case-study hero — title off-center left, media centered and
 *      flattened from the homepage's perspective tilt.
 *   3. Once the wipe lands, the top bar (← Back Home) and the case-study body
 *      are revealed; scrolling rolls the hero up into the body. Projects with
 *      a cinematic case study scroll into that long-form page on the project's
 *      own light palette; the rest keep the white editorial summary.
 *
 * The overlay owns the URL via `pushStateWithoutRouter` (see
 * `lib/history-state.ts`) and closes through the browser Back button /
 * popstate.
 */

/** Height of the sticky top bar (px) — matches the inline styles below. */
const TOP_BAR_H = 64;

/** The homepage media card's aspect ratio, so the hero keeps it true. */
const CARD_W = 340;
const CARD_H = 440;

const METADATA: Array<{ label: string; key: "role" | "client" | "date" }> = [
  { label: "Role", key: "role" },
  { label: "Client", key: "client" },
  { label: "Date", key: "date" },
];

export function CaseStudyOverlay({
  slide,
  project,
  onClose,
}: {
  slide: HeroSlideData;
  project?: Project;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [viewport, setViewport] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));
  // The wipe has landed — reveal the top bar, scroll pill, and body.
  const [wiped, setWiped] = useState(false);
  // The hero has been scrolled up — flip the top bar onto the body behind it.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock the page behind the overlay while it's open.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, []);

  // Escape closes (delegates to the same popstate-driven path) unless an
  // inner modal (e.g. Photo Lightbox) is open and handling Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.querySelector("[data-lightbox]")) return;
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Target size for the centered media hero (aspect-preserved from the card).
  const media = useMemo(() => {
    const maxW = Math.min(viewport.w * 0.5, 660);
    const maxH = (viewport.h - TOP_BAR_H) * 0.62;
    let w = maxW;
    let h = w * (CARD_H / CARD_W);
    if (h > maxH) {
      h = maxH;
      w = h * (CARD_W / CARD_H);
    }
    return { w, h };
  }, [viewport]);

  const heroH = viewport.h - TOP_BAR_H;

  // Projects with a cinematic case study render that long-form body below the
  // hero on their own light palette; everything else keeps the white editorial
  // summary or the dark background for Creatives / Work Experience.
  const study = slide.caseStudyMedia && project
    ? site.caseStudies.find((entry) => entry.slug === project.slug)
    : undefined;
  const cinematic = Boolean(study && slide.caseStudyMedia && project);
  const theme = project ? caseStudyTheme(project) : null;
  const isDarkBody = slide.slug === "creatives" || slide.slug === "work-experience";
  const bodyColor = cinematic && theme
    ? theme.background
    : isDarkBody
      ? "#3d5a70"
      : "#ffffff";
  const barText = scrolled
    ? isDarkBody
      ? "text-white"
      : "text-zinc-900"
    : "text-white";

  const scrollToBody = () => {
    containerRef.current?.scrollTo({
      top: TOP_BAR_H + heroH,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setScrolled(el.scrollTop > viewport.h * 0.5);
  };

  return (
    <motion.div
      ref={containerRef}
      onScroll={onScroll}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
    >
      {/* ── Layer 2 · Wipe curtain ───────────────────────────────────────────
          Incoming accent color, sliding left→right over the homepage UI
          (which sits below this `z-50` overlay). Shared elements above. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 h-[100svh] w-full"
        style={{
          backgroundColor: slide.accent,
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: HERO_EASE }}
        onAnimationComplete={() => setWiped(true)}
      />

      {/* ── Sticky top bar · revealed once the wipe lands ─────────────────── */}
      <div
        className="sticky top-0 z-40 isolate flex items-center justify-between px-6 sm:px-8"
        style={{ height: TOP_BAR_H }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, backgroundColor: slide.accent }}
          animate={{
            opacity: wiped ? 1 : 0,
            backgroundColor: scrolled ? bodyColor : slide.accent,
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="flex w-full items-center justify-between"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: wiped ? 1 : 0, y: wiped ? 0 : -8 }}
          transition={{ duration: 0.5, ease: HERO_EASE }}
        >
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "text-eyebrow rounded-md text-sm font-bold transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              barText,
            )}
          >
            ← Back Home
          </button>

          <nav aria-label="Main navigation" className="flex items-center gap-6">
            {site.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-eyebrow rounded-md px-1 py-0.5 text-xs font-semibold transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  barText,
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* ── Layer 3 · Hero (shared title + media above the curtain) ──────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: `calc(100svh - ${TOP_BAR_H}px)` }}
      >
        {/* Eyebrow (project tags) — pinned high, clear of the title. */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: HERO_EASE, delay: 0.55 }}
          className="text-eyebrow absolute left-8 top-[8%] z-20 max-w-[34vw] text-left text-xs font-semibold tracking-[0.2em] text-white/80 sm:left-12 lg:left-16"
        >
          {project ? project.tags.join(" · ") : slide.eyebrow}
        </motion.p>

        {/* Project title — shared element, off-center left. */}
        <div className="absolute inset-y-0 left-8 z-20 flex items-center sm:left-12 lg:left-16">
          <motion.h2
            layoutId={`project-title-${slide.slug}`}
            transition={{ layout: { duration: 0.9, ease: HERO_EASE } }}
            className="max-w-[34vw] text-left font-serif text-[clamp(2.25rem,5vw,6rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.18)]"
          >
            {slide.title}
          </motion.h2>
        </div>

        {/* Media card — shared element, centered + flattened. */}
        <motion.div
          layoutId={`project-media-${slide.slug}`}
          transition={{ layout: { duration: 0.9, ease: HERO_EASE } }}
          className="absolute z-20 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-2xl shadow-black/30"
          style={{
            top: (heroH - media.h) / 2,
            left: (viewport.w - media.w) / 2,
            width: media.w,
            height: media.h,
          }}
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
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 660px, 80vw"
              className={imageFitClass(slide.imageFit)}
              priority
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-100 p-8 text-center">
              <span className="text-5xl font-bold text-zinc-400">
                {initials(slide.title)}
              </span>
              <span className="text-eyebrow text-[10px] text-zinc-500">
                {slide.eyebrow}
              </span>
            </div>
          )}
        </motion.div>

        {/* Downward scroll pill / indicator. */}
        <motion.button
          type="button"
          onClick={scrollToBody}
          initial={false}
          animate={{ opacity: wiped && !scrolled ? 1 : 0, y: wiped ? 0 : 16 }}
          transition={{ duration: 0.5, ease: HERO_EASE }}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white"
          aria-label={`Scroll to ${slide.title}`}
        >
          <span className="text-eyebrow text-[10px] font-semibold tracking-[0.2em]">
            Scroll
          </span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/70 p-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="block h-2 w-1 rounded-full bg-white"
            />
          </span>
        </motion.button>
      </section>

      {/* ── Case study body · revealed after the wipe ──────────────────────
          Projects with a cinematic case study scroll into that long-form page
          on the project's own light palette; the rest keep the white
          editorial summary. Creatives and Work Experience render their
          dedicated media and career timeline sections. */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: wiped ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {slide.slug === "side-projects" && theme ? (
            <SideProjectsBody theme={theme} showHeader={false} />
          ) : study && slide.caseStudyMedia && project && theme ? (
            <CaseStudyBody theme={theme} className="pb-20 sm:pb-28">
              <div className="pt-20 sm:pt-28">
                <CaseStudyIntro
                  study={study}
                  accentText={theme.accentText}
                  liveUrl={project.url}
                />
              </div>

              <CaseStudySections
                sections={study.sections}
                media={slide.caseStudyMedia}
                accent={theme.accent}
                accentText={theme.accentText}
              />

              <div className="mt-12 sm:mt-16">
                <CaseStudyClosing
                  closing={study.closing}
                  accentText={theme.accentText}
                  next={nextCaseStudy(project)}
                />
              </div>
            </CaseStudyBody>
          ) : slide.slug === "creatives" ? (
            <CreativesOverlayBody slide={slide} />
          ) : slide.slug === "work-experience" ? (
            <ExperienceOverlayBody slide={slide} />
          ) : project ? (
            <div className="bg-white text-zinc-900">
              <Container className="py-20 sm:py-28">
                <p
                  className="text-eyebrow text-xs font-bold tracking-[0.2em]"
                  style={{ color: slide.accent }}
                >
                  Case Study
                </p>
                <h1 className="mt-5 max-w-[20ch] font-serif text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-tight tracking-tight">
                  {project.oneLiner}
                </h1>

                <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-16">
                  {/* Narrative (left). */}
                  <p className="text-lg leading-relaxed text-zinc-600">
                    {project.description}
                  </p>

                  {/* Metadata (right). */}
                  <dl className="space-y-7 border-t border-zinc-200 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    {METADATA.map(({ label, key }) => (
                      <div key={key}>
                        <dt className="text-eyebrow text-xs font-bold tracking-[0.2em] text-zinc-400">
                          {label}
                        </dt>
                        <dd className="mt-1.5 text-sm font-medium leading-relaxed text-zinc-800">
                          {project[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Container>
            </div>
          ) : null}
        </motion.div>
      </section>
    </motion.div>
  );
}
