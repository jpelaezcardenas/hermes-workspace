import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { CompanyFlowScreen } from '@/screens/company-flow/company-flow-screen'

export const Route = createFileRoute('/company-flow')({
  ssr: false,
  component: CompanyFlowRoute,
})

function CompanyFlowRoute() {
  usePageTitle('Company Flow')
  return <CompanyFlowScreen />
}
