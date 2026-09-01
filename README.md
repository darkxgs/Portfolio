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

## Structure

- `app/(site)/` — portfolio pages (home, about, services, projects, project case studies, contact) plus `not-found.tsx` for unknown project slugs; `app/not-found.tsx` is the branded 404 for unmatched URLs
- `app/demos/` — five interactive demo apps (`/demos/clinic`, `/demos/restaurant`, `/demos/crm`, `/demos/saas`, `/demos/salad`) with an index at `/demos`: fully client-side products with seeded fictional data that anyone can open and test — no backend, state resets on refresh. Each has its own brand identity (tokens in `app/globals.css`); real photos live in `public/food/` and `public/salads/` (free-license Unsplash/Pexels, see SOURCES.md files). `app/demos/salad/**` is frozen.
- Two **production projects**: Car Engineering Center (`kind: "production"`, an internal workshop platform live in four branches in Amarah, Iraq, with no public URL; screens in `public/screens/car-engineering-center.png` and `public/screens/cec-*.webp` are cropped from the case-study deck) and Salad Store (`kind: "live"`, saladstore-eg.vercel.app, a real bilingual AR/EN website sourced from `C:\Programming\Salad Store`, linked with `?lang=en`). Blue Sky Events is a `concept` rebuild for a real company.
- `components/` — nav, footer, project cards, the browser-chrome screenshot frame (`app-shot.tsx`; every project slug needs an entry there) and the shared 404 body
- `lib/projects.ts` — all case-study content in one data file (including each project's `demoUrl`, and for demos a `productionStack` separate from the `tech` the demo actually runs on); edit copy here

## Honesty note

The five demo projects are **interactive demo builds** created to demonstrate capability. They are labeled as such throughout the site and must never be presented as client work. Copy for the production projects uses only facts from Seif's own case-study material.
