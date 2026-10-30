# Seif Ashraf — Portfolio

Professional portfolio site for Seif Ashraf, Full Stack Developer.

Built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Deploy-ready for Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository at https://vercel.com/new — Vercel auto-detects Next.js, no configuration needed.
3. (Recommended) Attach a custom domain, e.g. `seifashraf.dev`, in the Vercel project settings.

## CV

The downloadable CV is `public/Seif_Ashraf_CV.pdf`, served at `/Seif_Ashraf_CV.pdf` and linked from the footer and the contact page. Its source is `cv/Seif_Ashraf_CV.html` (one A4 page, Liberation Sans/Arial); edit it and print it to PDF from Chromium with A4 paper and no margins to regenerate the file.

## Structure

- `app/(site)/` — portfolio pages (home, about, services, projects, project case studies, contact) plus `not-found.tsx` for unknown project slugs; `app/not-found.tsx` is the branded 404 for unmatched URLs
- `app/demos/` — five interactive demo apps (`/demos/clinic`, `/demos/restaurant`, `/demos/crm`, `/demos/saas`, `/demos/salad`) with an index at `/demos`: fully client-side products with seeded fictional data that anyone can open and test — no backend, state resets on refresh. Each has its own brand identity (tokens in `app/globals.css`); real photos live in `public/food/` and `public/salads/` (free-license Unsplash/Pexels, see SOURCES.md files). `app/demos/salad/**` is frozen.
- Two **production projects**: Car Engineering Center (`kind: "production"`, an internal workshop platform live in four branches in Amarah, Iraq, with no public URL; screens in `public/screens/car-engineering-center.png` and `public/screens/cec-*.webp` are cropped from the case-study deck) and Salad Store (`kind: "live"`, saladstore-eg.vercel.app, a real bilingual AR/EN website sourced from `C:\Programming\Salad Store`, linked with `?lang=en`). NeoWave (`kind: "live"`, neowave-site.vercel.app) is a full website and product-code-generator rebuild for an industrial IoT company; its screens are `public/screens/neowave.png` and `public/screens/nw-*.webp`, captured from the live site. Blue Sky Events is a `concept` rebuild for a real company. Mawid (`kind: "product"`, mawid-bay.vercel.app, source at github.com/darkxgs/mawid) is Seif's own full-stack booking product with a live demo clinic; it is labelled as his own product, not client work. Its screens (`public/screens/mawid*.{png,webp}`) were captured from the live site. Four more of his own products follow the same pattern (`kind: "product"`, code public under github.com/darkxgs): Khatm (khatm-invoices.vercel.app, bilingual Saudi tax invoices with the ZATCA QR code), Sufra (sufra-tables.vercel.app, QR table ordering and a kitchen board), Nabd (nabd-status.vercel.app, uptime monitoring with bilingual status pages) and Kashf (kashf-audit.vercel.app, a check-up for online stores). Their screens (`public/screens/{khatm,sufra,nabd,kashf}*`) were captured from each app running its demo.
- `components/` — nav, footer, project cards, the browser-chrome screenshot frame (`app-shot.tsx`; every project slug needs an entry there) and the shared 404 body
- `lib/projects.ts` — all case-study content in one data file (including each project's `demoUrl`, and for demos a `productionStack` separate from the `tech` the demo actually runs on); edit copy here

## Honesty note

The five demo projects are **interactive demo builds** created to demonstrate capability. They are labeled as such throughout the site and must never be presented as client work. Copy for the production projects uses only facts from Seif's own case-study material.
