import type { Metadata } from "next";
import { site } from "@/content/site";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About — Background & Strategy",
  description: `Background, education, and strategic focus for ${site.name}.`,
};

export default function AboutPage() {
  return <About showBackLink />;
}
