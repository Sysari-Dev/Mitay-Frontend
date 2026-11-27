import type { GeoPoint } from '@mitay/core/shared-kernel'

export type DistrictOption = {
  id: string
  name: string
  center: GeoPoint
}

export const abancayDistrictsFixture: DistrictOption[] = [
  { id: 'district-030101', name: 'Abancay', center: { lat: -13.6339, lng: -72.8814 } },
  { id: 'district-030102', name: 'Chacoche', center: { lat: -13.9436, lng: -72.9897 } },
  { id: 'district-030103', name: 'Circa', center: { lat: -13.8786, lng: -72.8742 } },
  { id: 'district-030104', name: 'Curahuasi', center: { lat: -13.5408, lng: -72.6928 } },
  { id: 'district-030105', name: 'Huanipaca', center: { lat: -13.4931, lng: -72.9378 } },
  { id: 'district-030106', name: 'Lambrama', center: { lat: -13.8708, lng: -72.7764 } },
  { id: 'district-030107', name: 'Pichirhua', center: { lat: -13.8597, lng: -73.0711 } },
  { id: 'district-030108', name: 'San Pedro de Cachora', center: { lat: -13.5153, lng: -72.8142 } },
  { id: 'district-030109', name: 'Tamburco', center: { lat: -13.6203, lng: -72.8728 } },
]
