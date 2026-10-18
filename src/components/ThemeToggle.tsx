import { useTheme } from '../theme/ThemeProvider'
import { playClickActuate, playHoverTick } from '../lib/soundEngine'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  function handleToggle() {
    playClickActuate()
    toggle()
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={playHoverTick}
      aria-label={theme === 'dark' ? 'Switch to DAY_OPS mode' : 'Switch to NIGHT_STALKER mode'}
      title={theme === 'dark' ? 'Switch to DAY_OPS' : 'Switch to NIGHT_STALKER'}
      className="flex h-9 items-center gap-1.5 rounded-full border border-border-subtle bg-bg-card px-2.5 sm:px-3 font-mono text-xs text-ink-secondary transition hover:border-accent hover:text-accent"
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${theme === 'dark' ? 'bg-accent' : 'bg-signal'} opacity-75`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-accent' : 'bg-signal'}`} />
      </span>
      <span className="hidden sm:inline font-semibold">
        {theme === 'dark' ? 'NIGHT' : 'DAY'}
      </span>
      <span className="sm:hidden text-[11px] font-semibold">
        {theme === 'dark' ? 'NIGHT' : 'DAY'}
      </span>
    </button>
  )
}
