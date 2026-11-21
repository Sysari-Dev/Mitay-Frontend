import { describe, expect, it } from 'vitest'
import { distanceKm } from './geo'

describe('distanceKm', () => {
  it('returns 0 for the same point', () => {
    const point = { lat: -13.6339, lng: -72.8814 }
    expect(distanceKm(point, point)).toBe(0)
  })

  it('returns ~1.11 km per 0.01° of latitude', () => {
    const a = { lat: -13.63, lng: -72.88 }
    const b = { lat: -13.64, lng: -72.88 }
    expect(distanceKm(a, b)).toBeCloseTo(1.11, 1)
  })
})
