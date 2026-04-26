'use client'

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import type { Ref } from 'react'

import { useAutocompleteFilter } from '@/components/ui/autocomplete'
import { Command, CommandItem, CommandList } from '@/components/ui/command'
import { HERMES_SLASH_COMMANDS } from '@/lib/hermes-slash-commands'
import { cn } from '@/lib/utils'

type SlashCommandDefinition = {
  command: string
  description: string
}

type SlashCommandMenuProps = {
  open: boolean
  query: string
  onSelect: (command: SlashCommandDefinition) => void
}

type SlashCommandMenuHandle = {
  moveSelection: (step: number) => void
  selectActive: () => boolean
}

const SLASH_COMMANDS: Array<SlashCommandDefinition> = HERMES_SLASH_COMMANDS
  .filter((command) => !command.gatewayOnly)
  .map((command) => ({
    command: `/${command.name}`,
    description: command.description,
  }))

const SlashCommandMenu = forwardRef(function SlashCommandMenu(
  { open, query, onSelect }: SlashCommandMenuProps,
  ref: Ref<SlashCommandMenuHandle>,
) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [skillCommands, setSkillCommands] = useState<
    Array<SlashCommandDefinition>
  >([])
  const filter = useAutocompleteFilter({ sensitivity: 'base' })

  useEffect(() => {
    if (!open) return
    let cancelled = false
    fetch('/api/skill-commands')
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: unknown) => {
        if (cancelled || !payload || typeof payload !== 'object') return
        const commands = (payload as { commands?: unknown }).commands
        if (!Array.isArray(commands)) return
        setSkillCommands(
          commands
            .map((entry) => {
              if (!entry || typeof entry !== 'object') return null
              const record = entry as Record<string, unknown>
              const command =
                typeof record.command === 'string' ? record.command : ''
              const description =
                typeof record.description === 'string'
                  ? record.description
                  : 'Invoke skill'
              if (!command.startsWith('/')) return null
              return { command, description }
            })
            .filter((entry): entry is SlashCommandDefinition => entry !== null),
        )
      })
      .catch(() => {
        // Skills are an optional dynamic enhancement; built-ins still work.
      })
    return () => {
      cancelled = true
    }
  }, [open])

  const availableCommands = useMemo(() => {
    const seen = new Set<string>()
    return [...SLASH_COMMANDS, ...skillCommands].filter((command) => {
      if (seen.has(command.command)) return false
      seen.add(command.command)
      return true
    })
  }, [skillCommands])

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return availableCommands

    return availableCommands.filter((item) =>
      filter.contains(
        item,
        normalizedQuery,
        (target) => `${target.command} ${target.description}`,
      ),
    )
  }, [availableCommands, filter, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [open, query])

  useEffect(() => {
    if (filteredCommands.length === 0) {
      setActiveIndex(0)
      return
    }
    setActiveIndex((previous) =>
      Math.max(0, Math.min(previous, filteredCommands.length - 1)),
    )
  }, [filteredCommands.length])

  useImperativeHandle(
    ref,
    () => ({
      moveSelection(step: number) {
        if (!open || filteredCommands.length === 0) return
        const direction = step >= 0 ? 1 : -1
        setActiveIndex((previous) => {
          const next = previous + direction
          if (next < 0) return filteredCommands.length - 1
          if (next >= filteredCommands.length) return 0
          return next
        })
      },
      selectActive() {
        if (!open || filteredCommands.length === 0) return false
        const selected = filteredCommands[activeIndex]
        if (!selected) return false
        onSelect(selected)
        return true
      },
    }),
    [activeIndex, filteredCommands, onSelect, open],
  )

  if (!open) return null

  return (
    <div className="pointer-events-none absolute inset-x-2 bottom-[calc(100%+0.5rem)] z-[70]">
      <div
        className="pointer-events-auto overflow-hidden rounded-xl border border-primary-200 shadow-lg"
        style={{
          background: 'var(--color-surface, var(--theme-card, #1a1f2e))',
        }}
      >
        <Command
          items={filteredCommands}
          value={query}
          onValueChange={() => {}}
          mode="none"
          autoHighlight={false}
          keepHighlight={false}
        >
          {filteredCommands.length === 0 ? (
            <div className="px-3 py-2 text-sm text-primary-600">
              No commands found
            </div>
          ) : (
            <CommandList className="max-h-60 min-h-0">
              {filteredCommands.map((item, index) => (
                <CommandItem
                  key={item.command}
                  value={item.command}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => onSelect(item)}
                  className={cn(
                    'flex flex-col items-start gap-0.5 rounded-md px-3 py-2',
                    index === activeIndex && 'bg-primary-100 text-primary-900',
                  )}
                >
                  <span className="text-sm font-semibold">{item.command}</span>
                  <span className="text-xs text-primary-600">
                    {item.description}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          )}
        </Command>
      </div>
    </div>
  )
})

export {
  SlashCommandMenu,
  type SlashCommandDefinition,
  type SlashCommandMenuHandle,
}
