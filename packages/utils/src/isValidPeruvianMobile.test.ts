import { describe, expect, it } from 'vitest'
import { isValidPeruvianMobile, normalizePeruvianMobile } from './isValidPeruvianMobile'

describe('isValidPeruvianMobile', () => {
  it('accepts a 9-digit number starting with 9', () => {
    expect(isValidPeruvianMobile('987654321')).toBe(true)
  })

  it('accepts spaces and the country code', () => {
    expect(isValidPeruvianMobile('+51 987 654 321')).toBe(true)
  })

  it('rejects a number that does not start with 9', () => {
    expect(isValidPeruvianMobile('887654321')).toBe(false)
  })

  it('rejects a number with the wrong length', () => {
    expect(isValidPeruvianMobile('98765432')).toBe(false)
  })
})

describe('normalizePeruvianMobile', () => {
  it('strips formatting and the country code', () => {
    expect(normalizePeruvianMobile('+51 987-654-321')).toBe('987654321')
  })
})
