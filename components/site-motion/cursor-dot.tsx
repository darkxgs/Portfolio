"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, isFinePointer } from "./gsap";

/* Small emerald dot trailing the pointer (gsap quickTo), scaling up
   over links and buttons. Pure garnish — hidden on touch, hidden with
   JS off, removed under prefers-reduced-motion. */
export default function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !isFinePointer()) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3.out" });

    let shown = false;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.to(el, { autoAlpha: 0.9, duration: 0.25 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const overLink = Boolean(
        (e.target as Element | null)?.closest?.(
          "a, button, [role='button'], input, textarea",
        ),
      );
      if (overLink !== hovering) {
        hovering = overLink;
        gsap.to(el, {
          scale: overLink ? 3.4 : 1,
          opacity: overLink ? 0.35 : 0.9,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    };
    const onLeave = () => {
      shown = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] h-2.5 w-2.5 rounded-full bg-accent-400 opacity-0 max-md:hidden"
    />
  );
}
