"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  isCoarsePointer,
} from "./gsap";
import { useIsoLayoutEffect } from "./use-iso-layout-effect";
import { isInViewport, REVEAL_SAFETY_MS } from "./reveal-safety";

/* Wrap a section; every descendant carrying data-reveal fades in and
   rises as it enters the viewport (each element gets its own trigger,
   so staggering emerges from layout). Runs for EVERYONE — reveals are
   part of the design, not gated behind reduced-motion; under
   prefers-reduced-motion the rise is dropped and the fade shortens to
   0.3s. SSR renders everything visible, so JS-off users see a complete
   page; with JS on, globals.css pre-hides `[data-reveal]` inside the
   `data-reveal-root` scope until GSAP takes over, so nothing paints and
   then vanishes. */
export function SectionReveal({
  children,
  className = "",
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    const reduced = prefersReducedMotion();
    /* The trigger only STARTS the tween; the tween is not bound to it.
       A bound tween gets jumped to its end state whenever ScrollTrigger
       refreshes (which happens after client-side navigation, when the
       document height changes), so reveals after the first page visit
       froze on their first frame and then snapped. */
    const items = targets.map((t, i) => {
      gsap.set(t, reduced ? { autoAlpha: 0 } : { autoAlpha: 0, y });
      const tween = gsap.to(t, {
        autoAlpha: 1,
        y: 0,
        duration: reduced ? 0.3 : 0.9,
        ease: reduced ? "power1.out" : "power3.out",
        delay: (i % 4) * 0.06,
        paused: true,
      });
      const trigger = ScrollTrigger.create({
        trigger: t,
        start: "top 92%",
        once: true,
        onEnter: () => tween.play(),
      });
      return { tween, trigger };
    });

    /* Safety net: anything still hidden but on screen after the grace
       period plays its reveal regardless of its trigger. */
    const safety = window.setTimeout(() => {
      items.forEach(({ tween, trigger }) => {
        const target = tween.targets()[0] as Element;
        if (tween.progress() > 0 || !isInViewport(target)) return;
        trigger.kill();
        tween.play();
      });
    }, REVEAL_SAFETY_MS);

    return () => {
      window.clearTimeout(safety);
      items.forEach(({ tween, trigger }) => {
        trigger.kill();
        tween.kill();
      });
      gsap.set(targets, { clearProps: "opacity,visibility,transform" });
    };
  }, [y]);

  return (
    <div ref={ref} className={className} data-reveal-root>
      {children}
    </div>
  );
}

/* Gentle scroll parallax (y drift of ±amount %) for screenshots.
   Skipped on touch and under prefers-reduced-motion. */
export function Parallax({
  children,
  className = "",
  amount = 6,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const tween = gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: "transform" });
    };
  }, [amount]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
