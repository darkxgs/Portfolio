"use client";

import { useState } from "react";
import BowlBuilder from "./BowlBuilder";
import BasketPanel from "./BasketPanel";
import {
  SIGNATURE_BOWLS,
  PICKUP_SLOTS,
  euro,
  type BasketLine,
  type DietTag,
  type Order,
  type SignatureBowl,
} from "./data";

const TAG_STYLES: Record<DietTag, string> = {
  Vegan: "bg-leaf-100 text-leaf-800",
  Veggie: "bg-leaf-50 text-leaf-700",
  "High protein": "bg-citrus-100 text-citrus-700",
};

type Props = {
  basket: BasketLine[];
  addSignature: (bowl: SignatureBowl) => void;
  addCustom: (bowl: { unitPrice: number; detail: string }) => void;
  onQty: (id: number, delta: number) => void;
  placeOrder: (name: string, slot: string) => void;
  confirmed: Order | null;
  onOrderAgain: () => void;
};

export default function ShopView({
  basket,
  addSignature,
  addCustom,
  onQty,
  placeOrder,
  confirmed,
  onOrderAgain,
}: Props) {
  const [custName, setCustName] = useState("");
  const [slot, setSlot] = useState(PICKUP_SLOTS[0]);
  const [attempted, setAttempted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const itemCount = basket.reduce((s, l) => s + l.qty, 0);
  const subtotal = basket.reduce((s, l) => s + l.unitPrice * l.qty, 0);

  const handlePay = () => {
    if (custName.trim().length < 2) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    placeOrder(custName.trim(), slot);
  };

  const handleOrderAgain = () => {
    setAttempted(false);
    setCustName("");
    setSlot(PICKUP_SLOTS[0]);
    setSheetOpen(false);
    onOrderAgain();
  };

  const panelProps = {
    basket,
    onQty,
    custName,
    onNameChange: setCustName,
    slot,
    onSlotChange: setSlot,
    attempted,
    onPay: handlePay,
    confirmed,
    onOrderAgain: handleOrderAgain,
  };

  const scrollToBuilder = () => {
    document.getElementById("bowl-builder")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-8">
        {/* ---- Main column ---- */}
        <div className="min-w-0 space-y-10">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl border border-sage-200 shadow-sm">
            <img
              src="/salads/hero.jpg"
              alt="Fresh salad bowls on a market table"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sage-50/95 via-sage-50/80 to-sage-50/20" />
            <div className="relative max-w-xl px-6 py-12 sm:px-10 sm:py-16">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-leaf-800 ring-1 ring-leaf-300">
                Open today · pickup 12:00–14:30
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-sage-900 sm:text-4xl">
                Salads built your way, ready in minutes
              </h1>
              <p className="mt-3 text-base text-sage-700">
                Eight signature bowls tossed fresh every morning — or start from
                a base and build exactly the bowl you are craving.
              </p>
              <button
                type="button"
                onClick={scrollToBuilder}
                className="mt-6 rounded-xl bg-leaf-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
              >
                Build your own →
              </button>
            </div>
          </section>

          {/* Signature bowls */}
          <section>
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold text-sage-900">Signature bowls</h2>
              <span className="text-sm text-sage-600">{SIGNATURE_BOWLS.length} bowls</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {SIGNATURE_BOWLS.map((bowl) => (
                <article
                  key={bowl.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-sm"
                >
                  <img
                    src={bowl.img}
                    alt={bowl.name}
                    className="h-44 w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-sage-900">{bowl.name}</h3>
                      <span className="shrink-0 font-bold text-citrus-600">
                        {euro(bowl.price)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-snug text-sage-600">
                      {bowl.ingredients}
                    </p>
                    <div className="mt-2 text-xs text-sage-600">
                      {bowl.kcal} kcal · {bowl.protein}g protein
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {bowl.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${TAG_STYLES[tag]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addSignature(bowl)}
                      className="mt-4 w-full rounded-xl bg-leaf-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-leaf-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
                    >
                      Add to basket
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Bowl builder */}
          <BowlBuilder onAdd={addCustom} />
        </div>

        {/* ---- Desktop basket sidebar ---- */}
        <aside className="mt-10 hidden lg:sticky lg:top-20 lg:mt-0 lg:block">
          <div className="rounded-2xl border border-sage-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-sage-200 px-5 py-4">
              <h2 className="font-bold text-sage-900">Your basket</h2>
              {itemCount > 0 && !confirmed && (
                <span className="rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-semibold text-leaf-800">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            <BasketPanel {...panelProps} idPrefix="side" />
          </div>
        </aside>
      </div>

      {/* ---- Mobile floating basket bar ---- */}
      {(itemCount > 0 || confirmed) && !sheetOpen && (
        <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex w-full items-center justify-between rounded-2xl bg-leaf-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-leaf-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
          >
            {confirmed ? (
              <>
                <span>Order #{confirmed.id} confirmed</span>
                <span>View receipt →</span>
              </>
            ) : (
              <>
                <span>
                  View basket · {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
                <span>{euro(subtotal)}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* ---- Mobile bottom sheet ---- */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close basket"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-sage-900/40"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-sage-200 bg-white px-5 py-4">
              <h2 className="font-bold text-sage-900">
                {confirmed ? "Your receipt" : "Your basket"}
              </h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close basket"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-sage-200 text-sage-600 transition-colors hover:text-sage-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
              >
                ✕
              </button>
            </div>
            <BasketPanel {...panelProps} idPrefix="sheet" />
          </div>
        </div>
      )}
    </div>
  );
}
