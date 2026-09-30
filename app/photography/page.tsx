import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PhotoGrid } from "@/components/gallery/photo-grid";

export const metadata: Metadata = {
  title: "Photography",
  description: `Visual storytelling and photography gallery by ${site.name}.`,
};

export default function PhotographyPage() {
  const hasPhotos = site.photos.length > 0;

  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ← Back to Home
        </Link>

        {/* Page Heading */}
        <div className="mt-8">
          <SectionHeading
            eyebrow="Photography"
            title="Visual Stories & Moments"
            description="A collection of street, architecture, travel, and product photography."
          />
        </div>

        {/* Full Gallery Grid */}
        {hasPhotos ? (
          <div className="mt-10">
            <PhotoGrid photos={site.photos} />
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-border bg-card-bg p-8 text-center text-muted">
            <p className="text-base font-medium text-foreground">
              No photos added yet
            </p>
            <p className="mt-2 text-sm">
              Add photo entries to <code>site.photos</code> in{" "}
              <code>content/site.ts</code> and upload images to{" "}
              <code>/public/photography</code>.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
