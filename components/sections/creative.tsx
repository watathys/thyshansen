import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PhotoGrid } from "@/components/gallery/photo-grid";
import { VideoCard } from "@/components/videos/video-card";

export function Creative() {
  const hasPhotos = site.photos.length > 0;
  const hasVideos = site.videos.length > 0;
  const { videography } = site;

  return (
    <section id="creative" className="border-t border-border py-20 sm:py-24">
      <Container className="space-y-16">
        {/* Photography Section Header */}
        <div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Creative"
              title="Photography"
              description="Visual storytelling, travel, architecture, and product photography."
            />
            {hasPhotos ? (
              <Link
                href="/photography"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                View full photo gallery ({site.photos.length}) →
              </Link>
            ) : null}
          </div>

          {/* 6-Photo Preview */}
          {hasPhotos ? (
            <div className="mt-8">
              <PhotoGrid photos={site.photos} limit={6} />
            </div>
          ) : null}
        </div>

        {/* Videography & Production Section Header */}
        <div className="border-t border-border/60 pt-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionHeading
                eyebrow="Production"
                title="Videography & Motion"
                description="End-to-end video production, social growth, and editorial highlights."
              />

              {/* Tools & Wheatley Summary Bar */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-foreground">Tools:</span>
                {videography.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-border bg-card-bg px-2 py-0.5 text-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/videography"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View all videography & TikToks →
            </Link>
          </div>

          {/* Video Preview Cards */}
          {hasVideos ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {site.videos.slice(0, 2).map((video) => (
                <VideoCard key={video.youtubeId} video={video} />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
