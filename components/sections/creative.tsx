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
        <SectionHeading
          eyebrow="Creative"
          title="Photos & demos"
          description="Visual highlights, project walkthroughs, and creative media."
        />

        {!hasPhotos && !hasVideos ? (
          <p className="mt-8 text-sm text-muted">
            Photos, demos, and creative media will appear here once added to <code>content/site.ts</code>.
          </p>
        ) : null}

        {hasPhotos ? (
          <div className="mt-10">
            <PhotoGrid photos={site.photos} />
          </div>
        ) : null}

        {hasVideos ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {site.videos.map((video) => (
              <VideoCard key={video.youtubeId} video={video} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
