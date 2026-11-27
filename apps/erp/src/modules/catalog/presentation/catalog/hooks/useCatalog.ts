'use client'

import { useMemo, useState } from 'react'
import {
  filterDishes,
  moveCategory,
  sortCategories,
  type Dish,
  type DishAvailabilityFilter,
  type DishFilters,
  type MenuCategory,
} from '@mitay/core/catalog'
import { categoriesFixture, dishesFixture } from '@/modules/catalog/presentation/shared/fixtures/catalogFixture'

const EMPTY_FILTERS: DishFilters = { query: '', categoryId: null, availability: 'all' }

export function useCatalog() {
  const [categories, setCategories] = useState<MenuCategory[]>(categoriesFixture)
  const [dishes, setDishes] = useState<Dish[]>(dishesFixture)
  const [filters, setFilters] = useState<DishFilters>(EMPTY_FILTERS)

  const orderedCategories = useMemo(() => sortCategories(categories), [categories])
  const visibleDishes = useMemo(() => filterDishes(dishes, filters), [dishes, filters])
  const soldOutCount = dishes.filter((dish) => !dish.isAvailable).length
  const hasActiveFilters = filters.query.trim() !== '' || filters.categoryId !== null || filters.availability !== 'all'

  return {
    categories: orderedCategories,
    dishes,
    visibleDishes,
    soldOutCount,
    filters,
    hasActiveFilters,
    setQuery: (query: string) => setFilters((current) => ({ ...current, query })),
    setCategoryFilter: (categoryId: string | null) => setFilters((current) => ({ ...current, categoryId })),
    setAvailabilityFilter: (availability: DishAvailabilityFilter) =>
      setFilters((current) => ({ ...current, availability })),
    clearFilters: () => setFilters(EMPTY_FILTERS),
    toggleDishAvailability: (dishId: string, isAvailable: boolean) =>
      setDishes((current) => current.map((dish) => (dish.id === dishId ? { ...dish, isAvailable } : dish))),
    reactivateAllDishes: () => setDishes((current) => current.map((dish) => ({ ...dish, isAvailable: true }))),
    deleteDish: (dishId: string) => setDishes((current) => current.filter((dish) => dish.id !== dishId)),
    createCategory: (name: string) =>
      setCategories((current) => [...current, { id: crypto.randomUUID(), name, sortOrder: current.length }]),
    renameCategory: (categoryId: string, name: string) =>
      setCategories((current) => current.map((category) => (category.id === categoryId ? { ...category, name } : category))),
    deleteCategory: (categoryId: string) => {
      setCategories((current) => current.filter((category) => category.id !== categoryId))
      setFilters((current) => (current.categoryId === categoryId ? { ...current, categoryId: null } : current))
    },
    moveCategory: (categoryId: string, direction: 'up' | 'down') =>
      setCategories((current) => moveCategory(current, categoryId, direction)),
  }
}

export type CatalogController = ReturnType<typeof useCatalog>
