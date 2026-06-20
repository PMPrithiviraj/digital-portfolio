const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateName(value: string): string | undefined {
  if (!value.trim()) return 'Name is required'
  return undefined
}

export function validateContactEmail(value: string): string | undefined {
  if (!value.trim()) return 'Email is required'
  if (!EMAIL_RE.test(value)) return 'Enter a valid email address'
  return undefined
}

export function validateMessage(value: string): string | undefined {
  if (!value.trim()) return 'Message is required'
  if (value.trim().length < 10) return 'Say a little more (10+ characters)'
  return undefined
}
