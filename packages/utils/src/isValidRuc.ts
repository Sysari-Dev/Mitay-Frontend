const VALID_PREFIXES = ['10', '15', '16', '17', '20']
const WEIGHTS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]

/**
 * Valida un RUC peruano: 11 dígitos, prefijo válido y dígito verificador (módulo 11).
 * Usado en REST-01 (perfil corporativo).
 */
export function isValidRuc(ruc: string): boolean {
  if (!/^\d{11}$/.test(ruc)) return false
  if (!VALID_PREFIXES.includes(ruc.slice(0, 2))) return false

  const digits = ruc.split('').map(Number)
  const sum = WEIGHTS.reduce((acc, weight, i) => acc + weight * (digits[i] ?? 0), 0)
  const remainder = 11 - (sum % 11)
  const checkDigit = remainder === 10 ? 0 : remainder === 11 ? 1 : remainder

  return checkDigit === digits[10]
}
