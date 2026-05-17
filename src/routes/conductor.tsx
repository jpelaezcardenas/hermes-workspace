import { createFileRoute } from '@tanstack/react-router'
import { Conductor } from '@/screens/gateway/conductor'
import { readConductorTraceSessionKey } from '@/screens/gateway/conductor-trace-hydration'

function ConductorRoute() {
  const { traceSessionKey } = Route.useSearch()
  return <Conductor traceSessionKey={traceSessionKey} />
}

export const Route = createFileRoute('/conductor')({
  validateSearch: (
    search: Record<string, unknown>,
  ): { traceSessionKey?: string } => {
    const traceSessionKey = readConductorTraceSessionKey(search)
    return traceSessionKey ? { traceSessionKey } : {}
  },
  component: ConductorRoute,
})
