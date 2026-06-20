const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Email is required'
  if (!EMAIL_RE.test(value)) return 'Enter a valid email address'
  return undefined
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Password is required'
  if (value.length < 8) return 'Must be at least 8 characters'
  if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter'
  if (!/[a-z]/.test(value)) return 'Must include a lowercase letter'
  if (!/[0-9]/.test(value)) return 'Must include a number'
  if (!/[^A-Za-z0-9]/.test(value)) return 'Must include a special character'
  return undefined
}
