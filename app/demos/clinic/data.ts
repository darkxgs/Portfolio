export type ViewId = "patient" | "desk";

export type TreatmentIcon =
  | "tooth"
  | "sparkle"
  | "smile"
  | "shield"
  | "cross"
  | "aligner"
  | "star"
  | "implant";

export interface Treatment {
  id: string;
  name: string;
  blurb: string;
  durationMin: number;
  price: number;
  icon: TreatmentIcon;
}

export interface PractitionerColor {
  avatar: string;
  block: string;
  dot: string;
  text: string;
}

export interface Practitioner {
  id: string;
  name: string;
  role: string;
  initials: string;
  credential: string;
  bio: string;
  color: PractitionerColor;
}

export type AppointmentStatus = "confirmed" | "cancelled";
export type AppointmentSource = "seed" | "visitor";

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  treatmentId: string;
  practitionerId: string;
  day: number; // 0 = Mon … 4 = Fri
  slot: number; // index into SLOTS
  notes: string;
  status: AppointmentStatus;
  source: AppointmentSource;
}

export interface SeedPatient {
  id: string;
  name: string;
  phone: string;
  visits: number;
  lastVisit: string;
}

export const TREATMENTS: Treatment[] = [
  {
    id: "checkup",
    name: "Check-up & exam",
    blurb: "Full dental exam with X-rays and a personal treatment plan.",
    durationMin: 30,
    price: 55,
    icon: "tooth",
  },
  {
    id: "hygiene",
    name: "Hygiene clean",
    blurb: "Scale & polish with our hygienist. Fresh-mouth guarantee.",
    durationMin: 45,
    price: 75,
    icon: "sparkle",
  },
  {
    id: "whitening",
    name: "Teeth whitening",
    blurb: "In-chair whitening — up to four shades brighter in one visit.",
    durationMin: 60,
    price: 220,
    icon: "smile",
  },
  {
    id: "filling",
    name: "White filling",
    blurb: "Tooth-coloured composite filling, matched to your smile.",
    durationMin: 45,
    price: 120,
    icon: "shield",
  },
  {
    id: "aligners",
    name: "Clear aligner consult",
    blurb: "Digital smile scan, 3D preview and a fixed aligner quote.",
    durationMin: 45,
    price: 65,
    icon: "aligner",
  },
  {
    id: "veneers",
    name: "Veneer consult",
    blurb: "Smile design session — see your options and exact prices.",
    durationMin: 45,
    price: 65,
    icon: "star",
  },
  {
    id: "implants",
    name: "Implant consult",
    blurb: "3D scan and a full implant plan with staged costs.",
    durationMin: 60,
    price: 95,
    icon: "implant",
  },
  {
    id: "emergency",
    name: "Emergency visit",
    blurb: "Same-week slot for pain, swelling or a broken tooth.",
    durationMin: 30,
    price: 95,
    icon: "cross",
  },
];

/**
 * Treatments as presented on the public website. Each maps to a bookable
 * wizard treatment (big-ticket items start with a bookable consult).
 */
export interface WebsiteTreatment {
  id: string;
  wizardId: string; // id in TREATMENTS the "Book this" button preselects
  name: string;
  benefit: string;
  duration: string;
  priceLabel: string;
  includes: string[];
  note?: string;
}

export const WEBSITE_TREATMENTS: WebsiteTreatment[] = [
  {
    id: "site-checkup",
    wizardId: "checkup",
    name: "Check-up & exam",
    benefit: "A full picture of your oral health — and a plan you actually understand.",
    duration: "30 min",
    priceLabel: "£55",
    includes: [
      "Full mouth & gum examination",
      "Digital X-rays where needed",
      "Oral cancer screening",
      "Written plan with fixed prices",
    ],
  },
  {
    id: "site-hygiene",
    wizardId: "hygiene",
    name: "Hygiene clean",
    benefit: "Fresh-feeling teeth and healthier gums in a single visit.",
    duration: "45 min",
    priceLabel: "£75",
    includes: [
      "Scale & polish with our hygienist",
      "Stain removal (tea, coffee, red wine)",
      "Gum-health score you can track",
      "Tailored home-care advice",
    ],
  },
  {
    id: "site-whitening",
    wizardId: "whitening",
    name: "Teeth whitening",
    benefit: "Up to four shades brighter, safely supervised in the chair.",
    duration: "60 min",
    priceLabel: "from £220",
    includes: [
      "In-chair professional whitening",
      "Custom take-home top-up trays",
      "Shade check before & after",
      "Sensitivity-managed protocol",
    ],
  },
  {
    id: "site-fillings",
    wizardId: "filling",
    name: "White fillings",
    benefit: "Tooth-coloured repairs that disappear into your smile.",
    duration: "45 min",
    priceLabel: "from £120",
    includes: [
      "Shade-matched composite",
      "Numbing checked before we start",
      "Bite check & final polish",
      "Aftercare advice included",
    ],
  },
  {
    id: "site-aligners",
    wizardId: "aligners",
    name: "Clear aligners",
    benefit: "Straighten your smile discreetly — no fixed braces.",
    duration: "6–18 months",
    priceLabel: "from £1,850",
    includes: [
      "Digital smile scan & 3D preview",
      "All aligner sets included",
      "Reviews every 6–8 weeks",
      "Retainers & whitening at the end",
    ],
    note: "Starts with a 45-minute consult (£65) — book that online below.",
  },
  {
    id: "site-veneers",
    wizardId: "veneers",
    name: "Veneers",
    benefit: "Hand-finished porcelain for chips, gaps and shape.",
    duration: "2–3 visits",
    priceLabel: "from £450 / tooth",
    includes: [
      "Smile design & trial preview",
      "Minimal-prep porcelain veneers",
      "Precise shade matching",
      "Protective night guard included",
    ],
    note: "Starts with a 45-minute consult (£65) — book that online below.",
  },
  {
    id: "site-implants",
    wizardId: "implants",
    name: "Dental implants",
    benefit: "A fixed, natural-feeling replacement for missing teeth.",
    duration: "3–6 months",
    priceLabel: "from £2,300",
    includes: [
      "3D scan & guided planning",
      "Titanium implant & placement",
      "Custom porcelain crown",
      "All reviews & aftercare included",
    ],
    note: "Starts with a 60-minute consult (£95) — book that online below.",
  },
  {
    id: "site-emergency",
    wizardId: "emergency",
    name: "Emergency care",
    benefit: "In pain? We keep same-day slots free every weekday morning.",
    duration: "30 min",
    priceLabel: "from £95",
    includes: [
      "Same-day assessment & pain relief",
      "X-ray of the problem tooth",
      "Temporary or permanent fix where possible",
      "Follow-up plan with fixed prices",
    ],
  },
];

export const PRACTITIONERS: Practitioner[] = [
  {
    id: "p-lina",
    name: "Dr. Lina Farouk",
    role: "Principal dentist",
    initials: "LF",
    credential: "BDS — GDC registered",
    bio: "Founded BrightSmile to make dentistry feel unhurried. Special interest in cosmetic work and looking after nervous patients.",
    color: {
      avatar: "bg-care-100 text-care-800 border-care-300",
      block: "bg-care-100 border-care-300",
      dot: "bg-care-500",
      text: "text-care-800",
    },
  },
  {
    id: "p-omar",
    name: "Dr. Omar Nassar",
    role: "Associate dentist",
    initials: "ON",
    credential: "BDS — GDC registered",
    bio: "Leads our restorative and implant work, and covers most same-day emergency slots. Known for a very steady hand.",
    color: {
      avatar: "bg-mint-100 text-mint-700 border-mint-500/40",
      block: "bg-mint-100 border-mint-500/40",
      dot: "bg-mint-500",
      text: "text-mint-700",
    },
  },
  {
    id: "p-nour",
    name: "Nour El-Sayed",
    role: "Dental hygienist",
    initials: "NE",
    credential: "Dip Dental Hygiene — GDC registered",
    bio: "Runs our hygiene programme — gum health, stain removal and honest home-care coaching. Gentle with sensitive teeth.",
    color: {
      avatar: "bg-amber-100 text-amber-700 border-amber-300",
      block: "bg-amber-100 border-amber-300",
      dot: "bg-amber-600",
      text: "text-amber-700",
    },
  },
];

// Fictional demo week: Mon 9 Mar – Fri 13 Mar
export const DAYS: { label: string; date: string }[] = [
  { label: "Mon", date: "9 Mar" },
  { label: "Tue", date: "10 Mar" },
  { label: "Wed", date: "11 Mar" },
  { label: "Thu", date: "12 Mar" },
  { label: "Fri", date: "13 Mar" },
];

// Day labels for "24h before" reminder send times (index = appointment day)
export const REMINDER_DAYS: string[] = [
  "Sun 8 Mar",
  "Mon 9 Mar",
  "Tue 10 Mar",
  "Wed 11 Mar",
  "Thu 12 Mar",
];

export const SLOTS: string[] = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

// Index of the first afternoon slot (a lunch-break divider renders before it)
export const LUNCH_BEFORE_SLOT = 6;

export const SEED_APPOINTMENTS: Appointment[] = [
  { id: "a-01", patientName: "Marwa Adel", phone: "07700 900231", treatmentId: "checkup", practitionerId: "p-lina", day: 0, slot: 0, notes: "New crown fitted in Nov — check bite.", status: "confirmed", source: "seed" },
  { id: "a-02", patientName: "Hassan Tarek", phone: "07700 900804", treatmentId: "filling", practitionerId: "p-omar", day: 0, slot: 2, notes: "Lower-left molar, composite.", status: "confirmed", source: "seed" },
  { id: "a-03", patientName: "Dalia Mansour", phone: "07700 900410", treatmentId: "hygiene", practitionerId: "p-nour", day: 0, slot: 5, notes: "Six-month recall.", status: "confirmed", source: "seed" },
  { id: "a-04", patientName: "Youssef Kamal", phone: "07700 900522", treatmentId: "whitening", practitionerId: "p-lina", day: 1, slot: 3, notes: "Wedding on the 21st — wants max shade lift.", status: "confirmed", source: "seed" },
  { id: "a-05", patientName: "Salma Ibrahim", phone: "07700 900937", treatmentId: "checkup", practitionerId: "p-omar", day: 1, slot: 6, notes: "Sensitive to cold on upper right.", status: "confirmed", source: "seed" },
  { id: "a-06", patientName: "Karim Fathy", phone: "07700 900290", treatmentId: "hygiene", practitionerId: "p-nour", day: 1, slot: 8, notes: "Coffee staining — extra polish.", status: "confirmed", source: "seed" },
  { id: "a-07", patientName: "Laila Hosny", phone: "07700 900348", treatmentId: "filling", practitionerId: "p-lina", day: 2, slot: 1, notes: "Replace old amalgam, tooth 26.", status: "confirmed", source: "seed" },
  { id: "a-08", patientName: "Tamer Said", phone: "07700 900012", treatmentId: "emergency", practitionerId: "p-omar", day: 2, slot: 0, notes: "Cracked molar — fitted same week.", status: "confirmed", source: "seed" },
  { id: "a-09", patientName: "Rana Sameh", phone: "07700 900475", treatmentId: "hygiene", practitionerId: "p-nour", day: 2, slot: 10, notes: "First visit with hygienist.", status: "confirmed", source: "seed" },
  { id: "a-10", patientName: "Mostafa Gad", phone: "07700 900807", treatmentId: "checkup", practitionerId: "p-lina", day: 3, slot: 7, notes: "Annual exam + X-rays.", status: "confirmed", source: "seed" },
  { id: "a-11", patientName: "Heba Lotfy", phone: "07700 900931", treatmentId: "whitening", practitionerId: "p-omar", day: 3, slot: 4, notes: "Top-up session (had whitening last year).", status: "confirmed", source: "seed" },
  { id: "a-12", patientName: "Amr Zaki", phone: "07700 900103", treatmentId: "checkup", practitionerId: "p-nour", day: 4, slot: 2, notes: "Gum check before braces referral.", status: "confirmed", source: "seed" },
  { id: "a-13", patientName: "Nadine Riad", phone: "07700 900266", treatmentId: "hygiene", practitionerId: "p-lina", day: 4, slot: 9, notes: "Prefers afternoon slots.", status: "confirmed", source: "seed" },
  { id: "a-14", patientName: "Sherif Anwar", phone: "07700 900754", treatmentId: "filling", practitionerId: "p-omar", day: 4, slot: 11, notes: "Small cavity, upper left premolar.", status: "confirmed", source: "seed" },
  { id: "a-15", patientName: "Farida Osman", phone: "07700 900618", treatmentId: "hygiene", practitionerId: "p-nour", day: 0, slot: 3, notes: "Perio maintenance — three-month recall.", status: "confirmed", source: "seed" },
  { id: "a-16", patientName: "Adel Shawky", phone: "07700 900342", treatmentId: "filling", practitionerId: "p-lina", day: 1, slot: 10, notes: "Chipped incisor edge — composite repair.", status: "confirmed", source: "seed" },
  { id: "a-17", patientName: "Mona Ezzat", phone: "07700 900159", treatmentId: "checkup", practitionerId: "p-omar", day: 2, slot: 7, notes: "Denture check + soft tissue exam.", status: "confirmed", source: "seed" },
  { id: "a-18", patientName: "Yasmin Fawzy", phone: "07700 900873", treatmentId: "hygiene", practitionerId: "p-nour", day: 3, slot: 2, notes: "Stain removal — heavy tea drinker.", status: "confirmed", source: "seed" },
  { id: "a-19", patientName: "Ziad Selim", phone: "07700 900027", treatmentId: "emergency", practitionerId: "p-lina", day: 4, slot: 5, notes: "Lost filling — temp placed Monday, restore today.", status: "confirmed", source: "seed" },
];

export const SEED_PATIENTS: SeedPatient[] = [
  { id: "pt-01", name: "Marwa Adel", phone: "07700 900231", visits: 6, lastVisit: "12 Nov 2025" },
  { id: "pt-02", name: "Hassan Tarek", phone: "07700 900804", visits: 3, lastVisit: "28 Jan 2026" },
  { id: "pt-03", name: "Dalia Mansour", phone: "07700 900410", visits: 9, lastVisit: "4 Sep 2025" },
  { id: "pt-04", name: "Youssef Kamal", phone: "07700 900522", visits: 1, lastVisit: "First visit booked" },
  { id: "pt-05", name: "Salma Ibrahim", phone: "07700 900937", visits: 4, lastVisit: "19 Dec 2025" },
  { id: "pt-06", name: "Karim Fathy", phone: "07700 900290", visits: 7, lastVisit: "2 Feb 2026" },
  { id: "pt-07", name: "Laila Hosny", phone: "07700 900348", visits: 2, lastVisit: "15 Oct 2025" },
  { id: "pt-08", name: "Tamer Said", phone: "07700 900012", visits: 1, lastVisit: "Emergency intake" },
  { id: "pt-09", name: "Rana Sameh", phone: "07700 900475", visits: 5, lastVisit: "22 Jan 2026" },
  { id: "pt-10", name: "Mostafa Gad", phone: "07700 900807", visits: 8, lastVisit: "30 Aug 2025" },
  { id: "pt-11", name: "Farida Osman", phone: "07700 900618", visits: 11, lastVisit: "6 Feb 2026" },
  { id: "pt-12", name: "Adel Shawky", phone: "07700 900342", visits: 2, lastVisit: "17 Jul 2025" },
  { id: "pt-13", name: "Mona Ezzat", phone: "07700 900159", visits: 12, lastVisit: "9 Jan 2026" },
  { id: "pt-14", name: "Omar Hegazy", phone: "07700 900486", visits: 1, lastVisit: "23 May 2025" },
  { id: "pt-15", name: "Yasmin Fawzy", phone: "07700 900873", visits: 5, lastVisit: "11 Dec 2025" },
  { id: "pt-16", name: "Ziad Selim", phone: "07700 900027", visits: 3, lastVisit: "16 Feb 2026" },
];

/** Fictional practice contact details (demo data). */
export const CLINIC = {
  phone: "0123 456 7890",
  phoneHref: "tel:01234567890",
  email: "hello@brightsmile.example",
  address1: "12 Demo Lane",
  address2: "Maple Hollow (fictional), DM0 0DE",
  rating: "4.9",
  reviewCount: "210+",
};

export function getTreatment(id: string): Treatment {
  const t = TREATMENTS.find((x) => x.id === id);
  return t ?? TREATMENTS[0];
}

export function getPractitioner(id: string): Practitioner {
  const p = PRACTITIONERS.find((x) => x.id === id);
  return p ?? PRACTITIONERS[0];
}

export function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] ?? full;
}
