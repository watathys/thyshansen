import type { Metadata } from "next";
import { site } from "@/content/site";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: `About, education, and quick facts for ${site.name}.`,
};

export default function AboutPage() {
  return <About showBackLink />;
}
