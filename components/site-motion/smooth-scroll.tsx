"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  isCoarsePointer,
} from "./gsap";

/* Lenis smooth scroll driving GSAP ScrollTrigger — the setup the
   Awwwards-winning freelance portfolios actually run. Mounted in the
   (site) layout only, so the demos are untouched. Disabled for
   prefers-reduced-motion and coarse (touch) pointers, where native
   scrolling is the better experience. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion() || isCoarsePointer()) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", () => ScrollTrigger.update());

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
