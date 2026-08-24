"use client";

import { euro, PICKUP_SLOTS, type BasketLine, type Order } from "./data";

type Props = {
  basket: BasketLine[];
  onQty: (id: number, delta: number) => void;
  custName: string;
  onNameChange: (v: string) => void;
  slot: string;
  onSlotChange: (v: string) => void;
  attempted: boolean;
  onPay: () => void;
  confirmed: Order | null;
  onOrderAgain: () => void;
  idPrefix: string;
};

export default function BasketPanel({
  basket,
  onQty,
  custName,
  onNameChange,
  slot,
  onSlotChange,
  attempted,
  onPay,
  confirmed,
  onOrderAgain,
  idPrefix,
}: Props) {
  const subtotal = basket.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const nameInvalid = attempted && custName.trim().length < 2;

  if (confirmed) {
    return (
      <div className="p-5">
        <div className="flex flex-col items-center rounded-xl bg-leaf-50 px-4 py-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-600 text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <h3 className="mt-3 text-lg font-bold text-sage-900">
            Order #{confirmed.id} confirmed
          </h3>
          <p className="mt-1 text-sm text-sage-600">
            Thanks, {confirmed.customer}! Your bowls will be ready at{" "}
            <span className="font-semibold text-leaf-800">{confirmed.readyAt}</span>.
          </p>
        </div>

        <ul className="mt-4 divide-y divide-sage-200 border-y border-sage-200">
          {confirmed.items.map((it, i) => (
            <li key={i} className="flex items-start justify-between gap-3 py-2.5 text-sm">
              <div className="min-w-0">
                <div className="font-medium text-sage-900">
                  {it.qty} × {it.name}
                </div>
                {it.detail && (
                  <div className="mt-0.5 text-xs text-sage-600">{it.detail}</div>
                )}
              </div>
              <div className="shrink-0 font-medium text-sage-900">
                {euro(it.unitPrice * it.qty)}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between text-sm font-bold text-sage-900">
          <span>Paid (demo)</span>
          <span className="text-citrus-600">{euro(confirmed.total)}</span>
        </div>

        <p className="mt-4 rounded-xl bg-sage-50 px-3 py-2.5 text-xs text-sage-600">
          The store dashboard just received this order — switch to{" "}
          <span className="font-semibold text-sage-900">Store dashboard</span> to
          watch it move through the kitchen.
        </p>

        <button
          type="button"
          onClick={onOrderAgain}
          className="mt-4 w-full rounded-xl bg-leaf-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
        >
          Order again
        </button>
      </div>
    );
  }

  if (basket.length === 0) {
    return (
      <div className="flex flex-col items-center px-5 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-500">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10h16l-1.5 9a2 2 0 01-2 1.7h-9a2 2 0 01-2-1.7L4 10z" />
            <path d="M8 10V7a4 4 0 018 0v3" />
          </svg>
        </span>
        <p className="mt-3 text-sm font-semibold text-sage-900">Your basket is empty</p>
        <p className="mt-1 text-sm text-sage-600">
          Add a signature bowl or build your own to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <ul className="divide-y divide-sage-200">
        {basket.map((line) => (
          <li key={line.id} className="flex items-start justify-between gap-3 py-3">
            <div className="min-w-0">
              <div className="text-sm font-medium text-sage-900">{line.name}</div>
              {line.detail && (
                <div className="mt-0.5 text-xs text-sage-600">{line.detail}</div>
              )}
              <div className="mt-0.5 text-xs text-sage-600">
                {euro(line.unitPrice)} each
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="text-sm font-semibold text-sage-900">
                {euro(line.unitPrice * line.qty)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onQty(line.id, -1)}
                  aria-label={`Decrease quantity of ${line.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-sage-200 text-sage-600 transition-colors hover:border-leaf-300 hover:text-leaf-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold text-sage-900">
                  {line.qty}
                </span>
                <button
                  type="button"
                  onClick={() => onQty(line.id, 1)}
                  aria-label={`Increase quantity of ${line.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-sage-200 text-sage-600 transition-colors hover:border-leaf-300 hover:text-leaf-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-sage-200 pt-3">
        <span className="text-sm font-semibold text-sage-900">Subtotal</span>
        <span className="text-lg font-bold text-citrus-600">{euro(subtotal)}</span>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label
            htmlFor={`${idPrefix}-pickup`}
            className="mb-1 block text-xs font-semibold text-sage-900"
          >
            Pickup time
          </label>
          <select
            id={`${idPrefix}-pickup`}
            value={slot}
            onChange={(e) => onSlotChange(e.target.value)}
            className="w-full rounded-xl border border-sage-200 bg-white px-3 py-2.5 text-sm text-sage-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
          >
            {PICKUP_SLOTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="mb-1 block text-xs font-semibold text-sage-900"
          >
            Name for pickup
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            value={custName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Alex"
            className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-sage-900 placeholder:text-sage-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 ${
              nameInvalid ? "border-citrus-500" : "border-sage-200"
            }`}
          />
          {nameInvalid && (
            <p className="mt-1 text-xs text-citrus-600">
              Please add a name (at least 2 characters) so we can call your order.
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onPay}
        className="mt-4 w-full rounded-xl bg-leaf-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
      >
        Pay {euro(subtotal)} (demo)
      </button>
      <p className="mt-2 text-center text-xs text-sage-600">
        No real payment — this is a portfolio demo.
      </p>
    </div>
  );
}
