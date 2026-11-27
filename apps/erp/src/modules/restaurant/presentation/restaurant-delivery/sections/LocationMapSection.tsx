'use client'

import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { CircleAlert, LoaderCircle, LocateFixed } from 'lucide-react'
import type { RestaurantCoverageFormValues } from '@mitay/core/restaurant'
import { Button } from '@mitay/ui/atoms/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Input } from '@mitay/ui/atoms/input'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { FormField } from '@mitay/ui/molecules/form-field'
import { MapPicker, type MapPoint } from '@mitay/ui/organisms/map-picker'
import { useGeolocation } from '@/modules/restaurant/presentation/restaurant-delivery/hooks/useGeolocation'
import { restaurantProfileFixture } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

const MAP_HEIGHT_CLASS_NAME = 'h-72 sm:h-96'
const COORDINATE_STEP = 0.000001

function LocationMapFields() {
  const { control, register, setValue, formState } = useFormContext<RestaurantCoverageFormValues>()
  const [latitude, longitude, radiusKm] = useWatch<
    RestaurantCoverageFormValues,
    ['latitude', 'longitude', 'maxDeliveryRadiusKm']
  >({ control, name: ['latitude', 'longitude', 'maxDeliveryRadiusKm'] })
  const { isLocating, error, locate } = useGeolocation()
  const [lastValidPoint, setLastValidPoint] = useState<MapPoint>({ lat: latitude, lng: longitude })
  const isPointValid = Number.isFinite(latitude) && Number.isFinite(longitude)
  if (isPointValid && (lastValidPoint.lat !== latitude || lastValidPoint.lng !== longitude)) {
    setLastValidPoint({ lat: latitude, lng: longitude })
  }

  function movePin(point: MapPoint) {
    setValue('latitude', point.lat, { shouldDirty: true, shouldValidate: true })
    setValue('longitude', point.lng, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <MapPicker
          value={lastValidPoint}
          onChange={movePin}
          radiusKm={radiusKm}
          markerLabel={`Ubicación de ${restaurantProfileFixture.tradeName}`}
          className={MAP_HEIGHT_CLASS_NAME}
        />
        <Button
          variant="outline"
          color="neutral"
          size="sm"
          disabled={isLocating}
          onClick={() => locate(movePin)}
          className="bg-background absolute top-3 right-3 z-10 shadow-md"
        >
          {isLocating ? <LoaderCircle aria-hidden className="animate-spin" /> : <LocateFixed aria-hidden />}
          {isLocating ? 'Ubicando…' : 'Usar mi ubicación'}
        </Button>
      </div>
      {error && (
        <p role="alert" className="text-destructive flex items-center gap-1.5 text-xs">
          <CircleAlert aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Latitud" error={formState.errors.latitude?.message}>
          {(fieldControl) => (
            <Input
              {...fieldControl}
              {...register('latitude', { valueAsNumber: true })}
              type="number"
              inputMode="decimal"
              step={COORDINATE_STEP}
              className="font-mono tabular-nums"
            />
          )}
        </FormField>
        <FormField label="Longitud" error={formState.errors.longitude?.message}>
          {(fieldControl) => (
            <Input
              {...fieldControl}
              {...register('longitude', { valueAsNumber: true })}
              type="number"
              inputMode="decimal"
              step={COORDINATE_STEP}
              className="font-mono tabular-nums"
            />
          )}
        </FormField>
      </div>
    </div>
  )
}

export function LocationMapSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Ubicación del local</CardTitle>
          <CardDescription>Arrastra el pin o toca el mapa sobre la puerta de tu local.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className={`${MAP_HEIGHT_CLASS_NAME} w-full rounded-xl`} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
        ) : (
          <LocationMapFields />
        )}
      </CardContent>
    </Card>
  )
}
