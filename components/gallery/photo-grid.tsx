import Image from "next/image";
import type { Photo } from "@/content/site";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure
          key={photo.src}
          className="overflow-hidden rounded-2xl border border-border"
        >
          <div className="relative aspect-[4/3] w-full bg-border/30">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
            />
          </div>
          {photo.caption ? (
            <figcaption className="px-4 py-3 text-sm text-muted">
              {photo.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
