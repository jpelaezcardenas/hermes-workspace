import { useChatSettingsStore } from '@/hooks/use-chat-settings'

type MessageTimestampProps = {
  timestamp: number
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatShort(timestamp: number, use24HourTime: boolean): string {
  const date = new Date(timestamp)
  const now = new Date()
  if (isSameDay(date, now)) {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !use24HourTime,
    }).format(date)
  }

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
  }).format(date)
}

function formatFull(timestamp: number, use24HourTime: boolean): string {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24HourTime,
  }).format(new Date(timestamp))
}

export function MessageTimestamp({ timestamp }: MessageTimestampProps) {
  const use24HourTime = useChatSettingsStore(
    (state) => state.settings.use24HourTime,
  )
  const shortLabel = formatShort(timestamp, use24HourTime)
  const fullLabel = formatFull(timestamp, use24HourTime)

  return (
    <span
      className="inline-flex items-center text-xs text-primary-600"
      title={fullLabel}
    >
      {shortLabel}
    </span>
  )
}
