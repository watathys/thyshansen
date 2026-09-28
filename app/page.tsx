import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Gallery } from "@/components/sections/gallery";
import { Videos } from "@/components/sections/videos";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects limit={4} showViewAll />
      <Gallery />
      <Videos />
      <Contact />
    </>
  );
}
