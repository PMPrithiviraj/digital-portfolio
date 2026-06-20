import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: 'easeOut' as const },
        }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-bg-base px-6 py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
        <div className="flex-1 text-center lg:text-left">
          <motion.span
            {...fadeUp(0)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent"
          >
            Open to full-time Software Developer roles
          </motion.span>

          <motion.h1 {...fadeUp(0.1)} className="font-display text-4xl font-semibold leading-tight text-ink-primary sm:text-5xl">
            I build secure, full-stack web applications — from database to UI.
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-5 max-w-xl text-lg text-ink-secondary lg:mx-0">
            Full-stack developer skilled in Python, JavaScript, and MongoDB, with hands-on
            experience in REST APIs, AES encryption, and JWT authentication. Recent Computer
            Science graduate looking to bring strong fundamentals to a growth-driven team.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-4 flex flex-wrap justify-center gap-2 font-mono text-xs text-ink-muted lg:justify-start">
            {['Python', 'JavaScript', 'MongoDB', 'JWT Auth'].map((tag) => (
              <span key={tag} className="rounded border border-ink-muted/30 px-2 py-1">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="#work"
              className="rounded-control bg-accent px-6 py-3 font-medium text-bg-base transition hover:bg-accent-dim"
            >
              View case studies
            </a>
            <a
              href="/resume.pdf"
              download
              className="rounded-control border-2 border-accent px-6 py-3 font-medium text-accent transition hover:bg-accent/10"
            >
              Download resume
            </a>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.2)} className="shrink-0">
          <img
            src="/avatar.png"
            alt="Prithiviraj P M"
            width={280}
            height={280}
            className="rounded-full border-4 border-accent object-cover shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
