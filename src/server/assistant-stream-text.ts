const RESTART_START_RE =
  /^(hey|yo|yes|no|sure|okay|ok|i(?:'|’)?m|christian|the|this|it)\b/i

export function shouldReplaceAfterStreamRestart(
  accumulated: string,
  delta: string,
  lastContentAt: number,
  now: number,
): boolean {
  const previous = accumulated.trimEnd()
  const next = delta.trimStart()
  if (!previous || !next) return false
  if (delta.length > 80) return false
  if (now - lastContentAt < 750) return false
  if (!/[.!?]$/.test(previous)) return false
  if (!RESTART_START_RE.test(next)) return false
  return true
}

export function appendAssistantStreamDelta(
  accumulated: string,
  delta: string,
  lastContentAt: number,
  now: number,
): string {
  if (
    shouldReplaceAfterStreamRestart(accumulated, delta, lastContentAt, now)
  ) {
    return delta
  }
  return accumulated + delta
}
