# Digital Portfolio — Prithiviraj P M

Personal portfolio site for **Prithiviraj P M**, a full-stack developer skilled in Python, JavaScript, and MongoDB, with hands-on experience in REST APIs, AES encryption, and JWT authentication.

**Live:** [digital-portfolio-nine-navy.vercel.app](https://digital-portfolio-nine-navy.vercel.app/)

## Tech stack

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
npm install
npm run dev
```

Other scripts:

```bash
npm run build     # type-check + production build + prerender HTML into dist/index.html
npm run preview   # preview the production build locally
npm run check:seo # validate sitemap, robots, canonical, JSON-LD and prerendered content in dist/
npm run lint
```

`npm run build` prerenders the page at build time (`src/entry-server.tsx` → `scripts/prerender.mjs`) so crawlers that don't run JavaScript still get the full content. The browser then renders the app normally with `createRoot`.

When content changes substantively, update `<lastmod>` in `public/sitemap.xml` and `dateModified` in the JSON-LD in `index.html`.

## Deployment

Deployed on Vercel — **Framework Preset:** Vite, Root Directory: repo root.

No environment variables or secrets are required — the site is fully static/client-side (the contact form opens a pre-filled `mailto:` link; there is no backend).
