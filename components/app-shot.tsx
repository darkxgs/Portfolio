import Image from "next/image";

const frames: Record<string, { url: string }> = {
  "clinic-management": { url: "brightsmile-demo.clinic/book" },
  "restaurant-platform": { url: "tastebite-demo.restaurant/order" },
  "crm-automation": { url: "flowdesk-demo.app/pipeline" },
  "saas-dashboard": { url: "metricly-demo.io/dashboard" },
  "greenbowl": { url: "greenbowl-demo.shop/order" },
  "salad-store": { url: "saladstore-eg.vercel.app" },
};

/* Real screenshot of the working demo app, framed in browser chrome.
   Images live in public/screens/<slug>.png (1440x900 captures). */
export default function AppShot({ slug, alt }: { slug: string; alt: string }) {
  const frame = frames[slug];
  if (!frame) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-slate-700/70 bg-slate-800/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="ml-3 flex-1 truncate rounded-md bg-slate-900/80 px-3 py-1 font-mono text-[10px] text-slate-500">
          {frame.url}
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
