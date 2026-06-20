import { motion, useReducedMotion } from 'framer-motion'

export default function AboutSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="bg-bg-raised px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <motion.img
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          src="/avatar.png"
          alt="Prithiviraj P M"
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
          className="mx-auto w-full max-w-xs rounded-card object-cover shadow-xl"
        />

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-display text-3xl text-ink-primary sm:text-4xl">About</h2>
          <p className="mt-4 text-ink-secondary">
            I'm a Computer Science graduate from Sridevi Arts and Science College, Ponneri, with
            hands-on experience building full-stack applications in Python, JavaScript, and
            MongoDB. My strongest project so far is an encrypted file storage system with
            AES-256 encryption and JWT-based role access control — the same auth thinking behind
            the login demo above. I also built a face-recognition attendance system with OpenCV.
          </p>
          <p className="mt-4 text-ink-secondary">
            Most of what I know past coursework came from rebuilding things until they worked
            properly — this portfolio itself is one of those rebuilds, and how I picked up React
            and TypeScript on top of the Python/JavaScript foundation from my MERN Stack Training
            and Full Stack Development Masterclass. Looking for an entry-level Software Developer
            or Web Developer role where I can keep doing that on a real team.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: '3', label: 'Projects built' },
              { value: '2', label: 'Certifications' },
              { value: 'AES-256', label: 'Encryption implemented' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-card bg-bg-card p-4 text-center">
                <dt className="font-display text-2xl text-accent">{stat.value}</dt>
                <dd className="mt-1 text-xs text-ink-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
