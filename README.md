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

- `app/(site)/` — portfolio pages (home, about, services, projects, project case studies, contact)
- `app/demos/` — five interactive demo apps (`/demos/clinic`, `/demos/restaurant`, `/demos/crm`, `/demos/saas`, `/demos/salad`): fully client-side products with seeded fictional data that anyone can open and test — no backend, state resets on refresh. Each has its own brand identity (tokens in `app/globals.css`); real photos live in `public/food/` and `public/salads/` (free-license Unsplash/Pexels, see SOURCES.md files)
- The portfolio also features one **live production project**: Salad Store (saladstore-eg.vercel.app), a real bilingual AR/EN website — sourced from `C:\Programming\Salad Store`, linked with `?lang=en` so portfolio visitors land on the English version
- `components/` — nav, footer, project cards, and the CSS product mockups shown on case studies
- `lib/projects.ts` — all case-study content in one data file (including each project's `demoUrl`); edit copy here

## Honesty note

The four showcased projects are **demo builds** created to demonstrate capability. They are labeled as such throughout the site and must never be presented as client work.
