"use client";

import { euro, SEED_SOLD, STOCK, type Order, type OrderStatus } from "./data";

type Props = {
  orders: Order[];
  onAdvance: (id: number) => void;
};

const STATUS_BADGE: Record<OrderStatus, string> = {
  Preparing: "bg-citrus-100 text-citrus-700",
  Ready: "bg-leaf-100 text-leaf-800",
  "Picked up": "bg-sage-100 text-sage-600",
};

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  Preparing: "Mark ready",
  Ready: "Mark picked up",
};

function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-sage-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-sage-600">
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-extrabold text-sage-900">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-sage-600">{hint}</div>}
    </div>
  );
}

export default function DashboardView({ orders, onAdvance }: Props) {
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const totalBowls = orders.reduce(
    (s, o) => s + o.items.reduce((q, it) => q + it.qty, 0),
    0,
  );
  const avgBowl = totalBowls > 0 ? revenue / totalBowls : 0;

  // Seeded sold counts + live visitor orders drive the bestseller ranking.
  const sold: Record<string, number> = { ...SEED_SOLD };
  for (const o of orders) {
    if (!o.fromVisitor) continue;
    for (const it of o.items) {
      sold[it.name] = (sold[it.name] ?? 0) + it.qty;
    }
  }
  const ranked = Object.entries(sold).sort((a, b) => b[1] - a[1]);
  const top5 = ranked.slice(0, 5);
  const maxSold = top5.length > 0 ? top5[0][1] : 1;
  const bestSeller = ranked.length > 0 ? ranked[0][0] : "—";

  const active = orders.filter((o) => o.status !== "Picked up");
  const done = orders.filter((o) => o.status === "Picked up");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-bold text-sage-900">Store dashboard</h1>
        <span className="text-sm text-sage-600">Tuesday · lunch service</span>
      </div>

      {/* Stat tiles */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatTile label="Orders today" value={String(orders.length)} hint="incl. live shop orders" />
        <StatTile label="Revenue today" value={euro(revenue)} hint="pickup only" />
        <StatTile label="Average bowl value" value={euro(avgBowl)} hint={`${totalBowls} bowls sold`} />
        <StatTile label="Best seller" value={bestSeller} hint="by quantity" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Orders board */}
        <section className="lg:col-span-2">
          <div className="rounded-2xl border border-sage-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-sage-200 px-5 py-4">
              <h2 className="font-bold text-sage-900">Orders board</h2>
              <span className="rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-semibold text-leaf-800">
                {active.length} open
              </span>
            </div>

            <div className="max-h-[30rem] space-y-3 overflow-y-auto p-4">
              {active.length === 0 ? (
                <div className="rounded-xl bg-sage-50 px-4 py-8 text-center">
                  <p className="text-sm font-semibold text-sage-900">All caught up</p>
                  <p className="mt-1 text-sm text-sage-600">
                    No open orders right now — new shop orders appear here instantly.
                  </p>
                </div>
              ) : (
                active.map((o) => (
                  <article
                    key={o.id}
                    className={`rounded-xl border p-4 ${
                      o.fromVisitor
                        ? "border-leaf-300 bg-leaf-50"
                        : "border-sage-200 bg-white"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sage-900">#{o.id}</span>
                        <span className="text-sm text-sage-600">{o.customer}</span>
                        {o.fromVisitor && (
                          <span className="rounded-full bg-leaf-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-sage-600">
                          Placed {o.placedLabel}
                          {o.readyAt && ` · pickup ${o.readyAt}`}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[o.status]}`}
                        >
                          {o.status}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-2.5 space-y-1">
                      {o.items.map((it, i) => (
                        <li key={i} className="text-sm text-sage-900">
                          <span className="font-medium">
                            {it.qty} × {it.name}
                          </span>
                          {it.detail && (
                            <span className="block text-xs text-sage-600">{it.detail}</span>
                          )}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 flex items-center justify-between border-t border-sage-200 pt-3">
                      <span className="text-sm font-bold text-sage-900">
                        {euro(o.total)}
                      </span>
                      {NEXT_LABEL[o.status] && (
                        <button
                          type="button"
                          onClick={() => onAdvance(o.id)}
                          className="rounded-lg bg-leaf-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-leaf-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
                        >
                          {NEXT_LABEL[o.status]} →
                        </button>
                      )}
                    </div>
                  </article>
                ))
              )}

              {/* Done list */}
              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-sage-600">
                  Done · picked up
                </h3>
                {done.length === 0 ? (
                  <p className="mt-2 rounded-xl bg-sage-50 px-4 py-3 text-sm text-sage-600">
                    Nothing picked up yet.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-1.5">
                    {done.map((o) => (
                      <li
                        key={o.id}
                        className="flex items-center justify-between rounded-xl bg-sage-50 px-4 py-2.5 text-sm text-sage-600"
                      >
                        <span>
                          <span className="font-semibold">#{o.id}</span> · {o.customer} ·{" "}
                          {o.items.reduce((q, it) => q + it.qty, 0)}{" "}
                          {o.items.reduce((q, it) => q + it.qty, 0) === 1 ? "bowl" : "bowls"}
                        </span>
                        <span>{euro(o.total)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Right column */}
        <div className="space-y-6">
          {/* Bestsellers */}
          <section className="rounded-2xl border border-sage-200 bg-white shadow-sm">
            <div className="border-b border-sage-200 px-5 py-4">
              <h2 className="font-bold text-sage-900">Today&apos;s bestsellers</h2>
            </div>
            <div className="space-y-3.5 p-5">
              {top5.map(([name, count]) => (
                <div key={name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-sage-900">{name}</span>
                    <span className="text-sage-600">{count} sold</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sage-100">
                    <div
                      className="h-full rounded-full bg-leaf-500 transition-all"
                      style={{ width: `${Math.round((count / maxSold) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Running low */}
          <section className="rounded-2xl border border-sage-200 bg-white shadow-sm">
            <div className="border-b border-sage-200 px-5 py-4">
              <h2 className="font-bold text-sage-900">Running low</h2>
            </div>
            <ul className="divide-y divide-sage-200">
              {STOCK.map((s) => {
                const low = s.left < s.threshold;
                return (
                  <li key={s.name} className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm font-medium text-sage-900">{s.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-sm text-sage-600">{s.left} left</span>
                      {low && (
                        <span className="rounded-full bg-citrus-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-citrus-700">
                          Low
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="border-t border-sage-200 px-5 py-3 text-xs text-sage-600">
              Items under 10 portions are flagged for the next prep run.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
