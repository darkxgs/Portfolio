"use client";

import { useState } from "react";
import ShopView from "./ShopView";
import DashboardView from "./DashboardView";
import {
  SEED_ORDERS,
  FIRST_VISITOR_ORDER_ID,
  type BasketLine,
  type Order,
  type SignatureBowl,
} from "./data";

type View = "shop" | "dashboard";

export default function SaladDemoPage() {
  const [view, setView] = useState<View>("shop");
  const [basket, setBasket] = useState<BasketLine[]>([]);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [nextOrderId, setNextOrderId] = useState(FIRST_VISITOR_ORDER_ID);
  const [lineSeq, setLineSeq] = useState(1);
  const [confirmed, setConfirmed] = useState<Order | null>(null);

  const addSignature = (bowl: SignatureBowl) => {
    setBasket((prev) => {
      const existing = prev.find((l) => l.name === bowl.name && !l.detail);
      if (existing) {
        return prev.map((l) =>
          l.id === existing.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [
        ...prev,
        { id: lineSeq, name: bowl.name, unitPrice: bowl.price, qty: 1 },
      ];
    });
    setLineSeq((n) => n + 1);
  };

  const addCustom = ({ unitPrice, detail }: { unitPrice: number; detail: string }) => {
    setBasket((prev) => [
      ...prev,
      { id: lineSeq, name: "Custom bowl", unitPrice, qty: 1, detail },
    ]);
    setLineSeq((n) => n + 1);
  };

  const changeQty = (id: number, delta: number) => {
    setBasket((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  };

  const placeOrder = (customer: string, slot: string) => {
    if (basket.length === 0) return;
    const order: Order = {
      id: nextOrderId,
      customer,
      placedLabel: "just now",
      status: "Preparing",
      items: basket.map((l) => ({
        name: l.name,
        qty: l.qty,
        unitPrice: l.unitPrice,
        detail: l.detail,
      })),
      total: basket.reduce((s, l) => s + l.unitPrice * l.qty, 0),
      readyAt: slot,
      fromVisitor: true,
    };
    setOrders((prev) => [order, ...prev]);
    setNextOrderId((n) => n + 1);
    setConfirmed(order);
    setBasket([]);
  };

  const advanceOrder = (id: number) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        if (o.status === "Preparing") return { ...o, status: "Ready" as const };
        if (o.status === "Ready") return { ...o, status: "Picked up" as const };
        return o;
      }),
    );
  };

  const openOrders = orders.filter((o) => o.status !== "Picked up").length;

  return (
    <div className="min-h-screen bg-sage-50 text-sage-900">
      {/* Product top bar */}
      <header className="sticky top-0 z-30 border-b border-sage-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-leaf-600"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.5 3.5c.3 6.6-1.6 11.2-4.6 13.9-2.3 2-5.2 2.7-8 2.1.5-1.2 1.2-2.4 2.2-3.5 1.6-1.9 3.8-3.4 5.9-4.9-2.5 1-4.9 2.3-6.9 4.1-1 .9-1.9 2-2.6 3.2-1.4-1.5-2.2-3.6-2-5.9.3-2.7 2-4.9 4.5-6.1 3.2-1.6 7.3-1.5 11.5-2.9z" />
            </svg>
            <span className="text-lg font-extrabold tracking-tight text-sage-900">
              Green<span className="text-leaf-600">Bowl</span>
            </span>
          </div>

          <nav aria-label="View switcher" className="flex rounded-xl border border-sage-200 bg-sage-50 p-1">
            <button
              type="button"
              onClick={() => setView("shop")}
              aria-pressed={view === "shop"}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 sm:px-4 ${
                view === "shop"
                  ? "border border-leaf-300 bg-leaf-100 text-leaf-800"
                  : "border border-transparent text-sage-600 hover:text-sage-900"
              }`}
            >
              Shop
            </button>
            <button
              type="button"
              onClick={() => setView("dashboard")}
              aria-pressed={view === "dashboard"}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 sm:px-4 ${
                view === "dashboard"
                  ? "border border-leaf-300 bg-leaf-100 text-leaf-800"
                  : "border border-transparent text-sage-600 hover:text-sage-900"
              }`}
            >
              Store dashboard
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  view === "dashboard"
                    ? "bg-leaf-600 text-white"
                    : "bg-sage-200 text-sage-600"
                }`}
              >
                {openOrders}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {view === "shop" ? (
        <ShopView
          basket={basket}
          addSignature={addSignature}
          addCustom={addCustom}
          onQty={changeQty}
          placeOrder={placeOrder}
          confirmed={confirmed}
          onOrderAgain={() => setConfirmed(null)}
        />
      ) : (
        <DashboardView orders={orders} onAdvance={advanceOrder} />
      )}

      <footer className="border-t border-sage-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-sage-600 sm:px-6">
          GreenBowl is a fictional store built as a portfolio demo — orders,
          payments and stock levels are simulated in your browser.
        </div>
      </footer>
    </div>
  );
}
