"use client";

import { Client, STAGES, Stage, formatGBP } from "./data";

interface PipelineViewProps {
  clients: Client[];
  onMove: (clientId: string, direction: -1 | 1) => void;
  onOpenClient: (clientId: string) => void;
}

const STAGE_ACCENT: Record<Stage, string> = {
  new: "bg-ink-400",
  contacted: "bg-flow-600",
  meeting: "bg-flow-500",
  proposal: "bg-flow-400",
  won: "bg-brass-400",
};

const STAGE_SUM: Record<Stage, string> = {
  new: "text-ink-300",
  contacted: "text-ink-300",
  meeting: "text-ink-300",
  proposal: "text-ink-300",
  won: "text-brass-400",
};

const STAGE_COUNT_BADGE: Record<Stage, string> = {
  new: "bg-ink-800 text-ink-200",
  contacted: "bg-ink-800 text-ink-200",
  meeting: "bg-ink-800 text-ink-200",
  proposal: "bg-ink-800 text-ink-200",
  won: "bg-brass-500/10 text-brass-300",
};

const OWNER_CHIP: Record<string, string> = {
  DH: "bg-flow-400/15 text-flow-300",
  MK: "bg-flow-600/25 text-flow-200",
  PO: "bg-ink-400/20 text-ink-100",
};

export default function PipelineView({ clients, onMove, onOpenClient }: PipelineViewProps) {
  const totalValue = clients.reduce((sum, c) => sum + c.value, 0);
  const wonValue = clients.filter((c) => c.stage === "won").reduce((sum, c) => sum + c.value, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-ink-50">Pipeline</h1>
          <p className="mt-1 text-sm text-ink-300">
            Use the arrows on a card to move it between stages. Every move is logged to the client&apos;s timeline.
          </p>
        </div>
        <div className="flex gap-3 text-right">
          <div className="rounded-xl border border-ink-700 bg-ink-900/40 px-4 py-2">
            <div className="text-[11px] uppercase tracking-wider text-ink-400">Pipeline value</div>
            <div className="font-[family-name:var(--font-money)] text-sm text-ink-50">{formatGBP(totalValue)}</div>
          </div>
          <div className="rounded-xl border border-brass-500/40 bg-brass-500/10 px-4 py-2">
            <div className="text-[11px] uppercase tracking-wider text-brass-300">Won</div>
            <div className="font-[family-name:var(--font-money)] text-sm text-brass-400">{formatGBP(wonValue)}</div>
          </div>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
        <div className="flex min-w-max gap-3">
          {STAGES.map((stage, stageIndex) => {
            const cards = clients.filter((c) => c.stage === stage.id);
            const sum = cards.reduce((acc, c) => acc + c.value, 0);
            const isWon = stage.id === "won";
            return (
              <div key={stage.id} className="flex w-64 shrink-0 flex-col rounded-2xl border border-ink-700 bg-ink-900/40">
                <div className="flex items-center justify-between border-b border-ink-700 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${STAGE_ACCENT[stage.id]}`} aria-hidden />
                    <span className={`text-sm font-medium ${isWon ? "text-brass-300" : "text-ink-50"}`}>{stage.label}</span>
                    <span className={`rounded-md px-1.5 py-0.5 font-[family-name:var(--font-money)] text-[11px] ${STAGE_COUNT_BADGE[stage.id]}`}>
                      {cards.length}
                    </span>
                  </div>
                  <span className={`font-[family-name:var(--font-money)] text-[11px] ${STAGE_SUM[stage.id]}`}>{formatGBP(sum)}</span>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-2">
                  {cards.length === 0 && (
                    <div className="rounded-xl border border-dashed border-ink-700 px-3 py-6 text-center text-xs text-ink-400">
                      No leads in this stage
                    </div>
                  )}
                  {cards.map((client) => (
                    <div
                      key={client.id}
                      className={`group rounded-xl border p-3 transition-colors ${
                        isWon
                          ? "border-brass-500/40 bg-brass-500/10 hover:border-brass-400/60"
                          : "border-ink-700 bg-ink-900/60 hover:border-flow-400/50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onOpenClient(client.id)}
                        className="block w-full text-left"
                        title="Open in Clients"
                      >
                        <div
                          className={`text-sm font-medium text-ink-50 ${
                            isWon ? "group-hover:text-brass-300" : "group-hover:text-flow-300"
                          }`}
                        >
                          {client.company}
                        </div>
                        <div className="mt-0.5 text-xs text-ink-300">{client.contactName}</div>
                      </button>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span
                          className={`font-[family-name:var(--font-money)] text-xs ${
                            isWon ? "text-brass-300" : "text-flow-300"
                          }`}
                        >
                          {formatGBP(client.value)}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] ${
                              OWNER_CHIP[client.owner] ?? "bg-ink-800 text-ink-200"
                            }`}
                          >
                            {client.owner}
                          </span>
                          <button
                            type="button"
                            aria-label={`Move ${client.company} to previous stage`}
                            disabled={stageIndex === 0}
                            onClick={() => onMove(client.id, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded-md border border-ink-600 text-ink-200 transition-colors hover:border-flow-400 hover:text-flow-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink-600 disabled:hover:text-ink-200"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                              <path d="M6.5 1.5 3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            aria-label={`Move ${client.company} to next stage`}
                            disabled={stageIndex === STAGES.length - 1}
                            onClick={() => onMove(client.id, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-md border border-ink-600 text-ink-200 transition-colors hover:border-flow-400 hover:text-flow-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink-600 disabled:hover:text-ink-200"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                              <path d="M3.5 1.5 7 5 3.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
