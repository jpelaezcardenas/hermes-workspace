import { createFileRoute } from '@tanstack/react-router'
import { AiHotboardRouteContent } from '../../ai-hotboard'

export const Route = createFileRoute('/ai-hotboard/view/bookmarks')({
  component: AiHotboardBookmarksRoute,
})

function AiHotboardBookmarksRoute() {
  return <AiHotboardRouteContent page="view-bookmarks" source="all" />
}
