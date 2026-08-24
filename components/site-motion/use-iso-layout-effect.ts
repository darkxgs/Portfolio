import { useEffect, useLayoutEffect } from "react";

/* useLayoutEffect on the client, useEffect during SSR — avoids the
   server warning while keeping pre-paint timing in the browser. */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
