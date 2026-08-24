import Link from "next/link";
import AppShot from "@/components/app-shot";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";

const services = [
  {
    title: "Business Websites",
    description:
      "Modern, fast websites built to convert visitors into customers — not just look good. Clear structure, strong mobile experience, and messaging that sells.",
    href: "/services#websites",
  },
  {
    title: "Business Automation",
    description:
      "Workflow automation, CRM systems, AI assistants, and internal tools that remove repetitive manual work so your team can focus on customers.",
    href: "/services#automation",
  },
  {
    title: "Custom Software",
    description:
      "Dashboards, management systems, customer portals, and SaaS products — built around how your business actually works, not the other way around.",
    href: "/services#software",
  },
];

const steps = [
  {
    n: "01",
    title: "Understand the problem",
    description:
      "Every project starts with your business, not with technology. I look at how you work today and where time or revenue is leaking.",
  },
  {
    n: "02",
    title: "Propose the right solution",
    description:
      "You get a clear, honest recommendation — what to build, what not to build, and what result to expect. No jargon, no padding.",
  },
  {
    n: "03",
    title: "Build, ship, iterate",
    description:
      "I build in short cycles with working software you can see early. You are never waiting months for a big reveal.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-130 w-200 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pt-24 pb-20 sm:pt-28 sm:pb-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
              Seif Ashraf · Full Stack Developer
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Websites, custom software &amp; automation that help businesses
              grow.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              I help companies replace manual processes, outdated websites, and
              disconnected tools with software built around how they actually
              work — so they win more customers and waste less time.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
              >
                See my work
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                Get in touch
              </Link>
            </div>
            <p className="mt-10 font-mono text-xs tracking-wide text-slate-500">
              Next.js · TypeScript · PostgreSQL · Stripe · WhatsApp API · Claude
              AI
            </p>
          </div>
          <div className="hidden lg:block">
            <Link
              href="/demos/saas"
              aria-label="Open the Metricly SaaS dashboard live demo"
            >
              <AppShot
                slug="saas-dashboard"
                alt="Screenshot of the Metricly SaaS analytics demo"
              />
            </Link>
            <p className="mt-3 text-center text-xs text-slate-500">
              A working demo build — click to open the live app.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-slate-800/80">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            What I do
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-7 transition-colors hover:border-emerald-500/40"
              >
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>
                <p className="mt-5 text-sm font-medium text-emerald-400">
                  Learn more{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-t border-slate-800/80">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Projects
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                A live production site and a set of production-grade demo
                builds — every one opens in your browser, so you can see the
                real thing, not just read about it. Demos are clearly labeled
                as demos.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden shrink-0 text-sm font-medium text-emerald-400 hover:text-emerald-300 sm:block"
            >
              All projects →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="border-t border-slate-800/80">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            How I work
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n}>
                <p className="font-mono text-sm text-emerald-400">{step.n}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800/80">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Have a problem software could solve?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Tell me what slows your business down. I&apos;ll tell you honestly
            whether software can fix it — and what it would take.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-emerald-500 px-8 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
