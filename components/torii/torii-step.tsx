import Image from "next/image";

export interface ToriiStepData {
  /** 1-based position shown to the reader (sequential, not the raw photo number). */
  number: number;
  /** Filename within `/public/make-a-torii-gate/`. */
  image: string;
  /** Instruction text for this step. */
  text: string;
  /** Native pixel dimensions of `image`, so it can render at its real aspect
   * ratio without next/image cropping it to fit a fixed box. */
  width: number;
  height: number;
}

/**
 * One numbered photo + instruction pairing in the build guide, styled like a
 * red ink stamp ("hanko") next to a photo — red/black/white only, to match
 * the page's Japanese-inspired theme. The photo is shown large and at its
 * real aspect ratio (via `width`/`height`), so nothing gets cropped.
 */
export function ToriiStep({ step }: { step: ToriiStepData }) {
  return (
    <li className="flex flex-col gap-4">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-sm border-2 border-[#1a1310] bg-white shadow-sm">
        <Image
          src={`/make-a-torii-gate/${step.image}`}
          alt={`Step ${step.number}: ${step.text}`}
          width={step.width}
          height={step.height}
          sizes="(max-width: 640px) 100vw, 448px"
          className="h-auto w-full"
        />
      </div>
      <div className="mx-auto flex w-full max-w-md items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border-2 border-[#b7282e] text-sm font-bold text-[#b7282e]">
          {String(step.number).padStart(2, "0")}
        </span>
        <p className="pt-1 text-base leading-relaxed text-[#2a1f1a]">
          {step.text}
        </p>
      </div>
    </li>
  );
}
