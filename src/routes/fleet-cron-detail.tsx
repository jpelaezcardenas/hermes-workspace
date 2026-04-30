import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { FleetCronDetailScreen } from '@/screens/fleet/fleet-cron-detail-screen'

export const Route = createFileRoute('/fleet-cron-detail')({
  component: FleetCronDetailRoute,
})

function FleetCronDetailRoute() {
  usePageTitle('Cron Detail')
  return <FleetCronDetailScreen />
}
