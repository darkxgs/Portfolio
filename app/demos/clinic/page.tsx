"use client";

import { useEffect, useState } from "react";
import { Appointment, SEED_APPOINTMENTS, ViewId } from "./data";
import PatientView, { BookingInput } from "./PatientView";
import FrontDeskView from "./FrontDeskView";

export default function ClinicDemoPage() {
  const [view, setView] = useState<ViewId>("patient");
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleBook = (input: BookingInput): string => {
    const id = `bs-${String(appointments.length + 1).padStart(3, "0")}`;
    const appointment: Appointment = {
      id,
      patientName: input.patientName,
      phone: input.phone,
      treatmentId: input.treatmentId,
      practitionerId: input.practitionerId,
      day: input.day,
      slot: input.slot,
      notes: "Booked online via patient portal.",
      status: "confirmed",
      source: "visitor",
    };
    setAppointments((prev) => [...prev, appointment]);
    return id;
  };

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a)),
    );
    setToast("Appointment cancelled — the slot is open again for online booking.");
  };

  const switcher: { id: ViewId; label: string; hint: string }[] = [
    { id: "patient", label: "Book an appointment", hint: "Patient" },
    { id: "desk", label: "Front desk", hint: "Staff" },
  ];

  return (
    <div className="min-h-screen bg-mist-50">
      {/* Product top bar */}
      <header className="border-b border-mist-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-care-300 bg-care-100 text-lg text-care-600">
              🦷
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight text-mist-900">BrightSmile Dental</p>
              <p className="text-[11px] leading-tight text-mist-600">Maple Hollow · online booking</p>
            </div>
          </div>

          <div className="flex rounded-lg border border-mist-200 bg-white p-1">
            {switcher.map((s) => {
              const active = s.id === view;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setView(s.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                    active ? "bg-care-600 text-white" : "text-mist-600 hover:text-mist-900"
                  }`}
                >
                  {s.label}
                  <span className={`ml-1.5 hidden text-[10px] font-mono sm:inline ${active ? "text-care-200" : "text-mist-500"}`}>
                    {s.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {view === "patient" ? (
          <>
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h1 className="text-2xl font-semibold text-mist-900 sm:text-3xl">Book your visit in under a minute</h1>
              <p className="mt-2 text-sm text-mist-600">
                Real-time availability — the front desk sees your booking the moment you confirm.
              </p>
            </div>
            <PatientView
              appointments={appointments}
              onBook={handleBook}
              onGoToDesk={() => setView("desk")}
            />
          </>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-mist-900 sm:text-3xl">Front desk</h1>
              <p className="mt-1 text-sm text-mist-600">
                Everything the reception team needs — bookings, automated reminders and the patient list.
              </p>
            </div>
            <FrontDeskView appointments={appointments} onCancel={handleCancel} />
          </>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className="flex items-center gap-2.5 rounded-xl border border-mist-200 bg-white px-4 py-3 text-sm text-mist-800 shadow-lg">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint-100 text-xs text-mint-600">✓</span>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
