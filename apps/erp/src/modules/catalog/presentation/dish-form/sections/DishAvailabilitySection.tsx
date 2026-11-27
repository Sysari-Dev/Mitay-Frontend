'use client'

import { useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { DishFormInput } from '@mitay/core/catalog'
import { Card, CardContent } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { Switch } from '@mitay/ui/atoms/switch'

function DishAvailabilityField() {
  const { control } = useFormContext<DishFormInput>()
  const switchId = useId()
  const descriptionId = `${switchId}-description`
  return (
    <Controller
      control={control}
      name="isAvailable"
      render={({ field }) => (
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <label htmlFor={switchId} className="cursor-pointer text-sm font-semibold">
              {field.value ? 'Disponible para pedir' : 'Agotado'}
            </label>
            <p id={descriptionId} className="text-muted-foreground text-sm">
              {field.value
                ? 'Tus clientes pueden agregarlo a su pedido.'
                : 'Se muestra en tu carta, pero no se puede pedir.'}
            </p>
          </div>
          <Switch
            id={switchId}
            checked={field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            aria-describedby={descriptionId}
          />
        </div>
      )}
    />
  )
}

export function DishAvailabilitySection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-5 sm:pt-6">
        {isLoading ? (
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-11 rounded-full" />
          </div>
        ) : (
          <DishAvailabilityField />
        )}
      </CardContent>
    </Card>
  )
}
