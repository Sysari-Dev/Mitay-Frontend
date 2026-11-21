const formatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  minimumFractionDigits: 2,
})

export function formatPEN(cents: number): string {
  return formatter.format(cents / 100)
}
