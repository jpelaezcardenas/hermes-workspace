import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/user')({
  component: AiHotboardUserRoute,
})

function AiHotboardUserRoute() {
  return <AiHotboardRouteContent page="user" source="all" />
}
