import Image from "next/image";
import Link from "next/link";
import { imageFitClass, initials } from "@/lib/media";
import { HeroSlideLinks } from "@/components/projects/hero-slide-links";
import type { HeroSlideData } from "@/components/projects/hero-slide";

/**
 * Mobile / tablet fallback for the hero: a plain single-column vertical
 * stack of white slides, each using the slide's accent for the headline,
 * eyebrow, CTA, and a thin strip down the left edge. No 3D tilt, no
 * scroll-jacking — it flows with the page's native scroll below the `lg`
 * breakpoint.
 */
export function MobileHeroSlides({ slides }: { slides: HeroSlideData[] }) {
  return (
    <div className="lg:hidden">
      {slides.map((slide, index) => {
        const monogram = initials(slide.title);
        return (
          <section
            key={slide.slug}
            className="relative flex min-h-[100svh] flex-col justify-center px-8 py-20"
            style={{ backgroundColor: slide.background }}
          >
            <span
              className="absolute inset-y-0 left-0 w-1.5"
              style={{ backgroundColor: slide.accent }}
              aria-hidden="true"
            />

            <p
              className="text-eyebrow flex items-center gap-3 text-xs font-semibold"
              style={{ color: slide.accent }}
            >
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
              <span
                className="h-px w-8"
                style={{ backgroundColor: slide.accent, opacity: 0.5 }}
                aria-hidden="true"
              />
              <span>{slide.eyebrow}</span>
            </p>

            <h2
              className="mt-5 text-[clamp(2.5rem,13vw,4rem)] leading-[0.95] font-bold tracking-tight"
              style={{ color: slide.accent }}
            >
              {slide.title}
            </h2>

            <p className="mt-5 max-w-prose text-lg leading-relaxed text-zinc-700">
              {slide.description}
            </p>

            <div className="mt-6">
              {slide.links && slide.links.length > 0 ? (
                <HeroSlideLinks links={slide.links} accent={slide.accent} />
              ) : (
                <Link
                  href={slide.href}
                  className="text-eyebrow inline-flex w-fit items-center gap-3 rounded-full border px-6 py-3 text-xs font-bold"
                  style={{
                    color: slide.accent,
                    borderColor: `color-mix(in srgb, ${slide.accent} 45%, transparent)`,
                  }}
                >
                  {slide.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>

            <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm">
              {slide.hasImage && slide.image ? (
                <Image
                  src={slide.image}
                  alt={`${slide.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className={imageFitClass(slide.imageFit)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-zinc-400">
                  {monogram}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
