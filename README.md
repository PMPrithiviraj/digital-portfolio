<h1 align="center">Hi, I'm Prithiviraj P M 👋</h1>
<h3 align="center">Full Stack Developer in Chennai · Python · React · MongoDB</h3>

<p align="center">
  <a href="https://digital-portfolio-nine-navy.vercel.app/">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=20&duration=3000&pause=800&color=2DD4A7&center=true&vCenter=true&width=560&lines=Secure+web+apps+%E2%80%94+from+database+to+UI;JWT+auth+%C2%B7+AES-256+%C2%B7+REST+APIs;Open+to+full-time+roles+%26+freelance+projects" alt="Secure web apps — from database to UI" />
  </a>
</p>

<p align="center">
  <a href="https://digital-portfolio-nine-navy.vercel.app/"><img src="https://img.shields.io/badge/Live_site-Visit-2DD4A7?style=flat-square&logo=vercel&logoColor=white" alt="Live site" /></a>
  <a href="https://github.com/PMPrithiviraj/digital-portfolio/actions/workflows/seo-check.yml"><img src="https://github.com/PMPrithiviraj/digital-portfolio/actions/workflows/seo-check.yml/badge.svg" alt="SEO regression check" /></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

<img align="right" src="public/avatar-640.webp" width="220" alt="Prithiviraj P M" />

- 🔭 Building **this portfolio**: live, interactive project demos instead of screenshots
- 🔐 Strongest project: **encrypted file storage** with AES-256 and JWT role-based access control
- 🎓 **B.Sc. Computer Science**, Sridevi Arts & Science College (University of Madras), 2026
- 📍 Based in **Ambattur, Chennai**, open to relocating
- 💼 Open to **full-time Software Developer roles** and **freelance projects**
- 📫 Reach me at **[pmprithiviraj@gmail.com](mailto:pmprithiviraj@gmail.com)**

<br clear="right" />

## Connect with me

<p>
  <a href="https://www.linkedin.com/in/prithivirajpm"><img src="https://img.shields.io/badge/LinkedIn-prithivirajpm-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://digital-portfolio-nine-navy.vercel.app/"><img src="https://img.shields.io/badge/Portfolio-Live-2DD4A7?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
  <a href="mailto:pmprithiviraj@gmail.com"><img src="https://img.shields.io/badge/Email-pmprithiviraj-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://github.com/PMPrithiviraj"><img src="https://img.shields.io/badge/GitHub-PMPrithiviraj-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

## Languages and tools

<p>
  <img src="https://skillicons.dev/icons?i=py,js,ts,react,nodejs,express,mongodb,html,css,tailwind,vite,git,github,vercel,opencv,figma&perline=8" alt="Python, JavaScript, TypeScript, React, Node.js, Express, MongoDB, HTML, CSS, Tailwind CSS, Vite, Git, GitHub, Vercel, OpenCV, Figma" />
</p>

## Preview

<p align="center">
  <img src="docs/preview-hero.webp" width="49%" alt="Portfolio hero section" />
  <img src="docs/preview-freelance.webp" width="49%" alt="Freelance web development section" />
</p>

## What's inside

- **Live, interactive case studies**, each one the actual running component:
  - JWT-authenticated login form with real client-side validation
  - Product catalog with working cart state (`useReducer`)
- **Evidence-based skills section**: every skill is tied to a project, with no self-rated percentages
- **Dark/light theme** with persisted preference and no flash on load
- **Accessible**: WCAG AA, verified with axe-core; animations respect `prefers-reduced-motion`
- **Search-ready**: build-time prerendered HTML, JSON-LD (`ProfilePage` + `Person`), Open Graph/Twitter cards, sitemap, and robots.txt, guarded by an SEO regression check in CI

## Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config, design tokens in `src/index.css`) |
| Motion | Framer Motion (scroll reveals) |
| Build | Vite, build-time prerender (`src/entry-server.tsx` → `scripts/prerender.mjs`) |
| Quality | ESLint, axe-core + Playwright, `npm run check:seo` |
| Hosting | Vercel |

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

`npm run build` prerenders the page at build time, so crawlers that don't run JavaScript still get the full content. The browser then renders the app normally with `createRoot`.

When content changes substantively, update `<lastmod>` in `public/sitemap.xml` and `dateModified` in the JSON-LD in `index.html`.

## Deployment

Deployed on Vercel. **Framework Preset:** Vite, **Root Directory:** repo root.

No environment variables or secrets are required. The site is fully static/client-side: the contact form opens a pre-filled `mailto:` link, and there is no backend.

---

<p align="center"><i>Built by Prithiviraj P M · Chennai</i></p>
