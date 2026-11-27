'use client'

import { validateBrandImage, type BrandImageKind, type RestaurantBrandingFormValues } from '@mitay/core/restaurant'
import { useLocalImageField } from '@/shared/hooks/useLocalImageField'

const fieldByKind = {
  logo: 'logoUrl',
  banner: 'bannerUrl',
} as const satisfies Record<BrandImageKind, keyof RestaurantBrandingFormValues>

export function useBrandImageField(kind: BrandImageKind) {
  const image = useLocalImageField<RestaurantBrandingFormValues, (typeof fieldByKind)[BrandImageKind]>(fieldByKind[kind])
  return {
    ...image,
    validate: (file: File) => validateBrandImage(file, kind),
  }
}
