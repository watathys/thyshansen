"use client";

import { useState } from "react";
import Image from "next/image";
import type { TikTokVideo } from "@/content/site";

export function TikTokCard({ video }: { TikTokVideo: TikTokVideo } & { video: TikTokVideo }) {
  const [isPlayingShort, setIsPlayingShort] = useState(false);

  if (video.isYouTubeShort && video.youtubeId) {
    return (
      <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card-bg">
        <div className="relative aspect-[9/16] max-h-[420px] w-full bg-zinc-900 mx-auto">
          {!isPlayingShort ? (
            <button
              type="button"
              onClick={() => setIsPlayingShort(true)}
              aria-label={`Play Short: ${video.title}`}
              className="group/btn relative flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-cover transition-transform duration-300 group-hover/btn:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover/btn:bg-black/50" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-accent/90 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover/btn:scale-110">
                <svg
                  className="ml-1 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-0.5 text-xs font-semibold text-white">
                YouTube Short
              </span>
            </button>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          )}
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold text-foreground">{video.title}</p>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:underline"
          >
            Watch Short ↗
          </a>
        </div>
      </div>
    );
  }

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between rounded-2xl border border-border bg-card-bg p-5 transition-all duration-200 hover:border-accent/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
            <svg
              className="h-4 w-4 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.82V7.5a6.34 6.34 0 0 0-5.83 6.3 6.34 6.34 0 0 0 10.86 4.43V11.8a8.28 8.28 0 0 0 5.08 1.73V10.1a4.85 4.85 0 0 1-3.77-3.41z" />
            </svg>
            TikTok Video
          </span>
          <span className="text-xs font-semibold text-accent transition-transform duration-200 group-hover:translate-x-0.5">
            ↗
          </span>
        </div>
        <h4 className="mt-3 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
          {video.title}
        </h4>
        <p className="mt-1 text-xs text-muted">Shot & edited by Thys Hansen</p>
      </div>

      <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-accent">
        Watch on TikTok
      </div>
    </a>
  );
}
