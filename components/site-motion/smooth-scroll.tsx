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
   (site) layout only, so the demos are untouched.

   Policy: Lenis runs for ALL fine-pointer users. prefers-reduced-motion
   does NOT disable it — it only raises the lerp to ~0.18 for a subtler
   glide. Coarse (touch) pointers keep native scrolling, which is
   already smooth. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (isCoarsePointer()) return;

    const lenis = new Lenis({
      lerp: prefersReducedMotion() ? 0.18 : 0.1,
      anchors: true,
    });
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
