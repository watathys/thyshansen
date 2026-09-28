import type { Video } from "@/content/site";

export function VideoCard({ video }: { video: Video }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border">
      <div className="relative aspect-video w-full bg-border/30">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="px-4 py-3">
        <p className="text-sm font-medium text-foreground">{video.title}</p>
        {video.description ? (
          <p className="mt-1 text-sm text-muted">{video.description}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}
