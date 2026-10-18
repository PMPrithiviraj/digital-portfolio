# Digital Portfolio — Complete Repository Data & Context

> **Repository:** `PMPrithiviraj/digital-portfolio`  
> **Owner / Developer:** Prithiviraj P M  
> **Live Site:** [https://digital-portfolio-nine-navy.vercel.app/](https://digital-portfolio-nine-navy.vercel.app/)  
> **Source Repository:** [https://github.com/PMPrithiviraj/digital-portfolio](https://github.com/PMPrithiviraj/digital-portfolio)  
> **Hosting Platform:** Vercel (Static / Vite preset)  
> **Document Purpose:** Single comprehensive source of truth containing all structural, technical, architectural, stylistic, SEO, and contextual data for this codebase.

---

## 1. Executive Summary & Profile

### 1.1 Developer Identity
* **Full Name:** Prithiviraj P M
* **Role / Title:** Full Stack Developer
* **Location:** Ambattur, Chennai, Tamil Nadu, India (Open to relocating)
* **Education:** B.Sc. in Computer Science, Sridevi Arts & Science College, Ponneri (Affiliated with University of Madras), Class of 2026
* **Professional Focus:** Secure full-stack web applications, database schema design, REST APIs, authentication/authorization systems, and accessible, responsive modern front-ends.
* **Target Opportunities:** Entry-level Software Developer / Full Stack Developer / Web Developer roles, as well as freelance web development client projects.

### 1.2 Direct Contact & Social Links
* **Email:** [pmprithiviraj@gmail.com](mailto:pmprithiviraj@gmail.com)
* **Phone / WhatsApp:** [+91 9003800733](https://wa.me/919003800733)
* **LinkedIn:** [https://www.linkedin.com/in/prithivirajpm](https://www.linkedin.com/in/prithivirajpm)
* **GitHub:** [https://github.com/PMPrithiviraj](https://github.com/PMPrithiviraj)
* **Facebook:** [Prithivi Raj Profile](https://www.facebook.com/people/Prithivi-Raj/pfbid0Z74B3BWhnZ6u59uKjfKQg2cnrqNHJiXG5XN7xD2qnuQx61CsYQ1xghCqGy29miMpl/)
* **Instagram:** [@milky_boy._.05](https://www.instagram.com/milky_boy._.05/)

### 1.3 Portfolio Philosophy
Unlike conventional developer portfolios that rely on static mockups or PNG screenshots, this portfolio is built around **evidence-based engineering**:
1. **Live Running Components:** Project case studies are actual, fully interactive React components mounted directly inside styled demo frames.
2. **Evidence-Tied Skills:** No arbitrary self-rated proficiency bars (e.g., "React 90%"). Every listed skill references a tangible project, codebase, or coursework.
3. **Production Polish:** Validated form states, optimistic loading states, keyboard accessibility (WCAG AA), screen-reader labels, theme persistence without layout flash, and zero-client-side-API-leak design.

---

## 2. Technical Stack & Architecture

### 2.1 Technology Stack Summary
| Layer / Domain | Technology | Version | Purpose / Key Features |
| :--- | :--- | :--- | :--- |
| **Runtime & Core** | React | `^19.2.6` | Modern UI component hierarchy, hooks, server-side rendering support |
| **DOM Renderer** | React DOM | `^19.2.6` | Client hydration (`createRoot`) & build-time SSR (`renderToString`) |
| **Language** | TypeScript | `~6.0.2` | Strict typing, interface safety, compile-time contract checks |
| **Bundler & Tooling**| Vite | `^8.0.12` | Ultra-fast HMR dev server and optimized Rollup production builds |
| **Styling** | Tailwind CSS | `^4.3.1` | Next-generation CSS-first config using `@theme` in `src/index.css` |
| **Vite CSS Plugin** | `@tailwindcss/vite` | `^4.3.1` | Direct integration of Tailwind v4 engine into Vite pipeline |
| **Animations** | Framer Motion | `^12.40.0` | Scroll-triggered entrance animations with reduced-motion fallbacks |
| **Prerendering / SSG**| Custom Node Script | Node 24 ESM | SSR build generates full HTML string baked directly into `dist/index.html` |
| **SEO Regression** | Node.js Script | Native ESM | `scripts/check-seo.mjs` verifies metadata, JSON-LD, sitemap, and robots |
| **Linting & Code Quality** | ESLint | `^10.3.0` | Flat config (`eslint.config.js`) with React Hooks & Refresh plugins |
| **Accessibility Testing** | `@axe-core/playwright`| `^4.11.3` | Automated WCAG AA compliance verification tooling |

### 2.2 Build & Rendering Pipeline (Hybrid SSG/SPA)
The application achieves the SEO benefits of static server-rendered HTML alongside the client-side responsiveness of a React SPA:
```
                [Source: src/entry-server.tsx]
                             │
                             ▼
  [vite build --ssr] ───► [dist-ssr/entry-server.js]
                             │
                             ▼
  [scripts/prerender.mjs] ─► Renders React Tree to string (`renderToString`)
                             │
                             ▼
  Injects rendered HTML into [dist/index.html] (replaces `<!--app-html-->`)
  Injects `<noscript>` style fallback to display content if JS is disabled
  Cleans up temporary `dist-ssr` directory
                             │
                             ▼
  [Browser Load / Crawler] ─► Receives complete, crawlable HTML instantly
                             │
                             ▼
  [src/main.tsx] ───────────► `createRoot` mounts and activates React interactivity
```

---

## 3. Directory & File Inventory

```
digital-portfolio/
├── .github/
│   └── workflows/
│       └── seo-check.yml             # GitHub Actions CI workflow for build & SEO tests
├── docs/
│   ├── preview-freelance.webp        # README documentation visual preview (Freelance section)
│   └── preview-hero.webp             # README documentation visual preview (Hero section)
├── public/
│   ├── shop/                         # Static images for the interactive shop demo
│   │   ├── puma-slippers.webp
│   │   ├── running-shoes.webp
│   │   ├── school-shoes.webp
│   │   ├── sneakers.webp
│   │   ├── sports-shoes.jpeg
│   │   └── woodland-premium.jpeg
│   ├── avatar-640.webp               # Optimized 640px avatar portrait for UI & display
│   ├── avatar.png                    # Source high-resolution portrait
│   ├── favicon.svg                   # Vector site favicon
│   ├── icon.jpg                      # Web application touch icon / fallback
│   ├── icons.svg                     # Sprite sheet / vector assets
│   ├── og-image.jpg                  # 1200x1200px social sharing Open Graph preview card
│   ├── resume.pdf                    # Downloadable PDF resume for recruiters
│   ├── robots.txt                    # Search crawler directives referencing sitemap
│   └── sitemap.xml                   # XML sitemap specifying canonical URL & lastmod date
├── scripts/
│   ├── check-seo.mjs                 # Post-build SEO and indexability regression test suite
│   └── prerender.mjs                 # Build-time SSG injection script
├── src/
│   ├── components/
│   │   ├── shop/
│   │   │   ├── products.ts           # Product catalog data array for the armory demo
│   │   │   └── ShopDemo.tsx          # Tactical armory & supply drop quartermaster with cart state
│   │   ├── AboutSection.tsx          # Operative lore, background, and HUD telemetry stats
│   │   ├── CatEyeLoader.tsx          # "Black Cat Eyes" horror-gaming bootloader with progressive bloom
│   │   ├── ContactSection.tsx        # Encrypted comms uplink terminal and tactical comm nodes
│   │   ├── DemoFrame.tsx             # Hardware simulator terminal frame with status LEDs & FPS meter
│   │   ├── Footer.tsx                # Tactical status bar with system telemetry & GitHub link
│   │   ├── FreelanceSection.tsx      # Mercenary contracts & guild bounties board
│   │   ├── Header.tsx                # Tactical Visor compass, player AP bar, OS reboot, & HUD tabs
│   │   ├── Hero.tsx                  # World-space character screen, scanning reticle, single <h1>
│   │   ├── LoginForm.tsx             # Security clearance / vault access terminal (JWT auth demo)
│   │   ├── ProjectCase.tsx           # Mission dossier card (Threat Assessment, Execution, Architecture)
│   │   ├── ProjectsSection.tsx       # Completed missions & hardware simulators terminal
│   │   ├── SkillsSection.tsx         # Tactical perk tree & operative capability matrix
│   │   ├── ThemeToggle.tsx           # Tactical Visor mode switch (NIGHT_STALKER vs DAY_OPS)
│   │   └── VisorOverlay.tsx          # Spatial helmet visor frame with live FPS, altimeter, & 2.5D parallax
│   ├── lib/
│   │   ├── cart.ts                   # Cart state management reducer, count & total math functions
│   │   ├── contactValidation.ts      # Contact form validation functions (name, email, message)
│   │   ├── soundEngine.ts            # Zero-dependency procedural Web Audio API tactical synthesizer
│   │   └── validation.ts             # Auth form validation regex rules (email, complex password)
│   ├── theme/
│   │   └── ThemeProvider.tsx         # React context for theme toggle with localStorage persistence
│   ├── App.tsx                       # Root application layout component with loader & scanline overlays
│   ├── entry-server.tsx              # Server-side entrypoint for static prerender rendering
│   ├── index.css                     # Tailwind CSS v4 root stylesheet with tactical HUD design tokens
│   └── main.tsx                      # Client-side entrypoint mounting React tree
├── .gitignore                        # Git exclusion rules
├── eslint.config.js                  # ESLint flat configuration file
├── index.html                        # Base HTML document with meta tags, JSON-LD, fonts & prerender slot
├── package.json                      # Project metadata, dependencies, scripts
├── package-lock.json                 # Dependency lockfile
├── Profile.pdf                       # Root resume / profile PDF document
├── README.md                         # Project documentation and presentation readme
├── tsconfig.app.json                 # TypeScript compiler configuration for client app
├── tsconfig.json                     # Root TypeScript project reference configuration
├── tsconfig.node.json                # TypeScript compiler configuration for build tools / scripts
└── vite.config.ts                    # Vite build configuration (React & Tailwind plugins)
```

---

## 4. Design System & Theme Engine

### 4.1 Tailwind CSS v4 CSS-First Configuration
Defined in [`src/index.css`](file:///c:/Users/pmpri/OneDrive/Desktop/Prithivi%20Projects/digital-portfolio/src/index.css) using the `@theme` directive:

#### Color Tokens
| Token | Dark Mode (`NIGHT_STALKER`) | Light Mode (`DAY_OPS`) | Description / Semantic Use |
| :--- | :--- | :--- | :--- |
| `--color-bg-base` | `#030304` | `#e5e8ec` | Abyssal pitch black main canvas |
| `--color-bg-raised` | `#08090c` | `#d9dde4` | Elevated sections (Missions, Lore, Comms) |
| `--color-bg-card` | `#0d0f14` | `#f8fafc` | Tactical matte hull (cards, terminals, inputs) |
| `--color-ink-primary` | `#f0ece1` | `#0a0d14` | Crisp bone white / high-contrast display text |
| `--color-ink-secondary`| `#9ca3af` | `#334155` | Muted steel body text |
| `--color-ink-muted` | `#525866` | `#64748b` | Dimmed telemetry, micro tags, coordinates |
| `--color-accent` | `#f59e0b` | `#d97706` | Cat-Eye molten gold / tactical amber primary |
| `--color-accent-dim` | `#b45309` | `#b45309` | Deep amber glow & active hover states |
| `--color-accent-deep`| `#78350f` | `#92400e` | Dark amber shadow accents |
| `--color-signal` | `#ff2a54` | `#e11d48` | Horror / tactical crimson alert beacon |
| `--color-danger` | `#ef4444` | `#dc2626` | System critical error red |

#### Typography & Geometry Tokens
* **Display Font (`--font-display`):** `'Fraunces', serif` (optical size 9..144, weights 400, 600, 700)
* **Body Font (`--font-sans`):** `'Inter', system-ui, -apple-system, sans-serif` (weights 400, 500, 600, 700)
* **Code / Monospace Font (`--font-mono`):** `'JetBrains Mono', ui-monospace, monospace` (weight 500)
* **Border Radii:**
  * `--radius-card`: `0.625rem` (10px) — for cards, modals, demo containers
  * `--radius-control`: `0.375rem` (6px) — for buttons, form inputs, badge tags

### 4.2 Flash of Unstyled Theme (FOUC) Elimination
1. **Head Script Execution:** Inside `index.html` before stylesheets render, an inline script reads `localStorage.getItem('theme')` or falls back to `window.matchMedia('(prefers-color-scheme: light)').matches` and immediately applies `document.documentElement.setAttribute('data-theme', theme)`.
2. **Context Synchronization:** `src/theme/ThemeProvider.tsx` attaches to the DOM attribute and updates `localStorage` on any user toggle, supporting both SSR environments (safely returning `'dark'`) and client browsers.

### 4.3 Reduced Motion Support
* Global CSS override in `src/index.css`: If `prefers-reduced-motion: reduce` is detected, animations and transitions are clamped to `0.01ms` and `scroll-behavior: auto`.
* Framer Motion components query `useReducedMotion()` from `framer-motion` and disable `initial`, `animate`, and `whileInView` transformation offsets when requested.

---

## 5. Detailed Component & Section Breakdown

### 5.1 Header & Navigation (`src/components/Header.tsx` & `ThemeToggle.tsx`)
* **Position:** Fixed sticky top navbar with backdrop blur (`bg-bg-base/80 backdrop-blur`) and bottom border.
* **Sections Tracked:** `#home`, `#work`, `#skills`, `#about`, `#freelance`, `#contact`.
* **Intersection Observer:** An observer with root margin `-40% 0px -50% 0px` continuously highlights the current visible section in the navigation menu.
* **Responsive Behavior:** Full desktop menu; compact mobile view with hamburger button, toggling an accessible dropdown navigation.
* **Theme Toggle Button:** Integrated Sun/Moon toggle with SVG icons and dynamic `aria-label`.

---

### 5.2 Hero Section (`src/components/Hero.tsx`)
* **ID:** `home`
* **Badge:** `"Open to full-time roles & freelance projects"`
* **Headline:**
  * Sub-heading: `"Prithiviraj P M · Full Stack Developer in Chennai"`
  * Main `<h1>`: `"I build secure, full-stack web applications — from database to UI."`
* **Value Pitch:** Full-stack developer skilled in Python, JavaScript, and MongoDB, with hands-on experience in REST APIs, AES encryption, and JWT authentication. Recent Computer Science graduate looking to bring strong fundamentals to a growth-driven team.
* **Tags:** `['Python', 'JavaScript', 'MongoDB', 'JWT Auth']`
* **CTAs:**
  * `"View case studies"` (Smooth scroll anchor to `#work`)
  * `"Download resume"` (Direct download anchor for `/resume.pdf`)
* **Visual Asset:** Circular avatar (`/avatar-640.webp`), 280x280px with emerald border, shadow, and `fetchPriority="high"`.

---

### 5.3 Selected Work / Case Studies (`src/components/ProjectsSection.tsx`, `ProjectCase.tsx`, `DemoFrame.tsx`)
* **ID:** `work`
* **Heading:** `"Selected work"`
* **Subtitle:** `"Each project below is the actual running component — try it."`
* **Architecture:** Renders `ProjectCase` cards containing a problem-process-decisions explanation on one side, and the live React component inside `DemoFrame` on the other.

#### Case Study 1: JWT-Authenticated Login UI
* **Component:** [`src/components/LoginForm.tsx`](file:///c:/Users/pmpri/OneDrive/Desktop/Prithivi%20Projects/digital-portfolio/src/components/LoginForm.tsx)
* **Tags:** `['React', 'TypeScript', 'Tailwind CSS', 'Accessible (WCAG AA)']`
* **Problem:** The original version was a CSS-only floating-label form with no JavaScript at all — no validation, no error states, no password visibility, nothing that reflected how a real login flow behaves.
* **Process:** Rebuilt as a controlled React form: regex-driven email and password rules, validate-on-blur with live re-validation once a field has been touched, and an async submit flow with a genuine loading state instead of an instant fake success.
* **Decisions:** Chose validate-on-blur-then-live over instant keystroke validation to avoid interrupting users mid-input. Modeled the submit as a real network round-trip (disabled inputs, spinner) because that's what production auth actually looks like. Informed by hands-on experience implementing JWT authentication with role-based access control in a separate project — an AES-256 encrypted file storage system built with Python, MongoDB, and a REST API.
* **Validation Rules ([`src/lib/validation.ts`](file:///c:/Users/pmpri/OneDrive/Desktop/Prithivi%20Projects/digital-portfolio/src/lib/validation.ts)):**
  * Email: Required, must match `^[^\s@]+@[^\s@]+\.[^\s@]+$`
  * Password: Required, minimum 8 characters, at least one uppercase letter (`/[A-Z]/`), at least one lowercase letter (`/[a-z]/`), at least one digit (`/[0-9]/`), at least one special character (`/[^A-Za-z0-9]/`).
* **Accessibility & UX Features:**
  * Inputs bound to `aria-invalid` and `aria-describedby` pointing to error IDs.
  * Form errors rendered with `role="alert"`.
  * Status messages announced with `role="status"`.
  * Focus shifts automatically to the first invalid input on failed submission.
  * Password show/hide toggle with `aria-pressed` and dynamic SVG eye icon.
  * Disabled inputs and animated spinner during simulated 1200ms async request.

#### Case Study 2: E-Commerce Product Catalog with Real Cart State
* **Component:** [`src/components/shop/ShopDemo.tsx`](file:///c:/Users/pmpri/OneDrive/Desktop/Prithivi%20Projects/digital-portfolio/src/components/shop/ShopDemo.tsx)
* **Tags:** `['React', 'TypeScript', 'useReducer', 'Tailwind CSS']`
* **Problem:** The original page advertised "shopping cart functionality" that was never built — just a static grid of product images and prices with zero interactivity.
* **Process:** Built a cart system on React's `useReducer`: add-to-cart, per-line quantity editing, removal, a live running total, and a cart-count badge with a slide-in drawer.
* **Decisions:** Used `useReducer` instead of scattered `useState` calls because cart state has several related transitions (add, remove, set-quantity) that read more clearly as explicit, testable action types than as ad-hoc handlers spread across the component.
* **Cart Logic ([`src/lib/cart.ts`](file:///c:/Users/pmpri/OneDrive/Desktop/Prithivi%20Projects/digital-portfolio/src/lib/cart.ts)):**
  * `cartReducer(state, action)`:
    * `add`: Increments quantity if item is already in cart, otherwise appends line with quantity 1.
    * `remove`: Filters out product by `productId`.
    * `setQuantity`: If quantity <= 0 removes item; otherwise updates target line quantity.
  * `cartTotal(state)`: Calculates `sum(product.price * quantity)`.
  * `cartCount(state)`: Calculates `sum(quantity)`.
* **Catalog Data ([`src/components/shop/products.ts`](file:///c:/Users/pmpri/OneDrive/Desktop/Prithivi%20Projects/digital-portfolio/src/components/shop/products.ts)):**
  1. Running Shoes — \$45.00 (`/shop/running-shoes.webp`)
  2. Sports Shoes — \$50.00 (`/shop/sports-shoes.jpeg`)
  3. Sneakers — \$47.50 (`/shop/sneakers.webp`)
  4. Puma Slippers — \$13.00 (`/shop/puma-slippers.webp`)
  5. Woodland Premium Shoes — \$12.00 (`/shop/woodland-premium.jpeg`)
  6. School Shoes — \$40.00 (`/shop/school-shoes.webp`)

---

### 5.4 Skills Section (`src/components/SkillsSection.tsx`)
* **ID:** `skills`
* **Heading:** `"Skills"`
* **Subtitle:** `"Tied to the work above, not self-rated percentages."`
* **Categories & Evidence Grid:**

| Category | Skill | Stated Evidence |
| :--- | :--- | :--- |
| **Languages & Web** | Python | Encrypted file storage & face recognition projects |
| | JavaScript (ES6+) | Site-wide — all interactive features |
| | TypeScript | This portfolio rebuild |
| | HTML5 / CSS3 | All projects |
| | ASP.NET | Coursework |
| **Full-Stack & Security** | MongoDB | Encrypted file storage — schema design |
| | REST APIs | Encrypted file storage project |
| | JWT authentication | Encrypted file storage — role-based access control |
| | AES-256 encryption | Encrypted file storage project |
| | SQL Server / Oracle | Coursework |
| **Tools & In Progress** | React + Tailwind CSS | Built this entire portfolio (login & cart demos above) |
| | Node.js | In progress — MERN Stack Training, Shavin Infotech |
| | Git / GitHub | Version control across all projects |
| | Bootstrap / jQuery | Coursework |
| | Figma / Canva | Design assets for this site |
| **Education & Certifications** | Bachelor's in Computer Science | Sridevi Arts and Science College, Ponneri |
| | MERN Stack Training | Shavin Infotech |
| | Full Stack Development Masterclass | NoviTech R&D Pvt Ltd |

---

### 5.5 About Section (`src/components/AboutSection.tsx`)
* **ID:** `about`
* **Visual:** Portrait image (`/avatar-640.webp`), 320x320px with rounded card border and shadow.
* **Narrative Content:**
  * Computer Science graduate from Sridevi Arts and Science College, Ponneri (University of Madras).
  * Hands-on full-stack development in Python, JavaScript, and MongoDB.
  * Flagship project: Encrypted file storage system featuring AES-256 encryption and JWT-based role-based access control (RBAC).
  * Computer vision project: Face-recognition automated attendance system built with OpenCV.
  * Self-directed learning path: Built this portfolio to master modern React 19, TypeScript, and Tailwind CSS on top of training from Shavin Infotech and NoviTech R&D.
  * Geographic base: Ambattur, Chennai; actively open to relocating for full-time opportunities.
* **Key Metric Counters:**
  * `3` Projects built
  * `2` Certifications completed
  * `AES-256` Encryption implemented

---

### 5.6 Freelance Web Development Section (`FreelanceSection.tsx`)
* **ID:** `freelance`
* **Heading:** `"Freelance web development in Chennai"`
* **Subtitle:** Contextualizes availability for contract/freelance work alongside the full-time job search.
* **Services Provided:**
  1. **Business websites & landing pages:** Responsive, accessible, fast-loading sites with search-ready metadata — like this one.
  2. **Web apps with secure login:** User accounts, JWT authentication, and role-based access — see the login demo above.
  3. **Product catalogs & shopping carts:** Browsable product listings with working cart state — see the catalog demo above.
  4. **Python & MongoDB back-ends:** REST APIs, database design, and encrypted file storage for data you need to protect.
* **Call to Action:** `"Tell me about your project"` (Direct scroll link to `#contact`).

---

### 5.7 Contact Section (`src/components/ContactSection.tsx` & `contactValidation.ts`)
* **ID:** `contact`
* **Heading:** `"Get in touch"`
* **Subtitle:** Open to entry-level Software Developer / Web Developer roles in Chennai or elsewhere, and to freelance projects.
* **Form Architecture:**
  * Client-side validation across all three fields: `name`, `email`, `message`.
  * Validate-on-blur and live re-validation once touched.
  * Input rules ([`src/lib/contactValidation.ts`](file:///c:/Users/pmpri/OneDrive/Desktop/Prithivi%20Projects/digital-portfolio/src/lib/contactValidation.ts)):
    * Name: Required (`validateName`)
    * Email: Required, valid email pattern (`validateContactEmail`)
    * Message: Required, minimum 10 characters (`validateMessage`)
  * Submission Behavior: Fully static/client-side (no third-party form handler or backend required). Constructs an encoded mailto URL and sets `window.location.href`:
    ```ts
    const subject = encodeURIComponent(`Portfolio contact from ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
    window.location.href = `mailto:pmprithiviraj@gmail.com?subject=${subject}&body=${body}`
    ```
* **Direct Social Buttons:** GitHub, LinkedIn, Facebook, Instagram, and WhatsApp.

---

### 5.8 Footer (`src/components/Footer.tsx`)
* Dynamic current year copyright: `© {new Date().getFullYear()} Prithiviraj P M. All rights reserved.`
* Direct hyperlink to public GitHub source repository.

---

## 6. SEO, GEO (Generative Engine Optimization) & Metadata

### 6.1 Meta Tags & Open Graph
Configured in [`index.html`](file:///c:/Users/pmpri/OneDrive/Desktop/Prithivi%20Projects/digital-portfolio/index.html):
* **Page Title:** `Prithiviraj P M — Full Stack Developer in Chennai | Python, React, MongoDB`
* **Meta Description:** `Prithiviraj P M is a full stack developer in Ambattur, Chennai, skilled in Python, JavaScript, React, and MongoDB, with hands-on experience in REST APIs, AES encryption, and JWT authentication. Open to full-time roles, relocation, and freelance projects.`
* **Robots Directives:** `index, follow, max-image-preview:large`
* **Canonical URL:** `https://digital-portfolio-nine-navy.vercel.app/`
* **Open Graph:**
  * `og:type`: `profile`
  * `og:site_name`: `Prithiviraj P M`
  * `og:title`: `Prithiviraj P M — Full Stack Developer in Chennai`
  * `og:description`: `Chennai-based full stack developer skilled in Python, JavaScript, React, and MongoDB. Open to full-time roles and freelance projects. View live, interactive case studies.`
  * `og:url`: `https://digital-portfolio-nine-navy.vercel.app/`
  * `og:image`: `https://digital-portfolio-nine-navy.vercel.app/og-image.jpg` (1200x1200px)
  * `profile:first_name`: `Prithiviraj`
  * `profile:last_name`: `P M`
* **Twitter Card:**
  * `twitter:card`: `summary`
  * `twitter:title` & `twitter:description` matching profile.
  * `twitter:image`: `https://digital-portfolio-nine-navy.vercel.app/og-image.jpg`

### 6.2 Structured Data (JSON-LD)
A single `@graph` array contains interconnected Schema.org entities:
1. **`WebSite` Entity:**
   * `@id`: `.../#website`
   * `name`: `Prithiviraj P M — Portfolio`
   * `publisher`: Points to `.../#person`
2. **`ProfilePage` Entity:**
   * `@id`: `.../#profilepage`
   * `isPartOf`: Points to `.../#website`
   * `mainEntity`: Points to `.../#person`
   * `dateModified`: `2026-09-27`
3. **`Person` Entity:**
   * `@id`: `.../#person`
   * `name`: `Prithiviraj P M`
   * `jobTitle`: `Full Stack Developer`
   * `address`: Ambattur, Chennai, Tamil Nadu, IN
   * `alumniOf`: Sridevi Arts and Science College, Ponneri & University of Madras
   * `knowsAbout`: `["Python", "JavaScript", "TypeScript", "React", "MongoDB", "REST APIs", "JWT authentication", "AES-256 encryption", "Tailwind CSS"]`
   * `makesOffer`: Offer for Freelance web development (serviceType: Website and web application development, areaServed: Chennai).
   * `sameAs`: GitHub & LinkedIn profiles.

### 6.3 Automated SEO Regression Suite (`scripts/check-seo.mjs`)
Executed automatically in CI on every push and PR:
1. **Sitemap Verification:** Asserts `sitemap.xml` exists, uses valid sitemaps.org 0.9 schema, contains canonical URLs, and parses valid W3C `<lastmod>` dates.
2. **Robots.txt Verification:** Ensures sitemap URL is declared and the root path is not blocked.
3. **Index.html Integrity:**
   * Confirms exactly one canonical link tag pointing to the production domain.
   * Confirms absence of accidental `noindex`.
   * Checks title length (> 10 chars) and meta description length (> 50 chars).
   * Verifies the prerender placeholder `<!--app-html-->` was successfully replaced with prerendered content.
   * Asserts there is exactly one `<h1>` tag in the rendered page.
   * Asserts all six core section anchors exist: `#home`, `#work`, `#skills`, `#about`, `#freelance`, `#contact`.
   * Parses all JSON-LD scripts to verify valid JSON formatting.
   * Verifies that the file specified in `og:image` exists on disk in the build output.

---

## 7. Operational & Development Guide

### 7.1 NPM Scripts Reference
```bash
npm run dev        # Starts Vite local development server with instant HMR
npm run build      # Full production build:
                   # 1. tsc -b (strict TypeScript verification)
                   # 2. vite build (client asset compilation)
                   # 3. vite build --ssr src/entry-server.tsx --outDir dist-ssr (SSR bundle)
                   # 4. node scripts/prerender.mjs (injects prerendered HTML into dist/index.html)
npm run preview    # Serves the compiled dist/ directory locally
npm run lint       # Runs ESLint across all files
npm run check:seo  # Executes the SEO regression test suite against dist/
```

### 7.2 Deployment Configuration
* **Provider:** Vercel
* **Framework Preset:** Vite
* **Root Directory:** `./`
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* **Environment Variables:** None required. The site is fully static and zero-dependency at runtime.

---

## 8. Summary of Highlighted Projects Outside the Repo

While this repository contains the portfolio codebase itself, it highlights two major external projects built by Prithiviraj:
1. **AES-256 Encrypted File Storage System:**
   * Built with Python, MongoDB, and REST APIs.
   * Features client-side/server-side AES-256 file encryption.
   * JWT authentication with role-based access control (RBAC).
   * Served as the direct architectural basis for the portfolio's login case study and security skills.
2. **Face-Recognition Attendance System:**
   * Built with Python and OpenCV.
   * Automated student/attendee identity recognition and timestamped attendance logging.
