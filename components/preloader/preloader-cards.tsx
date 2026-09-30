"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { imageFitClass, initials } from "@/lib/media";
import type { HeroSlideData } from "@/components/projects/hero-slide";

export type PreloaderCardData = Pick<
  HeroSlideData,
  "slug" | "title" | "image" | "imageFit" | "hasImage"
>;

/**
 * Right column of the intro: a vertical stack of media previews. Each card
 * starts under a pulsing dark skeleton that the timeline fades out
 * (`data-pl="skeleton"`) to resolve into the real image. Hidden below `md`,
 * where the outlined name gets the full screen instead.
 */
export function PreloaderCards({ cards }: { cards: PreloaderCardData[] }) {
  if (cards.length === 0) return null;

  return (
    <ul className="hidden h-full flex-col items-center justify-center gap-[2.5dvh] pr-8 md:flex lg:pr-16">
      {cards.map((card, i) => (
        <li
          key={card.slug}
          className={i % 2 === 0 ? "-translate-x-6" : "translate-x-6"}
        >
          <motion.div
            data-pl="card"
            initial={{ opacity: 0, y: 56 }}
            className="relative aspect-[4/3] h-[24dvh] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/40"
          >
            {card.hasImage && card.image ? (
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 22dvh, 20dvh"
                className={imageFitClass(card.imageFit)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-zinc-600">
                {initials(card.title)}
              </div>
            )}

            <motion.div
              data-pl="skeleton"
              className="absolute inset-0 bg-zinc-900"
            >
              <div className="h-full w-full animate-pulse bg-zinc-800" />
            </motion.div>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
