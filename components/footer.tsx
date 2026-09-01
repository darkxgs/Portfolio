import Link from "next/link";
import Magnetic from "@/components/site-motion/magnetic";
import LocalTime from "@/components/local-time";

const sitemap = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/demos", label: "Demos" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ground-800/80">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 sm:pt-28">
        <p className="font-mono text-xs tracking-widest text-accent-400 uppercase">
          Next step
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-10">
          <h2 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-white">
            Let&apos;s work
            <br />
            <em className="font-accent font-normal italic">together</em>
          </h2>
          <Magnetic strength={0.3}>
            <Link
              href="/contact"
              className="flex h-36 w-36 items-center justify-center rounded-full bg-accent-500 p-4 text-center text-sm font-medium text-ground-950 transition-colors hover:bg-accent-400 sm:h-44 sm:w-44"
            >
              Get in touch
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="ml-2"
              >
                <path
                  d="M2 12L12 2M12 2H4M12 2v8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Magnetic>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Magnetic strength={0.25}>
            <a
              href="mailto:hello@seifashraf.dev"
              className="block rounded-full border border-slate-700 px-6 py-3 font-mono text-sm text-slate-200 transition-colors hover:border-accent-500/50 hover:text-white"
            >
              hello@seifashraf.dev
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="https://wa.me/201069896831"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full border border-slate-700 px-6 py-3 font-mono text-sm text-slate-200 transition-colors hover:border-accent-500/50 hover:text-white"
            >
              WhatsApp
            </a>
          </Magnetic>
        </div>

        <div className="mt-20 grid gap-10 border-t border-ground-800/80 pt-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
              Sitemap
            </p>
            <ul className="mt-4 space-y-2">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
              Socials
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:hello@seifashraf.dev"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201069896831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/seif_ashrafg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/seifashraf-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
              Local time
            </p>
            <p className="mt-4">
              <LocalTime />
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            <span className="font-medium text-slate-400">Seif Ashraf</span> —
            Full Stack Developer · Websites, software &amp; automation
          </p>
          <p className="font-mono">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
