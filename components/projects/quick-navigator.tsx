"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Desktop quick-navigator pinned to the far right edge of the hero.
 *
 * At rest it is a quiet vertical pagination rail: the current index and one
 * dot per slide. The title labels are hidden until the rail is hovered, at
 * which point the rail expands into the full title list, the main stage
 * (owned by the hero) dims to near-black, re-centers and flattens while the
 * list scrubs the center card to whichever title is hovered. Clicking a
 * title (or dot) snaps to that slide and collapses the drawer.
 *
 * Colors invert with state: at rest the rail sits on the slide's light
 * pastel background, so it renders dark; when the drawer opens the stage
 * dims to near-black, so it flips to light.
 *
 * Strictly desktop: gated behind `(hover: hover) and (pointer: fine)` so
 * touch/mobile users keep plain swipe navigation and never see the drawer.
 */

export interface NavigatorItem {
  label: string;
  accent: string;
  /** Index of this item within the hero's full slide list. */
  slideIndex: number;
}

const RAIL_W = 64;
const DRAWER_W = 320;
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function QuickNavigator({
  items,
  activeIndex,
  open,
  hoverIndex,
  onOpenChange,
  onHoverChange,
  onSelect,
}: {
  items: NavigatorItem[];
  activeIndex: number;
  open: boolean;
  hoverIndex: number | null;
  onOpenChange: (open: boolean) => void;
  onHoverChange: (index: number | null) => void;
  onSelect: (index: number) => void;
}) {
  const hoverFine = useMediaQuery("(hover: hover) and (pointer: fine)");

  if (!hoverFine || items.length <= 1) return null;

  const total = items.length;

  return (
    <motion.div
      initial={false}
      animate={{ width: open ? DRAWER_W : RAIL_W }}
      transition={{ duration: 0.45, ease: EASE }}
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => {
        onOpenChange(false);
        onHoverChange(null);
      }}
      className="absolute inset-y-0 right-0 z-30 hidden overflow-hidden lg:flex"
    >
      <div className="flex h-full w-full flex-col items-end justify-center pr-4">
        {/* Current / total index, stacked vertically to fit the narrow rail. */}
        <div className="text-eyebrow mb-4 flex flex-col items-center gap-2 text-[10px] leading-none">
          <motion.span
            key={`index-${activeIndex}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={cn(
              "transition-colors duration-300",
              open ? "text-zinc-200" : "text-zinc-800",
            )}
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
          <span
            className={cn(
              "h-px w-4 transition-colors duration-300",
              open ? "bg-zinc-600" : "bg-zinc-400",
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "transition-colors duration-300",
              open ? "text-zinc-400" : "text-zinc-500",
            )}
          >
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* One dot per slide — always visible. Labels stay hidden (faded +
            clipped by the narrow rail) until the drawer expands. */}
        <nav aria-label="Slides" className="flex flex-col items-end gap-2">
          {items.map((item) => {
            const active = item.slideIndex === activeIndex;
            const hovered = item.slideIndex === hoverIndex;
            return (
              <button
                key={item.slideIndex}
                type="button"
                onMouseEnter={() => onHoverChange(item.slideIndex)}
                onClick={() => onSelect(item.slideIndex)}
                aria-label={`Go to ${item.label}`}
                aria-current={active ? "true" : undefined}
                className="group flex items-center gap-3 py-0.5 focus-visible:outline-none"
              >
                {/* Label: hidden until the drawer opens. */}
                <motion.span
                  initial={false}
                  animate={{
                    opacity: open ? 1 : 0,
                    color:
                      hovered && open
                        ? "#ffffff"
                        : active
                          ? "#f5f5f7"
                          : "#9ca3af",
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-eyebrow text-xl font-bold leading-none tracking-tight"
                >
                  {item.label.toUpperCase()}
                </motion.span>

                {/* Dot matched to the slide's accent when active, neutral
                    gray otherwise — visible on both light and dark stages. */}
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={{
                    backgroundColor: active ? item.accent : "#a1a1aa",
                    opacity: active ? 1 : 0.5,
                    scale: active ? 1.2 : hovered && open ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="h-2 w-2 shrink-0 rounded-full"
                />
              </button>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}
