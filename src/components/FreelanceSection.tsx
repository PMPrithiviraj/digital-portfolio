import { motion, useReducedMotion } from 'framer-motion'
import { playClickActuate, playHoverTick } from '../lib/soundEngine'

const services = [
  {
    title: 'Business Websites & Landing Pages',
    tag: 'Web / SSG',
    description:
      'Ultra-fast, fully responsive, accessible websites with SSG prerendering and rich search-ready structured metadata — built to rank and convert.',
    deliverable: 'React 19 • Next-Gen CSS • SEO Audited',
  },
  {
    title: 'Web Apps with Secure Authentication',
    tag: 'Full-Stack / Security',
    description:
      'Robust web applications featuring protected routes, JWT tokens, session management, and role-based access control.',
    deliverable: 'JWT Auth • RBAC • Password Strength Engine',
  },
  {
    title: 'E-Commerce Catalogs & Cart Systems',
    tag: 'Frontend Engineering',
    description:
      'Browsable interactive product grids with real client-side state management, quantity adjustment, and seamless checkout flows.',
    deliverable: 'useReducer Cart • Drawer UX • Fast Filtering',
  },
  {
    title: 'Python & MongoDB Backends',
    tag: 'Backend & Data',
    description:
      'Production-ready REST APIs, efficient database schema design, and AES-256 encryption for data that requires mission-grade security.',
    deliverable: 'REST APIs • MongoDB Schemas • AES-256 Ciphers',
  },
]

export default function FreelanceSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="freelance" className="relative bg-bg-base px-4 py-20 sm:py-24 sm:px-6">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center lg:text-left">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
            // FREELANCE &amp; CONTRACTS
          </span>
          <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            Services <span className="text-accent">&amp;</span> Custom Development
          </h2>
          <p className="mt-2 font-mono text-xs sm:text-sm text-ink-secondary max-w-2xl">
            Need a reliable website or web application? I take on freelance contracts alongside full-time role opportunities. Based in Chennai, delivering worldwide.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={playHoverTick}
              className="spotlight-card relative rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4">
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                    {service.tag}
                  </span>
                  <span className="font-mono text-[11px] text-ink-muted">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-mono text-lg sm:text-2xl font-bold text-ink-primary group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                <p className="mt-3 font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-ink-muted">{service.deliverable}</span>
                <a
                  href="#contact"
                  onClick={playClickActuate}
                  className="flex min-h-[44px] items-center text-accent font-semibold hover:underline gap-1"
                >
                  <span>Inquire</span>
                  <span>&gt;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Pill */}
        <div className="mt-12 sm:mt-14 text-center">
          <a
            href="#contact"
            onClick={playClickActuate}
            onMouseEnter={playHoverTick}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-mono text-xs sm:text-sm font-bold text-black tracking-wider shadow-[0_0_20px_var(--color-accent-dim)] hover:shadow-[0_0_30px_var(--color-accent)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>START A PROJECT WITH ME</span>
            <span className="font-black">&gt;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
