import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { FederationScreen } from '@/screens/federation/federation-screen'

export const Route = createFileRoute('/federation')({
  ssr: false,
  component: FederationRoute,
})

function FederationRoute() {
  usePageTitle('Zodiac Federation')
  return <FederationScreen />
}
