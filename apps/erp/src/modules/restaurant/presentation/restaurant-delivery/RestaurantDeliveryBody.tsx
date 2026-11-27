import { CoverageSummarySection } from '@/modules/restaurant/presentation/restaurant-delivery/sections/CoverageSummarySection'
import { DeliveryRadiusSection } from '@/modules/restaurant/presentation/restaurant-delivery/sections/DeliveryRadiusSection'
import { LocationMapSection } from '@/modules/restaurant/presentation/restaurant-delivery/sections/LocationMapSection'

export function RestaurantDeliveryBody({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {isLoading && (
        <span role="status" className="sr-only">
          Cargando cobertura
        </span>
      )}
      <div className="flex flex-col gap-6 lg:col-span-2">
        <LocationMapSection isLoading={isLoading} />
        <DeliveryRadiusSection isLoading={isLoading} />
      </div>
      <CoverageSummarySection isLoading={isLoading} />
    </div>
  )
}
