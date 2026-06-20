import { useRef, useState, type FormEvent } from 'react'
import { validateEmail, validatePassword } from '../lib/validation'

type Field = 'email' | 'password'
type Errors = Partial<Record<Field, string>>

const validators: Record<Field, (value: string) => string | undefined> = {
  email: validateEmail,
  password: validatePassword,
}

export default function LoginForm() {
  const [values, setValues] = useState<Record<Field, string>>({ email: '', password: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const fieldRefs: Record<Field, React.RefObject<HTMLInputElement | null>> = {
    email: emailRef,
    password: passwordRef,
  }

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

  function validateAll(): Errors {
    const next: Errors = {
      email: validators.email(values.email),
      password: validators.password(values.password),
    }
    setErrors(next)
    setTouched({ email: true, password: true })
    return next
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validateAll()
    const firstInvalid = (Object.keys(next) as Field[]).find((field) => next[field])
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus()
      return
    }

    setStatus('loading')
    try {
      // Simulated network call — no backend exists for this demo.
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-sm rounded-card bg-bg-card p-8 shadow-xl"
    >
      <h3 className="mb-6 font-display text-2xl text-ink-primary">Sign in</h3>

      <div className="mb-5">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-secondary">
          Email
        </label>
        <input
          ref={emailRef}
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={status === 'loading'}
          className="w-full rounded-control border border-ink-muted/30 bg-bg-raised px-3 py-2.5 text-ink-primary outline-none focus:border-accent disabled:opacity-50"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-sm text-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-secondary">
          Password
        </label>
        <div className="relative">
          <input
            ref={passwordRef}
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            disabled={status === 'loading'}
            className="w-full rounded-control border border-ink-muted/30 bg-bg-raised px-3 py-2.5 pr-11 text-ink-primary outline-none focus:border-accent disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ink-muted hover:text-ink-primary"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" role="alert" className="mt-1.5 text-sm text-danger">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-control bg-accent py-2.5 font-medium text-bg-base transition hover:bg-accent-dim disabled:opacity-70"
      >
        {status === 'loading' && <Spinner />}
        {status === 'loading' ? 'Signing in…' : 'Sign in'}
      </button>

      <p role="status" className="mt-3 text-center text-sm text-ink-muted">
        {status === 'success' && 'Signed in successfully.'}
        {status === 'error' && 'Something went wrong. Try again.'}
      </p>
    </form>
  )
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
