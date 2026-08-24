"use client";

import { useMemo, useState } from "react";
import {
  Appointment,
  DAYS,
  PRACTITIONERS,
  REMINDER_DAYS,
  SEED_PATIENTS,
  SLOTS,
  firstName,
  getPractitioner,
  getTreatment,
} from "./data";
import { CalendarIcon } from "./icons";

type DeskTab = "calendar" | "reminders" | "patients";

interface FrontDeskViewProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}

interface ReminderRow {
  id: string;
  channel: "sms" | "email";
  recipient: string;
  message: string;
  sendLabel: string;
  status: "scheduled" | "withdrawn";
  fresh: boolean;
  sortKey: number;
}

interface PatientRow {
  id: string;
  name: string;
  phone: string;
  visits: number;
  lastVisit: string;
  fresh: boolean;
}

function SmsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-2.9-.4-4.1-1L3 20l1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function FrontDeskView({ appointments, onCancel }: FrontDeskViewProps) {
  const [tab, setTab] = useState<DeskTab>("calendar");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmingCancel, setConfirmingCancel] = useState<boolean>(false);

  const confirmed = useMemo(
    () => appointments.filter((a) => a.status === "confirmed"),
    [appointments],
  );

  const selected = appointments.find((a) => a.id === selectedId && a.status === "confirmed") ?? null;

  const reminders: ReminderRow[] = useMemo(() => {
    return appointments
      .map((a, i) => {
        const t = getTreatment(a.treatmentId);
        const p = getPractitioner(a.practitionerId);
        const channel: "sms" | "email" = a.source === "visitor" ? "sms" : i % 3 === 2 ? "email" : "sms";
        return {
          id: `rem-${a.id}`,
          channel,
          recipient: a.source === "visitor" ? a.phone : channel === "sms" ? a.phone : `${firstName(a.patientName).toLowerCase()}@example.com`,
          message: `Hi ${firstName(a.patientName)}! Reminder: ${t.name.toLowerCase()} with ${p.name} on ${DAYS[a.day].label} ${DAYS[a.day].date} at ${SLOTS[a.slot]}. Reply C to cancel.`,
          sendLabel: `${REMINDER_DAYS[a.day]} · ${SLOTS[a.slot]}`,
          status: a.status === "confirmed" ? ("scheduled" as const) : ("withdrawn" as const),
          fresh: a.source === "visitor" && a.status === "confirmed",
          sortKey: a.day * 100 + a.slot,
        };
      })
      .sort((a, b) => a.sortKey - b.sortKey);
  }, [appointments]);

  const scheduledCount = reminders.filter((r) => r.status === "scheduled").length;

  const patients: PatientRow[] = useMemo(() => {
    const rows: PatientRow[] = SEED_PATIENTS.map((p) => ({ ...p, fresh: false }));
    for (const a of appointments) {
      if (a.source !== "visitor" || a.status !== "confirmed") continue;
      const existing = rows.find((r) => r.name.toLowerCase() === a.patientName.toLowerCase());
      if (existing) {
        existing.visits += 1;
        existing.lastVisit = "Booked online just now";
        existing.fresh = true;
      } else {
        rows.push({
          id: `pt-${a.id}`,
          name: a.patientName,
          phone: a.phone,
          visits: 1,
          lastVisit: "New — booked online",
          fresh: true,
        });
      }
    }
    return rows;
  }, [appointments]);

  const chairHoursLabel = useMemo(() => {
    const minutes = confirmed.reduce((sum, a) => sum + getTreatment(a.treatmentId).durationMin, 0);
    return `${(minutes / 60).toFixed(2).replace(/\.?0+$/, "")}h`;
  }, [confirmed]);

  const glance: { label: string; value: string; accent: boolean }[] = [
    { label: "Appointments this week", value: String(confirmed.length), accent: false },
    { label: "Reminders queued", value: String(scheduledCount), accent: false },
    { label: "Patients on file", value: String(patients.length), accent: false },
    { label: "Chair hours booked", value: chairHoursLabel, accent: true },
  ];

  const selectAppointment = (id: string) => {
    setSelectedId(id);
    setConfirmingCancel(false);
  };

  const tabs: { id: DeskTab; label: string; count: number }[] = [
    { id: "calendar", label: "Week calendar", count: confirmed.length },
    { id: "reminders", label: "Reminders queue", count: scheduledCount },
    { id: "patients", label: "Patients", count: patients.length },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Today at a glance */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {glance.map((s) => (
          <div key={s.label} className="rounded-2xl border border-mist-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-[11px] uppercase tracking-wide text-mist-600">{s.label}</p>
            <p className={`mt-1 text-xl font-bold ${s.accent ? "text-mint-600" : "text-mist-900"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-care-600 bg-care-600 text-white"
                  : "border-mist-200 bg-white text-mist-600 hover:border-mist-400 hover:text-mist-900"
              }`}
            >
              {t.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${active ? "bg-white/20 text-white" : "bg-mist-100 text-mist-600"}`}>
                {t.count}
              </span>
            </button>
          );
        })}
        <span className="ml-auto hidden text-xs font-mono text-mist-600 sm:block">Week of Mon 9 – Fri 13 Mar</span>
      </div>

      {tab === "calendar" && (
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
          <div>
            {/* Legend */}
            <div className="mb-3 flex flex-wrap items-center gap-4">
              {PRACTITIONERS.map((p) => (
                <span key={p.id} className="flex items-center gap-1.5 text-xs text-mist-600">
                  <span className={`h-2 w-2 rounded-full ${p.color.dot}`} />
                  {p.name}
                </span>
              ))}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-mist-200 bg-white shadow-sm">
              <div className="grid min-w-[760px] grid-cols-5 divide-x divide-mist-200">
                {DAYS.map((d, dayIdx) => {
                  const dayAppts = confirmed
                    .filter((a) => a.day === dayIdx)
                    .sort((a, b) => a.slot - b.slot);
                  return (
                    <div key={d.label} className="flex min-h-[420px] flex-col">
                      <div className="border-b border-mist-200 px-3 py-2.5 text-center">
                        <span className="text-sm font-semibold text-mist-900">{d.label}</span>{" "}
                        <span className="text-xs font-mono text-mist-600">{d.date}</span>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-2">
                        {dayAppts.length === 0 && (
                          <p className="mt-6 text-center text-xs text-mist-500">No bookings</p>
                        )}
                        {dayAppts.map((a) => {
                          const p = getPractitioner(a.practitionerId);
                          const t = getTreatment(a.treatmentId);
                          const isSelected = a.id === selectedId;
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => selectAppointment(a.id)}
                              className={`rounded-lg border p-2.5 text-left transition-colors ${p.color.block} ${
                                isSelected ? "ring-2 ring-care-400" : "hover:brightness-95"
                              }`}
                            >
                              <span className="flex items-center justify-between gap-1">
                                <span className={`text-[11px] font-mono ${p.color.text}`}>{SLOTS[a.slot]}</span>
                                {a.source === "visitor" && (
                                  <span className="rounded-full bg-care-600 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                                    New
                                  </span>
                                )}
                              </span>
                              <span className="mt-0.5 block truncate text-xs font-medium text-mist-900">{a.patientName}</span>
                              <span className="block truncate text-[11px] text-mist-600">{t.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details side panel */}
          <aside className="rounded-2xl border border-mist-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:self-start">
            {selected ? (
              (() => {
                const p = getPractitioner(selected.practitionerId);
                const t = getTreatment(selected.treatmentId);
                return (
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-mist-900">{selected.patientName}</h3>
                        <p className="mt-0.5 text-xs font-mono text-mist-600">{selected.phone}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedId(null)}
                        aria-label="Close details"
                        className="rounded-md border border-mist-300 px-2 py-1 text-xs text-mist-600 transition-colors hover:border-mist-400 hover:text-mist-900"
                      >
                        ✕
                      </button>
                    </div>

                    {selected.source === "visitor" && (
                      <p className="mt-3 rounded-lg border border-care-300 bg-care-100 px-3 py-2 text-xs text-care-800">
                        Booked online just now — straight from the patient view.
                      </p>
                    )}

                    <dl className="mt-4 space-y-3 text-sm">
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-mist-600">Treatment</dt>
                        <dd className="mt-0.5 text-mist-800">{t.name} · {t.durationMin} min · £{t.price}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-mist-600">Practitioner</dt>
                        <dd className="mt-0.5 flex items-center gap-2 text-mist-800">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold ${p.color.avatar}`}>
                            {p.initials}
                          </span>
                          {p.name}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-mist-600">When</dt>
                        <dd className="mt-0.5 font-mono text-mist-800">
                          {DAYS[selected.day].label} {DAYS[selected.day].date} · {SLOTS[selected.slot]}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-mist-600">Notes</dt>
                        <dd className="mt-0.5 leading-relaxed text-mist-800">
                          {selected.notes || "No notes yet."}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 border-t border-mist-200 pt-4">
                      {confirmingCancel ? (
                        <div>
                          <p className="text-sm text-mist-800">Cancel this appointment? The slot opens up for online booking immediately.</p>
                          <div className="mt-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                onCancel(selected.id);
                                setSelectedId(null);
                                setConfirmingCancel(false);
                              }}
                              className="flex-1 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                            >
                              Yes, cancel it
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmingCancel(false)}
                              className="flex-1 rounded-lg border border-mist-300 px-3 py-2 text-sm font-medium text-mist-800 transition-colors hover:border-mist-400 hover:text-mist-900"
                            >
                              Keep it
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmingCancel(true)}
                          className="w-full rounded-lg border border-rose-300 px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
                        >
                          Cancel appointment
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="py-10 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-mist-200 bg-mist-100 text-mist-500">
                  <CalendarIcon className="h-6 w-6" />
                </span>
                <p className="mt-3 text-sm text-mist-600">Click an appointment block to see patient details, notes and actions.</p>
              </div>
            )}
          </aside>
        </div>
      )}

      {tab === "reminders" && (
        <div className="mt-5 rounded-2xl border border-mist-200 bg-white shadow-sm">
          <div className="border-b border-mist-200 px-4 py-3 sm:px-5">
            <h3 className="text-sm font-semibold text-mist-900">Automated reminders</h3>
            <p className="mt-0.5 text-xs text-mist-600">
              Sent automatically 24h before each visit — no one at the desk has to remember. (Simulated for this demo.)
            </p>
          </div>
          <ul className="divide-y divide-mist-200">
            {reminders.map((r) => (
              <li key={r.id} className={`flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-5 ${r.status === "withdrawn" ? "opacity-50" : ""}`}>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    r.channel === "sms"
                      ? "border-care-300 bg-care-100 text-care-700"
                      : "border-amber-300 bg-amber-100 text-amber-700"
                  }`}
                >
                  {r.channel === "sms" ? <SmsIcon /> : <MailIcon />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm ${r.status === "withdrawn" ? "text-mist-500 line-through" : "text-mist-800"}`}>
                    {r.message}
                  </p>
                  <p className="mt-0.5 text-xs font-mono text-mist-600">
                    {r.channel.toUpperCase()} → {r.recipient} · sends {r.sendLabel}
                  </p>
                </div>
                <span className="shrink-0">
                  {r.status === "withdrawn" ? (
                    <span className="rounded-full border border-mist-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-mist-500">
                      Withdrawn
                    </span>
                  ) : r.fresh ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-care-300 bg-care-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-care-800">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-care-500" />
                      Just queued
                    </span>
                  ) : (
                    <span className="rounded-full border border-mint-500/40 bg-mint-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-mint-700">
                      Scheduled
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "patients" && (
        <div className="mt-5 overflow-x-auto rounded-2xl border border-mist-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-mist-200 text-xs uppercase tracking-wide text-mist-600">
                <th className="px-4 py-3 font-medium sm:px-5">Patient</th>
                <th className="px-4 py-3 font-medium sm:px-5">Phone</th>
                <th className="px-4 py-3 text-center font-medium sm:px-5">Visits</th>
                <th className="px-4 py-3 font-medium sm:px-5">Last visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-200">
              {patients.map((p) => (
                <tr key={p.id} className={p.fresh ? "bg-care-50" : undefined}>
                  <td className="px-4 py-3 sm:px-5">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-mist-300 bg-mist-100 text-[11px] font-semibold text-mist-700">
                        {p.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                      </span>
                      <span className="font-medium text-mist-900">{p.name}</span>
                      {p.fresh && (
                        <span className="rounded-full bg-care-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-care-800">
                          New
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-mist-600 sm:px-5">{p.phone}</td>
                  <td className="px-4 py-3 text-center font-mono text-mist-800 sm:px-5">{p.visits}</td>
                  <td className="px-4 py-3 text-mist-600 sm:px-5">{p.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
