"use client";

import { useState } from "react";
import {
  BASES,
  PROTEINS,
  TOPPINGS,
  DRESSINGS,
  MAX_TOPPINGS,
  euro,
  type BuilderOption,
} from "./data";

type Props = {
  onAdd: (bowl: { unitPrice: number; detail: string }) => void;
};

function OptionButton({
  option,
  selected,
  disabled,
  onClick,
  showProtein,
}: {
  option: BuilderOption;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  showProtein?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex flex-col items-start gap-0.5 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 ${
        selected
          ? "bg-leaf-100 border-leaf-300 text-leaf-800"
          : disabled
            ? "bg-sage-50 border-sage-200 text-sage-600 opacity-60 cursor-not-allowed"
            : "bg-white border-sage-200 text-sage-900 hover:border-leaf-300 hover:bg-leaf-50"
      }`}
    >
      <span className="font-medium leading-tight">{option.name}</span>
      <span className={selected ? "text-leaf-800/80 text-xs" : "text-sage-600 text-xs"}>
        {option.price > 0 && `+${euro(option.price)} · `}
        {option.kcal} kcal
        {showProtein && option.protein !== undefined && ` · ${option.protein}g protein`}
      </span>
    </button>
  );
}

function SectionHeading({
  step,
  title,
  hint,
}: {
  step: number;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h4 className="text-sm font-semibold text-sage-900">
        <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-leaf-600 text-[11px] font-bold text-white align-middle">
          {step}
        </span>
        {title}
      </h4>
      <span className="text-xs text-sage-600">{hint}</span>
    </div>
  );
}

export default function BowlBuilder({ onAdd }: Props) {
  const [baseId, setBaseId] = useState<string | null>(null);
  const [proteinId, setProteinId] = useState<string | null>(null);
  const [toppingIds, setToppingIds] = useState<string[]>([]);
  const [dressingId, setDressingId] = useState<string | null>(null);

  const base = BASES.find((b) => b.id === baseId) ?? null;
  const protein = PROTEINS.find((p) => p.id === proteinId) ?? null;
  const toppings = TOPPINGS.filter((t) => toppingIds.includes(t.id));
  const dressing = DRESSINGS.find((d) => d.id === dressingId) ?? null;

  const picked = [base, protein, ...toppings, dressing].filter(
    (o): o is BuilderOption => o !== null,
  );
  const totalPrice = picked.reduce((s, o) => s + o.price, 0);
  const totalKcal = picked.reduce((s, o) => s + o.kcal, 0);
  const totalProtein = picked.reduce((s, o) => s + (o.protein ?? 0), 0);

  const complete = base !== null && protein !== null && dressing !== null;

  const toggleTopping = (id: string) => {
    setToppingIds((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= MAX_TOPPINGS) return prev; // cap: a 5th pick does nothing
      return [...prev, id];
    });
  };

  const handleAdd = () => {
    if (!complete || !base || !protein || !dressing) return;
    const toppingNames =
      toppings.length > 0 ? toppings.map((t) => t.name).join(", ") : "No toppings";
    onAdd({
      unitPrice: totalPrice,
      detail: `${base.name} · ${protein.name} · ${toppingNames} · ${dressing.name}`,
    });
    setBaseId(null);
    setProteinId(null);
    setToppingIds([]);
    setDressingId(null);
  };

  return (
    <section
      id="bowl-builder"
      className="scroll-mt-24 rounded-2xl border border-sage-200 bg-white shadow-sm"
    >
      <div className="border-b border-sage-200 px-5 py-4 sm:px-6">
        <h3 className="text-lg font-bold text-sage-900">The Bowl Builder</h3>
        <p className="mt-0.5 text-sm text-sage-600">
          Pick a base, a protein, up to {MAX_TOPPINGS} toppings and a dressing —
          totals update as you go.
        </p>
      </div>

      <div className="space-y-6 px-5 py-5 sm:px-6">
        <div className="space-y-2.5">
          <SectionHeading step={1} title="Choose your base" hint="pick exactly 1" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {BASES.map((b) => (
              <OptionButton
                key={b.id}
                option={b}
                selected={baseId === b.id}
                onClick={() => setBaseId(b.id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <SectionHeading step={2} title="Add a protein" hint="pick exactly 1" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PROTEINS.map((p) => (
              <OptionButton
                key={p.id}
                option={p}
                selected={proteinId === p.id}
                onClick={() => setProteinId(p.id)}
                showProtein
              />
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <SectionHeading
            step={3}
            title="Pile on toppings"
            hint={`${toppingIds.length} of ${MAX_TOPPINGS} toppings`}
          />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {TOPPINGS.map((t) => {
              const selected = toppingIds.includes(t.id);
              const capReached = !selected && toppingIds.length >= MAX_TOPPINGS;
              return (
                <OptionButton
                  key={t.id}
                  option={t}
                  selected={selected}
                  disabled={capReached}
                  onClick={() => toggleTopping(t.id)}
                />
              );
            })}
          </div>
          {toppingIds.length >= MAX_TOPPINGS && (
            <p className="text-xs text-citrus-600">
              Topping limit reached — remove one to swap it for another.
            </p>
          )}
        </div>

        <div className="space-y-2.5">
          <SectionHeading step={4} title="Finish with a dressing" hint="pick exactly 1" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {DRESSINGS.map((d) => (
              <OptionButton
                key={d.id}
                option={d}
                selected={dressingId === d.id}
                onClick={() => setDressingId(d.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-sage-200 bg-sage-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 rounded-b-2xl">
        <div className="flex items-center gap-5">
          <div>
            <div className="text-xs text-sage-600">Price</div>
            <div className="text-lg font-bold text-citrus-600">{euro(totalPrice)}</div>
          </div>
          <div>
            <div className="text-xs text-sage-600">Energy</div>
            <div className="text-lg font-bold text-sage-900">{totalKcal} kcal</div>
          </div>
          <div>
            <div className="text-xs text-sage-600">Protein</div>
            <div className="text-lg font-bold text-sage-900">{totalProtein}g</div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!complete}
          className={`rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 ${
            complete
              ? "bg-leaf-600 text-white hover:bg-leaf-700"
              : "cursor-not-allowed bg-sage-200 text-sage-600"
          }`}
        >
          {complete
            ? `Add my bowl — ${euro(totalPrice)}`
            : "Pick a base, protein & dressing"}
        </button>
      </div>
    </section>
  );
}
