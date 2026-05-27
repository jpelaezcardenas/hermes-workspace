export type WorkspaceScope = {
  path?: string
  folderName?: string
  isValid?: boolean
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function buildWorkspaceDirective(workspace: WorkspaceScope): string {
  const path = workspace.path?.trim() ?? ''
  if (!path || workspace.isValid === false) return ''
  const name =
    workspace.folderName?.trim() ||
    path.split('/').filter(Boolean).at(-1) ||
    'workspace'
  return `<workspace_context active="true" name="${escapeAttribute(name)}" path="${escapeAttribute(path)}" />`
}

export function buildWorkspaceScopedTextMessage(
  message: string,
  workspace: WorkspaceScope | null | undefined,
): string {
  if (message.includes('<workspace_context active="true"')) return message
  const directive = workspace ? buildWorkspaceDirective(workspace) : ''
  if (!directive) return message
  return `${directive}\n\n${message}`
}

const LEADING_WORKSPACE_DIRECTIVE_RE = /^\s*<workspace_context\b[^>]*\/>\s*/i

export function stripWorkspaceDirectiveFromText(value: string): string {
  const trimmedStart = value.trimStart()
  if (!trimmedStart.toLowerCase().startsWith('<workspace_context')) {
    return value
  }
  const stripped = trimmedStart.replace(LEADING_WORKSPACE_DIRECTIVE_RE, '')
  return stripped === trimmedStart ? '' : stripped.trimStart()
}

export function sanitizeWorkspaceVisibleText(
  value: string | null | undefined,
): string | undefined {
  if (typeof value !== 'string') return undefined
  const stripped = stripWorkspaceDirectiveFromText(value).trim()
  return stripped.length > 0 ? stripped : undefined
}
