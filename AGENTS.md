# AGENTS.md — mitay-frontend

Guía para personas y agentes de IA que trabajan en este repositorio. Léela completa antes de escribir código.

## 1. Qué es MITAY

Catálogo digital hiperlocal de restaurantes (inicio: Abancay, Apurímac). El usuario arma un pedido de **un solo restaurante** y la plataforma genera una comanda que se envía al **WhatsApp** del local. Sysari **no** cobra ni hace delivery: solo provee el software. Ingresos: posicionamiento pagado, analítica y publicidad SEO (B2B).

Este repo contiene **solo el frontend web**:

| App | Ruta | Dominio (producción) | Local | Usuario | Propósito |
|---|---|---|---|---|---|
| `web` | `apps/web` | `mitay.sysari.net` | :3000 | Público, Google, restaurantes prospecto | Landing, directorio SEO por ciudad, captación B2B |
| `erp` | `apps/erp` | `panel.mitay.sysari.net` | :3001 | Restaurantes (rol `restaurant`) | Perfil, horarios, carta, campañas, pedidos en vivo, métricas |
| `admin` | `apps/admin` | `admin.mitay.sysari.net` | :3002 | Equipo Sysari (rol `admin`) | Inquilinos, ciudades, planes/banners, auditoría |

Cada app es un **proyecto de Vercel distinto** del mismo repo (Root Directory = `apps/<app>`).

Otros repos del equipo: **backend NestJS** (fuente del contrato OpenAPI; en local debe usar el puerto **4000** para no chocar con las apps) y **mobile React Native/Expo**. El backend debe permitir (CORS) los tres dominios de arriba.

### Paquetes (`packages/`)

| Paquete | Import | Contenido |
|---|---|---|
| `@mitay/config` | (tsconfig `extends`) | `base`, `nextjs`, `library` (sin DOM, para core/utils), `react-library` |
| `@mitay/core` | `@mitay/core/shared-kernel`, `@mitay/core/<modulo>` | Lógica de negocio por módulo. Hoy: `shared-kernel` (`Cents`, `GeoPoint`, `distanceKm`, `City`, `WeeklySchedule`, `isOpenNow`) |
| `@mitay/utils` | `@mitay/utils` | `formatPEN`, `isValidRuc` |
| `@mitay/ui` | `@mitay/ui/atoms/button`, `@mitay/ui/lib/utils`, `@mitay/ui/styles.css` | Tokens Tailwind + componentes genéricos |
| `@mitay/api-client` | `@mitay/api-client` | `createApiClient(baseUrl)` tipado con el OpenAPI (hoy con schema placeholder) |
| `@mitay/auth` | — | **Pendiente**: se crea cuando se acuerde con backend el manejo del refresh token (AUTH-03) |

Los paquetes exportan TypeScript directo (sin build): Next.js/Turbopack los compila automáticamente. Un módulo nuevo de `core` se agrega en `exports` de `packages/core/package.json`.

## 2. Stack

- Monorepo **Turborepo + pnpm** (`apps/` = desplegables, `packages/` = librerías internas `@mitay/*`).
- **Next.js (App Router)** en las 3 apps, desplegadas en **Vercel** (un proyecto por app).
- **TypeScript estricto** en todo.
- **Tailwind CSS v4** + **shadcn/ui**. Tokens de diseño en `packages/ui/src/styles/globals.css` (`@theme`).
- **TanStack Query** (estado del servidor), **Zustand** (solo estado de UI), **React Hook Form + Zod** (formularios).
- **Vitest** (unit), **Playwright** (e2e), **MSW** (mocks del API).

> **Next.js 16.4 tiene cambios recientes** (APIs y convenciones pueden diferir de lo que conoces). Antes de escribir código de Next, lee la guía correspondiente en `apps/<app>/node_modules/next/dist/docs/`. (Next generaría este aviso en un `AGENTS.md` por app; lo desactivamos con `agentRules: false` para tener un solo AGENTS.md.)

### Dependencias y versiones

- Las versiones compartidas viven en el **catalog** de `pnpm-workspace.yaml`. En `package.json` se escribe `"catalog:"` en vez de la versión.
- Para actualizar (ej. Next.js): cambia solo la línea del catalog y corre `pnpm install`.
- Si agregas una librería que ya está en el catalog, usa `"catalog:"`. Si es nueva y la usarán ≥2 workspaces, agrégala al catalog.
- ESLint compartido: `@mitay/config/eslint/next`. Cada app solo tiene `export { default } from '@mitay/config/eslint/next'`.

## 3. Arquitectura: hexagonal ligera por módulos

### 3.1 Módulos (bounded contexts)

Cada módulo corresponde a un área de negocio y a los códigos del documento de requerimientos:

| Módulo | Requerimientos |
|---|---|
| `shared-kernel` | Conceptos comunes: `Money` (PEN), `GeoPoint`, `City`, `WeeklySchedule` |
| `identity` | AUTH-01..04 |
| `restaurant` | REST-01..05 |
| `catalog` | CAT-01..05 |
| `orders` | ORD-01..04 |
| `notifications` | NOT-01..02 |
| `administration` | ADM-01..05 |

### 3.2 Capas

La lógica vive en `packages/core/src/<modulo>/`; la interfaz vive en cada app.

```
packages/core/src/catalog/
├─ domain/          Entidades, value objects y reglas PURAS. Sin React, sin fetch, sin Next.
├─ application/     Casos de uso + puertos (interfaces, ej. CatalogRepository).
├─ infrastructure/  Adaptadores: repositorio HTTP (usa @mitay/api-client), mappers DTO→dominio.
└─ index.ts         API pública del módulo. Lo único que se importa desde fuera.

apps/erp/src/modules/catalog/presentation/
├─ views/           Pantalla completa (MenuView). Compone sections.
├─ sections/        Bloques de negocio de la pantalla (MenuHeaderSection, PdfImportSection).
├─ components/      Piezas de negocio reutilizables en el módulo (DishCard, AvailabilityToggle).
└─ hooks/           Hooks del módulo (useDishes, useToggleDish) con TanStack Query.
```

**Hexagonal "ligera"** significa: misma estructura de carpetas en todos los módulos, pero la profundidad varía. En módulos con reglas reales (`restaurant`, `catalog`, `orders`) el dominio es rico. En módulos casi CRUD (`administration`, `notifications`) el dominio puede ser solo tipos y el caso de uso una línea. No crear abstracciones sin un motivo.

### 3.3 Ejemplo completo (ORD-03: validar horario y cobertura)

```ts
// packages/core/src/orders/domain/canPlaceOrder.ts  (dominio puro, testeable, lo reutiliza Expo)
export function canPlaceOrder(r: RestaurantSnapshot, to: GeoPoint, now: Date): OrderEligibility {
  if (!r.isManuallyOpen) return { ok: false, reason: 'CLOSED_MANUALLY' }
  if (!isOpenNow(r.schedule, now)) return { ok: false, reason: 'OUT_OF_SCHEDULE' }
  if (distanceKm(r.location, to) > r.maxRadiusKm) return { ok: false, reason: 'OUT_OF_COVERAGE' }
  return { ok: true }
}
```

La UI solo pregunta `canPlaceOrder(...)` y muestra el motivo; nunca reimplementa la regla.

### 3.4 Reglas de dependencia (las verifica ESLint con `eslint-plugin-boundaries`)

1. `presentation → application → domain`. `infrastructure` implementa puertos de `application`.
2. `domain` no importa nada fuera de sí mismo y de `shared-kernel`.
3. Un módulo solo importa otro módulo a través de su `index.ts`.
4. `packages/core` y `packages/utils` **no** usan React, DOM, `window` ni Next (deben funcionar en Expo).
5. `packages/ui` **no** conoce el negocio: no importa `@mitay/core` ni usa palabras como "plato" o "restaurante".
6. `app/` (rutas de Next) no contiene lógica.

## 4. Capa de interfaz (UI)

### 4.1 Jerarquía

```
app/(grupo)/ruta/page.tsx   → ruta de Next: params, metadata, permisos. Renderiza UNA View.
  └─ View                   → modules/<ctx>/presentation/views
      └─ Sections           → modules/<ctx>/presentation/sections
          └─ Components     → modules/<ctx>/presentation/components (negocio)
              └─ @mitay/ui  → atoms / molecules / organisms (genéricos, Atomic Design)
layout.tsx                  → usa templates de @mitay/ui (DashboardTemplate, MarketingTemplate)
```

```tsx
// apps/erp/src/app/(dashboard)/carta/page.tsx — así de delgado
import { MenuView } from '@/modules/catalog/presentation/views/MenuView'

export const metadata = { title: 'Mi carta' }
export default function Page() {
  return <MenuView />
}
```

### 4.2 Atomic Design (solo en `packages/ui`)

| Nivel | Ejemplos |
|---|---|
| `atoms/` | Button, Input, Badge, Avatar, Switch |
| `molecules/` | FormField, SearchBar, PriceTag, StatusPill |
| `organisms/` | DataTable, Sidebar, Modal, FileDropzone (genéricos) |
| `templates/` | DashboardTemplate, MarketingTemplate |

Los organismos con vocabulario de negocio (DishCard, ScheduleEditor, LiveOrderToast) **no** van aquí: van en `presentation/components` o `presentation/sections` del módulo.

### 4.3 Estilos

- Solo Tailwind. Nada de CSS modules ni styled-components.
- Colores, tipografía y radios **siempre** desde tokens (`bg-primary`, no `bg-[#e85d04]`).
- La marca de cada restaurante (REST-02) se aplica con variables CSS (`--brand-primary`) en un contenedor, no generando clases.
- Cada app tiene en `src/app/globals.css` solo `@import "tailwindcss";` y `@import "@mitay/ui/styles.css";`. El `@source` hacia `packages/ui` ya está declarado dentro de `@mitay/ui/styles.css`.
- Variantes de un componente con `class-variance-authority` (`cva`) y combinación de clases con `cn()`. Usamos el paquete oficial de shadcn `cn` (reemplazo de clsx + tailwind-merge): `@mitay/ui/lib/utils` lo reexporta, y los componentes que agrega el CLI lo importan directo desde `"cn"`. Ambas formas son equivalentes.

### 4.4 Agregar componentes de shadcn/ui

```bash
cd packages/ui
pnpm dlx shadcn@latest add badge   # se instala en src/atoms/badge.tsx
```

`components.json` envía los componentes a `src/atoms/`. Si el componente es más complejo (ej. `dialog`, `data-table`), muévelo a `molecules/` u `organisms/` según corresponda. En `packages/ui` los archivos usan **kebab-case** (`button.tsx`), igual que shadcn, para que el CLI siga funcionando; se importan como `@mitay/ui/atoms/button`.

## 5. ¿Dónde pongo esto? (shared)

| Qué | Dónde |
|---|---|
| Regla de negocio | `packages/core/src/<ctx>/domain` |
| Llamada al backend | `packages/core/src/<ctx>/infrastructure` (vía `@mitay/api-client`) |
| Hook de negocio (useDishes) | `apps/<app>/src/modules/<ctx>/presentation/hooks` |
| Hook genérico usado por 1 app (useDebounce) | `apps/<app>/src/shared/hooks` |
| Hook genérico usado por ≥2 apps | `packages/ui/src/hooks` |
| Providers (Query, Theme, Auth) | `apps/<app>/src/shared/providers` |
| Componente visual genérico | `packages/ui` |
| Componente solo de una app, sin negocio | `apps/<app>/src/shared/components` |
| Helper puro (formatear soles, validar RUC) | `packages/utils` |
| Sesión, tokens, guards por rol | `packages/auth` |

**Regla:** algo sube a `shared/` o a `packages/` solo cuando lo usan **2 o más** módulos o apps. Mientras tanto, vive junto a quien lo usa.

## 6. Contrato con el backend

- La fuente de verdad es el **OpenAPI** que expone NestJS (`@nestjs/swagger`).
- `packages/api-client` genera los tipos con `openapi-typescript` y usa `openapi-fetch`. **Nunca escribir a mano tipos de DTOs.**
- Los DTOs **no** cruzan a `domain`: se convierten en `infrastructure/mappers`.
- Si un endpoint aún no existe: definirlo en el spec, mockearlo con **MSW** y avisar al backend.

## 7. Flujo de trabajo: Spec-Driven Development (SDD)

1. Toda funcionalidad nace en `specs/<CODIGO>-<slug>/` (ej. `specs/REST-01-perfil-horarios/`), copiando `specs/_template/`.
2. `spec.md`: **qué** y **por qué** (historias, criterios de aceptación). Se aprueba antes de programar.
3. `plan.md`: **cómo** (módulo, capas, pantallas, endpoints, estados de error).
4. `tasks.md`: lista de tareas pequeñas y verificables.
5. El PR referencia el código (`feat(catalog): CAT-03 extractor de PDF`).
6. Decisiones que afectan a más de un módulo se registran como ADR en `docs/adr/`.

## 8. Convenciones

- **Idioma:** código e identificadores en **inglés**; documentación, specs y textos de UI en **español**.
- **Archivos:** componentes `PascalCase.tsx`; hooks `useXxx.ts`; resto `camelCase.ts`; carpetas `kebab-case`. Excepción: `packages/ui` usa kebab-case (convención de shadcn).
- **Commits:** Conventional Commits con scope del módulo: `feat(orders): ORD-03 bloqueo por cobertura`.
- **Exports:** con nombre (`export function`), sin `export default`, salvo los archivos que Next.js exige (`page.tsx`, `layout.tsx`).
- **Tests:** todo `domain/` y `application/` lleva test Vitest al lado (`canPlaceOrder.test.ts`).
- **Dinero:** siempre en céntimos (`number` entero) dentro del dominio; se formatea solo en la UI con `@mitay/utils`.
- **Ciudad:** concepto global. Las rutas públicas de `web` llevan la ciudad: `/abancay/restaurantes`.

## 9. Comandos

```bash
pnpm install          # instalar dependencias
pnpm dev              # levantar todas las apps
pnpm dev --filter erp # solo una app (web :3000, erp :3001, admin :3002)
pnpm build | lint | typecheck | test
pnpm --filter @mitay/core test               # tests de un paquete
pnpm --filter @mitay/api-client generate     # regenerar tipos desde el OpenAPI del backend (:4000/api-json)
pnpm add <paquete> --filter erp              # agregar dependencia a una app
```

## 10. Qué NO hacer

- No poner lógica de negocio en componentes, `page.tsx` o hooks: va en `domain`.
- No importar `infrastructure` desde la UI saltándose los casos de uso o el `index.ts` del módulo.
- No usar `fetch` directo: siempre `@mitay/api-client`.
- No crear carpetas globales tipo `utils/` o `helpers/` dentro de una app sin pasar por la regla del punto 5.
- No agregar dependencias nuevas sin anotarlo en el `plan.md` del spec o en un ADR.
