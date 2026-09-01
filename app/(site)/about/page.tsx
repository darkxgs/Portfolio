import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "@/components/site-motion/magnetic";
import RevealText from "@/components/site-motion/reveal-text";
import { SectionReveal } from "@/components/site-motion/section-reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Seif Ashraf, freelance full-stack developer in Cairo working with UK and Irish small businesses. Two systems in production; bilingual Arabic/English builds a specialty.",
  alternates: { canonical: "/about" },
};

const specialties = [
  {
    name: "Back-office systems",
    description:
      "Car Engineering Center: reception, work orders, floor tracking and payroll for four workshop branches, every screen refreshed every half second.",
  },
  {
    name: "Bilingual Arabic/English websites",
    description:
      "Salad Store: an Arabic-first ordering site for a Cairo salad bar, one tap to English, every dish opening WhatsApp with the order pre-filled.",
  },
  {
    name: "Customer-facing tracking",
    description:
      "The Car Engineering Center digital service book: a QR on every invoice that lets the customer watch their car's status on their phone, no login.",
  },
];

const principles = [
  {
    title: "Business first, technology second",
    description:
      "A project succeeds when it changes a number the business cares about, like bookings kept or hours of admin saved. The stack is a means to that end.",
  },
  {
    title: "Honest advice",
    description:
      "If a simpler or cheaper option will solve your problem, I will tell you. I would rather lose a project than recommend the wrong thing.",
  },
  {
    title: "Ship early, improve often",
    description:
      "You see working software in the first weeks, not after months. Short cycles mean we can adjust before anything gets expensive.",
  },
];

export default function About() {
  return (
    <>
      {/* Ink hero + intro */}
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-20 sm:pt-36 sm:pb-24">
        <p className="font-mono text-xs tracking-widest text-accent-400 uppercase sm:text-sm">
          About
        </p>
        <RevealText
          as="h1"
          mode="load"
          lines={[
            "Seif Ashraf.",
            "I build the systems",
            <>
              small businesses{" "}
              <em className="font-accent font-normal italic">run on.</em>
            </>,
          ]}
          className="mt-4 font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.98] font-bold tracking-tight text-white"
        />
        <SectionReveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-start">
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-slate-400">
              <p data-reveal>
                I&apos;m a freelance full-stack developer in Cairo, and I work
                with small businesses in the UK and Ireland. Two of my systems
                are in production today. Car Engineering Center is an
                Arabic-first workshop management platform used every day across
                four branches in Amarah, Iraq: reception, work orders, live
                floor tracking, customer history and payroll on one system.
                Salad Store is a bilingual ordering website for a salad bar in
                Heliopolis, Cairo, where every dish opens WhatsApp with the
                order already written.
              </p>
              <p data-reveal>
                Arabic-first and bilingual Arabic/English builds with proper
                right-to-left layout are a specialty. The workshop platform is
                Arabic and RTL throughout; Salad Store and the Blue Sky concept
                switch between Arabic and English with one tap. I work in
                TypeScript on Next.js and React, with Supabase or PostgreSQL
                behind it and Tailwind CSS in front.
              </p>
              <p data-reveal>
                I work in short cycles. You see working software in the first
                weeks rather than a big reveal at the end, and we adjust while
                changes are still cheap.
              </p>
            </div>
            <figure
              data-reveal
              className="relative overflow-hidden rounded-3xl border border-ground-800"
            >
              <Image
                src="/seif-portrait.webp"
                alt="Portrait of Seif Ashraf"
                width={470}
                height={600}
                sizes="(min-width:1024px) 520px, 100vw"
                className="w-full object-cover saturate-[0.85]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ground-950/70 via-transparent to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-4 left-5 font-mono text-xs tracking-widest text-slate-300 uppercase">
                Seif Ashraf — Cairo
              </figcaption>
            </figure>
          </div>
        </SectionReveal>
      </div>

      {/* Paper specialties section */}
      <section className="bg-paper text-ink-text">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-accent-700">01</span>
            <RevealText
              as="h2"
              lines={[
                <>
                  What I{" "}
                  <em className="font-accent font-normal italic">
                    specialise
                  </em>{" "}
                  in
                </>,
              ]}
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-ink-text"
            />
          </div>
          <SectionReveal>
            <div className="mt-10 grid gap-5 border-t border-ink-text/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {specialties.map((s) => (
                <div
                  key={s.name}
                  data-reveal
                  className="rounded-2xl border border-ink-text/15 bg-paper-deep/60 p-6 transition-colors hover:border-accent-700/40"
                >
                  <h3 className="font-display font-bold text-ink-text">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Ink principles + CTA */}
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <section>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-accent-400">02</span>
            <RevealText
              as="h2"
              lines={["How I think about projects"]}
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white"
            />
          </div>
          <SectionReveal>
            <div className="mt-10 grid gap-10 border-t border-ground-800 pt-10 md:grid-cols-3">
              {principles.map((p, i) => (
                <div key={p.title} data-reveal>
                  <p className="font-mono text-sm text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </section>

        <div className="mt-28 flex flex-col items-center rounded-3xl border border-ground-800 bg-ground-900/40 p-10 text-center sm:p-16">
          <RevealText
            as="h2"
            lines={[
              "Let's talk about",
              <>
                your{" "}
                <em className="font-accent font-normal italic">business</em>
              </>,
            ]}
            className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-bold tracking-tight text-white"
          />
          <p className="mx-auto mt-5 max-w-lg text-slate-400">
            A short conversation is enough to know whether I can help. No
            commitment, no sales pitch.
          </p>
          <Magnetic strength={0.3} className="mt-8">
            <Link
              href="/contact"
              className="block rounded-full bg-accent-500 px-7 py-3.5 text-sm font-medium text-ground-950 transition-colors hover:bg-accent-400"
            >
              Get in touch
            </Link>
          </Magnetic>
        </div>
      </div>
    </>
  );
}
