import Link from "next/link";
import Magnetic from "@/components/site-motion/magnetic";
import RevealText from "@/components/site-motion/reveal-text";
import VelocityMarquee from "@/components/site-motion/velocity-marquee";
import { SectionReveal } from "@/components/site-motion/section-reveal";
import WorkList from "@/components/work-list";
import { projects } from "@/lib/projects";
import { toWorkItems } from "@/lib/work-meta";

const services = [
  {
    n: "01",
    title: "Business Websites",
    description:
      "Modern, fast websites built to convert visitors into customers — not just look good. Clear structure, strong mobile experience, and messaging that sells.",
    href: "/services#websites",
  },
  {
    n: "02",
    title: "Business Automation",
    description:
      "Workflow automation, CRM systems, AI assistants, and internal tools that remove repetitive manual work so your team can focus on customers.",
    href: "/services#automation",
  },
  {
    n: "03",
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

function ArrowDownRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 5l14 14M19 19V7M19 19H7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Globe() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      className="animate-spin-slow"
    >
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18M4.6 7h14.8M4.6 17h14.8" />
    </svg>
  );
}

/* Circular rotating "available" badge — SVG textPath spinning slowly. */
function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="animate-badge-spin relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path
              id="badge-circle"
              d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
            />
          </defs>
          <text className="fill-slate-400 font-mono text-[9px] tracking-[0.14em] uppercase">
            <textPath href="#badge-circle" textLength="250">
              Available for projects — 2026 —&#160;
            </textPath>
          </text>
          <circle cx="50" cy="50" r="3.5" className="fill-emerald-400" />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  const workItems = toWorkItems(projects).slice(0, 4);

  return (
    <>
      {/* ============ Hero — deep ink ============ */}
      <section className="relative flex min-h-svh flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-130 w-200 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="grid-hairline pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 pb-10">
          <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase sm:text-sm">
            Portfolio — 2026
          </p>

          <div className="relative">
            {/* Arch portrait — overlaps the name on lg+, behind the text */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-10 z-0 hidden -translate-y-[52%] rotate-[-2deg] lg:block xl:right-24"
            >
              <img
                src="/seif.png"
                alt=""
                className="h-[300px] w-[235px] rounded-t-full object-cover object-top ring-1 ring-emerald-400/70 ring-offset-4 ring-offset-slate-950"
              />
            </div>
            <RevealText
              as="h1"
              mode="load"
              lines={["Seif", "Ashraf"]}
              className="relative z-10 mt-4 font-display text-[clamp(4rem,14vw,13rem)] leading-[0.9] font-extrabold tracking-tight text-white"
            />
          </div>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-end">
            <div className="flex flex-col items-start gap-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900 p-2">
                <img
                  src="/seif.png"
                  alt="Seif Ashraf"
                  className="h-9 w-9 rounded-full object-cover object-top"
                />
                <span className="text-sm text-slate-200">
                  Cairo based · working worldwide
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                  <Globe />
                </span>
              </div>
              <div className="flex items-start gap-4">
                <ArrowDownRight className="mt-1 shrink-0 text-emerald-400" />
                <p className="max-w-md text-lg leading-snug text-white sm:text-xl">
                  Full Stack Developer — websites, custom software &amp;
                  automation that help businesses{" "}
                  <em className="font-accent text-[1.15em] font-normal text-emerald-400 italic">
                    grow
                  </em>
                </p>
              </div>
            </div>

            <div>
              <p className="max-w-xl leading-relaxed text-slate-400">
                I help companies replace manual processes, outdated websites,
                and disconnected tools with software built around how they
                actually work — so they win more customers and waste less time.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <Link
                    href="/projects"
                    className="block rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
                  >
                    See my work
                  </Link>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Link
                    href="/contact"
                    className="block rounded-full border border-slate-700 px-7 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
                  >
                    Get in touch
                  </Link>
                </Magnetic>
                <RotatingBadge className="ml-2 hidden sm:block" />
              </div>
              <p className="mt-8 font-mono text-xs tracking-wide text-slate-500">
                Next.js · TypeScript · PostgreSQL · Stripe · WhatsApp API · AI
                integrations
              </p>
            </div>
          </div>
        </div>

        {/* Hero-bottom velocity marquee */}
        <VelocityMarquee
          text={"Websites — Custom Software — Automation — AI Integrations — "}
          className="border-t border-slate-800/60 py-4"
          trackClassName="text-outline font-display text-[clamp(3rem,9vw,7rem)] font-extrabold tracking-tight uppercase"
        />
      </section>

      {/* ============ Selected work — full-bleed paper ============ */}
      <section className="bg-paper text-ink-text">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-widest text-emerald-700 uppercase">
                01 — Work
              </p>
              <RevealText
                as="h2"
                lines={[
                  <>
                    Selected{" "}
                    <em className="font-accent font-normal italic">work</em>
                  </>,
                ]}
                className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-ink-text"
              />
            </div>
            <Link
              href="/projects"
              className="group mb-2 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-600"
            >
              All projects{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-soft">
            A live production site and a set of production-grade demo builds —
            every one opens in your browser, so you can see the real thing, not
            just read about it. Demos are clearly labeled as demos.
          </p>
          <div className="mt-12">
            <WorkList items={workItems} tone="paper" />
          </div>
        </div>
      </section>

      {/* ============ Services strip — deeper paper ============ */}
      <SectionReveal>
        <section className="bg-paper-deep text-ink-text">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <p className="font-mono text-xs tracking-widest text-emerald-800 uppercase">
              02 — Services
            </p>
            <RevealText
              as="h2"
              lines={[
                <>
                  What I <em className="font-accent font-normal italic">do</em>
                </>,
              ]}
              className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-ink-text"
            />
            <div className="mt-12 border-t border-ink-text/15">
              {services.map((service) => (
                <Link
                  key={service.n}
                  href={service.href}
                  data-reveal
                  className="group grid gap-3 border-b border-ink-text/15 py-8 transition-colors hover:bg-paper md:grid-cols-[3.5rem_1fr_1.2fr_auto] md:items-center md:gap-x-8 md:py-10"
                >
                  <span className="font-mono text-sm text-ink-faint">
                    {service.n}
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink-text transition-colors group-hover:text-emerald-700 sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {service.description}
                  </p>
                  <span
                    className="hidden text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-700 md:block"
                    aria-hidden="true"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12h16m0 0-6-6m6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ============ How I work — back to ink ============ */}
      <SectionReveal>
        <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
            03 — Process
          </p>
          <RevealText
            as="h2"
            lines={[
              <>
                How I <em className="font-accent font-normal italic">work</em>
              </>,
            ]}
            className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-white"
          />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} data-reveal>
                <p className="font-mono text-sm text-emerald-400">{step.n}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* ============ CTA band — ink with emerald ============ */}
      <section className="border-t border-slate-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center sm:py-36">
          <RevealText
            as="h2"
            lines={[
              "Have a problem",
              <>
                <em className="font-accent font-normal italic">software</em>{" "}
                could solve?
              </>,
            ]}
            className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-tight text-white"
          />
          <p className="mx-auto mt-6 max-w-xl text-slate-400">
            Tell me what slows your business down. I&apos;ll tell you honestly
            whether software can fix it — and what it would take.
          </p>
          <Magnetic strength={0.3} className="mt-12">
            <Link
              href="/contact"
              className="flex h-40 w-40 items-center justify-center rounded-full bg-emerald-500 p-6 text-center text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400 sm:h-48 sm:w-48"
            >
              Start a conversation
            </Link>
          </Magnetic>
        </div>
      </section>
    </>
  );
}
