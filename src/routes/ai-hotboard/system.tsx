import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/system')({
  component: AiHotboardSystemRoute,
})

function AiHotboardSystemRoute() {
  return <AiHotboardRouteContent page="system" source="all" />
}
