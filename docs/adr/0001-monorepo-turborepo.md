# ADR-0001: Monorepo Turborepo + pnpm con 3 apps Next.js

- **Estado:** Aceptado
- **Fecha:** 2026-11-20

## Contexto
El frontend cubre tres productos con necesidades distintas: `web` (SEO, público), `erp` (restaurantes, tras login) y `admin` (Sysari, tras login). Comparten diseño, tipos del API, sesión y reglas de negocio. Hoy hay un solo dev frontend, pero el equipo crecerá.

## Decisión
Un monorepo `mitay-frontend` con **Turborepo + pnpm workspaces**:
- `apps/web`, `apps/erp`, `apps/admin`: Next.js (App Router), un proyecto de Vercel por app.
- `packages/*`: librerías internas `@mitay/ui`, `@mitay/core`, `@mitay/utils`, `@mitay/api-client`, `@mitay/auth`, `@mitay/config`.

`apps/` + `packages/` es la convención de Turborepo (Next.js no define estructura de monorepo).

## Alternativas consideradas
- **Una sola app Next.js con route groups:** más simple al inicio, pero el código del admin quedaría en el mismo despliegue que el ERP y separarlo luego es caro.
- **Tres repos separados:** duplicación de UI, tipos y configuración.
- **Nx:** más potente, pero más complejo de lo que el MVP necesita.

## Consecuencias
- (+) Seguridad y despliegues aislados por app (`admin.mitay.pe` puede restringirse).
- (+) Un cambio en `@mitay/ui` se ve en las tres apps en el mismo PR.
- (+) El mobile (Expo) puede sumarse como `apps/mobile` y reutilizar `@mitay/core`.
- (−) Configuración inicial de workspaces y de Tailwind entre paquetes.
