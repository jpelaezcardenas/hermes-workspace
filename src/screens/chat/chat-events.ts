export const CHAT_OPEN_MESSAGE_SEARCH_EVENT = 'agentone:chat-open-message-search'

export const CHAT_RUN_COMMAND_EVENT = 'agentone:chat-run-command'

export const CHAT_PENDING_COMMAND_STORAGE_KEY = 'agentone.pending-chat-command'

export type ChatRunCommandDetail = {
  command: string
}

export const CHAT_OPEN_SETTINGS_EVENT = 'agentone:chat-open-settings'

export type ChatOpenSettingsDetail = {
  section: 'model' | 'appearance'
}
