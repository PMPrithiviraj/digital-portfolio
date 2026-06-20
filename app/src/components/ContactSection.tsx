import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { validateContactEmail, validateMessage, validateName } from '../lib/contactValidation'

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>

const validators: Record<Field, (value: string) => string | undefined> = {
  name: validateName,
  email: validateContactEmail,
  message: validateMessage,
}

const socials = [
  { name: 'GitHub', href: 'https://github.com/PMPrithiviraj', color: '#333' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/prithiviraj-p-m-69242a350', color: '#0077b5' },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/Prithivi-Raj/pfbid0Z74B3BWhnZ6u59uKjfKQg2cnrqNHJiXG5XN7xD2qnuQx61CsYQ1xghCqGy29miMpl/',
    color: '#1877f2',
  },
  { name: 'Instagram', href: 'https://www.instagram.com/milky_boy._.05/', color: '#dc2743' },
  { name: 'WhatsApp', href: 'https://wa.me/919003800733', color: '#25d366' },
]

export default function ContactSection() {
  const reduceMotion = useReducedMotion()
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [sent, setSent] = useState(false)

  function handleChange(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }))
    }
  }

  function handleBlur(field: Field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validators[field](values[field]) }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Errors = {
      name: validators.name(values.name),
      email: validators.email(values.email),
      message: validators.message(values.message),
    }
    setErrors(next)
    setTouched({ name: true, email: true, message: true })
    if (Object.values(next).some(Boolean)) return

    const subject = encodeURIComponent(`Portfolio contact from ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
    window.location.href = `mailto:pmprithiviraj@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="bg-bg-base px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-3xl text-ink-primary sm:text-4xl">Get in touch</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-secondary">
          Open to entry-level Software Developer / Web Developer roles — happy to talk about any of the work above.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-card bg-bg-card p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-secondary">
                Name
              </label>
              <input
                id="name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full rounded-control border border-ink-muted/30 bg-bg-raised px-3 py-2.5 text-ink-primary outline-none focus:border-accent"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1.5 text-sm text-danger">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink-secondary">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className="w-full rounded-control border border-ink-muted/30 bg-bg-raised px-3 py-2.5 text-ink-primary outline-none focus:border-accent"
              />
              {errors.email && (
                <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-danger">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-secondary">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={values.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="w-full resize-none rounded-control border border-ink-muted/30 bg-bg-raised px-3 py-2.5 text-ink-primary outline-none focus:border-accent"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1.5 text-sm text-danger">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-control bg-accent py-3 font-medium text-bg-base transition hover:bg-accent-dim sm:w-auto sm:px-8"
          >
            Send message
          </button>
          <p role="status" className="mt-3 text-sm text-ink-muted">
            {sent && 'Opening your email client with this message pre-filled — send it from there.'}
          </p>
        </motion.form>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-control border border-ink-muted/30 px-4 py-2 text-sm text-ink-secondary transition hover:border-accent hover:text-accent"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
