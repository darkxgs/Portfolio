"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  prefersReducedMotion,
  isCoarsePointer,
} from "./gsap";
import { useIsoLayoutEffect } from "./use-iso-layout-effect";

/* Wrap a section; every descendant carrying data-reveal fades in and
   rises as it enters the viewport (each element gets its own trigger,
   so staggering emerges from layout). Runs for EVERYONE — reveals are
   part of the design, not gated behind reduced-motion. SSR renders
   everything visible, so JS-off users see a complete page. */
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

    const tweens = targets.map((t, i) =>
      gsap.fromTo(
        t,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 4) * 0.06,
          scrollTrigger: { trigger: t, start: "top 92%", once: true },
        },
      ),
    );

    return () => {
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill();
        tw.kill();
      });
      gsap.set(targets, { clearProps: "opacity,visibility,transform" });
    };
  }, [y]);

  return (
    <div ref={ref} className={className}>
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
