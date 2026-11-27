import { Suspense } from 'react'
import { RestaurantDeliveryBody } from '@/modules/restaurant/presentation/restaurant-delivery/RestaurantDeliveryBody'
import { RestaurantDeliveryContent } from '@/modules/restaurant/presentation/restaurant-delivery/RestaurantDeliveryContent'

export function RestaurantDeliveryView() {
  return (
    <Suspense fallback={<RestaurantDeliveryBody isLoading />}>
      <RestaurantDeliveryContent />
    </Suspense>
  )
}
