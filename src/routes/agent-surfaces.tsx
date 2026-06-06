'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type {
  AgentSurface,
  AgentSurfaceAction,
  AgentSurfaceBlock,
} from '@/features/agent-surfaces/types'
import { AgentSurfaceRenderer } from '@/features/agent-surfaces/agent-surface-renderer'
import { createSampleAgentSurface } from '@/features/agent-surfaces/sample-surface'
import { usePageTitle } from '@/hooks/use-page-title'

type AgentSurfaceResponse = {
  ok: boolean
  surface?: AgentSurface
  error?: string
}

async function fetchSampleSurface(): Promise<AgentSurface> {
  const response = await fetch('/api/agent-surfaces/sample')
  const data = (await response.json()) as AgentSurfaceResponse
  if (!response.ok || data.ok === false || !data.surface) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data.surface
}

export const Route = createFileRoute('/agent-surfaces')({
  ssr: false,
  component: AgentSurfacesRoute,
})

function AgentSurfacesRoute() {
  usePageTitle('Agent Surfaces')
  const [lastAction, setLastAction] = useState<string | null>(null)
  const fallbackSurface = useMemo(() => createSampleAgentSurface(), [])
  const surfaceQuery = useQuery({
    queryKey: ['agent-surfaces', 'sample'],
    queryFn: fetchSampleSurface,
    staleTime: 60_000,
  })

  const surface = surfaceQuery.data ?? fallbackSurface

  function handleAction(action: AgentSurfaceAction, block: AgentSurfaceBlock) {
    setLastAction(`${action.label} on ${block.id}`)
  }

  return (
    <div className="relative min-h-full">
      {surfaceQuery.isError ? (
        <div className="mx-auto max-w-6xl px-4 pt-4 text-xs text-amber-300 md:px-8 lg:px-10">
          API sample failed, rendering local fallback:{' '}
          {surfaceQuery.error instanceof Error
            ? surfaceQuery.error.message
            : 'Unknown error'}
        </div>
      ) : null}
      {lastAction ? (
        <div className="sticky top-0 z-10 border-b border-[var(--theme-border)] bg-[var(--theme-card)]/95 px-4 py-2 text-xs text-[var(--theme-muted)] backdrop-blur md:px-8 lg:px-10">
          Visual-only action captured:{' '}
          <span className="text-ink">{lastAction}</span>
        </div>
      ) : null}
      <AgentSurfaceRenderer surface={surface} onAction={handleAction} />
    </div>
  )
}
