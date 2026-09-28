import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoCard } from "@/components/videos/video-card";

export function Videos() {
  if (site.videos.length === 0) return null;

  return (
    <section id="videos" className="border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Videos" title="Demos & talks" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {site.videos.map((video) => (
            <VideoCard key={video.youtubeId} video={video} />
          ))}
        </div>
      </Container>
    </section>
  );
}
