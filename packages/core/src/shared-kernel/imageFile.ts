export type ImageFileInfo = {
  type: string
  size: number
}

const MEGABYTE = 1024 * 1024

export const IMAGE_ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

export function megabytesToBytes(megabytes: number): number {
  return megabytes * MEGABYTE
}

export function formatMegabytes(bytes: number): string {
  return `${Number((bytes / MEGABYTE).toFixed(1))} MB`
}

export function validateImageFile(file: ImageFileInfo, maxBytes: number): string | null {
  if (!(IMAGE_ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
    return 'Usa una imagen JPG, PNG o WebP'
  }
  if (file.size > maxBytes) {
    return `La imagen pesa ${formatMegabytes(file.size)}; el máximo es ${formatMegabytes(maxBytes)}`
  }
  return null
}
