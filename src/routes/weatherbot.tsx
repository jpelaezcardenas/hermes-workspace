import { createFileRoute } from '@tanstack/react-router'
import { WeatherbotScreen } from '@/screens/weatherbot/weatherbot-screen'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/weatherbot')({
  ssr: false,
  component: WeatherbotRoute,
})

function WeatherbotRoute() {
  usePageTitle('Weatherbot')
  return <WeatherbotScreen />
}
