"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import { useIsoLayoutEffect } from "./use-iso-layout-effect";
import { isInViewport, REVEAL_SAFETY_MS } from "./reveal-safety";

type Props = {
  /* Each entry renders as one masked line (overflow-hidden wrapper).
     Entries may be rich nodes (e.g. an italic accent word). */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  /* "load" animates immediately on mount (hero); "scroll" waits for
     the element to enter the viewport. */
  mode?: "load" | "scroll";
  delay?: number;
  stagger?: number;
};

/* Line-mask text reveal: translateY(120%) -> 0 inside overflow-hidden
   line wrappers, 1.1s power4.out, ~90ms stagger. Runs for EVERYONE —
   reveals are core to the design, not a reduced-motion casualty; under
   prefers-reduced-motion the slide becomes a 0.3s opacity fade.

   SSR-safe: the server renders the text plainly; with JS off nothing
   is ever hidden. With JS on, globals.css pre-hides the lines (via the
   `data-reveal-text` scope and the `html.js` class set before paint) so
   the text never paints, vanishes and re-animates. GSAP then takes over
   with explicit values (y: 0 + yPercent) so the CSS transform is never
   added on top of its own. */
export default function RevealText({
  lines,
  as = "div",
  className = "",
  lineClassName = "",
  mode = "scroll",
  delay = 0,
  stagger = 0.09,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal-line]");
    if (targets.length === 0) return;

    const reduced = prefersReducedMotion();
    let vars: gsap.TweenVars;
    if (reduced) {
      gsap.set(targets, { autoAlpha: 0 });
      vars = { autoAlpha: 1, duration: 0.3, ease: "power1.out", stagger, delay };
    } else {
      /* y: 0 explicitly — GSAP would otherwise read the CSS pre-hide
         translateY(120%) as a pixel offset and stack yPercent on top. */
      gsap.set(targets, { y: 0, yPercent: 120 });
      vars = { yPercent: 0, duration: 1.1, ease: "power4.out", stagger, delay };
    }
    /* In scroll mode the trigger only starts the (paused) tween; binding
       the tween to the trigger lets a ScrollTrigger refresh (e.g. after
       client-side navigation) jump it straight to its end state. */
    const tween = gsap.to(targets, { ...vars, paused: mode === "scroll" });
    const trigger =
      mode === "scroll"
        ? ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => tween.play(),
          })
        : null;

    /* Safety net: if the element is on screen but its trigger never
       fired, play the reveal anyway rather than leave the text hidden. */
    const safety = window.setTimeout(() => {
      if (tween.progress() > 0 || !isInViewport(el)) return;
      trigger?.kill();
      tween.play();
    }, REVEAL_SAFETY_MS);

    return () => {
      window.clearTimeout(safety);
      trigger?.kill();
      tween.kill();
      gsap.set(targets, { clearProps: "transform,opacity,visibility" });
    };
  }, [mode, delay, stagger]);

  const Tag = as as "div";

  return (
    <Tag ref={ref as Ref<HTMLDivElement>} className={className} data-reveal-text>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            data-reveal-line
            className={`block will-change-transform ${lineClassName}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
