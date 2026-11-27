import { describe, expect, it } from 'vitest'
import { centsToPriceInput, dishFormSchema, dishPriceSchema, validateDishImage } from './dishForm'

const validDish = {
  name: 'Lomo saltado',
  description: '',
  price: '25.50',
  categoryId: 'category-mains',
  imageUrl: null,
  isAvailable: true,
}

describe('dishPriceSchema', () => {
  it('converts soles to cents', () => {
    expect(dishPriceSchema.parse('25.50')).toBe(2550)
  })

  it('accepts a comma as decimal separator', () => {
    expect(dishPriceSchema.parse('12,5')).toBe(1250)
  })

  it('rejects more than two decimals', () => {
    expect(dishPriceSchema.safeParse('12.505').error?.issues[0]?.message).toBe('Usa un precio como 12 o 12.50')
  })

  it('rejects a zero price', () => {
    expect(dishPriceSchema.safeParse('0').error?.issues[0]?.message).toBe('El precio debe ser mayor a S/ 0')
  })
})

describe('dishFormSchema', () => {
  it('outputs the price in cents', () => {
    expect(dishFormSchema.parse(validDish).price).toBe(2550)
  })

  it('requires a category', () => {
    expect(dishFormSchema.safeParse({ ...validDish, categoryId: '' }).success).toBe(false)
  })
})

describe('centsToPriceInput', () => {
  it('formats cents for the price field', () => {
    expect(centsToPriceInput(1200)).toBe('12.00')
  })
})

describe('validateDishImage', () => {
  it('rejects a dish photo above 3 MB', () => {
    expect(validateDishImage({ type: 'image/jpeg', size: 4 * 1024 * 1024 })).toBe('La imagen pesa 4 MB; el máximo es 3 MB')
  })
})
