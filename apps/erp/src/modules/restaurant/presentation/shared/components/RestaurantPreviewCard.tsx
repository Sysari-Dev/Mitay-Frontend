'use client'

import { MapPin } from 'lucide-react'
import { isOpenNow } from '@mitay/core/shared-kernel'
import { Card } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { cn } from '@mitay/ui/lib/utils'
import type { RestaurantProfile } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

type OpenStatus = 'open' | 'closed' | 'paused'

const openStatusLabels: Record<OpenStatus, string> = {
  open: 'Abierto ahora',
  closed: 'Cerrado ahora',
  paused: 'Cerrado temporalmente',
}

function getOpenStatus(profile: RestaurantProfile): OpenStatus {
  if (!profile.isOpenManual) return 'paused'
  return isOpenNow(profile.schedule, new Date()) ? 'open' : 'closed'
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

function RestaurantPreviewCardSkeleton() {
  return (
    <Card aria-hidden className="overflow-hidden">
      <Skeleton className="h-20 rounded-none" />
      <div className="flex flex-col gap-3 px-5 pb-5">
        <Skeleton className="border-card -mt-8 size-16 rounded-2xl border-4" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-6 w-40 rounded-full" />
      </div>
    </Card>
  )
}

export function RestaurantPreviewCard({ profile }: { profile?: RestaurantProfile }) {
  if (!profile) return <RestaurantPreviewCardSkeleton />
  const status = getOpenStatus(profile)
  return (
    <Card className="overflow-hidden">
      <div className="bg-primary/10 h-20" />
      <div className="flex flex-col gap-3 px-5 pb-5">
        <div className="bg-primary text-primary-foreground border-card font-heading -mt-8 flex size-16 items-center justify-center rounded-2xl border-4 text-xl font-extrabold">
          {getInitials(profile.tradeName)}
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg leading-snug font-bold">{profile.tradeName}</h3>
          {profile.slogan && <p className="text-muted-foreground text-sm">{profile.slogan}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
              status === 'open' ? 'bg-success/15' : 'bg-muted',
            )}
          >
            <span
              aria-hidden
              className={cn('size-2 rounded-full', status === 'open' ? 'bg-success' : 'bg-muted-foreground')}
            />
            {openStatusLabels[status]}
          </span>
          <span className="text-muted-foreground inline-flex items-center gap-1">
            <MapPin aria-hidden className="size-3.5" />
            {profile.district.name}
          </span>
        </div>
      </div>
    </Card>
  )
}
