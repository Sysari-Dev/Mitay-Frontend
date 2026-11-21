import type { GeoPoint } from './geo'

export interface City {
  id: string
  name: string
  slug: string
  center: GeoPoint
}
