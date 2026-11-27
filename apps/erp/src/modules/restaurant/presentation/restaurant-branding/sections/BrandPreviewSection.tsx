'use client'

import { useWatch } from 'react-hook-form'
import type { RestaurantBrandingFormValues } from '@mitay/core/restaurant'
import { RestaurantPreviewCard } from '@/modules/restaurant/presentation/shared/components/RestaurantPreviewCard'
import { restaurantProfileFixture } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

function LiveBrandPreview() {
  const [logoUrl, bannerUrl, brandColor] = useWatch<RestaurantBrandingFormValues, ['logoUrl', 'bannerUrl', 'brandColor']>({
    name: ['logoUrl', 'bannerUrl', 'brandColor'],
  })
  return <RestaurantPreviewCard profile={{ ...restaurantProfileFixture, logoUrl, bannerUrl, brandColor }} />
}

export function BrandPreviewSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <aside aria-labelledby="brand-preview-title" className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col gap-0.5">
        <h2 id="brand-preview-title" className="text-sm font-semibold">
          Así te verán
        </h2>
        <p className="text-muted-foreground text-xs">Cambia en vivo mientras editas tu marca.</p>
      </div>
      {isLoading ? <RestaurantPreviewCard /> : <LiveBrandPreview />}
    </aside>
  )
}
