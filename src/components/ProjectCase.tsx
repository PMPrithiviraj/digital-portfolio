import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import DemoFrame from './DemoFrame'
import { playClickActuate, playHoverTick } from '../lib/soundEngine'

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

export default function ProjectCase({
  title,
  summary,
  problem,
  process,
  decisions,
  tags,
  codeHref,
  children,
}: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="spotlight-card relative rounded-2xl border border-border-subtle bg-bg-card p-5 sm:p-8 shadow-2xl"
    >
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-start">
        {/* Left Column: Dossier Details */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-accent font-semibold tracking-wider">
              <span>FEATURED CASE STUDY</span>
            </div>

            <h3 className="mt-2 font-mono text-xl sm:text-3xl font-bold text-ink-primary tracking-tight">
              {title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {summary}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border-subtle bg-bg-raised px-3 py-1 font-mono text-[11px] sm:text-xs text-ink-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 3 Step Breakdown */}
            <div className="mt-6 space-y-3.5 sm:space-y-4">
              <div className="rounded-xl border border-border-subtle bg-bg-raised/40 p-3.5 sm:p-4">
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider block">
                  01. The Problem
                </span>
                <p className="mt-1 text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                  {problem}
                </p>
              </div>

              <div className="rounded-xl border border-border-subtle bg-bg-raised/40 p-3.5 sm:p-4">
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider block">
                  02. Engineering Process
                </span>
                <p className="mt-1 text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                  {process}
                </p>
              </div>

              <div className="rounded-xl border border-border-subtle bg-bg-raised/40 p-3.5 sm:p-4">
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider block">
                  03. Architectural Decisions
                </span>
                <p className="mt-1 text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                  {decisions}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
            <a
              href={codeHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickActuate}
              onMouseEnter={playHoverTick}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border-subtle bg-bg-raised px-5 py-2.5 font-mono text-xs font-semibold text-ink-primary hover:border-accent hover:text-accent transition-all"
            >
              <span>View Source Code</span>
              <span className="font-bold">&gt;</span>
            </a>

            <span className="font-mono text-[11px] text-ink-muted">
              Production Validated
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Sandbox Viewport */}
        <div>
          <DemoFrame>{children}</DemoFrame>
        </div>
      </div>
    </motion.article>
  )
}
