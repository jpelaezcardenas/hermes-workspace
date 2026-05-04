import { useEffect, useState } from 'react'
import {
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ClaudeTask, CreateTaskInput, TaskColumn, TaskAssignee } from '@/lib/tasks-api'
import { COLUMN_LABELS, COLUMN_ORDER } from '@/lib/tasks-api'
import { mapLegacyPriorityToNumeric } from '@/lib/hermes-kanban-types'

// Priority labels in the form (friendly) → map to Agent numeric on submit
const PRIORITY_OPTIONS = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Normal', value: 'normal' },
  { label: 'Low', value: 'low' },
] as const
type FormPriority = typeof PRIORITY_OPTIONS[number]['value']

function formPriorityToNumeric(p: FormPriority): number {
  if (p === 'high') return 3
  if (p === 'medium') return 1
  if (p === 'normal') return 0
  return -1
}

// Map column/status to Agent create payload fields
function columnToCreatePayload(column: TaskColumn): { triage?: boolean } {
  if (column === 'triage') return { triage: true }
  return { triage: false }
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: ClaudeTask | null
  defaultColumn?: TaskColumn
  assignees: Array<TaskAssignee>
  onSubmit: (input: CreateTaskInput) => Promise<void>
  isSubmitting: boolean
}

export function TaskDialog({ open, onOpenChange, task, defaultColumn, assignees, onSubmit, isSubmitting }: Props) {
  const isEdit = Boolean(task)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [column, setColumn] = useState<TaskColumn>(defaultColumn ?? 'triage')
  const [priority, setPriority] = useState<FormPriority>('normal')
  const [assignee, setAssignee] = useState<string>('')
  const [tenant, setTenant] = useState('')
  const [skills, setSkills] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setBody(task.body ?? '')
      setColumn((task.status as TaskColumn) ?? 'triage')
      const numPri = typeof task.priority === 'number' ? task.priority : mapLegacyPriorityToNumeric(String(task.priority))
      setPriority(numPri >= 3 ? 'high' : numPri >= 1 ? 'medium' : numPri === 0 ? 'normal' : 'low')
      setAssignee(task.assignee ?? '')
      setTenant(task.tenant ?? '')
      setSkills(Array.isArray(task.skills) ? task.skills.join(', ') : (task.skills ?? ''))
    } else {
      setTitle('')
      setBody('')
      setColumn(defaultColumn ?? 'triage')
      setPriority('normal')
      setAssignee('')
      setTenant('')
      setSkills('')
    }
  }, [task, open, defaultColumn])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const skillsArr = skills.split(',').map(s => s.trim()).filter(Boolean)
    const payload = columnToCreatePayload(column)
    await onSubmit({
      title: title.trim(),
      body: body.trim() || null,
      priority: formPriorityToNumeric(priority),
      assignee: assignee || null,
      tenant: tenant.trim() || null,
      skills: skillsArr.length > 0 ? skillsArr : null,
      ...payload,
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
            {isEdit ? 'Edit Task' : 'New Task'}
          </DialogTitle>
          <DialogDescription className="text-xs text-[var(--theme-muted)] mb-4">
            {isEdit ? 'Update the task details below.' : 'Fill in the details for your new task.'}
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className={labelClass}>Title *</label>
              <input
                className={inputClass}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                required
                autoFocus
              />
            </div>

            <div>
              <label className={labelClass}>Body</label>
              <textarea
                className={cn(inputClass, 'resize-none')}
                rows={3}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Optional details, acceptance criteria, context…"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Status</label>
                <select
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  value={column}
                  onChange={e => setColumn(e.target.value as TaskColumn)}
                >
                  {COLUMN_ORDER.map(col => (
                    <option key={col} value={col}>{COLUMN_LABELS[col]}</option>
                  ))}
                </select>
                <p className="mt-1 text-[10px] text-[var(--theme-muted)]">
                  Triage = backlog. Ready = dispatchable immediately.
                </p>
              </div>
              <div>
                <label className={labelClass}>Priority</label>
                <select
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  value={priority}
                  onChange={e => setPriority(e.target.value as FormPriority)}
                >
                  {PRIORITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Assignee</label>
                <select
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                  value={assignee}
                  onChange={e => setAssignee(e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {assignees.map(({ id, label }) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Tenant</label>
                <input
                  className={inputClass}
                  value={tenant}
                  onChange={e => setTenant(e.target.value)}
                  placeholder="e.g. mission-42 (optional)"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Skills (comma-separated)</label>
              <input
                className={inputClass}
                value={skills}
                onChange={e => setSkills(e.target.value)}
                placeholder="e.g. python, code-review, research"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-[10px] text-[var(--theme-muted)]">Press Esc to cancel</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !title.trim()}
                  style={{ background: 'var(--theme-accent)', color: 'white' }}
                >
                  {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Task'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
