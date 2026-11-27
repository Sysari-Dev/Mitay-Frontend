import { isValidPeruvianMobile, normalizePeruvianMobile } from './isValidPeruvianMobile'

export function formatPeruvianPhone(phone: string): string {
  if (!isValidPeruvianMobile(phone)) return phone
  const digits = normalizePeruvianMobile(phone)
  return `+51 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
}

export function toWhatsAppUrl(phone: string): string | null {
  return isValidPeruvianMobile(phone) ? `https://wa.me/51${normalizePeruvianMobile(phone)}` : null
}
