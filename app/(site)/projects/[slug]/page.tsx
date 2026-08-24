import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShot from "@/components/app-shot";
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Link
        href="/projects"
        className="text-sm text-slate-400 transition-colors hover:text-white"
      >
        ← All projects
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {project.title}
        </h1>
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
      <p className="mt-4 max-w-2xl text-xl text-slate-400">{project.tagline}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
        <span className="font-medium text-slate-400">Built for:</span>{" "}
        {project.target}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {project.kind === "live" ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
          >
            Visit the live site →
          </a>
        ) : (
          <Link
            href={project.demoUrl}
            className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
          >
            Open the live demo →
          </Link>
        )}
        <p className="text-sm text-slate-500">
          {project.kind === "live"
            ? "Opens in a new tab — this is the real site, in production."
            : "Runs in your browser — fictional data, nothing to install."}
        </p>
      </div>

      <div className="mt-12 max-w-4xl">
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
          <Link href={project.demoUrl} aria-label={`Open the ${project.title} live demo`}>
            <AppShot slug={project.slug} alt={`Screenshot of the ${project.title} demo`} />
          </Link>
        )}
        <p className="mt-3 text-sm text-slate-500">
          {project.kind === "live"
            ? "Real screenshot of the production site — click it to visit."
            : "Real screenshot of the working demo — click it to try the app itself."}
        </p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
            The problem
          </h2>
          <p className="mt-4 leading-relaxed text-slate-300">
            {project.problem}
          </p>
        </section>
        <section>
          <h2 className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
            The solution
          </h2>
          <p className="mt-4 leading-relaxed text-slate-300">
            {project.solution}
          </p>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          What it does
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((feature) => (
            <div
              key={feature.name}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
            >
              <h3 className="font-medium text-white">{feature.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Why it matters to the business
        </h2>
        <ul className="mt-6 max-w-3xl space-y-4">
          {project.businessValue.map((value) => (
            <li key={value} className="flex gap-3 text-slate-300">
              <span className="mt-0.5 text-emerald-400" aria-hidden="true">
                ✓
              </span>
              <span className="leading-relaxed">{value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Technology
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
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

      <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-sm leading-relaxed text-slate-400">
          <span className="font-medium text-slate-300">
            {project.kind === "live" ? "About this project:" : "Honesty note:"}
          </span>{" "}
          {project.demoNote}
        </p>
      </div>

      <div className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Want something like this for your business?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          {project.kind === "live"
            ? "This one is live in production. If your business needs something like it, I can build the version that fits how you work."
            : "This demo maps to a real problem. If it's one your business has, I can build the version that fits how you work."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
          >
            Start a conversation
          </Link>
          {project.kind === "live" ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              Visit the live site
            </a>
          ) : (
            <Link
              href={project.demoUrl}
              className="inline-block rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              Try the live demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
