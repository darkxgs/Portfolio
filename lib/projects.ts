export type Project = {
  slug: string;
  /* "live" = real production site (demoUrl is the external URL); default is a demo build */
  kind?: "live" | "demo";
  title: string;
  tagline: string;
  target: string;
  problem: string;
  solution: string;
  features: { name: string; description: string }[];
  tech: string[];
  businessValue: string[];
  demoNote: string;
  demoUrl: string;
};

export const projects: Project[] = [
  {
    slug: "salad-store",
    kind: "live",
    title: "Salad Store — Salad Bar & Wraps",
    tagline: "A bilingual ordering website for a real Cairo salad bar — live in production.",
    target:
      "Salad Store, a salad bar and wraps restaurant in Heliopolis, Cairo, serving calorie-counted healthy food with delivery and meal subscriptions.",
    problem:
      "The restaurant runs its orders through WhatsApp and walk-ins, but had no digital storefront to send people to: no menu customers could browse at home, no way to show the calorie-counted positioning that sets it apart, and no self-serve path into its meal-subscription packs. Its customers are Arabic-first, so a translated-afterthought website would not do.",
    solution:
      "A fast, Arabic-first bilingual website (RTL by default, one-tap English) where every menu item, subscription pack, and custom salad opens WhatsApp with a ready-made order message — meeting the restaurant's customers in the channel it already operates. An interactive salad builder computes price and calories live, calorie and protein badges run across the whole menu, and the site ships as a zero-build static bundle on Vercel for instant mobile loads.",
    features: [
      {
        name: "Arabic-first, fully bilingual",
        description:
          "RTL layout by default with a one-tap switch to English — built as a first-class bilingual site, not a translation bolted on.",
      },
      {
        name: "WhatsApp ordering everywhere",
        description:
          "Every dish, pack, and custom salad deep-links into WhatsApp with a pre-filled order message, so orders arrive complete instead of as a back-and-forth chat.",
      },
      {
        name: "Interactive salad builder",
        description:
          "Size, bases, veggies, protein, dressing, and extras with live price and calorie totals — and the selection survives a page reload.",
      },
      {
        name: "Meal subscription packs",
        description:
          "A dedicated subscriptions page that turns one-off lunches into recurring weekly plans.",
      },
      {
        name: "Calorie & protein badges",
        description:
          "The shop's calorie-counted positioning is visible on every item, not buried in a PDF.",
      },
      {
        name: "SEO with structured data",
        description:
          "Restaurant JSON-LD, meta tags, sitemap, and a custom 404 — findable and indexable from day one.",
      },
      {
        name: "Zero-build static site",
        description:
          "Plain HTML/CSS/JS served from Vercel's edge — instant loads on mobile data and near-zero hosting cost.",
      },
    ],
    tech: [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "Custom i18n (AR/EN, RTL)",
      "WhatsApp deep links",
      "JSON-LD structured data",
      "Vercel",
    ],
    businessValue: [
      "Orders land in the channel the restaurant already runs — WhatsApp — as complete, pre-filled messages that cut the ordering back-and-forth.",
      "The calorie-counted positioning that differentiates the shop leads the whole site instead of living only on printed menus.",
      "The subscriptions page gives regulars a self-serve path into weekly meal plans — recurring revenue instead of one-off orders.",
      "A static build means instant loads on mobile connections and hosting costs near zero.",
    ],
    demoNote:
      "This is a real production website, live at saladstore-eg.vercel.app — designed and built end to end, from mockups and bilingual copy to code and deployment.",
    demoUrl: "https://saladstore-eg.vercel.app/?lang=en",
  },
  {
    slug: "clinic-management",
    title: "Dental Clinic Management System",
    tagline: "Fewer empty chairs, fewer hours on the phone.",
    target:
      "Dental and medical clinics — single practices and small groups that still run bookings by phone and paper.",
    problem:
      "A missed appointment costs a clinic almost as much as a kept one: the chair, the practitioner, and the room are all paid for whether the patient turns up or not. Most small practices still run bookings by phone and track patients across a diary and a spreadsheet, which means reception spends hours a week on scheduling calls and manual reminder texts — and no-shows still happen. Patients, meanwhile, can only book when someone is free to answer the phone.",
    solution:
      "A single system that handles the full appointment lifecycle. Patients book online against real availability, get automatic SMS and email reminders, and manage their own visits from a simple dashboard. Staff run the practice from an admin panel — a shared calendar, patient records, and treatment notes — while a background job queue sends every reminder on schedule without anyone having to think about it.",
    features: [
      {
        name: "Online appointment booking",
        description:
          "Patients book from their phone at any hour, choosing practitioner and time from real availability, so the clinic stops losing bookings to an engaged phone line or closed reception.",
      },
      {
        name: "Automated SMS and email reminders",
        description:
          "A job queue schedules reminders at set intervals before each visit and sends them reliably without anyone on staff having to remember — the single most effective lever against no-shows.",
      },
      {
        name: "Patient dashboard",
        description:
          "Patients see their upcoming visits and full appointment history in one place, cutting the steady stream of when-is-my-appointment calls to the front desk.",
      },
      {
        name: "Self-serve rescheduling",
        description:
          "Patients who can move an appointment in two taps cancel properly instead of simply not showing up, giving staff a chance to refill the slot.",
      },
      {
        name: "Staff calendar",
        description:
          "Reception and practitioners see the whole day or week across chairs at a glance, and can book, move, or cancel appointments without a paper diary.",
      },
      {
        name: "Patient records & treatment notes",
        description:
          "Every patient's contact details, visit history, and treatment notes live against their record, so the practitioner has context before the patient sits down.",
      },
      {
        name: "Role-based staff access",
        description:
          "Reception, practitioners, and practice managers each see the parts of the system their job needs, keeping patient data on a need-to-know basis.",
      },
    ],
    tech: [
      "Next.js (App Router)",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "BullMQ + Redis",
      "Twilio (SMS)",
      "Resend (email)",
      "Tailwind CSS",
    ],
    businessValue: [
      "Automated reminders target the biggest avoidable cost in a clinic: appointments that are booked, staffed, and then missed.",
      "Online booking and self-serve rescheduling take routine scheduling calls off reception, freeing staff time for patients who are actually in the building.",
      "Cancelled slots become visible the moment they open up, so the front desk can refill chair time instead of discovering gaps on the day.",
      "One system for bookings, records, and notes means less time spent cross-checking a paper diary against a spreadsheet against a filing cabinet.",
    ],
    demoNote:
      "This is a demonstration build I created to show what a complete clinic system involves — not work delivered for a client.",
    demoUrl: "/demos/clinic",
  },
  {
    slug: "restaurant-platform",
    title: "Restaurant Digital Platform",
    tagline: "Take orders directly. Keep the margin the marketplaces take.",
    target:
      "Independent restaurants and takeaways that rely on delivery marketplaces or phone orders and want a direct channel they own.",
    problem:
      "Delivery marketplaces typically take 15–35% of every order, and they keep the customer relationship — the restaurant never learns who ordered or how to bring them back. Phone orders are free of commission but eat staff time during the busiest hours and go wrong often enough to cost real money in remakes and refunds. Most restaurants know this, but a custom ordering system has always felt like something only chains can afford.",
    solution:
      "A complete ordering system the restaurant owns: a browsable photo menu, direct online ordering with card payment, a live order screen for the kitchen, and WhatsApp messages that keep customers informed without anyone picking up a phone. Orders arrive paid and legible, the kitchen works from one screen instead of a stack of tickets, and every customer who orders becomes a contact the restaurant can actually reach again.",
    features: [
      {
        name: "Photo menu with categories",
        description:
          "Customers browse the full menu with photos on their phone instead of squinting at a PDF or calling to ask what's available.",
      },
      {
        name: "Direct online ordering",
        description:
          "Orders come straight to the restaurant with no per-order commission, so the margin on every sale stays in the business.",
      },
      {
        name: "Upfront card payment",
        description:
          "Stripe checkout means orders arrive already paid — no chasing payment at the door and no prank orders tying up the kitchen.",
      },
      {
        name: "Kitchen order screen",
        description:
          "New orders appear on one live screen with clear status stages, so nothing gets lost between the counter and the kitchen during a rush.",
      },
      {
        name: "Customer accounts & order history",
        description:
          "Regulars reorder their usual in a few taps, and the restaurant keeps its own customer list instead of renting it from a marketplace.",
      },
      {
        name: "WhatsApp order updates",
        description:
          "Confirmation and ready-for-collection messages go out automatically on WhatsApp, cutting the “is my order ready?” calls that interrupt service.",
      },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "WhatsApp Business API",
      "Tailwind CSS",
    ],
    businessValue: [
      "Every order taken directly avoids the 15–35% commission delivery marketplaces typically charge — on a busy takeaway's volume, a meaningful difference to annual profit.",
      "The restaurant owns its customer data — names, order history, contact details — so repeat business comes from its own list, not a platform's algorithm.",
      "Automated WhatsApp updates and a single kitchen screen reduce phone interruptions and mis-taken orders during peak service, when staff time is most expensive.",
      "Prepaid orders remove the cost of no-shows and payment disputes that come with phone-and-pay-on-collection ordering.",
    ],
    demoNote:
      "This is a demonstration build created to show what a commission-free ordering platform looks like end to end — not a client project, and no client data or results are represented.",
    demoUrl: "/demos/restaurant",
  },
  {
    slug: "crm-automation",
    title: "Business CRM + Automation Platform",
    tagline: "Client relationships that run on a system, not memory.",
    target:
      "Professional services firms — law practices, accountancies, consultancies, and recruitment agencies — where revenue depends on staying on top of many client relationships at once.",
    problem:
      "In most professional services firms, client knowledge lives in inboxes, spreadsheets, and people's heads. Leads go quiet because nobody followed up, onboarding steps get missed, and when a colleague is away, nobody can pick up their clients without a long handover. Off-the-shelf CRMs exist, but firms often abandon them because they demand more admin than they save.",
    solution:
      "This platform puts the whole client relationship in one place: a pipeline view of every open opportunity, a complete interaction history per client, and automated workflows that handle the routine chasing — follow-ups, onboarding steps, document requests — without anyone keeping a mental checklist. An AI assistant reads the client history so staff don't have to, summarising where things stand and drafting replies that a human reviews and sends.",
    features: [
      {
        name: "Leads pipeline dashboard",
        description:
          "Every open opportunity is visible at a glance, staged by where it actually is, so promising leads stop dying quietly in someone's inbox.",
      },
      {
        name: "Full client interaction history",
        description:
          "Every call, email, note, and document sits on one timeline per client, so anyone in the firm can pick up a relationship without a handover meeting.",
      },
      {
        name: "Automated follow-up reminders",
        description:
          "When a lead or client goes quiet, the system prompts the right person at the right time, instead of relying on someone remembering.",
      },
      {
        name: "Onboarding sequences",
        description:
          "New-client steps run in a defined order with nothing skipped, so the first weeks of an engagement feel organised rather than improvised.",
      },
      {
        name: "Automated document requests",
        description:
          "The system asks clients for what's needed and chases politely until it arrives, removing one of the most tedious admin loops in professional services.",
      },
      {
        name: "AI-drafted replies",
        description:
          "The assistant drafts responses grounded in the client's actual history, cutting routine correspondence to a review-and-send instead of a blank page.",
      },
      {
        name: "AI client summaries",
        description:
          "Before a call or meeting, staff get a plain-English summary of the whole relationship in seconds, instead of scrolling months of email.",
      },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "BullMQ + Redis",
      "LLM API integration",
      "Tailwind CSS",
    ],
    businessValue: [
      "Fewer lost leads, because follow-up happens on a system schedule rather than when someone remembers.",
      "Less unbilled admin time, as routine chasing, onboarding steps, and document collection run themselves.",
      "Client knowledge stays with the firm, not with whichever employee happens to hold the relationship.",
      "Faster, more consistent client communication, with AI drafts that keep a human in control of every message sent.",
    ],
    demoNote:
      "This is a demonstration build created to show what a custom CRM and automation platform can look like for a professional services firm — not a client project, and any data shown is fictional.",
    demoUrl: "/demos/crm",
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    tagline: "See who activates, who pays, and who's about to churn.",
    target:
      "Early-stage SaaS founders and small product teams who need a clear read on usage and revenue without stitching together separate analytics, billing, and admin tools.",
    problem:
      "Early SaaS teams usually have their numbers scattered: signups in the database, revenue in Stripe, product usage nowhere useful. That makes basic questions — are new users activating, is the trial converting, who is drifting toward churn — slow to answer and easy to get wrong. Billing tends to get bolted on late, which turns plan changes and invoices into recurring support work.",
    solution:
      "This dashboard puts product and revenue data in one place a founder actually checks. It tracks activation, retention, and revenue side by side, runs subscriptions end-to-end through Stripe, and gives admins a health view of every account. Teams and roles are built in, so customers manage their own workspaces instead of raising tickets.",
    features: [
      {
        name: "Activation funnel",
        description:
          "Shows whether new signups actually reach the product's core value, so you find out if onboarding is broken before churn tells you.",
      },
      {
        name: "Retention cohorts",
        description:
          "Tracks how each week's signups keep coming back, separating a growth problem from a leaky-bucket problem.",
      },
      {
        name: "Revenue overview",
        description:
          "Puts MRR, trial conversion, and churned revenue on one screen so pricing and product decisions rest on the same numbers.",
      },
      {
        name: "Teams and roles",
        description:
          "Lets customers invite colleagues with the right level of access, so growing accounts don't turn into admin work for you.",
      },
      {
        name: "Stripe subscription billing",
        description:
          "Handles plans, free trials, upgrades, and invoices end-to-end, so billing edge cases don't eat engineering weeks.",
      },
      {
        name: "Self-serve billing portal",
        description:
          "Customers update payment details and download invoices themselves instead of emailing support.",
      },
      {
        name: "Account health admin view",
        description:
          "Flags accounts whose usage is fading before renewal, giving the team a reason to reach out while it still matters.",
      },
    ],
    tech: [
      "Next.js (App Router)",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Stripe Billing",
      "Recharts",
      "Auth.js",
      "Tailwind CSS",
    ],
    businessValue: [
      "Product decisions get made from actual activation and retention behaviour instead of gut feel.",
      "Billing and account management become self-serve, cutting the support back-and-forth that eats a small team's week.",
      "At-risk accounts surface before renewal, turning churn from a surprise into something you can act on.",
      "One codebase covers analytics, billing, and admin, so an early-stage team isn't paying for and gluing together three separate tools.",
    ],
    demoNote:
      "This is a self-initiated demo build with sample data — made to show what I can deliver, not a client project.",
    demoUrl: "/demos/saas",
  },
  {
    slug: "greenbowl",
    title: "GreenBowl E-commerce Platform",
    tagline: "A photo-led store with a build-your-own bowl that lifts every order.",
    target:
      "Salad bars, delis, healthy-food cafés, and food brands that want to sell direct with a modern storefront.",
    problem:
      "Lunch businesses live and die on speed and repeat customers, yet most salad bars still sell through a counter queue or a commission-charging marketplace app. Custom orders get shouted across a counter, peak time turns into a bottleneck, and the shop never learns who its regulars are or what actually sells.",
    solution:
      "A storefront the shop owns: photo-led signature bowls with nutrition and dietary tags, a build-your-own-bowl configurator that prices and counts calories live as customers choose, prepaid pickup ordering against real time slots, and a store dashboard where orders, bestsellers, and low-stock ingredients update the moment something happens.",
    features: [
      {
        name: "Photo-led signature menu",
        description:
          "Real photography, dietary tags, and calories on every bowl — customers decide faster and trust what arrives.",
      },
      {
        name: "Build-your-own-bowl configurator",
        description:
          "Base, protein, toppings, dressing — with price, calories, and protein updating live, so every extra topping is a one-tap upsell.",
      },
      {
        name: "Prepaid pickup ordering",
        description:
          "Customers pay online and choose a pickup slot, so the lunch rush moves through the shop instead of queuing in it.",
      },
      {
        name: "Live store dashboard",
        description:
          "New orders land on the store screen instantly with a simple status flow from preparing to picked up.",
      },
      {
        name: "Bestseller analytics",
        description:
          "A running view of what is actually selling today, so prep decisions come from numbers instead of gut feel.",
      },
      {
        name: "Low-stock alerts",
        description:
          "Ingredients running low are flagged before they run out mid-rush, not after.",
      },
    ],
    tech: [
      "Next.js (App Router)",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Tailwind CSS",
    ],
    businessValue: [
      "The configurator turns customisation into revenue — every topping is a visible-price, one-tap add that lifts average order value.",
      "Direct prepaid ordering keeps the margin whole and shortens the physical queue at peak lunch hours.",
      "Bestseller and stock views turn daily prep into a data-driven decision instead of a guess.",
      "Nutrition and dietary information wins the health-conscious lunch crowd that marketplace apps underserve.",
    ],
    demoNote:
      "This is a demonstration build with fictional products and data — created to show what a modern direct-to-customer food store can look like, not a client project.",
    demoUrl: "/demos/salad",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
