import type { ReactNode } from 'react'

export default function DemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card shadow-2xl">
      {/* Clean Modern Window Bar */}
      <div className="flex items-center justify-between border-b border-border-subtle bg-bg-raised px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-accent/80" />
          <span className="ml-1.5 font-mono text-[11px] sm:text-xs text-ink-muted truncate max-w-[140px] sm:max-w-none">
            Interactive Component Preview
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-accent font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Simulator Sandbox Viewport */}
      <div className="relative max-h-[560px] overflow-y-auto bg-bg-base p-2 sm:p-5">
        {children}
      </div>
    </div>
  )
}
