const formatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  minimumFractionDigits: 2,
})

/**
 * Formatea céntimos a soles para mostrar en la UI.
 * El dominio siempre trabaja en céntimos (enteros) para evitar errores de coma flotante.
 * @example formatPEN(1250) // "S/ 12.50"
 */
export function formatPEN(cents: number): string {
  return formatter.format(cents / 100)
}
