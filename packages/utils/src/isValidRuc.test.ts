import { describe, expect, it } from 'vitest'
import { isValidRuc } from './isValidRuc'

describe('isValidRuc', () => {
  it('accepts a valid RUC', () => {
    expect(isValidRuc('20100070970')).toBe(true)
  })

  it('rejects a wrong check digit', () => {
    expect(isValidRuc('20100070971')).toBe(false)
  })

  it('rejects an invalid prefix', () => {
    expect(isValidRuc('30100070970')).toBe(false)
  })

  it('rejects invalid length or characters', () => {
    expect(isValidRuc('2010007097')).toBe(false)
    expect(isValidRuc('2010007097a')).toBe(false)
  })
})
