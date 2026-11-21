import { describe, expect, it } from 'vitest'
import { distanceKm } from './geo'

describe('distanceKm', () => {
  it('es 0 para el mismo punto', () => {
    const plaza = { lat: -13.6339, lng: -72.8814 }
    expect(distanceKm(plaza, plaza)).toBe(0)
  })

  it('calcula ~1.11 km por cada 0.01° de latitud', () => {
    const a = { lat: -13.63, lng: -72.88 }
    const b = { lat: -13.64, lng: -72.88 }
    expect(distanceKm(a, b)).toBeCloseTo(1.11, 1)
  })
})
