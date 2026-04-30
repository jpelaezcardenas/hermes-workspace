import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { FleetOperationsScreen } from '@/screens/fleet/fleet-operations-screen'

export const Route = createFileRoute('/fleet-operations')({
  component: FleetOperationsRoute,
})

function FleetOperationsRoute() {
  usePageTitle('Fleet Operations')
  return <FleetOperationsScreen />
}
