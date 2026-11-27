import {
  IMAGE_ACCEPTED_TYPES,
  megabytesToBytes,
  validateImageFile,
  type ImageFileInfo,
} from '../../shared-kernel/imageFile'

export type BrandImageKind = 'logo' | 'banner'

export const BRAND_IMAGE_ACCEPTED_TYPES = IMAGE_ACCEPTED_TYPES

export const BRAND_IMAGE_MAX_BYTES: Record<BrandImageKind, number> = {
  logo: megabytesToBytes(2),
  banner: megabytesToBytes(5),
}

export function validateBrandImage(file: ImageFileInfo, kind: BrandImageKind): string | null {
  return validateImageFile(file, BRAND_IMAGE_MAX_BYTES[kind])
}
