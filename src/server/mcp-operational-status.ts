import fs from 'node:fs'

export type McpLayerStatus = 'enabled' | 'disabled' | 'blocked'
export type McpRiskClass = 'R0' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5'

export type ProfileMcpLayer = {
  status: McpLayerStatus
  label: string
  riskClass?: McpRiskClass
  reason?: string
}

export type ProfileMcpBlockedGate = {
  key: string
  label: string
  status: 'blocked'
  reason: string
}

export type McpLedgerEntrySummary = {
  sequence?: number
  timestamp?: string
  actor?: string
  tool?: string
  riskClass?: string
  dryRun?: boolean
  ok?: boolean
}

export type ProfileMcpStatus = {
  mcpAvailable: boolean
  source: 'james-mcp-config' | 'not-configured'
  layers: {
    sensor: ProfileMcpLayer
    planner: ProfileMcpLayer
    operator: ProfileMcpLayer
  }
  blockedGates: Array<ProfileMcpBlockedGate>
  lastLedgerEntry: McpLedgerEntrySummary | null
}

export const DEFAULT_MCP_LEDGER_PATH =
  '/home/ugo/ops/james-2/.runtime/mcp-audit-ledger/james-mcp-audit-ledger.jsonl'

const GLOBAL_BLOCKED_GATES: Array<ProfileMcpBlockedGate> = [
  {
    key: 't29',
    label: 'T29',
    status: 'blocked',
    reason: 'exige approval_ref humano explícito do Ugo',
  },
  {
    key: 'camp-7',
    label: 'CAMP-7',
    status: 'blocked',
    reason: 'exige T29 aprovado e approval_ref explícito',
  },
  {
    key: 'whatsapp-real',
    label: 'WhatsApp real',
    status: 'blocked',
    reason: 'R5 bloqueado sem aprovação humana explícita',
  },
  {
    key: 'pix-santander',
    label: 'Pix/Santander real',
    status: 'blocked',
    reason: 'R5 financeiro bloqueado sem approval_ref',
  },
  {
    key: 'host-mutativo',
    label: 'HOST mutativo',
    status: 'blocked',
    reason: 'fora do operador restrito sem handoff operacional',
  },
  {
    key: 'providers-secrets',
    label: 'Providers/secrets/auth',
    status: 'blocked',
    reason: 'providers, .env, auth.json, tokens e credenciais não são mutáveis via Workspace',
  },
]

function disabled(reason: string, label: string): ProfileMcpLayer {
  return { status: 'disabled', label, reason }
}

function enabled(label: string, riskClass: McpRiskClass): ProfileMcpLayer {
  return { status: 'enabled', label, riskClass }
}

function rawMcpServers(config: Record<string, unknown>): Record<string, unknown> {
  const snake = config.mcp_servers
  if (snake && typeof snake === 'object' && !Array.isArray(snake)) {
    return snake as Record<string, unknown>
  }
  const camel = config.mcpServers
  if (camel && typeof camel === 'object' && !Array.isArray(camel)) {
    return camel as Record<string, unknown>
  }
  return {}
}

function hasConfiguredJamesMcp(config: Record<string, unknown>): boolean {
  const servers = rawMcpServers(config)
  return Object.entries(servers).some(([name, value]) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false
    const server = value as Record<string, unknown>
    // Explicitly disabled servers must not count as configured
    if (server.enabled === false) return false
    const haystack = `${name}\n${JSON.stringify(value ?? {})}`.toLowerCase()
    return haystack.includes('james')
  })
}

export function readLastMcpLedgerEntry(
  ledgerPath = DEFAULT_MCP_LEDGER_PATH,
): McpLedgerEntrySummary | null {
  if (!fs.existsSync(ledgerPath)) return null
  let raw = ''
  try {
    raw = fs.readFileSync(ledgerPath, 'utf-8')
  } catch {
    return null
  }

  const lines = raw.split('\n').map((line) => line.trim()).filter(Boolean)
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    try {
      const parsed = JSON.parse(lines[index]) as Record<string, unknown>
      const result =
        parsed.result && typeof parsed.result === 'object' && !Array.isArray(parsed.result)
          ? (parsed.result as Record<string, unknown>)
          : {}
      return {
        sequence: typeof parsed.sequence === 'number' ? parsed.sequence : undefined,
        timestamp: typeof parsed.timestamp === 'string' ? parsed.timestamp : undefined,
        actor: typeof parsed.actor === 'string' ? parsed.actor : undefined,
        tool: typeof parsed.tool === 'string' ? parsed.tool : undefined,
        riskClass:
          typeof parsed.risk_class === 'string'
            ? parsed.risk_class
            : typeof parsed.riskClass === 'string'
              ? parsed.riskClass
              : undefined,
        dryRun: typeof parsed.dry_run === 'boolean' ? parsed.dry_run : undefined,
        ok: typeof result.ok === 'boolean' ? result.ok : undefined,
      }
    } catch {
      // Ignore corrupt/truncated lines and keep looking for the last valid entry.
    }
  }
  return null
}

export function buildProfileMcpStatus(
  profileName: string,
  config: Record<string, unknown>,
  options: { ledgerPath?: string } = {},
): ProfileMcpStatus {
  const jamesMcpConfigured = hasConfiguredJamesMcp(config)
  const lastLedgerEntry = readLastMcpLedgerEntry(options.ledgerPath)

  if (!jamesMcpConfigured) {
    return {
      mcpAvailable: false,
      source: 'not-configured',
      layers: {
        sensor: disabled('mcp_not_configured_for_profile', 'Sensor'),
        planner: disabled('mcp_not_configured_for_profile', 'Planner'),
        operator: disabled('mcp_not_configured_for_profile', 'Operator'),
      },
      blockedGates: [],
      lastLedgerEntry: null,
    }
  }

  if (profileName === 'hermes-ops-readonly') {
    return {
      mcpAvailable: true,
      source: 'james-mcp-config',
      layers: {
        sensor: enabled('Sensor', 'R0'),
        planner: disabled('read_only_profile_policy', 'Planner'),
        operator: disabled('read_only_profile_policy', 'Operator'),
      },
      blockedGates: GLOBAL_BLOCKED_GATES,
      lastLedgerEntry,
    }
  }

  if (profileName === 'hermes-ops-exec') {
    return {
      mcpAvailable: true,
      source: 'james-mcp-config',
      layers: {
        sensor: enabled('Sensor', 'R0'),
        planner: enabled('Planner', 'R1'),
        operator: enabled('Operator restrito', 'R2'),
      },
      blockedGates: GLOBAL_BLOCKED_GATES,
      lastLedgerEntry,
    }
  }

  return {
    mcpAvailable: true,
    source: 'james-mcp-config',
    layers: {
      sensor: enabled('Sensor', 'R0'),
      planner: disabled('profile_policy_not_operator', 'Planner'),
      operator: disabled('profile_policy_not_operator', 'Operator'),
    },
    blockedGates: GLOBAL_BLOCKED_GATES,
    lastLedgerEntry,
  }
}
