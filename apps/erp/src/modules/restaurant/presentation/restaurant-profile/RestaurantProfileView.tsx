import { Suspense } from 'react'
import { RestaurantProfileBody } from '@/modules/restaurant/presentation/restaurant-profile/RestaurantProfileBody'
import { RestaurantProfileContent } from '@/modules/restaurant/presentation/restaurant-profile/RestaurantProfileContent'

export function RestaurantProfileView() {
  return (
    <Suspense fallback={<RestaurantProfileBody />}>
      <RestaurantProfileContent />
    </Suspense>
  )
}
