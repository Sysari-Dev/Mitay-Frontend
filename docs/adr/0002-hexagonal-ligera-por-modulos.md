# ADR-0002: Hexagonal ligera por módulos (DDD)

- **Estado:** Aceptado
- **Fecha:** 2026-11-20

## Contexto
MITAY tiene reglas de negocio reales (horario de atención, radio de cobertura, total del pedido, borrador de carta desde PDF) que deben ser idénticas en web, ERP, admin y la app mobile (Expo). Si viven dentro de componentes React, se duplican y divergen.

## Decisión
- Organizar por **módulos de negocio**: `identity`, `restaurant`, `catalog`, `orders`, `notifications`, `administration` + `shared-kernel`.
- Cada módulo en `packages/core/src/<modulo>/` con capas `domain` (puro), `application` (casos de uso + puertos), `infrastructure` (adaptadores HTTP + mappers) e `index.ts` público.
- La UI de cada app vive en `apps/<app>/src/modules/<modulo>/presentation/{views,sections,components,hooks}`.
- **"Ligera":** puertos e interfaces solo donde aportan (repositorios). Los módulos CRUD pueden tener un dominio mínimo.
- Las reglas se hacen cumplir con `eslint-plugin-boundaries`.

## Alternativas consideradas
- **Feature-based (estilo bulletproof-react):** más común en Next.js, pero mezcla las reglas de negocio con React y dificulta compartirlas con Expo.
- **Hexagonal estricta:** demasiado código repetitivo para un MVP con un solo dev frontend.
- **Feature-Sliced Design:** muy estructurado, pero con jerga propia y menos enfocado en compartir dominio entre plataformas.

## Consecuencias
- (+) Reglas críticas testeables sin navegador y reutilizables por Expo.
- (+) Cambios del backend se absorben en mappers, no en componentes.
- (−) Curva de aprendizaje; se mitiga con AGENTS.md y ejemplos.
- (−) Más archivos por funcionalidad que en un enfoque feature-based.
