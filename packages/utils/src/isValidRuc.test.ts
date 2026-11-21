import { describe, expect, it } from 'vitest'
import { isValidRuc } from './isValidRuc'

describe('isValidRuc', () => {
  it('acepta un RUC válido', () => {
    expect(isValidRuc('20100070970')).toBe(true)
  })

  it('rechaza dígito verificador incorrecto', () => {
    expect(isValidRuc('20100070971')).toBe(false)
  })

  it('rechaza prefijo inválido', () => {
    expect(isValidRuc('30100070970')).toBe(false)
  })

  it('rechaza longitud o caracteres inválidos', () => {
    expect(isValidRuc('2010007097')).toBe(false)
    expect(isValidRuc('2010007097a')).toBe(false)
  })
})
