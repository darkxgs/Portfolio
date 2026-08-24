"use client";

import { useEffect, useState } from "react";
import { Appointment, CLINIC, SEED_APPOINTMENTS, ViewId } from "./data";
import { BookingInput } from "./PatientView";
import FrontDeskView from "./FrontDeskView";
import Website, { BookPreselect } from "./Website";
import BookingModal from "./BookingModal";
import { CheckIcon, PhoneIcon, ToothIcon } from "./icons";

interface BookingState {
  open: boolean;
  treatmentId?: string;
  practitionerId?: string;
  session: number;
}

const NAV_LINKS: { label: string; id: string }[] = [
  { label: "Treatments", id: "treatments" },
  { label: "Fees", id: "fees" },
  { label: "Team", id: "team" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
  { label: "Visit us", id: "visit" },
];

export default function ClinicDemoPage() {
  const [view, setView] = useState<ViewId>("patient");
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);
  const [toast, setToast] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingState>({ open: false, session: 0 });

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
      notes: "Booked online via the practice website.",
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

  const openBooking = (pre?: BookPreselect) => {
    setBooking((b) => ({
      open: true,
      treatmentId: pre?.treatmentId,
      practitionerId: pre?.practitionerId,
      session: b.session + 1,
    }));
  };

  const closeBooking = () => setBooking((b) => ({ ...b, open: false }));

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const switcher: { id: ViewId; label: string }[] = [
    { id: "patient", label: "Patient" },
    { id: "desk", label: "Front desk" },
  ];

  return (
    <div className="min-h-screen bg-mist-50">
      {/* Product top bar */}
      <header className="sticky top-0 z-40 border-b border-mist-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Wordmark */}
            <button
              type="button"
              onClick={() => {
                if (view !== "patient") setView("patient");
                else scrollToId("top");
              }}
              className="flex shrink-0 items-center gap-2.5 text-left"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-care-300 bg-care-100 text-care-700">
                <ToothIcon className="h-5 w-5" />
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm font-bold leading-tight text-mist-900">BrightSmile Dental</span>
                <span className="block text-[11px] leading-tight text-mist-600">Maple Hollow</span>
              </span>
            </button>

            {/* Anchor nav (patient site only) */}
            {view === "patient" && (
              <nav className="hidden items-center gap-1 lg:flex" aria-label="Site sections">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => scrollToId(l.id)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-mist-600 transition-colors hover:bg-mist-100 hover:text-mist-900"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Right cluster */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={CLINIC.phoneHref}
                className="hidden items-center gap-2 rounded-lg border border-mist-300 px-3 py-2 text-sm font-medium text-mist-800 transition-colors hover:border-care-400 hover:text-care-700 xl:flex"
              >
                <PhoneIcon className="h-4 w-4 text-care-600" />
                {CLINIC.phone}
              </a>
              <button
                type="button"
                onClick={() => openBooking()}
                className="bs-lift rounded-lg bg-care-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-care-700 sm:px-4"
              >
                Book online
              </button>

              {/* Compact view switcher */}
              <div className="flex rounded-lg border border-mist-200 bg-mist-50 p-0.5" role="group" aria-label="Demo view">
                {switcher.map((s) => {
                  const active = s.id === view;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setView(s.id)}
                      className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        active ? "bg-white text-care-700 shadow-sm ring-1 ring-mist-200" : "text-mist-600 hover:text-mist-900"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile anchor nav */}
          {view === "patient" && (
            <div className="-mx-4 overflow-x-auto border-t border-mist-100 px-4 lg:hidden">
              <div className="flex w-max gap-1 py-2">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => scrollToId(l.id)}
                    className="whitespace-nowrap rounded-full border border-mist-200 bg-white px-3.5 py-1.5 text-xs font-medium text-mist-700 transition-colors hover:border-care-400 hover:text-care-700"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {view === "patient" ? (
        <Website onBook={openBooking} onToast={setToast} />
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-mist-900 sm:text-3xl">Front desk</h1>
            <p className="mt-1 text-sm text-mist-600">
              Everything the reception team needs — bookings, automated reminders and the patient list.
            </p>
          </div>
          <FrontDeskView appointments={appointments} onCancel={handleCancel} />
        </main>
      )}

      {/* Booking wizard slide-over */}
      <BookingModal
        open={booking.open}
        appointments={appointments}
        initialTreatmentId={booking.treatmentId}
        initialPractitionerId={booking.practitionerId}
        sessionKey={booking.session}
        onBook={handleBook}
        onClose={closeBooking}
        onGoToDesk={() => {
          closeBooking();
          setView("desk");
        }}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
          <div className="bs-toast-in flex items-center gap-2.5 rounded-xl border border-mist-200 bg-white px-4 py-3 text-sm text-mist-800 shadow-lg">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600">
              <CheckIcon className="h-3 w-3" />
            </span>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
