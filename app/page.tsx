import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Creative } from "@/components/sections/creative";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects limit={4} showViewAll />
      <Creative />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
