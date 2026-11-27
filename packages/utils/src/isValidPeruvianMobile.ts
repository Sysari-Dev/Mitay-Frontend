export function normalizePeruvianMobile(phone: string): string {
  return phone.replace(/\D/g, '').replace(/^51(?=9\d{8}$)/, '')
}

export function isValidPeruvianMobile(phone: string): boolean {
  return /^9\d{8}$/.test(normalizePeruvianMobile(phone))
}
