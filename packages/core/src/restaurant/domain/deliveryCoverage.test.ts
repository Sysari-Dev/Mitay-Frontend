import { describe, expect, it } from 'vitest'
import { isWithinDeliveryRadius, restaurantCoverageSchema } from './deliveryCoverage'

const abancayPlaza = { lat: -13.6339, lng: -72.8814 }
const tamburco = { lat: -13.6203, lng: -72.8728 }
const curahuasi = { lat: -13.5408, lng: -72.6928 }

describe('isWithinDeliveryRadius', () => {
  it('reaches a nearby district', () => {
    expect(isWithinDeliveryRadius(abancayPlaza, 5, tamburco)).toBe(true)
  })

  it('does not reach a distant town', () => {
    expect(isWithinDeliveryRadius(abancayPlaza, 5, curahuasi)).toBe(false)
  })
})

describe('restaurantCoverageSchema', () => {
  it('accepts a valid point and radius', () => {
    expect(restaurantCoverageSchema.safeParse({ latitude: -13.63, longitude: -72.88, maxDeliveryRadiusKm: 5 }).success).toBe(true)
  })

  it('asks for the latitude when the field is empty', () => {
    const result = restaurantCoverageSchema.safeParse({ latitude: Number.NaN, longitude: -72.88, maxDeliveryRadiusKm: 5 })
    expect(result.error?.issues[0]?.message).toBe('Ingresa la latitud')
  })

  it('rejects a radius above the maximum', () => {
    const result = restaurantCoverageSchema.safeParse({ latitude: -13.63, longitude: -72.88, maxDeliveryRadiusKm: 50 })
    expect(result.error?.issues[0]?.message).toBe('El radio máximo es 20 km')
  })
})
