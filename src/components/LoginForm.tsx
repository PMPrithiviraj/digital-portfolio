import { useRef, useState, type FormEvent } from 'react'
import { validateEmail, validatePassword } from '../lib/validation'
import { playAlert, playClickActuate, playHoverTick, playSuccess } from '../lib/soundEngine'

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

  // Password Entropy / Strength Calculation
  const pass = values.password
  const strengthChecks = [
    pass.length >= 8,
    /[A-Z]/.test(pass),
    /[a-z]/.test(pass),
    /[0-9]/.test(pass),
    /[^A-Za-z0-9]/.test(pass),
  ]
  const strengthScore = strengthChecks.filter(Boolean).length

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
    playClickActuate()
    const next = validateAll()
    const firstInvalid = (Object.keys(next) as Field[]).find((field) => next[field])
    if (firstInvalid) {
      playAlert()
      fieldRefs[firstInvalid].current?.focus()
      return
    }

    setStatus('loading')
    try {
      // Simulated network round-trip
      await new Promise((resolve) => setTimeout(resolve, 1100))
      setStatus('success')
      playSuccess()
    } catch {
      setStatus('error')
      playAlert()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative w-full max-w-sm rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-7 shadow-2xl"
    >
      <div className="mb-5 sm:mb-6 border-b border-border-subtle pb-3">
        <div className="flex items-center justify-between font-mono text-[10px] text-accent tracking-wider uppercase">
          <span>// AUTH_GATE</span>
          <span>AES-256</span>
        </div>
        <h4 className="mt-1 font-mono text-base sm:text-lg font-bold text-ink-primary">
          Secure Access Login
        </h4>
        <p className="mt-0.5 font-mono text-xs text-ink-secondary">
          JWT role-based validation simulator.
        </p>
      </div>

      <div className="mb-4 sm:mb-5">
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="email" className="font-mono text-xs font-semibold text-ink-secondary">
            User Email
          </label>
          <span className="font-mono text-[10px] text-accent font-semibold">[Required]</span>
        </div>
        <input
          ref={emailRef}
          id="email"
          type="email"
          autoComplete="email"
          placeholder="developer@domain.com"
          value={values.email}
          onFocus={playHoverTick}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={status === 'loading'}
          className="w-full min-h-[44px] rounded-xl border border-border-subtle bg-bg-base/80 px-3.5 py-2.5 font-mono text-xs text-ink-primary outline-none transition focus:border-accent focus:shadow-[0_0_12px_var(--color-accent-dim)] disabled:opacity-50"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 font-mono text-xs font-semibold text-danger flex items-center gap-1">
            <span>[!]</span> {errors.email}
          </p>
        )}
      </div>

      <div className="mb-5 sm:mb-6">
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="font-mono text-xs font-semibold text-ink-secondary">
            Password
          </label>
          <span className="font-mono text-[10px] text-accent font-semibold">[Min 8 chars]</span>
        </div>
        <div className="relative">
          <input
            ref={passwordRef}
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={values.password}
            onFocus={playHoverTick}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            disabled={status === 'loading'}
            className="w-full min-h-[44px] rounded-xl border border-border-subtle bg-bg-base/80 px-3.5 py-2.5 pr-11 font-mono text-xs text-ink-primary outline-none transition focus:border-accent focus:shadow-[0_0_12px_var(--color-accent-dim)] disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => {
              playClickActuate()
              setShowPassword((v) => !v)
            }}
            onMouseEnter={playHoverTick}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-ink-muted hover:text-accent transition"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {/* Dynamic Entropy Gauge (5 segments) */}
        {values.password && (
          <div className="mt-2">
            <div className="flex h-1.5 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full flex-1 rounded-full transition-colors duration-200 ${
                    i < strengthScore
                      ? strengthScore >= 4
                        ? 'bg-accent shadow-[0_0_6px_var(--color-accent)]'
                        : 'bg-danger shadow-[0_0_6px_rgba(239,68,68,0.8)]'
                      : 'bg-border-subtle'
                  }`}
                />
              ))}
            </div>
            <div className="mt-1 flex items-center justify-between font-mono text-[9px] text-ink-muted">
              <span>Entropy Score:</span>
              <span className={strengthScore === 5 ? 'text-accent font-bold' : 'text-danger'}>
                {strengthScore === 5 ? 'Strong Encryption' : `${strengthScore}/5 Requirements`}
              </span>
            </div>
          </div>
        )}

        {errors.password && (
          <p id="password-error" role="alert" className="mt-1.5 font-mono text-xs font-semibold text-danger flex items-center gap-1">
            <span>[!]</span> {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        onMouseEnter={playHoverTick}
        className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent py-3 font-mono text-xs font-bold tracking-wider text-black shadow-[0_0_15px_var(--color-accent-dim)] transition hover:scale-[1.02] active:scale-95 disabled:opacity-60"
      >
        {status === 'loading' && <Spinner />}
        <span>{status === 'loading' ? 'Verifying Token...' : 'Authenticate & Sign In'}</span>
      </button>

      <p role="status" className="mt-3 text-center font-mono text-xs">
        {status === 'success' && (
          <span className="text-accent font-bold">
            [✓] Token verified — Login session active
          </span>
        )}
        {status === 'error' && (
          <span className="text-danger font-bold">
            [!] Access denied — Invalid credentials
          </span>
        )}
      </p>
    </form>
  )
}

function Spinner() {
  return (
    <svg className="h-3.5 w-3.5 animate-spin text-current" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
