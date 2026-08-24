"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { gsap } from "./gsap";
import { useIsoLayoutEffect } from "./use-iso-layout-effect";

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
   reveals are core to the design, not a reduced-motion casualty.
   SSR-safe: the server renders the text plainly; with JS off nothing
   is ever hidden. */
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

    gsap.set(targets, { yPercent: 120 });
    const vars: gsap.TweenVars = {
      yPercent: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger,
      delay,
    };
    if (mode === "scroll") {
      vars.scrollTrigger = { trigger: el, start: "top 88%", once: true };
    }
    const tween = gsap.to(targets, vars);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(targets, { yPercent: 0 });
    };
  }, [mode, delay, stagger]);

  const Tag = as as "div";

  return (
    <Tag ref={ref as Ref<HTMLDivElement>} className={className}>
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
