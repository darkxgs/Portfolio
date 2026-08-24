import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, business automation, and custom software — built by Seif Ashraf, Full Stack Developer.",
};

const services = [
  {
    id: "websites",
    label: "01 · Business Websites",
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
    label: "02 · Business Automation",
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
    label: "03 · Custom Software",
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

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <p className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
        Services
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Three ways I help businesses grow
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
        Every engagement starts with your problem, not with a product list.
        These are the three shapes the solution usually takes.
      </p>

      <div className="mt-16 space-y-16">
        {services.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-24 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10"
          >
            <p className="font-mono text-sm text-emerald-400">{service.label}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {service.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
              {service.intro}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 text-emerald-400" aria-hidden="true">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-emerald-500/50 pl-4 text-sm leading-relaxed text-slate-400 italic">
              {service.fit}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Not sure which one you need?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          That&apos;s normal — it&apos;s my job to figure that out with you.
          Describe the problem and I&apos;ll recommend the smallest solution
          that solves it.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
        >
          Describe your problem
        </Link>
      </div>
    </div>
  );
}
