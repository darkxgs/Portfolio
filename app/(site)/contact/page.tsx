import type { Metadata } from "next";
import Magnetic from "@/components/site-motion/magnetic";
import RevealText from "@/components/site-motion/reveal-text";
import { SectionReveal } from "@/components/site-motion/section-reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Seif Ashraf — Full Stack Developer. Describe your problem and get an honest recommendation.",
};

const steps = [
  {
    n: "1",
    title: "You describe the problem",
    description:
      "A few sentences about your business and what slows it down. No technical language needed.",
  },
  {
    n: "2",
    title: "I reply within 24 hours",
    description:
      "With honest first thoughts: whether software can help, roughly what it would involve, and what I&apos;d need to know.",
  },
  {
    n: "3",
    title: "We talk it through",
    description:
      "A short call to align on scope and outcome. You get a clear written proposal — fixed scope, no surprises.",
  },
];

function HoverArrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-400"
    >
      <path
        d="M4 12h16m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase sm:text-sm">
        Contact
      </p>
      <RevealText
        as="h1"
        mode="load"
        lines={[
          "Let's work",
          <em key="accent" className="font-accent font-normal italic">
            together.
          </em>,
        ]}
        className="mt-4 font-display text-[clamp(3.25rem,10vw,9rem)] leading-[0.92] font-bold tracking-tight text-white"
      />

      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            Tell me what slows your business down.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
            The best first message isn&apos;t &quot;I need a website&quot; —
            it&apos;s &quot;here&apos;s what&apos;s costing us time or
            customers.&quot; Start there, and I&apos;ll take it seriously.
          </p>

          <Magnetic strength={0.3} className="mt-10">
            <a
              href="mailto:seifdarkx@gmail.com?subject=Project%20enquiry"
              className="flex h-44 w-44 flex-col items-center justify-center gap-1 rounded-full bg-emerald-500 p-6 text-center text-slate-950 transition-colors hover:bg-emerald-400 sm:h-52 sm:w-52"
            >
              <span className="text-base font-medium">Email me</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 12L12 2M12 2H4M12 2v8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Magnetic>
          <p className="mt-6 text-sm text-slate-500">
            Direct email — no forms, no auto-responders. I read every message.
          </p>

          {/* Channel rows */}
          <SectionReveal>
            <div className="mt-12 border-t border-slate-800">
              <a
                href="mailto:seifdarkx@gmail.com?subject=Project%20enquiry"
                data-reveal
                className="group flex items-center justify-between gap-4 border-b border-slate-800 py-5 transition-colors hover:bg-slate-900/40"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-slate-500">01</span>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="font-mono text-sm text-slate-400">
                      seifdarkx@gmail.com
                    </p>
                  </div>
                </div>
                <HoverArrow />
              </a>
              <a
                href="https://wa.me/201069896831"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group flex items-center justify-between gap-4 border-b border-slate-800 py-5 transition-colors hover:bg-slate-900/40"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-slate-500">02</span>
                  <div>
                    <p className="font-medium text-white">WhatsApp</p>
                    <p className="font-mono text-sm text-slate-400">
                      +20 106 989 6831
                    </p>
                  </div>
                </div>
                <HoverArrow />
              </a>
              <a
                href="https://www.instagram.com/seif_ashrafg/"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group flex items-center justify-between gap-4 border-b border-slate-800 py-5 transition-colors hover:bg-slate-900/40"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-slate-500">03</span>
                  <div>
                    <p className="font-medium text-white">Instagram</p>
                    <p className="font-mono text-sm text-slate-400">
                      @seif_ashrafg
                    </p>
                  </div>
                </div>
                <HoverArrow />
              </a>
              <a
                href="https://www.linkedin.com/in/seifashraf-dev/"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group flex items-center justify-between gap-4 border-b border-slate-800 py-5 transition-colors hover:bg-slate-900/40"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-slate-500">04</span>
                  <div>
                    <p className="font-medium text-white">LinkedIn</p>
                    <p className="font-mono text-sm text-slate-400">
                      /in/seifashraf-dev
                    </p>
                  </div>
                </div>
                <HoverArrow />
              </a>
            </div>
          </SectionReveal>
        </div>

        <div className="h-fit rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10">
          <h2 className="font-display text-lg font-bold text-white">
            What happens next
          </h2>
          <div className="mt-8 space-y-8">
            {steps.map((step) => (
              <div key={step.n} className="flex gap-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 font-mono text-sm text-emerald-400">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-medium text-white">{step.title}</h3>
                  <p
                    className="mt-1.5 text-sm leading-relaxed text-slate-400"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
