import type { GeoPoint, WeeklySchedule } from '@mitay/core/shared-kernel'

export type RestaurantProfile = {
  id: string
  tradeName: string
  businessName: string
  ruc: string
  slug: string
  slogan: string | null
  whatsappPhone: string
  contactPhone: string | null
  addressLine: string
  district: {
    id: string
    name: string
    provinceName: string
  }
  location: GeoPoint
  maxDeliveryRadiusKm: number
  logoUrl: string | null
  bannerUrl: string | null
  brandColor: string
  isOpenManual: boolean
  isActive: boolean
  schedule: WeeklySchedule
  updatedAt: string
}

const ABANCAY_DISTRICT_ID = 'district-030101'

const BRICK_BRAND_COLOR = '#c2410c'

const lunchAndDinner = [
  { opens: '11:00', closes: '16:00' },
  { opens: '18:00', closes: '22:30' },
]

export const restaurantProfileFixture: RestaurantProfile = {
  id: 'a1b2c3d4-0000-4000-8000-000000000001',
  tradeName: 'Picantería Doña Juana',
  businessName: 'Inversiones Gastronómicas Doña Juana S.A.C.',
  ruc: '20601234565',
  slug: 'picanteria-dona-juana',
  slogan: 'Sabor apurimeño desde 1998',
  whatsappPhone: '987654321',
  contactPhone: null,
  addressLine: 'Jr. Lima 512, a media cuadra de la Plaza de Armas',
  district: {
    id: ABANCAY_DISTRICT_ID,
    name: 'Abancay',
    provinceName: 'Abancay',
  },
  location: { lat: -13.63458, lng: -72.88124 },
  maxDeliveryRadiusKm: 5,
  logoUrl: null,
  bannerUrl: null,
  brandColor: BRICK_BRAND_COLOR,
  isOpenManual: true,
  isActive: true,
  schedule: {
    0: [{ opens: '11:00', closes: '17:00' }],
    1: [],
    2: lunchAndDinner,
    3: lunchAndDinner,
    4: lunchAndDinner,
    5: lunchAndDinner,
    6: lunchAndDinner,
  },
  updatedAt: '2026-11-24T15:30:00-05:00',
}
