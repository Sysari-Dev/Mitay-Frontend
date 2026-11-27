'use client'

import { Search, Tags } from 'lucide-react'
import { countDishesInCategory, type DishAvailabilityFilter } from '@mitay/core/catalog'
import { Button } from '@mitay/ui/atoms/button'
import { Input } from '@mitay/ui/atoms/input'
import { Select } from '@mitay/ui/atoms/select'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { cn } from '@mitay/ui/lib/utils'
import type { CatalogController } from '@/modules/catalog/presentation/catalog/hooks/useCatalog'

type CatalogToolbarSectionProps = {
  catalog?: CatalogController
  onManageCategories?: () => void
}

function FilterChip({ label, count, isActive, onClick }: { label: string; count: number; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        'focus-visible:ring-ring inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2',
        isActive
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-background text-foreground hover:bg-accent',
      )}
    >
      {label}
      <span className={cn('tabular-nums', isActive ? 'opacity-70' : 'text-muted-foreground')}>{count}</span>
    </button>
  )
}

export function CatalogToolbarSection({ catalog, onManageCategories }: CatalogToolbarSectionProps) {
  if (!catalog) {
    return (
      <div aria-hidden className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 sm:w-48" />
          <Skeleton className="h-11 sm:w-36" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-9 w-24 rounded-full" />
          ))}
        </div>
      </div>
    )
  }
  const availabilityOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'available', label: 'Disponibles' },
    { value: 'sold-out', label: `Agotados (${catalog.soldOutCount})` },
  ]
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="search"
          aria-label="Buscar platos"
          placeholder="Buscar por nombre o descripción"
          value={catalog.filters.query}
          onChange={(event) => catalog.setQuery(event.target.value)}
          startAddon={<Search aria-hidden className="size-4" />}
          className="sm:flex-1"
        />
        <div className="flex gap-3">
          <Select
            aria-label="Filtrar por estado"
            options={availabilityOptions}
            value={catalog.filters.availability}
            onValueChange={(value) => catalog.setAvailabilityFilter(value as DishAvailabilityFilter)}
            className="min-w-0 flex-1 sm:w-48 sm:flex-none"
          />
          <Button variant="outline" color="neutral" onClick={onManageCategories} className="h-11 shrink-0">
            <Tags aria-hidden />
            Categorías
          </Button>
        </div>
      </div>
      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <FilterChip
          label="Todas"
          count={catalog.dishes.length}
          isActive={catalog.filters.categoryId === null}
          onClick={() => catalog.setCategoryFilter(null)}
        />
        {catalog.categories.map((category) => (
          <FilterChip
            key={category.id}
            label={category.name}
            count={countDishesInCategory(catalog.dishes, category.id)}
            isActive={catalog.filters.categoryId === category.id}
            onClick={() => catalog.setCategoryFilter(category.id)}
          />
        ))}
      </div>
    </div>
  )
}
