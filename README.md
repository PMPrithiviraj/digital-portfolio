# Digital Portfolio — Prithiviraj P M

Personal portfolio site for **Prithiviraj P M**, a full-stack developer skilled in Python, JavaScript, and MongoDB, with hands-on experience in REST APIs, AES encryption, and JWT authentication.

**Live:** [digital-portfolio-nine-navy.vercel.app](https://digital-portfolio-nine-navy.vercel.app/)

## Structure

This repo currently contains two versions of the site:

- **`app/`** — the current version. React + TypeScript + Vite + Tailwind CSS, with live, interactive case studies (not screenshots) of real projects.
- **Repo root** (`index.html`, `style.css`, `script.js`, `loginPage.html`, `index-shop.html`) — the original static HTML/CSS/JS version, kept for reference during the migration.

All active development happens in `app/`.

## Tech stack (`app/`)

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (CSS-first config, custom design tokens in `src/index.css`)
- Framer Motion (scroll reveals, respects `prefers-reduced-motion`)

## Features

- Dark/light theme toggle with persisted preference
- Live, embedded, fully interactive project case studies:
  - JWT-authenticated login form with real client-side validation
  - Product catalog with working cart state (`useReducer`)
- Evidence-based skills section (no self-rated percentages)
- Accessible (WCAG AA, verified with axe-core) and SEO-ready (meta tags, OG/Twitter cards, JSON-LD, sitemap, robots.txt)

## Getting started

```bash
cd app
npm install
npm run dev
```

Other scripts (run from `app/`):

```bash
npm run build     # type-check + production build
npm run preview   # preview the production build locally
npm run lint
```

## Deployment

Deployed on Vercel. Project settings:

- **Root Directory:** `app`
- **Framework Preset:** Vite

No environment variables or secrets are required — the site is fully static/client-side (the contact form opens a pre-filled `mailto:` link; there is no backend).
