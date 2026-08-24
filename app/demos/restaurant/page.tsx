"use client";

import { useMemo, useRef, useState } from "react";
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
import {
  ArrowRightIcon,
  ChatIcon,
  CheckIcon,
  ClockIcon,
  FlameIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SparkleIcon,
  StarIcon,
  StarRow,
} from "./icons";
import { MotionRoot, revealDelay, useHeroParallax } from "./motion";

type View = "customer" | "kitchen";
type CustomerScreen = "menu" | "status";

const displayFont = "font-[family-name:var(--font-display)]";

/* All contact details are deliberately fictional demo data. */
const PHONE_DISPLAY = "0123 456 7890";
const PHONE_HREF = "tel:01234567890";
const EMAIL = "hello@tastebite.example";
const ADDRESS_1 = "8 Demo Parade";
const ADDRESS_2 = "Sampleton (a made-up town)";

const NAV_LINKS: { label: string; id: string }[] = [
  { label: "Menu", id: "menu" },
  { label: "Our story", id: "story" },
  { label: "What's on", id: "whats-on" },
  { label: "Reviews", id: "reviews" },
  { label: "Find us", id: "find-us" },
];

const MARQUEE_ITEMS = [
  "Wood-fired every day",
  "48-hour dough",
  "Order direct — no marketplace fees",
  "Open till late",
];

const HOURS: { days: string; time: string; closed?: boolean }[] = [
  { days: "Monday", time: "Closed", closed: true },
  { days: "Tue – Thu", time: "17:00 – 22:00" },
  { days: "Fri – Sat", time: "12:00 – 23:00" },
  { days: "Sunday", time: "12:00 – 21:00" },
];

const REVIEWS: { name: string; tag: string; text: string }[] = [
  {
    name: "Amira S.",
    tag: "Delivery regular",
    text: "The Charcoal Grill Burger survived the trip home still crispy, and the WhatsApp updates meant I was at the door before the rider knocked. Nobody else bothers with that.",
  },
  {
    name: "Dara O.",
    tag: "Collection · Friday night",
    text: "Margherita and a round of Smoky BBQ Wings, ready bang on time. The crust actually tastes of the oven — you can tell the dough isn't made in a hurry.",
  },
  {
    name: "Lena K.",
    tag: "Delivery",
    text: "The Chicken Shawarma Plate is my Friday ritual now. Ordering on their own site is quicker than the big apps, and the Blueberry Baked Cheesecake is dangerously good.",
  },
];

/* ---------------------------------- page ---------------------------------- */

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

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

  const siteVisible = view === "customer" && screen === "menu";

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3800);
  }

  function goSection(id: string) {
    if (!siteVisible) {
      setView("customer");
      setScreen("menu");
    }
    // Two frames so React has committed the site DOM before we scroll.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
  }

  function goHome() {
    if (!siteVisible) {
      setView("customer");
      setScreen("menu");
    }
    requestAnimationFrame(() =>
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" })),
    );
  }

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
    window.scrollTo({ top: 0 });
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
      <header className="sticky top-0 z-40 border-b border-char-800 bg-char-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button type="button" onClick={goHome} className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ember-400 to-ember-600 text-char-50 shadow-lg shadow-ember-500/20">
              <FlameIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 text-left leading-tight">
              <span className={`block truncate ${displayFont} text-base font-bold text-char-50`}>
                TasteBite
              </span>
              <span className="hidden text-[11px] text-char-300 md:block">
                Neighbourhood grill &amp; pizza
              </span>
            </span>
          </button>

          {siteVisible && (
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Site sections">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => goSection(l.id)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-char-300 transition-colors hover:bg-char-900 hover:text-char-50"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 rounded-lg border border-char-700 px-3 py-1.5 text-sm font-medium text-char-200 transition-colors hover:border-char-600 hover:text-char-50 xl:flex"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-ember-400" />
              <span className="font-mono">{PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              onClick={() => goSection("menu")}
              className="tb-lift hidden rounded-lg bg-ember-500 px-4 py-1.5 text-sm font-semibold text-char-950 transition-colors hover:bg-ember-400 sm:block"
            >
              Order online
            </button>
            <div
              className="flex items-center gap-0.5 rounded-xl border border-char-700 bg-char-900/60 p-1"
              role="group"
              aria-label="Demo view switcher"
            >
              <button
                type="button"
                onClick={() => setView("customer")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 ${
                  view === "customer"
                    ? "bg-ember-500 text-char-950"
                    : "text-char-300 hover:text-char-50"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setView("kitchen")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 ${
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
            </div>
          </div>
        </div>
      </header>

      {view === "customer" ? (
        screen === "status" && myOrder ? (
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
            <StatusScreen
              order={myOrder}
              justPlaced={justPlaced}
              onNewOrder={startNewOrder}
              onGoKitchen={() => setView("kitchen")}
            />
          </main>
        ) : (
          <CustomerSite
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
            onToast={showToast}
          />
        )
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <KitchenView
            openOrders={openOrders}
            doneOrders={doneOrders}
            clock={clock}
            advanceOrder={advanceOrder}
          />
        </main>
      )}

      {toast && (
        <div
          role="status"
          className="tb-toast-in fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-char-700 bg-char-800 px-4 py-2.5 text-sm text-char-100 shadow-2xl"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- shared site bits ---------------------------- */

function Kicker({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-400">{children}</p>
  );
}

/** Pilgrims-style ticker strip: duplicated segments glide seamlessly,
 *  pause on hover, and fall back to a static centred row under
 *  prefers-reduced-motion (extra copies hidden). */
function Marquee() {
  return (
    <div className="tb-marquee border-y border-char-800 bg-char-900" aria-label="TasteBite highlights">
      <div className="tb-marquee-track py-3">
        {[0, 1, 2, 3, 4, 5].map((seg) => (
          <div
            key={seg}
            aria-hidden={seg > 0 ? true : undefined}
            className={`flex items-center ${seg > 0 ? "tb-marquee-copy" : ""}`}
          >
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={item}
                className="flex items-center whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-ember-300"
              >
                <span className="px-5 text-ember-500 sm:px-7" aria-hidden="true">
                  {i % 2 === 0 ? (
                    <FlameIcon className="h-3.5 w-3.5" />
                  ) : (
                    <StarIcon className="h-3 w-3" />
                  )}
                </span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------- customer: full website -------------------------- */

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

function CustomerSite(props: CustomerMenuProps & { onToast: (message: string) => void }) {
  const { onToast, hasTrackedOrder, onViewOrder } = props;
  const heroImageRef = useHeroParallax<HTMLImageElement>();
  const orderNow = () => scrollToId("menu");

  return (
    <MotionRoot className="bg-char-950">
      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden">
        <img
          ref={heroImageRef}
          src="/food/hero.jpg"
          alt="A loaded platter fresh off the TasteBite charcoal grill"
          className="tb-parallax absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-char-950 via-char-950/80 to-char-950/25" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-char-950 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="max-w-2xl" data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-ember-500/40 bg-ember-500/10 px-3.5 py-1.5 text-xs font-semibold text-ember-300 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-fresh-400" />
              Collection &amp; delivery · till late
            </span>

            <h1
              className={`mt-5 ${displayFont} text-4xl font-bold leading-[1.05] text-char-50 sm:text-5xl lg:text-6xl`}
            >
              Fire-cooked food, straight from our grill to your door.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-char-200 sm:text-lg">
              Order direct from the kitchen — no marketplace apps, no middleman fees — and get
              live updates on WhatsApp from the second we light the coals.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-char-700 bg-char-900/70 px-4 py-3 backdrop-blur">
              <span className="tb-star-pop inline-flex">
                <StarRow className="h-4 w-4" />
              </span>
              <p className="text-sm text-char-200">
                <span className="font-bold text-char-50">4.8</span> from{" "}
                <span className="font-semibold">320+ reviews</span>
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={orderNow}
                className="tb-lift rounded-xl bg-ember-500 px-6 py-3.5 text-center text-sm font-semibold text-char-950 shadow-lg shadow-ember-500/25 transition-colors hover:bg-ember-400"
              >
                Order online — skip the fees
              </button>
              <button
                type="button"
                onClick={orderNow}
                className="tb-lift rounded-xl border border-char-400/60 bg-char-950/40 px-6 py-3.5 text-center text-sm font-semibold text-char-50 backdrop-blur transition-colors hover:border-char-200 hover:bg-char-900/60"
              >
                See the menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE TICKER ============ */}
      <Marquee />

      {/* ============ OUR STORY ============ */}
      <section id="story" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative" data-reveal>
              <div className="overflow-hidden rounded-3xl border border-char-700">
                <img
                  src="/food/margherita.jpg"
                  alt="A blistered wood-fired Margherita straight out of the oven"
                  className="h-72 w-full object-cover sm:h-96"
                />
              </div>
              <div className="absolute -bottom-4 -right-2 -rotate-2 rounded-xl border border-ember-500/40 bg-char-900 px-4 py-2.5 shadow-xl sm:-right-4">
                <p className={`${displayFont} text-sm font-bold text-ember-300`}>
                  48-hour dough. Every day.
                </p>
              </div>
            </div>

            <div data-reveal style={revealDelay(1, 120)}>
              <Kicker>Our story</Kicker>
              <h2 className={`mt-3 ${displayFont} text-2xl font-bold text-char-50 sm:text-4xl`}>
                One charcoal grill, one dough room, and a family that argues about food.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-char-300 sm:text-base">
                TasteBite started with a grill that takes forty minutes to light and a stack of
                family recipes nobody could agree on. The coals go in at four every afternoon and
                stay hot until the last order; the pizza dough proofs for a full 48 hours in a
                room we guard more carefully than the till.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-char-300 sm:text-base">
                Everything on the menu is cooked over fire or baked on stone, then handed to you —
                or your rider — minutes later. (TasteBite is a fictional restaurant, but we like
                to think it would smell incredible.)
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "The charcoal grill is lit at four, every single day",
                  "48-hour dough, proofed slow in our own dough room",
                  "Family recipes we still argue about — the garlic sauce won",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-char-200">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-500/15 text-ember-400">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={orderNow}
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-ember-400 transition-colors hover:text-ember-300"
              >
                Order online
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE MENU (the working ordering system) ============ */}
      <section id="menu" className="scroll-mt-20 border-y border-char-800 bg-char-900/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div
            className="mb-10 flex flex-wrap items-end justify-between gap-4"
            data-reveal
          >
            <div className="max-w-2xl">
              <Kicker>Order online</Kicker>
              <h2 className={`mt-3 ${displayFont} text-2xl font-bold text-char-50 sm:text-4xl`}>
                The menu — order direct, skip the fees.
              </h2>
              <p className="mt-3 text-sm text-char-300 sm:text-base">
                Everything is cooked to order and priced the same as at the counter. Pay online
                (it&apos;s a demo — nothing is charged) and follow your order live on WhatsApp.
              </p>
            </div>
            {hasTrackedOrder && (
              <button
                type="button"
                onClick={onViewOrder}
                className="tb-lift inline-flex items-center gap-2 rounded-lg border border-ember-500/40 bg-ember-500/10 px-4 py-2 text-sm font-medium text-ember-400 transition-colors hover:bg-ember-500/20"
              >
                View my order
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <CustomerMenu {...props} />
        </div>
      </section>

      {/* ============ WHAT'S ON ============ */}
      <section id="whats-on" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>What&apos;s on</Kicker>
            <h2 className={`mt-3 ${displayFont} text-2xl font-bold text-char-50 sm:text-4xl`}>
              Always something on the fire
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Special 1 */}
            <div
              data-reveal
              className="tb-lift relative overflow-hidden rounded-3xl border border-ember-500/30 bg-gradient-to-br from-ember-500/15 via-char-900/70 to-char-900/40 p-6 sm:p-8"
            >
              <FlameIcon className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 rotate-12 text-ember-500/10" />
              <span className="inline-block -rotate-2 rounded-lg bg-ember-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-char-950">
                August only
              </span>
              <h3 className={`mt-4 ${displayFont} text-2xl font-bold text-char-50`}>
                The Smash Stack is back
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-char-300">
                Three smashed patties, double cheddar, burnt-end mayo and crispy onions. It
                didn&apos;t fit in the box last summer. It still doesn&apos;t.
              </p>
              <button
                type="button"
                onClick={orderNow}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ember-400 transition-colors hover:text-ember-300"
              >
                Order online
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Special 2 */}
            <div
              data-reveal
              style={revealDelay(1, 100)}
              className="tb-lift relative overflow-hidden rounded-3xl border border-fresh-500/30 bg-gradient-to-br from-fresh-500/15 via-char-900/70 to-char-900/40 p-6 sm:p-8"
            >
              <SparkleIcon className="pointer-events-none absolute -right-5 -top-5 h-32 w-32 -rotate-12 text-fresh-400/10" />
              <span className="inline-block rotate-2 rounded-lg bg-fresh-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-char-950">
                Mondays · 4–6pm
              </span>
              <h3 className={`mt-4 ${displayFont} text-2xl font-bold text-char-50`}>
                Kids eat free Mondays
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-char-300">
                One free kids&apos; main with every adult main, every Monday teatime. Colouring
                sheets included, zero judgement about ketchup on pizza.
              </p>
              <button
                type="button"
                onClick={orderNow}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fresh-400 transition-colors hover:text-fresh-500"
              >
                Order online
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE DIVIDER ============ */}
      <Marquee />

      {/* ============ REVIEWS ============ */}
      <section id="reviews" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Kicker>Reviews</Kicker>
              <div
                className="mt-4 rounded-3xl border border-char-700 bg-char-900/40 p-6"
                data-reveal
              >
                <p className={`${displayFont} text-5xl font-bold text-char-50`}>4.8</p>
                <div className="mt-2">
                  <span className="tb-star-pop inline-flex">
                    <StarRow className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-2 text-sm text-char-300">
                  from <span className="font-semibold text-char-100">320+ reviews</span>
                </p>
                <p className="mt-3 text-[11px] text-char-400">
                  Fictional demo reviews — see footer.
                </p>
                <button
                  type="button"
                  onClick={orderNow}
                  className="tb-lift mt-5 w-full rounded-lg bg-ember-500 px-4 py-2.5 text-sm font-semibold text-char-950 transition-colors hover:bg-ember-400"
                >
                  Join them — order online
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {REVIEWS.map((r, i) => (
                <figure
                  key={r.name}
                  data-reveal
                  style={revealDelay(i, 90)}
                  className="tb-lift flex flex-col rounded-2xl border border-char-700 bg-char-900/40 p-5 sm:p-6"
                >
                  <StarRow className="h-3.5 w-3.5" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-char-200">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-char-800 pt-3">
                    <span className="text-sm font-semibold text-char-50">{r.name}</span>
                    <span className="text-xs text-char-400">{r.tag}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FIND US ============ */}
      <section id="find-us" className="scroll-mt-24 border-t border-char-800 bg-char-900/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>Find us</Kicker>
            <h2 className={`mt-3 ${displayFont} text-2xl font-bold text-char-50 sm:text-4xl`}>
              Easy to find, open till late
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Hours */}
            <div className="tb-lift rounded-2xl border border-char-700 bg-char-900/50 p-6" data-reveal>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ember-500/30 bg-ember-500/10 text-ember-400">
                <ClockIcon className="h-5 w-5" />
              </span>
              <h3 className={`mt-4 ${displayFont} text-base font-semibold text-char-50`}>
                Opening hours
              </h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex justify-between gap-3">
                    <dt className="text-char-300">{h.days}</dt>
                    <dd className={`font-mono ${h.closed ? "text-char-500" : "text-char-100"}`}>
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 flex items-start gap-2 text-xs text-char-400">
                <FlameIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-400" />
                Kitchen till late — last orders 30 minutes before close.
              </p>
            </div>

            {/* Address */}
            <div
              className="tb-lift rounded-2xl border border-char-700 bg-char-900/50 p-6"
              data-reveal
              style={revealDelay(1, 90)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ember-500/30 bg-ember-500/10 text-ember-400">
                <PinIcon className="h-5 w-5" />
              </span>
              <h3 className={`mt-4 ${displayFont} text-base font-semibold text-char-50`}>Find us</h3>
              <p className="mt-3 text-sm leading-relaxed text-char-200">
                {ADDRESS_1}
                <br />
                {ADDRESS_2}
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-char-400">
                <li>Two minutes from Sample Square</li>
                <li>Free parking on Demo Parade after 18:00</li>
                <li>Look for the ember-orange awning</li>
              </ul>
            </div>

            {/* Contact */}
            <div
              className="tb-lift rounded-2xl border border-char-700 bg-char-900/50 p-6"
              data-reveal
              style={revealDelay(2, 90)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ember-500/30 bg-ember-500/10 text-ember-400">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <h3 className={`mt-4 ${displayFont} text-base font-semibold text-char-50`}>
                Get in touch
              </h3>
              <div className="mt-3 space-y-2.5">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2.5 text-sm font-medium text-char-100 transition-colors hover:text-ember-300"
                >
                  <PhoneIcon className="h-4 w-4 text-ember-400" />
                  <span className="font-mono">{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2.5 break-all text-sm font-medium text-char-100 transition-colors hover:text-ember-300"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-ember-400" />
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={() =>
                    onToast("Demo only — WhatsApp chat is simulated on this page.")
                  }
                  className="flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                >
                  <ChatIcon className="h-4 w-4" />
                  Message us on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-ember-500">
        <div
          className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 sm:py-16"
          data-reveal
        >
          <FlameIcon className="h-8 w-8 text-char-950" />
          <h2 className={`max-w-xl ${displayFont} text-3xl font-bold text-char-950 sm:text-4xl`}>
            Hungry now? The kitchen is on.
          </h2>
          <p className="max-w-md text-sm font-medium text-char-950/80 sm:text-base">
            Order direct in under a minute — we&apos;ll keep you posted on WhatsApp until
            it&apos;s at your door.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={orderNow}
              className="tb-lift rounded-xl bg-char-950 px-7 py-3.5 text-sm font-semibold text-char-50 transition-colors hover:bg-char-900"
            >
              Order online
            </button>
            <a
              href={PHONE_HREF}
              className="tb-lift flex items-center justify-center gap-2 rounded-xl border-2 border-char-950/50 px-7 py-3.5 text-sm font-bold text-char-950 transition-colors hover:bg-ember-400"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-char-800 bg-char-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ember-400 to-ember-600 text-char-50">
                  <FlameIcon className="h-5 w-5" />
                </span>
                <p className={`${displayFont} text-base font-bold text-char-50`}>TasteBite</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-char-400">
                Neighbourhood grill &amp; pizza — fire-cooked food, ordered direct.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-char-400">
                {ADDRESS_1}
                <br />
                {ADDRESS_2}
              </p>
              <p className="mt-3 text-sm text-char-400">
                <span className="font-mono">{PHONE_DISPLAY}</span>
                <br />
                {EMAIL}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-char-500">
                Quick links
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(l.id)}
                      className="text-sm text-char-300 transition-colors hover:text-char-50"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-char-500">
                Opening hours
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-char-300">
                {HOURS.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className={`font-mono ${h.closed ? "text-char-500" : ""}`}>{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs text-char-400">
                <FlameIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-400" />
                Till 23:00 on Fridays &amp; Saturdays.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-char-500">
                About this demo
              </p>
              <p className="mt-4 text-xs leading-relaxed text-char-400">
                TasteBite is a fictional restaurant built as a portfolio demo. All data on this
                page — the menu, reviews, ratings, orders, opening hours and contact details — is
                fictional demo content.
              </p>
              <button
                type="button"
                onClick={orderNow}
                className="tb-lift mt-5 rounded-lg bg-ember-500 px-4 py-2.5 text-sm font-semibold text-char-950 transition-colors hover:bg-ember-400"
              >
                Start an order
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-char-800 pt-6 sm:flex-row">
            <p className="text-xs text-char-500">© 2026 TasteBite — a fictional demo restaurant.</p>
            <p className="text-xs text-char-500">All data on this page is fictional demo content.</p>
          </div>
        </div>
      </footer>
    </MotionRoot>
  );
}

/* ------------------------------ customer: menu ----------------------------- */

function CustomerMenu(props: CustomerMenuProps) {
  const { category, setCategory, cart, setQty, cartCount } = props;
  const items = MENU.filter((m) => m.category === category);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        {/* category tabs */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1" data-reveal>
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
          {items.map((item, i) => (
            <MenuCard
              key={item.id}
              item={item}
              index={i}
              qty={cart[item.id] ?? 0}
              setQty={setQty}
            />
          ))}
        </div>
      </div>

      {/* desktop cart */}
      <aside className="hidden lg:block" data-reveal style={revealDelay(1, 120)}>
        <div className="sticky top-24">
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
          <div className="tb-sheet-backdrop fixed inset-0 z-50 flex items-end bg-char-950/70 backdrop-blur-sm">
            <div className="tb-sheet-panel max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-t border-char-700 bg-char-950 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className={`${displayFont} font-semibold text-char-50`}>Your order</p>
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
  index,
  qty,
  setQty,
}: {
  item: MenuItem;
  index: number;
  qty: number;
  setQty: (id: string, qty: number) => void;
}) {
  return (
    <div
      data-reveal
      style={revealDelay(index % 4, 70)}
      className="tb-lift flex gap-4 rounded-2xl border border-char-700 bg-char-900/40 p-4 transition-colors hover:border-char-600"
    >
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
          <h3 className={`${displayFont} font-semibold text-char-50`}>{item.name}</h3>
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
        <h2 className={`mb-4 flex items-center gap-2 ${displayFont} font-semibold text-char-50`}>
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
              className="tb-lift mt-4 w-full rounded-lg bg-ember-500 px-4 py-2.5 font-semibold text-char-950 transition-colors hover:bg-ember-400"
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
                className="tb-lift w-full rounded-lg bg-ember-500 px-4 py-2.5 font-semibold text-char-950 transition-colors hover:bg-ember-400"
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
            <p className={`${displayFont} text-lg font-semibold text-char-50`}>
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
            <h2 className={`${displayFont} font-semibold text-char-50`}>Order status</h2>
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
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-ember-400 to-ember-600 text-char-50">
          <FlameIcon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-semibold text-char-50">
            TasteBite <span className="text-emerald-400">✓</span>
          </p>
          <p className="text-xs text-emerald-400/80">
            WhatsApp Business · simulated
          </p>
        </div>
        <PhoneIcon className="h-4.5 w-4.5 text-char-400" />
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
          <h1 className={`${displayFont} text-xl font-bold text-char-50 sm:text-2xl`}>
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
            No open orders — place one from the Customer view.
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
        <h2 className={`mb-3 flex items-center gap-2 ${displayFont} text-sm font-semibold uppercase tracking-wider text-char-400`}>
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
