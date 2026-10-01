import Image from "next/image";
import type { CaseStudyMedia } from "@/content/site";
import {
  aspectRatioValue,
  isAnimatedImage,
  isVideoSource,
  type MediaStatus,
} from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Caps how tall a media frame can get so a portrait screenshot doesn't stretch
 * to the full page width; landscape frames never reach this in practice.
 */
const MAX_FRAME_HEIGHT = "78vh";

/** Outer widths for the demo frame, keyed by `CaseStudyMedia.size`. */
const FRAME_WIDTH = {
  full: "max-w-6xl",
  compact: "max-w-3xl",
} as const;

/**
 * `sizes` hints for `<Image>`, keyed by `CaseStudyMedia.size` — roughly the
 * frame's inner width at its widest, so the browser picks a sharp asset
 * without over-downloading.
 */
const FRAME_SIZES = {
  full: "(min-width: 1152px) 1152px, 100vw",
  compact: "(min-width: 768px) 704px, 100vw",
} as const;

/**
 * The full-width demo under a case-study section. Renders a screen recording
 * (`<video>`), an animated GIF, or a still screenshot (both as `<Image>`) —
 * whichever `media.src` points at.
 *
 * Until a real file exists in /public it shows a clearly-marked placeholder
 * frame — set `media.src` in `content/site.ts` and the server-resolved
 * `status` flag flips it over with no other change.
 */
export function CaseStudyMediaFrame({
  media,
  status,
  accent,
  accentText,
}: {
  media: CaseStudyMedia;
  /** Server-resolved availability of the media file and its poster. */
  status: MediaStatus;
  /** The brand accent, for the decorative placeholder outline. */
  accent: string;
  /** AA-safe accent for the placeholder label. */
  accentText: string;
}) {
  const { hasMedia, hasPoster } = status;
  const isVideo = isVideoSource(media.src);
  const isAnimated = isAnimatedImage(media.src);
  const ratio = aspectRatioValue(media.aspectRatio);
  const size = media.size ?? "full";

  return (
    <figure
      className={cn(
        "mx-auto mt-12 w-full px-4 sm:mt-16 sm:px-8",
        FRAME_WIDTH[size],
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full overflow-hidden rounded-2xl bg-zinc-100",
          hasMedia && "border border-zinc-200",
        )}
        style={{
          aspectRatio: media.aspectRatio,
          maxWidth: ratio ? `calc(${MAX_FRAME_HEIGHT} * ${ratio})` : undefined,
        }}
      >
        {hasMedia && media.src ? (
          isVideo ? (
            <video
              src={media.src}
              poster={hasPoster ? media.poster : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={media.caption}
              className="h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={media.src}
              alt={media.caption}
              fill
              unoptimized={isAnimated}
              sizes={FRAME_SIZES[size]}
              className="object-contain"
            />
          )
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-white/60 p-6 text-center"
            style={{ borderColor: accent }}
          >
            <span
              className="text-eyebrow text-[10px] font-bold tracking-[0.25em]"
              style={{ color: accentText }}
            >
              {media.placeholderLabel}
            </span>
            <p className="max-w-md text-sm leading-relaxed text-zinc-500">
              {media.placeholderNote}
            </p>
          </div>
        )}
      </div>
    </figure>
  );
}
