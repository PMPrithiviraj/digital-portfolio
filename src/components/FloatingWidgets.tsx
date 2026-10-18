import { useEffect, useState } from 'react'
import { isBgmPlaying, playClickActuate, playHoverTick, toggleBgm } from '../lib/soundEngine'
import StaircaseTransition from './StaircaseTransition'

export default function FloatingWidgets() {
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window === 'undefined') return false
    return isBgmPlaying()
  })
  const [accent, setAccent] = useState<'green' | 'gold'>(() => {
    if (typeof window === 'undefined') return 'green'
    return (localStorage.getItem('hud_accent') as 'green' | 'gold') || 'green'
  })
  const [staircaseActive, setStaircaseActive] = useState(false)

  useEffect(() => {
    if (accent === 'gold') {
      document.documentElement.setAttribute('data-accent', 'gold')
    } else {
      document.documentElement.removeAttribute('data-accent')
    }
  }, [accent])

  function handleToggleBgm() {
    playClickActuate()
    const active = toggleBgm()
    setIsPlaying(active)
  }

  function handleToggleAccent() {
    playClickActuate()
    setStaircaseActive(true)

    setTimeout(() => {
      const next = accent === 'green' ? 'gold' : 'green'
      setAccent(next)
      if (next === 'gold') {
        document.documentElement.setAttribute('data-accent', 'gold')
        localStorage.setItem('hud_accent', 'gold')
      } else {
        document.documentElement.removeAttribute('data-accent')
        localStorage.setItem('hud_accent', 'green')
      }
    }, 400)

    setTimeout(() => {
      setStaircaseActive(false)
    }, 1000)
  }

  return (
    <>
      <StaircaseTransition active={staircaseActive} />

      {/* Desktop Only: Left-Edge Center Floating Accent Switcher Orb */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          type="button"
          onClick={handleToggleAccent}
          onMouseEnter={playHoverTick}
          aria-label={accent === 'green' ? 'Switch to Cat-Eye Gold theme' : 'Switch to Neon Green theme'}
          title={accent === 'green' ? 'Switch to Cat-Eye Gold' : 'Switch to Cyber Neon Green'}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card/90 backdrop-blur-md transition-all hover:scale-110 hover:border-accent hover:shadow-[0_0_15px_var(--color-accent)]"
        >
          <span
            className="h-4 w-4 rounded-full transition-all group-hover:scale-110"
            style={{
              backgroundColor: accent === 'green' ? '#fbbf24' : '#00ff88',
              boxShadow: accent === 'green' ? '0 0 10px #fbbf24' : '0 0 10px #00ff88',
            }}
          />
        </button>
      </div>

      {/* Desktop Floating Audio/BGM Player Pill (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:flex">
        <div className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-card/95 px-3.5 py-2 backdrop-blur-md shadow-2xl transition hover:border-accent/40">
          {/* Animated/Spinning Synth Disc */}
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-raised text-accent ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          {/* Track Telemetry */}
          <div className="flex flex-col font-mono text-[11px] leading-tight max-w-[150px]">
            <span className="font-bold text-ink-primary truncate">
              {isPlaying ? 'Night Stalker Synth' : 'BGM Standby'}
            </span>
            <span className="text-[9px] text-ink-muted truncate">
              {isPlaying ? 'FM-84 Procedural' : 'Prithivi Audio Engine'}
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handleToggleBgm}
            onMouseEnter={playHoverTick}
            aria-label={isPlaying ? 'Pause background synthwave BGM' : 'Play procedural synthwave BGM'}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-accent/15 text-accent transition hover:bg-accent hover:text-black hover:scale-105"
          >
            {isPlaying ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Only: Compact Circular Floating Audio Pill (Bottom Right - Non-Intrusive) */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden">
        <button
          type="button"
          onClick={handleToggleBgm}
          aria-label={isPlaying ? 'Pause background synthwave BGM' : 'Play procedural synthwave BGM'}
          title={isPlaying ? 'Pause BGM' : 'Play Procedural BGM'}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card/95 backdrop-blur-md shadow-2xl text-accent transition hover:border-accent active:scale-95"
        >
          <div className={isPlaying ? 'animate-spin' : ''} style={{ animationDuration: '4s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          {isPlaying && (
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent animate-ping" />
          )}
        </button>
      </div>
    </>
  )
}
