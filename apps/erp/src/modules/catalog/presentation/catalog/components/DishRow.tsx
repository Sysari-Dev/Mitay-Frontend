'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Ellipsis, Pencil, Trash2, UtensilsCrossed } from 'lucide-react'
import type { Dish } from '@mitay/core/catalog'
import { Button } from '@mitay/ui/atoms/button'
import { Switch } from '@mitay/ui/atoms/switch'
import { cn } from '@mitay/ui/lib/utils'
import { ConfirmDialog } from '@mitay/ui/molecules/confirm-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@mitay/ui/organisms/dropdown-menu'
import { formatPEN } from '@mitay/utils'

type DishRowProps = {
  dish: Dish
  onToggleAvailability: (dishId: string, isAvailable: boolean) => void
  onDelete: (dishId: string) => void
}

export function DishRow({ dish, onToggleAvailability, onDelete }: DishRowProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const switchId = useId()
  const price = formatPEN(dish.priceCents)
  return (
    <li className="flex items-start gap-3 py-4 first:pt-0 last:pb-0 sm:items-center sm:gap-4">
      <div
        className={cn(
          'bg-muted text-muted-foreground relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:size-16',
          !dish.isAvailable && 'opacity-60 grayscale',
        )}
      >
        {dish.imageUrl ? (
          <Image src={dish.imageUrl} alt="" fill unoptimized sizes="64px" className="object-cover" />
        ) : (
          <UtensilsCrossed aria-hidden className="size-5" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className={cn('font-sans text-sm font-semibold', !dish.isAvailable && 'text-muted-foreground')}>
              {dish.name}
            </h3>
            {!dish.isAvailable && (
              <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">Agotado</span>
            )}
          </div>
          {dish.description && <p className="text-muted-foreground line-clamp-2 text-sm">{dish.description}</p>}
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
          <p className="text-sm font-semibold tabular-nums sm:w-24 sm:text-right">{price}</p>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id={switchId}
                checked={dish.isAvailable}
                onCheckedChange={(checked) => onToggleAvailability(dish.id, checked)}
                aria-label={`${dish.name}: ${dish.isAvailable ? 'disponible' : 'agotado'}`}
              />
              <label htmlFor={switchId} className="text-muted-foreground hidden w-16 cursor-pointer text-xs lg:block">
                {dish.isAvailable ? 'Disponible' : 'Agotado'}
              </label>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" color="neutral" size="icon" aria-label={`Acciones de ${dish.name}`}>
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`/catalog/dishes/${dish.id}`}>
                    <Pencil aria-hidden />
                    Editar plato
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem tone="destructive" onSelect={() => setIsConfirmingDelete(true)}>
                  <Trash2 aria-hidden />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={isConfirmingDelete}
        onOpenChange={setIsConfirmingDelete}
        title={`¿Eliminar "${dish.name}"?`}
        description="Dejará de aparecer en tu carta. Si fue un error, podrás crearlo de nuevo."
        confirmLabel="Eliminar plato"
        onConfirm={() => onDelete(dish.id)}
      />
    </li>
  )
}
