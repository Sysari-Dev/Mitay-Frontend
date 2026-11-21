import { describe, expect, it } from 'vitest'
import { formatPEN } from './formatPEN'

describe('formatPEN', () => {
  it('converts cents to soles', () => {
    expect(formatPEN(1250)).toMatch(/^S\/\s12\.50$/)
  })

  it('formats zero', () => {
    expect(formatPEN(0)).toMatch(/^S\/\s0\.00$/)
  })
})
