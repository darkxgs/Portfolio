import type { Metadata } from "next";

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

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Tell me what slows your business down.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
            The best first message isn&apos;t &quot;I need a website&quot; —
            it&apos;s &quot;here&apos;s what&apos;s costing us time or
            customers.&quot; Start there, and I&apos;ll take it seriously.
          </p>

          <div className="mt-10">
            <a
              href="mailto:seifdarkx@gmail.com?subject=Project%20enquiry"
              className="inline-block rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-slate-950 transition-colors hover:bg-emerald-400"
            >
              seifdarkx@gmail.com
            </a>
            <p className="mt-4 text-sm text-slate-500">
              Direct email — no forms, no auto-responders. I read every message.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10">
          <h2 className="text-lg font-semibold text-white">What happens next</h2>
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
