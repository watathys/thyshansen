import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactButtons } from "@/components/sections/contact-buttons";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-20 sm:py-24">
      <Container className="space-y-12">
        <div className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk product"
            description="Open to product management internships and full-time roles. The fastest way to reach me is email, LinkedIn, or the direct form below."
          />
          <ContactButtons />
        </div>

        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
