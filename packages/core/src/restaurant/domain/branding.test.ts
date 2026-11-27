import { describe, expect, it } from 'vitest'
import { contrastRatio, getBrandColorContrast } from './brandColor'
import { validateBrandImage } from './brandImage'
import { restaurantBrandingSchema } from './restaurantBrandingSchema'

describe('contrastRatio', () => {
  it('returns 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0)
  })
})

describe('getBrandColorContrast', () => {
  it('chooses white text on a dark brand color', () => {
    expect(getBrandColorContrast('#7f1d1d')).toMatchObject({ foreground: '#ffffff', isReadable: true })
  })

  it('chooses dark text on a light brand color', () => {
    expect(getBrandColorContrast('#fde047')?.foreground).toBe('#1c1917')
  })

  it('picks dark text when it reads better than white', () => {
    expect(getBrandColorContrast('#f97316')).toMatchObject({ foreground: '#1c1917', isReadable: true })
  })

  it('flags a mid-gray that is weak with both text colors', () => {
    expect(getBrandColorContrast('#808080')?.isReadable).toBe(false)
  })

  it('returns null for an invalid color', () => {
    expect(getBrandColorContrast('naranja')).toBeNull()
  })
})

describe('validateBrandImage', () => {
  it('accepts a small PNG logo', () => {
    expect(validateBrandImage({ type: 'image/png', size: 500_000 }, 'logo')).toBeNull()
  })

  it('rejects unsupported formats', () => {
    expect(validateBrandImage({ type: 'image/gif', size: 1000 }, 'logo')).toBe('Usa una imagen JPG, PNG o WebP')
  })

  it('rejects a logo above 2 MB but accepts it as a banner', () => {
    const file = { type: 'image/jpeg', size: 3 * 1024 * 1024 }
    expect(validateBrandImage(file, 'logo')).toBe('La imagen pesa 3 MB; el máximo es 2 MB')
    expect(validateBrandImage(file, 'banner')).toBeNull()
  })
})

describe('restaurantBrandingSchema', () => {
  it('rejects a color without hash', () => {
    expect(restaurantBrandingSchema.safeParse({ logoUrl: null, bannerUrl: null, brandColor: 'c2410c' }).success).toBe(false)
  })
})
