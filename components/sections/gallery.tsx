import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PhotoGrid } from "@/components/gallery/photo-grid";

export function Gallery() {
  if (site.photos.length === 0) return null;

  return (
    <section id="gallery" className="border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Gallery" title="Photos" />
        <div className="mt-10">
          <PhotoGrid photos={site.photos} />
        </div>
      </Container>
    </section>
  );
}
