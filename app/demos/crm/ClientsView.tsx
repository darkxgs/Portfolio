"use client";

import { useState } from "react";
import { Client, EntryKind, STAGE_LABELS, Stage, formatGBP } from "./data";

interface ClientsViewProps {
  clients: Client[];
  selectedId: string;
  onSelect: (clientId: string) => void;
  onAddNote: (clientId: string, text: string) => void;
}

const STAGE_BADGE: Record<Stage, string> = {
  new: "border-ink-600 bg-ink-800/60 text-ink-200",
  contacted: "border-flow-600/40 bg-flow-600/10 text-flow-300",
  meeting: "border-flow-500/40 bg-flow-500/10 text-flow-300",
  proposal: "border-flow-400/40 bg-flow-500/15 text-flow-200",
  won: "border-brass-500/40 bg-brass-500/10 text-brass-300",
};

const KIND_META: Record<EntryKind, { label: string; className: string; icon: string }> = {
  call: { label: "Call", className: "text-flow-300", icon: "📞" },
  email: { label: "Email", className: "text-flow-400", icon: "✉️" },
  note: { label: "Note", className: "text-ink-200", icon: "📝" },
  stage: { label: "Stage", className: "text-flow-200", icon: "⇄" },
  automation: { label: "Automation", className: "text-flow-300", icon: "⚡" },
};

export default function ClientsView({ clients, selectedId, onSelect, onAddNote }: ClientsViewProps) {
  const [noteDraft, setNoteDraft] = useState<string>("");
  const selected = clients.find((c) => c.id === selectedId) ?? clients[0];

  const submitNote = () => {
    const text = noteDraft.trim();
    if (!text || !selected) return;
    onAddNote(selected.id, text);
    setNoteDraft("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-ink-50">Clients</h1>
        <p className="mt-1 text-sm text-ink-300">
          Select a client to view contact details and the full interaction timeline.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        {/* Client list */}
        <div className="rounded-2xl border border-ink-700 bg-ink-900/40 p-2">
          <div className="max-h-56 space-y-1 overflow-y-auto pr-1 lg:max-h-[32rem]">
            {clients.map((client) => {
              const active = selected?.id === client.id;
              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => onSelect(client.id)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    active
                      ? "border-flow-400/40 bg-flow-500/15"
                      : "border-transparent hover:border-ink-600 hover:bg-ink-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-sm font-medium ${active ? "text-flow-200" : "text-ink-50"}`}>
                      {client.company}
                    </span>
                    <span className="shrink-0 font-[family-name:var(--font-money)] text-[11px] text-ink-300">{formatGBP(client.value)}</span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-ink-300">{client.contactName}</span>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${STAGE_BADGE[client.stage]}`}>
                      {STAGE_LABELS[client.stage]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="rounded-2xl border border-ink-700 bg-ink-900/40 p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-ink-50">{selected.company}</h2>
                <div className="mt-1 text-sm text-ink-300">
                  {selected.contactName} · account owner{" "}
                  <span className="font-mono text-ink-200">{selected.owner}</span>
                </div>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs ${STAGE_BADGE[selected.stage]}`}>
                {STAGE_LABELS[selected.stage]}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-ink-700 bg-ink-950/40 px-3 py-2.5">
                <div className="text-[11px] uppercase tracking-wider text-ink-400">Email</div>
                <div className="mt-0.5 truncate font-mono text-xs text-ink-200">{selected.email}</div>
              </div>
              <div className="rounded-xl border border-ink-700 bg-ink-950/40 px-3 py-2.5">
                <div className="text-[11px] uppercase tracking-wider text-ink-400">Phone</div>
                <div className="mt-0.5 font-mono text-xs text-ink-200">{selected.phone}</div>
              </div>
              <div className="rounded-xl border border-ink-700 bg-ink-950/40 px-3 py-2.5">
                <div className="text-[11px] uppercase tracking-wider text-ink-400">Est. annual value</div>
                <div className="mt-0.5 font-[family-name:var(--font-money)] text-xs text-flow-300">{formatGBP(selected.value)}</div>
              </div>
            </div>

            {/* Add note */}
            <div className="mt-5 flex gap-2">
              <input
                type="text"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitNote();
                }}
                placeholder={`Add a note about ${selected.company}…`}
                className="min-w-0 flex-1 rounded-lg border border-ink-600 bg-ink-950/60 px-3 py-2 text-sm text-ink-50 placeholder:text-ink-500 focus:border-flow-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={submitNote}
                disabled={noteDraft.trim().length === 0}
                className="shrink-0 rounded-lg bg-flow-500 px-4 py-2 text-sm font-medium text-ink-50 transition-colors hover:bg-flow-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add note
              </button>
            </div>

            {/* Timeline */}
            <h3 className="mt-6 text-sm font-medium text-ink-50">
              Timeline{" "}
              <span className="font-[family-name:var(--font-money)] text-xs text-ink-300">({selected.timeline.length} entries, newest first)</span>
            </h3>
            <ol className="mt-3 space-y-0">
              {selected.timeline.map((entry, index) => {
                const meta = KIND_META[entry.kind];
                const isLast = index === selected.timeline.length - 1;
                return (
                  <li key={entry.id} className="relative flex gap-3 pb-4">
                    {!isLast && (
                      <span className="absolute left-[13px] top-7 bottom-0 w-px bg-ink-600" aria-hidden />
                    )}
                    <span className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-600 bg-ink-900 text-xs">
                      <span aria-hidden>{meta.icon}</span>
                    </span>
                    <div className="min-w-0 flex-1 rounded-xl border border-ink-700 bg-ink-950/40 px-3 py-2.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className={`text-xs font-medium ${meta.className}`}>{meta.label}</span>
                        <span className="font-mono text-[11px] text-ink-300">{entry.date}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-100">{entry.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-ink-700 p-10 text-sm text-ink-400">
            Select a client to view details
          </div>
        )}
      </div>
    </div>
  );
}
