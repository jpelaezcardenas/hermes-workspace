import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/strategy/$line')({
  component: AiHotboardStrategyLineRoute,
})

function AiHotboardStrategyLineRoute() {
  const params = Route.useParams()
  const line = params.line || 'm2-a'

  return <AiHotboardRouteContent page="strategy-line" source="all" strategyLine={line} />
}
