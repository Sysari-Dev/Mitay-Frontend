'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { getBrandColorContrast } from '@mitay/core/restaurant'
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

function getBrandStyle(brandColor: string): CSSProperties | undefined {
  const contrast = getBrandColorContrast(brandColor)
  if (!contrast) return undefined
  const brandVariables = { '--brand-primary': brandColor, '--brand-primary-foreground': contrast.foreground }
  return brandVariables as CSSProperties
}

function RestaurantPreviewCardSkeleton() {
  return (
    <Card aria-hidden className="overflow-hidden">
      <Skeleton className="h-24 rounded-none" />
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
    <Card style={getBrandStyle(profile.brandColor)} className="overflow-hidden">
      <div className="bg-brand/15 relative h-24">
        {profile.bannerUrl && (
          <Image src={profile.bannerUrl} alt="" fill unoptimized sizes="320px" className="object-cover" />
        )}
      </div>
      <div className="flex flex-col gap-3 px-5 pb-5">
        <div className="bg-brand text-brand-foreground border-card font-heading relative -mt-8 flex size-16 items-center justify-center overflow-hidden rounded-2xl border-4 text-xl font-extrabold">
          {profile.logoUrl ? (
            <Image src={profile.logoUrl} alt={`Logo de ${profile.tradeName}`} fill unoptimized sizes="64px" className="object-cover" />
          ) : (
            getInitials(profile.tradeName)
          )}
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
