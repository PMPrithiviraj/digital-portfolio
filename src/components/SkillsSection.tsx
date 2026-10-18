import { motion, useReducedMotion } from 'framer-motion'
import { playHoverTick } from '../lib/soundEngine'

const pillars = [
  {
    title: 'Software Architecture & Full-Stack',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    description:
      'Designing robust full-stack applications with modular components, type-safe data flows, and clean RESTful API contracts from database to UI.',
  },
  {
    title: 'Cryptographic Security & Identity',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    description:
      'Hands-on expertise implementing AES-256 cipher encryption, PBKDF2 salt derivation, and zero-trust role-based access control with JSON Web Tokens.',
  },
  {
    title: 'Computer Vision & AI Pipelines',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    description:
      'Developing real-time OpenCV face recognition systems, facial landmark embeddings, dataset preprocessing, and automated attendance logging at 30+ FPS.',
  },
  {
    title: 'Rapid Prototyping & Asynchronous Flow',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    description:
      'Honing systems from scratch with Git discipline, automated checks, WCAG AA accessibility audits, and clear communication across remote timezones.',
  },
]

const skillGroups = [
  {
    category: 'Languages',
    items: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 / CSS3', 'ASP.NET'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React 19', 'Tailwind CSS v4', 'Node.js', 'OpenCV', 'NumPy', 'Framer Motion'],
  },
  {
    category: 'Databases & Security',
    items: ['MongoDB', 'REST APIs', 'AES-256-GCM', 'JWT RBAC', 'SQL Server / Oracle'],
  },
  {
    category: 'Education & Credentials',
    items: [
      "B.Sc. Computer Science (Sridevi College, Ponneri)",
      'MERN Stack Training (Shavin Infotech)',
      'Full Stack Masterclass (NoviTech R&D Pvt Ltd)',
    ],
  },
]

export default function SkillsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="relative bg-bg-base px-4 py-20 sm:py-24 sm:px-6">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center lg:text-left">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
            // CAPABILITIES
          </span>
          <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            What I Bring <span className="text-accent">&amp;</span> Technical Arsenal
          </h2>
          <p className="mt-2 font-mono text-xs sm:text-sm text-ink-secondary max-w-2xl">
            Battle-tested competencies backed by actual production and engineering implementations.
          </p>
        </div>

        {/* 1. Top Row: 4 Vertical Spotlight Cards */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={playHoverTick}
              className="spotlight-card relative rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border-subtle bg-bg-raised text-accent group-hover:scale-110 group-hover:border-accent transition-all">
                  {pillar.icon}
                </div>

                <h3 className="mt-4 sm:mt-5 font-mono text-base sm:text-lg font-bold text-ink-primary group-hover:text-accent transition-colors leading-snug">
                  {pillar.title}
                </h3>

                <p className="mt-2 sm:mt-3 font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-border-subtle font-mono text-[11px] text-ink-muted flex items-center justify-between">
                <span>VERIFIED</span>
                <span className="text-accent">● ACTIVE</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Bottom Row: Grouped Competency Badges */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8">
          <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-4">
            <h3 className="font-mono text-lg sm:text-xl font-bold text-ink-primary">
              Categorized Skill &amp; Accreditation Matrix
            </h3>
            <span className="font-mono text-[11px] sm:text-xs text-accent">
              ZERO ARBITRARY PERCENTAGES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider block mb-3">
                  // {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      onMouseEnter={playHoverTick}
                      className="rounded-full border border-border-subtle bg-bg-raised px-3 sm:px-3.5 py-1 sm:py-1.5 font-mono text-xs text-ink-primary hover:border-accent hover:text-accent transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
