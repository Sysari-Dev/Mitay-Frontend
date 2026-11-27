import { z } from 'zod'
import { distanceKm, type GeoPoint } from '../../shared-kernel/geo'

export const DELIVERY_RADIUS_MIN_KM = 0.5
export const DELIVERY_RADIUS_MAX_KM = 20
export const DELIVERY_RADIUS_STEP_KM = 0.5
export const DEFAULT_DELIVERY_RADIUS_KM = 5

export function isWithinDeliveryRadius(origin: GeoPoint, radiusKm: number, destination: GeoPoint): boolean {
  return distanceKm(origin, destination) <= radiusKm
}

export const restaurantCoverageSchema = z.object({
  latitude: z
    .number({ error: 'Ingresa la latitud' })
    .min(-90, 'La latitud va de -90 a 90')
    .max(90, 'La latitud va de -90 a 90'),
  longitude: z
    .number({ error: 'Ingresa la longitud' })
    .min(-180, 'La longitud va de -180 a 180')
    .max(180, 'La longitud va de -180 a 180'),
  maxDeliveryRadiusKm: z
    .number()
    .min(DELIVERY_RADIUS_MIN_KM, `El radio mínimo es ${DELIVERY_RADIUS_MIN_KM} km`)
    .max(DELIVERY_RADIUS_MAX_KM, `El radio máximo es ${DELIVERY_RADIUS_MAX_KM} km`),
})

export type RestaurantCoverageFormValues = z.infer<typeof restaurantCoverageSchema>
