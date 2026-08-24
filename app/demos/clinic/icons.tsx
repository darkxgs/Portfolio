import type { TreatmentIcon } from "./data";

interface IconProps {
  className?: string;
}

function base(className?: string) {
  return {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
}

export function ToothIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M9.34 3.05c1.05.2 1.85.75 2.66 1.4.81-.65 1.61-1.2 2.66-1.4 2.2-.43 4.4.6 5.34 2.6.9 1.94.5 4.1-.4 6-.72 1.52-1 3.1-1.13 4.77-.1 1.24-.22 2.48-.62 3.66-.28.8-.83 1.62-1.75 1.62-1 0-1.5-.9-1.8-1.75-.35-1.02-.53-2.1-.93-3.1-.22-.55-.55-1.1-1.37-1.1s-1.15.55-1.37 1.1c-.4 1-.58 2.08-.93 3.1-.3.85-.8 1.75-1.8 1.75-.92 0-1.47-.82-1.75-1.62-.4-1.18-.52-2.42-.62-3.66-.14-1.67-.41-3.25-1.13-4.77-.9-1.9-1.3-4.06-.4-6 .94-2 3.14-3.03 5.34-2.6Z" />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M11 4 12.7 8.8 17.5 10.5 12.7 12.2 11 17 9.3 12.2 4.5 10.5 9.3 8.8 11 4Z" />
      <path d="M18.5 15.5v4M16.5 17.5h4" />
    </svg>
  );
}

export function SmileIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2.2 4 2.2 4-2.2 4-2.2" />
      <path d="M9 9.2h.01M15 9.2h.01" strokeWidth={2.4} />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3l7 3v5.2c0 4.4-2.9 7.4-7 8.8-4.1-1.4-7-4.4-7-8.8V6l7-3Z" />
      <path d="m9 11.8 2.1 2.1L15.3 9.7" />
    </svg>
  );
}

export function MedCrossIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function AlignerIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4.5 18.5V13a7.5 7.5 0 0 1 15 0v5.5" />
      <path d="M8.25 14.2v4.3M12 13.5v5M15.75 14.2v4.3" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.6l2.85 5.78 6.38.93-4.62 4.5 1.09 6.36L12 17.17l-5.7 3-1.09-6.36-4.62-4.5 6.38-.93L12 2.6Z" />
    </svg>
  );
}

export function ImplantIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M8.5 3.5h7v3.5h-7z" />
      <path d="M10 7v10.5c0 1.7.9 3 2 3s2-1.3 2-3V7" />
      <path d="M10 10h4M10 13h4M10 16h4" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M20 10.4c0 5.6-8 11.6-8 11.6s-8-6-8-11.6a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.4" r="3" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-2.9-.4-4.1-1L3 20l1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M19.5 12.57 12 20l-7.5-7.43A5 5 0 1 1 12 6.01a5 5 0 1 1 7.5 6.56Z" />
    </svg>
  );
}

export function ScanIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </svg>
  );
}

/** Renders a five-star row (filled). */
export function StarRow({ className = "h-4 w-4", starClassName = "text-amber-400" }: { className?: string; starClassName?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={`${className} ${starClassName}`} />
      ))}
    </span>
  );
}

/** Icon for a treatment, keyed by the treatment's `icon` field. */
export function TreatmentGlyph({ icon, className }: { icon: TreatmentIcon; className?: string }) {
  switch (icon) {
    case "tooth":
      return <ToothIcon className={className} />;
    case "sparkle":
      return <SparkleIcon className={className} />;
    case "smile":
      return <SmileIcon className={className} />;
    case "shield":
      return <ShieldCheckIcon className={className} />;
    case "cross":
      return <MedCrossIcon className={className} />;
    case "aligner":
      return <AlignerIcon className={className} />;
    case "star":
      return <StarIcon className={className} />;
    case "implant":
      return <ImplantIcon className={className} />;
  }
}
