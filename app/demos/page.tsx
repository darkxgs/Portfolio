import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interactive demos",
  description:
    "Five interactive demo apps by Seif Ashraf: a clinic, a restaurant, a CRM, a SaaS dashboard and a salad store. Fictional data, nothing to install.",
  alternates: { canonical: "/demos" },
};

/* One card per demo route under app/demos/*. Names are the fictional brands
   each demo uses; the case-study slug is the matching entry in lib/projects.ts. */
const demos = [
  {
    href: "/demos/clinic",
    name: "BrightSmile Dental",
    maps: "A dental or medical clinic that still takes bookings by phone: online booking with automatic reminders, and a calendar for the front desk.",
    caseStudy: "/projects/clinic-management",
  },
  {
    href: "/demos/restaurant",
    name: "TasteBite",
    maps: "An independent restaurant or takeaway that wants to take orders directly instead of through a marketplace app.",
    caseStudy: "/projects/restaurant-platform",
  },
  {
    href: "/demos/crm",
    name: "FlowDesk",
    maps: "A professional services firm keeping its client relationships in inboxes and spreadsheets.",
    caseStudy: "/projects/crm-automation",
  },
  {
    href: "/demos/saas",
    name: "Metricly",
    maps: "An early-stage SaaS team that needs activation, retention and billing on one screen.",
    caseStudy: "/projects/saas-dashboard",
  },
  {
    href: "/demos/salad",
    name: "GreenBowl",
    maps: "A salad bar or deli selling direct, with a build-your-own-bowl configurator and prepaid pickup.",
    caseStudy: "/projects/greenbowl",
  },
];

export default function DemosIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase sm:text-sm">
        Interactive demos
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-tight text-white">
        Five demos you can click through.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
        Each one is a working app in your browser, running on fictional data.
        Nothing to install and no sign-up. State resets when you refresh.
        Looking for real production work instead? See{" "}
        <Link
          href="/projects/car-engineering-center"
          className="text-emerald-400 underline decoration-emerald-400/40 underline-offset-4 transition-colors hover:text-emerald-300"
        >
          Car Engineering Center
        </Link>{" "}
        and{" "}
        <Link
          href="/projects/salad-store"
          className="text-emerald-400 underline decoration-emerald-400/40 underline-offset-4 transition-colors hover:text-emerald-300"
        >
          Salad Store
        </Link>
        .
      </p>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <li
            key={demo.href}
            className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-emerald-500/40"
          >
            <h2 className="font-display text-xl font-bold text-white">
              <Link href={demo.href} className="hover:text-emerald-300">
                {demo.name}
              </Link>
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
              {demo.maps}
            </p>
            <p className="mt-5 font-mono text-[11px] tracking-wide text-slate-500 uppercase">
              Interactive demo · fictional data · resets on refresh
            </p>
            <div className="mt-5 flex items-center gap-5">
              <Link
                href={demo.href}
                className="text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Open the demo →
              </Link>
              <Link
                href={demo.caseStudy}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                Case study
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-20 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center sm:p-14">
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-bold tracking-tight text-white">
          Want one like this?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-slate-400">
          Every demo maps to a problem a real business has. If it is one yours
          has, I can build the version that fits how you work.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
        >
          Start a conversation
        </Link>
      </div>
    </div>
  );
}
