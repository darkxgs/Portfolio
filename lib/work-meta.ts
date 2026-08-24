import type { Project } from "@/lib/projects";
import type { WorkListItem } from "@/components/work-list";

/* Presentation-only metadata for the award-style work list.
   Content data itself stays in lib/projects.ts, untouched. */
const categories: Record<string, string> = {
  "salad-store": "Website · E-commerce",
  "clinic-management": "Web application",
  "restaurant-platform": "Ordering platform",
  "crm-automation": "CRM · Automation · AI",
  "saas-dashboard": "SaaS · Analytics",
  greenbowl: "E-commerce",
};

export function toWorkItems(projects: Project[]): WorkListItem[] {
  return projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: categories[p.slug] ?? "Web application",
    year: "2026",
    live: p.kind === "live",
    demoUrl: p.demoUrl,
  }));
}
