import { BrandColorSection } from '@/modules/restaurant/presentation/restaurant-branding/sections/BrandColorSection'
import { BrandImagesSection } from '@/modules/restaurant/presentation/restaurant-branding/sections/BrandImagesSection'
import { BrandPreviewSection } from '@/modules/restaurant/presentation/restaurant-branding/sections/BrandPreviewSection'

export function RestaurantBrandingBody({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {isLoading && (
        <span role="status" className="sr-only">
          Cargando marca
        </span>
      )}
      <div className="flex flex-col gap-6 lg:col-span-2">
        <BrandImagesSection isLoading={isLoading} />
        <BrandColorSection isLoading={isLoading} />
      </div>
      <BrandPreviewSection isLoading={isLoading} />
    </div>
  )
}
