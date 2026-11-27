import { Suspense } from 'react'
import { RestaurantScheduleBody } from '@/modules/restaurant/presentation/restaurant-schedule/RestaurantScheduleBody'
import { RestaurantScheduleContent } from '@/modules/restaurant/presentation/restaurant-schedule/RestaurantScheduleContent'

export function RestaurantScheduleView() {
  return (
    <Suspense fallback={<RestaurantScheduleBody isLoading />}>
      <RestaurantScheduleContent />
    </Suspense>
  )
}
