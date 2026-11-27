'use client'

import { useWatch } from 'react-hook-form'
import { CircleCheck, CircleMinus } from 'lucide-react'
import { isWithinDeliveryRadius, type RestaurantCoverageFormValues } from '@mitay/core/restaurant'
import { distanceKm } from '@mitay/core/shared-kernel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { cn } from '@mitay/ui/lib/utils'
import { abancayDistrictsFixture } from '@/modules/restaurant/presentation/shared/fixtures/districtOptionsFixture'

const kilometersFormatter = new Intl.NumberFormat('es-PE', { maximumFractionDigits: 1 })

function CoverageDistrictList() {
  const [latitude, longitude, radiusKm] = useWatch<
    RestaurantCoverageFormValues,
    ['latitude', 'longitude', 'maxDeliveryRadiusKm']
  >({ name: ['latitude', 'longitude', 'maxDeliveryRadiusKm'] })
  const origin = { lat: latitude, lng: longitude }
  const districts = abancayDistrictsFixture
    .map((district) => ({
      ...district,
      distance: distanceKm(origin, district.center),
      isReached: isWithinDeliveryRadius(origin, radiusKm, district.center),
    }))
    .sort((first, second) => first.distance - second.distance)
  const reachedCount = districts.filter((district) => district.isReached).length
  return (
    <div className="flex flex-col gap-3">
      <p aria-live="polite" className="text-sm">
        Llegas a <span className="font-semibold">{reachedCount}</span> de {districts.length} distritos
      </p>
      <ul className="divide-border flex flex-col divide-y">
        {districts.map((district) => (
          <li key={district.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
            <span className={cn('flex items-center gap-2', !district.isReached && 'text-muted-foreground')}>
              {district.isReached ? (
                <CircleCheck aria-hidden className="text-success size-4 shrink-0" />
              ) : (
                <CircleMinus aria-hidden className="size-4 shrink-0" />
              )}
              {district.name}
              <span className="sr-only">{district.isReached ? ', dentro del radio' : ', fuera del radio'}</span>
            </span>
            <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
              {kilometersFormatter.format(district.distance)} km
            </span>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground text-xs">Distancia en línea recta al centro de cada distrito.</p>
    </div>
  )
}

export function CoverageSummarySection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card className="lg:sticky lg:top-24 lg:self-start">
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Hasta dónde llegas</CardTitle>
          <CardDescription>Se actualiza al mover el pin o el radio.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-40" />
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-5 w-full" />
            ))}
          </div>
        ) : (
          <CoverageDistrictList />
        )}
      </CardContent>
    </Card>
  )
}
