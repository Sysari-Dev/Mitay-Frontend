'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { ConfirmDialog } from '@mitay/ui/molecules/confirm-dialog'

type SoldOutNoticeSectionProps = {
  soldOutCount: number
  onReactivateAll: () => void
}

export function SoldOutNoticeSection({ soldOutCount, onReactivateAll }: SoldOutNoticeSectionProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  if (soldOutCount === 0) return null
  const dishesLabel = soldOutCount === 1 ? '1 plato agotado' : `${soldOutCount} platos agotados`
  return (
    <div className="border-warning/40 bg-warning/10 flex flex-col gap-3 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm">
        Tienes <span className="font-semibold">{dishesLabel}</span>. ¿Empiezas un nuevo día? Reactívalos de una vez.
      </p>
      <Button variant="outline" color="neutral" size="sm" onClick={() => setIsConfirming(true)} className="self-start sm:self-auto">
        <RotateCcw aria-hidden />
        Reactivar todos
      </Button>
      <ConfirmDialog
        open={isConfirming}
        onOpenChange={setIsConfirming}
        title="¿Reactivar todos los platos?"
        description={`Los ${dishesLabel} volverán a estar disponibles para tus clientes.`}
        confirmLabel="Reactivar todos"
        tone="primary"
        onConfirm={onReactivateAll}
      />
    </div>
  )
}
