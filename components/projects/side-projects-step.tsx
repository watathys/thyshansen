import Image from "next/image";
import type {
  SideProjectParagraphContent,
  SideProjectStep as SideProjectStepData,
} from "@/content/site";

interface SideProjectsStepProps {
  step: SideProjectStepData;
  accentText: string;
}

function renderParagraph(content: SideProjectParagraphContent, accentText: string) {
  if (typeof content === "string") {
    return content;
  }

  const { text, links } = content;
  if (!links || links.length === 0) {
    return text;
  }

  // Find all matches for links in the text
  interface Match {
    start: number;
    end: number;
    text: string;
    url: string;
  }
  const matches: Match[] = [];

  for (const link of links) {
    const idx = text.indexOf(link.text);
    if (idx !== -1) {
      matches.push({
        start: idx,
        end: idx + link.text.length,
        text: link.text,
        url: link.url,
      });
    }
  }

  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (match.start > lastIndex) {
      elements.push(text.slice(lastIndex, match.start));
    }
    elements.push(
      <a
        key={`${match.text}-${i}`}
        href={match.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ textDecorationColor: `color-mix(in srgb, ${accentText} 40%, transparent)` }}
      >
        {match.text}
      </a>,
    );
    lastIndex = match.end;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}

export function SideProjectsStep({ step, accentText }: SideProjectsStepProps) {
  return (
    <div className="mt-9">
      {step.kicker ? (
        <div
          className="text-eyebrow text-xs font-bold tracking-[0.2em]"
          style={{ color: accentText }}
        >
          {step.kicker}
        </div>
      ) : null}
      <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
        {step.title}
      </h3>
      <ul className="mt-3 max-w-[68ch] space-y-3">
        {step.body.map((paragraph, index) => (
          <li
            key={index}
            className="flex gap-3 text-base leading-relaxed text-zinc-600 sm:text-lg"
          >
            <span
              className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-zinc-400"
              aria-hidden="true"
            />
            <span>{renderParagraph(paragraph, accentText)}</span>
          </li>
        ))}
      </ul>

      {step.photo ? (
        <figure className="my-8 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-100 shadow-sm">
          <div
            className="relative w-full"
            style={{ aspectRatio: step.photo.aspectRatio }}
          >
            <Image
              src={step.photo.src}
              alt={step.photo.alt}
              fill
              sizes="(min-width: 768px) 760px, 100vw"
              className="object-contain"
            />
          </div>
          {step.photo.caption ? (
            <figcaption className="border-t border-zinc-200/60 bg-white/70 px-4 py-2.5 text-xs text-zinc-500">
              {step.photo.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      {step.subheading ? (
        <div className="mt-6">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            {step.subheading}
          </h3>
          {step.subBody ? (
            <ul className="mt-3 max-w-[68ch] space-y-3">
              {step.subBody.map((paragraph, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-base leading-relaxed text-zinc-600 sm:text-lg"
                >
                  <span
                    className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-zinc-400"
                    aria-hidden="true"
                  />
                  <span>{renderParagraph(paragraph, accentText)}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
