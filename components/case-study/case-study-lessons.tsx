import { Container } from "@/components/layout/container";

/**
 * The numbered takeaways that close a case study's reflective section, kept to
 * a narrow readable column so each lesson lands on its own beat.
 */
export function CaseStudyLessons({
  lessons,
  accentText,
}: {
  lessons: string[];
  /** AA-safe accent for the lesson numbers. */
  accentText: string;
}) {
  return (
    <Container>
      <ol className="mt-12 max-w-2xl space-y-8 sm:mt-16">
        {lessons.map((lesson, index) => (
          <li
            key={lesson}
            className="flex gap-5 border-t border-zinc-200 pt-6"
          >
            <span
              className="text-eyebrow pt-1 text-xs font-bold"
              style={{ color: accentText }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
              {lesson}
            </p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
