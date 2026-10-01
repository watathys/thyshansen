import { site } from "@/content/site";
import { publicFileExists, mediaStatus } from "@/lib/media-server";
import { caseStudyHref } from "@/lib/projects";
import { HeroSlider } from "@/components/sections/hero-slider";
import type { HeroSlideData } from "@/components/projects/hero-slide";

export default function Home() {
  // Resolve image availability on the server (fs access) so the client
  // hero slider never needs to import server-only media utilities.
  const introSlide: HeroSlideData = {
    slug: "intro",
    eyebrow: site.heroIntro.eyebrow,
    title: site.name,
    description: site.heroIntro.description,
    href: site.heroIntro.href,
    ctaLabel: site.heroIntro.ctaLabel,
    image: site.headshot,
    hasImage: publicFileExists(site.headshot),
    background: site.heroIntro.background,
    accent: site.heroIntro.accent,
  };

  const projectSlides: HeroSlideData[] = site.projects.map((project) => {
    const study = site.caseStudies.find(
      (entry) => entry.slug === project.slug,
    );

    return {
      slug: project.slug,
      eyebrow: project.tags[0] ?? "Project",
      title: project.name,
      description: project.oneLiner,
      href: caseStudyHref(project),
      ctaLabel: "Open Case Study",
      image: project.image,
      imageFit: project.imageFit,
      video: project.video,
      hasImage: publicFileExists(project.image),
      caseStudyMedia: study
        ? study.sections.map((section) => mediaStatus(section.media))
        : undefined,
      background: project.background,
      accent: project.accent,
    };
  });

  const firstPhoto = site.photos[0]?.src;
  const creativesSlide: HeroSlideData = {
    slug: "creatives",
    eyebrow: site.heroCreatives.eyebrow,
    title: "Creatives",
    description: site.heroCreatives.description,
    href: site.heroCreatives.href,
    ctaLabel: site.heroCreatives.ctaLabel,
    image: firstPhoto,
    hasImage: publicFileExists(firstPhoto),
    background: site.heroCreatives.background,
    accent: site.heroCreatives.accent,
  };

  const experienceSlide: HeroSlideData = {
    slug: "work-experience",
    eyebrow: site.heroExperience.eyebrow,
    title: "Work Experience",
    description: site.heroExperience.description,
    href: site.heroExperience.href,
    ctaLabel: site.heroExperience.ctaLabel,
    image: site.resumeImage,
    hasImage: publicFileExists(site.resumeImage),
    background: site.heroExperience.background,
    accent: site.heroExperience.accent,
  };

  const contactSlide: HeroSlideData = {
    slug: "contact",
    eyebrow: site.heroContact.eyebrow,
    title: "Let's talk product.",
    description: site.heroContact.description,
    href: site.heroContact.href,
    ctaLabel: site.heroContact.ctaLabel,
    links: site.heroContact.links,
    hasImage: false,
    background: site.heroContact.background,
    accent: site.heroContact.accent,
  };

  // Compose the presentation in the editorial order defined in `content/site.ts`
  // — info cards (Creatives, Work Experience, Contact) interleave with the
  // projects. Any slug without a matching slide is simply skipped.
  const slidesBySlug = new Map<string, HeroSlideData>(
    [
      introSlide,
      ...projectSlides,
      creativesSlide,
      experienceSlide,
      contactSlide,
    ].map((slide) => [slide.slug, slide]),
  );
  const slides: HeroSlideData[] = site.heroSlideOrder
    .map((slug) => slidesBySlug.get(slug))
    .filter((slide): slide is HeroSlideData => Boolean(slide));

  return <HeroSlider slides={slides} />;
}
