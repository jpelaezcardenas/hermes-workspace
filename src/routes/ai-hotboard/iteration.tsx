import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/iteration')({
  component: AiHotboardIterationRoute,
})

function AiHotboardIterationRoute() {
  return <AiHotboardRouteContent page="iteration" source="all" />
}
