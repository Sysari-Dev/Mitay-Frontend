import { z } from 'zod'
import {
  addressSchema,
  optionalPhoneSchema,
  optionalTextSchema,
  peruvianMobileSchema,
  requiredTextSchema,
  rucSchema,
} from '../../shared-kernel/validation'

export const RESTAURANT_SLOGAN_MAX_LENGTH = 255

export const restaurantProfileSchema = z.object({
  tradeName: requiredTextSchema({ requiredMessage: 'Ingresa el nombre comercial', min: 2, max: 150 }),
  businessName: requiredTextSchema({ requiredMessage: 'Ingresa la razón social', min: 3, max: 200 }),
  ruc: rucSchema,
  slogan: optionalTextSchema({ max: RESTAURANT_SLOGAN_MAX_LENGTH }),
  whatsappPhone: peruvianMobileSchema,
  contactPhone: optionalPhoneSchema,
  districtId: z.string().min(1, 'Elige el distrito'),
  addressLine: addressSchema,
})

export type RestaurantProfileFormInput = z.input<typeof restaurantProfileSchema>
export type RestaurantProfileFormValues = z.output<typeof restaurantProfileSchema>
