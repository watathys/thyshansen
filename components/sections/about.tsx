import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  const { education } = site;

  return (
    <section id="about" className="border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Education" title={education.school} />

        <div className="mt-8 flex flex-col gap-2 border-l-2 border-accent/30 pl-6">
          <p className="text-lg font-medium text-foreground">
            {education.degree}
            {education.emphasis ? `, ${education.emphasis}` : ""}
          </p>
          <p className="text-sm text-muted">
            Graduating {education.graduationDate}
            {education.gpa ? ` · GPA ${education.gpa}` : ""}
          </p>
          {education.honors.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
              {education.honors.map((honor) => (
                <li key={honor}>{honor}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
