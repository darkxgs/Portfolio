/* Shared by RevealText and SectionReveal. The pre-paint script in
   app/layout.tsx lifts the CSS pre-hide after the same interval. */
export const REVEAL_SAFETY_MS = 2500;

/* True when any part of the element is inside the current viewport. */
export function isInViewport(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return (
    r.bottom > 0 &&
    r.right > 0 &&
    r.top < window.innerHeight &&
    r.left < window.innerWidth
  );
}
