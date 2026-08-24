"use client";

import { AutomationRule, QueuedAction } from "./data";

interface AutomationsViewProps {
  rules: AutomationRule[];
  queue: QueuedAction[];
  onToggle: (ruleId: string) => void;
  onRunNow: (actionId: string) => void;
}

export default function AutomationsView({ rules, queue, onToggle, onRunNow }: AutomationsViewProps) {
  const enabledIds = new Set(rules.filter((r) => r.enabled).map((r) => r.id));
  const activeQueue = queue.filter((q) => enabledIds.has(q.ruleId));
  const pausedQueue = queue.filter((q) => !enabledIds.has(q.ruleId));
  const ruleName = (id: string): string => rules.find((r) => r.id === id)?.name ?? "Rule";

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-ink-50">Automations</h1>
        <p className="mt-1 text-sm text-ink-300">
          Workflow rules run for you in the background. Toggle a rule to pause or resume it — queued actions follow.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* Rules */}
        <div className="space-y-2.5">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
                rule.enabled ? "border-ink-700 bg-ink-900/40" : "border-ink-700/60 bg-ink-900/20"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                  rule.enabled
                    ? "border-flow-400/40 bg-flow-500/10 text-flow-300"
                    : "border-ink-600 bg-ink-800/40 text-ink-400"
                }`}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8 1 2.5 8H7l-1 5L11.5 6H7l1-5Z" fill="currentColor" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <div className={`text-sm font-medium ${rule.enabled ? "text-ink-50" : "text-ink-300"}`}>
                  {rule.name}
                  <span className="mx-1.5 text-ink-500">→</span>
                  <span className={rule.enabled ? "text-ink-100" : "text-ink-400"}>{rule.action}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-[family-name:var(--font-money)] text-[11px] text-ink-300">
                    {rule.runs} run{rule.runs === 1 ? "" : "s"} total
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      rule.enabled ? "bg-flow-500/15 text-flow-300" : "bg-ink-800 text-ink-400"
                    }`}
                  >
                    {rule.enabled ? "Active" : "Paused"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={rule.enabled}
                aria-label={`Toggle rule: ${rule.name}`}
                onClick={() => onToggle(rule.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  rule.enabled ? "bg-flow-500" : "bg-ink-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    rule.enabled ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
          <p className="px-1 text-xs text-ink-300">
            Tip: move a lead to <span className="text-brass-400">Won</span> on the Pipeline board and the onboarding
            rule will fire here — watch its run counter and the queue.
          </p>
        </div>

        {/* Queued actions */}
        <div className="rounded-2xl border border-ink-700 bg-ink-900/40 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-ink-50">Queued actions</h2>
            <span className="rounded-md bg-ink-800 px-2 py-0.5 font-[family-name:var(--font-money)] text-[11px] text-ink-200">
              {activeQueue.length} pending
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {activeQueue.length === 0 && (
              <div className="rounded-xl border border-dashed border-ink-700 px-3 py-8 text-center text-xs text-ink-400">
                Queue is clear — nothing scheduled. 🎉
              </div>
            )}
            {activeQueue.map((action) => (
              <div key={action.id} className="rounded-xl border border-ink-700 bg-ink-950/40 p-3">
                <div className="text-[10px] uppercase tracking-wider text-flow-400">{ruleName(action.ruleId)}</div>
                <p className="mt-1 text-sm leading-snug text-ink-100">{action.label}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-300">Due {action.due}</span>
                  <button
                    type="button"
                    onClick={() => onRunNow(action.id)}
                    className="rounded-lg border border-flow-400/40 bg-flow-500/10 px-2.5 py-1 text-xs font-medium text-flow-300 transition-colors hover:bg-flow-500/20"
                  >
                    Run now
                  </button>
                </div>
              </div>
            ))}
            {pausedQueue.length > 0 && (
              <div className="rounded-xl border border-ink-700/60 bg-ink-950/20 p-3">
                <div className="text-[10px] uppercase tracking-wider text-ink-400">
                  On hold — rule paused ({pausedQueue.length})
                </div>
                <ul className="mt-1.5 space-y-1">
                  {pausedQueue.map((action) => (
                    <li key={action.id} className="text-xs text-ink-400 line-through decoration-ink-600">
                      {action.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
