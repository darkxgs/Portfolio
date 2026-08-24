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
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/201069896831"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-emerald-500/50 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-emerald-400">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.3 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
                </svg>
                WhatsApp · +20 106 989 6831
              </a>
              <a
                href="https://www.instagram.com/seif_ashrafg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-emerald-500/50 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="text-emerald-400">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                </svg>
                @seif_ashrafg
              </a>
            </div>
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
