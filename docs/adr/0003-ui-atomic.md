# ADR-0003: UI atómica

- **Estado:** Aceptado
- **Fecha:** 2026-11-20

## Contexto
Tres apps deben verse como una sola marca, desarrollarse rápido y permitir que cada restaurante muestre su paleta (REST-02).

## Decisión
- **Tailwind CSS v4** como único sistema de estilos. Tokens en `packages/ui/src/styles/globals.css` (`:root`, `.dark` y `@theme inline`).
- **shadcn/ui** como base de componentes (código propio, no una dependencia cerrada). `cn()` viene del paquete oficial de shadcn `cn`.
- **Atomic Design solo en `@mitay/ui`**: `atoms`, `molecules`, `organisms` (genéricos), `templates`. Sin vocabulario de negocio.
- Componentes de negocio en `presentation/{components,sections}` del módulo. Jerarquía: `page.tsx → View → Sections → Components → @mitay/ui`.
- Marca del restaurante con la variable CSS `--brand-primary` aplicada en un contenedor (utilidad `bg-brand`).

## Alternativas consideradas
- **Atomic Design en toda la app:** genera debates de clasificación ("¿molécula u organismo?") y mezcla UI con negocio.
- **Librerías cerradas (MUI, Chakra):** más pesadas y difíciles de adaptar a la marca.

## Consecuencias
- (+) Consistencia visual entre apps; cambiar la marca es editar tokens.
- (+) El CLI de shadcn agrega componentes directo a `packages/ui/src/atoms`.
- (−) `packages/ui` usa archivos en kebab-case (convención de shadcn), distinto al PascalCase de las apps.
