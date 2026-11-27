'use client'

import { usePreviewState } from '@/shared/hooks/usePreviewState'
import {
  restaurantProfileFixture,
  type RestaurantProfile,
} from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

type RestaurantProfileResult =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error' }
  | { status: 'ready'; profile: RestaurantProfile }

export function useRestaurantProfile(): RestaurantProfileResult {
  const status = usePreviewState()
  if (status === 'ready') return { status, profile: restaurantProfileFixture }
  return { status }
}
