import { createFileRoute } from '@tanstack/react-router'
import { CaelHomeRoute } from '@/routes/cael-home'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/dashboard')({
  ssr: false,
  component: DashboardRoute,
})

function DashboardRoute() {
  usePageTitle('Cael Homebase')
  return <CaelHomeRoute />
}
