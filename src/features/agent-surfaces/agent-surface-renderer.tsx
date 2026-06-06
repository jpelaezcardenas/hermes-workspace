'use client'

import type { ReactNode } from 'react'
import type {
  AgentSurface,
  AgentSurfaceAction,
  AgentSurfaceBlock,
  AgentSurfaceTone,
} from './types'
import { cn } from '@/lib/utils'

type AgentSurfaceRendererProps = {
  surface: AgentSurface
  onAction?: (action: AgentSurfaceAction, block: AgentSurfaceBlock) => void
}

const toneClasses: Record<AgentSurfaceTone, string> = {
  neutral:
    'border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-muted)]',
  success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  warning: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  danger: 'border-red-400/30 bg-red-400/10 text-red-300',
  info: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
}

const riskClasses = {
  Low: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  Medium: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  High: 'border-red-400/30 bg-red-400/10 text-red-300',
}

const confidenceLabels = {
  verified: 'Verified fact',
  informed_judgment: 'Informed judgment',
  speculative: 'Speculative bet',
}

function Pill({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'rounded-full border px-2 py-0.5 text-[11px] font-medium',
        className,
      )}
    >
      {children}
    </span>
  )
}

function SurfaceActionButton({
  action,
  block,
  onAction,
}: {
  action: AgentSurfaceAction
  block: AgentSurfaceBlock
  onAction?: (action: AgentSurfaceAction, block: AgentSurfaceBlock) => void
}) {
  const intent =
    action.kind === 'approve' || action.kind === 'run' ? 'primary' : 'secondary'
  const label = action.requiresApproval ? `${action.label} *` : action.label

  if (action.href) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'rounded-xl border px-3 py-2 text-xs font-semibold transition',
          intent === 'primary'
            ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 text-ink hover:bg-[var(--theme-accent)]/20'
            : 'border-[var(--theme-border)] text-[var(--theme-muted)] hover:border-[var(--theme-accent)] hover:text-ink',
        )}
      >
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onAction?.(action, block)}
      className={cn(
        'rounded-xl border px-3 py-2 text-xs font-semibold transition',
        intent === 'primary'
          ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 text-ink hover:bg-[var(--theme-accent)]/20'
          : 'border-[var(--theme-border)] text-[var(--theme-muted)] hover:border-[var(--theme-accent)] hover:text-ink',
      )}
    >
      {label}
    </button>
  )
}

function DecisionCard({
  block,
  onAction,
}: {
  block: Extract<AgentSurfaceBlock, { type: 'decision_card' }>
  onAction?: (action: AgentSurfaceAction, block: AgentSurfaceBlock) => void
}) {
  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
            Decision
          </p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{block.title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {block.priority ? (
            <Pill className="border-[var(--theme-border)] text-[var(--theme-muted)]">
              {block.priority}
            </Pill>
          ) : null}
          {block.risk ? (
            <Pill className={riskClasses[block.risk]}>{block.risk} risk</Pill>
          ) : null}
          {block.status ? (
            <Pill className="border-sky-400/30 bg-sky-400/10 text-sky-300">
              {block.status}
            </Pill>
          ) : null}
        </div>
      </div>
      <p className="mt-4 text-base leading-relaxed text-ink">
        {block.recommendation}
      </p>
      {block.why ? (
        <p className="mt-3 text-sm leading-relaxed text-[var(--theme-muted)]">
          Why: {block.why}
        </p>
      ) : null}
      {block.owner ? (
        <p className="mt-3 text-xs text-[var(--theme-muted)]">
          Owner: <span className="text-ink">{block.owner}</span>
        </p>
      ) : null}
      {block.actions?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {block.actions.map((action) => (
            <SurfaceActionButton
              key={action.id}
              action={action}
              block={block}
              onAction={onAction}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}

function ApprovalAction({
  block,
  onAction,
}: {
  block: Extract<AgentSurfaceBlock, { type: 'approval_action' }>
  onAction?: (action: AgentSurfaceAction, block: AgentSurfaceBlock) => void
}) {
  return (
    <section className="rounded-3xl border border-amber-400/25 bg-amber-400/5 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
        Approval gate
      </p>
      <h2 className="mt-1 text-lg font-semibold text-ink">{block.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--theme-muted)]">
        {block.prompt}
      </p>
      {block.approvalNote ? (
        <p className="mt-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-200">
          {block.approvalNote}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {block.actions.map((action) => (
          <SurfaceActionButton
            key={action.id}
            action={action}
            block={block}
            onAction={onAction}
          />
        ))}
      </div>
    </section>
  )
}

function EvidenceLink({
  block,
}: {
  block: Extract<AgentSurfaceBlock, { type: 'evidence_link' }>
}) {
  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
            Evidence
          </p>
          <a
            href={block.url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-lg font-semibold text-ink hover:text-[var(--theme-accent)]"
          >
            {block.title}
          </a>
        </div>
        {block.confidence ? (
          <Pill className="border-[var(--theme-border)] text-[var(--theme-muted)]">
            {confidenceLabels[block.confidence]}
          </Pill>
        ) : null}
      </div>
      {block.source ? (
        <p className="mt-2 text-xs text-[var(--theme-muted)]">{block.source}</p>
      ) : null}
      {block.excerpt ? (
        <blockquote className="mt-4 border-l-2 border-[var(--theme-accent)] pl-4 text-sm leading-relaxed text-[var(--theme-muted)]">
          {block.excerpt}
        </blockquote>
      ) : null}
    </section>
  )
}

function Checklist({
  block,
}: {
  block: Extract<AgentSurfaceBlock, { type: 'checklist' }>
}) {
  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
        Checklist
      </p>
      <h2 className="mt-1 text-lg font-semibold text-ink">{block.title}</h2>
      <div className="mt-4 space-y-3">
        {block.items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3"
          >
            <span
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-xs',
                item.done
                  ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                  : 'border-[var(--theme-border)] text-[var(--theme-muted)]',
              )}
            >
              {item.done ? '✓' : '•'}
            </span>
            <div>
              <p className="text-sm font-medium text-ink">{item.label}</p>
              {item.detail ? (
                <p className="mt-1 text-xs leading-relaxed text-[var(--theme-muted)]">
                  {item.detail}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatusItem({
  block,
}: {
  block: Extract<AgentSurfaceBlock, { type: 'status_item' }>
}) {
  return (
    <section
      className={cn(
        'rounded-3xl border p-5',
        toneClasses[block.tone ?? 'neutral'],
      )}
    >
      <p className="text-xs uppercase tracking-[0.18em] opacity-80">
        {block.label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-ink">{block.value}</p>
      {block.detail ? (
        <p className="mt-2 text-sm leading-relaxed opacity-85">
          {block.detail}
        </p>
      ) : null}
    </section>
  )
}

function SurfaceBlock({
  block,
  onAction,
}: {
  block: AgentSurfaceBlock
  onAction?: (action: AgentSurfaceAction, block: AgentSurfaceBlock) => void
}) {
  switch (block.type) {
    case 'decision_card':
      return <DecisionCard block={block} onAction={onAction} />
    case 'approval_action':
      return <ApprovalAction block={block} onAction={onAction} />
    case 'evidence_link':
      return <EvidenceLink block={block} />
    case 'checklist':
      return <Checklist block={block} />
    case 'status_item':
      return <StatusItem block={block} />
  }
}

export function AgentSurfaceRenderer({
  surface,
  onAction,
}: AgentSurfaceRendererProps) {
  const generatedAt = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(surface.generatedAt))

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-4 py-6 text-ink md:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[2rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--theme-muted)]">
                Agent Surface
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {surface.title}
              </h1>
              {surface.description ? (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--theme-muted)] md:text-base">
                  {surface.description}
                </p>
              ) : null}
            </div>
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs text-[var(--theme-muted)]">
              <div>
                Schema: <span className="text-ink">{surface.schema}</span>
              </div>
              <div>
                Generated: <span className="text-ink">{generatedAt}</span>
              </div>
              <div>
                Agent: <span className="text-ink">{surface.source.agent}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {surface.blocks
              .filter((block) => block.type !== 'status_item')
              .map((block) => (
                <SurfaceBlock
                  key={block.id}
                  block={block}
                  onAction={onAction}
                />
              ))}
          </div>
          <aside className="space-y-4">
            {surface.blocks
              .filter((block) => block.type === 'status_item')
              .map((block) => (
                <SurfaceBlock
                  key={block.id}
                  block={block}
                  onAction={onAction}
                />
              ))}
            <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
                Workflow
              </p>
              <p className="mt-2 text-sm text-ink">{surface.source.workflow}</p>
              {surface.source.profile ? (
                <p className="mt-1 text-xs text-[var(--theme-muted)]">
                  Profile: {surface.source.profile}
                </p>
              ) : null}
              <p className="mt-4 text-xs leading-relaxed text-[var(--theme-muted)]">
                * Approval-marked actions are visual only in this pilot. Live
                side effects need explicit wiring and approval gates.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
