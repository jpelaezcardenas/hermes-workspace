export type HermesSlashCommandCategory =
  | 'Session'
  | 'Configuration'
  | 'Tools & Skills'
  | 'Info'
  | 'Exit'

export type HermesSlashCommandDefinition = {
  name: string
  description: string
  category: HermesSlashCommandCategory
  aliases?: Array<string>
  argsHint?: string
  cliOnly?: boolean
  gatewayOnly?: boolean
}

export const HERMES_SLASH_COMMANDS: Array<HermesSlashCommandDefinition> = [
  {
    name: 'new',
    description: 'Start a new session',
    category: 'Session',
    aliases: ['reset'],
  },
  {
    name: 'clear',
    description: 'Clear screen and start a new session',
    category: 'Session',
    cliOnly: true,
  },
  {
    name: 'history',
    description: 'Show conversation history',
    category: 'Session',
    cliOnly: true,
  },
  {
    name: 'save',
    description: 'Save the current conversation',
    category: 'Session',
    cliOnly: true,
  },
  {
    name: 'retry',
    description: 'Retry the last message',
    category: 'Session',
  },
  {
    name: 'undo',
    description: 'Remove the last user/assistant exchange',
    category: 'Session',
  },
  {
    name: 'title',
    description: 'Set a title for the current session',
    category: 'Session',
    argsHint: '[name]',
  },
  {
    name: 'branch',
    description: 'Branch the current session',
    category: 'Session',
    aliases: ['fork'],
    argsHint: '[name]',
  },
  {
    name: 'compress',
    description: 'Manually compress conversation context',
    category: 'Session',
    argsHint: '[focus topic]',
  },
  {
    name: 'rollback',
    description: 'List or restore filesystem checkpoints',
    category: 'Session',
    argsHint: '[number]',
  },
  {
    name: 'snapshot',
    description: 'Create or restore state snapshots',
    category: 'Session',
    aliases: ['snap'],
    argsHint: '[create|restore|prune]',
    cliOnly: true,
  },
  {
    name: 'stop',
    description: 'Kill all running background processes',
    category: 'Session',
  },
  {
    name: 'approve',
    description: 'Approve a pending dangerous command',
    category: 'Session',
    argsHint: '[session|always]',
    gatewayOnly: true,
  },
  {
    name: 'deny',
    description: 'Deny a pending dangerous command',
    category: 'Session',
    gatewayOnly: true,
  },
  {
    name: 'background',
    description: 'Run a prompt in the background',
    category: 'Session',
    aliases: ['bg'],
    argsHint: '<prompt>',
  },
  {
    name: 'btw',
    description: 'Ask an ephemeral side question',
    category: 'Session',
    argsHint: '<question>',
  },
  {
    name: 'agents',
    description: 'Show active agents and running tasks',
    category: 'Session',
    aliases: ['tasks'],
  },
  {
    name: 'queue',
    description: "Queue a prompt for the next turn",
    category: 'Session',
    aliases: ['q'],
    argsHint: '<prompt>',
  },
  {
    name: 'steer',
    description: 'Inject a message after the next tool call',
    category: 'Session',
    argsHint: '<prompt>',
  },
  {
    name: 'status',
    description: 'Show session info',
    category: 'Session',
  },
  {
    name: 'resume',
    description: 'Resume a previously-named session',
    category: 'Session',
    argsHint: '[name]',
  },
  {
    name: 'config',
    description: 'Show current configuration',
    category: 'Configuration',
    cliOnly: true,
  },
  {
    name: 'model',
    description: 'Show or change the current model',
    category: 'Configuration',
    aliases: ['provider'],
    argsHint: '[model]',
  },
  {
    name: 'personality',
    description: 'Set a predefined personality',
    category: 'Configuration',
    argsHint: '[name]',
  },
  {
    name: 'statusbar',
    description: 'Toggle the context/model status bar',
    category: 'Configuration',
    aliases: ['sb'],
    cliOnly: true,
  },
  {
    name: 'verbose',
    description: 'Cycle tool progress display',
    category: 'Configuration',
    cliOnly: true,
  },
  {
    name: 'yolo',
    description: 'Toggle YOLO mode',
    category: 'Configuration',
  },
  {
    name: 'reasoning',
    description: 'Manage reasoning effort and display',
    category: 'Configuration',
    argsHint: '[level|show|hide]',
  },
  {
    name: 'fast',
    description: 'Toggle fast mode',
    category: 'Configuration',
    argsHint: '[normal|fast|status]',
  },
  {
    name: 'skin',
    description: 'Show or change the display skin/theme',
    category: 'Configuration',
    argsHint: '[name]',
    cliOnly: true,
  },
  {
    name: 'voice',
    description: 'Toggle voice mode',
    category: 'Configuration',
    argsHint: '[on|off|tts|status]',
  },
  {
    name: 'busy',
    description: 'Control what Enter does while Hermes is working',
    category: 'Configuration',
    argsHint: '[queue|interrupt|status]',
    cliOnly: true,
  },
  {
    name: 'tools',
    description: 'Manage tools',
    category: 'Tools & Skills',
    argsHint: '[list|disable|enable] [name...]',
    cliOnly: true,
  },
  {
    name: 'toolsets',
    description: 'List available toolsets',
    category: 'Tools & Skills',
    cliOnly: true,
  },
  {
    name: 'skills',
    description: 'Search, install, inspect, or manage skills',
    category: 'Tools & Skills',
    argsHint: '[search|browse|inspect|install]',
    cliOnly: true,
  },
  {
    name: 'skill',
    description: 'Load an installed skill by name',
    category: 'Tools & Skills',
    argsHint: '<name> [instruction]',
  },
  {
    name: 'cron',
    description: 'Manage scheduled tasks',
    category: 'Tools & Skills',
    argsHint: '[subcommand]',
    cliOnly: true,
  },
  {
    name: 'reload',
    description: 'Reload .env variables into the running session',
    category: 'Tools & Skills',
    cliOnly: true,
  },
  {
    name: 'reload-mcp',
    description: 'Reload MCP servers from config',
    category: 'Tools & Skills',
    aliases: ['reload_mcp'],
  },
  {
    name: 'browser',
    description: 'Connect browser tools to Chrome via CDP',
    category: 'Tools & Skills',
    argsHint: '[connect|disconnect|status]',
    cliOnly: true,
  },
  {
    name: 'plugins',
    description: 'List installed plugins and their status',
    category: 'Tools & Skills',
    cliOnly: true,
  },
  {
    name: 'commands',
    description: 'Browse all commands and skills',
    category: 'Info',
    argsHint: '[page]',
    gatewayOnly: true,
  },
  {
    name: 'help',
    description: 'Show available commands',
    category: 'Info',
  },
  {
    name: 'restart',
    description: 'Gracefully restart the gateway',
    category: 'Session',
    gatewayOnly: true,
  },
  {
    name: 'usage',
    description: 'Show token usage and rate limits',
    category: 'Info',
  },
  {
    name: 'insights',
    description: 'Show usage insights and analytics',
    category: 'Info',
    argsHint: '[days]',
  },
  {
    name: 'platforms',
    description: 'Show gateway/messaging platform status',
    category: 'Info',
    aliases: ['gateway'],
    cliOnly: true,
  },
  {
    name: 'copy',
    description: 'Copy the last assistant response',
    category: 'Info',
    argsHint: '[number]',
    cliOnly: true,
  },
  {
    name: 'paste',
    description: 'Attach clipboard image',
    category: 'Info',
    cliOnly: true,
  },
  {
    name: 'image',
    description: 'Attach a local image file',
    category: 'Info',
    argsHint: '<path>',
    cliOnly: true,
  },
  {
    name: 'update',
    description: 'Update Hermes Agent',
    category: 'Info',
    gatewayOnly: true,
  },
  {
    name: 'debug',
    description: 'Upload a debug report',
    category: 'Info',
  },
  {
    name: 'profile',
    description: 'Show active profile name and home directory',
    category: 'Info',
  },
  {
    name: 'gquota',
    description: 'Show Google Gemini Code Assist quota usage',
    category: 'Info',
    cliOnly: true,
  },
  {
    name: 'quit',
    description: 'Exit the CLI',
    category: 'Exit',
    aliases: ['exit'],
    cliOnly: true,
  },
]

export function formatSlashCommand(command: HermesSlashCommandDefinition) {
  const args = command.argsHint ? ` ${command.argsHint}` : ''
  return `/${command.name}${args}`
}

export function getSlashCommandAliases(
  command: HermesSlashCommandDefinition,
): Array<string> {
  return [command.name, ...(command.aliases ?? [])]
}

export function resolveHermesSlashCommandExact(
  name: string,
): HermesSlashCommandDefinition | null {
  const normalized = name.trim().toLowerCase().replace(/^\/+/, '')
  if (!normalized) return null

  return (
    HERMES_SLASH_COMMANDS.find((command) =>
      getSlashCommandAliases(command).includes(normalized),
    ) ?? null
  )
}

export function resolveHermesSlashCommand(
  name: string,
): HermesSlashCommandDefinition | null {
  const normalized = name.trim().toLowerCase().replace(/^\/+/, '')
  if (!normalized) return null

  const exact = resolveHermesSlashCommandExact(normalized)
  if (exact) return exact

  return (
    HERMES_SLASH_COMMANDS.find((command) =>
      getSlashCommandAliases(command).some((alias) =>
        alias.startsWith(normalized),
      ),
    ) ?? null
  )
}
