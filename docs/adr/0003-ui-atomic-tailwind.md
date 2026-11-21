# ADR-0003: UI con Atomic Design en @mitay/ui + Tailwind CSS v4 + shadcn/ui

- **Estado:** Aceptado
- **Fecha:** 2026-11-20

## Contexto
Tres apps deben verse como una sola marca, desarrollarse rápido y permitir que cada restaurante muestre su paleta (REST-02).

## Decisión
- **Tailwind CSS v4** como único sistema de estilos. Tokens con `@theme` en `packages/ui/src/styles/globals.css`.
- **shadcn/ui** como base de componentes (código propio, no dependencia cerrada).
- **Atomic Design solo en `@mitay/ui`**: `atoms`, `molecules`, `organisms` (genéricos), `templates`. Sin vocabulario de negocio.
- Componentes de negocio en `presentation/{components,sections}` del módulo. Jerarquía: `page.tsx → View → Sections → Components → @mitay/ui`.
- Marca del restaurante con variables CSS (`--brand-primary`) aplicadas en un contenedor.

## Alternativas consideradas
- **Atomic Design en toda la app:** genera debates de clasificación ("¿molécula u organismo?") y mezcla UI con negocio.
- **Librerías cerradas (MUI, Chakra):** más pesadas y difíciles de adaptar a la marca.

## Consecuencias
- (+) Consistencia visual entre apps; fácil de cambiar la marca.
- (−) Cada app debe declarar `@source` hacia `packages/ui` para que Tailwind detecte sus clases.
