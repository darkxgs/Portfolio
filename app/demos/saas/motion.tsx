"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Inline stagger helper for reveal children: consecutive cards in a grid get
 * `revealDelay(i)` so they cascade in ~80ms apart. Computed at render time
 * from static data, so server and client markup always match.
 */
export function revealDelay(index: number, stepMs = 80): CSSProperties {
  return { "--reveal-delay": `${index * stepMs}ms` } as CSSProperties;
}

interface MotionRootProps {
  className?: string;
  children: ReactNode;
}

/**
 * Wraps the Metricly product site and powers the `[data-reveal]` system with
 * a single IntersectionObserver.
 *
 * - Server HTML renders everything visible (no `.js-motion` gate class yet),
 *   so no-JS visitors and crawlers see the full page.
 * - On mount — only when JS runs AND the user allows motion — the gate class
 *   is added, hiding `[data-reveal]` elements via CSS, and each one is
 *   revealed once when it enters the viewport (then unobserved).
 * - A MutationObserver watches for `[data-reveal]` elements added after
 *   mount, so content swapped in later cascades too instead of staying
 *   hidden.
 * - After a reveal finishes, the reveal machinery is stripped from the
 *   element so hover transitions (e.g. `.mc-lift`) behave normally.
 */
export function MotionRoot({ className, children }: MotionRootProps) {
  const ref = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.classList.add("js-motion");
    const timers: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-revealed");
          observer.unobserve(el);
          // Once the entrance transition (0.65s + up to ~0.5s stagger) is
          // done, drop the reveal attribute/class so the element is a plain
          // node again and hover effects use their own timings.
          timers.push(
            window.setTimeout(() => {
              el.removeAttribute("data-reveal");
              el.classList.remove("is-revealed");
              el.style.removeProperty("--reveal-delay");
            }, 1400),
          );
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -4% 0px" },
    );

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => observer.observe(el));

    // Pick up reveal targets rendered after mount. Re-observing is a no-op.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]")) observer.observe(node);
          node
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach((el) => observer.observe(el));
        });
      }
    });
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      root.classList.remove("js-motion");
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Lenis-style eased wheel scrolling: wheel input drives a target position and
 * a rAF loop lerps the real scroll toward it, giving the page a smooth,
 * inertial feel. Native scrollbar drags, keyboard, and touch stay untouched;
 * a pointerdown (e.g. grabbing the scrollbar) cancels any in-flight glide.
 * Skipped for touch devices, reduced motion, and while an overlay has locked
 * body scrolling. Mounted by MotionRoot, so it is active on the SITE view
 * only — the app view keeps native scrolling.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let target = 0;
    let current = 0;
    let raf = 0;
    let gliding = false;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      gliding = false;
    };

    const tick = () => {
      current += (target - current) * 0.11;
      if (Math.abs(target - current) < 0.6) {
        window.scrollTo(0, target);
        stop();
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // browser zoom gesture
      if (document.body.style.overflow === "hidden") return; // overlay open
      // Let horizontal-scroll regions (fragment cards, tables) consume
      // their own wheel-driven horizontal deltas.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      e.preventDefault();
      if (!gliding) {
        current = window.scrollY;
        target = window.scrollY;
      }
      target = Math.max(0, Math.min(maxScroll(), target + delta));
      if (!gliding) {
        gliding = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onPointerDown = () => stop();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);
}
