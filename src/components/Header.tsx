import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#freelance', label: 'Freelance' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-muted/10 bg-bg-base/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-display text-lg text-ink-primary">
          Prithiviraj
        </a>

        <nav className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
              className={`text-sm hover:text-accent ${
                active === link.href.slice(1) ? 'font-medium text-accent' : 'text-ink-secondary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center text-ink-primary"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-muted/10 bg-bg-base px-6 py-4 sm:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-control px-2 py-2 text-ink-secondary hover:bg-bg-card hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  )
}
