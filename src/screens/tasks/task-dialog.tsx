import { useEffect, useState } from 'react'
import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import {
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type {
  HermesTask,
  CreateTaskInput,
  TaskColumn,
  TaskPriority,
  TaskAssignee,
} from '@/lib/tasks-api'
import { COLUMN_LABELS, COLUMN_ORDER } from '@/lib/tasks-api'

const COLUMN_I18N_KEY: Record<TaskColumn, 'backlog' | 'todo' | 'inProgress' | 'review' | 'done'> = {
  backlog: 'backlog',
  todo: 'todo',
  in_progress: 'inProgress',
  review: 'review',
  done: 'done',
}

function columnOptionLabel(t: TFunction<'tasks'>, col: TaskColumn) {
  const key = COLUMN_I18N_KEY[col]
  return t(key, { defaultValue: COLUMN_LABELS[col] })
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: HermesTask | null
  defaultColumn?: TaskColumn
  assignees: Array<TaskAssignee>
  onSubmit: (input: CreateTaskInput) => Promise<void>
  isSubmitting: boolean
}

export function TaskDialog({ open, onOpenChange, task, defaultColumn, assignees, onSubmit, isSubmitting }: Props) {
  const { t } = useTranslation('tasks')
  const { t: tCommon } = useTranslation('common')
  const isEdit = Boolean(task)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [column, setColumn] = useState<TaskColumn>(defaultColumn ?? 'backlog')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [assignee, setAssignee] = useState<string>('')
  const [tags, setTags] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setColumn(task.column)
      setPriority(task.priority)
      setAssignee(task.assignee ?? '')
      setTags(task.tags.join(', '))
      setDueDate(task.due_date ?? '')
    } else {
      setTitle('')
      setDescription('')
      setColumn(defaultColumn ?? 'backlog')
      setPriority('medium')
      setAssignee('')
      setTags('')
      setDueDate('')
    }
  }, [task, open, defaultColumn])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      column,
      priority,
      assignee: assignee || null,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      due_date: dueDate || null,
    })
  }

  const inputClass = cn(
    'w-full rounded-lg border px-3 py-2 text-sm',
    'bg-[var(--theme-input)] border-[var(--theme-border)] text-[var(--theme-text)]',
    'focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]',
    'placeholder:text-[var(--theme-muted)]',
  )

  const labelClass = 'block text-xs font-medium text-[var(--theme-muted)] mb-1'

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(520px,95vw)] border-[var(--theme-border)] bg-[var(--theme-bg)] overflow-hidden">
        {/* Accent top border */}
        <div className="h-[3px] w-full" style={{ background: 'var(--theme-accent)' }} />

        <div className="p-5">
          <DialogTitle className="text-base font-semibold text-[var(--theme-text)] mb-1">
            {isEdit
              ? t('dialogEditTitle', { defaultValue: 'Edit Task' })
              : t('dialogNewTitle', { defaultValue: 'New Task' })}
          </DialogTitle>
          <DialogDescription className="text-xs text-[var(--theme-muted)] mb-4">
            {isEdit
              ? t('dialogEditDesc', { defaultValue: 'Update the task details below.' })
              : t('dialogNewDesc', { defaultValue: 'Fill in the details for your new task.' })}
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className={labelClass}>{t('fieldTitle', { defaultValue: 'Title *' })}</label>
              <input
                className={inputClass}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={t('placeholderTitle', { defaultValue: 'What needs to be done?' })}
                required
                autoFocus
              />
            </div>

            <div>
              <label className={labelClass}>{t('fieldDescription', { defaultValue: 'Description' })}</label>
              <textarea
                className={cn(inputClass, 'resize-none')}
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={t('placeholderDescription', { defaultValue: 'Optional details...' })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>{t('fieldColumn', { defaultValue: 'Column' })}</label>
                <select
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  value={column}
                  onChange={e => setColumn(e.target.value as TaskColumn)}
                >
                  {COLUMN_ORDER.map(col => (
                    <option key={col} value={col}>
                      {columnOptionLabel(t, col)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t('fieldPriority', { defaultValue: 'Priority' })}</label>
                <select
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  value={priority}
                  onChange={e => setPriority(e.target.value as TaskPriority)}
                >
                  <option value="high">{t('priorityHigh', { defaultValue: 'High' })}</option>
                  <option value="medium">{t('priorityMedium', { defaultValue: 'Medium' })}</option>
                  <option value="low">{t('priorityLow', { defaultValue: 'Low' })}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>{t('fieldAssignee', { defaultValue: 'Assignee' })}</label>
                <select
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  value={assignee}
                  onChange={e => setAssignee(e.target.value)}
                >
                  <option value="">{t('unassigned', { defaultValue: 'Unassigned' })}</option>
                  {assignees.map(({ id, label }) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
                <p className="mt-1 text-[10px] text-[var(--theme-muted)]">
                  {t('assigneeHint', {
                    defaultValue:
                      'Assignee is separate from status. Dragging a card changes its column only.',
                  })}
                </p>
              </div>
              <div>
                <label className={labelClass}>{t('fieldDueDate', { defaultValue: 'Due Date' })}</label>
                <input
                  type="date"
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t('fieldTags', { defaultValue: 'Tags (comma-separated)' })}</label>
              <input
                className={inputClass}
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder={t('placeholderTags', { defaultValue: 'frontend, bug, research' })}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-[10px] text-[var(--theme-muted)]">
                {t('pressEscToCancel', { defaultValue: 'Press Esc to cancel' })}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  {tCommon('cancel', { defaultValue: 'Cancel' })}
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !title.trim()}
                  style={{ background: 'var(--theme-accent)', color: 'white' }}
                >
                  {isSubmitting
                    ? t('saving', { defaultValue: 'Saving...' })
                    : isEdit
                      ? t('saveChanges', { defaultValue: 'Save Changes' })
                      : t('createTask', { defaultValue: 'Create Task' })}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
