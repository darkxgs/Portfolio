"use client";

import { useState } from "react";
import type { TreatmentIcon } from "./data";
import { CLINIC, PRACTITIONERS, WEBSITE_TREATMENTS, getTreatment } from "./data";
import {
  AlignerIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  HeartIcon,
  MailIcon,
  MedCrossIcon,
  PhoneIcon,
  PinIcon,
  ScanIcon,
  ShieldCheckIcon,
  SmileIcon,
  SparkleIcon,
  StarIcon,
  StarRow,
  ToothIcon,
  TreatmentGlyph,
} from "./icons";
import { MotionRoot, revealDelay, useHeroParallax } from "./motion";

export interface BookPreselect {
  treatmentId?: string;
  practitionerId?: string;
}

interface WebsiteProps {
  onBook: (preselect?: BookPreselect) => void;
  onToast: (message: string) => void;
}

/* ---------- Small shared pieces ---------- */

function Kicker({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-care-600">{children}</p>
  );
}

const COMFORT_VALUES: { title: string; body: string; icon: "calendar" | "smile" | "clock" }[] = [
  {
    title: "Easy",
    body: "Book online in under a minute, with a reminder text the day before so nothing slips.",
    icon: "calendar",
  },
  {
    title: "Relaxing",
    body: "A quiet, judgement-free clinic. Music, blankets, and breaks whenever you want one.",
    icon: "smile",
  },
  {
    title: "At your pace",
    body: "Every option and price explained first — nothing happens until you say you're ready.",
    icon: "clock",
  },
];

const JOURNEY_STEPS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Consultation",
    body: "Meet your dentist, tell us what you'd like to change, and get a full picture of your oral health.",
  },
  {
    num: "02",
    title: "Your plan",
    body: "A written plan with fixed prices and options for every budget — take it home, zero pressure.",
  },
  {
    num: "03",
    title: "Treatment",
    body: "Relaxed appointments at your pace, with check-ins along the way and aftercare included.",
  },
];

interface FeeRow {
  name: string;
  price: string;
}

const FEE_GROUPS: { category: string; rows: FeeRow[] }[] = [
  {
    category: "General dentistry",
    rows: [
      { name: "Check-up & exam", price: "£55" },
      { name: "Hygiene clean", price: "£75" },
      { name: "White fillings", price: "from £120" },
      { name: "Emergency care", price: "from £95" },
    ],
  },
  {
    category: "Cosmetic",
    rows: [
      { name: "Teeth whitening", price: "from £220" },
      { name: "Veneers", price: "from £450 / tooth" },
    ],
  },
  {
    category: "Straightening & implants",
    rows: [
      { name: "Clear aligners", price: "from £1,850" },
      { name: "Dental implants", price: "from £2,300" },
      { name: "Consultations", price: "from £65" },
    ],
  },
];

const REVIEWS: { name: string; tag: string; text: string }[] = [
  {
    name: "Sarah K.",
    tag: "Nervous patient · Check-up",
    text: "I hadn't seen a dentist in six years and was dreading it. Dr. Farouk talked me through every step and let me pause whenever I needed to. Two visits in and it finally feels manageable.",
  },
  {
    name: "James W.",
    tag: "Hygiene clean",
    text: "Nour is brilliant — my teeth have never felt this clean, and she showed me exactly where I was missing with the brush. Booked my next visit before I'd left the building.",
  },
  {
    name: "Priya M.",
    tag: "Teeth whitening",
    text: "Had whitening three weeks before my wedding. Clear pricing up front, zero sensitivity afterwards, and the photos speak for themselves.",
  },
  {
    name: "Tom H.",
    tag: "Emergency care",
    text: "Cracked a molar on a Sunday, called at 8:30 Monday and was in the chair by 11. Dr. Nassar fixed it the same day. Can't ask for more than that.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "I'm nervous about the dentist. What can you do?",
    a: "A lot, and it's the thing we care most about. We book longer appointments so nothing is rushed, explain everything before we touch anything, and agree a stop signal — raise a hand and we pause, every time. You're also welcome to book a first visit that's just a chat and a look around, with no treatment at all.",
  },
  {
    q: "I'm in pain — can you see me today?",
    a: "We keep same-day emergency slots free every weekday morning. Call before 10:00 and we'll aim to see you the same day. An emergency assessment is from £95 including an X-ray, and we'll always relieve pain first and plan the rest afterwards.",
  },
  {
    q: "How can I pay?",
    a: "Card, contactless and bank transfer at the desk — you'll always know the price before treatment starts. Larger treatments can be spread over monthly payments, and BrightSmile Plan members get 10% off all treatment fees.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Life happens — just give us 24 hours' notice and there's no charge, ever. Missed appointments or very late cancellations may incur a fee of half the appointment price, because that slot could have gone to someone in pain.",
  },
  {
    q: "Where can I park? How do I get to you?",
    a: "There's on-street parking along Demo Lane and a pay-and-display car park two minutes' walk away. If you're coming by bus, routes 12 and 47 both stop at the end of the road.",
  },
  {
    q: "Are you an NHS or private practice?",
    a: "We're a private practice, which is how we keep appointments long and prices fixed. Our membership plan (£14.50/month) keeps routine care predictable, and every fee is published on this page — no surprises.",
  },
];

/* ---------- The website ---------- */

const TRUST_ITEMS = [
  "Same-day emergency slots",
  "GDC registered clinicians",
  "0% finance available",
  "Nervous patients welcome",
];

export default function Website({ onBook, onToast }: WebsiteProps) {
  const [openTreatment, setOpenTreatment] = useState<string | null>(WEBSITE_TREATMENTS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroImageRef = useHeroParallax<HTMLImageElement>();

  return (
    <MotionRoot className="bg-mist-50">
      {/* ============ HERO ============ */}
      <section id="top" className="relative isolate overflow-hidden">
        <img
          ref={heroImageRef}
          src="/clinic/hero.jpg"
          alt="A bright, calm treatment room at BrightSmile Dental"
          className="bs-parallax absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mist-50 via-mist-50/85 to-mist-50/20" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-mist-50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="max-w-xl" data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint-500/40 bg-mint-100 px-3.5 py-1.5 text-xs font-semibold text-mint-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-mint-500" />
              Accepting new patients
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-mist-900 sm:text-4xl lg:text-5xl">
              Dentistry that feels calm, honest and unhurried.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-mist-700 sm:text-lg">
              BrightSmile is a modern practice in Maple Hollow for check-ups, cosmetic work and
              same-day emergencies — with every price agreed before you sit down.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-mist-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
              <span className="star-pop inline-flex">
                <StarRow className="h-4 w-4" />
              </span>
              <p className="text-sm text-mist-800">
                <span className="font-bold text-mist-900">{CLINIC.rating}</span> from{" "}
                <span className="font-semibold">{CLINIC.reviewCount} reviews</span>
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onBook()}
                className="bs-lift rounded-xl bg-care-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-care-700"
              >
                Book online — it takes a minute
              </button>
              <a
                href={CLINIC.phoneHref}
                className="bs-lift flex items-center justify-center gap-2 rounded-xl border border-mist-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-mist-900 backdrop-blur transition-colors hover:border-care-400 hover:text-care-700"
              >
                <PhoneIcon className="h-4 w-4" />
                Call {CLINIC.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP (marquee ticker) ============ */}
      <div className="bs-marquee bg-care-800" aria-label="Practice highlights">
        <div className="bs-marquee-track py-3.5">
          {/* Six identical segments — two halves of three — so the -50%
              keyframe loop wraps seamlessly. Only the first is read aloud;
              under reduced motion the copies are hidden and the strip is
              static and centred. */}
          {[0, 1, 2, 3, 4, 5].map((seg) => (
            <div
              key={seg}
              aria-hidden={seg > 0 ? true : undefined}
              className={`flex items-center ${seg > 0 ? "bs-marquee-copy" : ""}`}
            >
              {TRUST_ITEMS.map((item, i) => (
                <span
                  key={item}
                  className="flex items-center whitespace-nowrap text-xs font-medium tracking-wide text-care-100"
                >
                  <span className="px-5 text-care-400 sm:px-7" aria-hidden="true">
                    {i % 2 === 0 ? (
                      <ToothIcon className="h-3.5 w-3.5" />
                    ) : (
                      <StarIcon className="h-3 w-3" />
                    )}
                  </span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ VALUE STRIP ============ */}
      <section className="border-b border-mist-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 sm:py-14">
          {COMFORT_VALUES.map((v, i) => (
            <div key={v.title} className="flex items-start gap-4" data-reveal style={revealDelay(i, 90)}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-care-200 bg-care-50 text-care-600">
                {v.icon === "calendar" && <CalendarIcon className="h-5 w-5" />}
                {v.icon === "smile" && <SmileIcon className="h-5 w-5" />}
                {v.icon === "clock" && <ClockIcon className="h-5 w-5" />}
              </span>
              <div>
                <h3 className="text-base font-semibold text-mist-900">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-mist-600">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ COMFORT / NERVOUS PATIENTS ============ */}
      <section className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative overflow-hidden rounded-3xl border border-mist-200 shadow-sm" data-reveal>
            <img
              src="/clinic/consult.jpg"
              alt="A dentist talking a patient through their treatment plan"
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
          <div data-reveal style={revealDelay(1, 120)}>
            <Kicker>Nervous patients welcome</Kicker>
            <h2 className="mt-3 text-2xl font-bold text-mist-900 sm:text-3xl">
              Every visit is designed to feel comfortable, clear and never rushed.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mist-600 sm:text-base">
              Plenty of our patients hadn&apos;t seen a dentist in years before they found us. We
              build extra time into every appointment, explain things in plain English, and never
              start anything without your say-so.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Longer appointments, so nothing ever feels hurried",
                "Plain-English explanations — no jargon, no pressure",
                "A stop signal: raise a hand and we pause, every time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-mist-800">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onBook({ treatmentId: "checkup" })}
              className="bs-lift mt-7 inline-flex items-center gap-2 rounded-xl border border-care-300 bg-care-50 px-5 py-3 text-sm font-semibold text-care-700 transition-colors hover:bg-care-100"
            >
              <HeartIcon className="h-4 w-4" />
              Book a gentle first visit
            </button>
          </div>
        </div>
      </section>

      {/* ============ TREATMENTS ============ */}
      <section id="treatments" className="scroll-mt-28 border-y border-mist-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>Treatments & prices</Kicker>
            <h2 className="mt-3 text-2xl font-bold text-mist-900 sm:text-3xl">
              Everything your smile needs
            </h2>
            <p className="mt-3 text-sm text-mist-600 sm:text-base">
              Tap a treatment to see exactly what&apos;s included. Prices are fixed and agreed
              before any treatment starts.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {WEBSITE_TREATMENTS.map((t, ti) => {
              const open = openTreatment === t.id;
              return (
                <div
                  key={t.id}
                  data-reveal
                  style={revealDelay(ti % 2, 90)}
                  className={`self-start rounded-2xl border transition-colors ${
                    open ? "border-care-300 bg-care-50" : "border-mist-200 bg-mist-50 hover:border-mist-400"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenTreatment(open ? null : t.id)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                        open ? "border-care-300 bg-white text-care-700" : "border-mist-200 bg-white text-care-600"
                      }`}
                    >
                      <TreatmentGlyph icon={getSiteIcon(t.wizardId)} className="h-5.5 w-5.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-mist-900 sm:text-base">{t.name}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-mist-600 sm:text-sm">{t.benefit}</span>
                    </span>
                    <span className="hidden shrink-0 text-right sm:block">
                      <span className="block text-sm font-bold text-care-700">{t.priceLabel}</span>
                      <span className="block text-xs font-mono text-mist-500">{t.duration}</span>
                    </span>
                    <ChevronDownIcon
                      className={`h-4 w-4 shrink-0 text-mist-500 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div className={`bs-acc ${open ? "bs-acc-open" : ""}`} inert={!open}>
                    <div className="bs-acc-inner">
                      <div className="border-t border-care-200 px-4 pb-5 pt-4 sm:px-5">
                        <p className="text-sm font-semibold text-mist-800 sm:hidden">
                          {t.priceLabel} · <span className="font-mono font-normal text-mist-600">{t.duration}</span>
                        </p>
                        <ul className="mt-2 grid grid-cols-1 gap-2 sm:mt-0 sm:grid-cols-2">
                          {t.includes.map((inc) => (
                            <li key={inc} className="flex items-start gap-2 text-sm text-mist-800">
                              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600">
                                <CheckIcon className="h-2.5 w-2.5" />
                              </span>
                              {inc}
                            </li>
                          ))}
                        </ul>
                        {t.note && <p className="mt-3 text-xs italic text-mist-600">{t.note}</p>}
                        <button
                          type="button"
                          onClick={() => onBook({ treatmentId: t.wizardId })}
                          className="bs-lift mt-4 rounded-lg bg-care-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-care-700"
                        >
                          Book this online
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SMILE JOURNEY ============ */}
      <section className="bg-care-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-care-300">How it works</p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Your smile journey, in three steps
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {JOURNEY_STEPS.map((s, i) => (
              <div
                key={s.num}
                data-reveal
                style={revealDelay(i, 90)}
                className="bs-lift rounded-2xl border border-care-700 bg-care-800/60 p-6"
              >
                <p className="font-mono text-3xl font-bold text-care-300">{s.num}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-care-100">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onBook({ treatmentId: "checkup" })}
              className="bs-lift rounded-xl bg-white px-6 py-3 text-sm font-semibold text-care-800 transition-colors hover:bg-care-100"
            >
              Start with a consultation
            </button>
          </div>
        </div>
      </section>

      {/* ============ FEES & PLAN ============ */}
      <section id="fees" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <Kicker>Fees & membership</Kicker>
          <h2 className="mt-3 text-2xl font-bold text-mist-900 sm:text-3xl">
            Honest prices, published in full
          </h2>
          <p className="mt-3 text-sm text-mist-600 sm:text-base">
            No surprises at the desk — what you see here is what you pay.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Fee table */}
          <div className="overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-sm" data-reveal>
            <table className="w-full text-left text-sm">
              <tbody>
                {FEE_GROUPS.map((group) => (
                  <FeeGroupRows key={group.category} group={group} />
                ))}
              </tbody>
            </table>
            <p className="border-t border-mist-200 bg-mist-50 px-4 py-3 text-xs leading-relaxed text-mist-600 sm:px-5">
              Spread the cost — larger treatments can be split into monthly payments, with 0%
              options on many plans. Ask at your consultation.
            </p>
          </div>

          {/* Membership card */}
          <div
            data-reveal
            style={revealDelay(1, 120)}
            className="bs-lift flex flex-col rounded-2xl bg-gradient-to-br from-care-700 to-care-900 p-6 text-white shadow-sm sm:p-7"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-care-100">
                <ToothIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">The BrightSmile Plan</p>
                <p className="text-[11px] text-care-200">Routine care, sorted</p>
              </div>
            </div>
            <p className="mt-5">
              <span className="text-3xl font-bold">£14.50</span>
              <span className="text-sm text-care-200"> / month</span>
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "2 check-up exams a year",
                "2 hygiene visits a year",
                "10% off all treatment fees",
                "Priority same-day emergency slots",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-care-50">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <CheckIcon className="h-2.5 w-2.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onToast("Demo only — plan sign-up is simulated. In the live product this would start a direct-debit flow.")}
              className="bs-lift mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-care-800 transition-colors hover:bg-care-100"
            >
              Join the plan
            </button>
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section id="team" className="scroll-mt-28 border-y border-mist-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>Meet the team</Kicker>
            <h2 className="mt-3 text-2xl font-bold text-mist-900 sm:text-3xl">
              Familiar faces, every visit
            </h2>
            <p className="mt-3 text-sm text-mist-600 sm:text-base">
              You&apos;ll see the same clinician each time, so nobody has to re-tell their story.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {PRACTITIONERS.map((p, i) => (
              <div
                key={p.id}
                data-reveal
                style={revealDelay(i, 90)}
                className="bs-lift flex flex-col rounded-2xl border border-mist-200 bg-mist-50 p-6"
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-xl font-bold ${p.color.avatar}`}
                >
                  {p.initials}
                </span>
                <h3 className="mt-4 text-base font-semibold text-mist-900">{p.name}</h3>
                <p className="text-sm text-mist-600">{p.role}</p>
                <p className="mt-1 text-xs font-medium text-care-700">{p.credential}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist-600">{p.bio}</p>
                <button
                  type="button"
                  onClick={() => onBook({ practitionerId: p.id })}
                  className="bs-lift mt-5 rounded-lg border border-care-300 bg-white px-4 py-2.5 text-sm font-semibold text-care-700 transition-colors hover:bg-care-50"
                >
                  Book with {p.name.replace(/^Dr\.\s/, "Dr. ")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section id="reviews" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Kicker>Patient reviews</Kicker>
            <div className="mt-4 rounded-2xl border border-mist-200 bg-white p-6 shadow-sm" data-reveal>
              <p className="text-5xl font-bold text-mist-900">{CLINIC.rating}</p>
              <div className="mt-2">
                <span className="star-pop inline-flex">
                  <StarRow className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-2 text-sm text-mist-600">
                from <span className="font-semibold text-mist-800">{CLINIC.reviewCount} reviews</span>
              </p>
              <p className="mt-3 text-[11px] text-mist-500">Fictional demo reviews — see footer.</p>
              <button
                type="button"
                onClick={() => onBook()}
                className="bs-lift mt-5 w-full rounded-lg bg-care-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-care-700"
              >
                Join them — book online
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <figure
                key={r.name}
                data-reveal
                style={revealDelay(i % 2, 90)}
                className="bs-lift flex flex-col rounded-2xl border border-mist-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <StarRow className="h-3.5 w-3.5" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-mist-800">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-mist-100 pt-3">
                  <span className="text-sm font-semibold text-mist-900">{r.name}</span>
                  <span className="text-xs text-mist-500">{r.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DIAGNOSTICS ============ */}
      <section className="border-y border-mist-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-2 lg:order-1" data-reveal style={revealDelay(1, 120)}>
              <Kicker>Modern diagnostics</Kicker>
              <h2 className="mt-3 text-2xl font-bold text-mist-900 sm:text-3xl">See what we see</h2>
              <p className="mt-4 text-sm leading-relaxed text-mist-600 sm:text-base">
                Digital X-rays with a fraction of the radiation of film, and intraoral scans
                instead of uncomfortable moulds. Everything appears on the screen beside your
                chair, so you can see the problem — and the fix — before agreeing to anything.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-mist-200 bg-mist-50 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-care-200 bg-white text-care-600">
                    <ScanIcon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-mist-900">Digital X-rays</p>
                    <p className="mt-0.5 text-xs text-mist-600">Instant, low-dose imaging</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-mist-200 bg-mist-50 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-care-200 bg-white text-care-600">
                    <AlignerIcon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-mist-900">Intraoral scanning</p>
                    <p className="mt-0.5 text-xs text-mist-600">3D scans, no gag-inducing moulds</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 overflow-hidden rounded-3xl border border-mist-200 shadow-sm lg:order-2" data-reveal>
              <img
                src="/clinic/xray.jpg"
                alt="A clinician reviewing a digital dental X-ray"
                className="h-72 w-full object-cover sm:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center" data-reveal>
          <Kicker>Questions?</Kicker>
          <h2 className="mt-3 text-2xl font-bold text-mist-900 sm:text-3xl">
            The things people ask before they book
          </h2>
        </div>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={f.q}
                data-reveal
                style={revealDelay(Math.min(i, 3), 70)}
                className={`rounded-2xl border transition-colors ${
                  open ? "border-care-300 bg-white shadow-sm" : "border-mist-200 bg-white hover:border-mist-400"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-mist-900 sm:text-base">{f.q}</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 shrink-0 text-mist-500 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`bs-acc ${open ? "bs-acc-open" : ""}`} inert={!open}>
                  <div className="bs-acc-inner">
                    <p className="border-t border-mist-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-mist-600">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ VISIT US ============ */}
      <section id="visit" className="scroll-mt-28 border-t border-mist-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Kicker>Visit us</Kicker>
            <h2 className="mt-3 text-2xl font-bold text-mist-900 sm:text-3xl">
              Easy to find, easy to reach
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Hours */}
            <div className="bs-lift rounded-2xl border border-mist-200 bg-mist-50 p-6" data-reveal>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-care-200 bg-white text-care-600">
                <ClockIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-mist-900">Opening hours</h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-mist-600">Mon – Fri</dt>
                  <dd className="font-mono text-mist-900">8:30 – 17:30</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-mist-600">Saturday</dt>
                  <dd className="font-mono text-mist-900">9:00 – 13:00</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-mist-600">Sunday</dt>
                  <dd className="font-mono text-mist-500">Closed</dd>
                </div>
              </dl>
              <p className="mt-3 flex items-start gap-2 text-xs text-mist-600">
                <MedCrossIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-care-600" />
                Same-day emergency slots held every weekday morning.
              </p>
            </div>

            {/* Find us */}
            <div className="bs-lift rounded-2xl border border-mist-200 bg-mist-50 p-6" data-reveal style={revealDelay(1, 90)}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-care-200 bg-white text-care-600">
                <PinIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-mist-900">Find us</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-800">
                {CLINIC.address1}
                <br />
                {CLINIC.address2}
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-mist-600">
                <li>On-street parking along Demo Lane</li>
                <li>Pay-and-display car park 2 min walk</li>
                <li>Buses 12 &amp; 47 stop at the end of the road</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bs-lift rounded-2xl border border-mist-200 bg-mist-50 p-6" data-reveal style={revealDelay(2, 90)}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-care-200 bg-white text-care-600">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-mist-900">Get in touch</h3>
              <div className="mt-3 space-y-2.5">
                <a
                  href={CLINIC.phoneHref}
                  className="flex items-center gap-2.5 text-sm font-medium text-mist-900 transition-colors hover:text-care-700"
                >
                  <PhoneIcon className="h-4 w-4 text-care-600" />
                  {CLINIC.phone}
                </a>
                <a
                  href={`mailto:${CLINIC.email}`}
                  className="flex items-center gap-2.5 break-all text-sm font-medium text-mist-900 transition-colors hover:text-care-700"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-care-600" />
                  {CLINIC.email}
                </a>
                <button
                  type="button"
                  onClick={() => onToast("Demo only — WhatsApp chat is simulated in this demo.")}
                  className="flex items-center gap-2.5 rounded-full border border-mint-500/40 bg-mint-100 px-3.5 py-2 text-sm font-medium text-mint-700 transition-colors hover:bg-mint-100/70"
                >
                  <ChatIcon className="h-4 w-4" />
                  Message us on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-care-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16" data-reveal>
          <SparkleIcon className="h-7 w-7 text-care-200" />
          <h2 className="max-w-xl text-2xl font-bold text-white sm:text-3xl">
            Ready for a visit that doesn&apos;t feel like a chore?
          </h2>
          <p className="max-w-md text-sm text-care-100 sm:text-base">
            Online booking takes under a minute — or call and we&apos;ll find a time together.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onBook()}
              className="bs-lift rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-care-800 transition-colors hover:bg-care-100"
            >
              Book online
            </button>
            <a
              href={CLINIC.phoneHref}
              className="bs-lift flex items-center justify-center gap-2 rounded-xl border border-care-400 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-care-600"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {CLINIC.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-mist-900">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-care-700 text-care-100">
                  <ToothIcon className="h-5 w-5" />
                </span>
                <p className="text-base font-semibold text-white">BrightSmile Dental</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-mist-400">
                {CLINIC.address1}
                <br />
                {CLINIC.address2}
              </p>
              <p className="mt-3 text-sm text-mist-400">
                {CLINIC.phone}
                <br />
                {CLINIC.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-mist-500">Quick links</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "Treatments", id: "treatments" },
                  { label: "Fees & membership", id: "fees" },
                  { label: "Meet the team", id: "team" },
                  { label: "Reviews", id: "reviews" },
                  { label: "FAQ", id: "faq" },
                  { label: "Visit us", id: "visit" },
                ].map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                      className="text-sm text-mist-300 transition-colors hover:text-white"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-mist-500">Opening hours</p>
              <ul className="mt-4 space-y-2.5 text-sm text-mist-300">
                <li className="flex justify-between gap-4">
                  <span>Mon – Fri</span>
                  <span className="font-mono">8:30 – 17:30</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Saturday</span>
                  <span className="font-mono">9:00 – 13:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sunday</span>
                  <span className="font-mono text-mist-500">Closed</span>
                </li>
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs text-mist-400">
                <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-care-400" />
                GDC registered clinicians
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-mist-500">About this demo</p>
              <p className="mt-4 text-xs leading-relaxed text-mist-400">
                BrightSmile Dental is a fictional practice built as a portfolio demo. All data on
                this page — names, reviews, ratings, prices and contact details — is fictional
                demo content.
              </p>
              <button
                type="button"
                onClick={() => onBook()}
                className="bs-lift mt-5 rounded-lg bg-care-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-care-500"
              >
                Try the booking flow
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-mist-800 pt-6 sm:flex-row">
            <p className="text-xs text-mist-500">© 2026 BrightSmile Dental — a fictional demo practice.</p>
            <p className="text-xs text-mist-500">Made with care in Maple Hollow (which doesn&apos;t exist).</p>
          </div>
        </div>
      </footer>
    </MotionRoot>
  );
}

/* ---------- helpers ---------- */

function getSiteIcon(wizardId: string): TreatmentIcon {
  return getTreatment(wizardId).icon;
}

function FeeGroupRows({ group }: { group: { category: string; rows: FeeRow[] } }) {
  return (
    <>
      <tr className="border-t border-mist-200 first:border-t-0">
        <th
          colSpan={2}
          className="bg-mist-100 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-mist-600 sm:px-5"
        >
          {group.category}
        </th>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.name} className="border-t border-mist-100">
          <td className="px-4 py-3 text-mist-800 sm:px-5">{row.name}</td>
          <td className="px-4 py-3 text-right font-semibold text-care-700 sm:px-5">{row.price}</td>
        </tr>
      ))}
    </>
  );
}
