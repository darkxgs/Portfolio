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

/* Per-project brand tint — each product's real identity color.
   Used for the row dot, hover accents, and the preview frame ring. */
const accents: Record<string, string> = {
  "salad-store": "#3e8e51", // leaf
  "clinic-management": "#146c77", // teal
  "restaurant-platform": "#d96b34", // ember
  "crm-automation": "#6e85e8", // periwinkle
  "saas-dashboard": "#45b7e8", // azure
  greenbowl: "#2e7440", // deep leaf
};

export function toWorkItems(projects: Project[]): WorkListItem[] {
  return projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: categories[p.slug] ?? "Web application",
    year: "2026",
    live: p.kind === "live",
    demoUrl: p.demoUrl,
    accent: accents[p.slug] ?? "#34d399",
  }));
}
