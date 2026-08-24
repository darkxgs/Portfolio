"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "@/components/site-motion/magnetic";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? "bg-slate-950" /* no backdrop-filter while the overlay is open — a filter would become the containing block for the fixed overlay */
          : scrolled
            ? /* ink translucent — keeps the nav legible over both the
                 dark and the paper sections it overlays */
              "border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-slate-950/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20">
        <Link
          href="/"
          className="relative z-50 flex items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-mono text-sm text-emerald-400">&lt;/&gt;</span>
          <span className="font-display text-base font-semibold tracking-tight text-white">
            Seif Ashraf
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Magnetic key={link.href} strength={0.3}>
              <Link
                href={link.href}
                className="block px-3 py-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </Magnetic>
          ))}
          <Magnetic strength={0.3} className="ml-3">
            <Link
              href="/contact"
              className="block rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400"
            >
              Start a project
            </Link>
          </Magnetic>
        </nav>

        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center text-slate-300 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Full-screen mobile overlay with staggered large-type reveal */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-slate-950 px-8 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">
          Navigation
        </p>
        <nav className="mt-6 flex flex-col gap-2">
          {[...links, { href: "/contact", label: "Contact" }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={`flex items-baseline gap-4 py-2 transition-[opacity,transform] duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <span className="font-mono text-sm text-emerald-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-5xl font-bold tracking-tight text-white">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <div
          className={`mt-12 flex flex-col gap-2 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: open ? "480ms" : "0ms" }}
        >
          <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">
            Get in touch
          </p>
          <a
            href="mailto:seifdarkx@gmail.com"
            tabIndex={open ? 0 : -1}
            className="text-sm text-slate-300"
          >
            seifdarkx@gmail.com
          </a>
        </div>
      </div>
    </header>
  );
}
