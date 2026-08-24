"use client";

import { useState } from "react";
import { INVOICES, PLANS, type Plan, type PlanId } from "./data";

// Fictional fixed billing cycle: Aug 1 – Aug 31, 2026, "today" is Aug 24.
const DAYS_IN_CYCLE = 31;
const DAYS_REMAINING = 7;

function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

export default function BillingView() {
  const [planId, setPlanId] = useState<PlanId>("growth");
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const current: Plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const original: Plan = PLANS[1]; // Growth — the plan on file this cycle
  const changed = planId !== original.id;

  const proratedFraction = DAYS_REMAINING / DAYS_IN_CYCLE;
  const adjustment = changed
    ? (current.price - original.price) * proratedFraction
    : 0;
  const nextTotal = current.price + adjustment;

  const choosePlan = (id: PlanId): void => {
    setPlanId(id);
    const p = PLANS.find((x) => x.id === id);
    if (p) {
      setConfirmed(
        id === original.id
          ? "Back on the Growth plan — no changes will be billed."
          : `Plan changed to ${p.name}. Your next invoice includes a prorated adjustment.`,
      );
    }
  };

  return (
    <div className="space-y-6">
      {confirmed && (
        <div className="flex items-center justify-between rounded-lg border border-metric-400/25 bg-metric-400/15 px-4 py-2.5 text-sm text-metric-300">
          <span className="flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 8.5l3.5 3.5L13 5" />
            </svg>
            {confirmed}
          </span>
          <button
            onClick={() => setConfirmed(null)}
            className="ml-3 text-metric-400/60 transition-colors hover:text-metric-300"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        {/* current plan card */}
        <div className="min-w-0 rounded-2xl border border-metric-400/40 bg-graphite-900/40 p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-graphite-300">
                Current plan
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-graphite-50">
                {current.name}
              </h2>
              <p className="mt-1 text-sm text-graphite-300">{current.tagline}</p>
            </div>
            <span className="rounded-full border border-metric-400/25 bg-metric-400/15 px-2.5 py-1 font-mono text-xs text-metric-300">
              Active
            </span>
          </div>
          <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold text-graphite-50">
            ${current.price}
            <span className="text-sm font-normal text-graphite-300"> /mo</span>
          </p>
          <ul className="mt-5 space-y-2 text-sm text-graphite-100">
            {[current.seats, current.docs, "Priority support"].map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0 text-metric-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 8.5l3.5 3.5L13 5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* next invoice preview */}
          <div className="mt-6 rounded-xl border border-graphite-700 bg-graphite-950/50 p-4">
            <p className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-graphite-300">
              Next invoice preview
              <span className="font-mono normal-case tracking-normal">
                Sep 1, 2026
              </span>
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-graphite-300">{current.name} plan (Sep)</dt>
                <dd className="font-mono text-graphite-100">
                  {money(current.price)}
                </dd>
              </div>
              {changed && (
                <div className="flex justify-between">
                  <dt className="text-graphite-300">
                    Prorated {adjustment >= 0 ? "charge" : "credit"} ·{" "}
                    {DAYS_REMAINING} of {DAYS_IN_CYCLE} days
                  </dt>
                  <dd
                    className={`font-mono ${
                      adjustment >= 0 ? "text-graphite-100" : "text-pos-500"
                    }`}
                  >
                    {adjustment >= 0 ? "" : "−"}
                    {money(Math.abs(adjustment))}
                  </dd>
                </div>
              )}
              <div className="flex justify-between border-t border-graphite-700 pt-2">
                <dt className="font-medium text-graphite-50">Total due</dt>
                <dd className="font-mono font-semibold text-graphite-50">
                  {money(nextTotal)}
                </dd>
              </div>
            </dl>
            {changed && (
              <p className="mt-3 text-xs text-graphite-300">
                Switching mid-cycle: the remaining {DAYS_REMAINING} days of
                August are billed at the new rate.
              </p>
            )}
          </div>
        </div>

        {/* plan switcher */}
        <div className="min-w-0 space-y-4 lg:col-span-3">
          <div className="rounded-2xl border border-graphite-700 bg-graphite-900/40 p-5 sm:p-6">
            <h2 className="font-medium text-graphite-50">Change plan</h2>
            <p className="mt-1 text-sm text-graphite-300">
              Switch any time — changes are prorated automatically.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {PLANS.map((p) => {
                const selected = p.id === planId;
                return (
                  <button
                    key={p.id}
                    onClick={() => choosePlan(p.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      selected
                        ? "border-metric-400/60 bg-metric-400/10 ring-1 ring-metric-400/40"
                        : "border-graphite-700 bg-graphite-900/60 hover:border-graphite-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-graphite-50">{p.name}</span>
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          selected
                            ? "border-metric-400 bg-metric-400"
                            : "border-graphite-500"
                        }`}
                      >
                        {selected && (
                          <svg
                            viewBox="0 0 12 12"
                            className="h-2.5 w-2.5 text-graphite-950"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M2.5 6.5l2.5 2.5L9.5 4" />
                          </svg>
                        )}
                      </span>
                    </div>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-graphite-50">
                      ${p.price}
                      <span className="text-xs font-normal text-graphite-300">
                        /mo
                      </span>
                    </p>
                    <p className="mt-2 text-xs text-graphite-300">{p.seats}</p>
                    <p className="text-xs text-graphite-300">{p.docs}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* invoices */}
          <div className="overflow-hidden rounded-2xl border border-graphite-700 bg-graphite-900/40">
            <div className="border-b border-graphite-700 px-5 py-4">
              <h2 className="font-medium text-graphite-50">Past invoices</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-graphite-700 text-left text-xs uppercase tracking-wider text-graphite-300">
                    <th className="px-5 py-3 font-medium">Invoice</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Period</th>
                    <th className="px-5 py-3 text-right font-medium">Amount</th>
                    <th className="px-5 py-3 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {INVOICES.map((inv) => (
                    <tr
                      key={inv.number}
                      className="border-b border-graphite-700/60 transition-colors last:border-0 hover:bg-graphite-800/40"
                    >
                      <td className="px-5 py-3 font-mono text-xs text-graphite-100">
                        {inv.number}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-graphite-300">
                        {inv.date}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-graphite-300">
                        {inv.period}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-graphite-100">
                        ${inv.amount.toFixed(2)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs ${
                            inv.status === "Paid"
                              ? "border-pos-500/25 bg-pos-500/15 text-pos-500"
                              : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              inv.status === "Paid" ? "bg-pos-500" : "bg-amber-400"
                            }`}
                          />
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
