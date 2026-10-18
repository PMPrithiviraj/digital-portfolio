import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { isAudioMuted, playClickActuate, playHoverTick, toggleAudio } from '../lib/soundEngine'

const links = [
  { href: '#home', label: 'Professional' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#freelance', label: 'Freelance' },
  { href: '#contact', label: 'Contact' },
]

type Props = {
  onReboot?: () => void
}

export default function Header({ onReboot }: Props) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [muted, setMuted] = useState(() => isAudioMuted())
  const [accent, setAccent] = useState<'green' | 'gold'>(() => {
    if (typeof window === 'undefined') return 'green'
    return (localStorage.getItem('hud_accent') as 'green' | 'gold') || 'green'
  })

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
      { rootMargin: '-30% 0px -60% 0px' },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleAudioToggle() {
    const nextMuted = toggleAudio()
    setMuted(nextMuted)
  }

  function handleLinkClick() {
    playClickActuate()
    setOpen(false)
  }

  function handleMobileAccentToggle() {
    playClickActuate()
    const next = accent === 'green' ? 'gold' : 'green'
    setAccent(next)
    if (next === 'gold') {
      document.documentElement.setAttribute('data-accent', 'gold')
      localStorage.setItem('hud_accent', 'gold')
    } else {
      document.documentElement.removeAttribute('data-accent')
      localStorage.setItem('hud_accent', 'green')
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-subtle bg-bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: Brand Monospace Logo */}
        <a
          href="#home"
          onClick={handleLinkClick}
          onMouseEnter={playHoverTick}
          className="group flex items-center gap-1 font-mono text-base font-bold tracking-tight text-ink-primary transition hover:text-accent"
        >
          <span>Prithiviraj</span>
          <span className="text-accent animate-pulse text-xl leading-none">•</span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {links.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                onMouseEnter={playHoverTick}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-1 font-mono text-xs tracking-wider transition ${
                  isActive
                    ? 'font-semibold text-accent'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right Controls: Desktop vs Mobile Compact Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Desktop Only: SFX Toggle */}
          <button
            type="button"
            onClick={handleAudioToggle}
            onMouseEnter={playHoverTick}
            aria-label={muted ? 'Enable UI sound effects' : 'Mute UI sound effects'}
            title={muted ? 'SFX Muted' : 'SFX Active'}
            className="hidden lg:inline-flex h-9 items-center gap-1.5 rounded-full border border-border-subtle bg-bg-card px-3 font-mono text-xs text-ink-secondary hover:border-accent hover:text-accent transition"
          >
            <span>{muted ? 'SFX: OFF' : 'SFX: ON'}</span>
            <span className={`h-1.5 w-1.5 rounded-full ${muted ? 'bg-ink-muted' : 'bg-accent animate-ping'}`} />
          </button>

          {/* Desktop Only: Reboot Button */}
          {onReboot && (
            <button
              type="button"
              onClick={() => {
                playClickActuate()
                onReboot()
              }}
              onMouseEnter={playHoverTick}
              title="Re-run Cat Eyes boot sequence"
              aria-label="Reboot Preloader"
              className="hidden lg:inline-flex h-9 items-center gap-1.5 rounded-full border border-border-subtle bg-bg-card px-3 font-mono text-xs text-ink-secondary hover:border-accent hover:text-accent transition"
            >
              <span>↻ Reboot</span>
            </button>
          )}

          {/* Theme Toggle (Day / Night) */}
          <ThemeToggle />

          {/* Mobile Hamburger Toggle (Minimum 44px touch target) */}
          <button
            type="button"
            onClick={() => {
              playClickActuate()
              setOpen((v) => !v)
            }}
            onMouseEnter={playHoverTick}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-ink-primary hover:border-accent md:hidden transition"
          >
            {open ? (
              <span className="font-mono text-base font-bold">✕</span>
            ) : (
              <span className="font-mono text-base font-bold">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <nav className="flex flex-col border-t border-border-subtle bg-bg-base/98 px-5 py-4 font-mono md:hidden animate-fade-in shadow-2xl">
          <div className="flex flex-col divide-y divide-border-subtle">
            {links.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex min-h-[44px] items-center justify-between py-3 text-xs tracking-wider transition ${
                    isActive ? 'font-bold text-accent' : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  <span className="text-sm font-medium">{link.label}</span>
                  {isActive && <span className="text-[10px] text-accent font-semibold">● ACTIVE</span>}
                </a>
              )
            })}
          </div>

          {/* Dedicated Mobile System Controls Row */}
          <div className="mt-4 pt-4 border-t border-border-subtle">
            <span className="text-[10px] text-ink-muted uppercase tracking-wider block mb-3 font-semibold">
              // Mobile System Controls
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {/* SFX Button */}
              <button
                type="button"
                onClick={handleAudioToggle}
                className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-border-subtle bg-bg-card px-3 text-xs text-ink-primary hover:border-accent"
              >
                <span>{muted ? 'SFX: OFF' : 'SFX: ON'}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${muted ? 'bg-ink-muted' : 'bg-accent'}`} />
              </button>

              {/* Reboot Button */}
              {onReboot && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    playClickActuate()
                    onReboot()
                  }}
                  className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-border-subtle bg-bg-card px-3 text-xs text-ink-primary hover:border-accent"
                >
                  <span>↻ Reboot OS</span>
                </button>
              )}

              {/* Accent Color Switcher */}
              <button
                type="button"
                onClick={handleMobileAccentToggle}
                className="col-span-2 flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border-subtle bg-bg-card px-3 text-xs text-ink-primary hover:border-accent"
              >
                <span>Accent Color:</span>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: accent === 'green' ? '#00ff88' : '#fbbf24',
                    boxShadow: accent === 'green' ? '0 0 8px #00ff88' : '0 0 8px #fbbf24',
                  }}
                />
                <span className="font-bold text-accent">
                  {accent === 'green' ? 'Cyber Green' : 'Cat-Eye Gold'}
                </span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
