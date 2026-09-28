import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PhotoGrid } from "@/components/gallery/photo-grid";
import { VideoCard } from "@/components/videos/video-card";

export function Creative() {
  const hasPhotos = site.photos.length > 0;
  const hasVideos = site.videos.length > 0;

  return (
    <section id="creative" className="border-t border-border py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Creative"
            title="Photography & Demos"
            description="Visual storytelling, travel photography, and video walkthroughs."
          />
          {hasPhotos ? (
            <Link
              href="/photography"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View all photography ({site.photos.length}) →
            </Link>
          ) : null}
        </div>

        {!hasPhotos && !hasVideos ? (
          <p className="mt-8 text-sm text-muted">
            Photos, demos, and creative media will appear here once added to{" "}
            <code>content/site.ts</code>.
          </p>
        ) : null}

        {/* 6-Photo Preview */}
        {hasPhotos ? (
          <div className="mt-10">
            <PhotoGrid photos={site.photos} limit={6} />
            <div className="mt-6 flex justify-center sm:hidden">
              <Link
                href="/photography"
                className="text-sm font-semibold text-accent transition-colors hover:underline"
              >
                View full photography gallery →
              </Link>
            </div>
          </div>
        ) : null}

        {/* Videos Section */}
        {hasVideos ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {site.videos.map((video) => (
              <VideoCard key={video.youtubeId} video={video} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
