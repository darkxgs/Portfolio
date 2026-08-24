import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShot from "@/components/app-shot";
import Magnetic from "@/components/site-motion/magnetic";
import RevealText from "@/components/site-motion/reveal-text";
import { Parallax, SectionReveal } from "@/components/site-motion/section-reveal";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-1 shrink-0 text-emerald-400"
    >
      <path
        d="M2.5 8.5l3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <Link
        href="/projects"
        className="font-mono text-xs tracking-widest text-slate-400 uppercase transition-colors hover:text-white"
      >
        ← All projects
      </Link>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {project.kind === "live" ? (
          <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs tracking-wide text-emerald-300 uppercase">
            Live project
          </span>
        ) : (
          <span className="rounded-full border border-slate-700 px-3 py-1 font-mono text-xs tracking-wide text-slate-400 uppercase">
            Demo build
          </span>
        )}
      </div>
      <RevealText
        as="h1"
        mode="load"
        lines={[project.title]}
        className="mt-4 max-w-5xl font-display text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1.02] font-bold tracking-tight text-white"
      />
      <p className="mt-6 max-w-2xl text-xl text-slate-400">{project.tagline}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
        <span className="font-medium text-slate-400">Built for:</span>{" "}
        {project.target}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Magnetic strength={0.3}>
          {project.kind === "live" ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
            >
              Visit the live site →
            </a>
          ) : (
            <Link
              href={project.demoUrl}
              className="block rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
            >
              Open the live demo →
            </Link>
          )}
        </Magnetic>
        <p className="text-sm text-slate-500">
          {project.kind === "live"
            ? "Opens in a new tab — this is the real site, in production."
            : "Runs in your browser — fictional data, nothing to install."}
        </p>
      </div>

      <div className="mt-16 max-w-4xl">
        <Parallax amount={5}>
          {project.kind === "live" ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the live ${project.title} website`}
            >
              <AppShot slug={project.slug} alt={`Screenshot of ${project.title}`} />
            </a>
          ) : (
            <Link
              href={project.demoUrl}
              aria-label={`Open the ${project.title} live demo`}
            >
              <AppShot
                slug={project.slug}
                alt={`Screenshot of the ${project.title} demo`}
              />
            </Link>
          )}
        </Parallax>
        <p className="mt-4 text-sm text-slate-500">
          {project.kind === "live"
            ? "Real screenshot of the production site — click it to visit."
            : "Real screenshot of the working demo — click it to try the app itself."}
        </p>
      </div>

      <SectionReveal>
        <div className="mt-24 grid gap-14 lg:grid-cols-2">
          <section data-reveal>
            <h2 className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
              The problem
            </h2>
            <p className="mt-5 leading-relaxed text-slate-300">
              {project.problem}
            </p>
          </section>
          <section data-reveal>
            <h2 className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
              The solution
            </h2>
            <p className="mt-5 leading-relaxed text-slate-300">
              {project.solution}
            </p>
          </section>
        </div>
      </SectionReveal>

      <section className="mt-24">
        <RevealText
          as="h2"
          lines={["What it does"]}
          className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-white"
        />
        <SectionReveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature) => (
              <div
                key={feature.name}
                data-reveal
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-emerald-500/30"
              >
                <h3 className="font-display font-bold text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="mt-24">
        <RevealText
          as="h2"
          lines={["Why it matters", "to the business"]}
          className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-tight text-white"
        />
        <SectionReveal>
          <ul className="mt-10 max-w-3xl space-y-5">
            {project.businessValue.map((value) => (
              <li key={value} data-reveal className="flex gap-3 text-slate-300">
                <Check />
                <span className="leading-relaxed">{value}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </section>

      <section className="mt-24">
        <RevealText
          as="h2"
          lines={["Technology"]}
          className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-white"
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-slate-800/80 px-3 py-1.5 font-mono text-xs text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-24 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-sm leading-relaxed text-slate-400">
          <span className="font-medium text-slate-300">
            {project.kind === "live" ? "About this project:" : "Honesty note:"}
          </span>{" "}
          {project.demoNote}
        </p>
      </div>

      <div className="mt-24 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center sm:p-16">
        <RevealText
          as="h2"
          lines={["Want something like this", "for your business?"]}
          className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-bold tracking-tight text-white"
        />
        <p className="mx-auto mt-5 max-w-lg text-slate-400">
          {project.kind === "live"
            ? "This one is live in production. If your business needs something like it, I can build the version that fits how you work."
            : "This demo maps to a real problem. If it's one your business has, I can build the version that fits how you work."}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Magnetic strength={0.3}>
            <Link
              href="/contact"
              className="block rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
            >
              Start a conversation
            </Link>
          </Magnetic>
          <Magnetic strength={0.3}>
            {project.kind === "live" ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full border border-slate-700 px-7 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                Visit the live site
              </a>
            ) : (
              <Link
                href={project.demoUrl}
                className="block rounded-full border border-slate-700 px-7 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                Try the live demo
              </Link>
            )}
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
