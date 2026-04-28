'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import type { HermesJob } from '@/lib/jobs-api'

const SCHEDULE_PRESET_DEFS = [
  { scheduleKey: 'schedule_every15m' as const, value: 'every 15m' },
  { scheduleKey: 'schedule_every30m' as const, value: 'every 30m' },
  { scheduleKey: 'schedule_every1h' as const, value: 'every 1h' },
  { scheduleKey: 'schedule_every6h' as const, value: 'every 6h' },
  { scheduleKey: 'schedule_daily' as const, value: '0 9 * * *' },
  { scheduleKey: 'schedule_weekly' as const, value: '0 9 * * 1' },
] as const

const SCHEDULE_DEFAULT_LABELS: Record<
  (typeof SCHEDULE_PRESET_DEFS)[number]['scheduleKey'],
  string
> = {
  schedule_every15m: 'Every 15m',
  schedule_every30m: 'Every 30m',
  schedule_every1h: 'Every 1h',
  schedule_every6h: 'Every 6h',
  schedule_daily: 'Daily',
  schedule_weekly: 'Weekly',
}

const DELIVERY_OPTIONS = ['local', 'telegram', 'discord'] as const

type EditJobDialogProps = {
  job: HermesJob | null
  open: boolean
  isSubmitting?: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (input: {
    name: string
    schedule: string
    prompt: string
    deliver?: Array<string>
    skills?: Array<string>
    repeat?: number
  }) => void | Promise<void>
}

function readScheduleValue(job: HermesJob): string {
  if (typeof job.schedule_display === 'string' && job.schedule_display.trim()) {
    return job.schedule_display.trim()
  }
  const schedule = job.schedule
  if (schedule && typeof schedule === 'object') {
    const record = schedule
    const candidates = [
      record.expression,
      record.cron,
      record.raw,
      record.value,
      record.schedule,
    ]
    for (const candidate of candidates) {
      if (typeof candidate === 'string' && candidate.trim()) {
        return candidate.trim()
      }
    }
  }
  return ''
}

function getInitialState(job: HermesJob | null) {
  const repeatTimes = job?.repeat?.times
  const repeatCompleted = job?.repeat?.completed ?? 0
  const remainingRepeats =
    typeof repeatTimes === 'number'
      ? Math.max(1, repeatTimes - repeatCompleted)
      : null

  return {
    name: job?.name ?? '',
    schedule: job ? readScheduleValue(job) : 'every 30m',
    prompt: job?.prompt ?? '',
    skillsInput: Array.isArray(job?.skills) ? job.skills.join(', ') : '',
    deliver:
      Array.isArray(job?.deliver) && job.deliver.length > 0
        ? [...job.deliver]
        : ['local'],
    repeatMode:
      remainingRepeats === null ? ('unlimited' as const) : ('limited' as const),
    repeatCount: remainingRepeats === null ? '1' : String(remainingRepeats),
  }
}

export function EditJobDialog({
  job,
  open,
  isSubmitting = false,
  onOpenChange,
  onSubmit,
}: EditJobDialogProps) {
  const { t } = useTranslation(['jobs', 'common'])
  const schedulePresets = useMemo(
    () =>
      SCHEDULE_PRESET_DEFS.map((row) => ({
        label: t(`jobs:${row.scheduleKey}`, {
          defaultValue: SCHEDULE_DEFAULT_LABELS[row.scheduleKey],
        }),
        value: row.value,
      })),
    [t],
  )
  const [form, setForm] = useState(() => getInitialState(job))

  useEffect(() => {
    if (!open) {
      setForm(getInitialState(job))
      return
    }

    setForm(getInitialState(job))

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [job, open, onOpenChange])

  function toggleDelivery(target: string) {
    setForm((current) => {
      const nextDeliver = current.deliver.includes(target)
        ? current.deliver.filter((item) => item !== target)
        : [...current.deliver, target]

      return {
        ...current,
        deliver: nextDeliver,
      }
    })
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const skills = form.skillsInput
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean)

    void onSubmit({
      name: form.name.trim(),
      schedule: form.schedule.trim(),
      prompt: form.prompt.trim(),
      deliver: form.deliver.length > 0 ? form.deliver : undefined,
      skills: skills.length > 0 ? Array.from(new Set(skills)) : undefined,
      repeat:
        form.repeatMode === 'limited'
          ? Math.max(1, Number.parseInt(form.repeatCount, 10) || 1)
          : undefined,
    })
  }

  return (
    <AnimatePresence>
      {open && job ? (
        <motion.div
          key="edit-job-dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onOpenChange(false)
            }
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0, 0, 0, 0.68)' }}
            onClick={() => onOpenChange(false)}
          />
          <motion.form
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onSubmit={handleFormSubmit}
            className="relative z-10 flex max-h-[85vh] w-[min(720px,96vw)] flex-col overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              background: 'var(--theme-card)',
              borderColor: 'var(--theme-border)',
              color: 'var(--theme-text)',
            }}
          >
            <div
              className="flex items-start justify-between gap-4 border-b px-5 py-4"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {t('jobs:dialogEditTitle', { defaultValue: 'Edit Job' })}
                </h2>
                <p
                  className="mt-1 text-sm"
                  style={{ color: 'var(--theme-muted)' }}
                >
                  {t('jobs:dialogEditSubtitle', {
                    defaultValue:
                      'Update the schedule, prompt, and routing for this Hermes task.',
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-lg p-2 transition-colors"
                style={{ color: 'var(--theme-muted)' }}
                aria-label={t('jobs:ariaCloseEdit', {
                  defaultValue: 'Close edit job dialog',
                })}
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
              <section className="space-y-2">
                <label className="text-sm font-medium">
                  {t('jobs:fieldName', { defaultValue: 'Name' })}
                </label>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder={t('jobs:placeholderName', {
                    defaultValue: 'Daily research summary',
                  })}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1"
                  style={{
                    background: 'var(--theme-input)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                    boxShadow: '0 0 0 0 transparent',
                  }}
                />
              </section>

              <section className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium">
                    {t('jobs:fieldSchedule', { defaultValue: 'Schedule' })}
                  </h3>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: 'var(--theme-muted)' }}
                  >
                    {t('jobs:fieldScheduleHint', {
                      defaultValue:
                        'Choose a preset or enter a custom schedule string below.',
                    })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {schedulePresets.map((preset) => {
                    const isActive = form.schedule === preset.value
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            schedule: preset.value,
                          }))
                        }
                        className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                        style={{
                          background: isActive
                            ? 'var(--theme-accent)'
                            : 'var(--theme-card)',
                          borderColor: isActive
                            ? 'var(--theme-accent)'
                            : 'var(--theme-border)',
                          color: isActive ? '#fff' : 'var(--theme-text)',
                        }}
                      >
                        {preset.label}
                      </button>
                    )
                  })}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('jobs:fieldCustomSchedule', {
                      defaultValue: 'Custom schedule',
                    })}
                  </label>
                  <input
                    value={form.schedule}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        schedule: event.target.value,
                      }))
                    }
                    placeholder={t('jobs:placeholderCustomSchedule', {
                      defaultValue: 'every 30m or 0 9 * * *',
                    })}
                    required
                    className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1"
                    style={{
                      background: 'var(--theme-input)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text)',
                    }}
                  />
                </div>
              </section>

              <section className="space-y-2">
                <label className="text-sm font-medium">
                  {t('jobs:fieldPrompt', { defaultValue: 'Prompt' })}
                </label>
                <textarea
                  value={form.prompt}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      prompt: event.target.value,
                    }))
                  }
                  placeholder={t('jobs:placeholderPrompt', {
                    defaultValue: 'What should Hermes do?',
                  })}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1"
                  style={{
                    background: 'var(--theme-input)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                  }}
                />
              </section>

              <section className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">
                    {t('jobs:sectionOptions', { defaultValue: 'Options' })}
                  </h3>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: 'var(--theme-muted)' }}
                  >
                    {t('jobs:sectionOptionsHint', {
                      defaultValue: 'Optional routing and repeat controls.',
                    })}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('jobs:fieldSkills', { defaultValue: 'Skills' })}
                  </label>
                  <input
                    value={form.skillsInput}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        skillsInput: event.target.value,
                      }))
                    }
                    placeholder={t('jobs:placeholderSkills', {
                      defaultValue: 'research, writing, synthesis',
                    })}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1"
                    style={{
                      background: 'var(--theme-input)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text)',
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('jobs:fieldDeliver', { defaultValue: 'Deliver to' })}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DELIVERY_OPTIONS.map((option) => {
                      const isActive = form.deliver.includes(option)
                      const needsGateway =
                        option === 'telegram' || option === 'discord'
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleDelivery(option)}
                          title={
                            needsGateway
                              ? t('jobs:deliverRequiresGateway', {
                                  channel: option,
                                  defaultValue:
                                    'Requires Hermes Gateway with {{channel}} configured',
                                })
                              : undefined
                          }
                          className="rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors"
                          style={{
                            background: isActive
                              ? 'var(--theme-accent)'
                              : 'var(--theme-card)',
                            borderColor: isActive
                              ? 'var(--theme-accent)'
                              : 'var(--theme-border)',
                            color: isActive
                              ? '#fff'
                              : needsGateway
                                ? 'var(--theme-muted)'
                                : 'var(--theme-text)',
                          }}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t('jobs:fieldRepeat', { defaultValue: 'Repeat' })}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          repeatMode: 'unlimited',
                        }))
                      }
                      className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                      style={{
                        background:
                          form.repeatMode === 'unlimited'
                            ? 'var(--theme-accent)'
                            : 'var(--theme-card)',
                        borderColor:
                          form.repeatMode === 'unlimited'
                            ? 'var(--theme-accent)'
                            : 'var(--theme-border)',
                        color:
                          form.repeatMode === 'unlimited'
                            ? '#fff'
                            : 'var(--theme-text)',
                      }}
                    >
                      {t('jobs:repeatUnlimited', {
                        defaultValue: 'Unlimited',
                      })}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          repeatMode: 'limited',
                        }))
                      }
                      className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                      style={{
                        background:
                          form.repeatMode === 'limited'
                            ? 'var(--theme-accent)'
                            : 'var(--theme-card)',
                        borderColor:
                          form.repeatMode === 'limited'
                            ? 'var(--theme-accent)'
                            : 'var(--theme-border)',
                        color:
                          form.repeatMode === 'limited'
                            ? '#fff'
                            : 'var(--theme-text)',
                      }}
                    >
                      {t('jobs:repeatSetCount', { defaultValue: 'Set count' })}
                    </button>
                  </div>
                  {form.repeatMode === 'limited' ? (
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={form.repeatCount}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          repeatCount: event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1"
                      style={{
                        background: 'var(--theme-input)',
                        borderColor: 'var(--theme-border)',
                        color: 'var(--theme-text)',
                      }}
                    />
                  ) : null}
                </div>
              </section>
            </div>

            <div
              className="flex items-center justify-end gap-2 border-t px-5 py-4"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-xl px-4 py-2 text-sm transition-colors"
                style={{
                  background: 'var(--theme-card)',
                  color: 'var(--theme-muted)',
                }}
              >
                {t('common:cancel', { defaultValue: 'Cancel' })}
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !form.name.trim() ||
                  !form.schedule.trim() ||
                  !form.prompt.trim()
                }
                className="rounded-xl px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
                style={{ background: 'var(--theme-accent)' }}
              >
                {isSubmitting
                  ? t('jobs:saving', { defaultValue: 'Saving...' })
                  : t('jobs:saveChanges', { defaultValue: 'Save changes' })}
              </button>
            </div>
          </motion.form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
