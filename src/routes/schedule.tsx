import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { ScheduleScreen } from '@/screens/schedule/schedule-screen'

export const Route = createFileRoute('/schedule')({
  ssr: false,
  component: ScheduleRoute,
})

function ScheduleRoute() {
  usePageTitle('Schedule')
  return <ScheduleScreen />
}
