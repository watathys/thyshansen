import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { PhotoGrid } from "@/components/gallery/photo-grid";
import { VideoCard } from "@/components/videos/video-card";
import type { HeroSlideData } from "@/components/projects/hero-slide";

/**
 * Editorial body rendered below the shared-element hero when opening the
 * "Creatives" card overlay on desktop: photography grid with interactive
 * lightbox and featured video productions.
 */
export function CreativesOverlayBody({ slide }: { slide: HeroSlideData }) {
  const hasPhotos = site.photos.length > 0;
  const hasVideos = site.videos.length > 0;

  return (
    <div className="bg-background text-foreground">
      <Container className="py-20 sm:py-28 space-y-16">
        <div>
          <p
            className="text-eyebrow text-xs font-bold tracking-[0.2em]"
            style={{ color: slide.accent }}
          >
            {slide.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Visual Stories & Media
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {slide.description}
          </p>
        </div>

        {hasPhotos ? (
          <div>
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Photography
              </h3>
              <span className="text-xs font-semibold text-muted">
                {site.photos.length} Photos
              </span>
            </div>
            <div className="mt-8">
              <PhotoGrid photos={site.photos} />
            </div>
          </div>
        ) : null}

        {hasVideos ? (
          <div className="space-y-6">
            <div className="border-b border-border pb-4">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Featured Video Productions
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {site.videos.map((video) => (
                <VideoCard key={video.youtubeId} video={video} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
