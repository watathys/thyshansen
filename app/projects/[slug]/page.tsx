import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { findCaseStudy } from "@/lib/projects";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import WorkDetailPage, {
  generateMetadata as generateWorkMetadata,
  generateStaticParams,
} from "@/app/work/[slug]/page";

export { generateStaticParams };

/**
 * `/projects/[slug]` serves whichever page fits the project: the long-form
 * cinematic case study when `site.caseStudies` has an entry for that slug,
 * otherwise the same generic detail page as `/work/[slug]`. Which projects get
 * the cinematic treatment is driven entirely by content — adding a case study
 * to `content/site.ts` is all it takes, no new route file.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = findCaseStudy(slug);
  if (!data) return generateWorkMetadata({ params });

  return {
    title: `${data.project.name} Case Study`,
    description: data.study.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (findCaseStudy(slug)) return <CaseStudyPage slug={slug} />;
  if (!site.projects.some((project) => project.slug === slug)) notFound();

  return <WorkDetailPage params={params} />;
}
