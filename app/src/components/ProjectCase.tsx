import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import DemoFrame from './DemoFrame'

type Props = {
  title: string
  summary: string
  problem: string
  process: string
  decisions: string
  tags: string[]
  codeHref: string
  children: ReactNode
}

export default function ProjectCase({ title, summary, problem, process, decisions, tags, codeHref, children }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-card bg-bg-card p-6 sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl text-ink-primary">{title}</h3>
          <p className="mt-1 text-ink-secondary">{summary}</p>

          <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-ink-muted">
            {tags.map((tag) => (
              <span key={tag} className="rounded border border-ink-muted/30 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-sm font-semibold text-accent">Problem</dt>
              <dd className="mt-1 text-sm text-ink-secondary">{problem}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-accent">Process</dt>
              <dd className="mt-1 text-sm text-ink-secondary">{process}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-accent">Decisions</dt>
              <dd className="mt-1 text-sm text-ink-secondary">{decisions}</dd>
            </div>
          </dl>

          <a
            href={codeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dim"
          >
            View source on GitHub →
          </a>
        </div>

        <div>
          <DemoFrame>{children}</DemoFrame>
          <p className="mt-2 text-center text-xs text-ink-muted">Live, interactive — not a screenshot.</p>
        </div>
      </div>
    </motion.article>
  )
}
