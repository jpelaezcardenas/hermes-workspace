import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { DomainsScreen } from '@/screens/domains/domains-screen'

export const Route = createFileRoute('/domains')({
  ssr: false,
  component: DomainsRoute,
})

function DomainsRoute() {
  usePageTitle('Domains')
  return <DomainsScreen />
}
