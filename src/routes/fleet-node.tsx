import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { FleetNodeScreen } from '@/screens/fleet/fleet-node-screen'

export const Route = createFileRoute('/fleet-node')({
  component: FleetNodeRoute,
})

function FleetNodeRoute() {
  usePageTitle('Fleet Node')
  return <FleetNodeScreen />
}
