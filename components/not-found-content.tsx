import Link from "next/link";

const destinations = [
  { href: "/", label: "Home", note: "Start again from the top." },
  {
    href: "/projects",
    label: "Projects",
    note: "Two production systems, one concept rebuild and five demos.",
  },
  {
    href: "/demos",
    label: "Demos",
    note: "Five interactive demos you can click through in your browser.",
  },
  {
    href: "/contact",
    label: "Contact",
    note: "Tell me what slows your business down.",
  },
];

/* Shared body of the 404 page. app/not-found.tsx wraps it in the site nav and
   footer for unmatched URLs; app/(site)/not-found.tsx renders it bare because
   the (site) layout already provides both. */
export default function NotFoundContent() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <p className="font-mono text-xs tracking-widest text-accent-400 uppercase sm:text-sm">
        404
      </p>
      <h1 className="mt-4 font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] font-bold tracking-tight text-white">
        Nothing at
        <br />
        <em className="font-accent font-normal italic">this address.</em>
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
        The page you asked for does not exist, or it has moved. These four do.
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {destinations.map((d, i) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="group flex items-start gap-4 rounded-2xl border border-ground-800 bg-ground-900/40 p-6 transition-colors hover:border-accent-500/40"
            >
              <span className="font-mono text-sm text-accent-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-display text-xl font-bold text-white transition-colors group-hover:text-accent-300">
                  {d.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-400">
                  {d.note}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
