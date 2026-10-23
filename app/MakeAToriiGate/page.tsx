import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { ToriiStep, type ToriiStepData } from "@/components/torii/torii-step";
import { ToriiMark } from "@/components/torii/torii-mark";

// Unlisted page: intentionally not linked from anywhere on the site and
// excluded from the sitemap (see app/sitemap.ts) and search indexing below.
// The only way in is knowing this exact URL.
export const metadata: Metadata = {
  title: "How to Make a Torii Gate on Your Monitor",
  description:
    "A step-by-step paper-craft guide to building a torii gate frame for your monitor.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const materials = [
  "Half a sheet of red paper",
  "Half a sheet of black paper",
  "A square of brown paper",
  "Tape",
  "Scissors",
];

// Native pixel dimensions of each photo (see public/make-a-torii-gate/) so
// next/image can render them at their real aspect ratio instead of cropping
// them to fit a fixed box.
const steps: ToriiStepData[] = [
  { number: 1, image: "step-1.jpg", width: 1600, height: 2133, text: "Take the red paper." },
  {
    number: 2,
    image: "step-2.jpg",
    width: 1600,
    height: 2133,
    text: "Fold it into eighths — you'll only need 4 of the sections.",
  },
  { number: 3, image: "step-3.jpg", width: 1600, height: 2133, text: "Cut them out." },
  {
    number: 4,
    image: "step-4.jpg",
    width: 1600,
    height: 2133,
    text: "Take the black paper (half a sheet is enough).",
  },
  {
    number: 5,
    image: "step-5.jpg",
    width: 1600,
    height: 2133,
    text: "Fold it into eighths — again, you'll only need 4.",
  },
  { number: 6, image: "step-6.jpg", width: 1600, height: 2133, text: "Cut them out." },
  { number: 7, image: "step-7.jpg", width: 1600, height: 1200, text: "Take your monitor." },
  {
    number: 8,
    image: "step-8.jpg",
    width: 1600,
    height: 1200,
    text: "Place two red strips along the right and left edges of the monitor.",
  },
  {
    number: 9,
    image: "step-10.jpg",
    width: 1600,
    height: 2133,
    text: "Now build the arch that spans the monitor: cut ridges into two of the red strips.",
  },
  {
    number: 10,
    image: "step-11.jpg",
    width: 1600,
    height: 2133,
    text: "Two red strips won't quite span the width of your monitor, so add a third red strip to bridge the gap.",
  },
  {
    number: 11,
    image: "step-12.jpg",
    width: 1600,
    height: 2133,
    text: "Tape all three red pieces together.",
  },
  {
    number: 12,
    image: "step-13.jpg",
    width: 1600,
    height: 2133,
    text: "Now the black pieces that sit over the red across the monitor: cut ridges into two black strips, making them slightly steeper than the red ones.",
  },
  {
    number: 13,
    image: "step-14.jpg",
    width: 1600,
    height: 2133,
    text: "Place the black pieces underneath the red pieces.",
  },
  { number: 14, image: "step-15.jpg", width: 1600, height: 2133, text: "Tape the black piece on." },
  {
    number: 15,
    image: "step-16.jpg",
    width: 1600,
    height: 2133,
    text: "Do the same on the other side.",
  },
  {
    number: 16,
    image: "step-17.jpg",
    width: 1600,
    height: 2133,
    text: "Tape another black strip across the gap between the two black pieces.",
  },
  {
    number: 17,
    image: "step-18.jpg",
    width: 1600,
    height: 1200,
    text: "Tape the whole arch piece onto the monitor.",
  },
  {
    number: 18,
    image: "step-19.jpg",
    width: 1600,
    height: 2133,
    text: "Take a red strip and cut two notches that will sit underneath the long arch piece.",
  },
  { number: 19, image: "step-20.jpg", width: 1600, height: 2133, text: "Tape them up." },
  {
    number: 20,
    image: "step-21.jpg",
    width: 1600,
    height: 1200,
    text: "Stick them on underneath the long arch.",
  },
  {
    number: 21,
    image: "step-22.jpg",
    width: 1600,
    height: 1200,
    text: "Take a black strip and cut two blocks for the base of the arch — make them slightly wider than the red strips are tall.",
  },
  {
    number: 22,
    image: "step-23.jpg",
    width: 1600,
    height: 1200,
    text: "Tape on the black base pieces.",
  },
  {
    number: 23,
    image: "step-24.jpg",
    width: 1600,
    height: 2133,
    text: "Take the brown rectangle and write anything you'd like on it.",
  },
  {
    number: 24,
    image: "step-25.jpg",
    width: 1600,
    height: 1200,
    text: "Stick it to the middle of the arch. Done! **BONUS STEP** Make sure you cut out a slot for your webcam!!",
  },
];

export default function MakeAToriiGatePage() {
  return (
    <div className="relative overflow-hidden bg-[#faf6ee] py-20 sm:py-28">
      {/* Faint red "rising sun" glow behind the title — purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#b7282e]/10 blur-3xl"
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <ToriiMark />
          <p className="mt-4 text-sm font-medium tracking-[0.3em] text-[#b7282e]">
            鳥居の作り方
          </p>
          <h1 className="mt-3 text-3xl tracking-tight text-[#1a1310] sm:text-5xl">
            How to Make a Torii Gate
            <br className="sm:hidden" /> on Your Monitor
          </h1>
          <div className="mt-5 h-[3px] w-24 bg-[#b7282e]" />
          <div className="mt-1.5 h-px w-16 bg-[#1a1310]" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#6b5c52]">
            A paper-craft guide — all in red, black, and brown paper. Here&apos;s
            the finished product, then the full build, step by step.
          </p>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-sm border-[3px] border-[#1a1310] shadow-md">
          <div className="pointer-events-none absolute inset-2 z-10 border border-[#b7282e]/70" />
          <Image
            src="/make-a-torii-gate/step-25.jpg"
            alt="Finished torii gate made of red, black, and brown paper, mounted on top of a monitor"
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 1024px) 100vw, 768px"
            className="h-auto w-full"
          />
        </div>
        <p className="mt-3 text-center text-sm text-[#6b5c52]">
          The finished product.
        </p>

        <div className="mx-auto mt-16 max-w-xl rounded-sm border-2 border-[#1a1310] bg-white px-6 py-7 sm:px-8">
          <h2 className="text-eyebrow text-sm font-bold tracking-[0.2em] text-[#b7282e]">
            Materials needed
          </h2>
          <ul className="mt-4 space-y-2.5 text-base text-[#2a1f1a]">
            {materials.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-[#b7282e]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          <ol className="space-y-14">
            {steps.map((step) => (
              <ToriiStep key={step.number} step={step} />
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-3 text-center">
          <ToriiMark className="scale-75" />
          <p className="text-lg font-semibold text-[#b7282e]">完成</p>
          <p className="text-sm text-[#6b5c52]">Done!</p>
        </div>
      </Container>
    </div>
  );
}
