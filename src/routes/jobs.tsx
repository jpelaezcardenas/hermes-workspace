import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import BackendUnavailableState from '@/components/backend-unavailable-state'
import { usePageTitle } from '@/hooks/use-page-title'
import { getUnavailableReason } from '@/lib/feature-gates'
import { useFeatureAvailable } from '@/hooks/use-feature-available'
import { JobsScreen } from '@/screens/jobs/jobs-screen'

export const Route = createFileRoute('/jobs')({
  ssr: false,
  component: function JobsRoute() {
    const { t } = useTranslation(['nav', 'settings'])
    usePageTitle(t('nav:jobs', { defaultValue: 'Jobs' }))
    if (!useFeatureAvailable('jobs')) {
      return (
        <BackendUnavailableState
          feature={t('nav:jobs', { defaultValue: 'Jobs' })}
          description={getUnavailableReason('jobs')}
        />
      )
    }
    return <JobsScreen />
  },
})
