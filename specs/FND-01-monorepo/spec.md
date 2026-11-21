# FND-01 · Monorepo y herramientas

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ✅ Hecho | todas | — | 0 · Fundaciones | — |

## Objetivo

Base técnica del repositorio: tres apps Next.js y paquetes compartidos que se instalan y verifican con un solo comando.

## Criterios de aceptación

- [x] pnpm workspaces + Turborepo + catalog de versiones en `pnpm-workspace.yaml`
- [x] Apps `web` (:3000), `erp` (:3001), `admin` (:3002) con Next.js 16.4, React 19, Tailwind v4
- [x] Paquetes `@mitay/config`, `@mitay/core` (shared-kernel), `@mitay/utils`, `@mitay/ui`, `@mitay/api-client`
- [x] ESLint y tsconfig compartidos; un solo `.gitignore`, `README.md` y `AGENTS.md`
- [x] `pnpm check` (typecheck + lint + test + build) en verde

## Cómo

- Ver [guía de arquitectura](../../docs/guides/architecture.md) y [ADR Monorepo](../../docs/adr/0001-monorepo.md).
