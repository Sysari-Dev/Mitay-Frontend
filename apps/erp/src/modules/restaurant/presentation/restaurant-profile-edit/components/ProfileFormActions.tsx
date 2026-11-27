import Link from 'next/link'
import { LoaderCircle } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'

type ProfileFormActionsProps = {
  isDirty: boolean
  isSubmitting: boolean
}

export function ProfileFormActions({ isDirty, isSubmitting }: ProfileFormActionsProps) {
  return (
    <div className="bg-background/95 border-border sticky bottom-0 z-10 -mx-4 flex flex-col gap-3 border-t px-4 py-3 backdrop-blur sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:rounded-xl sm:border sm:px-5">
      <p aria-live="polite" className="text-muted-foreground text-sm">
        {isDirty ? 'Tienes cambios sin guardar' : 'No hay cambios por guardar'}
      </p>
      <div className="flex gap-3">
        <Button asChild variant="outline" color="neutral" className="flex-1 sm:flex-none">
          <Link href="/restaurant">Cancelar</Link>
        </Button>
        <Button type="submit" disabled={!isDirty || isSubmitting} className="flex-1 sm:flex-none">
          {isSubmitting && <LoaderCircle aria-hidden className="animate-spin" />}
          {isSubmitting ? 'Guardando…' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  )
}
