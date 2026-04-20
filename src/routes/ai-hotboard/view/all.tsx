import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/view/all')({
  component: AiHotboardAllRoute,
})

function AiHotboardAllRoute() {
  return <AiHotboardRouteContent page="view-all" source="all" />
}
