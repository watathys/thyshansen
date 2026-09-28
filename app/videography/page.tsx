import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoCard } from "@/components/videos/video-card";
import { TikTokCard } from "@/components/videos/tiktok-card";

export const metadata: Metadata = {
  title: "Videography & Video Production",
  description: `Video editing, motion graphics, and social content strategy by ${site.name}.`,
};

export default function VideographyPage() {
  const { videography, videos } = site;

  return (
    <div className="py-16 sm:py-24">
      <Container className="space-y-16">
        {/* Header & Back Link */}
        <div>
          <Link
            href="/#creative"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ← Back to Creative
          </Link>

          <div className="mt-8">
            <SectionHeading
              eyebrow="Videography"
              title="Video Production & Editing"
              description="From long-form research documentaries to rapid vertical social content — editing, color, pacing, and channel growth strategy."
            />
          </div>

          {/* Tools & Wheatley Growth Banner */}
          <div className="mt-8 grid gap-6 rounded-2xl border border-border bg-card-bg p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                Production Stack & Tools
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Expertise in industry-standard editing, motion design, and color workflows:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {videography.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-accent/20 bg-accent/5 p-5 md:min-w-[260px]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
                {videography.wheatleyImpact.title}
              </h4>
              <p className="mt-1 text-xs text-muted">
                {videography.wheatleyImpact.description}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-accent/20 pt-3">
                <div>
                  <div className="text-lg font-bold text-foreground">
                    +{videography.wheatleyImpact.subscribersGained}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted">
                    Subscribers
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    +{videography.wheatleyImpact.viewsGained}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted">
                    Organic Views
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured YouTube Productions */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Featured YouTube Productions
            </h2>
            <p className="mt-1 text-sm text-muted">
              Click any video to load and play directly.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {videos.map((video) => (
              <VideoCard key={video.youtubeId} video={video} />
            ))}
          </div>
        </section>

        {/* Kazzi Soda TikTok Subsection */}
        <section className="border-t border-border pt-16 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Social Video Campaign
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                Kazzi Soda TikToks
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {videography.kazziTikTok.note}
              </p>
            </div>

            <a
              href={videography.kazziTikTok.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Visit {videography.kazziTikTok.handle} on TikTok ↗
            </a>
          </div>

          {/* TikTok Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videography.kazziTikTok.videos.map((item) => (
              <TikTokCard key={item.url} video={item} TikTokVideo={item} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
