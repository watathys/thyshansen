"use client";

import { useState } from "react";
import Image from "next/image";
import type { Video } from "@/content/site";

export function VideoCard({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  // Try maxresdefault first, fallback to hqdefault
  const thumbnailUrl = !thumbnailError
    ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <figure className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card-bg transition-colors hover:border-accent/40">
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {!isPlaying ? (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${video.title}`}
            className="group/btn relative flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {/* Thumbnail Image */}
            <Image
              src={thumbnailUrl}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover/btn:scale-105"
              onError={() => setThumbnailError(true)}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover/btn:bg-black/40" />

            {/* Play Button Icon */}
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:bg-accent">
              <svg
                className="ml-1 h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Play Badge */}
            <span className="absolute bottom-3 right-3 z-10 rounded-md bg-black/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Click to play
            </span>
          </button>
        ) : (
          /* Lazy Loaded Iframe on Click */
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>

      <figcaption className="flex flex-1 flex-col justify-between p-5">
        <div>
          {video.category ? (
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {video.category}
            </span>
          ) : null}
          <h3 className="mt-1 text-base font-semibold text-foreground">
            {video.title}
          </h3>
          {video.description ? (
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {video.description}
            </p>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}
