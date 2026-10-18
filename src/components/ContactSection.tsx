import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { validateContactEmail, validateMessage, validateName } from '../lib/contactValidation'
import { playAlert, playClickActuate, playHoverTick, playSuccess } from '../lib/soundEngine'

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>

const validators: Record<Field, (value: string) => string | undefined> = {
  name: validateName,
  email: validateContactEmail,
  message: validateMessage,
}

const socialLinks = [
  {
    name: 'GitHub',
    ariaLabel: 'Prithiviraj P M on GitHub (@PMPrithiviraj)',
    href: 'https://github.com/PMPrithiviraj',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    ariaLabel: 'Prithiviraj P M on LinkedIn',
    href: 'https://www.linkedin.com/in/prithivirajpm',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    ariaLabel: 'Prithiviraj P M on WhatsApp (+91 9003800733)',
    href: 'https://wa.me/919003800733',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    ariaLabel: 'Prithiviraj P M on Instagram (@milky_boy._.05)',
    href: 'https://www.instagram.com/milky_boy._.05/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    ariaLabel: 'Prithiviraj P M on Facebook',
    href: 'https://www.facebook.com/people/Prithivi-Raj/pfbid0Z74B3BWhnZ6u59uKjfKQg2cnrqNHJiXG5XN7xD2qnuQx61CsYQ1xghCqGy29miMpl/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  const reduceMotion = useReducedMotion()
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [sent, setSent] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  function handleChange(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const err = validators[field](value)
      setErrors((prev) => ({ ...prev, [field]: err }))
      if (err) {
        playAlert()
      }
    }
  }

  function handleBlur(field: Field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const err = validators[field](values[field])
    setErrors((prev) => ({ ...prev, [field]: err }))
    if (err) {
      playAlert()
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    playClickActuate()
    const next: Errors = {
      name: validators.name(values.name),
      email: validators.email(values.email),
      message: validators.message(values.message),
    }
    setErrors(next)
    setTouched({ name: true, email: true, message: true })
    if (Object.values(next).some(Boolean)) {
      playAlert()
      return
    }

    playSuccess()
    const subject = encodeURIComponent(`Portfolio contact from ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
    window.location.href = `mailto:pmprithiviraj@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  async function handleCopyEmailBar() {
    try {
      playClickActuate()
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText('pmprithiviraj@gmail.com')
      }
      playSuccess()
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 3000)
    } catch {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 3000)
    }
  }

  return (
    <section id="contact" className="relative bg-bg-base px-4 py-20 sm:py-24 sm:px-6">
      <div className="relative mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
            // GET IN TOUCH
          </span>
          <h2 className="mt-2 font-mono text-2xl sm:text-4xl lg:text-5xl font-extrabold text-ink-primary tracking-tight">
            Contact Prithiviraj P M <span className="text-accent">—</span> Full Stack Developer in Chennai
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-mono text-xs text-ink-secondary sm:text-sm">
            Available for full-time Software Developer roles and select freelance projects. Fill out the terminal below or copy my direct email.
          </p>

          {/* Quick Copy Email Strip */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleCopyEmailBar}
              onMouseEnter={playHoverTick}
              className={`inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2 font-mono text-xs font-medium transition-all ${
                emailCopied
                  ? 'border-accent bg-accent text-black shadow-[0_0_15px_var(--color-accent)]'
                  : 'border-border-subtle bg-bg-card text-ink-primary hover:border-accent hover:text-accent'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>pmprithiviraj@gmail.com</span>
              <span className="text-[10px] text-accent font-bold">
                {emailCopied ? '[COPIED ✓]' : '[COPY]'}
              </span>
            </button>
          </div>
        </div>

        {/* Transmission Form */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 shadow-2xl"
        >
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="name" className="font-mono text-xs font-semibold text-ink-secondary">
                  Name / Identifier
                </label>
                <span className="font-mono text-[10px] text-accent font-semibold">[Required]</span>
              </div>
              <input
                id="name"
                value={values.name}
                placeholder="Your secret identity / Name"
                onFocus={playHoverTick}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full min-h-[44px] rounded-xl border border-border-subtle bg-bg-base/80 px-4 py-3 font-mono text-xs text-ink-primary outline-none transition focus:border-accent focus:shadow-[0_0_12px_var(--color-accent-dim)]"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1.5 font-mono text-xs font-semibold text-danger flex items-center gap-1">
                  <span>[!]</span> {errors.name}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="contact-email" className="font-mono text-xs font-semibold text-ink-secondary">
                  Email Address
                </label>
                <span className="font-mono text-[10px] text-accent font-semibold">[Required]</span>
              </div>
              <input
                id="contact-email"
                type="email"
                value={values.email}
                placeholder="I promise I won't spam you / Email"
                onFocus={playHoverTick}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className="w-full min-h-[44px] rounded-xl border border-border-subtle bg-bg-base/80 px-4 py-3 font-mono text-xs text-ink-primary outline-none transition focus:border-accent focus:shadow-[0_0_12px_var(--color-accent-dim)]"
              />
              {errors.email && (
                <p id="contact-email-error" role="alert" className="mt-1.5 font-mono text-xs font-semibold text-danger flex items-center gap-1">
                  <span>[!]</span> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="message" className="font-mono text-xs font-semibold text-ink-secondary">
                Your Message
              </label>
              <span className="font-mono text-[10px] text-accent font-semibold">[Min 10 chars]</span>
            </div>
            <textarea
              id="message"
              rows={4}
              value={values.message}
              placeholder="Your message goes here..."
              onFocus={playHoverTick}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="w-full resize-none rounded-xl border border-border-subtle bg-bg-base/80 px-4 py-3 font-mono text-xs text-ink-primary outline-none transition focus:border-accent focus:shadow-[0_0_12px_var(--color-accent-dim)]"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1.5 font-mono text-xs font-semibold text-danger flex items-center gap-1">
                <span>[!]</span> {errors.message}
              </p>
            )}
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              onMouseEnter={playHoverTick}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-mono text-xs sm:text-sm font-bold text-black tracking-wider shadow-[0_0_20px_var(--color-accent-dim)] hover:shadow-[0_0_30px_var(--color-accent)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Send Email</span>
              <span className="font-bold">&gt;</span>
            </button>

            <p role="status" className="font-mono text-xs text-accent">
              {sent && '[✓] Opening your local mail client with prefilled details.'}
            </p>
          </div>
        </motion.form>

        {/* Circular Social Links Below */}
        <div className="mt-10 sm:mt-12 text-center">
          <span className="font-mono text-xs text-ink-muted uppercase tracking-wider block mb-4">
            Connect Across Platforms
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="me noopener noreferrer"
                onClick={playClickActuate}
                onMouseEnter={playHoverTick}
                aria-label={s.ariaLabel}
                title={s.ariaLabel}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-ink-secondary hover:border-accent hover:text-accent hover:scale-110 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
