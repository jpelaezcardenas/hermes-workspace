import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/view/low-follower')({
  component: AiHotboardLowFollowerRoute,
})

function AiHotboardLowFollowerRoute() {
  return <AiHotboardRouteContent page="view-low-follower" source="all" />
}
