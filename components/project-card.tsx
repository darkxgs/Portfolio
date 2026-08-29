import Link from "next/link";
import AppShot from "@/components/app-shot";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const live = project.kind === "live" || project.kind === "concept";
  const shot = <AppShot slug={project.slug} alt={`Screenshot of ${project.title}`} />;

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-emerald-500/40">
      {live ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit the live ${project.title} website`}
        >
          {shot}
        </a>
      ) : (
        <Link href={project.demoUrl} aria-label={`Open the ${project.title} live demo`}>
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
          {live ? (
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-emerald-300 uppercase">
              {project.kind === "concept" ? "Concept · live" : "Live project"}
            </span>
          ) : (
            <span className="rounded-full border border-slate-700 px-2 py-0.5 font-mono text-[10px] tracking-wide text-slate-400 uppercase">
              Demo build
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
          {live ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              {project.kind === "concept" ? "Open the live concept →" : "Visit the live site →"}
            </a>
          ) : (
            <Link
              href={project.demoUrl}
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              Open live demo →
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
