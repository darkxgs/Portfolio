import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div>
          <p className="text-sm font-medium text-white">Seif Ashraf</p>
          <p className="mt-1 text-sm text-slate-500">
            Full Stack Developer · Websites, software &amp; automation
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
          <Link href="/projects" className="transition-colors hover:text-white">
            Projects
          </Link>
          <Link href="/services" className="transition-colors hover:text-white">
            Services
          </Link>
          <a
            href="mailto:seifdarkx@gmail.com"
            className="transition-colors hover:text-white"
          >
            seifdarkx@gmail.com
          </a>
          <a
            href="https://wa.me/201069896831"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/seif_ashrafg/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
