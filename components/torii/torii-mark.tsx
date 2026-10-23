/**
 * A small decorative torii silhouette built from plain `div`s (no SVG/image
 * asset needed) — two posts, a black lintel, and a red beam underneath it.
 * Purely ornamental, used to bookend the guide's title.
 */
export function ToriiMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-14 w-20 shrink-0 ${className ?? ""}`}
    >
      <div className="absolute inset-x-1 top-0 h-2 rounded-[1px] bg-[#1a1310]" />
      <div className="absolute inset-x-2.5 top-3 h-1.5 rounded-[1px] bg-[#b7282e]" />
      <div className="absolute left-1 top-1.5 h-[calc(100%-6px)] w-2 bg-[#b7282e]" />
      <div className="absolute right-1 top-1.5 h-[calc(100%-6px)] w-2 bg-[#b7282e]" />
    </div>
  );
}
