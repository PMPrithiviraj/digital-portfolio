import { motion, useReducedMotion } from 'framer-motion'
import { playClickActuate, playHoverTick } from '../lib/soundEngine'

const stats = [
  { value: '21', label: 'Age / Chennai, India' },
  { value: '3+', label: 'Production Projects' },
  { value: '2+', label: 'Years Coding Experience' },
  { value: '256', label: 'AES Bit Encryption Depth' },
]

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: 'easeOut' as const },
        }

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 sm:pt-32 pb-14 px-4 sm:px-6 flex flex-col justify-between overflow-hidden bg-bg-base"
    >
      {/* Background Subtle Radial Gradient behind Hero */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--color-accent-dim)_0%,transparent_70%)] opacity-10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Clean Typographic Hierarchy & Action */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Subtitle badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card px-3 py-1 font-mono text-xs tracking-wider text-ink-secondary">
                <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
                <span>Full-Stack Developer in Chennai</span>
              </span>
            </motion.div>

            {/* Headline Lines */}
            <motion.div {...fadeUp(0.1)} className="mt-4">
              <p className="font-mono text-base sm:text-xl text-ink-secondary">
                Hello I&apos;m
              </p>
              <h2 className="mt-1 font-mono text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-ink-primary break-words">
                Prithiviraj <span className="text-accent underline decoration-accent/40 decoration-wavy underline-offset-8">P M</span>
              </h2>

              {/* EXACT SINGLE <h1> IN THE ENTIRE DOM FOR SEO COMPLIANCE */}
              <h1 className="mt-3 sm:mt-4 font-mono text-sm sm:text-base lg:text-lg font-medium text-accent">
                I build secure, full-stack web applications — from database to UI.
              </h1>
            </motion.div>

            {/* Concise Bio */}
            <motion.p
              {...fadeUp(0.2)}
              className="mt-4 sm:mt-5 max-w-xl text-xs sm:text-base text-ink-secondary leading-relaxed font-sans mx-auto lg:mx-0"
            >
              Full-stack developer skilled in <strong className="text-ink-primary font-medium">Python, JavaScript, React, and MongoDB</strong>, with proven experience building REST APIs, AES-256 encryption, and secure JWT authentication. Computer Science graduate based in Chennai, ready for high-impact production roles.
            </motion.p>

            {/* Action Row: Pill Button + Circular Social Icons */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              {/* Primary Pill Button */}
              <a
                href="#contact"
                onClick={playClickActuate}
                onMouseEnter={playHoverTick}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-7 sm:px-8 py-3 sm:py-3.5 font-mono text-xs sm:text-sm font-bold text-black tracking-wider shadow-[0_0_20px_var(--color-accent-dim)] hover:shadow-[0_0_30px_var(--color-accent)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>CONTACT ME</span>
                <span className="text-sm font-black">&gt;</span>
              </a>

              {/* Circular Social Buttons (All min 44px) */}
              <div className="flex items-center gap-2">
                {/* GitHub */}
                <a
                  href="https://github.com/PMPrithiviraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickActuate}
                  onMouseEnter={playHoverTick}
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-ink-secondary hover:border-accent hover:text-accent hover:scale-110 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/prithivirajpm"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickActuate}
                  onMouseEnter={playHoverTick}
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-ink-secondary hover:border-accent hover:text-accent hover:scale-110 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:pmprithiviraj@gmail.com"
                  onClick={playClickActuate}
                  onMouseEnter={playHoverTick}
                  aria-label="Send Email"
                  title="Send Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-ink-secondary hover:border-accent hover:text-accent hover:scale-110 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>

                {/* Resume.pdf */}
                <a
                  href="/resume.pdf"
                  download
                  onClick={playClickActuate}
                  onMouseEnter={playHoverTick}
                  aria-label="Download Resume PDF"
                  title="Download Resume (PDF)"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-ink-secondary hover:border-accent hover:text-accent hover:scale-110 transition-all font-mono text-xs font-bold"
                >
                  CV
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Rotating Dashed SVG Avatar Rig */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-5 flex justify-center">
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer Counter-Rotating Segmented Dashed Ring */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none animate-spin-ccw"
                viewBox="0 0 400 400"
                fill="none"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="185"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeDasharray="12 16"
                  opacity="0.35"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="165"
                  stroke="var(--color-border-subtle)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
              </svg>

              {/* Inner Clockwise Rotating Ring */}
              <svg
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none animate-spin-cw"
                viewBox="0 0 360 360"
                fill="none"
              >
                <circle
                  cx="180"
                  cy="180"
                  r="150"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeDasharray="24 20"
                  opacity="0.6"
                />
                {/* Micro Reticle Markers */}
                <path d="M 180 10 L 180 25" stroke="var(--color-accent)" strokeWidth="2" />
                <path d="M 180 335 L 180 350" stroke="var(--color-accent)" strokeWidth="2" />
                <path d="M 10 180 L 25 180" stroke="var(--color-accent)" strokeWidth="2" />
                <path d="M 335 180 L 350 180" stroke="var(--color-accent)" strokeWidth="2" />
              </svg>

              {/* Circular Avatar Container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-accent/40 shadow-[0_0_35px_var(--color-accent-dim)] bg-bg-card">
                <img
                  src="/avatar-640.webp"
                  alt="Prithiviraj P M — Full Stack Developer in Chennai"
                  width={320}
                  height={320}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover filter contrast-105"
                />
                {/* Subtle Scanlines Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] opacity-25" />
              </div>

              {/* Status Pill Floating at Bottom */}
              <div className="absolute -bottom-3 rounded-full border border-border-subtle bg-bg-card px-3 py-1 font-mono text-[10px] text-accent tracking-wider shadow-lg flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>READY TO DEPLOY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Metrics Strip: 4-Column Responsive Cards */}
      <motion.div
        {...fadeUp(0.4)}
        className="relative z-10 mx-auto mt-10 sm:mt-12 w-full max-w-7xl rounded-2xl border border-border-subtle bg-bg-card/85 backdrop-blur-sm p-4 sm:p-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-2">
              <div className="font-mono text-2xl sm:text-4xl font-extrabold text-ink-primary tracking-tight flex items-center justify-center gap-0.5">
                <span className="text-accent">{stat.value}</span>
              </div>
              <p className="mt-1 font-mono text-[10px] sm:text-xs text-ink-muted uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
