"use client";

import { useState } from "react";
import {
  ACCOUNTS,
  FUNNEL,
  COHORTS,
  INVOICES,
  MRR_SERIES,
  PLANS,
  STAT_TILES,
  type CustomerAccount,
  type HealthLevel,
  type PlanId,
  type ViewKey,
} from "./data";
import { MotionRoot, revealDelay } from "./motion";

interface WebsiteProps {
  onOpenApp: (view?: ViewKey) => void;
}

/* ============================================================
   Shared bits
   ============================================================ */

export function MetriclyMark({ size = "h-8 w-8" }: { size?: string }) {
  return (
    <span className={`flex ${size} items-center justify-center rounded-lg bg-metric-400 text-graphite-950`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="3" y="8.5" width="2.4" height="4.5" rx="1" fill="currentColor" opacity="0.55" />
        <rect x="6.8" y="6" width="2.4" height="7" rx="1" fill="currentColor" opacity="0.78" />
        <rect x="10.6" y="3" width="2.4" height="10" rx="1" fill="currentColor" />
      </svg>
    </span>
  );
}

function Kicker({ children }: { children: string }) {
  return (
    <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.18em] text-metric-300">
      {children}
    </p>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="m3.5 6 4.5 4.5L12.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Deep link into the app, styled as an inline arrow link. */
function TryInApp({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-metric-300 transition-colors hover:text-metric-200"
    >
      {label}
      <span className="transition-transform group-hover:translate-x-0.5">
        <ArrowRightIcon />
      </span>
    </button>
  );
}

/** Window chrome around a product recreation, with the azure "Live demo" tab. */
function WindowFrame({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-graphite-700 bg-graphite-950/80 shadow-2xl shadow-metric-700/20 ${className}`}>
      <div className="flex items-center gap-3 border-b border-graphite-700 bg-graphite-900/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-graphite-400">{title}</span>
        <span className="rounded-full border border-metric-400/40 bg-metric-400/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-metric-300">
          Live demo
        </span>
      </div>
      {children}
    </div>
  );
}

/* ============================================================
   Static product visuals — real seed data, DashboardView styling,
   rendered as non-interactive recreations (no <img> screenshots).
   ============================================================ */

/** Simplified static azure MRR area chart, built from the real seed series. */
function HeroMrrChart() {
  const W = 560;
  const H = 168;
  const PAD = { top: 14, right: 12, bottom: 22, left: 42 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const points = MRR_SERIES;
  const values = points.map((p) => p.mrr);
  const yMin = Math.floor((Math.min(...values) * 0.92) / 1000) * 1000;
  const yMax = Math.ceil((Math.max(...values) * 1.04) / 1000) * 1000;

  const x = (i: number): number => PAD.left + (i / (points.length - 1)) * innerW;
  const y = (v: number): number => PAD.top + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.mrr).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${x(points.length - 1).toFixed(1)} ${PAD.top + innerH} L ${x(0).toFixed(1)} ${
    PAD.top + innerH
  } Z`;

  const gridLines = [0, 1, 2].map((i) => {
    const v = yMin + ((yMax - yMin) / 2) * i;
    return { v, yy: y(v) };
  });

  const last = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="MRR over the last 12 months">
      <defs>
        <linearGradient id="mcHeroFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#45b7e8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#45b7e8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridLines.map((g) => (
        <g key={g.v}>
          <line x1={PAD.left} x2={W - PAD.right} y1={g.yy} y2={g.yy} stroke="#262c36" strokeWidth="1" />
          <text
            x={PAD.left - 8}
            y={g.yy + 3.5}
            textAnchor="end"
            fontSize="9"
            fill="#8b95a5"
            fontFamily="var(--font-display)"
          >
            {`$${Math.round(g.v / 1000)}k`}
          </text>
        </g>
      ))}
      <path d={areaPath} fill="url(#mcHeroFill)" />
      <path d={linePath} fill="none" stroke="#45b7e8" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) =>
        i % 2 === 0 || i === points.length - 1 ? (
          <text
            key={p.month}
            x={x(i)}
            y={H - 6}
            textAnchor="middle"
            fontSize="9"
            fill="#8b95a5"
            fontFamily="var(--font-display)"
          >
            {p.month.split(" ")[0]}
          </text>
        ) : null,
      )}
      <circle cx={x(points.length - 1)} cy={y(last.mrr)} r="4.5" fill="#7ccdef" stroke="#45b7e8" strokeWidth="2" />
    </svg>
  );
}

/**
 * The hero product visual: a scaled, static recreation of the dashboard —
 * the real stat tiles plus the azure MRR curve — inside a window frame.
 * Decorative; the real, interactive dashboard is one click away in the app.
 */
function HeroDashboard() {
  return (
    <div aria-hidden className="pointer-events-none select-none p-3 sm:p-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {STAT_TILES.map((t) => (
          <div key={t.label} className="rounded-xl border border-graphite-700 bg-graphite-900/40 p-2.5 sm:p-3">
            <p className="text-[9px] font-medium uppercase tracking-wider text-graphite-300 sm:text-[10px]">{t.label}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-base font-semibold text-graphite-50 sm:text-lg">
              {t.value}
            </p>
            <p className="mt-1 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 rounded-full bg-pos-500/15 px-1.5 py-px font-mono text-[9px] text-pos-500">
                <svg
                  viewBox="0 0 12 12"
                  className={`h-2 w-2 ${t.delta.startsWith("-") ? "rotate-180" : ""}`}
                  fill="currentColor"
                >
                  <path d="M6 2l4 5H2z" />
                </svg>
                {t.delta}
              </span>
              <span className="hidden text-[9px] text-graphite-400 sm:inline">{t.hint}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-graphite-700 bg-graphite-900/40 p-3 sm:p-4">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <div>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-graphite-50 sm:text-xl">
              ${MRR_SERIES[MRR_SERIES.length - 1].mrr.toLocaleString("en-US")}
            </span>
            <span className="ml-2 text-xs text-graphite-300">{MRR_SERIES[MRR_SERIES.length - 1].month}</span>
          </div>
          <span className="text-[10px] text-graphite-400">Monthly recurring revenue · 12m</span>
        </div>
        <HeroMrrChart />
      </div>
    </div>
  );
}

/* ---------- Feature fragment: funnel + cohort heat strip ---------- */

const FUNNEL_BAR_OPACITY = ["bg-metric-400", "bg-metric-400/80", "bg-metric-400/65", "bg-metric-400/50"];

function MiniAnalytics() {
  const max = FUNNEL[0].count;
  const cohorts = COHORTS.slice(0, 3);
  return (
    <div aria-hidden className="pointer-events-none select-none space-y-3 p-3 sm:p-4">
      <div className="rounded-xl border border-graphite-700 bg-graphite-900/40 p-3">
        <p className="mb-2.5 text-[10px] font-medium uppercase tracking-wider text-graphite-300">Activation funnel · 90 days</p>
        <div className="space-y-2.5">
          {FUNNEL.map((stage, i) => {
            const pct = (stage.count / max) * 100;
            const conv = i === 0 ? null : Math.round((stage.count / FUNNEL[i - 1].count) * 100);
            return (
              <div key={stage.label}>
                <div className="mb-1 flex items-baseline justify-between text-[11px]">
                  <span className="text-graphite-100">{stage.label}</span>
                  <span className="font-mono text-graphite-300">
                    {stage.count.toLocaleString("en-US")}
                    {conv !== null && <span className="ml-1.5 text-metric-300">{conv}%</span>}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-graphite-800/70">
                  <div
                    className={`h-full rounded-full ${FUNNEL_BAR_OPACITY[i] ?? "bg-metric-400/50"}`}
                    style={{ width: `${pct.toFixed(1)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-xl border border-graphite-700 bg-graphite-900/40 p-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-graphite-300">Weekly retention cohorts</p>
        <div className="space-y-1">
          {cohorts.map((c) => (
            <div key={c.label} className="flex items-center gap-1">
              <span className="w-12 shrink-0 text-[10px] text-graphite-100">{c.label}</span>
              {c.weeks.slice(0, 6).map((v, w) => (
                <span
                  key={w}
                  className="flex h-6 flex-1 items-center justify-center rounded font-mono text-[9px]"
                  style={
                    v > 0
                      ? {
                          backgroundColor: `rgba(69, 183, 232, ${((v / 100) * 0.85).toFixed(3)})`,
                          color: v >= 55 ? "#0b0d10" : "#a8dcf5",
                        }
                      : { backgroundColor: "rgba(25, 30, 37, 0.4)" }
                  }
                >
                  {v > 0 ? v : ""}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Feature fragment: plan card + invoice rows ---------- */

function MiniBilling() {
  const growth = PLANS.find((p) => p.id === "growth") ?? PLANS[1];
  const invoices = INVOICES.slice(0, 3);
  return (
    <div aria-hidden className="pointer-events-none select-none space-y-3 p-3 sm:p-4">
      <div className="rounded-xl border border-metric-400/40 bg-graphite-900/40 p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-graphite-300">Current plan</p>
            <p className="mt-1 text-sm font-semibold text-graphite-50">{growth.name}</p>
            <p className="mt-0.5 text-[11px] text-graphite-300">
              {growth.seats} · {growth.docs}
            </p>
          </div>
          <div className="text-right">
            <span className="rounded-full border border-metric-400/25 bg-metric-400/15 px-2 py-0.5 font-mono text-[10px] text-metric-300">
              Active
            </span>
            <p className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-semibold text-graphite-50">
              ${growth.price}
              <span className="text-[10px] font-normal text-graphite-300">/mo</span>
            </p>
          </div>
        </div>
        <p className="mt-2.5 border-t border-graphite-700/70 pt-2 text-[10px] text-graphite-400">
          Renews Sep 1, 2026 · switch plans any time, prorated automatically
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-graphite-700 bg-graphite-900/40">
        {invoices.map((inv, i) => (
          <div
            key={inv.number}
            className={`flex items-center justify-between gap-2 px-3.5 py-2.5 ${i > 0 ? "border-t border-graphite-700/60" : ""}`}
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-[10px] text-graphite-100">{inv.number}</p>
              <p className="text-[10px] text-graphite-400">{inv.date}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2.5">
              <span className="font-mono text-[11px] text-graphite-100">${inv.amount.toFixed(2)}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[9px] ${
                  inv.status === "Paid"
                    ? "border-pos-500/25 bg-pos-500/15 text-pos-500"
                    : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                }`}
              >
                <span className={`h-1 w-1 rounded-full ${inv.status === "Paid" ? "bg-pos-500" : "bg-amber-400"}`} />
                {inv.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Feature fragment: health rows with sparklines ---------- */

function MiniSparkline({ trend, health }: { trend: number[]; health: HealthLevel }) {
  const w = 96;
  const h = 28;
  const min = Math.min(...trend);
  const max = Math.max(...trend);
  const span = max - min || 1;
  const x = (i: number): number => (i / (trend.length - 1)) * (w - 4) + 2;
  const y = (v: number): number => h - 3 - ((v - min) / span) * (h - 6);
  const path = trend.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const color = health === "Healthy" ? "#45b7e8" : health === "Watch" ? "#fbbf24" : "#e88787";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-6 w-20">
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx={x(trend.length - 1)} cy={y(trend[trend.length - 1])} r="2.4" fill={color} />
    </svg>
  );
}

const HEALTH_BADGE: Record<HealthLevel, string> = {
  Healthy: "border-pos-500/25 bg-pos-500/15 text-pos-500",
  Watch: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  "At risk": "border-risk-500/25 bg-risk-500/15 text-risk-500",
};

function MiniHealth() {
  const rows = ["a-02", "a-05", "a-03"]
    .map((id) => ACCOUNTS.find((a) => a.id === id))
    .filter((a): a is CustomerAccount => a !== undefined);
  return (
    <div aria-hidden className="pointer-events-none select-none space-y-2 p-3 sm:p-4">
      {rows.map((acc) => (
        <div key={acc.id} className="flex items-center gap-3 rounded-xl border border-graphite-700 bg-graphite-900/40 px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-graphite-50">{acc.name}</p>
            <p className="text-[10px] text-graphite-400">
              {acc.plan} · {acc.seats} seats · renews {acc.renewal}
            </p>
          </div>
          <MiniSparkline trend={acc.trend} health={acc.health} />
          <div className="flex shrink-0 items-center gap-2">
            <span className={`inline-flex whitespace-nowrap rounded-full border px-1.5 py-px text-[9px] ${HEALTH_BADGE[acc.health]}`}>
              {acc.health}
            </span>
            <span className="hidden font-mono text-[10px] text-graphite-300 sm:inline">{acc.riskScore}</span>
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-risk-500/25 bg-risk-500/10 p-3">
        <p className="text-[9px] font-medium uppercase tracking-wider text-risk-400">Suggested play · Nimbus &amp; Vale</p>
        <p className="mt-1 text-[11px] leading-relaxed text-graphite-100">
          Usage down 39% over 12 weeks and renewal is in 16 days. Schedule an exec check-in this week and offer a guided
          re-onboarding for the 9 dormant seats.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Page content data
   ============================================================ */

const STARTUPS: { name: string; className: string }[] = [
  { name: "Inkflow", className: "font-semibold tracking-tight" },
  { name: "Loopnote", className: "font-serif italic" },
  { name: "CRAFTPOST", className: "text-xs font-bold tracking-[0.22em]" },
  { name: "Wavelane", className: "font-mono tracking-tight" },
  { name: "SUMA LABS", className: "text-xs font-semibold tracking-[0.18em]" },
];

/** Bespoke marketing copy per plan; names & prices come straight from PLANS. */
const TIER_COPY: Record<PlanId, { blurb: string; features: string[]; featured?: boolean }> = {
  starter: {
    blurb: "For a founder who wants the numbers without the spreadsheet.",
    features: [
      "MRR, activation & churn dashboard",
      "Runs on your existing Stripe Billing",
      "Weekly retention cohorts",
      "Email support",
    ],
  },
  growth: {
    blurb: "For teams whose next round depends on the retention chart.",
    features: [
      "Everything in Starter",
      "Activation funnel with stage conversion",
      "Account health & churn-risk scores",
      "Suggested churn plays per account",
      "Priority support",
    ],
    featured: true,
  },
  scale: {
    blurb: "For companies where CS works the at-risk list every week.",
    features: [
      "Everything in Growth",
      "API access & data exports",
      "Roles, permissions & audit log",
      "Historical data import, assisted",
      "Dedicated onboarding",
    ],
  },
};

const TESTIMONIALS: { quote: string; role: string; company: string }[] = [
  {
    quote:
      "We were three weeks from a board meeting and our 'dashboard' was four spreadsheets that disagreed with each other. Metricly pulled MRR, activation and cohorts into one screen that matched Stripe to the dollar.",
    role: "Founder",
    company: "Loopnote",
  },
  {
    quote:
      "The cohort grid showed our week-2 drop-off before churn did. We fixed one onboarding step and watched the next cohort retain seven points better — that's the whole product paying for itself.",
    role: "Head of Growth",
    company: "Craftpost",
  },
  {
    quote:
      "The at-risk list is our Monday meeting now. Two renewals we would have lost this quarter got a call three weeks early instead of a cancellation email.",
    role: "COO",
    company: "Wavelane",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What counts as an active user?",
    a: "You define it once per workspace: any tracked event (sign-in, document created, API call — whatever maps to real usage in your product) within the window you choose, weekly by default. Every chart, funnel stage and cohort cell then uses that one definition, so 'active' means the same thing everywhere in Metricly.",
  },
  {
    q: "Does Metricly replace Stripe?",
    a: "No — it runs on Stripe Billing. Stripe stays your source of truth for subscriptions, payments and invoices; Metricly reads from it to compute MRR, plan movement and renewal timing, and layers product usage on top. You connect it read-only in a few minutes and disconnect just as fast.",
  },
  {
    q: "Can I import my historical data?",
    a: "Yes. The Stripe connection backfills your full billing history automatically, so the MRR chart is complete from day one. Product usage can be imported from a CSV export of your existing events, and on the Scale plan we map and load it with you.",
  },
  {
    q: "How do seats work?",
    a: "A seat is a teammate who can sign in to your Metricly workspace — Starter includes up to 5, Growth up to 25, Scale is unlimited. Seats are for your team, not your customers: the accounts and users you track are never counted or charged.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from the Billing screen in one click — no call, no retention form. Your workspace stays readable until the end of the period you've paid for, and you can export everything on the way out.",
  },
];

/* ============================================================
   The product site
   ============================================================ */

const NAV_LINKS: { label: string; id: string }[] = [
  { label: "Product", id: "product" },
  { label: "Features", id: "features" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" },
];

export default function Website({ onOpenApp }: WebsiteProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentMrr = MRR_SERIES[MRR_SERIES.length - 1].mrr;
  const atRiskCount = ACCOUNTS.filter((a) => a.health === "At risk").length;

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionRoot className="bg-graphite-950 text-graphite-100">
      {/* ============ TOP BAR ============ */}
      <header className="sticky top-0 z-40 border-b border-graphite-800 bg-graphite-950/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => scrollToId("product")}
              className="flex shrink-0 items-center gap-2.5 text-left"
            >
              <MetriclyMark />
              <span className="hidden sm:block">
                <span className="block font-[family-name:var(--font-display)] text-sm font-semibold leading-tight text-graphite-50">
                  Metricly
                </span>
                <span className="block font-mono text-[10px] leading-tight text-graphite-400">
                  Analytics &amp; billing for SaaS
                </span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Site sections">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollToId(l.id)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-graphite-300 transition-colors hover:bg-graphite-900 hover:text-graphite-50"
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => onOpenApp()}
                className="mc-lift rounded-lg bg-metric-400 px-3.5 py-2 text-sm font-semibold text-graphite-950 transition-colors hover:bg-metric-300 sm:px-4"
              >
                Open the live app
              </button>

              {/* Compact Site/App switcher */}
              <div className="flex rounded-lg border border-graphite-700 bg-graphite-900 p-0.5" role="group" aria-label="Demo view">
                <span className="whitespace-nowrap rounded-md bg-graphite-950 px-2.5 py-1.5 text-xs font-medium text-metric-300 ring-1 ring-graphite-700">
                  Site
                </span>
                <button
                  type="button"
                  onClick={() => onOpenApp()}
                  className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium text-graphite-300 transition-colors hover:text-graphite-50"
                >
                  App
                </button>
              </div>
            </div>
          </div>

          {/* Mobile anchor nav */}
          <div className="-mx-4 overflow-x-auto border-t border-graphite-800 px-4 lg:hidden">
            <div className="flex w-max gap-1 py-2">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollToId(l.id)}
                  className="whitespace-nowrap rounded-full border border-graphite-700 bg-graphite-900 px-3.5 py-1.5 text-xs font-medium text-graphite-200 transition-colors hover:border-metric-400 hover:text-metric-300"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section id="product" className="relative isolate scroll-mt-24 overflow-hidden">
        {/* Radial azure glow */}
        <div
          aria-hidden
          className="mc-glow pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[52rem] max-w-none -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(69, 183, 232, 0.2), transparent 72%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-graphite-700 bg-graphite-900/70 px-3.5 py-1.5 text-xs font-medium text-graphite-200">
              <span className="h-2 w-2 rounded-full bg-metric-400" aria-hidden />
              Built for early-stage SaaS teams
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-graphite-50 sm:text-5xl lg:text-6xl">
              Know what your SaaS is doing — activation, retention, revenue, one screen.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-graphite-300 sm:text-lg">
              Metricly is the dashboard early-stage founders keep rebuilding in spreadsheets: live MRR, an activation
              funnel, retention cohorts and churn warnings — wired straight into your Stripe Billing.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onOpenApp()}
                className="mc-lift rounded-xl bg-metric-400 px-7 py-3.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-metric-300"
              >
                Open the live app
              </button>
              <button
                type="button"
                onClick={() => scrollToId("pricing")}
                className="mc-lift rounded-xl border border-graphite-600 px-7 py-3.5 text-sm font-semibold text-graphite-100 transition-colors hover:border-metric-400 hover:text-metric-300"
              >
                See pricing
              </button>
            </div>
          </div>

          {/* Framed product visual */}
          <div className="relative mx-auto mt-14 max-w-4xl sm:mt-16" data-reveal>
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -top-10 bottom-0 rounded-[3rem]"
              style={{ background: "radial-gradient(closest-side, rgba(69, 183, 232, 0.12), transparent 75%)" }}
            />
            <div className="mc-frame-reveal relative" data-reveal style={revealDelay(2, 120)}>
              <WindowFrame title="app.metricly.example — Dashboard">
                <HeroDashboard />
              </WindowFrame>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOGO STRIP ============ */}
      <section className="border-y border-graphite-800/80 bg-graphite-900/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6" data-reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-graphite-400">
            Teams that watch their numbers here
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
            {STARTUPS.map((s) => (
              <span key={s.name} className={`text-graphite-300/90 ${s.className} text-sm sm:text-base`}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>The working parts</Kicker>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-graphite-50 sm:text-4xl">
              The three questions every SaaS founder asks. Answered on one tab.
            </h2>
          </div>

          {/* Feature 1 — Analytics */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-reveal>
              <Kicker>Analytics</Kicker>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-graphite-50 sm:text-3xl">
                Find out if onboarding is broken before churn tells you.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-graphite-300">
                The activation funnel shows exactly where signups stall — signed up, created a doc, invited a teammate,
                subscribed — with the conversion between every stage. Weekly retention cohorts sit right beside it, so a
                bad onboarding week shows up as a pale row long before it shows up as cancellations.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Four-stage activation funnel with per-stage conversion",
                  "Weekly cohorts, retained % week by week",
                  "Live MRR chart on the same dashboard",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-graphite-200">
                    <span className="mt-0.5 text-metric-300">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <TryInApp label="Try the dashboard in the app" onClick={() => onOpenApp("dashboard")} />
            </div>
            <div data-reveal style={revealDelay(1, 120)}>
              <WindowFrame title="Dashboard — Inkflow">
                <MiniAnalytics />
              </WindowFrame>
            </div>
          </div>

          {/* Feature 2 — Billing (fragment on the left on desktop) */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2" data-reveal>
              <Kicker>Billing</Kicker>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-graphite-50 sm:text-3xl">
                Plans, trials and invoices without the engineering weeks.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-graphite-300">
                Metricly sits on top of Stripe Billing, so the plan switcher, prorated mid-cycle changes and the invoice
                history your customers expect are already built. Change a plan and the next invoice preview updates to
                the cent — no billing sprint, no reconciliation spreadsheet.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Plan changes prorated automatically, previewed first",
                  "Full invoice history with paid / due status",
                  "Stripe stays the source of truth — connected read-only",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-graphite-200">
                    <span className="mt-0.5 text-metric-300">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <TryInApp label="Try billing in the app" onClick={() => onOpenApp("billing")} />
            </div>
            <div className="lg:order-1" data-reveal style={revealDelay(1, 120)}>
              <WindowFrame title="Billing — Inkflow">
                <MiniBilling />
              </WindowFrame>
            </div>
          </div>

          {/* Feature 3 — Account health */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-reveal>
              <Kicker>Account health</Kicker>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-graphite-50 sm:text-3xl">
                See churn coming while you can still act.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-graphite-300">
                Every customer account gets a 12-week usage sparkline and a risk score that blends usage trend, seat
                activation and days to renewal. Flagged accounts come with a suggested play — who to call, what to
                offer, and how many days you have before the renewal decides for you.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Risk score per account, sortable high to low",
                  "12-week usage sparkline on every row",
                  "A concrete suggested play for every flagged account",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-graphite-200">
                    <span className="mt-0.5 text-metric-300">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <TryInApp label="Try account health in the app" onClick={() => onOpenApp("health")} />
            </div>
            <div data-reveal style={revealDelay(1, 120)}>
              <WindowFrame title="Account health — Inkflow">
                <MiniHealth />
              </WindowFrame>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="border-y border-graphite-800/80 bg-graphite-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {[
              { value: `$${currentMrr.toLocaleString("en-US")}`, label: "MRR tracked in the demo workspace", accent: "text-metric-300" },
              { value: String(ACCOUNTS.length), label: "customer accounts watched", accent: "text-graphite-50" },
              { value: String(atRiskCount), label: "churn saves in play this quarter", accent: "text-pos-500" },
            ].map((stat, i) => (
              <div key={stat.label} data-reveal style={revealDelay(i, 100)}>
                <div className={`font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl ${stat.accent}`}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-graphite-300">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-graphite-400" data-reveal>
            Illustrative demo figures from the fictional Inkflow workspace.
          </p>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>Pricing</Kicker>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-graphite-50 sm:text-4xl">
              One flat price per workspace. Grow into the next tier.
            </h2>
            <p className="mt-4 text-base text-graphite-300">
              The same three plans you&apos;ll find on the Billing screen inside the app — switch any time, prorated
              automatically.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
            {PLANS.map((plan, i) => {
              const copy = TIER_COPY[plan.id];
              return (
                <div
                  key={plan.id}
                  data-reveal
                  style={revealDelay(i, 110)}
                  className={`mc-lift relative flex flex-col rounded-2xl border p-6 ${
                    copy.featured
                      ? "border-metric-400/50 bg-graphite-900/70 shadow-xl shadow-metric-700/20"
                      : "border-graphite-700 bg-graphite-900/40"
                  }`}
                >
                  {copy.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-metric-400/40 bg-metric-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-metric-300 backdrop-blur">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-graphite-50">{plan.name}</h3>
                  <p className="mt-1 text-xs text-graphite-400">{plan.tagline}</p>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-graphite-50">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-graphite-400">/mo</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-graphite-300">{copy.blurb}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {[plan.seats, ...copy.features].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-graphite-200">
                        <span className={`mt-0.5 ${copy.featured ? "text-metric-300" : "text-graphite-400"}`}>
                          <CheckIcon />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => onOpenApp("billing")}
                    className={`mc-lift mt-6 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
                      copy.featured
                        ? "bg-metric-400 text-graphite-950 hover:bg-metric-300"
                        : "border border-graphite-600 text-graphite-100 hover:border-metric-400 hover:text-metric-300"
                    }`}
                  >
                    Try it in the live demo
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs text-graphite-400" data-reveal>
            Prices exclude tax. Metricly is a fictional product — no card, no signup; every button simply opens the demo
            app on its Billing screen.
          </p>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="border-t border-graphite-800/80 bg-graphite-900/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>From the teams in the demo</Kicker>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-graphite-50 sm:text-4xl">
              Fictional startups. Real founder problems.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.company}
                data-reveal
                style={revealDelay(i, 110)}
                className="mc-lift flex flex-col rounded-2xl border border-graphite-700 bg-graphite-900/40 p-6"
              >
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden className="text-metric-400/60">
                  <path
                    d="M0 18V9.6C0 4 3 .8 9 0l1 3.2C6.6 4 5.2 5.8 5 8.4h4.6V18H0Zm14 0V9.6C14 4 17 .8 23 0l1 3.2c-3.4.8-4.8 2.6-5 5.2h4.6V18H14Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-graphite-100">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-graphite-700/70 pt-4">
                  <div className="text-sm font-semibold text-graphite-50">
                    {t.role}, {t.company}
                  </div>
                  <div className="mt-0.5 text-xs text-graphite-400">fictional demo startup</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="scroll-mt-24 border-t border-graphite-800/80">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="text-center" data-reveal>
            <Kicker>FAQ</Kicker>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-graphite-50 sm:text-4xl">
              The questions founders actually ask
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  data-reveal
                  style={revealDelay(i, 70)}
                  className={`rounded-2xl border transition-colors ${
                    open ? "border-metric-400/40 bg-graphite-900/60" : "border-graphite-700 bg-graphite-900/30"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-graphite-50 sm:text-base">{faq.q}</span>
                    <span
                      className={`shrink-0 text-graphite-400 transition-transform duration-200 ${open ? "rotate-180 text-metric-300" : ""}`}
                    >
                      <ChevronDownIcon />
                    </span>
                  </button>
                  {open && <p className="px-5 pb-5 text-sm leading-relaxed text-graphite-300">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative isolate overflow-hidden border-t border-graphite-800/80">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 left-1/2 h-[26rem] w-[44rem] max-w-none -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(69, 183, 232, 0.16), transparent 72%)" }}
        />
        <div
          className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-24"
          data-reveal
        >
          <MetriclyMark size="h-11 w-11" />
          <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-graphite-50 sm:text-4xl">
            See your numbers the way Metricly sees them.
          </h2>
          <p className="max-w-md text-sm text-graphite-300 sm:text-base">
            The live demo is seeded with a full workspace — inspect a month of MRR, switch a plan, open an at-risk
            account&apos;s suggested play. Nothing to install.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenApp()}
              className="mc-lift rounded-xl bg-metric-400 px-7 py-3.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-metric-300"
            >
              Open the live app
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className="mc-lift rounded-xl border border-graphite-600 px-7 py-3.5 text-sm font-semibold text-graphite-100 transition-colors hover:border-metric-400 hover:text-metric-300"
            >
              See pricing
            </button>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-graphite-800 bg-graphite-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <MetriclyMark />
                <p className="font-[family-name:var(--font-display)] text-base font-semibold text-graphite-50">Metricly</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-graphite-400">
                Analytics and billing for early-stage SaaS: MRR, activation, retention and churn risk on one screen.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-graphite-500">Product</p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(l.id)}
                      className="text-sm text-graphite-300 transition-colors hover:text-graphite-50"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenApp()}
                    className="text-sm text-metric-300 transition-colors hover:text-metric-200"
                  >
                    Open the live app
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-graphite-500">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-graphite-300">
                <li>
                  <a href="mailto:hello@metricly.example" className="transition-colors hover:text-graphite-50">
                    hello@metricly.example
                  </a>
                </li>
                <li className="font-mono">0123 456 7890</li>
                <li className="text-xs text-graphite-500">(an obviously fake number — this is a demo)</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-graphite-500">About this demo</p>
              <p className="mt-4 text-xs leading-relaxed text-graphite-400">
                Metricly is a fictional product; all data is demo content. Every company, person, figure and quote on
                this page is invented for a portfolio demonstration.
              </p>
              <button
                type="button"
                onClick={() => onOpenApp()}
                className="mc-lift mt-5 rounded-lg bg-metric-400 px-4 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-metric-300"
              >
                Try the live app
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-graphite-800 pt-6 sm:flex-row">
            <p className="text-xs text-graphite-500">© 2026 Metricly — a fictional demo product.</p>
            <p className="text-xs text-graphite-500">Graphite &amp; signal. No real churn was saved.</p>
          </div>
        </div>
      </footer>
    </MotionRoot>
  );
}
