'use client'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type SessionDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionTitle: string
  onConfirm: () => void
  onCancel: () => void
}

export function SessionDeleteDialog({
  open,
  onOpenChange,
  sessionTitle,
  onConfirm,
  onCancel,
}: SessionDeleteDialogProps) {
  return (
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="p-4">
          <AlertDialogTitle className="mb-1">{t('delete_session')}</AlertDialogTitle>
          <AlertDialogDescription className="mb-4">
            Are you sure you want to delete "{sessionTitle}"? This action cannot
            be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel onClick={onCancel}>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>{t('delete')}</AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}
