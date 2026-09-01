"use client";

import { useState } from "react";
import { Client, SEED_CLIENTS, SEED_QUEUE, SEED_RULES, STAGES, Stage, View, formatGBP } from "./data";
import { MotionRoot, revealDelay } from "./motion";

interface WebsiteProps {
  onOpenApp: (view?: View) => void;
}

/* ============================================================
   Shared bits
   ============================================================ */

export function FlowDeskMark({ size = "h-8 w-8" }: { size?: string }) {
  return (
    <span className={`flex ${size} items-center justify-center rounded-lg bg-flow-500 text-ink-50`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="3" y="3" width="10" height="2.2" rx="1.1" fill="currentColor" />
        <rect x="3" y="6.9" width="7" height="2.2" rx="1.1" fill="currentColor" opacity="0.75" />
        <rect x="3" y="10.8" width="4" height="2.2" rx="1.1" fill="currentColor" opacity="0.5" />
      </svg>
    </span>
  );
}

function Kicker({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flow-300">{children}</p>
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
      className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-flow-300 transition-colors hover:text-flow-200"
    >
      {label}
      <span className="transition-transform group-hover:translate-x-0.5">
        <ArrowRightIcon />
      </span>
    </button>
  );
}

/* ============================================================
   Static product visuals — real seed data, PipelineView styling,
   rendered as non-interactive recreations (no <img> screenshots).
   ============================================================ */

const STAGE_ACCENT: Record<Stage, string> = {
  new: "bg-ink-400",
  contacted: "bg-flow-600",
  meeting: "bg-flow-500",
  proposal: "bg-flow-400",
  won: "bg-brass-400",
};

function BoardCard({ client, compact }: { client: Client; compact?: boolean }) {
  const isWon = client.stage === "won";
  return (
    <div
      className={`rounded-xl border p-2.5 ${
        isWon ? "border-brass-500/40 bg-brass-500/10" : "border-ink-700 bg-ink-900/60"
      }`}
    >
      <div className="truncate text-xs font-medium text-ink-50">{client.company}</div>
      {!compact && <div className="mt-0.5 truncate text-[11px] text-ink-300">{client.contactName}</div>}
      <div className="mt-2 flex items-center justify-between">
        <span className={`font-[family-name:var(--font-money)] text-[11px] ${isWon ? "text-brass-300" : "text-flow-300"}`}>
          {formatGBP(client.value)}
        </span>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[9px] ${
            client.owner === "DH"
              ? "bg-flow-400/15 text-flow-300"
              : client.owner === "MK"
                ? "bg-flow-600/25 text-flow-200"
                : "bg-ink-400/20 text-ink-100"
          }`}
        >
          {client.owner}
        </span>
      </div>
    </div>
  );
}

/**
 * The hero product visual: a scaled, static recreation of the pipeline board
 * built from the actual seed data, inside a window frame. Decorative — the
 * real, interactive board is one click away in the app.
 */
function HeroBoard() {
  return (
    <div className="overflow-x-auto">
      <div aria-hidden className="pointer-events-none flex w-max select-none gap-2.5 p-3 sm:p-4">
        {STAGES.map((stage) => {
          const cards = SEED_CLIENTS.filter((c) => c.stage === stage.id);
          const sum = cards.reduce((acc, c) => acc + c.value, 0);
          const shown = cards.slice(0, 3);
          const isWon = stage.id === "won";
          return (
            <div key={stage.id} className="flex w-48 shrink-0 flex-col rounded-2xl border border-ink-700 bg-ink-900/40">
              <div className="flex items-center justify-between border-b border-ink-700 px-2.5 py-2">
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${STAGE_ACCENT[stage.id]}`} />
                  <span className={`text-[11px] font-medium ${isWon ? "text-brass-300" : "text-ink-50"}`}>
                    {stage.label}
                  </span>
                  <span
                    className={`rounded px-1 py-px font-[family-name:var(--font-money)] text-[9px] ${
                      isWon ? "bg-brass-500/10 text-brass-300" : "bg-ink-800 text-ink-200"
                    }`}
                  >
                    {cards.length}
                  </span>
                </div>
                <span className={`font-[family-name:var(--font-money)] text-[9px] ${isWon ? "text-brass-400" : "text-ink-300"}`}>
                  {formatGBP(sum)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-1.5">
                {shown.map((client) => (
                  <BoardCard key={client.id} client={client} />
                ))}
                {cards.length > shown.length && (
                  <div className="rounded-xl border border-dashed border-ink-700 px-2 py-1.5 text-center text-[10px] text-ink-400">
                    +{cards.length - shown.length} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Window chrome around a product recreation, with the brass "Interactive demo" tab. */
function WindowFrame({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-ink-700 bg-ink-950/80 shadow-2xl shadow-flow-700/20 ${className}`}>
      <div className="flex items-center gap-3 border-b border-ink-700 bg-ink-900/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-ink-400">{title}</span>
        <span className="rounded-full border border-brass-500/40 bg-brass-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brass-300">
          Interactive demo
        </span>
      </div>
      {children}
    </div>
  );
}

/* ---------- Feature fragment: mini kanban ---------- */

function MiniKanban() {
  const columns: { stage: Stage; label: string }[] = [
    { stage: "contacted", label: "Contacted" },
    { stage: "proposal", label: "Proposal sent" },
    { stage: "won", label: "Won" },
  ];
  return (
    <div className="overflow-x-auto">
      <div aria-hidden className="pointer-events-none flex w-max select-none gap-2.5 p-3 sm:w-full sm:p-4">
        {columns.map(({ stage, label }) => {
          const cards = SEED_CLIENTS.filter((c) => c.stage === stage).slice(0, 2);
          const isWon = stage === "won";
          return (
            <div key={stage} className="flex w-44 flex-col rounded-2xl border border-ink-700 bg-ink-900/40 sm:w-1/3 sm:min-w-0">
              <div className="flex items-center gap-1.5 border-b border-ink-700 px-2.5 py-2">
                <span className={`h-1.5 w-1.5 rounded-full ${STAGE_ACCENT[stage]}`} />
                <span className={`truncate text-[11px] font-medium ${isWon ? "text-brass-300" : "text-ink-50"}`}>{label}</span>
              </div>
              <div className="flex flex-col gap-1.5 p-1.5">
                {cards.map((client) => (
                  <BoardCard key={client.id} client={client} compact />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Feature fragment: automation rules + queue ---------- */

function MiniAutomations() {
  const rules = [SEED_RULES[0], SEED_RULES[4]];
  const action = SEED_QUEUE[0];
  return (
    <div aria-hidden className="pointer-events-none select-none space-y-2 p-3 sm:p-4">
      {rules.map(
        (rule) =>
          rule && (
            <div key={rule.id} className="flex items-center gap-3 rounded-2xl border border-ink-700 bg-ink-900/40 p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-flow-400/40 bg-flow-500/10 text-flow-300">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <path d="M8 1 2.5 8H7l-1 5L11.5 6H7l1-5Z" fill="currentColor" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium text-ink-50">
                  {rule.name}
                  <span className="mx-1 text-ink-500">→</span>
                  <span className="text-ink-200">{rule.action}</span>
                </div>
                <div className="mt-0.5 font-[family-name:var(--font-money)] text-[10px] text-ink-300">{rule.runs} runs total</div>
              </div>
              <span className="relative h-5 w-9 shrink-0 rounded-full bg-flow-500">
                <span className="absolute left-[18px] top-0.5 h-4 w-4 rounded-full bg-white shadow" />
              </span>
            </div>
          ),
      )}
      {action && (
        <div className="rounded-2xl border border-ink-700 bg-ink-950/40 p-3">
          <div className="text-[9px] uppercase tracking-wider text-flow-400">Queued · No reply in 5 days</div>
          <p className="mt-1 truncate text-xs text-ink-100">{action.label}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-ink-300">Due {action.due}</span>
            <span className="rounded-lg border border-flow-400/40 bg-flow-500/10 px-2 py-0.5 text-[10px] font-medium text-flow-300">
              Run now
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Feature fragment: AI assistant output ---------- */

function MiniAssistant() {
  return (
    <div aria-hidden className="pointer-events-none select-none p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-medium text-ink-50">
          Relationship summary · <span className="text-flow-300">Marlowe Yachts</span>
        </div>
        <span className="rounded-full border border-flow-400/40 bg-flow-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-flow-300">
          Simulated AI output — demo
        </span>
      </div>
      <div className="mt-2.5 rounded-xl border border-ink-700 bg-ink-900 p-3">
        <p className="text-xs leading-relaxed text-ink-100">
          Marlowe Yachts is your highest-value open opportunity (
          <span className="font-[family-name:var(--font-money)] text-flow-300">£58,000</span>, owner DH), currently at
          Proposal sent. The board decides by end of August, so the next 7 days are decisive…
        </p>
      </div>
      <div className="mt-2 rounded-xl border border-ink-700 bg-ink-900 p-3">
        <p className="font-mono text-[11px] leading-relaxed text-ink-100">
          Subject: R&amp;D relief scoping — ahead of your board meeting
        </p>
        <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-ink-300">
          Hi Casper, thanks again for the steer on the hull design programme — the revised proposal now includes…
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Page content data
   ============================================================ */

const TENANTS: { name: string; className: string }[] = [
  { name: "Hartwell & Co", className: "font-serif tracking-wide" },
  { name: "CALDERBANK RECRUITMENT", className: "text-xs font-semibold tracking-[0.22em]" },
  { name: "Maaskade Logistics", className: "font-mono tracking-tight" },
  { name: "Meridian Dental Lab", className: "font-serif italic" },
  { name: "ASHFORD & BYRNE", className: "text-xs font-bold tracking-[0.18em]" },
];

interface PricingTier {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  featured?: boolean;
}

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "£29",
    blurb: "For a first desk that needs its leads in one place.",
    features: [
      "Pipeline board with unlimited leads",
      "Client records & full timelines",
      "Email and call logging",
      "3 automation rules",
      "Spreadsheet import (CSV & XLSX)",
    ],
  },
  {
    name: "Practice",
    price: "£49",
    blurb: "For firms where follow-up is the difference between won and lost.",
    features: [
      "Everything in Starter",
      "Unlimited automation rules & queues",
      "AI relationship summaries & drafts",
      "Client document request portal",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Firm",
    price: "£89",
    blurb: "For multi-team practices with partners, permissions and audits.",
    features: [
      "Everything in Practice",
      "Multiple pipelines per team",
      "Roles, permissions & audit log",
      "Guided migration & onboarding",
      "Data exports & API access",
    ],
  },
];

const TESTIMONIALS: { quote: string; role: string; firm: string }[] = [
  {
    quote:
      "We used to find out a proposal had gone cold three weeks after it happened. Now the follow-up is queued the moment a reply doesn't arrive — nothing sits in a partner's inbox waiting to be remembered.",
    role: "Managing partner",
    firm: "Hartwell & Co",
  },
  {
    quote:
      "Two desks, nine consultants, one board. Every consultant can see exactly where their placements stand, and the run counters tell me the chasing actually happened.",
    role: "Director",
    firm: "Calderbank Recruitment",
  },
  {
    quote:
      "The AI drafts start from the whole relationship, not a blank page. We still read and send every email ourselves — but the first version is already ninety percent there.",
    role: "Operations lead",
    firm: "Maaskade Logistics",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I import my clients from a spreadsheet?",
    a: "Yes. Upload a CSV or XLSX export from your current system, map the columns once (company, contact, value, stage), and FlowDesk builds the pipeline and client records for you. Notes and past interactions can be imported as timeline entries, so history comes along too.",
  },
  {
    q: "How is my client data secured?",
    a: "Every tenant's data is isolated, encrypted in transit and at rest, and hosted in UK/EU data centres. Access is per-user with two-factor authentication available on every plan, and the Firm tier adds a full audit log of who saw and changed what.",
  },
  {
    q: "Do you help with migration from another CRM?",
    a: "The Practice and Firm plans include guided migration: we take your existing export, map it into FlowDesk with you on a call, and check the first week's automations together. Starter customers get the same import tooling self-serve, with documentation for the common CRMs.",
  },
  {
    q: "How does per-seat billing work?",
    a: "You pay monthly for each active user. Add a seat mid-month and it's prorated; remove one and the next invoice simply drops. There are no minimums and no long-term contracts — annual billing is available at a discount if you prefer it.",
  },
  {
    q: "Does the AI send emails by itself?",
    a: "No — and it never will. The assistant reads the relationship timeline and produces drafts and summaries only. A human always reviews, edits and presses send. Automations queue the chasing; people do the talking.",
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

  const pipelineTotal = SEED_CLIENTS.reduce((sum, c) => sum + c.value, 0);

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionRoot className="bg-ink-950 text-ink-100">
      {/* ============ TOP BAR ============ */}
      <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => scrollToId("product")}
              className="flex shrink-0 items-center gap-2.5 text-left"
            >
              <FlowDeskMark />
              <span className="hidden sm:block">
                <span className="block text-sm font-semibold leading-tight text-ink-50">FlowDesk</span>
                <span className="block font-mono text-[10px] leading-tight text-ink-400">CRM + automation</span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Site sections">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollToId(l.id)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-300 transition-colors hover:bg-ink-900 hover:text-ink-50"
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => onOpenApp()}
                className="fd-lift rounded-lg bg-flow-500 px-3.5 py-2 text-sm font-semibold text-ink-50 transition-colors hover:bg-flow-400 sm:px-4"
              >
                Open the live app
              </button>

              {/* Compact Site/App switcher */}
              <div className="flex rounded-lg border border-ink-700 bg-ink-900 p-0.5" role="group" aria-label="Demo view">
                <span className="whitespace-nowrap rounded-md bg-ink-950 px-2.5 py-1.5 text-xs font-medium text-flow-300 ring-1 ring-ink-700">
                  Site
                </span>
                <button
                  type="button"
                  onClick={() => onOpenApp()}
                  className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium text-ink-300 transition-colors hover:text-ink-50"
                >
                  App
                </button>
              </div>
            </div>
          </div>

          {/* Mobile anchor nav */}
          <div className="-mx-4 overflow-x-auto border-t border-ink-800 px-4 lg:hidden">
            <div className="flex w-max gap-1 py-2">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollToId(l.id)}
                  className="whitespace-nowrap rounded-full border border-ink-700 bg-ink-900 px-3.5 py-1.5 text-xs font-medium text-ink-200 transition-colors hover:border-flow-400 hover:text-flow-300"
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
        {/* Radial flow glow */}
        <div
          aria-hidden
          className="fd-glow pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[52rem] max-w-none -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(84, 104, 212, 0.28), transparent 72%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/70 px-3.5 py-1.5 text-xs font-medium text-ink-200">
              <span className="h-2 w-2 rounded-full bg-flow-400" aria-hidden />
              Built for professional service firms
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
              Client relationships that run on a system, not memory.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
              FlowDesk gives your firm one pipeline for every lead, automated chasing that never forgets, and AI drafts
              grounded in the whole relationship.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onOpenApp()}
                className="fd-lift rounded-xl bg-flow-500 px-7 py-3.5 text-sm font-semibold text-ink-50 transition-colors hover:bg-flow-400"
              >
                Open the live app
              </button>
              <button
                type="button"
                onClick={() => scrollToId("pricing")}
                className="fd-lift rounded-xl border border-ink-600 px-7 py-3.5 text-sm font-semibold text-ink-100 transition-colors hover:border-flow-400 hover:text-flow-300"
              >
                See pricing
              </button>
            </div>
          </div>

          {/* Framed product visual */}
          <div className="relative mt-14 sm:mt-16" data-reveal>
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -top-10 bottom-0 rounded-[3rem]"
              style={{ background: "radial-gradient(closest-side, rgba(84, 104, 212, 0.16), transparent 75%)" }}
            />
            <div className="fd-frame-reveal relative" data-reveal style={revealDelay(2, 120)}>
              <WindowFrame title="app.flowdesk.example — Pipeline">
                <HeroBoard />
              </WindowFrame>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOGO STRIP ============ */}
      <section className="border-y border-ink-800/80 bg-ink-900/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6" data-reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
            Runs the pipeline at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
            {TENANTS.map((t) => (
              <span key={t.name} className={`text-ink-300/90 ${t.className} text-sm sm:text-base`}>
                {t.name}
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
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              Everything a firm&apos;s front office forgets, systemised.
            </h2>
          </div>

          {/* Feature 1 — Pipeline */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-reveal>
              <Kicker>Pipeline</Kicker>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink-50 sm:text-3xl">
                Leads stop dying in inboxes.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-300">
                Every enquiry lands on one board — new lead to won — with its value, owner and last touch visible at a
                glance. Move a card and the change is logged to the client&apos;s timeline automatically, so the whole firm
                shares one honest picture of the quarter.
              </p>
              <ul className="mt-5 space-y-2.5">
                {["Five stages, from first enquiry to signed engagement", "Stage totals and owner chips on every column", "Every move logged to the client timeline"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink-200">
                      <span className="mt-0.5 text-flow-300">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <TryInApp label="Try the pipeline in the app" onClick={() => onOpenApp("pipeline")} />
            </div>
            <div data-reveal style={revealDelay(1, 120)}>
              <WindowFrame title="Pipeline — Hartwell & Co">
                <MiniKanban />
              </WindowFrame>
            </div>
          </div>

          {/* Feature 2 — Automations (fragment on the left on desktop) */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2" data-reveal>
              <Kicker>Automations</Kicker>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink-50 sm:text-3xl">
                The chasing happens on schedule, not on memory.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-300">
                No reply in five days? A VAT deadline in two weeks? A proposal finally marked won? FlowDesk queues the
                right next action the moment the condition is met — and every run is counted and written back to the
                client record, so you can prove the follow-up happened.
              </p>
              <ul className="mt-5 space-y-2.5">
                {["Rules fire on stage moves, silences and deadlines", "A visible queue of what runs next, and when", "Pause any rule — its queued actions hold with it"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink-200">
                      <span className="mt-0.5 text-flow-300">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <TryInApp label="Try automations in the app" onClick={() => onOpenApp("automations")} />
            </div>
            <div className="lg:order-1" data-reveal style={revealDelay(1, 120)}>
              <WindowFrame title="Automations — Hartwell & Co">
                <MiniAutomations />
              </WindowFrame>
            </div>
          </div>

          {/* Feature 3 — AI Assistant */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-reveal>
              <Kicker>AI Assistant</Kicker>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink-50 sm:text-3xl">
                Drafts grounded in the whole relationship.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-300">
                The assistant reads the full timeline — calls, emails, notes, stage moves — and produces a relationship
                summary or a ready-to-edit follow-up that sounds like it was written by someone who was in the room.
                Drafts only: a human always reviews and sends.
              </p>
              <ul className="mt-5 space-y-2.5">
                {["Summaries that surface risk and the next step", "Follow-up drafts in your firm's voice", "Nothing sent without a human pressing send"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink-200">
                      <span className="mt-0.5 text-flow-300">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <TryInApp label="Try the assistant in the app" onClick={() => onOpenApp("assistant")} />
            </div>
            <div data-reveal style={revealDelay(1, 120)}>
              <WindowFrame title="AI Assistant — Hartwell & Co">
                <MiniAssistant />
              </WindowFrame>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="border-y border-ink-800/80 bg-ink-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {[
              { value: formatGBP(pipelineTotal), label: "pipeline in view right now" },
              { value: "43", label: "follow-ups automated this month" },
              { value: "11h", label: "admin saved per week" },
            ].map((stat, i) => (
              <div key={stat.label} data-reveal style={revealDelay(i, 100)}>
                <div className="font-[family-name:var(--font-money)] text-3xl text-brass-400 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-ink-300">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-ink-400" data-reveal>
            Illustrative demo figures from the fictional Hartwell &amp; Co workspace.
          </p>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>Pricing</Kicker>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              One price per seat. Nothing else to work out.
            </h2>
            <p className="mt-4 text-base text-ink-300">
              Start on any tier, move whenever the firm grows. Every plan includes the pipeline, client timelines and
              spreadsheet import.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                data-reveal
                style={revealDelay(i, 110)}
                className={`fd-lift relative flex flex-col rounded-2xl border p-6 ${
                  tier.featured
                    ? "border-flow-400/50 bg-ink-900/70 shadow-xl shadow-flow-700/20"
                    : "border-ink-700 bg-ink-900/40"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brass-500/40 bg-brass-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brass-300 backdrop-blur">
                    Most popular
                  </span>
                )}
                <h3 className="text-base font-semibold text-ink-50">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-money)] text-4xl text-ink-50">{tier.price}</span>
                  <span className="text-sm text-ink-400">/user/mo</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{tier.blurb}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-200">
                      <span className={`mt-0.5 ${tier.featured ? "text-flow-300" : "text-ink-400"}`}>
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onOpenApp()}
                  className={`fd-lift mt-6 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
                    tier.featured
                      ? "bg-flow-500 text-ink-50 hover:bg-flow-400"
                      : "border border-ink-600 text-ink-100 hover:border-flow-400 hover:text-flow-300"
                  }`}
                >
                  Try it in the demo
                </button>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-ink-400" data-reveal>
            Prices exclude VAT. FlowDesk is a fictional product — no card, no signup; every button simply opens the demo
            app.
          </p>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>From the firms in the demo</Kicker>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              Fictional firms. Real workflow.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.firm}
                data-reveal
                style={revealDelay(i, 110)}
                className="fd-lift flex flex-col rounded-2xl border border-ink-700 bg-ink-900/40 p-6"
              >
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden className="text-flow-400/60">
                  <path d="M0 18V9.6C0 4 3 .8 9 0l1 3.2C6.6 4 5.2 5.8 5 8.4h4.6V18H0Zm14 0V9.6C14 4 17 .8 23 0l1 3.2c-3.4.8-4.8 2.6-5 5.2h4.6V18H14Z" fill="currentColor" />
                </svg>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-100">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-ink-700/70 pt-4">
                  <div className="text-sm font-semibold text-ink-50">{t.role}</div>
                  <div className="mt-0.5 text-xs text-ink-400">{t.firm} · fictional demo firm</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="scroll-mt-24 border-t border-ink-800/80">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="text-center" data-reveal>
            <Kicker>FAQ</Kicker>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-50 sm:text-4xl">
              The questions firms actually ask
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
                    open ? "border-flow-400/40 bg-ink-900/60" : "border-ink-700 bg-ink-900/30"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-ink-50 sm:text-base">{faq.q}</span>
                    <span
                      className={`shrink-0 text-ink-400 transition-transform duration-200 ${open ? "rotate-180 text-flow-300" : ""}`}
                    >
                      <ChevronDownIcon />
                    </span>
                  </button>
                  {open && (
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-300">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative isolate overflow-hidden border-t border-ink-800/80">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 left-1/2 h-[26rem] w-[44rem] max-w-none -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(84, 104, 212, 0.22), transparent 72%)" }}
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-24" data-reveal>
          <FlowDeskMark size="h-11 w-11" />
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-ink-50 sm:text-4xl">
            See your pipeline the way FlowDesk sees it.
          </h2>
          <p className="max-w-md text-sm text-ink-300 sm:text-base">
            The demo is seeded with a full workspace — move a lead, fire an automation, ask the assistant for a
            draft. Nothing to install.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenApp()}
              className="fd-lift rounded-xl bg-flow-500 px-7 py-3.5 text-sm font-semibold text-ink-50 transition-colors hover:bg-flow-400"
            >
              Open the live app
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className="fd-lift rounded-xl border border-ink-600 px-7 py-3.5 text-sm font-semibold text-ink-100 transition-colors hover:border-flow-400 hover:text-flow-300"
            >
              See pricing
            </button>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-ink-800 bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <FlowDeskMark />
                <p className="text-base font-semibold text-ink-50">FlowDesk</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-400">
                One pipeline, automated chasing, and AI drafts for professional service firms.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Product</p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(l.id)}
                      className="text-sm text-ink-300 transition-colors hover:text-ink-50"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenApp()}
                    className="text-sm text-flow-300 transition-colors hover:text-flow-200"
                  >
                    Open the live app
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-300">
                <li>
                  <a href="mailto:hello@flowdesk.example" className="transition-colors hover:text-ink-50">
                    hello@flowdesk.example
                  </a>
                </li>
                <li className="font-mono">0123 456 7890</li>
                <li className="text-xs text-ink-500">(an obviously fake number — this is a demo)</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">About this demo</p>
              <p className="mt-4 text-xs leading-relaxed text-ink-400">
                FlowDesk is a fictional product; all data is demo content. Every firm, name, figure and quote on this
                page is invented for a portfolio demonstration.
              </p>
              <button
                type="button"
                onClick={() => onOpenApp()}
                className="fd-lift mt-5 rounded-lg bg-flow-500 px-4 py-2.5 text-sm font-semibold text-ink-50 transition-colors hover:bg-flow-400"
              >
                Try the live app
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink-800 pt-6 sm:flex-row">
            <p className="text-xs text-ink-500">© 2026 FlowDesk — a fictional demo product.</p>
            <p className="text-xs text-ink-500">Ink, flow &amp; brass. No real clients were chased.</p>
          </div>
        </div>
      </footer>
    </MotionRoot>
  );
}
