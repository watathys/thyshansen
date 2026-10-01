import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  /**
   * `primary`/`secondary` are built for the site's dark theme. `onLight` is a
   * solid near-black pill for light surfaces (e.g. a case study's paper-white
   * body), where `primary`'s off-white fill would disappear.
   */
  variant?: "primary" | "secondary" | "onLight";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-foreground text-background hover:bg-accent",
    secondary:
      "border border-border text-foreground hover:border-accent hover:text-accent",
    onLight: "bg-zinc-900 text-white hover:bg-zinc-700",
  };

  const classes = cn(base, variants[variant], className);

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
