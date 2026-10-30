export type Project = {
  slug: string;
  /* "live" = real production site with a public URL; "production" = real system in
     daily use with NO public URL; "concept" = self-initiated pitch rebuild for a real
     company, deployed at an external URL; "product" = my own full-stack product with a
     real backend, live with a demo account (not client work); default ("demo") is an
     interactive demo build */
  kind?: "live" | "demo" | "concept" | "production" | "product";
  title: string;
  tagline: string;
  target: string;
  problem: string;
  solution: string;
  features: { name: string; description: string }[];
  /* What the project (or, for demos, the demo itself) actually runs on. */
  tech: string[];
  /* Demos only: the backend and services a production version would ship on. */
  productionStack?: string[];
  businessValue: string[];
  demoNote: string;
  /* Public URL. Omitted for "production" systems that have no public link. */
  demoUrl?: string;
  /* Extra real screens, shown as a grid under the main shot on the case study. */
  gallery?: { src: string; alt: string; caption?: string }[];
  /* Collaborators, shown in the case-study honesty card. */
  credit?: string;
};

/* Every interactive demo is a client-side Next.js app with seeded fictional data. */
const demoStack = [
  "Next.js (App Router)",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Client-side state with fictional data",
];

export const projects: Project[] = [
  {
    slug: "car-engineering-center",
    kind: "production",
    title: "Car Engineering Center — Workshop Platform",
    tagline:
      "An Arabic-first workshop management platform, live across four branches in Amarah, Iraq.",
    target:
      "Car Engineering Center (هندسة السيارات), an auto-workshop group with four branches in Amarah, Iraq. Receptionists, technicians, accountants and the workshop's own customers use it every day.",
    problem:
      "Before the platform, every inspection was a handwritten card. Once a car went onto the floor there was no way to track it: nobody could say where it was or how long it had been there without going to look. Attendance was kept by hand, and salaries were worked out from it by hand. The four branches ran disconnected from one another.",
    solution:
      "One platform for every branch, Arabic-first and right-to-left from the first screen, on web, mobile and print. Reception fills in a three-step wizard and the inspection checklist prices itself into a work order. Every car carries a barcode; scan it and its status is on screen, live. The workshop floor shows a countdown for each car, and overdue turns red on every screen at once. Attendance is pasted in from Excel or the biometric reader and payroll computes itself. Every screen refreshes every half second, so all four branches look at the same numbers. It has grown to 34 screens and views over 12 database tables, about 29,500 lines of TypeScript across 309 commits.",
    features: [
      {
        name: "Live dashboard",
        description:
          "Cars received today, in progress, completed and waiting; seven-day revenue against work orders; the split of vehicle statuses. Refreshed every half second.",
      },
      {
        name: "Three-step reception wizard",
        description:
          "Details, inspection, review. Typing a phone number auto-fills a returning customer, and the checklist (engine oil, filters, battery: good or needs change) prices itself into a work order in minutes.",
      },
      {
        name: "Workshop floor with live countdowns",
        description:
          "Each car on the floor shows its supervisor, technician and bay, with a countdown against the estimate. Overdue turns red on every screen instantly.",
      },
      {
        name: "Work orders with a printable report",
        description:
          "Live timing against the estimate, the services done, engine diagnosis and engine condition at intake, and a technician rating before the order closes. The full report prints.",
      },
      {
        name: "Customers and vehicles",
        description:
          "Complete visit history for every customer and car, Excel and invoice exports, and a one-click full backup.",
      },
      {
        name: "Digital service book",
        description:
          "Every A4 invoice carries a QR code and barcode. The customer scans it and watches their car's status live on their phone, no login. The same page lists the branches and their phone numbers.",
      },
      {
        name: "HR and payroll",
        description:
          "Paste attendance from Excel or the biometric reader. Salaries compute from hours × rate, with a monthly summary.",
      },
    ],
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Supabase (Postgres, realtime, auth)",
      "Tailwind CSS",
    ],
    businessValue: [
      "Four branches run on one system, with one dashboard across all of them.",
      "Staff scan a barcode and customers scan the QR on their invoice; both see the car's status live, without a phone call.",
      "Payroll comes from pasted attendance and an hourly rate, so the monthly salary run is a paste and a check rather than a calculation by hand.",
      "Overdue jobs turn red on every screen at once, so a late car is visible to the whole branch the moment it becomes late.",
    ],
    demoNote:
      "A production system, not a prototype: it runs daily across four branches. It is an internal business tool, so there is no public link; the screens here are from the real product.",
    credit:
      "Built with Abbas Fadhil Jebur (project supervisor, CRM & data analysis).",
    gallery: [
      {
        src: "/screens/cec-floor.webp",
        alt: "Workshop floor screen of Car Engineering Center: three car cards with live countdowns, one overdue and highlighted in red.",
        caption:
          "Workshop floor: a live countdown for every car, with supervisor, technician and bay. Overdue turns red on every screen.",
      },
      {
        src: "/screens/cec-invoice.webp",
        alt: "A printed A4 invoice from Car Engineering Center with a QR code, next to a phone showing the car's live status page.",
        caption:
          "Digital service book: every A4 invoice carries a QR; the customer scans it and watches the car's status live, no login.",
      },
      {
        src: "/screens/cec-wizard.webp",
        alt: "Reception wizard of Car Engineering Center: customer and vehicle details above an inspection checklist that has priced itself into a total.",
        caption:
          "Reception wizard: a phone number auto-fills a returning customer, and the inspection checklist prices itself into a work order.",
      },
      {
        src: "/screens/cec-payroll.webp",
        alt: "HR and payroll screen of Car Engineering Center: a monthly summary with hours, rate and salary due above an attendance table.",
        caption:
          "HR and payroll: attendance pasted from Excel or the biometric reader; salaries compute from hours × rate.",
      },
    ],
  },
  {
    slug: "mawid",
    kind: "product",
    title: "Mawid — Booking & Front Desk for Gulf Clinics",
    tagline:
      "An Arabic-first booking platform for clinics and salons: online booking, WhatsApp reminders, a live schedule and a bilingual front-desk assistant.",
    target:
      "Clinics, salons and studios in the Gulf, shown through a demo dental clinic in Dubai. Patients book from their phone in Arabic or English; the owner and the front desk run the day from one screen.",
    problem:
      "Small clinics in the Gulf still take most bookings by phone and WhatsApp and write them in a paper book or a shared spreadsheet. Two receptionists can give the same chair to two patients, a missed visit costs the slot because nobody sent a reminder, and nobody can say how full next week is without counting by hand. Most booking tools are built in English first and treat Arabic as a translation.",
    solution:
      "Every business gets a public booking page, Arabic and right-to-left by default with English one tap away, and a dashboard for the front desk. Patients pick a service, a person or \"first available\", and a real free time; the time is held for a few minutes while they type, so nobody else can take it. They get a WhatsApp confirmation, a calendar file and a private link to move or cancel. The front desk sees the whole team side by side on a live timeline, books phone and walk-in visits through the same checks, and marks visits attended or missed in one tap. Reminders go out the day before and two hours before. Double bookings are stopped by the database itself, not only by the app.",
    features: [
      {
        name: "Arabic-first booking page",
        description:
          "Right-to-left by default, English one tap away. A day strip shows how booked each day is, and the chosen time is held with a visible countdown while the patient fills in their details.",
      },
      {
        name: "No double bookings, by design",
        description:
          "A Postgres exclusion constraint covers each person's occupied time, cleaning gaps included. A test fires five holds at the same slot at once and exactly one wins.",
      },
      {
        name: "Live front-desk schedule",
        description:
          "Every team member side by side on one timeline with a line for the current time, day totals, who is up next, and visits waiting to be checked out.",
      },
      {
        name: "Reminders that send once",
        description:
          "WhatsApp (and email) reminders the day before and two hours before. Each one is claimed in the database before it goes out, so two overlapping runs can never message a patient twice.",
      },
      {
        name: "Bilingual front-desk assistant",
        description:
          "Ask in English or Arabic, like \"مين عنده مواعيد بكرة الصبح؟\", and get answers from the live schedule. It books, moves or cancels only after a confirm card. Rule-based and tested, no AI model.",
      },
      {
        name: "Insights and exports",
        description:
          "Appointments per day, busiest hours, no-show rate, where bookings came from and how full each person's week was. Bookings export to CSV.",
      },
      {
        name: "Team, services and rules",
        description:
          "Bilingual services with prices and cleaning gaps, shifts and breaks, time off, booking rules, and the booking link with a QR code to print.",
      },
    ],
    tech: [
      "Next.js 16 (App Router, Server Actions)",
      "React 19",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Tailwind CSS 4",
      "Vercel + Vercel Cron",
      "Vitest + GitHub Actions",
    ],
    businessValue: [
      "Patients book themselves at any hour, in their own language, so the phone rings less.",
      "A chair can never go to two people, even when two receptionists click at the same moment.",
      "Reminders go out on their own, so fewer slots are lost to people who forgot.",
      "The owner sees takings, no-shows and how full each person's week is without counting by hand.",
    ],
    demoNote:
      "My own product, designed and built end to end: product design, database, booking engine, reminders, the assistant, tests and deployment. It is not client work. The live site runs a demo dental clinic on generated data that resets every night, so anyone can book as a patient and then run the front desk. Photography and the hero film were generated with Higgsfield. The code is public at github.com/darkxgs/mawid.",
    demoUrl: "https://mawid-bay.vercel.app",
    gallery: [
      {
        src: "/screens/mawid-booking.webp",
        alt: "Mawid patient booking page in Arabic: the clinic's cover photo and name above a list of services with prices, beside a dark ticket that fills in as the patient chooses.",
        caption:
          "The patient's booking page opens in Arabic, right to left, with English one tap away.",
      },
      {
        src: "/screens/mawid-today.webp",
        alt: "Mawid Today screen: three team members side by side on a timeline with a line for the current time, day totals above, and who is up next on the right.",
        caption:
          "Today: the whole team on one timeline, with a line for the current time and visits waiting to be checked out.",
      },
      {
        src: "/screens/mawid-assistant.webp",
        alt: "Mawid assistant answering an Arabic question about tomorrow morning with a list of six appointments and follow-up buttons.",
        caption:
          "The assistant answers in the language it is asked in, from the live schedule.",
      },
      {
        src: "/screens/mawid-insights.webp",
        alt: "Mawid Insights screen: appointments, takings, no-show rate and online share, a bar chart of appointments per day, and a breakdown of how people booked.",
        caption:
          "Insights: appointments per day, takings, no-shows and where bookings came from.",
      },
    ],
  },
  {
    slug: "khatm",
    kind: "product",
    title: "Khatm — Bilingual Tax Invoices for Saudi Businesses",
    tagline:
      "Invoicing for small businesses in Saudi Arabia: tax invoices in Arabic and English on one A4 page, with the ZATCA QR code, payments, credit notes and the quarter's VAT.",
    target:
      "Freelancers, studios and small companies in Saudi Arabia that send a handful of tax invoices a month, shown through a demo design studio in Riyadh with six months of history.",
    problem:
      "Saudi tax invoices have to be bilingual, carry the seller's and buyer's VAT details, round VAT the way ZATCA does and include a QR code. Small businesses still make them in Word or Excel, renumber them by hand, retype the total in words, and fix mistakes by editing an invoice that was already sent, which the rules don't allow.",
    solution:
      "You write a tax invoice, a simplified invoice or a quotation once and Khatm lays it out in Arabic and English on one A4 page: Umm al-Qura dates under the Gregorian ones, VAT per category to the halala, the total in words in both languages, bank details and the business's own round seal. Issuing numbers the document, freezes both parties and writes the QR code; after that it can't be edited, and mistakes are corrected with a credit note that points back to the invoice. Each document gets a private link the customer opens in their own language. Payments and credit notes settle invoices, and the overview shows what's owed, how late it is and the VAT due this quarter.",
    features: [
      {
        name: "One page in two languages",
        description:
          "English from the left, Arabic from the right, whatever language the app is in. The editor draws the page live as you type, and the print stylesheet gives an exact A4 page.",
      },
      {
        name: "ZATCA QR code",
        description:
          "The phase-one QR (seller, VAT number, time stamp, total and VAT as TLV fields) is tested against ZATCA's published example and against Arabic seller names, where lengths are counted in bytes.",
      },
      {
        name: "Numbers with no gaps",
        description:
          "A document is checked, locked and numbered in the same database update that moves the sequence on, so two invoices issued at the same moment can never share a number.",
      },
      {
        name: "Amounts in words, both languages",
        description:
          "Arabic counting rules handled properly: ريالان، ثلاثة ريالات، أحد عشر ريالًا، ألفا ريال. Tested on the awkward cases up to billions.",
      },
      {
        name: "Payments and credit notes",
        description:
          "Part payments, transfers, cash or card. Credit notes can never add up to more than the invoice, and accepted quotations turn into draft invoices with the same lines.",
      },
      {
        name: "The quarter's VAT",
        description:
          "Standard-rated, zero-rated, export, exempt and out-of-scope sales, each net of credit notes, with the VAT due and a CSV download.",
      },
    ],
    tech: [
      "Next.js 16 (App Router, Cache Components, Server Actions)",
      "React 19",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Tailwind CSS 4",
      "Vercel + Vercel Cron",
      "Vitest + GitHub Actions",
    ],
    businessValue: [
      "Invoices that meet ZATCA's first phase without retyping anything in two languages.",
      "No duplicate or missing invoice numbers, even when two people issue at once.",
      "The owner sees who owes what and how late, and the VAT figure for the return, without a spreadsheet.",
      "Customers get a link in their own language with the IBAN to pay into.",
    ],
    demoNote:
      "My own product, designed and built end to end. It is not client work and hasn't been certified by ZATCA; it covers the first phase (the QR code), not the second (clearance through FATOORA). \"Open the demo\" gives every visitor a private copy of a made-up design studio with six months of invoices, deleted after a day. The code is public at github.com/darkxgs/khatm.",
    demoUrl: "https://khatm-invoices.vercel.app",
    gallery: [
      {
        src: "/screens/khatm-overview.webp",
        alt: "Khatm overview: SAR 52,268.50 owed across five invoices, a breakdown by how late each is, money received this month, VAT on this quarter's sales and six months of sales as bars.",
        caption: "The overview says what you're owed as a sentence, then how late it is.",
      },
      {
        src: "/screens/khatm-overview-ar.webp",
        alt: "The same Khatm overview in Arabic, laid out right to left.",
        caption: "The whole app works in Arabic, right to left.",
      },
      {
        src: "/screens/khatm-vat.webp",
        alt: "Khatm VAT return screen for Q4 2026: standard-rated sales, zero-rated, exports, exempt and out of scope, with the VAT due.",
        caption: "The sales side of the VAT return, net of credit notes, ready to download.",
      },
    ],
  },
  {
    slug: "sufra",
    kind: "product",
    title: "Sufra — Table Ordering and Kitchen Board for Restaurants",
    tagline:
      "Guests scan the QR code on their table, order from a bilingual menu with photos, and the order lands on a live kitchen board. Staff see the whole floor at a glance.",
    target:
      "Cafés and casual restaurants in the Gulf and Egypt, shown through a demo grill and bakery called Jamr that keeps taking orders while you watch.",
    problem:
      "In a busy restaurant, orders go from table to waiter to a paper slip to the kitchen, and something gets lost on the way: a missing side, a table that waited forty minutes, a bill nobody brought. Most QR menus are just a PDF; they don't send anything to the kitchen or tell the floor which table needs attention.",
    solution:
      "Every table has its own QR code. Guests open the menu in Arabic or English, choose options, add notes and send the order; they can call a waiter or ask for the bill from the same page. Orders arrive on a kitchen board split by station, with timers, and move from new to cooking to ready with one tap. The floor plan shows every table's state, from seated to waiting for food to wants the bill, and what needs attention right now. Staff sign in with the restaurant's code and a PIN, and a tablet can join the kitchen by scanning a one-time QR.",
    features: [
      {
        name: "QR menu that actually orders",
        description:
          "Bilingual menu with photos, calories, options and notes. The order goes straight to the kitchen; guests see it move from received to ready.",
      },
      {
        name: "Live kitchen board",
        description:
          "Columns for new, cooking and ready, filtered by station (grill, oven, cold, drinks), with a timer on every ticket and a busy-night mode that keeps the demo full.",
      },
      {
        name: "Floor plan",
        description:
          "Every table's state at a glance, and a list of what needs attention: food ready to serve, a waiter call, a bill request.",
      },
      {
        name: "Safe with two people on one ticket",
        description:
          "Every move says which state the screen showed. If someone else already moved the ticket, the update matches nothing and the screen says so, instead of skipping a step.",
      },
      {
        name: "Staff sign-in",
        description:
          "PINs hashed with scrypt and limited per code and visitor; a kitchen tablet joins by scanning a one-time code from a screen that's already signed in.",
      },
    ],
    tech: [
      "Next.js 16 (App Router, Server Actions)",
      "React 19",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Tailwind CSS 4",
      "Vercel",
      "Vitest + GitHub Actions",
    ],
    businessValue: [
      "Fewer lost or wrong orders, because the guest's order is what the kitchen reads.",
      "Tables turn faster when waiters see who needs them instead of walking the floor.",
      "The kitchen sees how long every ticket has waited, by station.",
      "No app to install for guests: the QR code on the table is the whole setup.",
    ],
    demoNote:
      "My own product, designed and built end to end; it is not client work. \"Open the live demo\" gives you a private copy of a demo restaurant that resets after a day: order from a table on your phone and watch it arrive on the kitchen board. Menu photos were generated with Higgsfield. The code is public at github.com/darkxgs/sufra.",
    demoUrl: "https://sufra-tables.vercel.app",
    gallery: [
      {
        src: "/screens/sufra-menu.webp",
        alt: "Sufra guest menu for table 4 at Jamr: a cover photo, a search box, category tabs and dishes with photos, prices and calories.",
        caption: "The guest's menu, opened by scanning the QR code on table 4.",
      },
      {
        src: "/screens/sufra-floor.webp",
        alt: "Sufra floor plan: ten tables showing free, waiting for food and wants the bill, with a list of what needs attention on the right.",
        caption: "The floor: every table's state, and what needs a waiter now.",
      },
      {
        src: "/screens/sufra-today.webp",
        alt: "Sufra Today screen: orders, sales, average time to ready and tables seated, with orders per hour and the most ordered dishes.",
        caption: "Today at a glance: sales, speed and what's selling.",
      },
    ],
  },
  {
    slug: "nabd",
    kind: "product",
    title: "Nabd — Uptime Monitoring and Status Pages",
    tagline:
      "Checks your websites and APIs around the clock, opens an incident when one stops answering, alerts the team, and keeps a public status page in English and Arabic.",
    target:
      "Small teams and agencies that run a few sites or APIs for clients and need to know before the client calls. The live demo watches the sites I've built.",
    problem:
      "Most small teams find out a site is down when a customer complains. The monitoring tools that exist are built in English only, and a status page that customers in the Gulf can read in Arabic is rare.",
    solution:
      "Nabd checks each monitor on a schedule, from the outside, the way a visitor would: status code, an optional keyword on the page, response time. A monitor goes down only after a chosen number of failed checks in a row, so one dropped request isn't an outage. Then it opens an incident, alerts the team by email, Slack, Discord or webhook, and updates a status page that customers can read in English or Arabic. The first good check closes the incident and posts the update on its own.",
    features: [
      {
        name: "Checks that confirm before alerting",
        description:
          "Down only after one to five failed checks in a row, your choice. Slow, failing and keyword checks each have their own cause, written in plain words.",
      },
      {
        name: "Incidents with a timeline",
        description:
          "Automatic updates when a monitor goes down and comes back, plus notes from the team, each with an Arabic version for the status page.",
      },
      {
        name: "Alerts through an outbox",
        description:
          "Detecting an outage only writes alert rows; delivery claims them with SKIP LOCKED, retries failures and logs the result, so a slow Slack never delays a check and a crash never loses an alert.",
      },
      {
        name: "Bilingual status pages",
        description:
          "90 days of uptime per component, current incidents and history, in English or Arabic with right-to-left layout.",
      },
      {
        name: "One scheduler row, many triggers",
        description:
          "No always-on server: a GitHub Actions heartbeat, page views and a daily cron all ask for a run, and one database row makes sure the work happens once.",
      },
    ],
    tech: [
      "Next.js 16 (App Router, Server Actions)",
      "React 19",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Tailwind CSS 4",
      "Vercel + GitHub Actions heartbeat",
      "Vitest",
    ],
    businessValue: [
      "You hear about an outage from Nabd, not from a customer.",
      "Customers see an honest status page in their own language instead of guessing.",
      "No false alarms from a single dropped request.",
      "Runs on free hosting with no always-on server.",
    ],
    demoNote:
      "My own product, designed and built end to end; it is not client work. The shared demo watches my real live sites every fifteen minutes, plus a test service that fails on purpose twice a day so there's always an incident to look at. History from before the demo started is sample data and is shown faded. The code is public at github.com/darkxgs/nabd.",
    demoUrl: "https://nabd-status.vercel.app",
    gallery: [
      {
        src: "/screens/nabd-monitor.webp",
        alt: "Nabd monitor page for the demo target: uptime for 24 hours, 7, 30 and 90 days, median and 95th percentile response time, recent checks as a strip and a response time chart.",
        caption: "One monitor: uptime, response times and every recent check.",
      },
      {
        src: "/screens/nabd-incident.webp",
        alt: "Nabd incident timeline: first failed check, investigating, and resolved after 45 minutes, each update in English and Arabic.",
        caption: "An incident writes its own timeline, in both languages.",
      },
      {
        src: "/screens/nabd-status-ar.webp",
        alt: "Nabd public status page in Arabic for Seif Ashraf's projects: all systems normal, with 90 days of uptime for each site.",
        caption: "The public status page in Arabic, right to left.",
      },
    ],
  },
  {
    slug: "kashf",
    kind: "product",
    title: "Kashf — A Free Check-up for Online Stores",
    tagline:
      "Paste a store's address and Kashf opens it the way a shopper's phone does, checks speed, search, trust, mobile and Arabic support and security, then writes a prescription: what to fix first, and how.",
    target:
      "Owners of online stores on Shopify, Salla, Zid, WooCommerce or custom builds, especially Arabic-speaking ones, who know the store could sell more but not what's wrong.",
    problem:
      "Store owners hear that their site is slow or that Google can't find it, but the tools that check this give a wall of technical scores. They don't say which problem costs the most sales, how long the fix takes, or anything about Arabic support.",
    solution:
      "Kashf fetches the store like a phone would, follows it to a product page, measures page weight, server response and every file, reads the HTML, structured data, robots and security headers, and asks Google's PageSpeed for real speed numbers. About fifty checks each produce a finding with a reason and a fix. The report scores five areas and turns the findings into a prescription ordered by how much each fix is worth and how long it takes. Every report has a link to share and prints cleanly as a PDF, in English or Arabic.",
    features: [
      {
        name: "A prescription, not a score dump",
        description:
          "Findings are ranked by impact and effort (a quick fix, an hour or two, a project), each with why it matters and how to fix it.",
      },
      {
        name: "Arabic and mobile checks",
        description:
          "Right-to-left direction, Arabic fonts, language tags and tap targets, which most audit tools ignore.",
      },
      {
        name: "Built to fetch strangers' sites safely",
        description:
          "Every address and redirect is checked against private networks before it's fetched, with size and time limits, so the tool can't be used to reach internal services.",
      },
      {
        name: "Platform detection",
        description:
          "Recognises Shopify, Salla, Zid, WooCommerce and others, and words the fix for that platform.",
      },
      {
        name: "Nothing guessed by AI",
        description:
          "Every finding comes from something Kashf measured or read on the page.",
      },
    ],
    tech: [
      "Next.js 16 (App Router, Server Actions)",
      "React 19",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Google PageSpeed Insights API",
      "Tailwind CSS 4",
      "Vercel",
    ],
    businessValue: [
      "Owners know which one change will help sales most, not just a list of scores.",
      "Fixes come with effort estimates, so they can be planned or handed to a developer.",
      "A shareable report and PDF that a developer or agency can work from.",
      "Free, in a minute, with no sign-up.",
    ],
    demoNote:
      "My own product, designed and built end to end; it is not client work. It checks any public store. The demo store inside Kashf is built with deliberate problems so the report always has something to show; its product photos were generated with Higgsfield. The code is public at github.com/darkxgs/kashf.",
    demoUrl: "https://kashf-audit.vercel.app",
    gallery: [
      {
        src: "/screens/kashf-ar.webp",
        alt: "Kashf report in Arabic for the demo store: score 68, five area scores and the prescription, right to left.",
        caption: "The same report in Arabic.",
      },
      {
        src: "/screens/kashf-landing.webp",
        alt: "Kashf home page: a headline, an address box with Check my store, and a real report from the demo store beside it.",
        caption: "Paste an address; no sign-up.",
      },
    ],
  },
  {
    slug: "neowave",
    kind: "live",
    title: "NeoWave — Website & Product Code Generator",
    tagline:
      "A full rebuild of an industrial IoT company's website, with a database-backed product code generator and its own admin.",
    target:
      "NeoWave, a building-automation and industrial IoT manufacturer: 60 devices across five product families, from room sensors and smart thermostats to 28-port industrial switches, BTU meters, fire alarm and gas detection. Its visitors are system integrators, engineers and building owners who need specs, datasheets and exact ordering codes.",
    problem:
      "The old WordPress site sold engineered hardware through a generic template. An audit found no main heading, meta description or link previews on the homepage, 9 of 17 images without alt text, stat counters that read 0 to search engines, a whole category (Flow Sensors) missing from the products page, products listed twice, typos in labels and URLs, and news that had not moved since February 2024. The Career page had no way to apply. Worst of all, the product code generator, the tool customers use to build an ordering code, was embedded through a temporary preview link that could expire at any time, and its data was split across three sources that disagreed with each other.",
    solution:
      "Nine public pages and an admin, rebuilt in one visual system: a deep navy ground, the logo's blue, a geometric display face, and a motion layer of smooth scrolling, split-text reveals, scroll-scrubbed copy, 3D tilt cards and a velocity-driven marquee. New photography and two seamless 1080p video loops were AI-generated from NeoWave's real product photos, so the devices in every scene are the real ones. The product code generator was rebuilt from its source onto a new Postgres schema that merges the three old data sources into 35 models, 135 option groups and 460 options, and fixes a bug in the old app that dropped the -XP suffix from model codes. Staff edit everything in a signed-in admin and press Publish; the public generator serves the new snapshot within a minute, with no redeploy.",
    features: [
      {
        name: "Product code generator",
        description:
          "Pick a model, narrow it with type and feature filters, and choose each option while the ordering code assembles itself live. Paste an existing code to decode it, share a configuration as a link, or send it straight into a quote request.",
      },
      {
        name: "Admin with publish snapshots",
        description:
          "Create and edit models, drag option groups into order, paste a whole list of options at once, and upload product photos, with a live code preview. Publish saves a snapshot the public site picks up within a minute; if the API is ever down, the generator falls back to a static copy.",
      },
      {
        name: "Activity log and team accounts",
        description:
          "Every change is recorded with who made it. Admins add teammates, who get a one-time password and change it on first sign-in. Two people editing the same model can't silently overwrite each other.",
      },
      {
        name: "Catalog of 60 devices",
        description:
          "All 13 categories in five families, each device with its datasheet one click away: 82 datasheets and manuals in total. The missing category and the duplicate listings are fixed.",
      },
      {
        name: "Editorial motion system",
        description:
          "A preloader, smooth scroll, line-masked headline reveals, copy that highlights word by word as you scroll, parallax, magnetic buttons and an interactive wave. Hover effects are built so they never fight the scroll animations.",
      },
      {
        name: "AI-generated imagery from real products",
        description:
          "Ten new scenes and two seamless video loops, generated with NeoWave's real product photos as reference: the sensor on a living-room wall, the thermostat in an apartment, switches in a factory cabinet.",
      },
      {
        name: "Career, news and contact",
        description:
          "An open-application form that prepares the email for the applicant, three news articles, and a contact page that arrives pre-filled when a visitor comes from the generator with a code.",
      },
    ],
    tech: [
      "HTML, CSS & vanilla JavaScript",
      "GSAP + ScrollTrigger",
      "Lenis",
      "Node.js serverless functions",
      "Neon Postgres",
      "S3-compatible object storage",
      "Python build pipeline",
      "Vercel + Web Analytics",
      "AI image & video generation",
    ],
    businessValue: [
      "Customers build, decode and share exact ordering codes on the company's own site, and a finished code goes straight into a quote request.",
      "Product data has one home. Staff update it in the admin and publish in seconds, without a developer or a redeploy.",
      "The generator no longer depends on a temporary preview link that could break without warning.",
      "The audit fixes (headings, meta descriptions, link previews, alt text, real stat numbers, the missing category, the typos) make the catalog findable and shareable.",
    ],
    demoNote:
      "A real company's website, rebuilt end to end: audit, design, motion, AI-generated imagery, the generator rebuild, database, admin and hosting. The new site is live at neowave-site.vercel.app; the admin is private.",
    demoUrl: "https://neowave-site.vercel.app",
    gallery: [
      {
        src: "/screens/nw-generator.webp",
        alt: "NeoWave product code generator: a model list with filter chips beside a configured sensor whose ordering code TxTHV94-XP-2-2-W is shown segment by segment.",
        caption:
          "Product code generator: every option choice fills its segment of the ordering code live.",
      },
      {
        src: "/screens/nw-products.webp",
        alt: "NeoWave products page hero: the headline Every device. One ecosystem. beside a lineup of real NeoWave devices, with counts of 60 devices, 13 categories, 5 families and 82 datasheets.",
        caption:
          "Products: 60 devices in 13 categories, each with its datasheet one click away.",
      },
      {
        src: "/screens/nw-decoder.webp",
        alt: "NeoWave code generator landing: the headline Build your ordering code. above a field for pasting a code to decode, with counts of 35 models, 460 options and 6 product types.",
        caption:
          "Paste any existing ordering code and the generator decodes it back into its options.",
      },
      {
        src: "/screens/nw-career.webp",
        alt: "NeoWave career page hero: Join our global team over an AI-generated scene of NeoWave devices on a desk with a city skyline at night.",
        caption:
          "Career: an AI-generated video loop built from the real products, and an open-application form.",
      },
    ],
  },
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
    slug: "blue-sky-events",
    kind: "concept",
    title: "Blue Sky Events — Concept Rebuild",
    tagline:
      "A brand-true concept site for a real Cairo congress house, built entirely from their published record.",
    target:
      "Blue Sky Events, an Egyptian congress and exhibition management company staging medical and scientific congresses in Cairo, Alexandria and Luxor since 2013 — ICCE, Oto Alex, EAVMA, PACMM and more.",
    problem:
      "The company's production work fills five-star ballrooms, but its website undersells it. The public page is built from large flat images with almost no text a search engine can read, and some of the journeys a visitor might take through the site dead-end.",
    solution:
      "A self-initiated concept rebuild, shipped as a working pitch. Every event name, venue, date and photograph comes from the company's own published record — nothing invented, and the site labels itself a concept. Fully bilingual Arabic/English with true RTL, an editorial motion system, a unified navy photo treatment that turns Instagram-sourced photography into one visual family, and a page that loads in a fraction of the original's weight.",
    features: [
      {
        name: "Bilingual AR/EN with true RTL",
        description:
          "A one-tap language toggle flips the entire site — layout direction, typography and native-quality Arabic copy — and remembers the choice, with no flash of the wrong language on reload.",
      },
      {
        name: "Editorial motion system",
        description:
          "Smooth scrolling, line-masked headline reveals, velocity marquees and magnetic buttons — the same motion language used by award-winning studio sites, tuned to stay on for every visitor.",
      },
      {
        name: "Unified photo treatment",
        description:
          "A navy duotone grade, film grain and real captions turn mixed-quality event photography into one deliberate visual family — and no image ever renders above its native resolution.",
      },
      {
        name: "Track-record grid from the published record",
        description:
          "Eleven named congresses with their real venues, cities and dates; events without usable photography get branded cards rather than stock images.",
      },
      {
        name: "Working enquiry form",
        description:
          "Client-side validation with a clear success state — and choosing a service anywhere on the page pre-selects the matching event type in the form.",
      },
      {
        name: "Performance as a feature",
        description:
          "Under 1.5 MB and interactive in about a second on the first visit — where the site it reimagines ships tens of megabytes of flat images.",
      },
    ],
    tech: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP + ScrollTrigger",
      "Lenis",
      "Custom AR/EN i18n (RTL)",
    ],
    businessValue: [
      "Shows how a congress house's own archive — photos, venues, named events — can be turned into a credible sales asset without inventing a single claim.",
      "Demonstrates true bilingual delivery for a market where most competitor congress sites ship English-only.",
      "Proves that a fast, search-readable rebuild is achievable within the constraints of real, imperfect source material.",
    ],
    demoNote:
      "This is a concept, not commissioned work: a live pitch built for a real company from publicly available material, and clearly labelled as a design concept on the site itself.",
    demoUrl: "https://blue-skye.vercel.app",
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
    tech: demoStack,
    productionStack: [
      "PostgreSQL",
      "Prisma",
      "BullMQ + Redis",
      "Twilio (SMS)",
      "Resend (email)",
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
    tech: demoStack,
    productionStack: ["PostgreSQL", "Prisma", "Stripe", "WhatsApp Business API"],
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
    tech: demoStack,
    productionStack: [
      "PostgreSQL",
      "Prisma",
      "BullMQ + Redis",
      "LLM API integration",
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
    tech: demoStack,
    productionStack: ["PostgreSQL", "Prisma", "Stripe Billing", "Auth.js"],
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
    tech: demoStack,
    productionStack: ["PostgreSQL", "Prisma", "Stripe"],
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
