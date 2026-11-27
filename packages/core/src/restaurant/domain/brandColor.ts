export const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i

export const MIN_READABLE_CONTRAST = 4.5

const LIGHT_FOREGROUND = '#ffffff'
const DARK_FOREGROUND = '#1c1917'

function toLinearChannel(channel: number): number {
  const value = channel / 255
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(hex: string): number {
  const [red, green, blue] = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16))
  return 0.2126 * toLinearChannel(red!) + 0.7152 * toLinearChannel(green!) + 0.0722 * toLinearChannel(blue!)
}

export function contrastRatio(first: string, second: string): number {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a)
  return (lighter! + 0.05) / (darker! + 0.05)
}

export type BrandColorContrast = {
  foreground: string
  ratio: number
  isReadable: boolean
}

export function getBrandColorContrast(color: string): BrandColorContrast | null {
  if (!HEX_COLOR_PATTERN.test(color)) return null
  const lightRatio = contrastRatio(color, LIGHT_FOREGROUND)
  const darkRatio = contrastRatio(color, DARK_FOREGROUND)
  const foreground = lightRatio >= darkRatio ? LIGHT_FOREGROUND : DARK_FOREGROUND
  const ratio = Math.max(lightRatio, darkRatio)
  return { foreground, ratio, isReadable: ratio >= MIN_READABLE_CONTRAST }
}
