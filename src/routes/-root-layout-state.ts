export type RootSurfaceState = {
  showOnboarding: boolean
  showWorkspaceShell: boolean
  showPostOnboardingOverlays: boolean
}

export function getRootSurfaceState(
  onboardingComplete: boolean | null,
): RootSurfaceState {
  if (onboardingComplete !== true) {
    return {
      showOnboarding: false,
      showWorkspaceShell: true,
      showPostOnboardingOverlays: false,
    }
  }

  return {
    showOnboarding: false,
    showWorkspaceShell: true,
    showPostOnboardingOverlays: true,
  }
}
