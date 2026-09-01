import Image from "next/image";

/* Address-bar label per project. Public projects show their real host; the
   production system has no public URL, so its bar says so instead. Every
   project needs an entry here or the case study renders no screenshot. */
const frames: Record<string, { label: string }> = {
  "car-engineering-center": { label: "Internal system · 4 branches" },
  "salad-store": { label: "saladstore-eg.vercel.app" },
  "blue-sky-events": { label: "blue-skye.vercel.app" },
  "clinic-management": { label: "brightsmile-demo.clinic/book" },
  "restaurant-platform": { label: "tastebite-demo.restaurant/order" },
  "crm-automation": { label: "flowdesk-demo.app/pipeline" },
  "saas-dashboard": { label: "metricly-demo.io/dashboard" },
  greenbowl: { label: "greenbowl-demo.shop/order" },
};

/* Real screenshot of the app, framed in browser chrome.
   Images live in public/screens/<slug>.png (16:10 captures). */
export default function AppShot({ slug, alt }: { slug: string; alt: string }) {
  const frame = frames[slug];
  if (!frame) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/70 bg-ground-900 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-slate-700/70 bg-ground-800/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="ml-3 flex-1 truncate rounded-md bg-ground-900/80 px-3 py-1 font-mono text-[10px] text-slate-400">
          {frame.label}
        </span>
      </div>
      <Image
        src={`/screens/${slug}.png`}
        alt={alt}
        width={1440}
        height={900}
        className="w-full"
      />
    </div>
  );
}
