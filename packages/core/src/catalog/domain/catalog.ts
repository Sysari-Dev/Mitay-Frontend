import { z } from 'zod'
import type { Cents } from '../../shared-kernel/money'

export type MenuCategory = {
  id: string
  name: string
  sortOrder: number
}

export type Dish = {
  id: string
  categoryId: string
  name: string
  description: string | null
  priceCents: Cents
  imageUrl: string | null
  isAvailable: boolean
  sortOrder: number
}

export type DishAvailabilityFilter = 'all' | 'available' | 'sold-out'

export type DishFilters = {
  query: string
  categoryId: string | null
  availability: DishAvailabilityFilter
}

export const CATEGORY_NAME_MAX_LENGTH = 100

export const categoryNameSchema = z
  .string()
  .trim()
  .min(1, 'Escribe el nombre de la categoría')
  .min(2, 'Debe tener al menos 2 caracteres')
  .max(CATEGORY_NAME_MAX_LENGTH, `Máximo ${CATEGORY_NAME_MAX_LENGTH} caracteres`)

function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

export function filterDishes(dishes: readonly Dish[], filters: DishFilters): Dish[] {
  const query = normalizeForSearch(filters.query)
  return dishes.filter((dish) => {
    if (filters.categoryId && dish.categoryId !== filters.categoryId) return false
    if (filters.availability === 'available' && !dish.isAvailable) return false
    if (filters.availability === 'sold-out' && dish.isAvailable) return false
    if (!query) return true
    return normalizeForSearch(`${dish.name} ${dish.description ?? ''}`).includes(query)
  })
}

export function sortCategories(categories: readonly MenuCategory[]): MenuCategory[] {
  return [...categories].sort((first, second) => first.sortOrder - second.sortOrder)
}

export function moveCategory(
  categories: readonly MenuCategory[],
  categoryId: string,
  direction: 'up' | 'down',
): MenuCategory[] {
  const ordered = sortCategories(categories)
  const index = ordered.findIndex((category) => category.id === categoryId)
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (index === -1 || targetIndex < 0 || targetIndex >= ordered.length) return ordered
  const reordered = [...ordered]
  const [moved] = reordered.splice(index, 1)
  reordered.splice(targetIndex, 0, moved!)
  return reordered.map((category, position) => ({ ...category, sortOrder: position }))
}

export function countDishesInCategory(dishes: readonly Dish[], categoryId: string): number {
  return dishes.filter((dish) => dish.categoryId === categoryId).length
}

export function canDeleteCategory(dishes: readonly Dish[], categoryId: string): boolean {
  return countDishesInCategory(dishes, categoryId) === 0
}
