import type { Metadata } from "next";
import Link from "next/link";
import RevealText from "@/components/site-motion/reveal-text";
import WorkList from "@/components/work-list";
import { projects } from "@/lib/projects";
import { toWorkItems } from "@/lib/work-meta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Two production systems, a concept rebuild and five interactive demos by Seif Ashraf: a workshop platform used across four branches, a bilingual restaurant site, a concept site for a real company, and demo apps you can click through in your browser.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <>
      {/* Ink hero */}
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-20 sm:pt-36 sm:pb-24">
        <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase sm:text-sm">
          Projects
        </p>
        <RevealText
          as="h1"
          mode="load"
          lines={[
            "Real work,",
            <>
              real{" "}
              <em className="font-accent font-normal italic">standards.</em>
            </>,
          ]}
          className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-white"
        />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
          Two systems in production: a workshop management platform used every
          day across four branches in Amarah, Iraq, and a bilingual ordering
          site for a Cairo salad bar. One concept site rebuilt for a real
          company from its published record. And five{" "}
          <Link
            href="/demos"
            className="text-emerald-400 underline decoration-emerald-400/40 underline-offset-4 transition-colors hover:text-emerald-300"
          >
            interactive demos
          </Link>{" "}
          you can click through in your browser, each labelled as a demo and
          running on fictional data.
        </p>
      </div>

      {/* Full-bleed paper work list */}
      <section className="bg-paper text-ink-text">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <WorkList items={toWorkItems(projects)} tone="paper" />
        </div>
      </section>
    </>
  );
}
