'use client'

import { useLayoutEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { cn } from '@mitay/ui/lib/utils'
import type { MapPickerCanvasProps } from '@mitay/ui/organisms/map-picker-canvas'

const MapPickerCanvas = dynamic(
  () => import('@mitay/ui/organisms/map-picker-canvas').then((module) => module.MapPickerCanvas),
  { ssr: false, loading: () => <Skeleton className="size-full rounded-none" /> },
)

type MapPickerProps = MapPickerCanvasProps & {
  className?: string
}

function MapPicker({ className, ...canvasProps }: MapPickerProps) {
  const [mapInstanceKey, setMapInstanceKey] = useState(0)

  useLayoutEffect(() => () => setMapInstanceKey((current) => current + 1), [])

  return (
    <div
      data-slot="map-picker"
      className={cn('border-border bg-muted relative isolate overflow-hidden rounded-xl border', className)}
    >
      <MapPickerCanvas key={mapInstanceKey} {...canvasProps} />
    </div>
  )
}

export { MapPicker, type MapPickerProps }
export type { MapPoint } from '@mitay/ui/organisms/map-picker-canvas'
