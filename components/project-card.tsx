import Link from "next/link";
import AppShot from "@/components/app-shot";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const kind = project.kind ?? "demo";
  const external = kind === "live" || kind === "concept";
  const production = kind === "production";
  const url = project.demoUrl ?? "";
  const shot = <AppShot slug={project.slug} alt={`Screenshot of ${project.title}`} />;
  const chip = production
    ? "In production"
    : kind === "concept"
      ? "Concept · live"
      : kind === "live"
        ? "Live project"
        : "Interactive demo";

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-emerald-500/40">
      {production ? (
        shot
      ) : external ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit the live ${project.title} website`}
        >
          {shot}
        </a>
      ) : (
        <Link href={url} aria-label={`Open the ${project.title} interactive demo`}>
          {shot}
        </Link>
      )}
      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">
            <Link href={`/projects/${project.slug}`} className="hover:text-emerald-300">
              {project.title}
            </Link>
          </h3>
          {kind !== "demo" ? (
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-emerald-300 uppercase">
              {chip}
            </span>
          ) : (
            <span className="rounded-full border border-slate-700 px-2 py-0.5 font-mono text-[10px] tracking-wide text-slate-400 uppercase">
              {chip}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {project.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-slate-800/80 px-2 py-1 font-mono text-[11px] text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-5">
          {production ? (
            <span className="text-sm text-slate-400">
              Internal system, no public link
            </span>
          ) : external ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              {kind === "concept" ? "Open the live concept →" : "Visit the live site →"}
            </a>
          ) : (
            <Link
              href={url}
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              Open the interactive demo →
            </Link>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm text-slate-400 hover:text-white"
          >
            Case study
          </Link>
        </div>
      </div>
    </div>
  );
}
