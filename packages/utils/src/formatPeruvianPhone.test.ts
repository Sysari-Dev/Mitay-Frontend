import { describe, expect, it } from 'vitest'
import { formatPeruvianPhone, toWhatsAppUrl } from './formatPeruvianPhone'

describe('formatPeruvianPhone', () => {
  it('formats a mobile number with the country code', () => {
    expect(formatPeruvianPhone('987654321')).toBe('+51 987 654 321')
  })

  it('accepts a number that already has the country code', () => {
    expect(formatPeruvianPhone('+51 987-654-321')).toBe('+51 987 654 321')
  })

  it('returns a non-mobile number unchanged', () => {
    expect(formatPeruvianPhone('083321456')).toBe('083321456')
  })
})

describe('toWhatsAppUrl', () => {
  it('builds a wa.me link for a mobile number', () => {
    expect(toWhatsAppUrl('987654321')).toBe('https://wa.me/51987654321')
  })

  it('returns null for a non-mobile number', () => {
    expect(toWhatsAppUrl('083321456')).toBeNull()
  })
})
