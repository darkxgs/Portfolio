"use client";

import { useMemo, useState } from "react";
import {
  Appointment,
  DAYS,
  LUNCH_BEFORE_SLOT,
  PRACTITIONERS,
  SLOTS,
  TREATMENTS,
  firstName,
  getPractitioner,
  getTreatment,
} from "./data";

export interface BookingInput {
  patientName: string;
  phone: string;
  treatmentId: string;
  practitionerId: string;
  day: number;
  slot: number;
}

interface PatientViewProps {
  appointments: Appointment[];
  onBook: (input: BookingInput) => string;
  onGoToDesk: () => void;
}

type Step = 1 | 2 | 3;

interface FormErrors {
  name?: string;
  phone?: string;
}

const STEP_LABELS: { step: Step; label: string }[] = [
  { step: 1, label: "Treatment" },
  { step: 2, label: "Dentist & time" },
  { step: 3, label: "Your details" },
];

export default function PatientView({ appointments, onBook, onGoToDesk }: PatientViewProps) {
  const [step, setStep] = useState<Step>(1);
  const [treatmentId, setTreatmentId] = useState<string | null>(null);
  const [practitionerId, setPractitionerId] = useState<string | null>(null);
  const [pick, setPick] = useState<{ day: number; slot: number } | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [bookingId, setBookingId] = useState<string | null>(null);

  const takenSlots = useMemo(() => {
    const set = new Set<string>();
    for (const a of appointments) {
      if (a.status === "confirmed") {
        set.add(`${a.practitionerId}:${a.day}:${a.slot}`);
      }
    }
    return set;
  }, [appointments]);

  const reset = () => {
    setStep(1);
    setTreatmentId(null);
    setPractitionerId(null);
    setPick(null);
    setName("");
    setPhone("");
    setErrors({});
    setBookingId(null);
  };

  const handleConfirm = () => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Please enter your full name.";
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      nextErrors.phone = "Please enter a valid phone number (at least 7 digits).";
    }
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;
    if (!treatmentId || !practitionerId || !pick) return;
    const id = onBook({
      patientName: name.trim(),
      phone: phone.trim(),
      treatmentId,
      practitionerId,
      day: pick.day,
      slot: pick.slot,
    });
    setBookingId(id);
  };

  // ---------- Success screen ----------
  if (bookingId && treatmentId && practitionerId && pick) {
    const t = getTreatment(treatmentId);
    const p = getPractitioner(practitionerId);
    const dayLabel = `${DAYS[pick.day].label} ${DAYS[pick.day].date}`;
    const time = SLOTS[pick.slot];
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-mint-500/40 bg-mint-100">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-mint-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-mist-900">You&apos;re booked in!</h2>
            <p className="mt-1 text-sm text-mist-600">
              Booking reference <span className="font-mono text-care-700">{bookingId.toUpperCase()}</span> — the front desk can see it already.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-mist-200 bg-mist-100 p-4 sm:p-5">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-mist-600">Treatment</dt>
                <dd className="mt-1 text-sm text-mist-900">{t.emoji} {t.name}</dd>
                <dd className="text-xs text-mist-600">{t.durationMin} min · £{t.price}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-mist-600">Practitioner</dt>
                <dd className="mt-1 text-sm text-mist-900">{p.name}</dd>
                <dd className="text-xs text-mist-600">{p.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-mist-600">When</dt>
                <dd className="mt-1 text-sm text-mist-900">{dayLabel} · <span className="font-mono">{time}</span></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-mist-600">Patient</dt>
                <dd className="mt-1 text-sm text-mist-900">{name.trim()}</dd>
                <dd className="text-xs font-mono text-mist-600">{phone.trim()}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide text-mist-600">Simulated SMS reminder · scheduled 24h before your visit</p>
            <div className="mt-3 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-care-300 bg-care-100 text-sm">🦷</div>
              <div className="max-w-md rounded-2xl rounded-tl-sm bg-care-600 px-4 py-3">
                <p className="text-sm leading-relaxed text-white">
                  Hi {firstName(name)}! Reminder from BrightSmile Dental: your {t.name.toLowerCase()} with {p.name} is tomorrow, {dayLabel} at {time}. Reply C to cancel or R to reschedule. See you soon! 😁
                </p>
                <p className="mt-1.5 text-right text-[10px] font-mono text-care-100">SMS · auto-scheduled</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onGoToDesk}
              className="rounded-lg bg-care-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-care-700"
            >
              See it on the front desk calendar →
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-mist-300 px-5 py-2.5 text-sm font-medium text-mist-800 transition-colors hover:border-mist-400 hover:text-mist-900"
            >
              Book another appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Wizard ----------
  const canContinue = step === 1 ? treatmentId !== null : practitionerId !== null && pick !== null;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Step indicator */}
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {STEP_LABELS.map(({ step: s, label }, i) => {
          const active = s === step;
          const done = s < step;
          return (
            <li key={s} className="flex items-center gap-2 sm:gap-4">
              {i > 0 && <span className={`h-px w-6 sm:w-12 ${done || active ? "bg-care-400" : "bg-mist-200"}`} />}
              <span className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                    active
                      ? "border-care-600 bg-care-600 text-white"
                      : done
                        ? "border-care-300 bg-care-100 text-care-800"
                        : "border-mist-300 bg-white text-mist-600"
                  }`}
                >
                  {done ? "✓" : s}
                </span>
                <span className={`hidden text-sm sm:inline ${active ? "text-mist-900" : "text-mist-600"}`}>{label}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-center text-sm text-mist-600 sm:hidden">
        Step {step} of 3 — {STEP_LABELS[step - 1].label}
      </p>

      <div className="mt-6 rounded-2xl border border-mist-200 bg-white p-4 shadow-sm sm:p-6">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-mist-900">What do you need?</h2>
            <p className="mt-1 text-sm text-mist-600">Pick a treatment to see live availability for the week.</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TREATMENTS.map((t) => {
                const selected = t.id === treatmentId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTreatmentId(t.id)}
                    className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                      selected
                        ? "border-care-300 bg-care-100"
                        : "border-mist-200 bg-mist-50 hover:border-mist-400"
                    }`}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-semibold ${selected ? "text-care-800" : "text-mist-900"}`}>{t.name}</span>
                        <span className="font-mono text-sm text-mist-800">£{t.price}</span>
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-mist-600">{t.blurb}</span>
                      <span className="mt-2 inline-block rounded-full border border-mist-300 px-2 py-0.5 text-[10px] font-mono text-mist-600">
                        {t.durationMin} min
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-mist-900">Choose your practitioner &amp; time</h2>
            <p className="mt-1 text-sm text-mist-600">
              Availability shown for the demo week Mon 9 – Fri 13 Mar. Greyed-out slots are already booked.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PRACTITIONERS.map((p) => {
                const selected = p.id === practitionerId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPractitionerId(p.id);
                      setPick(null);
                    }}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      selected ? "border-care-300 bg-care-100" : "border-mist-200 bg-mist-50 hover:border-mist-400"
                    }`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${p.color.avatar}`}>
                      {p.initials}
                    </span>
                    <span>
                      <span className={`block text-sm font-medium ${selected ? "text-care-800" : "text-mist-900"}`}>{p.name}</span>
                      <span className="block text-xs text-mist-600">{p.role}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {practitionerId ? (
              <div className="mt-6 overflow-x-auto rounded-xl border border-mist-200 bg-white">
                <div className="min-w-[560px] p-3 sm:p-4">
                  <div className="grid grid-cols-[56px_repeat(5,1fr)] gap-1.5">
                    <span />
                    {DAYS.map((d) => (
                      <div key={d.label} className="pb-1 text-center">
                        <span className="block text-xs font-semibold text-mist-900">{d.label}</span>
                        <span className="block text-[10px] font-mono text-mist-600">{d.date}</span>
                      </div>
                    ))}
                    {SLOTS.map((time, slotIdx) => {
                      const row = (
                        <>
                          <span className="flex items-center justify-end pr-2 text-[11px] font-mono text-mist-600">{time}</span>
                          {DAYS.map((_, dayIdx) => {
                            const taken = takenSlots.has(`${practitionerId}:${dayIdx}:${slotIdx}`);
                            const selected = pick !== null && pick.day === dayIdx && pick.slot === slotIdx;
                            return (
                              <button
                                key={dayIdx}
                                type="button"
                                disabled={taken}
                                onClick={() => setPick({ day: dayIdx, slot: slotIdx })}
                                className={`h-8 rounded-md border text-[11px] font-mono transition-colors ${
                                  taken
                                    ? "cursor-not-allowed border-mist-200 bg-mist-100 text-mist-400"
                                    : selected
                                      ? "border-care-600 bg-care-600 font-semibold text-white"
                                      : "border-mist-200 bg-white text-mist-800 hover:border-care-400 hover:text-care-700"
                                }`}
                              >
                                {taken ? "Booked" : time}
                              </button>
                            );
                          })}
                        </>
                      );
                      return (
                        <div key={time} className="contents">
                          {slotIdx === LUNCH_BEFORE_SLOT && (
                            <div className="col-span-6 my-1 flex items-center gap-2">
                              <span className="h-px flex-1 bg-mist-200" />
                              <span className="text-[10px] uppercase tracking-wide text-mist-600">Lunch break</span>
                              <span className="h-px flex-1 bg-mist-200" />
                            </div>
                          )}
                          {row}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-mist-300 p-8 text-center text-sm text-mist-600">
                Select a practitioner above to see their week.
              </div>
            )}

            {pick !== null && practitionerId && (
              <p className="mt-4 text-sm text-mist-800">
                Selected: <span className="font-medium text-care-700">{DAYS[pick.day].label} {DAYS[pick.day].date}</span> at{" "}
                <span className="font-mono text-care-700">{SLOTS[pick.slot]}</span> with {getPractitioner(practitionerId).name}
              </p>
            )}
          </div>
        )}

        {step === 3 && treatmentId && practitionerId && pick && (
          <div>
            <h2 className="text-lg font-semibold text-mist-900">Almost done — your details</h2>
            <p className="mt-1 text-sm text-mist-600">We&apos;ll text your confirmation and a reminder 24h before the visit.</p>

            <div className="mt-5 rounded-xl border border-mist-200 bg-mist-100 p-4 text-sm">
              <p className="text-mist-800">
                {getTreatment(treatmentId).emoji} {getTreatment(treatmentId).name} · {getPractitioner(practitionerId).name} ·{" "}
                <span className="font-mono text-care-700">{DAYS[pick.day].label} {DAYS[pick.day].date}, {SLOTS[pick.slot]}</span>
              </p>
              <p className="mt-1 text-xs text-mist-600">
                {getTreatment(treatmentId).durationMin} min · £{getTreatment(treatmentId).price} — pay at the clinic.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="clinic-name" className="block text-sm font-medium text-mist-800">Full name</label>
                <input
                  id="clinic-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Farah Mostafa"
                  className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-mist-900 placeholder:text-mist-400 focus:outline-none focus:ring-2 focus:ring-care-400 ${
                    errors.name ? "border-rose-400" : "border-mist-300"
                  }`}
                />
                {errors.name && <p className="mt-1.5 text-xs text-rose-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="clinic-phone" className="block text-sm font-medium text-mist-800">Mobile number</label>
                <input
                  id="clinic-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 07700 900123"
                  className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 font-mono text-sm text-mist-900 placeholder:text-mist-400 focus:outline-none focus:ring-2 focus:ring-care-400 ${
                    errors.phone ? "border-rose-400" : "border-mist-300"
                  }`}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-rose-600">{errors.phone}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Wizard footer */}
        <div className="mt-6 flex items-center justify-between border-t border-mist-200 pt-5">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as Step)}
              className="rounded-lg border border-mist-300 px-4 py-2 text-sm font-medium text-mist-800 transition-colors hover:border-mist-400 hover:text-mist-900"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((step + 1) as Step)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                canContinue
                  ? "bg-care-600 text-white hover:bg-care-700"
                  : "cursor-not-allowed bg-mist-100 text-mist-400"
              }`}
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-lg bg-care-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-care-700"
            >
              Confirm booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
