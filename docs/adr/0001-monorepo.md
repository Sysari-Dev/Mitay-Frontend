# ADR-0001: Monorepo

- **Estado:** Aceptado
- **Fecha:** 2026-11-20

## Contexto
El frontend cubre tres productos con necesidades distintas: `web` (SEO, público), `erp` (restaurantes, tras login) y `admin` (Sysari, tras login). Comparten diseño, tipos del API, configuración y reglas de negocio. Hoy hay un solo dev frontend, pero el equipo crecerá.

## Decisión
Un único repositorio `mitay-frontend` con:
- `apps/web`, `apps/erp`, `apps/admin`: Next.js (App Router), un proyecto de Vercel por app.
- `packages/*`: librerías internas `@mitay/config`, `@mitay/core`, `@mitay/utils`, `@mitay/ui`, `@mitay/api-client`.
- **pnpm workspaces** para instalar todo con un solo `pnpm install`, y **Turborepo** para orquestar tareas con caché (`pnpm dev`, `pnpm check`).
- **pnpm catalog** (`pnpm-workspace.yaml`): cada librería compartida tiene una sola versión para todo el repo.
- Configuración compartida (TypeScript y ESLint) en `@mitay/config`.
- Un solo `.gitignore`, `README.md` y `AGENTS.md`, en la raíz.

## Alternativas consideradas
- **Una sola app Next.js con route groups:** más simple al inicio, pero el código del admin quedaría en el mismo despliegue que el ERP y separarlo luego es caro.
- **Tres repos separados:** duplicación de UI, tipos y configuración.
- **Nx:** más potente, pero más complejo de lo que el MVP necesita.

## Consecuencias
- (+) Seguridad y despliegues aislados por app (`admin.mitay.sysari.net` puede restringirse).
- (+) Un cambio en `@mitay/ui` se ve en las tres apps en el mismo PR.
- (+) El mobile (Expo) puede sumarse como `apps/mobile` y reutilizar `@mitay/core`.
- (−) Cada app tiene su `node_modules` con symlinks (no ocupa espacio repetido, pero conviene entenderlo).
