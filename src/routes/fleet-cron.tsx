import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { FleetCronScreen } from '@/screens/fleet/fleet-cron-screen'

export const Route = createFileRoute('/fleet-cron')({
  component: FleetCronRoute,
})

function FleetCronRoute() {
  usePageTitle('Cron Control')
  return <FleetCronScreen />
}
