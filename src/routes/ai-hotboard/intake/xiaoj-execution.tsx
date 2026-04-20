import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/intake/xiaoj-execution')({
  component: AiHotboardIntakeXiaojRoute,
})

function AiHotboardIntakeXiaojRoute() {
  return <AiHotboardRouteContent page="intake-xiaoj" source="all" />
}
