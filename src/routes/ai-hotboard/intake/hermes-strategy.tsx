import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/intake/hermes-strategy')({
  component: AiHotboardIntakeHermesRoute,
})

function AiHotboardIntakeHermesRoute() {
  return <AiHotboardRouteContent page="intake-hermes" source="all" />
}
