import type { ReactNode } from 'react'

export default function DemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-ink-muted/20">
      <div className="flex items-center gap-1.5 border-b border-ink-muted/20 bg-bg-raised px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
      </div>
      <div className="max-h-130 overflow-y-auto">{children}</div>
    </div>
  )
}
