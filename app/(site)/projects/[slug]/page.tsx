import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
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

/* Checked at build time (this runs on the server). A project without a
   screenshot keeps the site-wide app/opengraph-image.png instead. */
function hasScreenshot(slug: string): boolean {
  return existsSync(join(process.cwd(), "public", "screens", `${slug}.png`));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${slug}` },
    /* og:title / og:description inherit the page's (templated) title and
       description; only the image is project-specific. */
    ...(hasScreenshot(slug)
      ? {
          openGraph: {
            images: [
              {
                url: `/screens/${slug}.png`,
                alt: `Screenshot of ${project.title}`,
              },
            ],
          },
        }
      : {}),
  };
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

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-md bg-slate-800/80 px-3 py-1.5 font-mono text-xs text-slate-300"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const primaryButton =
  "block rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400";
const secondaryButton =
  "block rounded-full border border-slate-700 px-7 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const kind = project.kind ?? "demo";
  /* live + concept open an external URL; demo opens an internal route;
     production is a real system with no public link at all. */
  const external = kind === "live" || kind === "concept";
  const production = kind === "production";
  const url = project.demoUrl ?? "";

  const chip = production
    ? "In production"
    : kind === "concept"
      ? "Concept · live"
      : kind === "live"
        ? "Live project"
        : "Interactive demo";

  const shot = (
    <AppShot
      slug={project.slug}
      alt={
        kind === "demo"
          ? `Screenshot of the ${project.title} demo`
          : `Screenshot of ${project.title}`
      }
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <Link
        href="/projects"
        className="font-mono text-xs tracking-widest text-slate-400 uppercase transition-colors hover:text-white"
      >
        ← All projects
      </Link>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {kind !== "demo" ? (
          <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs tracking-wide text-emerald-300 uppercase">
            {chip}
          </span>
        ) : (
          <span className="rounded-full border border-slate-700 px-3 py-1 font-mono text-xs tracking-wide text-slate-400 uppercase">
            {chip}
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
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
        <span className="font-medium text-slate-300">Built for:</span>{" "}
        {project.target}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Magnetic strength={0.3}>
          {production ? (
            <Link href="/contact" className={primaryButton}>
              Start a conversation
            </Link>
          ) : external ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButton}
            >
              {kind === "concept" ? "Open the live concept →" : "Visit the live site →"}
            </a>
          ) : (
            <Link href={url} className={primaryButton}>
              Open the interactive demo →
            </Link>
          )}
        </Magnetic>
        {production ? (
          <span className="rounded-full border border-slate-700 px-4 py-2 font-mono text-xs text-slate-400">
            Internal system, no public link
          </span>
        ) : (
          <p className="text-sm text-slate-400">
            {kind === "live"
              ? "Opens in a new tab — this is the real site, in production."
              : kind === "concept"
                ? "Opens in a new tab — a live concept preview built as a pitch, not commissioned work."
                : "Runs in your browser — fictional data, nothing to install."}
          </p>
        )}
      </div>

      <div className="mt-16 max-w-4xl">
        <Parallax amount={5}>
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
            <Link
              href={url}
              aria-label={`Open the ${project.title} interactive demo`}
            >
              {shot}
            </Link>
          )}
        </Parallax>
        <p className="mt-4 text-sm text-slate-400">
          {production
            ? "A real screen from the production system. It is an internal tool, so there is no public link."
            : kind === "live"
              ? "Real screenshot of the production site — click it to visit."
              : kind === "concept"
                ? "Real screenshot of the live concept — click it to browse the full site."
                : "Real screenshot of the working demo — click it to try the app itself."}
        </p>

        {project.gallery && (
          <SectionReveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {project.gallery.map((shot) => (
                <figure
                  key={shot.src}
                  data-reveal
                  className="overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900 shadow-xl shadow-black/30"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1600}
                    height={1000}
                    className="w-full"
                  />
                  {shot.caption && (
                    <figcaption className="border-t border-slate-800 px-4 py-3 text-xs leading-relaxed text-slate-400">
                      {shot.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </SectionReveal>
        )}
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
        {project.productionStack ? (
          /* Demos: separate what the demo runs on from what a production build would use. */
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs tracking-widest text-slate-400 uppercase">
                Built with
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                What this demo actually runs on.
              </p>
              <div className="mt-4">
                <TechChips items={project.tech} />
              </div>
            </div>
            <div>
              <h3 className="font-mono text-xs tracking-widest text-slate-400 uppercase">
                Would ship on
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                The backend and services a production version would use.
              </p>
              <div className="mt-4">
                <TechChips items={project.productionStack} />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <TechChips items={project.tech} />
          </div>
        )}
      </section>

      {/* Paper accent card — warm break inside the dark case study */}
      <div className="mt-24 rounded-2xl bg-paper p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-ink-soft">
          <span className="font-medium text-ink-text">
            {kind === "live" || production ? "About this project:" : "Honesty note:"}
          </span>{" "}
          {project.demoNote}
        </p>
        {project.credit && (
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            <span className="font-medium text-ink-text">Credit:</span>{" "}
            {project.credit}
          </p>
        )}
      </div>

      <div className="mt-24 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center sm:p-16">
        <RevealText
          as="h2"
          lines={["Want something like this", "for your business?"]}
          className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-bold tracking-tight text-white"
        />
        <p className="mx-auto mt-5 max-w-lg text-slate-400">
          {production
            ? "This one is in daily production use. If your business needs its own back-office system, I can build the version that fits how you work."
            : kind === "live"
              ? "This one is live in production. If your business needs something like it, I can build the version that fits how you work."
              : kind === "concept"
                ? "This concept was built from a real company's published record. If your business deserves the same treatment, I can build the version that fits how you work."
                : "This demo maps to a real problem. If it's one your business has, I can build the version that fits how you work."}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Magnetic strength={0.3}>
            <Link href="/contact" className={primaryButton}>
              Start a conversation
            </Link>
          </Magnetic>
          {production ? (
            <span className="rounded-full border border-slate-800 px-7 py-3.5 text-sm text-slate-400">
              Internal system, no public link
            </span>
          ) : (
            <Magnetic strength={0.3}>
              {external ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryButton}
                >
                  {kind === "concept" ? "Browse the concept" : "Visit the live site"}
                </a>
              ) : (
                <Link href={url} className={secondaryButton}>
                  Try the interactive demo
                </Link>
              )}
            </Magnetic>
          )}
        </div>
      </div>
    </div>
  );
}
