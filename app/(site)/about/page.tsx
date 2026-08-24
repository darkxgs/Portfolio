import type { Metadata } from "next";
import Link from "next/link";

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
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <p className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
        About
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Hi, I&apos;m Seif Ashraf.
      </h1>
      <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-slate-400">
        <p>
          I&apos;m a full stack developer who builds websites, custom software,
          and automation systems for businesses. My focus is simple: find where
          a business loses time or customers, and build the system that fixes
          it.
        </p>
        <p>
          Most of the companies I work with don&apos;t need &quot;more
          technology&quot;. They need one well-built system that fits how they
          already work — a booking flow that fills the calendar, an ordering
          system that keeps the margin in-house, a dashboard that finally shows
          what&apos;s going on. That&apos;s what I build.
        </p>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          What I specialize in
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
            >
              <h3 className="font-semibold text-white">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          How I think about projects
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="font-semibold text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-20 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Let&apos;s talk about your business
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          A short conversation is enough to know whether I can help. No
          commitment, no sales pitch.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
