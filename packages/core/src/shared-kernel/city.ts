import type { GeoPoint } from './geo'

/** Ciudad operativa (ADM-02). El slug se usa en las URLs públicas: /abancay/restaurantes */
export interface City {
  id: string
  name: string
  slug: string
  center: GeoPoint
}
