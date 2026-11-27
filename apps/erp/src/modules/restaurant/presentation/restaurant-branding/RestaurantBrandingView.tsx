import { Suspense } from 'react'
import { RestaurantBrandingBody } from '@/modules/restaurant/presentation/restaurant-branding/RestaurantBrandingBody'
import { RestaurantBrandingContent } from '@/modules/restaurant/presentation/restaurant-branding/RestaurantBrandingContent'

export function RestaurantBrandingView() {
  return (
    <Suspense fallback={<RestaurantBrandingBody isLoading />}>
      <RestaurantBrandingContent />
    </Suspense>
  )
}
