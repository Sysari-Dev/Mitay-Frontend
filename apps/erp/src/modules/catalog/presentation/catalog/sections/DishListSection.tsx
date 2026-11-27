'use client'

import Link from 'next/link'
import { BookOpen, Plus, SearchX } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { EmptyState } from '@mitay/ui/molecules/empty-state'
import { DishRow } from '@/modules/catalog/presentation/catalog/components/DishRow'
import { DishRowSkeletonList } from '@/modules/catalog/presentation/catalog/components/DishRowSkeletonList'
import type { CatalogController } from '@/modules/catalog/presentation/catalog/hooks/useCatalog'

type DishListSectionProps = {
  catalog?: CatalogController
  onManageCategories?: () => void
}

function formatDishCount(count: number) {
  return count === 1 ? '1 plato' : `${count} platos`
}

function DishListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {[3, 2].map((rows, index) => (
        <Card key={index}>
          <CardHeader className="flex-col">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <DishRowSkeletonList rows={rows} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function DishListSection({ catalog, onManageCategories }: DishListSectionProps) {
  if (!catalog) return <DishListSkeleton />
  if (catalog.categories.length === 0) {
    return (
      <EmptyState
        icon={<BookOpen />}
        title="Tu carta está vacía"
        description="Crea tus categorías, como Entradas o Platos de fondo, y luego agrega tus platos."
        action={
          <Button animated onClick={onManageCategories}>
            Crear categorías
          </Button>
        }
      />
    )
  }
  if (catalog.visibleDishes.length === 0 && catalog.hasActiveFilters) {
    return (
      <EmptyState
        icon={<SearchX />}
        title="No encontramos platos"
        description="Prueba con otra palabra o quita los filtros."
        action={
          <Button variant="outline" color="neutral" onClick={catalog.clearFilters}>
            Limpiar filtros
          </Button>
        }
      />
    )
  }
  const groups = catalog.categories
    .map((category) => ({
      category,
      dishes: catalog.visibleDishes.filter((dish) => dish.categoryId === category.id),
    }))
    .filter((group) => group.dishes.length > 0 || !catalog.hasActiveFilters)
  return (
    <div className="flex flex-col gap-6">
      {groups.map(({ category, dishes }) => (
        <Card key={category.id}>
          <CardHeader>
            <div className="flex flex-col gap-1">
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{formatDishCount(dishes.length)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {dishes.length > 0 ? (
              <ul className="divide-border flex flex-col divide-y">
                {dishes.map((dish) => (
                  <DishRow
                    key={dish.id}
                    dish={dish}
                    onToggleAvailability={catalog.toggleDishAvailability}
                    onDelete={catalog.deleteDish}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                Aún no tiene platos.
                <Button asChild variant="link" size="sm">
                  <Link href={`/catalog/dishes/new?category=${category.id}`}>
                    <Plus aria-hidden />
                    Agregar plato
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
