import type { Metadata } from "next";
import Link from "next/link";
import Magnetic from "@/components/site-motion/magnetic";
import RevealText from "@/components/site-motion/reveal-text";
import { SectionReveal } from "@/components/site-motion/section-reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, business automation, and custom software — built by Seif Ashraf, Full Stack Developer.",
};

const services = [
  {
    id: "websites",
    n: "01",
    label: "Business Websites",
    title: "Websites that win customers, not just visits",
    intro:
      "For companies whose website is outdated, slow, hard to use on a phone — or missing entirely. A modern website is often the cheapest revenue upgrade a business can make.",
    deliverables: [
      "Modern, fast website with a design that fits your brand",
      "Mobile-first experience — most of your customers are on their phone",
      "Clear structure and messaging built to convert visitors into enquiries",
      "Booking, ordering, or contact flows wired straight into how you work",
      "Easy content updates so you are never dependent on a developer for text changes",
    ],
    fit: "A good fit if customers say they “couldn’t find” something on your site, if competitors look sharper online, or if your site hasn’t changed in years.",
  },
  {
    id: "automation",
    n: "02",
    label: "Business Automation",
    title: "Stop paying staff to do what software does better",
    intro:
      "For companies drowning in manual work: appointment scheduling by phone, order confirmations typed by hand, spreadsheets passed around by email. Automation gives that time back.",
    deliverables: [
      "Workflow automation — reminders, confirmations, and follow-ups that send themselves",
      "CRM systems that track every lead and customer without manual data entry",
      "AI assistants that draft replies, summarize documents, and answer routine questions",
      "Internal tools that replace fragile spreadsheets with reliable systems",
      "Integrations that make your existing tools finally talk to each other",
    ],
    fit: "A good fit if your team repeats the same digital task every day, if things fall through the cracks between tools, or if growth is limited by admin capacity.",
  },
  {
    id: "software",
    n: "03",
    label: "Custom Software",
    title: "Software built around your business — not the other way around",
    intro:
      "For companies that have outgrown off-the-shelf tools. When your process is your advantage, generic software flattens it. Custom software sharpens it.",
    deliverables: [
      "Dashboards that show the numbers that actually run your business",
      "Management systems for bookings, orders, patients, cases, or inventory",
      "Customer portals that let clients help themselves, securely",
      "SaaS products — from first prototype to paying subscribers",
      "Solid backend and database architecture that scales with you",
    ],
    fit: "A good fit if you’ve bent an off-the-shelf tool past its limits, if your “system” is a folder of spreadsheets, or if you have a product idea that needs building properly.",
  },
];

function Check({ paper }: { paper: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`mt-1 shrink-0 ${paper ? "text-emerald-700" : "text-emerald-400"}`}
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

export default function Services() {
  return (
    <>
      {/* Ink hero */}
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20">
        <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase sm:text-sm">
          Services
        </p>
        <RevealText
          as="h1"
          mode="load"
          lines={[
            "Three ways I help",
            <>
              businesses{" "}
              <em className="font-accent font-normal text-emerald-400 italic">
                grow
              </em>
            </>,
          ]}
          className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-white"
        />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
          Every engagement starts with your problem, not with a product list.
          These are the three shapes the solution usually takes.
        </p>
      </div>

      {/* Alternating paper / ink service blocks */}
      {services.map((service, idx) => {
        const paper = idx % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className={`scroll-mt-28 ${paper ? "bg-paper text-ink-text" : ""}`}
          >
            <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
              <div
                className={`flex items-baseline gap-4 border-t pt-10 ${
                  paper ? "border-ink-text/15" : "border-slate-800"
                }`}
              >
                <span
                  className={`font-mono text-sm ${paper ? "text-emerald-700" : "text-emerald-400"}`}
                >
                  {service.n}
                </span>
                <span
                  className={`font-mono text-sm tracking-widest uppercase ${
                    paper ? "text-ink-faint" : "text-slate-500"
                  }`}
                >
                  {service.label}
                </span>
              </div>
              <RevealText
                as="h2"
                lines={[service.title]}
                className={`mt-6 max-w-4xl font-display text-[clamp(1.9rem,4.5vw,3.75rem)] leading-[1.05] font-bold tracking-tight ${
                  paper ? "text-ink-text" : "text-white"
                }`}
              />
              <SectionReveal>
                <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
                  <div data-reveal>
                    <p
                      className={`max-w-xl leading-relaxed ${
                        paper ? "text-ink-soft" : "text-slate-400"
                      }`}
                    >
                      {service.intro}
                    </p>
                    <p
                      className={`mt-8 border-l-2 pl-4 text-sm leading-relaxed italic ${
                        paper
                          ? "border-emerald-700/50 text-ink-soft"
                          : "border-emerald-500/50 text-slate-400"
                      }`}
                    >
                      {service.fit}
                    </p>
                  </div>
                  <ul className="grid content-start gap-4 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        data-reveal
                        className={`flex gap-3 rounded-xl border p-4 text-sm ${
                          paper
                            ? "border-ink-text/15 bg-paper-deep/60 text-ink-soft"
                            : "border-slate-800/70 bg-slate-900/30 text-slate-300"
                        }`}
                      >
                        <Check paper={paper} />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            </div>
          </section>
        );
      })}

      {/* Ink CTA */}
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-24 sm:pb-32">
        <div className="flex flex-col items-center border-t border-slate-800 pt-20 text-center">
          <RevealText
            as="h2"
            lines={[
              "Not sure which",
              <>
                one you{" "}
                <em className="font-accent font-normal italic">need?</em>
              </>,
            ]}
            className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02] font-bold tracking-tight text-white"
          />
          <p className="mx-auto mt-5 max-w-lg text-slate-400">
            That&apos;s normal — it&apos;s my job to figure that out with you.
            Describe the problem and I&apos;ll recommend the smallest solution
            that solves it.
          </p>
          <Magnetic strength={0.3} className="mt-8">
            <Link
              href="/contact"
              className="block rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
            >
              Describe your problem
            </Link>
          </Magnetic>
        </div>
      </div>
    </>
  );
}
