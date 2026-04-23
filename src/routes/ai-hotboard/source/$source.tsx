import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/source/$source')({
  component: AiHotboardSourceRoute,
})

function AiHotboardSourceRoute() {
  const params = Route.useParams()
  const source = params.source || 'all'
  return (
    <AiHotboardRouteContent
      page={source === 'wechat' ? 'source-wechat' : undefined}
      source={source}
    />
  )
}
