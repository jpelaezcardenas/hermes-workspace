import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/logout')({
  component: AiHotboardLogoutRoute,
})

function AiHotboardLogoutRoute() {
  return <AiHotboardRouteContent page="logout" source="all" />
}
