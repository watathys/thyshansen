"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/content/site";
import { Lightbox } from "@/components/gallery/lightbox";

interface PhotoGridProps {
  photos: Photo[];
  limit?: number;
}

function PhotoTile({
  photo,
  onClick,
}: {
  photo: Photo;
  onClick: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card-bg transition-all duration-300 hover:border-accent/50 hover:shadow-md break-inside-avoid"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View photo: ${photo.alt}`}
    >
      <div className="relative w-full overflow-hidden">
        {!hasError ? (
          <div className="relative aspect-[4/3] w-full group-hover:scale-105 transition-transform duration-300">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              onError={() => setHasError(true)}
            />
          </div>
        ) : (
          /* Stylized Photo Placeholder Tile when real image file is not uploaded yet */
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-gradient-to-br from-card-bg via-border/30 to-border/60 p-6 text-center transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="mt-3 text-sm font-semibold text-foreground">
              {photo.alt}
            </span>
            <span className="mt-1 text-xs text-muted">
              Click to expand in lightbox
            </span>
          </div>
        )}

        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
      </div>

      {/* Caption Bar */}
      {photo.caption ? (
        <div className="p-3.5">
          <p className="text-xs text-muted">{photo.caption}</p>
        </div>
      ) : null}
    </div>
  );
}

export function PhotoGrid({ photos, limit }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayPhotos = limit ? photos.slice(0, limit) : photos;

  if (displayPhotos.length === 0) return null;

  return (
    <>
      {/* Responsive Masonry Grid using CSS columns */}
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {displayPhotos.map((photo, index) => (
          <PhotoTile
            key={`${photo.src}-${index}`}
            photo={photo}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        photos={displayPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </>
  );
}
