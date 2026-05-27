import { createFileRoute } from '@tanstack/react-router'
import { CompanyOsRouteView } from './company-os'

export const Route = createFileRoute('/company-os-beta')({
  ssr: false,
  component: CompanyOsRouteView,
})
