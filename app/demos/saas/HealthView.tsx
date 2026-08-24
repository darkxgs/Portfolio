"use client";

import { useMemo, useState } from "react";
import { ACCOUNTS, type CustomerAccount, type HealthLevel } from "./data";

type SortDir = "none" | "desc" | "asc";

function Sparkline({ trend, health }: { trend: number[]; health: HealthLevel }) {
  const w = 96;
  const h = 28;
  const min = Math.min(...trend);
  const max = Math.max(...trend);
  const span = max - min || 1;
  const x = (i: number): number => (i / (trend.length - 1)) * (w - 4) + 2;
  const y = (v: number): number => h - 3 - ((v - min) / span) * (h - 6);
  const path = trend
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
  const color =
    health === "Healthy" ? "#45b7e8" : health === "Watch" ? "#fbbf24" : "#e88787";
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-7 w-24"
      role="img"
      aria-label="12-week usage trend"
    >
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx={x(trend.length - 1)} cy={y(trend[trend.length - 1])} r="2.4" fill={color} />
    </svg>
  );
}

function HealthBadge({ health }: { health: HealthLevel }) {
  const styles: Record<HealthLevel, string> = {
    Healthy: "border-pos-500/25 bg-pos-500/15 text-pos-500",
    Watch: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    "At risk": "border-risk-500/25 bg-risk-500/15 text-risk-500",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${styles[health]}`}
    >
      {health}
    </span>
  );
}

export default function HealthView() {
  const [sortDir, setSortDir] = useState<SortDir>("none");
  const [openId, setOpenId] = useState<string | null>(null);

  const rows = useMemo(() => {
    if (sortDir === "none") return ACCOUNTS;
    const sorted = [...ACCOUNTS].sort((a, b) =>
      sortDir === "desc" ? b.riskScore - a.riskScore : a.riskScore - b.riskScore,
    );
    return sorted;
  }, [sortDir]);

  const cycleSort = (): void => {
    setSortDir((d) => (d === "none" ? "desc" : d === "desc" ? "asc" : "none"));
  };

  const toggleRow = (acc: CustomerAccount): void => {
    if (!acc.suggestion) return;
    setOpenId((id) => (id === acc.id ? null : acc.id));
  };

  const atRiskCount = ACCOUNTS.filter((a) => a.health === "At risk").length;
  const watchCount = ACCOUNTS.filter((a) => a.health === "Watch").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-graphite-300">
          {ACCOUNTS.length} customer accounts ·{" "}
          <span className="text-risk-400">{atRiskCount} at risk</span> ·{" "}
          <span className="text-amber-400">{watchCount} to watch</span>
        </p>
        <p className="text-xs text-graphite-300">
          Click a flagged row for the suggested play
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-graphite-700 bg-graphite-900/40">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-graphite-700 text-left text-xs uppercase tracking-wider text-graphite-300">
                <th className="px-4 py-3 font-medium sm:px-5">Account</th>
                <th className="px-4 py-3 font-medium sm:px-5">Usage · 12 wks</th>
                <th className="px-4 py-3 font-medium sm:px-5">
                  <button
                    onClick={cycleSort}
                    className="inline-flex items-center gap-1.5 uppercase tracking-wider transition-colors hover:text-graphite-50"
                    title="Sort by risk score"
                  >
                    Health / risk
                    <span className="font-mono normal-case">
                      {sortDir === "desc" ? "↓" : sortDir === "asc" ? "↑" : "↕"}
                    </span>
                  </button>
                </th>
                <th className="px-4 py-3 font-medium sm:px-5">Renewal</th>
                <th className="px-4 py-3 text-right font-medium sm:px-5">MRR</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((acc) => {
                const open = openId === acc.id;
                const clickable = acc.suggestion !== null;
                return (
                  <FragmentRow
                    key={acc.id}
                    acc={acc}
                    open={open}
                    clickable={clickable}
                    onToggle={() => toggleRow(acc)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-graphite-300">
        Risk score blends usage trend, seat activation, and days to renewal.
        Sort toggles: high → low → off.
      </p>
    </div>
  );
}

function FragmentRow({
  acc,
  open,
  clickable,
  onToggle,
}: {
  acc: CustomerAccount;
  open: boolean;
  clickable: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={`border-b border-graphite-700/60 transition-colors ${
          clickable ? "cursor-pointer hover:bg-graphite-800/40" : "hover:bg-graphite-800/20"
        } ${open ? "bg-graphite-800/40" : ""}`}
      >
        <td className="px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            {clickable && (
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 shrink-0 text-graphite-400 transition-transform ${
                  open ? "rotate-90" : ""
                }`}
                fill="currentColor"
                aria-hidden
              >
                <path d="M4 2l5 4-5 4z" />
              </svg>
            )}
            <div className={clickable ? "" : "pl-5"}>
              <p className="font-medium text-graphite-50">{acc.name}</p>
              <p className="text-xs text-graphite-300">
                {acc.plan} · {acc.seats} seats
              </p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 sm:px-5">
          <Sparkline trend={acc.trend} health={acc.health} />
        </td>
        <td className="px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <HealthBadge health={acc.health} />
            <span className="font-mono text-xs text-graphite-300">
              {acc.riskScore}
            </span>
          </div>
        </td>
        <td className="whitespace-nowrap px-4 py-3 text-graphite-300 sm:px-5">
          {acc.renewal}
        </td>
        <td className="px-4 py-3 text-right font-mono text-graphite-100 sm:px-5">
          ${acc.mrr}
        </td>
      </tr>
      {open && acc.suggestion && (
        <tr className="border-b border-graphite-700/60">
          <td colSpan={5} className="bg-graphite-950/40 px-4 py-4 sm:px-5">
            <div
              className={`flex gap-3 rounded-xl border p-4 ${
                acc.health === "At risk"
                  ? "border-risk-500/25 bg-risk-500/10"
                  : "border-amber-500/20 bg-amber-500/5"
              }`}
            >
              <svg
                viewBox="0 0 20 20"
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  acc.health === "At risk" ? "text-risk-400" : "text-amber-400"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M10 3l7.5 13h-15z" strokeLinejoin="round" />
                <path d="M10 8.5v3.5" />
                <circle cx="10" cy="14" r="0.4" fill="currentColor" />
              </svg>
              <div>
                <p
                  className={`mb-1 text-xs font-medium uppercase tracking-wider ${
                    acc.health === "At risk" ? "text-risk-400" : "text-amber-400"
                  }`}
                >
                  Suggested action
                </p>
                <p className="text-sm leading-relaxed text-graphite-100">
                  {acc.suggestion}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
