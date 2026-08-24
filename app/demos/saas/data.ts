// Seeded fictional data for the Metricly demo (analytics + billing for "Inkflow").
// All names, numbers, and dates are fictional and deterministic.

export type ViewKey = "dashboard" | "users" | "billing" | "health";

export interface MonthPoint {
  month: string;
  mrr: number;
}

export interface StatTile {
  label: string;
  value: string;
  delta: string;
  good: boolean;
  hint: string;
}

export interface FunnelStage {
  label: string;
  count: number;
}

export interface Cohort {
  label: string;
  size: number;
  /** retention % per week, index 0 = week 0 (always 100) */
  weeks: number[];
}

export type UserRole = "Admin" | "Editor" | "Viewer";
export type UserStatus = "Active" | "Pending" | "Suspended";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive: string;
  status: UserStatus;
}

export type PlanId = "starter" | "growth" | "scale";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  seats: string;
  docs: string;
  tagline: string;
}

export type InvoiceStatus = "Paid" | "Due";

export interface Invoice {
  number: string;
  date: string;
  amount: number;
  period: string;
  status: InvoiceStatus;
}

export type HealthLevel = "Healthy" | "Watch" | "At risk";

export interface CustomerAccount {
  id: string;
  name: string;
  plan: string;
  seats: number;
  trend: number[];
  health: HealthLevel;
  riskScore: number;
  renewal: string;
  mrr: number;
  suggestion: string | null;
}

export const MRR_SERIES: MonthPoint[] = [
  { month: "Sep '25", mrr: 14200 },
  { month: "Oct '25", mrr: 15100 },
  { month: "Nov '25", mrr: 15800 },
  { month: "Dec '25", mrr: 16400 },
  { month: "Jan '26", mrr: 17900 },
  { month: "Feb '26", mrr: 19300 },
  { month: "Mar '26", mrr: 20800 },
  { month: "Apr '26", mrr: 21600 },
  { month: "May '26", mrr: 23400 },
  { month: "Jun '26", mrr: 25100 },
  { month: "Jul '26", mrr: 27200 },
  { month: "Aug '26", mrr: 28900 },
];

export const STAT_TILES: StatTile[] = [
  {
    label: "MRR",
    value: "$28,900",
    delta: "+6.3%",
    good: true,
    hint: "vs. July",
  },
  {
    label: "Active users",
    value: "1,284",
    delta: "+4.1%",
    good: true,
    hint: "weekly active",
  },
  {
    label: "Trial → paid",
    value: "18.4%",
    delta: "+1.2pt",
    good: true,
    hint: "30-day window",
  },
  {
    label: "Churn",
    value: "2.3%",
    delta: "-0.4pt",
    good: true,
    hint: "monthly, revenue",
  },
];

export const FUNNEL: FunnelStage[] = [
  { label: "Signed up", count: 3240 },
  { label: "Created doc", count: 2318 },
  { label: "Invited teammate", count: 1274 },
  { label: "Subscribed", count: 596 },
];

export const COHORTS: Cohort[] = [
  { label: "Jun 29", size: 412, weeks: [100, 68, 55, 49, 44, 41, 39, 37] },
  { label: "Jul 6", size: 388, weeks: [100, 71, 58, 51, 46, 43, 40, 0] },
  { label: "Jul 13", size: 425, weeks: [100, 66, 54, 47, 43, 40, 0, 0] },
  { label: "Jul 20", size: 401, weeks: [100, 73, 61, 54, 49, 0, 0, 0] },
  { label: "Jul 27", size: 456, weeks: [100, 70, 57, 50, 0, 0, 0, 0] },
  { label: "Aug 3", size: 439, weeks: [100, 74, 62, 0, 0, 0, 0, 0] },
  { label: "Aug 10", size: 471, weeks: [100, 72, 0, 0, 0, 0, 0, 0] },
  { label: "Aug 17", size: 448, weeks: [100, 0, 0, 0, 0, 0, 0, 0] },
];

export const INITIAL_USERS: DemoUser[] = [
  {
    id: "u-01",
    name: "Mara Quintrell",
    email: "mara@inkflow-demo.io",
    role: "Admin",
    lastActive: "2 min ago",
    status: "Active",
  },
  {
    id: "u-02",
    name: "Dex Halloway",
    email: "dex@inkflow-demo.io",
    role: "Editor",
    lastActive: "14 min ago",
    status: "Active",
  },
  {
    id: "u-03",
    name: "Priya Vantham",
    email: "priya@inkflow-demo.io",
    role: "Editor",
    lastActive: "1 hr ago",
    status: "Active",
  },
  {
    id: "u-04",
    name: "Ossian Brate",
    email: "ossian@inkflow-demo.io",
    role: "Viewer",
    lastActive: "3 hrs ago",
    status: "Active",
  },
  {
    id: "u-05",
    name: "Lenka Storvik",
    email: "lenka@inkflow-demo.io",
    role: "Editor",
    lastActive: "Yesterday",
    status: "Active",
  },
  {
    id: "u-06",
    name: "Theo Marchetti",
    email: "theo@inkflow-demo.io",
    role: "Viewer",
    lastActive: "Yesterday",
    status: "Suspended",
  },
  {
    id: "u-07",
    name: "Junia Feldrow",
    email: "junia@inkflow-demo.io",
    role: "Admin",
    lastActive: "2 days ago",
    status: "Active",
  },
  {
    id: "u-08",
    name: "Calder Nyx",
    email: "calder@inkflow-demo.io",
    role: "Viewer",
    lastActive: "4 days ago",
    status: "Active",
  },
  {
    id: "u-09",
    name: "Ines Vollard",
    email: "ines@inkflow-demo.io",
    role: "Editor",
    lastActive: "6 days ago",
    status: "Active",
  },
  {
    id: "u-10",
    name: "Rufus Tanager",
    email: "rufus@inkflow-demo.io",
    role: "Viewer",
    lastActive: "Aug 12",
    status: "Pending",
  },
  {
    id: "u-11",
    name: "Nadia Okonkwo",
    email: "nadia@inkflow-demo.io",
    role: "Editor",
    lastActive: "Aug 11",
    status: "Active",
  },
  {
    id: "u-12",
    name: "Marcel Duvane",
    email: "marcel@inkflow-demo.io",
    role: "Viewer",
    lastActive: "Aug 9",
    status: "Active",
  },
  {
    id: "u-13",
    name: "Freya Lindqvist",
    email: "freya@inkflow-demo.io",
    role: "Admin",
    lastActive: "Aug 6",
    status: "Active",
  },
  {
    id: "u-14",
    name: "Tobias Wrenfield",
    email: "tobias@inkflow-demo.io",
    role: "Viewer",
    lastActive: "Aug 2",
    status: "Active",
  },
  {
    id: "u-15",
    name: "Hollis Grange",
    email: "hollis@inkflow-demo.io",
    role: "Viewer",
    lastActive: "Jul 28",
    status: "Active",
  },
  {
    id: "u-16",
    name: "Anouk Merrell",
    email: "anouk@inkflow-demo.io",
    role: "Editor",
    lastActive: "Invite sent",
    status: "Pending",
  },
];

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    seats: "Up to 5 seats",
    docs: "50 proposals / mo",
    tagline: "For solo founders",
  },
  {
    id: "growth",
    name: "Growth",
    price: 79,
    seats: "Up to 25 seats",
    docs: "Unlimited proposals",
    tagline: "For scaling teams",
  },
  {
    id: "scale",
    name: "Scale",
    price: 199,
    seats: "Unlimited seats",
    docs: "Unlimited + API access",
    tagline: "For large orgs",
  },
];

export const INVOICES: Invoice[] = [
  { number: "INV-2026-0847", date: "Aug 1, 2026", amount: 79, period: "Aug 1 – Aug 31", status: "Due" },
  { number: "INV-2026-0721", date: "Jul 1, 2026", amount: 79, period: "Jul 1 – Jul 31", status: "Paid" },
  { number: "INV-2026-0598", date: "Jun 1, 2026", amount: 79, period: "Jun 1 – Jun 30", status: "Paid" },
  { number: "INV-2026-0463", date: "May 1, 2026", amount: 79, period: "May 1 – May 31", status: "Paid" },
  { number: "INV-2026-0342", date: "Apr 1, 2026", amount: 29, period: "Apr 1 – Apr 30", status: "Paid" },
  { number: "INV-2026-0217", date: "Mar 1, 2026", amount: 29, period: "Mar 1 – Mar 31", status: "Paid" },
  { number: "INV-2026-0138", date: "Feb 1, 2026", amount: 29, period: "Feb 1 – Feb 28", status: "Paid" },
  { number: "INV-2026-0064", date: "Jan 1, 2026", amount: 29, period: "Jan 1 – Jan 31", status: "Paid" },
];

export const ACCOUNTS: CustomerAccount[] = [
  {
    id: "a-01",
    name: "Brightlark Studio",
    plan: "Scale",
    seats: 42,
    trend: [61, 64, 66, 70, 72, 75, 78, 82, 84, 88, 91, 95],
    health: "Healthy",
    riskScore: 8,
    renewal: "Nov 14, 2026",
    mrr: 199,
    suggestion: null,
  },
  {
    id: "a-02",
    name: "Copperfield Legal",
    plan: "Growth",
    seats: 18,
    trend: [70, 72, 69, 71, 74, 73, 76, 78, 77, 80, 82, 81],
    health: "Healthy",
    riskScore: 14,
    renewal: "Oct 2, 2026",
    mrr: 79,
    suggestion: null,
  },
  {
    id: "a-03",
    name: "Nimbus & Vale",
    plan: "Growth",
    seats: 21,
    trend: [82, 80, 78, 74, 71, 69, 66, 64, 61, 58, 54, 50],
    health: "At risk",
    riskScore: 84,
    renewal: "Sep 9, 2026",
    mrr: 79,
    suggestion:
      "Usage down 39% over 12 weeks and renewal is in 16 days. Champion (their admin) has not logged in since Jul 30. Suggested play: schedule an exec check-in this week and offer a guided re-onboarding for the 9 dormant seats.",
  },
  {
    id: "a-04",
    name: "Harbor & Pine Consulting",
    plan: "Starter",
    seats: 5,
    trend: [40, 42, 45, 44, 48, 47, 50, 52, 55, 54, 58, 60],
    health: "Healthy",
    riskScore: 19,
    renewal: "Jan 22, 2027",
    mrr: 29,
    suggestion: null,
  },
  {
    id: "a-05",
    name: "Quill Collective",
    plan: "Growth",
    seats: 12,
    trend: [66, 64, 65, 61, 62, 58, 59, 55, 56, 52, 53, 49],
    health: "Watch",
    riskScore: 52,
    renewal: "Dec 5, 2026",
    mrr: 79,
    suggestion:
      "Slow drift: weekly proposal creation has fallen 4 weeks in a row. Suggested play: send the “templates that close faster” email sequence and flag for a CSM touch next cycle.",
  },
  {
    id: "a-06",
    name: "Tessellate Partners",
    plan: "Scale",
    seats: 65,
    trend: [55, 58, 62, 60, 65, 68, 72, 70, 75, 79, 83, 86],
    health: "Healthy",
    riskScore: 11,
    renewal: "Feb 18, 2027",
    mrr: 199,
    suggestion: null,
  },
  {
    id: "a-07",
    name: "Foxglove Agency",
    plan: "Starter",
    seats: 4,
    trend: [58, 54, 50, 47, 42, 40, 36, 33, 29, 26, 22, 18],
    health: "At risk",
    riskScore: 91,
    renewal: "Sep 1, 2026",
    mrr: 29,
    suggestion:
      "Renewal in 8 days with near-zero usage: only 1 of 4 seats active in the last month. Suggested play: trigger the win-back offer (2 months at 50%) and ask what blocked adoption — likely a fit issue worth a 15-minute call.",
  },
  {
    id: "a-08",
    name: "Meridian Draft Co.",
    plan: "Growth",
    seats: 15,
    trend: [63, 65, 62, 66, 64, 67, 63, 66, 68, 65, 67, 69],
    health: "Watch",
    riskScore: 44,
    renewal: "Oct 27, 2026",
    mrr: 79,
    suggestion:
      "Usage is flat while seat count grew last quarter — new seats are not activating. Suggested play: nudge their admin to run the built-in team onboarding checklist for the 5 newest seats.",
  },
  {
    id: "a-09",
    name: "Larkspur Labs",
    plan: "Scale",
    seats: 38,
    trend: [48, 51, 55, 54, 59, 63, 62, 67, 71, 74, 79, 83],
    health: "Healthy",
    riskScore: 12,
    renewal: "Mar 30, 2027",
    mrr: 199,
    suggestion: null,
  },
  {
    id: "a-10",
    name: "Alder & Frost",
    plan: "Starter",
    seats: 5,
    trend: [52, 53, 51, 54, 52, 53, 52, 55, 53, 52, 54, 53],
    health: "Healthy",
    riskScore: 22,
    renewal: "Jul 8, 2027",
    mrr: 29,
    suggestion: null,
  },
  {
    id: "a-11",
    name: "Veridian Post",
    plan: "Growth",
    seats: 24,
    trend: [74, 76, 75, 77, 78, 76, 77, 75, 42, 31, 26, 22],
    health: "At risk",
    riskScore: 88,
    renewal: "Oct 15, 2026",
    mrr: 79,
    suggestion:
      "Cliff drop: logins fell 68% in a single week after their champion changed roles, and have not recovered in the 3 weeks since. Suggested play: get an intro to the new team lead this week and offer a 30-minute admin handover before the Oct 15 renewal.",
  },
  {
    id: "a-12",
    name: "Pennon & Wren",
    plan: "Growth",
    seats: 11,
    trend: [68, 67, 65, 66, 63, 62, 60, 59, 57, 55, 54, 52],
    health: "Watch",
    riskScore: 57,
    renewal: "Jan 9, 2027",
    mrr: 79,
    suggestion:
      "Slow fade: active seats slipped from 11 to 7 over the quarter and proposal exports have stalled. Suggested play: enroll the account in the next QBR cycle and share the unused-seat report with their admin.",
  },
];
