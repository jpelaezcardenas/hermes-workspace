import type { McpClientInput } from '@/types/mcp'

export interface McpPreset {
  id: string
  name: string
  description: string
  category: string
  template: McpClientInput
}

export const MCP_PRESETS: Array<McpPreset> = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Read repos, issues, PRs via the GitHub MCP server.',
    category: 'Official Presets',
    template: {
      name: 'github',
      transportType: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: { GITHUB_PERSONAL_ACCESS_TOKEN: '' },
      authType: 'none',
      toolMode: 'all',
    },
  },
  {
    id: 'filesystem',
    name: 'Filesystem',
    description: 'Read and write files within an allow-listed root.',
    category: 'Official Presets',
    template: {
      name: 'filesystem',
      transportType: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/root'],
      authType: 'none',
      toolMode: 'all',
    },
  },
  {
    id: 'postgres',
    name: 'Postgres',
    description: 'Run read-only SQL against a Postgres database.',
    category: 'Official Presets',
    template: {
      name: 'postgres',
      transportType: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:pass@host:5432/db'],
      authType: 'none',
      toolMode: 'all',
    },
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Read and post messages via the Slack MCP server.',
    category: 'Official Presets',
    template: {
      name: 'slack',
      transportType: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-slack'],
      env: { SLACK_BOT_TOKEN: '', SLACK_TEAM_ID: '' },
      authType: 'none',
      toolMode: 'all',
    },
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Query Linear issues and projects.',
    category: 'Official Presets',
    template: {
      name: 'linear',
      transportType: 'http',
      url: 'https://mcp.linear.app/sse',
      authType: 'oauth',
      toolMode: 'all',
    },
  },
]
