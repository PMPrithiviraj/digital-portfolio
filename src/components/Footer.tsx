export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-bg-base px-4 py-8 font-mono text-xs text-ink-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-ink-secondary text-center sm:text-left">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span>&copy; {new Date().getFullYear()} Prithiviraj P M · Built with React 19 &amp; Tailwind CSS v4</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <a
            href="https://github.com/PMPrithiviraj/digital-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center text-accent hover:underline gap-1 font-semibold"
          >
            <span>[GitHub Repository]</span>
          </a>
          <span className="text-border-subtle">•</span>
          <span className="text-ink-secondary">Chennai, India</span>
        </div>
      </div>
    </footer>
  )
}
