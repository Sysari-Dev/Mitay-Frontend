import { describe, expect, it } from 'vitest'
import { canDeleteCategory, categoryNameSchema, filterDishes, moveCategory, type Dish, type MenuCategory } from './catalog'

const categories: MenuCategory[] = [
  { id: 'starters', name: 'Entradas', sortOrder: 0 },
  { id: 'mains', name: 'Platos de fondo', sortOrder: 1 },
  { id: 'drinks', name: 'Bebidas', sortOrder: 2 },
]

const baseDish = { description: null, imageUrl: null, sortOrder: 0 }

const dishes: Dish[] = [
  { ...baseDish, id: 'd1', categoryId: 'starters', name: 'Papa a la huancaína', priceCents: 1200, isAvailable: true },
  { ...baseDish, id: 'd2', categoryId: 'mains', name: 'Cuy chactado', priceCents: 4500, isAvailable: false },
  { ...baseDish, id: 'd3', categoryId: 'mains', name: 'Lomo saltado', priceCents: 2500, isAvailable: true },
]

describe('filterDishes', () => {
  it('ignores accents and case in the search', () => {
    expect(filterDishes(dishes, { query: 'HUANCAINA', categoryId: null, availability: 'all' }).map((dish) => dish.id)).toEqual(['d1'])
  })

  it('filters by category and sold-out status', () => {
    expect(filterDishes(dishes, { query: '', categoryId: 'mains', availability: 'sold-out' }).map((dish) => dish.id)).toEqual(['d2'])
  })
})

describe('moveCategory', () => {
  it('moves a category up and renumbers the order', () => {
    const moved = moveCategory(categories, 'mains', 'up')
    expect(moved.map((category) => category.id)).toEqual(['mains', 'starters', 'drinks'])
    expect(moved.map((category) => category.sortOrder)).toEqual([0, 1, 2])
  })

  it('keeps the order when the first category moves up', () => {
    expect(moveCategory(categories, 'starters', 'up').map((category) => category.id)).toEqual(['starters', 'mains', 'drinks'])
  })
})

describe('canDeleteCategory', () => {
  it('blocks deleting a category that still has dishes', () => {
    expect(canDeleteCategory(dishes, 'mains')).toBe(false)
    expect(canDeleteCategory(dishes, 'drinks')).toBe(true)
  })
})

describe('categoryNameSchema', () => {
  it('rejects a one-letter name', () => {
    expect(categoryNameSchema.safeParse('B').success).toBe(false)
  })
})
