import { createFileRoute } from '@tanstack/react-router'
import { ProjectsScreen } from '@/screens/projects/projects-screen'

function ProjectsRoute() {
  return <ProjectsScreen />
}

export const Route = createFileRoute('/projects')({
  component: ProjectsRoute,
})
