"use client";

import { usePathname } from "next/navigation";

/**
 * Route gate for the site footer. The homepage is a fullscreen hero
 * presentation, so it opts out of the footer; every other route renders the
 * server `SiteFooter` passed in as children (keeping it a server component).
 */
export function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
