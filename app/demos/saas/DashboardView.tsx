"use client";

import { useState } from "react";
import {
  COHORTS,
  FUNNEL,
  MRR_SERIES,
  STAT_TILES,
  type MonthPoint,
} from "./data";

type Range = "6m" | "12m";

function formatK(n: number): string {
  return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
}

function formatMoney(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

/* ---------------------------------- chart --------------------------------- */

const W = 640;
const H = 240;
const PAD = { top: 18, right: 16, bottom: 30, left: 52 };

function MrrChart({ points }: { points: MonthPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const values = points.map((p) => p.mrr);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const yMin = Math.floor((rawMin * 0.92) / 1000) * 1000;
  const yMax = Math.ceil((rawMax * 1.04) / 1000) * 1000;

  const x = (i: number): number =>
    PAD.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number): number =>
    PAD.top + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.mrr).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${x(points.length - 1).toFixed(1)} ${
    PAD.top + innerH
  } L ${x(0).toFixed(1)} ${PAD.top + innerH} Z`;

  const gridLines = [0, 1, 2, 3].map((i) => {
    const v = yMin + ((yMax - yMin) / 3) * i;
    return { v, yy: y(v) };
  });

  const active = hover !== null ? points[hover] : points[points.length - 1];
  const activeIdx = hover !== null ? hover : points.length - 1;

  const handleMove = (e: React.MouseEvent<SVGSVGElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const t = (px - PAD.left) / innerW;
    const idx = Math.round(t * (points.length - 1));
    setHover(Math.max(0, Math.min(points.length - 1, idx)));
  };

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-graphite-50">
            {formatMoney(active.mrr)}
          </span>
          <span className="ml-2 text-sm text-graphite-300">{active.month}</span>
        </div>
        <span className="hidden text-xs text-graphite-300 sm:inline">
          Hover the chart to inspect a month
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full cursor-crosshair"
        role="img"
        aria-label="MRR over time"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#45b7e8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#45b7e8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridLines.map((g) => (
          <g key={g.v}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={g.yy}
              y2={g.yy}
              stroke="#262c36"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 8}
              y={g.yy + 3.5}
              textAnchor="end"
              fontSize="10"
              fill="#8b95a5"
              fontFamily="var(--font-display)"
            >
              {formatK(g.v)}
            </text>
          </g>
        ))}

        <path d={areaPath} fill="url(#mrrFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#45b7e8"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* month labels: first, last, and a few in between */}
        {points.map((p, i) => {
          const step = points.length > 8 ? 2 : 1;
          if (i % step !== 0 && i !== points.length - 1) return null;
          return (
            <text
              key={p.month}
              x={x(i)}
              y={H - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#8b95a5"
              fontFamily="var(--font-display)"
            >
              {p.month.split(" ")[0]}
            </text>
          );
        })}

        {/* hover crosshair */}
        <line
          x1={x(activeIdx)}
          x2={x(activeIdx)}
          y1={PAD.top}
          y2={PAD.top + innerH}
          stroke="#7ccdef"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {points.map((p, i) => (
          <circle
            key={p.month}
            cx={x(i)}
            cy={y(p.mrr)}
            r={i === activeIdx ? 5 : 3}
            fill={i === activeIdx ? "#7ccdef" : "#12151a"}
            stroke="#45b7e8"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}

/* --------------------------------- funnel --------------------------------- */

const FUNNEL_BAR_OPACITY = [
  "bg-metric-400",
  "bg-metric-400/80",
  "bg-metric-400/65",
  "bg-metric-400/50",
];

function Funnel() {
  const max = FUNNEL[0].count;
  return (
    <div className="space-y-4">
      {FUNNEL.map((stage, i) => {
        const pct = (stage.count / max) * 100;
        const conv =
          i === 0 ? null : Math.round((stage.count / FUNNEL[i - 1].count) * 100);
        return (
          <div key={stage.label}>
            <div className="mb-1.5 flex items-baseline justify-between text-sm">
              <span className="text-graphite-100">{stage.label}</span>
              <span className="font-mono text-graphite-300">
                {stage.count.toLocaleString("en-US")}
                {conv !== null && (
                  <span className="ml-2 text-xs text-metric-300">
                    {conv}% →
                  </span>
                )}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-graphite-800/70">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  FUNNEL_BAR_OPACITY[i] ?? "bg-metric-400/50"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
      <p className="pt-1 text-xs text-graphite-300">
        Overall activation:{" "}
        <span className="font-mono text-metric-300">
          {Math.round((FUNNEL[3].count / FUNNEL[0].count) * 100)}%
        </span>{" "}
        of signups subscribe
      </p>
    </div>
  );
}

/* ------------------------------- cohort grid ------------------------------ */

function CohortGrid() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-separate border-spacing-1 text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left font-medium text-graphite-300">
              Cohort
            </th>
            <th className="px-2 py-1 text-right font-medium text-graphite-300">
              Size
            </th>
            {Array.from({ length: 8 }, (_, w) => (
              <th
                key={w}
                className="px-1 py-1 text-center font-mono font-medium text-graphite-300"
              >
                W{w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COHORTS.map((c) => (
            <tr key={c.label}>
              <td className="whitespace-nowrap px-2 py-1 text-graphite-100">
                {c.label}
              </td>
              <td className="px-2 py-1 text-right font-mono text-graphite-300">
                {c.size}
              </td>
              {c.weeks.map((v, w) => (
                <td key={w} className="p-0">
                  {v > 0 ? (
                    <div
                      className="flex h-8 w-full min-w-[38px] items-center justify-center rounded font-mono"
                      style={{
                        backgroundColor: `rgba(69, 183, 232, ${(v / 100) * 0.85})`,
                        color: v >= 55 ? "#0b0d10" : "#a8dcf5",
                      }}
                      title={`${c.label} cohort — week ${w}: ${v}% retained`}
                    >
                      {v}
                    </div>
                  ) : (
                    <div className="h-8 w-full min-w-[38px] rounded bg-graphite-800/30" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-graphite-300">
        % of each weekly cohort still active N weeks later. Darker = better
        retention.
      </p>
    </div>
  );
}

/* ---------------------------------- view ---------------------------------- */

export default function DashboardView() {
  const [range, setRange] = useState<Range>("12m");
  const points = range === "12m" ? MRR_SERIES : MRR_SERIES.slice(6);

  return (
    <div className="space-y-6">
      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_TILES.map((t) => (
          <div
            key={t.label}
            className="rounded-2xl border border-graphite-700 bg-graphite-900/40 p-4 sm:p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-graphite-300">
              {t.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-graphite-50 sm:text-2xl">
              {t.value}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs ${
                  t.good
                    ? "bg-pos-500/15 text-pos-500"
                    : "bg-risk-500/15 text-risk-500"
                }`}
              >
                <svg
                  viewBox="0 0 12 12"
                  className={`h-2.5 w-2.5 ${t.delta.startsWith("-") ? "rotate-180" : ""}`}
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M6 2l4 5H2z" />
                </svg>
                {t.delta}
              </span>
              <span className="text-xs text-graphite-300">{t.hint}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MRR chart */}
      <div className="rounded-2xl border border-graphite-700 bg-graphite-900/40 p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-medium text-graphite-50">Monthly recurring revenue</h2>
          <div className="flex rounded-lg border border-graphite-700 bg-graphite-900/60 p-0.5">
            {(["6m", "12m"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                  range === r
                    ? "bg-metric-400 text-graphite-950"
                    : "text-graphite-300 hover:text-graphite-50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <MrrChart points={points} />
      </div>

      {/* funnel + cohorts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="min-w-0 rounded-2xl border border-graphite-700 bg-graphite-900/40 p-4 sm:p-6 lg:col-span-2">
          <h2 className="mb-1 font-medium text-graphite-50">Activation funnel</h2>
          <p className="mb-5 text-xs text-graphite-300">Last 90 days, all signups</p>
          <Funnel />
        </div>
        <div className="min-w-0 rounded-2xl border border-graphite-700 bg-graphite-900/40 p-4 sm:p-6 lg:col-span-3">
          <h2 className="mb-1 font-medium text-graphite-50">Weekly retention cohorts</h2>
          <p className="mb-4 text-xs text-graphite-300">
            8 most recent signup cohorts
          </p>
          <CohortGrid />
        </div>
      </div>
    </div>
  );
}
