import { Card } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { DishPreviewCard } from '@/modules/catalog/presentation/dish-form/components/DishPreviewCard'
import { DishAvailabilitySection } from '@/modules/catalog/presentation/dish-form/sections/DishAvailabilitySection'
import { DishDetailsSection } from '@/modules/catalog/presentation/dish-form/sections/DishDetailsSection'
import { DishPhotoSection } from '@/modules/catalog/presentation/dish-form/sections/DishPhotoSection'

export function DishFormBody({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {isLoading && (
        <span role="status" className="sr-only">
          Cargando plato
        </span>
      )}
      <div className="flex flex-col gap-6 lg:col-span-2">
        <DishDetailsSection isLoading={isLoading} />
        <DishPhotoSection isLoading={isLoading} />
        <DishAvailabilitySection isLoading={isLoading} />
      </div>
      <aside aria-labelledby="dish-preview-title" className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-0.5">
          <h2 id="dish-preview-title" className="text-sm font-semibold">
            Así se verá en tu carta
          </h2>
          <p className="text-muted-foreground text-xs">Cambia en vivo mientras completas el formulario.</p>
        </div>
        {isLoading ? (
          <Card className="overflow-hidden">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="flex flex-col gap-2 p-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-5 w-20" />
            </div>
          </Card>
        ) : (
          <DishPreviewCard />
        )}
      </aside>
    </div>
  )
}
