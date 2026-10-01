import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Note: no bare `/projects` entry — the project index is intentionally
  // unlinked; project pages live under `/projects/:slug` and `/work/:slug`.
  const staticRoutes = ["", "/about", "/photography", "/videography", "/gallery", "/resume"].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const workRoutes = site.projects.flatMap((project) => [
    {
      url: `${site.url}/work/${project.slug}`,
      lastModified: new Date(),
    },
    {
      url: `${site.url}/projects/${project.slug}`,
      lastModified: new Date(),
    },
  ]);

  return [...staticRoutes, ...workRoutes];
}
