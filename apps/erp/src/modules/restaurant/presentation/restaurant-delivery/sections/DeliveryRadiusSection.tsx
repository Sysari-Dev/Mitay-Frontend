'use client'

import { useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  DELIVERY_RADIUS_MAX_KM,
  DELIVERY_RADIUS_MIN_KM,
  DELIVERY_RADIUS_STEP_KM,
  type RestaurantCoverageFormValues,
} from '@mitay/core/restaurant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'

const kilometersFormatter = new Intl.NumberFormat('es-PE', { maximumFractionDigits: 1 })

function DeliveryRadiusField() {
  const { control } = useFormContext<RestaurantCoverageFormValues>()
  const sliderId = useId()
  return (
    <Controller
      control={control}
      name="maxDeliveryRadiusKm"
      render={({ field }) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={sliderId} className="text-sm font-medium">
              Radio máximo
            </label>
            <output htmlFor={sliderId} className="font-heading text-2xl font-bold tabular-nums">
              {kilometersFormatter.format(field.value)} km
            </output>
          </div>
          <input
            id={sliderId}
            type="range"
            name={field.name}
            min={DELIVERY_RADIUS_MIN_KM}
            max={DELIVERY_RADIUS_MAX_KM}
            step={DELIVERY_RADIUS_STEP_KM}
            value={field.value}
            onChange={(event) => field.onChange(Number(event.target.value))}
            onBlur={field.onBlur}
            aria-valuetext={`${kilometersFormatter.format(field.value)} kilómetros`}
            className="accent-primary h-2 w-full cursor-pointer"
          />
          <div aria-hidden className="text-muted-foreground flex justify-between text-xs tabular-nums">
            <span>{kilometersFormatter.format(DELIVERY_RADIUS_MIN_KM)} km</span>
            <span>{DELIVERY_RADIUS_MAX_KM} km</span>
          </div>
        </div>
      )}
    />
  )
}

export function DeliveryRadiusSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Radio de reparto</CardTitle>
          <CardDescription>Los clientes fuera del círculo verán que tu local no llega a su dirección.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ) : (
          <DeliveryRadiusField />
        )}
      </CardContent>
    </Card>
  )
}
