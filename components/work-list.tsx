"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  gsap,
  prefersReducedMotion,
  isFinePointer,
} from "@/components/site-motion/gsap";
import { useIsoLayoutEffect } from "@/components/site-motion/use-iso-layout-effect";

export type WorkListItem = {
  slug: string;
  title: string;
  category: string;
  year: string;
  live: boolean;
  demoUrl: string;
};

const PREVIEW_W = 352; // px — w-[22rem]
const PREVIEW_H = 220; // px — matches aspect ratio of the shots

/* Award-style work list: large rows (index / title / category / year)
   linking to case studies. On desktop, hovering a row reveals a
   floating preview of the project's real screenshot that trails the
   cursor within the section (gsap quickTo). On mobile every row shows
   a static thumbnail card instead. */
export default function WorkList({ items }: { items: WorkListItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview) return;
    if (
      prefersReducedMotion() ||
      !isFinePointer() ||
      !window.matchMedia("(min-width: 768px)").matches
    ) {
      return;
    }

    setEnabled(true);
    gsap.set(preview, { autoAlpha: 0, scale: 0.85 });
    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      xTo(e.clientX - r.left - PREVIEW_W / 2);
      yTo(e.clientY - r.top - PREVIEW_H / 2);
    };
    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      gsap.killTweensOf(preview);
      setEnabled(false);
    };
  }, []);

  useIsoLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview || !enabled) return;
    gsap.to(preview, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.85 : 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [active, enabled]);

  return (
    <div ref={sectionRef} className="relative">
      <ul className="border-t border-slate-800">
        {items.map((item, i) => (
          <li
            key={item.slug}
            className="group relative border-b border-slate-800"
            onMouseEnter={() => enabled && setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <Link
              href={`/projects/${item.slug}`}
              className="absolute inset-0 z-[1]"
              aria-label={`${item.title} — case study`}
            />

            {/* Static thumbnail card — mobile only */}
            <div className="pt-8 md:hidden">
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <Image
                  src={`/screens/${item.slug}.png`}
                  alt={`Screenshot of ${item.title}`}
                  width={1440}
                  height={900}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 py-8 transition-transform duration-300 md:grid md:grid-cols-[3.5rem_1fr_auto] md:items-center md:gap-x-8 md:py-10 md:group-hover:-translate-y-1">
              <span className="font-mono text-xs text-slate-500 md:text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300 sm:text-3xl md:text-[clamp(1.75rem,3.2vw,3rem)] md:leading-[1.05]">
                {item.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
                <span className="font-mono text-xs tracking-wide text-slate-500 uppercase">
                  {item.category}
                </span>
                <span className="font-mono text-xs text-slate-600">
                  {item.year}
                </span>
                {item.live ? (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] tracking-wide text-emerald-300 uppercase transition-colors hover:bg-emerald-500/20"
                  >
                    Live project
                  </a>
                ) : (
                  <Link
                    href={item.demoUrl}
                    className="relative z-10 rounded-full border border-slate-700 px-3 py-1 font-mono text-[10px] tracking-wide text-slate-400 uppercase transition-colors hover:border-slate-500 hover:text-slate-200"
                  >
                    Live demo
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Floating cursor-following preview — desktop only */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20 hidden h-[220px] w-[22rem] overflow-hidden rounded-lg border border-slate-700/60 opacity-0 shadow-2xl shadow-black/50 md:block"
      >
        {items.map((item, i) => (
          <Image
            key={item.slug}
            src={`/screens/${item.slug}.png`}
            alt=""
            width={1440}
            height={900}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
