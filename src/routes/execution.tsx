import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { ExecutionScreen } from '@/screens/execution/execution-screen'

export const Route = createFileRoute('/execution')({
  ssr: false,
  component: ExecutionRoute,
})

function ExecutionRoute() {
  usePageTitle('Execution')
  return <ExecutionScreen />
}
