export type BrandImageKind = 'logo' | 'banner'

export type ImageFileInfo = {
  type: string
  size: number
}

const MEGABYTE = 1024 * 1024

export const BRAND_IMAGE_ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

export const BRAND_IMAGE_MAX_BYTES: Record<BrandImageKind, number> = {
  logo: 2 * MEGABYTE,
  banner: 5 * MEGABYTE,
}

export function formatMegabytes(bytes: number): string {
  return `${Number((bytes / MEGABYTE).toFixed(1))} MB`
}

export function validateBrandImage(file: ImageFileInfo, kind: BrandImageKind): string | null {
  if (!(BRAND_IMAGE_ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
    return 'Usa una imagen JPG, PNG o WebP'
  }
  const maxBytes = BRAND_IMAGE_MAX_BYTES[kind]
  if (file.size > maxBytes) {
    return `La imagen pesa ${formatMegabytes(file.size)}; el máximo es ${formatMegabytes(maxBytes)}`
  }
  return null
}
