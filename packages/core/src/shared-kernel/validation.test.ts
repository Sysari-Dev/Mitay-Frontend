import { describe, expect, it } from 'vitest'
import {
  addressSchema,
  emailSchema,
  optionalPhoneSchema,
  personNameSchema,
  peruvianMobileSchema,
  rucSchema,
} from './validation'

function firstError(result: { success: boolean; error?: { issues: { message: string }[] } }) {
  return result.error?.issues[0]?.message
}

describe('emailSchema', () => {
  it('normalizes a valid email', () => {
    expect(emailSchema.parse('  Juana@Correo.COM ')).toBe('juana@correo.com')
  })

  it('rejects an empty value with a required message', () => {
    expect(firstError(emailSchema.safeParse(''))).toBe('Ingresa un correo')
  })

  it('rejects a malformed email', () => {
    expect(emailSchema.safeParse('juana@').success).toBe(false)
  })
})

describe('personNameSchema', () => {
  it('accepts names with accents and apostrophes', () => {
    expect(personNameSchema.safeParse("María D'Angelo").success).toBe(true)
  })

  it('rejects digits', () => {
    expect(personNameSchema.safeParse('Juana 2').success).toBe(false)
  })
})

describe('rucSchema', () => {
  it('accepts a valid RUC', () => {
    expect(rucSchema.safeParse('20601234565').success).toBe(true)
  })

  it('explains the expected length', () => {
    expect(firstError(rucSchema.safeParse('2060123'))).toBe('El RUC tiene 11 dígitos')
  })

  it('rejects a RUC with a wrong check digit', () => {
    expect(firstError(rucSchema.safeParse('20601234560'))).toBe('Este RUC no es válido. Revisa los dígitos')
  })
})

describe('peruvianMobileSchema', () => {
  it('normalizes the number to 9 digits', () => {
    expect(peruvianMobileSchema.parse('987 654 321')).toBe('987654321')
  })

  it('rejects a number that does not start with 9', () => {
    expect(peruvianMobileSchema.safeParse('887654321').success).toBe(false)
  })
})

describe('optionalPhoneSchema', () => {
  it('accepts an empty value', () => {
    expect(optionalPhoneSchema.parse('')).toBe('')
  })

  it('accepts a landline', () => {
    expect(optionalPhoneSchema.parse('083 321456')).toBe('083321456')
  })

  it('rejects a too short number', () => {
    expect(optionalPhoneSchema.safeParse('123').success).toBe(false)
  })
})

describe('addressSchema', () => {
  it('rejects a too short address', () => {
    expect(addressSchema.safeParse('Jr').success).toBe(false)
  })
})
