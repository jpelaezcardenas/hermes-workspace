import { memo } from 'react'
import { cn } from '@/lib/utils'

type AvatarProps = {
  size?: number
  className?: string
}

/**
 * Assistant avatar — Cael profile portrait.
 */
function AssistantAvatarComponent({ size = 28, className }: AvatarProps) {
  return (
    <img
      src="/cael-avatar.png"
      alt="Cael"
      className={cn('shrink-0 object-cover', className)}
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(6, Math.round(size * 0.5)),
      }}
    />
  )
}

export const AssistantAvatar = memo(AssistantAvatarComponent)
