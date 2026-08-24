// FlowDesk demo data — all names, companies, and figures are fictional.

export type Stage = "new" | "contacted" | "meeting" | "proposal" | "won";
export type View = "pipeline" | "clients" | "automations" | "assistant";

export const DEMO_TODAY = "24 Aug 2026";

export const STAGES: { id: Stage; label: string }[] = [
  { id: "new", label: "New lead" },
  { id: "contacted", label: "Contacted" },
  { id: "meeting", label: "Meeting booked" },
  { id: "proposal", label: "Proposal sent" },
  { id: "won", label: "Won" },
];

export const STAGE_LABELS: Record<Stage, string> = {
  new: "New lead",
  contacted: "Contacted",
  meeting: "Meeting booked",
  proposal: "Proposal sent",
  won: "Won",
};

export type EntryKind = "call" | "email" | "note" | "stage" | "automation";

export interface TimelineEntry {
  id: string;
  kind: EntryKind;
  date: string;
  text: string;
}

export interface Client {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  value: number;
  owner: string; // account owner initials
  stage: Stage;
  timeline: TimelineEntry[]; // newest first
}

export function formatGBP(value: number): string {
  return "£" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const SEED_CLIENTS: Client[] = [
  {
    id: "c1",
    company: "Bramble & Birch Bakery",
    contactName: "Fern Callow",
    email: "fern@brambleandbirch.example",
    phone: "+44 7700 900101",
    value: 9800,
    owner: "PO",
    stage: "new",
    timeline: [
      { id: "c1-t2", kind: "email", date: "22 Aug 2026", text: "Enquiry received via website — looking for bookkeeping + quarterly VAT." },
      { id: "c1-t1", kind: "note", date: "22 Aug 2026", text: "Two-site bakery, ~14 staff. Currently on spreadsheets." },
    ],
  },
  {
    id: "c2",
    company: "Nordvik Logistics",
    contactName: "Sten Nordvik",
    email: "sten@nordviklogistics.example",
    phone: "+44 7700 900102",
    value: 24000,
    owner: "DH",
    stage: "new",
    timeline: [
      { id: "c2-t2", kind: "call", date: "21 Aug 2026", text: "Intro call missed — left voicemail, will retry Tuesday." },
      { id: "c2-t1", kind: "email", date: "20 Aug 2026", text: "Referred by Osprey Freight. Wants payroll for 40 drivers." },
    ],
  },
  {
    id: "c10",
    company: "Ashford & Byrne Architects",
    contactName: "Niamh Byrne",
    email: "niamh@ashfordbyrne.example",
    phone: "+353 1 555 0110",
    value: 16500,
    owner: "MK",
    stage: "new",
    timeline: [
      { id: "c10-t3", kind: "email", date: "23 Aug 2026", text: "Enquiry received via website — Dublin practice of 11, wants project-level profitability and cross-border VAT support." },
      { id: "c10-t2", kind: "note", date: "23 Aug 2026", text: "Studio is Dublin-based but runs two London projects — Irish/UK VAT split is the pain point." },
      { id: "c10-t1", kind: "note", date: "22 Aug 2026", text: "Downloaded the architecture-sector fee benchmarking guide from the resources page." },
    ],
  },
  {
    id: "c3",
    company: "Cobalt Ridge Dental",
    contactName: "Dr. Imani Okafor",
    email: "imani@cobaltridgedental.example",
    phone: "+44 7700 900103",
    value: 15500,
    owner: "MK",
    stage: "contacted",
    timeline: [
      { id: "c3-t3", kind: "email", date: "19 Aug 2026", text: "Sent service overview and pricing tiers PDF." },
      { id: "c3-t2", kind: "call", date: "18 Aug 2026", text: "15-min intro call. Practice expanding to a second chair; needs management accounts." },
      { id: "c3-t1", kind: "note", date: "15 Aug 2026", text: "Inbound from LinkedIn post about incorporation." },
    ],
  },
  {
    id: "c4",
    company: "Fenwick Print Co",
    contactName: "Arthur Fenwick",
    email: "arthur@fenwickprint.example",
    phone: "+44 7700 900104",
    value: 7200,
    owner: "PO",
    stage: "contacted",
    timeline: [
      { id: "c4-t2", kind: "call", date: "17 Aug 2026", text: "Spoke with Arthur — year-end is October, wants a quote before then." },
      { id: "c4-t1", kind: "email", date: "14 Aug 2026", text: "Cold outreach reply: interested in switching from current accountant." },
    ],
  },
  {
    id: "c11",
    company: "Calderbank Recruitment",
    contactName: "Jodie Calderbank",
    email: "jodie@calderbankrecruitment.example",
    phone: "+44 7700 900111",
    value: 11300,
    owner: "PO",
    stage: "contacted",
    timeline: [
      { id: "c11-t4", kind: "email", date: "18 Aug 2026", text: "Sent capability deck and contractor-payroll pricing. No reply yet." },
      { id: "c11-t3", kind: "call", date: "16 Aug 2026", text: "Spoke with Jodie — 9 consultants, contractor book growing fast; margin-only invoicing is confusing their books." },
      { id: "c11-t2", kind: "note", date: "14 Aug 2026", text: "Manchester agency, perm + contract desks. Currently with a high-street firm they've outgrown." },
      { id: "c11-t1", kind: "email", date: "13 Aug 2026", text: "Cold outreach — Manchester recruitment agencies, batch 2." },
    ],
  },
  {
    id: "c5",
    company: "Juniper Wellness Group",
    contactName: "Sana Malik",
    email: "sana@juniperwellness.example",
    phone: "+44 7700 900105",
    value: 31000,
    owner: "DH",
    stage: "meeting",
    timeline: [
      { id: "c5-t3", kind: "email", date: "20 Aug 2026", text: "Meeting confirmed for 27 Aug, 10:00 — agenda shared." },
      { id: "c5-t2", kind: "call", date: "18 Aug 2026", text: "Discovery call: 3 studios, mixed revenue streams, needs consolidated reporting." },
      { id: "c5-t1", kind: "note", date: "12 Aug 2026", text: "Warm intro from existing client Pillowtop Interiors." },
    ],
  },
  {
    id: "c6",
    company: "Osprey Freight",
    contactName: "Rhea Donnelly",
    email: "rhea@ospreyfreight.example",
    phone: "+44 7700 900106",
    value: 42500,
    owner: "MK",
    stage: "meeting",
    timeline: [
      { id: "c6-t3", kind: "note", date: "21 Aug 2026", text: "Prep: pull comparable freight-sector engagement letters before meeting." },
      { id: "c6-t2", kind: "email", date: "19 Aug 2026", text: "Rhea booked the 26 Aug slot via scheduling link." },
      { id: "c6-t1", kind: "call", date: "16 Aug 2026", text: "Qualifying call — group of 3 entities, audit threshold reached this year." },
    ],
  },
  {
    id: "c12",
    company: "Maaskade Logistics Consulting",
    contactName: "Elske Vandermeer",
    email: "elske@maaskadelogistics.example",
    phone: "+31 10 555 0112",
    value: 27500,
    owner: "DH",
    stage: "meeting",
    timeline: [
      { id: "c12-t4", kind: "email", date: "22 Aug 2026", text: "Meeting confirmed for 28 Aug, 14:00 CET (video) — agenda: UK subsidiary setup and UK/NL bookkeeping split." },
      { id: "c12-t3", kind: "call", date: "20 Aug 2026", text: "Discovery call — Rotterdam consultancy opening a UK entity for Channel-crossing clients." },
      { id: "c12-t2", kind: "email", date: "19 Aug 2026", text: "Elske replied to outreach; asked whether we handle Dutch BV + UK Ltd combinations." },
      { id: "c12-t1", kind: "note", date: "15 Aug 2026", text: "Referral from Osprey Freight's Rotterdam agent." },
    ],
  },
  {
    id: "c7",
    company: "Marlowe Yachts",
    contactName: "Casper Marlowe",
    email: "casper@marloweyachts.example",
    phone: "+44 7700 900107",
    value: 58000,
    owner: "DH",
    stage: "proposal",
    timeline: [
      { id: "c7-t4", kind: "email", date: "22 Aug 2026", text: "Proposal v2 sent — added R&D relief scoping as requested." },
      { id: "c7-t3", kind: "call", date: "20 Aug 2026", text: "Casper asked to include R&D claims for the new hull design work." },
      { id: "c7-t2", kind: "email", date: "15 Aug 2026", text: "Proposal v1 sent: full outsourced finance function." },
      { id: "c7-t1", kind: "note", date: "8 Aug 2026", text: "Largest opportunity this quarter. Board decision expected end of August." },
    ],
  },
  {
    id: "c8",
    company: "Tealeaf Ventures",
    contactName: "Lin Xiao",
    email: "lin@tealeafventures.example",
    phone: "+44 7700 900108",
    value: 12400,
    owner: "PO",
    stage: "proposal",
    timeline: [
      { id: "c8-t3", kind: "email", date: "21 Aug 2026", text: "Proposal sent — startup package with monthly management accounts." },
      { id: "c8-t2", kind: "call", date: "19 Aug 2026", text: "Lin raising a seed round; investors want clean historical accounts." },
      { id: "c8-t1", kind: "note", date: "13 Aug 2026", text: "Met at the Riverside founders breakfast." },
    ],
  },
  {
    id: "c9",
    company: "Pillowtop Interiors",
    contactName: "Greta Voss",
    email: "greta@pillowtopinteriors.example",
    phone: "+44 7700 900109",
    value: 19900,
    owner: "MK",
    stage: "won",
    timeline: [
      { id: "c9-t4", kind: "automation", date: "18 Aug 2026", text: "Automation: onboarding checklist started (engagement letter, AML checks, software access)." },
      { id: "c9-t3", kind: "stage", date: "18 Aug 2026", text: "Moved to stage: Won." },
      { id: "c9-t2", kind: "call", date: "17 Aug 2026", text: "Greta accepted the proposal on the phone. Start date 1 Sep." },
      { id: "c9-t1", kind: "email", date: "11 Aug 2026", text: "Proposal sent: bookkeeping, VAT, and year-end package." },
    ],
  },
  {
    id: "c13",
    company: "Meridian Dental Lab",
    contactName: "Leo Szabo",
    email: "leo@meridiandentallab.example",
    phone: "+44 7700 900113",
    value: 14200,
    owner: "MK",
    stage: "won",
    timeline: [
      { id: "c13-t5", kind: "automation", date: "20 Aug 2026", text: "Automation: onboarding checklist started (engagement letter, AML checks, software access)." },
      { id: "c13-t4", kind: "stage", date: "20 Aug 2026", text: "Moved to stage: Won." },
      { id: "c13-t3", kind: "email", date: "20 Aug 2026", text: "Leo signed the proposal — bookkeeping, VAT, and payroll for 8 technicians. Start date 1 Sep." },
      { id: "c13-t2", kind: "email", date: "12 Aug 2026", text: "Proposal sent: lab package with stock tracking and equipment depreciation schedules." },
      { id: "c13-t1", kind: "call", date: "6 Aug 2026", text: "Intro call — referred by Cobalt Ridge Dental; the lab supplies three practices across the West Midlands." },
    ],
  },
];

export interface AutomationRule {
  id: string;
  name: string;
  action: string;
  enabled: boolean;
  runs: number;
}

export const SEED_RULES: AutomationRule[] = [
  { id: "r1", name: "No reply in 5 days", action: "Send follow-up reminder to account owner", enabled: true, runs: 38 },
  { id: "r2", name: "Stage → Won", action: "Start client onboarding checklist", enabled: true, runs: 13 },
  { id: "r3", name: "Monthly documents due", action: "Request records from client via portal", enabled: true, runs: 91 },
  { id: "r4", name: "Proposal viewed 3×", action: "Alert account owner to call while interest is warm", enabled: false, runs: 9 },
  { id: "r5", name: "VAT deadline in 14 days", action: "Schedule reminder email to client", enabled: true, runs: 43 },
];

export interface QueuedAction {
  id: string;
  ruleId: string;
  clientId: string;
  label: string;
  due: string;
}

export const SEED_QUEUE: QueuedAction[] = [
  { id: "q1", ruleId: "r1", clientId: "c2", label: "Follow-up reminder — Nordvik Logistics (no reply since 21 Aug)", due: "26 Aug 2026" },
  { id: "q2", ruleId: "r3", clientId: "c9", label: "Request August records — Pillowtop Interiors", due: "28 Aug 2026" },
  { id: "q3", ruleId: "r5", clientId: "c4", label: "VAT deadline reminder — Fenwick Print Co (period ends 31 Aug)", due: "27 Aug 2026" },
  { id: "q4", ruleId: "r1", clientId: "c3", label: "Follow-up reminder — Cobalt Ridge Dental (pricing sent 19 Aug)", due: "25 Aug 2026" },
  { id: "q5", ruleId: "r1", clientId: "c11", label: "Follow-up reminder — Calderbank Recruitment (deck sent 18 Aug, no reply)", due: "25 Aug 2026" },
  { id: "q6", ruleId: "r2", clientId: "c13", label: "Send onboarding pack — Meridian Dental Lab", due: "26 Aug 2026" },
  { id: "q7", ruleId: "r3", clientId: "c13", label: "Request August records — Meridian Dental Lab", due: "29 Aug 2026" },
];

export interface AiScript {
  summary: string;
  email: string;
}

export const AI_SCRIPTS: Record<string, AiScript> = {
  c7: {
    summary:
      "Marlowe Yachts is your highest-value open opportunity (£58,000, owner DH), currently at Proposal sent. Momentum is good: after the 20 Aug call, Casper asked for R&D relief scoping to cover the new hull design work, and proposal v2 went out on 22 Aug. The board decides by end of August, so the next 7 days are decisive. Risk: no confirmation yet that v2 reached the full board. Suggested next step: a short call with Casper before 27 Aug to walk the board pack through the R&D section.",
    email:
      "Subject: R&D relief scoping — ahead of your board meeting\n\nHi Casper,\n\nThanks again for the steer on the hull design programme — the revised proposal now includes a scoped R&D relief claim alongside the outsourced finance function.\n\nAs the board decision is expected before the end of August, would a 20-minute call this week help? I can walk you through the R&D section so you can present it with confidence.\n\nI have Thursday 10:00 or Friday 14:30 free — happy to work around you.\n\nBest regards,\nDana Hartwell\nHartwell & Co",
  },
  c6: {
    summary:
      "Osprey Freight (£42,500, owner MK) is at Meeting booked, with a strong qualifying signal: the group of three entities has crossed the audit threshold this year, which makes this a compliance-driven, time-sensitive purchase. Rhea self-booked the 26 Aug slot, and prep notes flag pulling comparable freight-sector engagement letters. They also referred Nordvik Logistics to you — a warm relationship. Suggested next step: confirm the 26 Aug agenda today and bring an audit-readiness checklist to anchor the conversation.",
    email:
      "Subject: Tuesday’s meeting — quick agenda\n\nHi Rhea,\n\nLooking forward to Tuesday at the time you booked. To make the most of it, I suggest we cover:\n\n1. Audit readiness for the three entities now that the threshold has been reached\n2. Group structure and where consolidation could simplify reporting\n3. Timeline and fees\n\nIf anything else is on your mind, reply and I’ll add it. Thanks also for pointing Sten at Nordvik our way — much appreciated.\n\nBest,\nMarcus Kim\nHartwell & Co",
  },
  c1: {
    summary:
      "Bramble & Birch Bakery (£9,800, owner PO) is a fresh inbound lead from 22 Aug: a two-site bakery with roughly 14 staff, still running on spreadsheets, asking for bookkeeping plus quarterly VAT. Small ticket but low friction — this profile typically closes in one call with the starter package. No contact has been made yet, so speed matters: inbound leads answered within 24 hours convert far better. Suggested next step: call Fern today and offer the fixed-fee starter tier.",
    email:
      "Subject: Your bookkeeping enquiry — Hartwell & Co\n\nHi Fern,\n\nThanks for getting in touch through our website. For a two-site bakery moving off spreadsheets, our fixed-fee starter package usually fits well: monthly bookkeeping, quarterly VAT returns, and a simple monthly summary of how each site is doing.\n\nWould a 15-minute call this week suit? I can confirm the exact fee on the call — no surprises, no lock-in.\n\nKind regards,\nPriya Oduya\nHartwell & Co",
  },
  c5: {
    summary:
      "Juniper Wellness Group (£31,000, owner DH) is at Meeting booked for 27 Aug at 10:00, with the agenda already shared. Discovery on 18 Aug surfaced the core need: three studios with mixed revenue streams and no consolidated reporting. This came via a warm intro from existing client Pillowtop Interiors, so trust is pre-built. Suggested next step: prepare a one-page mock of a consolidated three-studio dashboard to show in the meeting — concrete visuals close multi-entity deals.",
    email:
      "Subject: Ahead of the 27th — a preview for you\n\nHi Sana,\n\nAhead of our meeting on the 27th, I’ve put together a one-page example of how consolidated reporting could look across your three studios — revenue by studio and by stream, on one view.\n\nI’ll bring it Wednesday, but wanted you to know it’s coming. Greta at Pillowtop mentioned you like to see things concretely, so we made it concrete.\n\nSee you at 10:00.\n\nBest regards,\nDana Hartwell\nHartwell & Co",
  },
  c11: {
    summary:
      "Calderbank Recruitment (£11,300, owner PO) is at Contacted and cooling: the capability deck and contractor-payroll pricing went out on 18 Aug with no reply since, and the ‘No reply in 5 days’ rule has already queued a follow-up for 25 Aug. The 16 Aug call surfaced the real hook — nine consultants, a fast-growing contractor book, and margin-only invoicing confusing their books. Suggested next step: skip the generic nudge and call Jodie with one worked example of contractor-margin bookkeeping done properly.",
    email:
      "Subject: Contractor margins — one worked example\n\nHi Jodie,\n\nWhen we spoke you mentioned margin-only invoicing was making the contractor book hard to read. Rather than resend the deck, I’ve put together a one-page worked example showing how we’d post a typical contractor placement — margin, payroll, and VAT all reconciled.\n\nWorth 10 minutes this week? Tuesday or Wednesday afternoon both work on my side.\n\nKind regards,\nPriya Oduya\nHartwell & Co",
  },
  c12: {
    summary:
      "Maaskade Logistics Consulting (£27,500, owner DH) is at Meeting booked for 28 Aug at 14:00 CET, with the agenda already framed around their UK subsidiary. Discovery on 20 Aug confirmed the shape: a Rotterdam consultancy opening a UK entity for Channel-crossing clients, needing a clean UK/NL bookkeeping split across a Dutch BV and a UK Ltd. The lead came via Osprey Freight’s Rotterdam agent, so freight-sector credibility carries over. Suggested next step: bring a one-page UK-entity setup roadmap (incorporation, VAT registration, payroll) so the first meeting feels like the first week of the engagement.",
    email:
      "Subject: Friday’s call — UK subsidiary roadmap\n\nHi Elske,\n\nLooking forward to Friday at 14:00 CET. Ahead of it, I’ve sketched a short roadmap for the UK entity: incorporation and registered office, UK VAT registration, and how we’d keep the UK books clean alongside the BV from day one.\n\nI’ll walk through it on the call, but happy to send it ahead if useful. If anything else should be on the agenda, just reply and I’ll add it.\n\nBest regards,\nDana Hartwell\nHartwell & Co",
  },
};

export function fallbackScript(client: Client): AiScript {
  return {
    summary:
      client.company +
      " (" +
      formatGBP(client.value) +
      ", owner " +
      client.owner +
      ") is currently at " +
      STAGE_LABELS[client.stage] +
      ". The timeline shows " +
      client.timeline.length +
      " logged interactions, most recently on " +
      (client.timeline[0]?.date ?? DEMO_TODAY) +
      ". Suggested next step: review the latest entry and schedule a touchpoint with " +
      client.contactName +
      " this week to keep momentum.",
    email:
      "Subject: Quick check-in — " +
      client.company +
      "\n\nHi " +
      client.contactName.split(" ")[0] +
      ",\n\nJust a quick note to keep things moving on our side. Following our recent contact, is there anything you need from us to take the next step?\n\nHappy to jump on a short call this week if useful.\n\nBest regards,\nHartwell & Co",
  };
}
