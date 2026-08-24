"use client";

import { useEffect, useState } from "react";

/* Local-time detail for the footer. Renders a placeholder on the
   server and fills in after mount, so SSR stays deterministic. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-sm text-slate-400">
      {time ?? "--:--"} · Cairo (GMT+2)
    </span>
  );
}
