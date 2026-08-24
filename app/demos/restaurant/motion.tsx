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
 * Wraps the restaurant website and powers the `[data-reveal]` system with a
 * single IntersectionObserver.
 *
 * - Server HTML renders everything visible (no `.js-motion` gate class yet),
 *   so no-JS visitors and crawlers see the full page.
 * - On mount — only when JS runs AND the user allows motion — the gate class
 *   is added, hiding `[data-reveal]` elements via CSS, and each one is
 *   revealed once when it enters the viewport (then unobserved).
 * - A MutationObserver watches for `[data-reveal]` elements added after
 *   mount (the menu grid re-renders when the category changes), so swapped
 *   menu cards cascade in too instead of staying hidden.
 * - After a reveal finishes, the reveal machinery is stripped from the
 *   element so hover transitions (e.g. `.tb-lift`) behave normally.
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

    // Pick up reveal targets rendered after mount (e.g. switching menu
    // category swaps the card grid). Re-observing a node is a no-op.
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
 * body scrolling.
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

/**
 * Subtle hero parallax: the returned ref goes on the hero's background image
 * (an absolutely-positioned child of the hero section). While the hero is on
 * screen the image drifts down slower than the scroll, capped at ~40px.
 * Skipped entirely on touch devices, small screens and reduced motion.
 */
export function useHeroParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 768) return;

    const section = el.parentElement;
    if (!section) return;

    const SCALE = 1.12;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      // The image is scaled up, giving it (height * (SCALE - 1)) / 2 of
      // headroom before its top edge would become visible.
      const headroom = (rect.height * (SCALE - 1)) / 2;
      const shift = Math.min(40, headroom, Math.max(0, -rect.top) * 0.3);
      el.style.transform = `translate3d(0, ${shift}px, 0) scale(${SCALE})`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    el.style.transform = `translate3d(0, 0, 0) scale(${SCALE})`;
    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      el.style.transform = "";
    };
  }, []);

  return ref;
}
