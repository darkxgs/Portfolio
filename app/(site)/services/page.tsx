import type { Metadata } from "next";
import Link from "next/link";
import Magnetic from "@/components/site-motion/magnetic";
import RevealText from "@/components/site-motion/reveal-text";
import { SectionReveal } from "@/components/site-motion/section-reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, automation and custom software for small businesses, by Seif Ashraf, a freelance full-stack developer in Cairo working with UK and Irish businesses.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    id: "websites",
    n: "01",
    label: "Business Websites",
    title: "A website customers can book, order or enquire from",
    intro:
      "For businesses whose website is slow on a phone, hasn't changed in years, or doesn't exist yet. Salad Store in Cairo is one I built: an Arabic-first site with one-tap English, where every dish opens WhatsApp with the order already written.",
    deliverables: [
      "A fast site in your brand, built for the phone first, because that is where most of your customers are",
      "Pages that lead somewhere: a booking, an order or an enquiry",
      "Booking, ordering or contact flows wired into how you already work, WhatsApp included",
      "Text you can edit yourself, so a price change does not need a developer",
      "Search-readable pages with structured data, so the site can be found",
    ],
    fit: "A good fit if customers say they “couldn’t find” something on your site, or if it hasn’t changed in years.",
  },
  {
    id: "automation",
    n: "02",
    label: "Business Automation",
    title: "Stop paying staff to do what software does better",
    intro:
      "For businesses where the same task is done by hand every day, like confirmations typed out one at a time or attendance copied into a salary sheet. In the workshop platform I built, salaries now compute from pasted attendance and an hourly rate; that used to be a monthly job done by hand.",
    deliverables: [
      "Reminders and confirmations that send themselves",
      "A CRM that records every lead and customer without anyone typing it in twice",
      "AI assistants that draft replies for a person to check and send",
      "Internal tools that replace the spreadsheet everyone edits",
      "Integrations between the tools you already pay for",
    ],
    fit: "A good fit if your team repeats the same digital task every day, or if things fall through the cracks between tools.",
  },
  {
    id: "software",
    n: "03",
    label: "Custom Software",
    title: "Custom software for the process off-the-shelf tools can't handle",
    intro:
      "For businesses that have outgrown generic tools. Car Engineering Center is the example: four workshop branches on one system, with reception, work orders, live floor tracking, customer history and payroll built around how they already worked.",
    deliverables: [
      "Dashboards with the numbers you check every morning",
      "Management systems for bookings, orders, patients, cases, or inventory",
      "Customer-facing pages, like a QR on an invoice that shows a customer their car's status",
      "SaaS products, from first prototype to billing",
      "A database and backend that will still make sense in three years",
    ],
    fit: "A good fit if you’ve bent an off-the-shelf tool past its limits, or if your “system” is a folder of spreadsheets.",
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
      className={`mt-1 shrink-0 ${paper ? "text-accent-700" : "text-accent-400"}`}
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
        <p className="font-mono text-xs tracking-widest text-accent-400 uppercase sm:text-sm">
          Services
        </p>
        <RevealText
          as="h1"
          mode="load"
          lines={[
            "Three ways I help",
            <>
              businesses{" "}
              <em className="font-accent font-normal text-accent-400 italic">
                grow
              </em>
            </>,
          ]}
          className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-white"
        />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
          Every engagement starts with the problem you describe, and the
          solution usually takes one of these three shapes.
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
                  paper ? "border-ink-text/15" : "border-ground-800"
                }`}
              >
                <span
                  className={`font-mono text-sm ${paper ? "text-accent-700" : "text-accent-400"}`}
                >
                  {service.n}
                </span>
                <span
                  className={`font-mono text-sm tracking-widest uppercase ${
                    paper ? "text-ink-faint" : "text-slate-400"
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
                          ? "border-accent-700/50 text-ink-soft"
                          : "border-accent-500/50 text-slate-400"
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
                            : "border-ground-800/70 bg-ground-900/30 text-slate-300"
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
        <div className="flex flex-col items-center border-t border-ground-800 pt-20 text-center">
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
            That&apos;s normal, and working it out with you is part of the
            job. Describe the problem and I&apos;ll recommend the smallest
            solution that solves it.
          </p>
          <Magnetic strength={0.3} className="mt-8">
            <Link
              href="/contact"
              className="block rounded-full bg-accent-500 px-7 py-3.5 text-sm font-medium text-ground-950 transition-colors hover:bg-accent-400"
            >
              Describe your problem
            </Link>
          </Magnetic>
        </div>
      </div>
    </>
  );
}
