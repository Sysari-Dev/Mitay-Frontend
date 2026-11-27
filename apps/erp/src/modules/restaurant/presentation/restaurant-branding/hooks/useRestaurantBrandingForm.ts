'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { restaurantBrandingSchema, type RestaurantBrandingFormValues } from '@mitay/core/restaurant'
import { restaurantProfileFixture } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

const SIMULATED_SAVE_DELAY_MS = 900

export function useRestaurantBrandingForm() {
  const form = useForm<RestaurantBrandingFormValues>({
    resolver: zodResolver(restaurantBrandingSchema),
    defaultValues: {
      logoUrl: restaurantProfileFixture.logoUrl,
      bannerUrl: restaurantProfileFixture.bannerUrl,
      brandColor: restaurantProfileFixture.brandColor,
    },
    mode: 'onTouched',
  })
  const onSubmit = form.handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_SAVE_DELAY_MS))
    form.reset(values)
  })
  return { form, onSubmit }
}
