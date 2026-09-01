"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, isFinePointer } from "@/components/site-motion/gsap";
import { useIsoLayoutEffect } from "@/components/site-motion/use-iso-layout-effect";

export type WorkListItem = {
  slug: string;
  title: string;
  category: string;
  year: string;
  kind: "live" | "demo" | "concept" | "production";
  /* Empty for "production" systems, which have no public link. */
  demoUrl: string;
  /* Per-project brand tint (hex) — dot, hover accents, preview ring. */
  accent: string;
};

const PREVIEW_W = 352; // px — w-[22rem]
const PREVIEW_H = 220; // px — matches aspect ratio of the shots

/* The hover preview exists only for fine pointers at md and up (the
   same condition the effect below checks); everywhere else, including
   coarse-pointer tablets wider than md, the rows show static thumbnails
   so every device sees a project image. Full class strings, because
   Tailwind's scanner only picks up complete tokens. */
const THUMB_VISIBILITY = "[@media(pointer:fine)_and_(min-width:768px)]:hidden";
const PREVIEW_VISIBILITY = "[@media(pointer:fine)_and_(min-width:768px)]:block";

/* Award-style work list: large rows (index / title / category / year)
   linking to case studies. On desktop, hovering a row reveals a
   floating preview of the project's real screenshot that trails the
   cursor within the section (gsap quickTo). On touch devices every row
   shows a static thumbnail card instead. Keyboard focus on a row
   (focus-within) mirrors the hover state.

   tone="paper" renders the ink-on-paper variant used on the light
   sections; hovering a row shifts index, chip border, and preview
   ring to that project's own brand tint, and (on paper) sweeps an
   accent underline beneath the title. */
export default function WorkList({
  items,
  tone = "dark",
}: {
  items: WorkListItem[];
  tone?: "dark" | "paper";
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  const paper = tone === "paper";

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview) return;
    /* Hover preview is pointer feedback — it runs regardless of
       prefers-reduced-motion; only touch/narrow layouts skip it. */
    if (!isFinePointer() || !window.matchMedia("(min-width: 768px)").matches) {
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

  const rowBorder = paper ? "border-ink-text/15" : "border-ground-800";
  const indexColor = paper ? "text-ink-faint" : "text-slate-400";
  const titleColor = paper
    ? "text-ink-text"
    : "text-white group-hover:text-accent-300 group-focus-within:text-accent-300";
  const metaColor = paper ? "text-ink-faint" : "text-slate-400";
  const yearColor = paper ? "text-ink-faint/80" : "text-slate-500";
  const liveChip = paper
    ? "border-accent-700/40 bg-accent-700/10 text-accent-800 hover:bg-accent-700/15"
    : "border-accent-500/40 bg-accent-500/10 text-accent-300 hover:bg-accent-500/20";
  /* Hover accents, repeated for keyboard focus within the row. */
  const accentText =
    "group-hover:text-[color:var(--row-accent)] group-focus-within:text-[color:var(--row-accent)]";
  const accentBorder =
    "group-hover:border-[color:var(--row-accent)] group-focus-within:border-[color:var(--row-accent)]";
  const demoChip = paper
    ? "border-ink-text/25 text-ink-soft hover:border-ink-text/50 hover:text-ink-text"
    : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200";

  return (
    <div ref={sectionRef} className="relative">
      <ul className={`border-t ${rowBorder}`}>
        {items.map((item, i) => (
          <li
            key={item.slug}
            className={`group relative border-b ${rowBorder}`}
            style={{ "--row-accent": item.accent } as CSSProperties}
            onMouseEnter={() => enabled && setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <Link
              href={`/projects/${item.slug}`}
              className="absolute inset-0 z-[1]"
              aria-label={`${item.title} — case study`}
            />

            {/* Static thumbnail card — every device without the hover preview */}
            <div className={`pt-8 ${THUMB_VISIBILITY}`}>
              <div className={`overflow-hidden rounded-xl border ${rowBorder}`}>
                <Image
                  src={`/screens/${item.slug}.png`}
                  alt={`Screenshot of ${item.title}`}
                  width={1440}
                  height={900}
                  sizes="100vw"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 py-8 transition-transform duration-300 md:grid md:grid-cols-[3.5rem_1fr_auto] md:items-center md:gap-x-8 md:py-10 md:group-hover:-translate-y-1 md:group-focus-within:-translate-y-1">
              <span className="flex items-center gap-2">
                {/* Always-visible brand-tint dot */}
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.accent }}
                />
                <span
                  className={`font-mono text-xs transition-colors duration-300 md:text-sm ${accentText} ${indexColor}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3
                className={`font-display text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-3xl md:text-[clamp(1.75rem,3.2vw,3rem)] md:leading-[1.05] ${titleColor}`}
              >
                <span className="relative inline-block">
                  {item.title}
                  {paper && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[color:var(--row-accent)] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100"
                    />
                  )}
                </span>
              </h3>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
                <span
                  className={`font-mono text-xs tracking-wide uppercase ${metaColor}`}
                >
                  {item.category}
                </span>
                <span className={`font-mono text-xs ${yearColor}`}>
                  {item.year}
                </span>
                {item.kind === "production" ? (
                  /* Real system in daily use with no public URL: a plain chip, not a link. */
                  <span
                    className={`relative z-10 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide uppercase transition-colors duration-300 ${accentBorder} ${liveChip}`}
                  >
                    In production
                  </span>
                ) : item.kind !== "demo" ? (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-10 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide uppercase transition-colors duration-300 ${accentBorder} ${liveChip}`}
                  >
                    {item.kind === "live" ? "Live project" : "Concept · live"}
                  </a>
                ) : (
                  <Link
                    href={item.demoUrl}
                    className={`relative z-10 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide uppercase transition-colors duration-300 ${accentBorder} ${demoChip}`}
                  >
                    Interactive demo
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Floating cursor-following preview — fine pointers at md+ only,
          so touch devices never download the preview images.
          Frame ring takes the hovered project's brand tint. */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 z-20 hidden h-[220px] w-[22rem] overflow-hidden rounded-lg border-2 opacity-0 shadow-2xl shadow-black/50 transition-[border-color] duration-300 ${PREVIEW_VISIBILITY}`}
        style={{
          borderColor:
            active !== null ? items[active].accent : "rgb(51 65 85 / 0.6)",
        }}
      >
        {items.map((item, i) => (
          <Image
            key={item.slug}
            src={`/screens/${item.slug}.png`}
            alt=""
            width={1440}
            height={900}
            sizes="352px"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
