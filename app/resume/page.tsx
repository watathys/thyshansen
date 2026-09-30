import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume and career history for ${site.name}.`,
};

export default function ResumePage() {
  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-5xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              ← Back to Home
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Resume & Education
            </h1>
            <p className="mt-2 text-sm text-muted">
              {site.name} · {site.education.school} ({site.education.degree})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={site.resumeUrl}
              download="Thys_Hansen_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF
            </a>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              Contact Me
            </ButtonLink>
          </div>
        </div>

        {/* Embedded PDF Viewer Container */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card-bg shadow-sm">
          <div className="border-b border-border bg-background px-6 py-3.5 flex items-center justify-between text-xs text-muted">
            <span className="font-semibold text-foreground">
              Thys_Hansen_Resume.pdf
            </span>
            <span>PDF Document Viewer</span>
          </div>

          <div className="relative aspect-[1/1.3] w-full min-h-[650px] bg-black/20 sm:min-h-[850px]">
            <object
              data={`${site.resumeUrl}#toolbar=0&navpanes=0`}
              type="application/pdf"
              className="h-full w-full"
            >
              <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <svg
                  className="h-12 w-12 text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-4 text-base font-semibold text-foreground">
                  Inline PDF preview not supported on this browser or mobile device.
                </p>
                <p className="mt-1 text-sm text-muted">
                  You can download the resume directly using the button below.
                </p>
                <a
                  href={site.resumeUrl}
                  download="Thys_Hansen_Resume.pdf"
                  className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-accent/90"
                >
                  Download Thys_Hansen_Resume.pdf
                </a>
              </div>
            </object>
          </div>
        </div>
      </Container>
    </div>
  );
}
