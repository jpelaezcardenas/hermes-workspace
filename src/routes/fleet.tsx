import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { FleetScreen } from '@/screens/fleet/fleet-screen'

export const Route = createFileRoute('/fleet')({
  component: FleetRoute,
})

function FleetRoute() {
  usePageTitle('Fleet')
  return <FleetScreen />
}
