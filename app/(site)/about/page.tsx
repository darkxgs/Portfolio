import type { Metadata } from "next";
import Link from "next/link";
import Magnetic from "@/components/site-motion/magnetic";
import RevealText from "@/components/site-motion/reveal-text";
import { SectionReveal } from "@/components/site-motion/section-reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Seif Ashraf — Full Stack Developer specializing in web applications, business automation, AI integrations, and custom software.",
};

const specialties = [
  {
    name: "Web applications",
    description: "Fast, modern apps built with Next.js, TypeScript, and React.",
  },
  {
    name: "Business automation",
    description:
      "Workflows, reminders, and integrations that remove repetitive manual work.",
  },
  {
    name: "AI integrations",
    description:
      "Assistants and automations powered by large language models, applied to real business tasks.",
  },
  {
    name: "Custom dashboards",
    description:
      "Clear views of the numbers that matter — leads, orders, bookings, revenue.",
  },
  {
    name: "Backend systems",
    description:
      "Reliable APIs, background jobs, and integrations that keep everything running.",
  },
  {
    name: "Database architecture",
    description:
      "Well-structured data models that stay fast and flexible as you grow.",
  },
];

const principles = [
  {
    title: "Business first, technology second",
    description:
      "A project succeeds when it changes a business result — more bookings, fewer no-shows, less admin time. The stack is a means to that end.",
  },
  {
    title: "Honest advice",
    description:
      "If a simpler or cheaper option will solve your problem, I will tell you. I would rather lose a project than recommend the wrong thing.",
  },
  {
    title: "Ship early, improve often",
    description:
      "You see working software in the first weeks, not after months. Short cycles mean we can adjust before anything gets expensive.",
  },
];

export default function About() {
  return (
    <>
      {/* Ink hero + intro */}
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-20 sm:pt-36 sm:pb-24">
        <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase sm:text-sm">
          About
        </p>
        <RevealText
          as="h1"
          mode="load"
          lines={["Hi, I'm", "Seif Ashraf."]}
          className="mt-4 font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] font-bold tracking-tight text-white"
        />
        <SectionReveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-start">
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-slate-400">
              <p data-reveal>
                I&apos;m a full stack developer who builds websites, custom
                software, and automation systems for businesses. My focus is
                simple: find where a business loses time or customers, and build
                the system that fixes it.
              </p>
              <p data-reveal>
                Most of the companies I work with don&apos;t need &quot;more
                technology&quot;. They need one well-built system that fits how
                they already work — a booking flow that fills the calendar, an
                ordering system that keeps the margin in-house, a dashboard that
                finally shows what&apos;s going on. That&apos;s what I build.
              </p>
            </div>
            <figure
              data-reveal
              className="relative overflow-hidden rounded-3xl border border-slate-800"
            >
              <img
                src="/seif.png"
                alt="Portrait of Seif Ashraf"
                className="w-full object-cover saturate-[0.85]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-4 left-5 font-mono text-xs tracking-widest text-slate-300 uppercase">
                Seif Ashraf — Cairo
              </figcaption>
            </figure>
          </div>
        </SectionReveal>
      </div>

      {/* Paper specialties section */}
      <section className="bg-paper text-ink-text">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-emerald-700">01</span>
            <RevealText
              as="h2"
              lines={[
                <>
                  What I{" "}
                  <em className="font-accent font-normal italic">
                    specialize
                  </em>{" "}
                  in
                </>,
              ]}
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-ink-text"
            />
          </div>
          <SectionReveal>
            <div className="mt-10 grid gap-5 border-t border-ink-text/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {specialties.map((s) => (
                <div
                  key={s.name}
                  data-reveal
                  className="rounded-2xl border border-ink-text/15 bg-paper-deep/60 p-6 transition-colors hover:border-emerald-700/40"
                >
                  <h3 className="font-display font-bold text-ink-text">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Ink principles + CTA */}
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <section>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-emerald-400">02</span>
            <RevealText
              as="h2"
              lines={["How I think about projects"]}
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white"
            />
          </div>
          <SectionReveal>
            <div className="mt-10 grid gap-10 border-t border-slate-800 pt-10 md:grid-cols-3">
              {principles.map((p, i) => (
                <div key={p.title} data-reveal>
                  <p className="font-mono text-sm text-slate-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </section>

        <div className="mt-28 flex flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/40 p-10 text-center sm:p-16">
          <RevealText
            as="h2"
            lines={[
              "Let's talk about",
              <>
                your{" "}
                <em className="font-accent font-normal italic">business</em>
              </>,
            ]}
            className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-bold tracking-tight text-white"
          />
          <p className="mx-auto mt-5 max-w-lg text-slate-400">
            A short conversation is enough to know whether I can help. No
            commitment, no sales pitch.
          </p>
          <Magnetic strength={0.3} className="mt-8">
            <Link
              href="/contact"
              className="block rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
            >
              Get in touch
            </Link>
          </Magnetic>
        </div>
      </div>
    </>
  );
}
