import { motion, useReducedMotion } from 'framer-motion'

// Each service points at existing work so the offer stays evidence-backed.
const services = [
  {
    title: 'Business websites & landing pages',
    detail: 'Responsive, accessible, fast-loading sites with search-ready metadata — like this one.',
  },
  {
    title: 'Web apps with secure login',
    detail: 'User accounts, JWT authentication, and role-based access — see the login demo above.',
  },
  {
    title: 'Product catalogs & shopping carts',
    detail: 'Browsable product listings with working cart state — see the catalog demo above.',
  },
  {
    title: 'Python & MongoDB back-ends',
    detail: 'REST APIs, database design, and encrypted file storage for data you need to protect.',
  },
]

export default function FreelanceSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="freelance" className="bg-bg-base px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl text-ink-primary sm:text-4xl">
          Freelance web development in Chennai
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-ink-secondary">
          Need a website or web application built? I take on freelance projects alongside my job
          search. I'm based in Ambattur, Chennai, and work in React, TypeScript, Python, and MongoDB.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-card bg-bg-card p-6"
            >
              <h3 className="font-display text-lg text-ink-primary">{service.title}</h3>
              <p className="mt-2 text-sm text-ink-secondary">{service.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block rounded-control bg-accent px-6 py-3 font-medium text-bg-base transition hover:bg-accent-dim"
          >
            Tell me about your project
          </a>
        </div>
      </div>
    </section>
  )
}
