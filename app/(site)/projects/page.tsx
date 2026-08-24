import type { Metadata } from "next";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Demo builds by Seif Ashraf — production-grade software for clinics, restaurants, professional services, and SaaS.",
};

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <p className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
        Projects
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Real work, real standards.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
        A live production website, and five interactive demo builds created to
        show exactly how I design and build business software — from the
        database up to the interface. Demos are labeled honestly as demos, and
        every project maps to a real problem I can solve for your business.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
