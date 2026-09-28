import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PhotoGrid } from "@/components/gallery/photo-grid";
import { VideoCard } from "@/components/videos/video-card";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos and videos from ${site.name}.`,
};

export default function GalleryPage() {
  const isEmpty = site.photos.length === 0 && site.videos.length === 0;

  return (
    <div className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Gallery" title="Photos & videos" />

        {isEmpty ? (
          <p className="mt-10 text-sm text-muted">
            Nothing here yet — add entries to the <code>photos</code> and{" "}
            <code>videos</code> arrays in <code>content/site.ts</code> and
            they&apos;ll show up here automatically.
          </p>
        ) : null}

        {site.photos.length > 0 ? (
          <div className="mt-10">
            <PhotoGrid photos={site.photos} />
          </div>
        ) : null}

        {site.videos.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {site.videos.map((video) => (
              <VideoCard key={video.youtubeId} video={video} />
            ))}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
