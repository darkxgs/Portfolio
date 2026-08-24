"use client";

import { useEffect, useRef, useState } from "react";
import { AI_SCRIPTS, Client, STAGE_LABELS, fallbackScript, formatGBP } from "./data";

interface AssistantViewProps {
  clients: Client[];
}

type AiAction = "summary" | "email";
type Phase = "idle" | "thinking" | "done";

const ACTION_LABELS: Record<AiAction, string> = {
  summary: "Relationship summary",
  email: "Draft follow-up email",
};

export default function AssistantView({ clients }: AssistantViewProps) {
  const [clientId, setClientId] = useState<string>(clients[0]?.id ?? "");
  const [action, setAction] = useState<AiAction | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const client = clients.find((c) => c.id === clientId) ?? clients[0];

  const run = (nextAction: AiAction) => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setAction(nextAction);
    setPhase("thinking");
    timerRef.current = setTimeout(() => {
      setPhase("done");
      timerRef.current = null;
    }, 1100);
  };

  const selectClient = (id: string) => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setClientId(id);
    setAction(null);
    setPhase("idle");
  };

  const script = client ? (AI_SCRIPTS[client.id] ?? fallbackScript(client)) : null;
  const output = action === "summary" ? script?.summary : script?.email;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-ink-50">AI Assistant</h1>
        <p className="mt-1 text-sm text-ink-300">
          Pick a client, then ask the assistant for a relationship summary or a ready-to-send follow-up.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        {/* Controls */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-ink-700 bg-ink-900/40 p-4">
            <label htmlFor="ai-client" className="text-[11px] uppercase tracking-wider text-ink-400">
              Client
            </label>
            <select
              id="ai-client"
              value={client?.id ?? ""}
              onChange={(e) => selectClient(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink-600 bg-ink-950/60 px-3 py-2 text-sm text-ink-50 focus:border-flow-500 focus:outline-none"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company}
                </option>
              ))}
            </select>

            {client && (
              <div className="mt-3 rounded-xl border border-ink-700 bg-ink-950/40 px-3 py-2.5 text-xs text-ink-300">
                <div className="flex justify-between">
                  <span>Stage</span>
                  <span className="text-ink-200">{STAGE_LABELS[client.stage]}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span>Est. value</span>
                  <span className="font-[family-name:var(--font-money)] text-flow-300">{formatGBP(client.value)}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span>Logged interactions</span>
                  <span className="font-[family-name:var(--font-money)] text-ink-200">{client.timeline.length}</span>
                </div>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => run("summary")}
                className="w-full rounded-lg bg-flow-500 px-4 py-2.5 text-sm font-medium text-ink-50 transition-colors hover:bg-flow-400"
              >
                ✦ Summarise relationship
              </button>
              <button
                type="button"
                onClick={() => run("email")}
                className="w-full rounded-lg border border-flow-400/40 bg-flow-500/10 px-4 py-2.5 text-sm font-medium text-flow-300 transition-colors hover:bg-flow-500/20"
              >
                ✎ Draft follow-up email
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-700 bg-ink-900/20 p-4 text-xs leading-relaxed text-ink-300">
            In the real product this is powered by a language model over your CRM history. In this demo the outputs are
            pre-written so nothing leaves your browser.
          </div>
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-ink-700 bg-ink-900/40 p-4 sm:p-6">
          {phase === "idle" && (
            <div className="flex h-full min-h-[16rem] flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-flow-400/30 bg-flow-500/10 text-xl">
                ✦
              </span>
              <p className="mt-3 max-w-xs text-sm text-ink-300">
                Choose a client and run an action — the assistant will read the timeline and respond here.
              </p>
            </div>
          )}

          {phase === "thinking" && client && action && (
            <div className="flex h-full min-h-[16rem] flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1.5" aria-label="Assistant is thinking">
                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-flow-300" style={{ animationDelay: "0ms" }} />
                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-flow-300" style={{ animationDelay: "150ms" }} />
                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-flow-300" style={{ animationDelay: "300ms" }} />
              </div>
              <p className="mt-4 text-sm text-ink-300">
                Reading {client.timeline.length} timeline entries for{" "}
                <span className="text-ink-100">{client.company}</span>…
              </p>
            </div>
          )}

          {phase === "done" && client && action && output && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-medium text-ink-50">
                  {ACTION_LABELS[action]} · <span className="text-flow-300">{client.company}</span>
                </div>
                <span className="rounded-full border border-flow-400/40 bg-flow-500/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-flow-300">
                  Simulated AI output — demo
                </span>
              </div>
              <div className="mt-3 rounded-xl border border-ink-700 bg-ink-900 p-4">
                {action === "email" ? (
                  <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-ink-100">
                    {output}
                  </pre>
                ) : (
                  <p className="text-sm leading-relaxed text-ink-100">{output}</p>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => run(action === "summary" ? "email" : "summary")}
                  className="rounded-lg border border-ink-600 px-3 py-1.5 text-xs text-ink-200 transition-colors hover:border-flow-400 hover:text-flow-300"
                >
                  {action === "summary" ? "Draft the follow-up instead" : "Summarise instead"}
                </button>
                <button
                  type="button"
                  onClick={() => run(action)}
                  className="rounded-lg border border-ink-600 px-3 py-1.5 text-xs text-ink-200 transition-colors hover:border-flow-400 hover:text-flow-300"
                >
                  ↻ Regenerate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
