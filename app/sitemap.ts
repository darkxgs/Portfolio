import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const base = "https://www.seifashraf.dev";

/* Static site routes. Project case studies come from lib/projects.ts, so a
   new project is in the sitemap as soon as it is in the data file. */
const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/demos", priority: 0.6 },
];

/* One route per demo app under app/demos/*. */
const demoRoutes = [
  "/demos/clinic",
  "/demos/restaurant",
  "/demos/crm",
  "/demos/saas",
  "/demos/salad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${base}${path}`,
      priority,
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      priority: 0.8,
    })),
    ...demoRoutes.map((path) => ({
      url: `${base}${path}`,
      priority: 0.5,
    })),
  ];
}
