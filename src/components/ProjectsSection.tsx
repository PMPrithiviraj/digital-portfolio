import { motion, useReducedMotion } from 'framer-motion'
import LoginForm from './LoginForm'
import ProjectCase from './ProjectCase'
import ShopDemo from './shop/ShopDemo'
import { playHoverTick } from '../lib/soundEngine'

const REPO = 'https://github.com/PMPrithiviraj/digital-portfolio/blob/main/src'

const experienceProjects = [
  {
    title: 'AES-256 Encrypted Cloud Storage System',
    role: 'Full Stack Security Engineer',
    period: 'Production Project',
    tech: ['Python', 'MongoDB', 'REST API', 'AES-256-GCM', 'JWT RBAC'],
    description:
      'High-security cloud storage architecture implementing client-side chunking, cryptographic key derivation, and granular role-based access control.',
    highlights: [
      'Zero-trust encrypted file chunking prior to database persistence',
      'End-to-end PBKDF2 secret key derivation with unique salt generation',
      'JWT-authenticated role access control protecting administrative endpoints',
      'Automated REST API test suite verifying cipher integrity and token expiry',
    ],
  },
  {
    title: 'Automated Face Recognition Biometric Attendance System',
    role: 'Computer Vision Developer',
    period: 'AI / CV Project',
    tech: ['Python', 'OpenCV', 'Deep Learning', 'NumPy', 'Tkinter / SQLite'],
    description:
      'Real-time automated attendance tracking pipeline leveraging computer vision models to accurately detect, recognize, and log identities without human intervention.',
    highlights: [
      'Dual-stage facial detection pipeline combining Haar Cascades with LBPH embeddings',
      'Automated daily timestamped CSV & SQLite attendance audit logging',
      'Real-time multi-face classification operating smoothly at 30+ FPS',
      'Anti-spoofing liveness verification guarding against static photo attacks',
    ],
  },
]

export default function ProjectsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="work" className="relative bg-bg-base px-4 py-20 sm:py-24 sm:px-6">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center lg:text-left">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
            // SELECTED WORK
          </span>
          <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            Interactive Demos <span className="text-accent">&amp;</span> Production Systems
          </h2>
          <p className="mt-2 font-mono text-xs sm:text-sm text-ink-secondary max-w-2xl">
            Live running components and production-grade architectures. Test the inputs directly.
          </p>
        </div>

        {/* 1. Interactive Sandbox Case Studies */}
        <div className="mt-10 sm:mt-12 space-y-10 sm:space-y-12">
          <ProjectCase
            title="JWT-authenticated login UI"
            summary="A production-grade login form, rebuilt from a static markup exercise into real validated logic."
            tags={['React 19', 'TypeScript', 'Tailwind CSS', 'Accessible (WCAG AA)']}
            problem="The original version was a CSS-only floating-label form with no JavaScript at all — no validation, no error states, no password visibility, nothing that reflected how a real login flow behaves."
            process="Rebuilt as a controlled React form: regex-driven email and password rules, validate-on-blur with live re-validation once a field has been touched, and an async submit flow with a genuine loading state instead of an instant fake success."
            decisions="Chose validate-on-blur-then-live over instant keystroke validation to avoid interrupting users mid-input. Modeled the submit as a real network round-trip (disabled inputs, spinner) because that's what production auth actually looks like. Informed by hands-on experience implementing JWT authentication with role-based access control in a separate project — an AES-256 encrypted file storage system built with Python, MongoDB, and a REST API."
            codeHref={`${REPO}/components/LoginForm.tsx`}
          >
            <div className="flex items-center justify-center p-1 sm:p-4">
              <LoginForm />
            </div>
          </ProjectCase>

          <ProjectCase
            title="E-commerce product catalog with real cart state"
            summary="A static product grid turned into an actually-functional shopping cart."
            tags={['React 19', 'TypeScript', 'useReducer', 'Tailwind CSS']}
            problem="The original page advertised 'shopping cart functionality' that was never built — just a static grid of product images and prices with zero interactivity."
            process="Built a cart system on React's useReducer: add-to-cart, per-line quantity editing, removal, a live running total, and a cart-count badge with a slide-in drawer."
            decisions="Used useReducer instead of scattered useState calls because cart state has several related transitions (add, remove, set-quantity) that read more clearly as explicit, testable action types than as ad-hoc handlers spread across the component."
            codeHref={`${REPO}/components/shop/ShopDemo.tsx`}
          >
            <ShopDemo />
          </ProjectCase>
        </div>

        {/* 2. Horizontal Experience / Production Projects */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-6 sm:mb-8">
            <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
              // PRODUCTION EXPERIENCES
            </span>
            <h3 className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-ink-primary tracking-tight">
              Flagship Security &amp; AI Systems
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {experienceProjects.map((proj, idx) => (
              <motion.div
                key={proj.title}
                initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                onMouseEnter={playHoverTick}
                className="spotlight-card relative rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3 sm:pb-4 mb-4">
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] font-semibold text-accent">
                      {proj.role}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">
                      {proj.period}
                    </span>
                  </div>

                  <h4 className="font-mono text-lg sm:text-2xl font-bold text-ink-primary group-hover:text-accent transition-colors">
                    {proj.title}
                  </h4>

                  <p className="mt-3 font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5 font-sans text-xs sm:text-sm text-ink-secondary">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 border-t border-border-subtle flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border-subtle bg-bg-raised px-2.5 py-0.5 font-mono text-[11px] text-ink-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
