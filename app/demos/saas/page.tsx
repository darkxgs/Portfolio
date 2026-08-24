"use client";

import { useState } from "react";
import BillingView from "./BillingView";
import DashboardView from "./DashboardView";
import HealthView from "./HealthView";
import UsersView from "./UsersView";
import type { ViewKey } from "./data";

interface NavItem {
  key: ViewKey;
  label: string;
  icon: React.ReactNode;
}

const iconProps = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const NAV: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <svg {...iconProps} className="h-4 w-4" aria-hidden>
        <path d="M3 11l4-4 3.5 3.5L16 5" />
        <path d="M12 5h4v4" />
        <path d="M3 16h14" />
      </svg>
    ),
  },
  {
    key: "users",
    label: "Users",
    icon: (
      <svg {...iconProps} className="h-4 w-4" aria-hidden>
        <circle cx="7.5" cy="7" r="3" />
        <path d="M2.5 16.5c.7-2.8 2.7-4.3 5-4.3s4.3 1.5 5 4.3" />
        <path d="M13.5 5.2a2.6 2.6 0 010 4.7M15 12.6c1.4.6 2.3 1.9 2.7 3.9" />
      </svg>
    ),
  },
  {
    key: "billing",
    label: "Billing",
    icon: (
      <svg {...iconProps} className="h-4 w-4" aria-hidden>
        <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
        <path d="M2.5 8.5h15" />
        <path d="M5.5 12.5h4" />
      </svg>
    ),
  },
  {
    key: "health",
    label: "Account health",
    icon: (
      <svg {...iconProps} className="h-4 w-4" aria-hidden>
        <path d="M2.5 10h3l2-4.5 3 9 2-4.5h5" />
      </svg>
    ),
  },
];

const VIEW_TITLES: Record<ViewKey, { title: string; sub: string }> = {
  dashboard: {
    title: "Dashboard",
    sub: "Revenue, activation, and retention for Inkflow — August 2026",
  },
  users: {
    title: "Users",
    sub: "Manage the Inkflow workspace team, roles, and invitations",
  },
  billing: {
    title: "Billing",
    sub: "Plan, upcoming charges, and invoice history",
  },
  health: {
    title: "Account health",
    sub: "Customer accounts ranked by churn risk, with suggested plays",
  },
};

export default function MetriclyDemo() {
  const [view, setView] = useState<ViewKey>("dashboard");

  return (
    <div className="min-h-screen bg-graphite-950 text-graphite-100">
      {/* product top bar */}
      <header className="border-b border-graphite-700 bg-graphite-900/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-metric-400 font-[family-name:var(--font-display)] text-sm font-bold text-graphite-950">
              M
            </span>
            <div className="leading-tight">
              <p className="font-[family-name:var(--font-display)] font-semibold text-graphite-50">
                Metricly
              </p>
              <p className="hidden text-xs text-graphite-400 sm:block">
                Analytics &amp; billing for SaaS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-lg border border-graphite-700 bg-graphite-900/60 px-3 py-1.5 text-xs text-graphite-300 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-metric-400" />
              Workspace: <span className="font-mono text-graphite-100">Inkflow</span>
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-metric-400/25 bg-metric-400/15 font-mono text-xs text-metric-300">
              SA
            </span>
          </div>
        </div>

        {/* mobile tab bar */}
        <nav className="overflow-x-auto border-t border-graphite-700/70 md:hidden">
          <div className="flex min-w-max gap-1 px-3 py-2">
            {NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  view === item.key
                    ? "bg-metric-400/15 font-medium text-metric-300"
                    : "text-graphite-300 hover:bg-graphite-800/60 hover:text-graphite-50"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <div className="mx-auto flex max-w-7xl px-4 sm:px-6">
        {/* sidebar */}
        <aside className="hidden w-52 shrink-0 border-r border-graphite-700/70 py-6 pr-4 md:block">
          <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-widest text-graphite-500">
            Workspace
          </p>
          <nav className="space-y-1">
            {NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  view === item.key
                    ? "bg-metric-400/15 font-medium text-metric-300"
                    : "text-graphite-300 hover:bg-graphite-800/50 hover:text-graphite-50"
                }`}
              >
                <span
                  className={
                    view === item.key ? "text-metric-400" : "text-graphite-400"
                  }
                >
                  {item.icon}
                </span>
                {item.label}
                {view === item.key && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-metric-400" />
                )}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-xl border border-graphite-700 bg-graphite-900/40 p-3">
            <p className="text-xs font-medium text-graphite-100">Growth plan</p>
            <p className="mt-1 text-[11px] leading-relaxed text-graphite-300">
              Renews Sep 1, 2026. Manage it in Billing.
            </p>
            <button
              onClick={() => setView("billing")}
              className="mt-2 text-xs text-metric-400 transition-colors hover:text-metric-300"
            >
              View billing →
            </button>
          </div>
        </aside>

        {/* main */}
        <main className="min-w-0 flex-1 py-6 md:pl-6 lg:pl-8">
          <div className="mb-6">
            <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold text-graphite-50 sm:text-2xl">
              {VIEW_TITLES[view].title}
            </h1>
            <p className="mt-1 text-sm text-graphite-300">{VIEW_TITLES[view].sub}</p>
          </div>
          {view === "dashboard" && <DashboardView />}
          {view === "users" && <UsersView />}
          {view === "billing" && <BillingView />}
          {view === "health" && <HealthView />}
          <footer className="mt-10 border-t border-graphite-700/70 pt-4 pb-6">
            <p className="text-xs text-graphite-400">
              Metricly is a fictional product. All companies, people, and
              figures on this page are invented demo data.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
