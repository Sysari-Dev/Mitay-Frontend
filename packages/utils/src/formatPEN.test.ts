import { describe, expect, it } from 'vitest'
import { formatPEN } from './formatPEN'

describe('formatPEN', () => {
  it('convierte céntimos a soles', () => {
    expect(formatPEN(1250)).toMatch(/^S\/\s12\.50$/)
  })

  it('formatea cero', () => {
    expect(formatPEN(0)).toMatch(/^S\/\s0\.00$/)
  })
})
