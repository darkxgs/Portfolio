"use client";

import { useRef, useState } from "react";
import {
  AutomationRule,
  Client,
  DEMO_TODAY,
  QueuedAction,
  SEED_CLIENTS,
  SEED_QUEUE,
  SEED_RULES,
  STAGES,
  STAGE_LABELS,
  TimelineEntry,
  View,
} from "./data";
import PipelineView from "./PipelineView";
import ClientsView from "./ClientsView";
import AutomationsView from "./AutomationsView";
import AssistantView from "./AssistantView";
import Website from "./Website";

const NAV: { id: View; label: string; icon: React.ReactNode }[] = [
  {
    id: "pipeline",
    label: "Pipeline",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <rect x="1" y="2" width="3.4" height="11" rx="1" fill="currentColor" opacity="0.9" />
        <rect x="5.8" y="2" width="3.4" height="8" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="10.6" y="2" width="3.4" height="5.5" rx="1" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "clients",
    label: "Clients",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <circle cx="7.5" cy="4.5" r="2.6" fill="currentColor" />
        <path d="M2 13c.6-3 2.8-4.4 5.5-4.4S12.4 10 13 13H2Z" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: "automations",
    label: "Automations",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <path d="M8.5 1 3 8h4.2l-.9 6L12 6.5H7.8L8.5 1Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "assistant",
    label: "AI Assistant",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <path d="M7.5 1.5 8.9 5.6l4.1 1.4-4.1 1.4-1.4 4.1-1.4-4.1L2 7l4.1-1.4 1.4-4.1Z" fill="currentColor" />
        <circle cx="12.5" cy="12" r="1.4" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
];

export default function FlowDeskDemo() {
  // The demo lands on the product SITE; the working app is one click away.
  const [mode, setMode] = useState<"site" | "app">("site");
  const [view, setView] = useState<View>("pipeline");
  const [clients, setClients] = useState<Client[]>(SEED_CLIENTS);
  const [rules, setRules] = useState<AutomationRule[]>(SEED_RULES);
  const [queue, setQueue] = useState<QueuedAction[]>(SEED_QUEUE);
  const [selectedClientId, setSelectedClientId] = useState<string>(SEED_CLIENTS[0]?.id ?? "");
  const [toast, setToast] = useState<string | null>(null);

  const idCounter = useRef<number>(100);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextId = (prefix: string): string => {
    idCounter.current += 1;
    return `${prefix}-${idCounter.current}`;
  };

  const showToast = (text: string) => {
    if (toastTimer.current !== null) clearTimeout(toastTimer.current);
    setToast(text);
    toastTimer.current = setTimeout(() => {
      setToast(null);
      toastTimer.current = null;
    }, 3200);
  };

  const appendTimeline = (list: Client[], clientId: string, entry: TimelineEntry): Client[] =>
    list.map((c) => (c.id === clientId ? { ...c, timeline: [entry, ...c.timeline] } : c));

  const moveClient = (clientId: string, direction: -1 | 1) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;
    const stageIndex = STAGES.findIndex((s) => s.id === client.stage);
    const nextIndex = stageIndex + direction;
    if (nextIndex < 0 || nextIndex >= STAGES.length) return;
    const nextStage = STAGES[nextIndex].id;

    let updated = clients.map((c) => (c.id === clientId ? { ...c, stage: nextStage } : c));
    updated = appendTimeline(updated, clientId, {
      id: nextId("t"),
      kind: "stage",
      date: DEMO_TODAY,
      text: `Moved to stage: ${STAGE_LABELS[nextStage]}.`,
    });

    const onboardingRule = rules.find((r) => r.id === "r2");
    if (nextStage === "won" && onboardingRule?.enabled) {
      updated = appendTimeline(updated, clientId, {
        id: nextId("t"),
        kind: "automation",
        date: DEMO_TODAY,
        text: "Automation: onboarding checklist started (engagement letter, AML checks, software access).",
      });
      setRules((prev) => prev.map((r) => (r.id === "r2" ? { ...r, runs: r.runs + 1 } : r)));
      setQueue((prev) => [
        {
          id: nextId("q"),
          ruleId: "r2",
          clientId,
          label: `Send onboarding pack — ${client.company}`,
          due: "26 Aug 2026",
        },
        ...prev,
      ]);
      showToast(`⚡ Automation fired: onboarding checklist started for ${client.company}`);
    } else {
      showToast(`${client.company} moved to ${STAGE_LABELS[nextStage]}`);
    }

    setClients(updated);
  };

  const addNote = (clientId: string, text: string) => {
    setClients((prev) =>
      appendTimeline(prev, clientId, {
        id: nextId("t"),
        kind: "note",
        date: DEMO_TODAY,
        text,
      })
    );
    showToast("Note added to timeline");
  };

  const toggleRule = (ruleId: string) => {
    const rule = rules.find((r) => r.id === ruleId);
    setRules((prev) => prev.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r)));
    if (rule) showToast(rule.enabled ? `Rule paused: ${rule.name}` : `Rule resumed: ${rule.name}`);
  };

  const runQueuedNow = (actionId: string) => {
    const action = queue.find((q) => q.id === actionId);
    if (!action) return;
    setQueue((prev) => prev.filter((q) => q.id !== actionId));
    setRules((prev) => prev.map((r) => (r.id === action.ruleId ? { ...r, runs: r.runs + 1 } : r)));
    setClients((prev) =>
      appendTimeline(prev, action.clientId, {
        id: nextId("t"),
        kind: "automation",
        date: DEMO_TODAY,
        text: `Automation ran: ${action.label}`,
      })
    );
    showToast("⚡ Action executed and logged to the client timeline");
  };

  const openClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setView("clients");
  };

  // Deep links from the product site open the app on a specific view.
  const openApp = (target?: View) => {
    if (target) setView(target);
    setMode("app");
    window.scrollTo(0, 0);
  };

  const backToSite = () => {
    setMode("site");
    window.scrollTo(0, 0);
  };

  if (mode === "site") {
    return <Website onOpenApp={openApp} />;
  }

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      {/* Product top bar */}
      <header className="border-b border-ink-700 bg-ink-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-flow-500 font-bold text-ink-50">
              F
            </span>
            <div>
              <div className="text-sm font-semibold leading-tight text-ink-50">FlowDesk</div>
              <div className="font-mono text-[10px] leading-tight text-ink-400">CRM + automation</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={backToSite}
              className="flex items-center gap-1.5 rounded-lg border border-ink-700 px-2.5 py-1.5 text-xs text-ink-300 transition-colors hover:border-flow-400 hover:text-flow-300"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M6.5 1.5 3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to site
            </button>
            <span className="hidden rounded-full border border-ink-700 bg-ink-900/60 px-3 py-1 font-mono text-[11px] text-ink-300 sm:inline">
              Tenant: Hartwell &amp; Co
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-flow-400/40 bg-flow-500/10 font-mono text-xs text-flow-300">
              DH
            </span>
          </div>
        </div>

        {/* Mobile tab bar */}
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6 md:hidden" aria-label="Views">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                view === item.id
                  ? "bg-flow-500/15 text-flow-300"
                  : "text-ink-300 hover:bg-ink-900 hover:text-ink-100"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto flex max-w-7xl px-4 sm:px-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-48 shrink-0 border-r border-ink-700/80 py-6 pr-4 md:block">
          <nav className="space-y-1" aria-label="Views">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  view === item.id
                    ? "bg-flow-500/15 text-flow-300"
                    : "text-ink-300 hover:bg-ink-900 hover:text-ink-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-xl border border-ink-700 bg-ink-900/40 p-3">
            <div className="text-[10px] uppercase tracking-wider text-ink-400">This week</div>
            <div className="mt-1.5 text-xs text-ink-300">
              <span className="font-[family-name:var(--font-money)] text-flow-300">{rules.reduce((s, r) => s + r.runs, 0)}</span> automation
              runs saved the team an estimated <span className="font-[family-name:var(--font-money)] text-brass-400">11h</span>.
            </div>
          </div>
        </aside>

        {/* Main view */}
        <main className="min-w-0 flex-1 py-6 md:pl-6">
          {view === "pipeline" && <PipelineView clients={clients} onMove={moveClient} onOpenClient={openClient} />}
          {view === "clients" && (
            <ClientsView
              clients={clients}
              selectedId={selectedClientId}
              onSelect={setSelectedClientId}
              onAddNote={addNote}
            />
          )}
          {view === "automations" && (
            <AutomationsView rules={rules} queue={queue} onToggle={toggleRule} onRunNow={runQueuedNow} />
          )}
          {view === "assistant" && <AssistantView clients={clients} />}
        </main>
      </div>

      {/* Toast */}
      {toast !== null && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className="fd-toast-in rounded-xl border border-flow-400/40 bg-ink-900 px-4 py-2.5 text-sm text-ink-100 shadow-lg shadow-flow-500/10">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
