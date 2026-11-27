import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import type { CatalogController } from '@/modules/catalog/presentation/catalog/hooks/useCatalog'
import { CatalogToolbarSection } from '@/modules/catalog/presentation/catalog/sections/CatalogToolbarSection'
import { DishListSection } from '@/modules/catalog/presentation/catalog/sections/DishListSection'
import { SoldOutNoticeSection } from '@/modules/catalog/presentation/catalog/sections/SoldOutNoticeSection'

type CatalogBodyProps = {
  catalog?: CatalogController
  onManageCategories?: () => void
}

function formatSummary(dishCount: number, categoryCount: number) {
  const dishes = dishCount === 1 ? '1 plato' : `${dishCount} platos`
  const categories = categoryCount === 1 ? '1 categoría' : `${categoryCount} categorías`
  return `${dishes} en ${categories}`
}

export function CatalogBody({ catalog, onManageCategories }: CatalogBodyProps) {
  return (
    <div aria-busy={!catalog} className="flex flex-col gap-6">
      {!catalog && (
        <span role="status" className="sr-only">
          Cargando carta
        </span>
      )}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Mi carta</h1>
          {catalog ? (
            <p className="text-muted-foreground">{formatSummary(catalog.dishes.length, catalog.categories.length)}</p>
          ) : (
            <Skeleton className="h-5 w-48" />
          )}
        </div>
        <Button asChild animated>
          <Link href="/catalog/dishes/new">
            <Plus aria-hidden />
            Nuevo plato
          </Link>
        </Button>
      </header>
      {catalog && <SoldOutNoticeSection soldOutCount={catalog.soldOutCount} onReactivateAll={catalog.reactivateAllDishes} />}
      <CatalogToolbarSection catalog={catalog} onManageCategories={onManageCategories} />
      <DishListSection catalog={catalog} onManageCategories={onManageCategories} />
    </div>
  )
}
