"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import { useIsoLayoutEffect } from "./use-iso-layout-effect";

type Props = {
  text: string;
  className?: string;
  trackClassName?: string;
  /* Base drift speed in percent of one copy per second. */
  baseSpeed?: number;
};

/* Infinite horizontal marquee whose speed picks up with scroll
   velocity (Dennis-style). Four duplicated copies, xPercent wrapped
   in [-25, 0]. Static (no drift) under prefers-reduced-motion;
   overflow is contained so the page never scrolls horizontally. */
export default function VelocityMarquee({
  text,
  className = "",
  trackClassName = "",
  baseSpeed = 4,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    let x = 0;
    let boost = 0;
    const wrap = gsap.utils.wrap(-25, 0);

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        boost = gsap.utils.clamp(-40, 40, self.getVelocity() / 60);
      },
    });

    const tick = (_time: number, deltaTime: number) => {
      const dt = deltaTime / 1000;
      x = wrap(x - (baseSpeed + Math.abs(boost)) * dt);
      boost *= 0.93;
      gsap.set(track, { xPercent: x });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      gsap.set(track, { xPercent: 0 });
    };
  }, [baseSpeed]);

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap ${className}`}>
      <span className="sr-only">{text}</span>
      <div
        ref={trackRef}
        className={`inline-flex w-max will-change-transform ${trackClassName}`}
        aria-hidden="true"
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="shrink-0">
            {/* trailing space becomes non-breaking so the copies join
                seamlessly (regular trailing whitespace collapses) */}
            {text.replace(/\s+$/, " ")}
          </span>
        ))}
      </div>
    </div>
  );
}
