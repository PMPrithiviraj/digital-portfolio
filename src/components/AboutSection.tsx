import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { playClickActuate, playHoverTick, playSuccess } from '../lib/soundEngine'

const techPills = [
  'Python',
  'React 19',
  'TypeScript',
  'MongoDB',
  'Tailwind CSS',
  'Node.js',
  'OpenCV',
  'AES-256',
]

const languages = [
  'English',
  'தமிழ் (Tamil)',
  'Español',
  'Deutsch',
  'Français',
  '日本語',
]

export default function AboutSection() {
  const reduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      playClickActuate()
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText('pmprithiviraj@gmail.com')
      }
      playSuccess()
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <section id="about" className="relative px-4 py-20 sm:py-24 sm:px-6 bg-bg-base">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-center lg:text-left">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
            // SHORT PROFILE
          </span>
          <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            About Prithiviraj P M <span className="text-accent">—</span> Full Stack Developer in Chennai
          </h2>
          <p className="mt-2 font-mono text-xs sm:text-sm text-ink-secondary">
            Bento overview of engineering principles, timezone readiness, and active competencies.
          </p>
        </div>

        {/* Asymmetric Bento Grid - Fully Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Bento Card 1: Tall / Circuit Traces Collaboration Card */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            onMouseEnter={playHoverTick}
            className="spotlight-card relative md:row-span-2 overflow-hidden rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 flex flex-col justify-between group min-h-[300px]"
          >
            {/* Background Circuit Board SVG traces */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-15 sm:opacity-20 transition-opacity duration-500 group-hover:opacity-35"
              viewBox="0 0 400 600"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
            >
              <path d="M50 0 V120 L120 190 H280 L350 260 V400 L250 500 H50" />
              <path d="M350 50 V180 L250 280 H180 L100 360 V600" />
              <circle cx="120" cy="190" r="4" fill="var(--color-accent)" />
              <circle cx="280" cy="190" r="4" fill="var(--color-accent)" />
              <circle cx="350" cy="260" r="4" fill="var(--color-accent)" />
              <circle cx="250" cy="280" r="4" fill="var(--color-accent)" />
              <circle cx="100" cy="360" r="4" fill="var(--color-accent)" />
            </svg>

            <div className="relative z-10">
              <span className="inline-block rounded-full border border-border-subtle bg-bg-raised px-3 py-1 font-mono text-[10px] text-accent font-semibold tracking-wider">
                CORE PHILOSOPHY
              </span>
              <h3 className="mt-4 sm:mt-6 font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-ink-primary leading-snug">
                I prioritize client collaboration, fostering open communication
              </h3>
              <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Whether deploying robust encryption protocols or responsive frontend components, I believe transparent dialogue and iterative feedback loops turn complex requirements into clean, reliable code.
              </p>
            </div>

            <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-border-subtle flex items-center justify-between font-mono text-xs text-ink-muted">
              <span>Sridevi Arts &amp; Science College</span>
              <span className="text-accent font-semibold">B.Sc. CS</span>
            </div>
          </motion.div>

          {/* Bento Card 2: Multilingual / Global Timezone Card */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={playHoverTick}
            className="spotlight-card relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 flex flex-col justify-between group"
          >
            {/* Background Language Watermarks */}
            <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity flex flex-wrap gap-2.5 p-4 font-mono text-xs sm:text-sm leading-loose">
              {languages.map((lang, idx) => (
                <span key={idx} className="text-ink-primary whitespace-nowrap">
                  {lang}
                </span>
              ))}
            </div>

            <div className="relative z-10">
              <span className="inline-block rounded-full border border-border-subtle bg-bg-raised px-3 py-1 font-mono text-[10px] text-accent font-semibold tracking-wider">
                GLOBAL MOBILITY
              </span>
              <h3 className="mt-4 font-mono text-lg sm:text-2xl font-bold text-ink-primary">
                Flexible with time zones &amp; open to relocate
              </h3>
              <p className="mt-3 font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Based in Chennai, India (UTC+5:30), but experienced in asynchronous workflows, remote collaboration, and ready to relocate for full-time software engineering roles.
              </p>
            </div>

            <div className="relative z-10 mt-6 flex items-center gap-2 font-mono text-xs text-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span>COMMUNICATION: READY</span>
            </div>
          </motion.div>

          {/* Bento Card 3: Tech Stack & Constant Learner */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={playHoverTick}
            className="spotlight-card relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block rounded-full border border-border-subtle bg-bg-raised px-3 py-1 font-mono text-[10px] text-accent font-semibold tracking-wider">
                TOOLKIT
              </span>
              <h3 className="mt-4 font-mono text-lg sm:text-2xl font-bold text-ink-primary">
                My Tech Stack
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-sm text-ink-secondary">
                I constantly try to improve and adopt modern, production-grade frameworks.
              </p>

              {/* Floating Tech Stack Pills */}
              <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                {techPills.map((tech) => (
                  <span
                    key={tech}
                    onMouseEnter={playHoverTick}
                    className="rounded-full border border-border-subtle bg-bg-raised px-3 py-1 font-mono text-xs text-ink-primary hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-border-subtle font-mono text-[11px] text-ink-muted flex items-center justify-between">
              <span>ACTIVE VERSION</span>
              <span className="text-accent font-semibold">REACT 19 + PY 3.12</span>
            </div>
          </motion.div>

          {/* Bento Card 4: Passion & Security Defense */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={playHoverTick}
            className="spotlight-card relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block rounded-full border border-border-subtle bg-bg-raised px-3 py-1 font-mono text-[10px] text-accent font-semibold tracking-wider">
                CYBER &amp; CODE
              </span>
              <h3 className="mt-4 font-mono text-lg sm:text-2xl font-bold text-ink-primary">
                Tech enthusiast with a passion for development &amp; cyber defense
              </h3>
              <p className="mt-3 font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Specialized in zero-trust architecture, role-based access control, cryptographic key generation, and OpenCV biometric attendance algorithms.
              </p>

              {/* Mini Terminal Code Snippet */}
              <div className="mt-4 sm:mt-5 rounded-lg border border-border-subtle bg-bg-base/80 p-3 font-mono text-[11px] text-accent/90">
                <p className="text-ink-muted">// cryptographic vault cipher</p>
                <p className="text-ink-primary mt-1">
                  <span className="text-accent">const</span> cipher = createCipheriv(&apos;aes-256-gcm&apos;, key, iv);
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-border-subtle font-mono text-[11px] text-ink-muted">
              <span>CERTIFIED: NOVITECH R&amp;D &amp; SHAVIN INFOTECH</span>
            </div>
          </motion.div>

          {/* Bento Card 5: Interactive Start a Project & Quick Email Copy */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onMouseEnter={playHoverTick}
            className="spotlight-card relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <span className="inline-block rounded-full border border-border-subtle bg-bg-raised px-3 py-1 font-mono text-[10px] text-accent font-semibold tracking-wider">
                INSTANT ACTION
              </span>
              <h3 className="mt-4 font-mono text-lg sm:text-2xl font-bold text-ink-primary">
                Do you want to start a project together?
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-sm text-ink-secondary">
                Let&apos;s build something high-performance, secure, and memorable. One click copies my direct inbox address.
              </p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={playHoverTick}
                className={`w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full py-3 px-5 sm:px-6 font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 ${
                  copied
                    ? 'bg-accent text-black shadow-[0_0_25px_var(--color-accent)]'
                    : 'bg-bg-raised text-ink-primary border border-border-subtle hover:border-accent hover:text-accent'
                }`}
              >
                {copied ? (
                  <>
                    <span>Copied to clipboard!</span>
                    <span className="font-bold">✓</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <span>Copy my email address</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
