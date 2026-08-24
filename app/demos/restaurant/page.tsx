"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  Category,
  ChatMessage,
  DELIVERY_FEE,
  Fulfilment,
  MENU,
  MenuItem,
  OPENING_CLOCK,
  Order,
  OrderLine,
  advanceButtonLabel,
  businessMessage,
  elapsedLabel,
  formatClock,
  formatEuro,
  seedOrders,
  stageLabels,
} from "./data";

type View = "customer" | "kitchen";
type CustomerScreen = "menu" | "status";

/* ---------------------------------- page ---------------------------------- */

export default function TasteBiteDemo() {
  const [view, setView] = useState<View>("customer");
  const [screen, setScreen] = useState<CustomerScreen>("menu");
  const [category, setCategory] = useState<Category>("Starters");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [fulfilment, setFulfilment] = useState<Fulfilment>("collection");
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [myOrderId, setMyOrderId] = useState<string | null>(null);
  const [clock, setClock] = useState(OPENING_CLOCK);
  const [nextNumber, setNextNumber] = useState(1043);
  const [justPlaced, setJustPlaced] = useState(false);

  const cartLines = useMemo<OrderLine[]>(
    () =>
      MENU.filter((m) => (cart[m.id] ?? 0) > 0).map((m) => ({
        itemId: m.id,
        name: m.name,
        emoji: m.emoji,
        price: m.price,
        qty: cart[m.id] ?? 0,
      })),
    [cart],
  );
  const cartCount = cartLines.reduce((s, l) => s + l.qty, 0);
  const subtotal = cartLines.reduce((s, l) => s + l.price * l.qty, 0);
  const deliveryFee = fulfilment === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const openOrders = orders.filter((o) => o.stage < 3);
  const doneOrders = orders.filter((o) => o.stage === 3);
  const myOrder = orders.find((o) => o.id === myOrderId) ?? null;

  function setQty(itemId: string, qty: number) {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[itemId];
      else next[itemId] = qty;
      return next;
    });
  }

  function placeOrder() {
    const errors: { name?: string; phone?: string } = {};
    if (custName.trim().length < 2) errors.name = "Please enter your name";
    if (custPhone.replace(/[^0-9]/g, "").length < 7)
      errors.phone = "Enter a valid phone number";
    setFormErrors(errors);
    if (errors.name || errors.phone || cartLines.length === 0) return;

    const number = nextNumber;
    const id = `order-${number}`;
    const time = formatClock(clock);
    const messages: ChatMessage[] = [
      {
        id: `${id}-msg-c0`,
        from: "customer",
        text: `Just placed order #${number} on tastebite.demo 🍕`,
        time,
      },
      {
        id: `${id}-msg-0`,
        from: "business",
        text: businessMessage(0, number, fulfilment, custName.trim(), total),
        time,
      },
    ];
    const order: Order = {
      id,
      number,
      customer: custName.trim(),
      phone: custPhone.trim(),
      fulfilment,
      lines: cartLines,
      subtotal,
      deliveryFee,
      total,
      stage: 0,
      placedAt: clock,
      messages,
    };
    setOrders((prev) => [...prev, order]);
    setNextNumber(number + 1);
    setMyOrderId(id);
    setCart({});
    setCartOpen(false);
    setCheckoutOpen(false);
    setScreen("status");
    setJustPlaced(true);
  }

  function advanceOrder(orderId: string) {
    setClock((c) => c + 2);
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId || o.stage >= 3) return o;
        const stage = o.stage + 1;
        const msg: ChatMessage = {
          id: `${o.id}-msg-${stage}`,
          from: "business",
          text: businessMessage(stage, o.number, o.fulfilment, o.customer, o.total),
          time: formatClock(clock + 2),
        };
        return { ...o, stage, messages: [...o.messages, msg] };
      }),
    );
  }

  function startNewOrder() {
    setScreen("menu");
    setJustPlaced(false);
    setCustName("");
    setCustPhone("");
    setFormErrors({});
    setFulfilment("collection");
  }

  return (
    <div className="min-h-screen bg-char-950 text-char-100">
      {/* product top bar */}
      <header className="sticky top-0 z-40 border-b border-char-700 bg-char-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ember-400 to-ember-600 text-lg shadow-lg shadow-ember-500/20">
              🍕
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate font-[family-name:var(--font-display)] font-semibold text-char-50">TasteBite</p>
              <p className="hidden text-xs text-char-300 sm:block">
                Neighbourhood grill &amp; pizza
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 rounded-xl border border-char-700 bg-char-900/60 p-1">
            <button
              onClick={() => setView("customer")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                view === "customer"
                  ? "bg-ember-500 text-char-950"
                  : "text-char-300 hover:text-char-50"
              }`}
            >
              Order online
            </button>
            <button
              onClick={() => setView("kitchen")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                view === "kitchen"
                  ? "bg-ember-500 text-char-950"
                  : "text-char-300 hover:text-char-50"
              }`}
            >
              Kitchen
              {openOrders.length > 0 && (
                <span
                  className={`rounded-full px-1.5 text-[11px] font-bold ${
                    view === "kitchen"
                      ? "bg-char-950/20 text-char-950"
                      : "bg-ember-500/15 text-ember-400"
                  }`}
                >
                  {openOrders.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {view === "customer" ? (
          screen === "status" && myOrder ? (
            <StatusScreen
              order={myOrder}
              justPlaced={justPlaced}
              onNewOrder={startNewOrder}
              onGoKitchen={() => setView("kitchen")}
            />
          ) : (
            <CustomerMenu
              category={category}
              setCategory={setCategory}
              cart={cart}
              setQty={setQty}
              cartLines={cartLines}
              cartCount={cartCount}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              fulfilment={fulfilment}
              setFulfilment={setFulfilment}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              checkoutOpen={checkoutOpen}
              setCheckoutOpen={setCheckoutOpen}
              custName={custName}
              setCustName={setCustName}
              custPhone={custPhone}
              setCustPhone={setCustPhone}
              formErrors={formErrors}
              placeOrder={placeOrder}
              hasTrackedOrder={myOrder !== null}
              onViewOrder={() => setScreen("status")}
            />
          )
        ) : (
          <KitchenView
            openOrders={openOrders}
            doneOrders={doneOrders}
            clock={clock}
            advanceOrder={advanceOrder}
          />
        )}
      </main>
    </div>
  );
}

/* ------------------------------ customer: menu ----------------------------- */

interface CustomerMenuProps {
  category: Category;
  setCategory: (c: Category) => void;
  cart: Record<string, number>;
  setQty: (id: string, qty: number) => void;
  cartLines: OrderLine[];
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  fulfilment: Fulfilment;
  setFulfilment: (f: Fulfilment) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  custName: string;
  setCustName: (v: string) => void;
  custPhone: string;
  setCustPhone: (v: string) => void;
  formErrors: { name?: string; phone?: string };
  placeOrder: () => void;
  hasTrackedOrder: boolean;
  onViewOrder: () => void;
}

function CustomerMenu(props: CustomerMenuProps) {
  const {
    category,
    setCategory,
    cart,
    setQty,
    cartCount,
    hasTrackedOrder,
    onViewOrder,
  } = props;
  const items = MENU.filter((m) => m.category === category);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        {/* hero */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-char-700 p-6 sm:p-8">
          <img
            src="/food/hero.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-char-950/95 via-char-950/80 to-char-950/40" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-char-50 sm:text-3xl">
                Hungry? We&apos;re firing up the grill. 🔥
              </h1>
              <p className="mt-1 text-sm text-char-300">
                Order online for delivery or collection — live updates straight to
                your WhatsApp.
              </p>
            </div>
            {hasTrackedOrder && (
              <button
                onClick={onViewOrder}
                className="rounded-lg border border-ember-500/40 bg-ember-500/10 px-4 py-2 text-sm font-medium text-ember-400 transition-colors hover:bg-ember-500/20"
              >
                View my order →
              </button>
            )}
          </div>
        </div>

        {/* category tabs */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                c === category
                  ? "bg-ember-500 text-char-950"
                  : "border border-char-700 bg-char-900/40 text-char-300 hover:border-char-600 hover:text-char-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* menu grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              qty={cart[item.id] ?? 0}
              setQty={setQty}
            />
          ))}
        </div>
      </div>

      {/* desktop cart */}
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <CartPanel {...props} />
        </div>
      </aside>

      {/* mobile cart button + drawer */}
      <div className="lg:hidden">
        {cartCount > 0 && !props.cartOpen && (
          <button
            onClick={() => props.setCartOpen(true)}
            className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-xl bg-ember-500 px-5 py-3.5 font-semibold text-char-950 shadow-xl shadow-ember-500/25 transition-colors hover:bg-ember-400"
          >
            <span>
              View cart · {cartCount} item{cartCount === 1 ? "" : "s"}
            </span>
            <span className="font-mono">{formatEuro(props.total)}</span>
          </button>
        )}
        {props.cartOpen && (
          <div className="fixed inset-0 z-50 flex items-end bg-char-950/70 backdrop-blur-sm">
            <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-t border-char-700 bg-char-950 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-[family-name:var(--font-display)] font-semibold text-char-50">Your order</p>
                <button
                  onClick={() => props.setCartOpen(false)}
                  className="rounded-lg border border-char-700 px-3 py-1 text-sm text-char-300 hover:text-char-50"
                >
                  Close
                </button>
              </div>
              <CartPanel {...props} bare />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuCard({
  item,
  qty,
  setQty,
}: {
  item: MenuItem;
  qty: number;
  setQty: (id: string, qty: number) => void;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-char-700 bg-char-900/40 p-4 transition-colors hover:border-char-600">
      {item.photo ? (
        <img
          src={item.photo}
          alt={item.name}
          className="h-20 w-20 shrink-0 rounded-xl border border-char-700 object-cover"
        />
      ) : (
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-3xl ${item.gradient}`}
        >
          {item.emoji}
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-char-50">{item.name}</h3>
          <span className="flex shrink-0 items-center gap-1.5">
            {item.popular && (
              <span className="rounded-full border border-ember-500/40 bg-ember-500/15 px-2 py-0.5 text-[10px] font-semibold text-ember-300">
                Popular
              </span>
            )}
            <span className="font-mono text-sm text-ember-400">
              {formatEuro(item.price)}
            </span>
          </span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-char-300">
          {item.description}
        </p>
        <div className="mt-auto pt-2.5">
          {qty === 0 ? (
            <button
              onClick={() => setQty(item.id, 1)}
              className="rounded-lg bg-ember-500 px-3.5 py-1.5 text-xs font-semibold text-char-950 transition-colors hover:bg-ember-400"
            >
              Add to cart
            </button>
          ) : (
            <div className="inline-flex items-center gap-1 rounded-lg border border-ember-500/40 bg-ember-500/10">
              <button
                onClick={() => setQty(item.id, qty - 1)}
                aria-label={`Remove one ${item.name}`}
                className="px-2.5 py-1.5 text-sm font-bold text-ember-400 hover:text-ember-300"
              >
                −
              </button>
              <span className="min-w-[1.25rem] text-center font-mono text-sm text-char-50">
                {qty}
              </span>
              <button
                onClick={() => setQty(item.id, qty + 1)}
                aria-label={`Add one ${item.name}`}
                className="px-2.5 py-1.5 text-sm font-bold text-ember-400 hover:text-ember-300"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ customer: cart ----------------------------- */

function CartPanel(props: CustomerMenuProps & { bare?: boolean }) {
  const {
    cartLines,
    setQty,
    subtotal,
    deliveryFee,
    total,
    fulfilment,
    setFulfilment,
    checkoutOpen,
    setCheckoutOpen,
    custName,
    setCustName,
    custPhone,
    setCustPhone,
    formErrors,
    placeOrder,
    bare,
  } = props;

  const inner = (
    <>
      {!bare && (
        <h2 className="mb-4 flex items-center gap-2 font-[family-name:var(--font-display)] font-semibold text-char-50">
          <span>🛒</span> Your order
        </h2>
      )}

      {cartLines.length === 0 ? (
        <div className="rounded-xl border border-dashed border-char-700 py-10 text-center">
          <p className="text-3xl">🍽️</p>
          <p className="mt-2 text-sm text-char-300">Your cart is empty</p>
          <p className="text-xs text-char-400">
            Add something tasty from the menu
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {cartLines.map((l) => (
              <li key={l.itemId} className="flex items-center gap-3">
                <span className="text-lg">{l.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-char-50">{l.name}</p>
                  <p className="font-mono text-xs text-char-400">
                    {formatEuro(l.price)} each
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-char-700 bg-char-900/60">
                  <button
                    onClick={() => setQty(l.itemId, l.qty - 1)}
                    aria-label={`Remove one ${l.name}`}
                    className="px-2 py-1 text-sm font-bold text-char-300 hover:text-char-50"
                  >
                    −
                  </button>
                  <span className="min-w-[1.1rem] text-center font-mono text-xs text-char-50">
                    {l.qty}
                  </span>
                  <button
                    onClick={() => setQty(l.itemId, l.qty + 1)}
                    aria-label={`Add one ${l.name}`}
                    className="px-2 py-1 text-sm font-bold text-char-300 hover:text-char-50"
                  >
                    +
                  </button>
                </div>
                <span className="w-14 text-right font-mono text-sm text-char-100">
                  {formatEuro(l.price * l.qty)}
                </span>
              </li>
            ))}
          </ul>

          {/* fulfilment toggle */}
          <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl border border-char-700 bg-char-900/60 p-1">
            {(["collection", "delivery"] as Fulfilment[]).map((f) => (
              <button
                key={f}
                onClick={() => setFulfilment(f)}
                className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  fulfilment === f
                    ? "bg-ember-500 text-char-950"
                    : "text-char-300 hover:text-char-50"
                }`}
              >
                {f === "collection" ? "🛍️ Collection" : "🛵 Delivery"}
              </button>
            ))}
          </div>

          {/* totals */}
          <dl className="mt-4 space-y-1.5 border-t border-char-700 pt-4 text-sm">
            <div className="flex justify-between text-char-300">
              <dt>Subtotal</dt>
              <dd className="font-mono">{formatEuro(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-char-300">
              <dt>{fulfilment === "delivery" ? "Delivery fee" : "Collection"}</dt>
              <dd className="font-mono">
                {fulfilment === "delivery" ? formatEuro(deliveryFee) : "Free"}
              </dd>
            </div>
            <div className="flex justify-between pt-1 font-semibold text-char-50">
              <dt>Total</dt>
              <dd className="font-mono text-ember-400">{formatEuro(total)}</dd>
            </div>
          </dl>

          {/* checkout */}
          {!checkoutOpen ? (
            <button
              onClick={() => setCheckoutOpen(true)}
              className="mt-4 w-full rounded-lg bg-ember-500 px-4 py-2.5 font-semibold text-char-950 transition-colors hover:bg-ember-400"
            >
              Checkout
            </button>
          ) : (
            <div className="mt-4 space-y-3 rounded-xl border border-char-700 bg-char-900/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-char-400">
                Your details
              </p>
              <div>
                <input
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-char-600 bg-char-950 px-3 py-2 text-sm text-char-50 placeholder:text-char-500 focus:border-ember-500 focus:outline-none"
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-400">{formErrors.name}</p>
                )}
              </div>
              <div>
                <input
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  placeholder="Phone (WhatsApp)"
                  inputMode="tel"
                  className="w-full rounded-lg border border-char-600 bg-char-950 px-3 py-2 text-sm text-char-50 placeholder:text-char-500 focus:border-ember-500 focus:outline-none"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-xs text-red-400">{formErrors.phone}</p>
                )}
              </div>
              <button
                onClick={placeOrder}
                className="w-full rounded-lg bg-ember-500 px-4 py-2.5 font-semibold text-char-950 transition-colors hover:bg-ember-400"
              >
                Pay {formatEuro(total)} (demo)
              </button>
              <p className="text-center text-[11px] text-char-400">
                No real payment — this is a fictional demo checkout.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );

  if (bare) return <div>{inner}</div>;
  return (
    <div className="rounded-2xl border border-char-700 bg-char-900/40 p-5">
      {inner}
    </div>
  );
}

/* ----------------------------- customer: status ---------------------------- */

function StatusScreen({
  order,
  justPlaced,
  onNewOrder,
  onGoKitchen,
}: {
  order: Order;
  justPlaced: boolean;
  onNewOrder: () => void;
  onGoKitchen: () => void;
}) {
  const labels = stageLabels(order.fulfilment);
  const done = order.stage >= 3;

  return (
    <div className="mx-auto max-w-4xl">
      {justPlaced && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-ember-500/40 bg-ember-500/10 px-5 py-4">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-char-50">
              Order #{order.number} confirmed!
            </p>
            <p className="text-sm text-char-300">
              Thanks {order.customer.split(" ")[0]} — we&apos;ve texted you on
              WhatsApp with live updates.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* timeline + summary */}
        <div className="rounded-2xl border border-char-700 bg-char-900/40 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-char-50">Order status</h2>
            <span className="font-mono text-sm text-char-300">
              #{order.number}
            </span>
          </div>

          <ol className="relative space-y-6">
            {labels.map((label, i) => {
              const reached = order.stage >= i;
              const current = order.stage === i && !done;
              return (
                <li key={label} className="flex items-start gap-3.5">
                  <div className="flex flex-col items-center self-stretch">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        reached
                          ? "bg-ember-500 text-char-950"
                          : "border border-char-600 bg-char-900 text-char-500"
                      } ${current ? "ring-4 ring-ember-500/20" : ""}`}
                    >
                      {reached && (order.stage > i || done) ? "✓" : i + 1}
                    </span>
                    {i < labels.length - 1 && (
                      <span
                        className={`mt-1 w-0.5 flex-1 rounded ${
                          order.stage > i ? "bg-ember-500" : "bg-char-700"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-1 pt-1">
                    <p
                      className={`text-sm font-medium ${
                        reached ? "text-char-50" : "text-char-400"
                      }`}
                    >
                      {label}
                      {current && (
                        <span className="ml-2 rounded-full bg-ember-500/15 px-2 py-0.5 text-[11px] font-semibold text-ember-400">
                          now
                        </span>
                      )}
                    </p>
                    {i === 0 && (
                      <p className="text-xs text-char-400">
                        Placed at {formatClock(order.placedAt)} (demo time)
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* summary */}
          <div className="mt-5 border-t border-char-700 pt-4">
            <ul className="space-y-1 text-sm text-char-300">
              {order.lines.map((l) => (
                <li key={l.itemId} className="flex justify-between">
                  <span>
                    {l.emoji} {l.qty} × {l.name}
                  </span>
                  <span className="font-mono">{formatEuro(l.price * l.qty)}</span>
                </li>
              ))}
              {order.deliveryFee > 0 && (
                <li className="flex justify-between">
                  <span>🛵 Delivery fee</span>
                  <span className="font-mono">{formatEuro(order.deliveryFee)}</span>
                </li>
              )}
            </ul>
            <p className="mt-2 flex justify-between font-semibold text-char-50">
              <span>Total paid (demo)</span>
              <span className="font-mono text-ember-400">
                {formatEuro(order.total)}
              </span>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={onNewOrder}
              className="rounded-lg bg-ember-500 px-4 py-2 text-sm font-semibold text-char-950 transition-colors hover:bg-ember-400"
            >
              Start another order
            </button>
            {!done && (
              <button
                onClick={onGoKitchen}
                className="rounded-lg border border-char-600 px-4 py-2 text-sm font-medium text-char-100 transition-colors hover:border-char-500 hover:text-char-50"
              >
                Play the kitchen →
              </button>
            )}
          </div>
          {!done && (
            <p className="mt-3 text-xs text-char-400">
              Tip: switch to the Kitchen view and advance this order — the
              timeline and WhatsApp chat update live.
            </p>
          )}
        </div>

        {/* whatsapp simulation */}
        <WhatsAppPanel order={order} />
      </div>
    </div>
  );
}

function WhatsAppPanel({ order }: { order: Order }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-char-700 bg-char-900/40">
      {/* chat header */}
      <div className="flex items-center gap-3 border-b border-char-700 bg-emerald-900/30 px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-ember-400 to-ember-600 text-base">
          🍕
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-semibold text-char-50">
            TasteBite <span className="text-emerald-400">✓</span>
          </p>
          <p className="text-xs text-emerald-400/80">
            WhatsApp Business · simulated
          </p>
        </div>
        <span className="text-lg text-char-400">📞</span>
      </div>

      {/* messages */}
      <div className="flex-1 space-y-2.5 px-4 py-4">
        <p className="text-center text-[11px] text-char-500">
          Simulated conversation — no real messages are sent
        </p>
        {order.messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === "customer" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug shadow ${
                m.from === "customer"
                  ? "rounded-br-sm bg-emerald-700 text-emerald-50"
                  : "rounded-bl-sm bg-char-800 text-char-100"
              }`}
            >
              <p>{m.text}</p>
              <p
                className={`mt-1 text-right font-mono text-[10px] ${
                  m.from === "customer" ? "text-emerald-300/70" : "text-char-400"
                }`}
              >
                {m.time} {m.from === "customer" ? "✓✓" : ""}
              </p>
            </div>
          </div>
        ))}
        {order.stage < 3 && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-char-800/60 px-3.5 py-2.5">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-char-400 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-char-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-char-400 [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- kitchen --------------------------------- */

const STAGE_CHIP: { label: string; classes: string }[] = [
  { label: "New", classes: "bg-ember-500/10 text-ember-300 border-ember-500/30" },
  { label: "Cooking", classes: "bg-ember-500/15 text-ember-400 border-ember-500/40" },
  { label: "Ready", classes: "bg-fresh-500/15 text-fresh-400 border-fresh-500/30" },
  { label: "Done", classes: "bg-char-500/15 text-char-300 border-char-600/40" },
];

function KitchenView({
  openOrders,
  doneOrders,
  clock,
  advanceOrder,
}: {
  openOrders: Order[];
  doneOrders: Order[];
  clock: number;
  advanceOrder: (id: string) => void;
}) {
  const orderCount = openOrders.length + doneOrders.length;
  const revenue =
    openOrders.reduce((s, o) => s + o.total, 0) +
    doneOrders.reduce((s, o) => s + o.total, 0);
  const avgTicket = orderCount > 0 ? revenue / orderCount : 0;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-char-50 sm:text-2xl">
            Kitchen board
          </h1>
          <p className="text-sm text-char-300">
            {openOrders.length} open · {doneOrders.length} done today
          </p>
        </div>
        <div className="rounded-xl border border-char-700 bg-char-800 px-4 py-2 text-right">
          <p className="font-mono text-lg font-semibold text-ember-300">
            {formatClock(clock)}
          </p>
          <p className="text-[11px] text-char-400">
            demo clock · +2 min per action
          </p>
        </div>
      </div>

      {/* tonight's stats */}
      <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded-xl border border-char-700 bg-char-900 px-4 py-2.5">
          <p className="font-mono text-lg font-semibold text-ember-300">
            {openOrders.length}
          </p>
          <p className="text-[11px] text-char-400">Open orders</p>
        </div>
        <div className="rounded-xl border border-char-700 bg-char-900 px-4 py-2.5">
          <p className="font-mono text-lg font-semibold text-ember-300">
            {formatEuro(revenue)}
          </p>
          <p className="text-[11px] text-char-400">Tonight&apos;s revenue</p>
        </div>
        <div className="rounded-xl border border-char-700 bg-char-900 px-4 py-2.5">
          <p className="font-mono text-lg font-semibold text-ember-300">
            {formatEuro(avgTicket)}
          </p>
          <p className="text-[11px] text-char-400">Average ticket</p>
        </div>
      </div>

      {openOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-char-700 bg-char-900/20 py-16 text-center">
          <p className="text-4xl">🧑‍🍳</p>
          <p className="mt-3 font-medium text-char-50">All caught up!</p>
          <p className="text-sm text-char-300">
            No open orders — place one from the Order online view.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {openOrders.map((o) => (
            <KitchenCard key={o.id} order={o} clock={clock} advance={advanceOrder} />
          ))}
        </div>
      )}

      {/* done list */}
      <div className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wider text-char-400">
          Done <span className="font-mono text-char-500">({doneOrders.length})</span>
        </h2>
        {doneOrders.length === 0 ? (
          <p className="rounded-xl border border-dashed border-char-700 px-4 py-5 text-sm text-char-400">
            Completed orders will land here.
          </p>
        ) : (
          <ul className="space-y-2">
            {doneOrders.map((o) => (
              <li
                key={o.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-char-700 bg-char-900/30 px-4 py-3 text-sm"
              >
                <span className="font-mono font-semibold text-char-100">
                  #{o.number}
                </span>
                <span className="text-char-300">{o.customer}</span>
                <span className="text-char-400">
                  {o.lines.reduce((s, l) => s + l.qty, 0)} items ·{" "}
                  <span className="font-mono">{formatEuro(o.total)}</span>
                </span>
                <span className="ml-auto rounded-full bg-fresh-500/15 px-2.5 py-0.5 text-xs font-medium text-fresh-400">
                  {o.fulfilment === "delivery" ? "Delivered 🛵" : "Collected 🛍️"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function KitchenCard({
  order,
  clock,
  advance,
}: {
  order: Order;
  clock: number;
  advance: (id: string) => void;
}) {
  const chip = STAGE_CHIP[Math.min(order.stage, 3)];
  return (
    <div className="flex flex-col rounded-2xl border border-char-700 bg-char-900 p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-lg font-bold text-char-50">#{order.number}</p>
          <p className="text-sm text-char-300">{order.customer}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${chip.classes}`}
          >
            {chip.label}
          </span>
          <span className="font-mono text-[11px] text-char-400">
            {elapsedLabel(order.placedAt, clock)}
          </span>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2 text-xs">
        <span
          className={`rounded-md px-2 py-0.5 font-medium ${
            order.fulfilment === "delivery"
              ? "bg-ember-500/10 text-ember-300"
              : "bg-char-500/20 text-char-200"
          }`}
        >
          {order.fulfilment === "delivery" ? "🛵 Delivery" : "🛍️ Collection"}
        </span>
        <span className="font-mono text-char-400">{order.phone}</span>
      </div>

      <ul className="mb-4 flex-1 space-y-1.5 border-t border-char-700 pt-3 text-sm">
        {order.lines.map((l) => (
          <li key={l.itemId} className="flex items-center gap-2 text-char-100">
            <span className="font-mono font-semibold text-ember-400">
              {l.qty}×
            </span>
            <span>
              {l.emoji} {l.name}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-3 border-t border-char-700 pt-3">
        <span className="font-mono text-sm font-semibold text-char-50">
          {formatEuro(order.total)}
        </span>
        <button
          onClick={() => advance(order.id)}
          className="rounded-lg bg-ember-500 px-3.5 py-2 text-sm font-semibold text-char-950 transition-colors hover:bg-ember-400"
        >
          {advanceButtonLabel(order.stage, order.fulfilment)} →
        </button>
      </div>
    </div>
  );
}
