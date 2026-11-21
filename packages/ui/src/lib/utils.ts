/**
 * `cn` combina clases condicionales y resuelve conflictos de Tailwind (`px-2` + `px-4` → `px-4`).
 * Viene del paquete oficial de shadcn (`cn`), reemplazo directo de clsx + tailwind-merge.
 * Los componentes agregados con el CLI de shadcn lo importan directo desde "cn"; ambos son equivalentes.
 */
export { cn, type ClassValue } from 'cn'
