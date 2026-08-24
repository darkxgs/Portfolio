"use client";

import { useEffect } from "react";
import { Appointment } from "./data";
import PatientView, { BookingInput } from "./PatientView";
import { ToothIcon, XIcon } from "./icons";

interface BookingModalProps {
  open: boolean;
  appointments: Appointment[];
  initialTreatmentId?: string;
  initialPractitionerId?: string;
  /** Changes every time the modal is opened, so the wizard starts fresh. */
  sessionKey: number;
  onBook: (input: BookingInput) => string;
  onClose: () => void;
  onGoToDesk: () => void;
}

export default function BookingModal({
  open,
  appointments,
  initialTreatmentId,
  initialPractitionerId,
  sessionKey,
  onBook,
  onClose,
  onGoToDesk,
}: BookingModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Book an appointment online">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close booking"
        onClick={onClose}
        className="bs-slideover-backdrop absolute inset-0 h-full w-full cursor-default bg-mist-900/50 backdrop-blur-[2px]"
      />

      {/* Slide-over panel */}
      <div className="bs-slideover-panel absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col bg-mist-50 shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-mist-200 bg-white px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-care-300 bg-care-100 text-care-700">
              <ToothIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight text-mist-900">Book online</p>
              <p className="text-[11px] leading-tight text-mist-600">
                Live availability — the front desk sees your booking instantly.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-mist-300 text-mist-600 transition-colors hover:border-mist-400 hover:text-mist-900"
            aria-label="Close booking"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <PatientView
            key={sessionKey}
            appointments={appointments}
            onBook={onBook}
            onGoToDesk={onGoToDesk}
            initialTreatmentId={initialTreatmentId}
            initialPractitionerId={initialPractitionerId}
          />
        </div>
      </div>
    </div>
  );
}
