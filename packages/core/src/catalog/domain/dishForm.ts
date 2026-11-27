import { z } from 'zod'
import { megabytesToBytes, validateImageFile, type ImageFileInfo } from '../../shared-kernel/imageFile'
import { solesToCents, type Cents } from '../../shared-kernel/money'

export const DISH_NAME_MAX_LENGTH = 150
export const DISH_DESCRIPTION_MAX_LENGTH = 300
export const DISH_PRICE_MAX_SOLES = 9999.99
export const DISH_IMAGE_MAX_BYTES = megabytesToBytes(3)

const PRICE_PATTERN = /^\d{1,4}([.,]\d{1,2})?$/

export const dishPriceSchema = z
  .string()
  .trim()
  .min(1, 'Ingresa el precio')
  .regex(PRICE_PATTERN, 'Usa un precio como 12 o 12.50')
  .transform((value) => solesToCents(Number(value.replace(',', '.'))))
  .refine((cents) => cents > 0, 'El precio debe ser mayor a S/ 0')

export const dishFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Ingresa el nombre del plato')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(DISH_NAME_MAX_LENGTH, `Máximo ${DISH_NAME_MAX_LENGTH} caracteres`),
  description: z.string().trim().max(DISH_DESCRIPTION_MAX_LENGTH, `Máximo ${DISH_DESCRIPTION_MAX_LENGTH} caracteres`),
  price: dishPriceSchema,
  categoryId: z.string().min(1, 'Elige la categoría'),
  imageUrl: z.string().nullable(),
  isAvailable: z.boolean(),
})

export type DishFormInput = z.input<typeof dishFormSchema>
export type DishFormValues = z.output<typeof dishFormSchema>

export function centsToPriceInput(cents: Cents): string {
  return (cents / 100).toFixed(2)
}

export function validateDishImage(file: ImageFileInfo): string | null {
  return validateImageFile(file, DISH_IMAGE_MAX_BYTES)
}
