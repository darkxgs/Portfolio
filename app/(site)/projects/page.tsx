import type { Metadata } from "next";
import RevealText from "@/components/site-motion/reveal-text";
import WorkList from "@/components/work-list";
import { projects } from "@/lib/projects";
import { toWorkItems } from "@/lib/work-meta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Demo builds by Seif Ashraf — production-grade software for clinics, restaurants, professional services, and SaaS.",
};

export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase sm:text-sm">
        Projects
      </p>
      <RevealText
        as="h1"
        mode="load"
        lines={["Real work,", "real standards."]}
        className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-white"
      />
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
        A live production website, and five interactive demo builds created to
        show exactly how I design and build business software — from the
        database up to the interface. Demos are labeled honestly as demos, and
        every project maps to a real problem I can solve for your business.
      </p>

      <div className="mt-16">
        <WorkList items={toWorkItems(projects)} />
      </div>
    </div>
  );
}
