import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-24">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-base text-muted">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          Back home
        </Link>
      </Container>
    </section>
  );
}
