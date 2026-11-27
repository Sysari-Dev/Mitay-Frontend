import { z } from 'zod'
import { HEX_COLOR_PATTERN } from './brandColor'

export const restaurantBrandingSchema = z.object({
  logoUrl: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  brandColor: z.string().regex(HEX_COLOR_PATTERN, 'Usa un color en formato #RRGGBB, por ejemplo #C2410C'),
})

export type RestaurantBrandingFormValues = z.infer<typeof restaurantBrandingSchema>
