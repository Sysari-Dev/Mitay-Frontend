# Guía de arquitectura

Léela cuando toques `packages/core`, `packages/api-client`, dependencias o la estructura de un módulo. Decisiones de fondo: [Monorepo](../adr/0001-monorepo.md), [Hexagonal](../adr/0002-hexagonal.md), [Contrato](../adr/0004-contract.md).

## 1. Paquetes

| Paquete | Import | Contenido |
|---|---|---|
| `@mitay/config` | `extends: "@mitay/config/tsconfig/<x>.json"`, `@mitay/config/eslint/next` | tsconfig `base`, `nextjs`, `library` (sin DOM, para core/utils), `react-library`; ESLint de las apps |
| `@mitay/core` | `@mitay/core/shared-kernel`, `@mitay/core/<module>` | Lógica de negocio. Hoy: `shared-kernel` (`Cents`, `solesToCents`, `sumCents`, `GeoPoint`, `distanceKm`, `City`, `WeeklySchedule`, `isOpenNow`) |
| `@mitay/utils` | `@mitay/utils` | `formatPEN`, `isValidRuc` |
| `@mitay/ui` | `@mitay/ui/atoms/<x>`, `@mitay/ui/lib/<x>`, `@mitay/ui/styles.css` | Tokens + componentes genéricos ([guía UI](ui.md)) |
| `@mitay/api-client` | `@mitay/api-client` | `createApiClient(baseUrl)` tipado con el OpenAPI |
| `@mitay/auth` | — | Pendiente: se crea en [AUTH-03](../../specs/AUTH-03-sessions/spec.md) |

- Los paquetes exportan TypeScript directo (sin build): Turbopack los compila.
- Un módulo nuevo de `core` se agrega en `exports` de `packages/core/package.json` (`"./catalog": "./src/catalog/index.ts"`).

## 2. Dependencias y versiones

- Versiones compartidas en el **catalog** de `pnpm-workspace.yaml`; en `package.json` se escribe `"catalog:"`.
- Actualizar una librería = cambiar su línea del catalog + `pnpm install`.
- Librería nueva usada por ≥2 workspaces → al catalog. Toda dependencia nueva se anota en el spec o en un ADR.
- Solo **pnpm**.

## 3. Stack

- **Next.js 16.4 (App Router)**, **React 19**, **TypeScript estricto**. Next 16 cambió APIs: antes de usar una, leer `apps/<app>/node_modules/next/dist/docs/`.
- **TanStack Query** (estado del servidor), **Zustand** (solo estado de UI), **React Hook Form + Zod** (formularios).
- **Vitest** (unit), **Playwright** (e2e), **MSW** (mocks del API).

## 4. Módulos

| Módulo | Requerimientos | Apps |
|---|---|---|
| `shared-kernel` | Conceptos comunes | todas |
| `identity` | AUTH-01..04 | erp, admin |
| `restaurant` | REST-01..05 | erp (y lectura en web/admin) |
| `catalog` | CAT-01..05 | erp (y lectura en web) |
| `orders` | intenciones de pedido (lectura), dominio de ORD-03 compartido con Expo | erp, admin |
| `notifications` | NOT-01..02 | erp, admin |
| `administration` | ADM-01..05 | admin |
| `marketing` | WEB-01..06 | web |

## 5. Capas

```
packages/core/src/catalog/
├─ domain/          Entidades, value objects y reglas PURAS. Sin React, sin fetch, sin Next.
├─ application/     Casos de uso + puertos (interfaces, ej. CatalogRepository).
├─ infrastructure/  Adaptadores: repositorio HTTP (usa @mitay/api-client), mappers DTO → dominio.
└─ index.ts         API pública del módulo.

apps/erp/src/modules/catalog/presentation/
├─ views/           Pantalla completa (CatalogView). Compone sections.
├─ sections/        Bloques de la pantalla (CatalogHeaderSection, PdfImportSection).
├─ components/      Piezas de negocio del módulo (DishCard, AvailabilityToggle).
└─ hooks/           Hooks del módulo (useDishes, useToggleDish) con TanStack Query.
```

**Ligera:** misma estructura en todos los módulos, profundidad variable. `restaurant`, `catalog` y `orders` tienen dominio rico; `administration` y `notifications` pueden ser solo tipos. Sin abstracciones sin motivo.

### Ejemplo de regla de dominio

```ts
export function canPlaceOrder(r: RestaurantSnapshot, to: GeoPoint, now: Date): OrderEligibility {
  if (!r.isManuallyOpen) return { ok: false, reason: 'CLOSED_MANUALLY' }
  if (!isOpenNow(r.schedule, now)) return { ok: false, reason: 'OUT_OF_SCHEDULE' }
  if (distanceKm(r.location, to) > r.maxRadiusKm) return { ok: false, reason: 'OUT_OF_COVERAGE' }
  return { ok: true }
}
```

Vive en `packages/core/src/orders/domain/canPlaceOrder.ts`. La UI solo llama la función y traduce `reason` a español.

## 6. Reglas de dependencia

1. `presentation → application → domain`. `infrastructure` implementa puertos de `application`.
2. `domain` solo importa de sí mismo y de `shared-kernel`.
3. Un módulo importa otro solo vía su `index.ts`.
4. `packages/core` y `packages/utils` sin React, DOM, `window` ni Next (su tsconfig no incluye `dom`).
5. `packages/ui` no importa `@mitay/core` ni usa vocabulario de negocio.
6. `app/` (rutas de Next) no contiene lógica.

## 7. Contrato con el backend

- Fuente de verdad: OpenAPI de NestJS en `http://localhost:4000/api-json`.
- `pnpm --filter @mitay/api-client generate` genera los tipos. Prohibido escribir DTOs a mano.
- Los DTOs se convierten en `infrastructure/mappers`; nunca llegan a `domain`.
- Endpoint inexistente: se propone en el spec (tabla "Contrato API"), se mockea con MSW y se avisa al backend.
- CORS del backend: `mitay.sysari.net`, `panel.mitay.sysari.net`, `admin.mitay.sysari.net`.

## 8. Variables de entorno

| App | Variable | Uso |
|---|---|---|
| web | `NEXT_PUBLIC_ERP_URL` | Enlace al panel (`apps/web/src/shared/lib/env.ts`) |

Cada app documenta sus variables en `apps/<app>/.env.example`.
