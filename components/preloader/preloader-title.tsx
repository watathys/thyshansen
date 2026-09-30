"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

/**
 * The intro's identity header: the name split into masked lines, each drawn
 * as hollow outlined type with a filled copy on top that is clip-revealed to
 * "illuminate" it. The timeline in `preloader.tsx` drives everything via the
 * `data-pl` hooks below — this file is purely presentational.
 *
 * Lines carry `data-pl-split="up" | "down"` so the wipe can pull them apart
 * in opposite directions.
 */
export function PreloaderTitle() {
  const lines = site.name.split(" ");

  return (
    <div className="font-serif text-[clamp(3.5rem,11vw,10rem)] leading-[0.92] font-bold tracking-tight">
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            data-pl="line"
            data-pl-split={i % 2 === 0 ? "up" : "down"}
            initial={{ y: "110%" }}
            className="relative block"
          >
            <span className="text-outline block">{line}</span>
            <motion.span
              data-pl="fill"
              aria-hidden="true"
              initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
              className="absolute inset-0 block text-foreground"
            >
              {line}
            </motion.span>
          </motion.span>
        </span>
      ))}

      <motion.p
        data-pl="meta"
        initial={{ opacity: 0, y: 16 }}
        className="text-eyebrow mt-6 font-sans text-xs leading-none font-semibold tracking-[0.2em] text-muted sm:text-sm"
      >
        {site.preloader.role}
      </motion.p>
    </div>
  );
}
