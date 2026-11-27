import { z } from 'zod'
import { isValidPeruvianMobile, isValidRuc, normalizePeruvianMobile } from '@mitay/utils'

const PERSON_NAME_PATTERN = /^\p{L}[\p{L}\s'.-]*$/u
const LANDLINE_OR_MOBILE_PATTERN = /^\d{6,9}$/

type TextRules = {
  requiredMessage: string
  min?: number
  max: number
}

export function requiredTextSchema({ requiredMessage, min = 1, max }: TextRules) {
  return z
    .string()
    .trim()
    .min(1, requiredMessage)
    .min(min, `Debe tener al menos ${min} caracteres`)
    .max(max, `Máximo ${max} caracteres`)
}

export function optionalTextSchema({ max }: { max: number }) {
  return z.string().trim().max(max, `Máximo ${max} caracteres`)
}

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Ingresa un correo')
  .max(150, 'Máximo 150 caracteres')
  .pipe(z.email('Ingresa un correo válido, por ejemplo nombre@correo.com'))

export const personNameSchema = requiredTextSchema({
  requiredMessage: 'Ingresa tu nombre',
  min: 2,
  max: 150,
}).regex(PERSON_NAME_PATTERN, 'Usa solo letras, espacios y apóstrofos')

export const rucSchema = z
  .string()
  .trim()
  .min(1, 'Ingresa el RUC')
  .regex(/^\d+$/, 'El RUC solo lleva números')
  .length(11, 'El RUC tiene 11 dígitos')
  .refine(isValidRuc, 'Este RUC no es válido. Revisa los dígitos')

export const peruvianMobileSchema = z
  .string()
  .trim()
  .min(1, 'Ingresa un número de celular')
  .refine(isValidPeruvianMobile, 'Debe ser un celular de 9 dígitos que empiece con 9')
  .transform(normalizePeruvianMobile)

export const optionalPhoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/\D/g, ''))
  .refine((digits) => digits === '' || LANDLINE_OR_MOBILE_PATTERN.test(digits), 'Ingresa un teléfono de 6 a 9 dígitos')

export const addressSchema = requiredTextSchema({
  requiredMessage: 'Ingresa la dirección',
  min: 5,
  max: 255,
})
