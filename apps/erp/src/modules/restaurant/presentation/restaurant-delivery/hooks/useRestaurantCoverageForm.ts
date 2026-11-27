'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { restaurantCoverageSchema, type RestaurantCoverageFormValues } from '@mitay/core/restaurant'
import { restaurantProfileFixture } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

const SIMULATED_SAVE_DELAY_MS = 900

export function useRestaurantCoverageForm() {
  const form = useForm<RestaurantCoverageFormValues>({
    resolver: zodResolver(restaurantCoverageSchema),
    defaultValues: {
      latitude: restaurantProfileFixture.location.lat,
      longitude: restaurantProfileFixture.location.lng,
      maxDeliveryRadiusKm: restaurantProfileFixture.maxDeliveryRadiusKm,
    },
    mode: 'onTouched',
  })
  const onSubmit = form.handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_SAVE_DELAY_MS))
    form.reset(values)
  })
  return { form, onSubmit }
}
