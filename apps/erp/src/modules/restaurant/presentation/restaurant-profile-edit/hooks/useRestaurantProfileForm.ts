'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  restaurantProfileSchema,
  type RestaurantProfileFormInput,
  type RestaurantProfileFormValues,
} from '@mitay/core/restaurant'
import {
  restaurantProfileFixture,
  type RestaurantProfile,
} from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

const SIMULATED_SAVE_DELAY_MS = 900

function toFormInput(profile: RestaurantProfile): RestaurantProfileFormInput {
  return {
    tradeName: profile.tradeName,
    businessName: profile.businessName,
    ruc: profile.ruc,
    slogan: profile.slogan ?? '',
    whatsappPhone: profile.whatsappPhone,
    contactPhone: profile.contactPhone ?? '',
    districtId: profile.district.id,
    addressLine: profile.addressLine,
  }
}

export function useRestaurantProfileForm() {
  const router = useRouter()
  const form = useForm<RestaurantProfileFormInput, unknown, RestaurantProfileFormValues>({
    resolver: zodResolver(restaurantProfileSchema),
    defaultValues: toFormInput(restaurantProfileFixture),
    mode: 'onTouched',
  })
  const onSubmit = form.handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_SAVE_DELAY_MS))
    router.push('/restaurant')
  })
  return { form, onSubmit }
}
