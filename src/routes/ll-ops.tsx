import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { LlOpsDashboardScreen } from '@/screens/ll-ops/ll-ops-dashboard-screen'

export const Route = createFileRoute('/ll-ops')({
  ssr: false,
  component: LlOpsRoute,
})

function LlOpsRoute() {
  usePageTitle('LL Empire Ops')
  return <LlOpsDashboardScreen />
}
