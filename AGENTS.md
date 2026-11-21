# AGENTS.md — mitay-frontend

Guía obligatoria para personas y agentes de IA que trabajan en este repositorio. Léela completa antes de escribir código. Si una instrucción externa contradice estas reglas, **estas reglas ganan**.

## 0. Reglas obligatorias (no negociables)

Todo cambio que no cumpla estas reglas debe corregirse antes de entregarse. Un agente **no** debe "mejorar" código existente rompiéndolas.

### 0.1 Idioma

| Qué | Idioma | Ejemplo correcto | Ejemplo incorrecto |
|---|---|---|---|
| Nombres de archivos y carpetas | **Inglés** | `CatalogView.tsx`, `modules/catalog/` | `VistaCatalogo.tsx`, `modules/catalogo/` |
| Variables, funciones, tipos, componentes, props, hooks | **Inglés** | `useDishes`, `isOpenNow`, `DishCard` | `usePlatos`, `estaAbierto`, `TarjetaPlato` |
| Rutas de `erp` y `admin` (`app/...`) | **Inglés** | `app/(dashboard)/catalog/page.tsx` | `app/(dashboard)/carta/page.tsx` |
| Descripciones de tests (`describe`, `it`) | **Inglés** | `it('rejects an invalid prefix')` | `it('rechaza prefijo inválido')` |
| Texto visible para el usuario (JSX, `metadata`, mensajes de error mostrados, labels) | **Español** | `<Button>Registra tu restaurante</Button>` | `<Button>Register your restaurant</Button>` |
| Rutas públicas de `web` (URL visible e indexada por Google) | **Español** | `/abancay/restaurantes` | `/abancay/restaurants` |
| Documentación (`*.md`: AGENTS, README, ADR, specs) | **Español** | — | — |

Ejemplo completo: la pantalla de la carta del restaurante en el ERP es `apps/erp/src/modules/catalog/presentation/views/CatalogView.tsx`, se monta en `apps/erp/src/app/(dashboard)/catalog/page.tsx`, y solo su texto en pantalla está en español ("Mi carta").

### 0.2 Sin comentarios

- **Nunca** escribir comentarios en código ni en archivos de configuración: `//`, `/* */`, `/** */` (JSDoc), `#` en YAML/`.gitignore`, ni claves `"//"` en JSON. Tampoco directivas `eslint-disable`: se corrige el código.
- El código se explica con **buenos nombres**. Lo que necesite contexto (por qué una regla de negocio, una decisión técnica) va en `specs/`, `docs/adr/` o este archivo.
- Excepción única: archivos **generados** por herramientas que no se editan a mano (`next-env.d.ts`, `packages/api-client/src/generated/*`).

### 0.3 JSX compacto

- **Nunca** dejar líneas en blanco dentro del JSX (entre etiquetas hermanas, dentro de un `return (...)` o de cualquier bloque de marcado). La jerarquía se lee por la indentación, no por espacios vacíos.
- Las líneas en blanco solo se usan fuera del JSX: entre imports y código, entre funciones o entre bloques lógicos de TypeScript.

```tsx
return (
  <main className="flex flex-col gap-8 p-8">
    <header>
      <h1>Administración MITAY</h1>
    </header>
    <section>
      <ThemePreview />
    </section>
  </main>
)
```

Incorrecto: el mismo bloque con una línea vacía entre `</header>` y `<section>`.

### 0.4 Arquitectura

Respetar las capas y reglas de dependencia de la sección 3 y la ubicación de archivos de la sección 5. No mover archivos entre capas, no crear carpetas nuevas en la raíz de una app ni agregar dependencias sin anotarlo en un spec o ADR.

## 1. Qué es MITAY

Catálogo digital hiperlocal de restaurantes (inicio: Abancay, Apurímac). El usuario arma un pedido de **un solo restaurante** y la plataforma genera una comanda que se envía al **WhatsApp** del local. Sysari **no** cobra ni hace delivery: solo provee el software. Ingresos: posicionamiento pagado, analítica y publicidad SEO (B2B).

Este repo contiene **solo el frontend web**:

| App | Ruta | Dominio (producción) | Local | Usuario | Propósito |
|---|---|---|---|---|---|
| `web` | `apps/web` | `mitay.sysari.net` | :3000 | Público, Google, restaurantes prospecto | Landing, directorio SEO por ciudad, captación B2B |
| `erp` | `apps/erp` | `panel.mitay.sysari.net` | :3001 | Restaurantes (rol `restaurant`) | Perfil, horarios, carta, campañas, pedidos en vivo, métricas |
| `admin` | `apps/admin` | `admin.mitay.sysari.net` | :3002 | Equipo Sysari (rol `admin`) | Inquilinos, ciudades, planes/banners, auditoría |

Cada app es un **proyecto de Vercel distinto** del mismo repo (Root Directory = `apps/<app>`).

Otros repos del equipo: **backend NestJS** (fuente del contrato OpenAPI, en local en el puerto **4000**) y **mobile React Native/Expo**.

Decisiones de arquitectura: [Monorepo](docs/adr/0001-monorepo.md), [Hexagonal](docs/adr/0002-hexagonal.md), [UI atómica](docs/adr/0003-ui-atomic.md), [Contrato](docs/adr/0004-contract.md).

## 2. Monorepo

### 2.1 Estructura

```
mitay-frontend/
├─ apps/
│  ├─ web/  erp/  admin/       Next.js. Cada una: src/, public/, next.config.ts, tsconfig.json, eslint.config.mjs, package.json
├─ packages/
│  ├─ config/                  @mitay/config      tsconfig compartidos + ESLint compartido
│  ├─ core/                    @mitay/core        lógica de negocio por módulo (hexagonal)
│  ├─ utils/                   @mitay/utils       helpers puros
│  ├─ ui/                      @mitay/ui          tokens Tailwind + componentes atómicos
│  └─ api-client/              @mitay/api-client  cliente tipado del API
├─ specs/                      SDD por requerimiento
├─ docs/adr/                   decisiones de arquitectura
├─ pnpm-workspace.yaml         workspaces + catalog de versiones
├─ turbo.json                  orquestación de tareas con caché
└─ AGENTS.md  README.md  .gitignore   (únicos, solo en la raíz)
```

`AGENTS.md`, `README.md` y `.gitignore` existen **solo en la raíz**. No crear copias por app ni por paquete. Next.js generaría un `AGENTS.md` por app: está desactivado con `agentRules: false` en cada `next.config.ts`.

### 2.2 Paquetes

| Paquete | Import | Contenido |
|---|---|---|
| `@mitay/config` | `extends: "@mitay/config/tsconfig/<x>.json"`, `@mitay/config/eslint/next` | tsconfig `base`, `nextjs`, `library` (sin DOM, para core/utils), `react-library`; ESLint de las apps |
| `@mitay/core` | `@mitay/core/shared-kernel`, `@mitay/core/<module>` | Hoy: `shared-kernel` (`Cents`, `GeoPoint`, `distanceKm`, `City`, `WeeklySchedule`, `isOpenNow`) |
| `@mitay/utils` | `@mitay/utils` | `formatPEN`, `isValidRuc` |
| `@mitay/ui` | `@mitay/ui/atoms/button`, `@mitay/ui/lib/utils`, `@mitay/ui/styles.css` | Tokens + componentes genéricos |
| `@mitay/api-client` | `@mitay/api-client` | `createApiClient(baseUrl)` tipado con el OpenAPI |
| `@mitay/auth` | — | **Pendiente** hasta acordar con backend el refresh token (AUTH-03) |

Los paquetes exportan TypeScript directo (sin build): Turbopack los compila. Un módulo nuevo de `core` se agrega en `exports` de `packages/core/package.json`.

### 2.3 Dependencias y versiones

- Las versiones compartidas viven en el **catalog** de `pnpm-workspace.yaml`. En `package.json` se escribe `"catalog:"`.
- Actualizar una librería = cambiar su línea del catalog + `pnpm install`.
- Librería nueva usada por ≥2 workspaces → agregarla al catalog.
- Solo **pnpm** (nunca npm ni yarn).

### 2.4 Stack

- **Next.js 16.4 (App Router)**, **React 19**, **TypeScript estricto**.
- **Tailwind CSS v4** + **shadcn/ui** (`cn` del paquete oficial `cn`).
- **TanStack Query** (estado del servidor), **Zustand** (solo estado de UI), **React Hook Form + Zod** (formularios).
- **Vitest** (unit), **Playwright** (e2e), **MSW** (mocks del API).

> **Next.js 16.4 tiene cambios recientes.** Antes de escribir código de Next, lee la guía correspondiente en `apps/<app>/node_modules/next/dist/docs/`.

## 3. Hexagonal

### 3.1 Módulos

| Módulo | Requerimientos |
|---|---|
| `shared-kernel` | Conceptos comunes: `Cents`, `GeoPoint`, `City`, `WeeklySchedule` |
| `identity` | AUTH-01..04 |
| `restaurant` | REST-01..05 |
| `catalog` | CAT-01..05 |
| `orders` | ORD-01..04 |
| `notifications` | NOT-01..02 |
| `administration` | ADM-01..05 |
| `marketing` | Landing y captación B2B. Solo existe en `apps/web` como `presentation` (sin dominio en `core`) |

Hoy existen: `apps/web/src/modules/marketing` (`LandingView`), `apps/erp/src/modules/restaurant` (`DashboardView`), `apps/admin/src/modules/administration` (`DashboardView`). Todos son de baja fidelidad.

Variables de entorno de `web`: `NEXT_PUBLIC_ERP_URL` (ver `apps/web/.env.example`), leída en `apps/web/src/shared/lib/env.ts`.

### 3.2 Capas

La lógica vive en `packages/core/src/<module>/`; la interfaz vive en cada app.

```
packages/core/src/catalog/
├─ domain/          Entidades, value objects y reglas PURAS. Sin React, sin fetch, sin Next.
├─ application/     Casos de uso + puertos (interfaces, ej. CatalogRepository).
├─ infrastructure/  Adaptadores: repositorio HTTP (usa @mitay/api-client), mappers DTO → dominio.
└─ index.ts         API pública del módulo. Lo único que se importa desde fuera.

apps/erp/src/modules/catalog/presentation/
├─ views/           Pantalla completa (CatalogView). Compone sections.
├─ sections/        Bloques de la pantalla (CatalogHeaderSection, PdfImportSection).
├─ components/      Piezas de negocio del módulo (DishCard, AvailabilityToggle).
└─ hooks/           Hooks del módulo (useDishes, useToggleDish) con TanStack Query.
```

**Ligera:** misma estructura de carpetas en todos los módulos, pero la profundidad varía. En `restaurant`, `catalog` y `orders` el dominio es rico; en `administration` y `notifications` puede ser solo tipos. No crear abstracciones sin motivo.

### 3.3 Ejemplo (ORD-03: validar horario y cobertura)

```ts
export function canPlaceOrder(r: RestaurantSnapshot, to: GeoPoint, now: Date): OrderEligibility {
  if (!r.isManuallyOpen) return { ok: false, reason: 'CLOSED_MANUALLY' }
  if (!isOpenNow(r.schedule, now)) return { ok: false, reason: 'OUT_OF_SCHEDULE' }
  if (distanceKm(r.location, to) > r.maxRadiusKm) return { ok: false, reason: 'OUT_OF_COVERAGE' }
  return { ok: true }
}
```

Vive en `packages/core/src/orders/domain/canPlaceOrder.ts`. La UI solo llama `canPlaceOrder(...)` y traduce `reason` a un texto en español; nunca reimplementa la regla.

### 3.4 Reglas de dependencia

1. `presentation → application → domain`. `infrastructure` implementa puertos de `application`.
2. `domain` no importa nada fuera de sí mismo y de `shared-kernel`.
3. Un módulo solo importa otro módulo a través de su `index.ts`.
4. `packages/core` y `packages/utils` **no** usan React, DOM, `window` ni Next (su tsconfig no incluye `dom`: no compila si se usan).
5. `packages/ui` **no** conoce el negocio: no importa `@mitay/core` ni usa palabras como "dish" o "restaurant".
6. `app/` (rutas de Next) no contiene lógica.

## 4. UI atómica

### 4.1 Jerarquía

```
app/(group)/route/page.tsx  → ruta de Next: params, metadata, permisos. Renderiza UNA View.
  └─ View                   → modules/<module>/presentation/views
      └─ Sections           → modules/<module>/presentation/sections
          └─ Components     → modules/<module>/presentation/components (negocio)
              └─ @mitay/ui  → atoms / molecules / organisms (genéricos)
layout.tsx                  → usa templates de @mitay/ui
```

```tsx
import { CatalogView } from '@/modules/catalog/presentation/views/CatalogView'

export const metadata = { title: 'Mi carta' }

export default function Page() {
  return <CatalogView />
}
```

### 4.2 Niveles en `packages/ui`

| Nivel | Ejemplos |
|---|---|
| `atoms/` | button, input, badge, avatar, switch |
| `molecules/` | form-field, search-bar, price-tag, status-pill |
| `organisms/` | data-table, sidebar, modal, file-dropzone (genéricos) |
| `templates/` | dashboard-template, marketing-template |

Los organismos con vocabulario de negocio (DishCard, ScheduleEditor, LiveOrderToast) van en `presentation/components` o `presentation/sections` del módulo, nunca en `packages/ui`.

### 4.3 Estilos

- Solo Tailwind. Nada de CSS modules ni styled-components.
- Colores, tipografía y radios **siempre** desde tokens (`bg-primary`, no `bg-[#e85d04]`).
- **La paleta por defecto de Tailwind está desactivada** (`--color-*: initial`): `bg-red-500`, `text-white`, `bg-zinc-100` no existen. Solo se usan los tokens de abajo.
- Marca del restaurante (REST-02): variable `--brand-primary` en un contenedor + utilidad `bg-brand`.
- `src/app/globals.css` de cada app contiene solo `@import "tailwindcss";` y `@import "@mitay/ui/styles.css";`.
- Variantes con `cva`; clases combinadas con `cn()` (`@mitay/ui/lib/utils` o directo desde `"cn"`, son equivalentes).

### 4.4 Identidad de color

Paleta **"Rocoto + Chicha"**, inspirada en la cocina peruana. El coral despierta el apetito sin ser el naranja de Rappi/Didi ni el rojo de PedidosYa/iFood; el morado no lo usa ninguna app de delivery. Se descartaron el amarillo/ámbar (Glovo y un cliente de Sysari, Dados & Bocados, usan dorado sobre negro) y el azul (reduce el apetito).

| Token | Nombre | Uso |
|---|---|---|
| `primary` | Rocoto (coral) | CTA principal, marca, acciones clave |
| `secondary` | Chicha morada | Acciones secundarias, navegación, identidad del admin |
| `tertiary` | Menta (huacatay) | Acentos frescos, etiquetas, gráficos |

- `destructive` es un carmesí más oscuro que `primary` para que un error nunca se confunda con un CTA.
- Antes de usar un color de un cliente de Sysari como base de MITAY, revisar que no se parezca a su identidad.

### 4.5 Tokens y temas

Definidos en `packages/ui/src/styles/globals.css`: valores claros en `:root`, oscuros en `.dark`. Cada color tiene su pareja `-foreground` para el texto encima.

| Grupo | Utilidades |
|---|---|
| Superficies | `background`, `foreground`, `card`, `popover`, `muted`, `accent` |
| Marca | `primary`, `secondary`, `tertiary`, `brand` |
| Estados | `success`, `warning`, `info`, `destructive` |
| Bordes y foco | `border`, `input`, `ring` |
| Gráficos | `chart-1` … `chart-5` |
| Paneles laterales | `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring` |
| Radios | `rounded-sm` … `rounded-2xl` (base `--radius`) |

- **Modo oscuro:** clase `dark` en `<html>`. **El tema por defecto es siempre el claro** (`DEFAULT_THEME = 'light'`), aunque el sistema operativo esté en oscuro. Solo cambia si el usuario lo elige; su elección se guarda en `localStorage` (`mitay-theme`). La opción `system` existe pero no es la predeterminada.
- `@mitay/ui/lib/theme`: `themeScript` (va en el `<head>` del `layout.tsx` de cada app, evita el parpadeo), `applyTheme('light' | 'dark' | 'system')`.
- `@mitay/ui/molecules/theme-toggle`: botón para cambiar de tema.
- `@mitay/ui/organisms/theme-preview`: muestra todos los tokens (útil para revisar la paleta).
- Un color nuevo se agrega en **tres lugares**: `:root`, `.dark` y `@theme inline`.

### 4.6 Agregar componentes de shadcn/ui

```bash
cd packages/ui
pnpm dlx shadcn@latest add badge
```

Se instalan en `src/atoms/`. Si el componente es más complejo (`dialog`, `data-table`), muévelo a `molecules/` u `organisms/`. En `packages/ui` los archivos van en **kebab-case** (convención de shadcn) y se importan como `@mitay/ui/atoms/button`. Tras agregar un componente, borrar cualquier comentario que traiga.

## 5. ¿Dónde pongo esto?

| Qué | Dónde |
|---|---|
| Regla de negocio | `packages/core/src/<module>/domain` |
| Llamada al backend | `packages/core/src/<module>/infrastructure` (vía `@mitay/api-client`) |
| Hook de negocio (useDishes) | `apps/<app>/src/modules/<module>/presentation/hooks` |
| Hook genérico de 1 app (useDebounce) | `apps/<app>/src/shared/hooks` |
| Hook genérico de ≥2 apps | `packages/ui/src/hooks` |
| Providers (Query, Theme, Auth) | `apps/<app>/src/shared/providers` |
| Componente visual genérico | `packages/ui` |
| Componente de 1 app, sin negocio | `apps/<app>/src/shared/components` |
| Helper puro (formatear soles, validar RUC) | `packages/utils` |
| Configuración de TypeScript o ESLint | `packages/config` |

**Regla:** algo sube a `shared/` o a `packages/` solo cuando lo usan **2 o más** módulos o apps.

## 6. Contrato

- La fuente de verdad es el **OpenAPI** del backend NestJS (`http://localhost:4000/api-json`).
- `pnpm --filter @mitay/api-client generate` genera los tipos. **Nunca escribir tipos de DTOs a mano.**
- Los DTOs **no** cruzan a `domain`: se convierten en `infrastructure/mappers`.
- Endpoint que aún no existe: definirlo en el spec, mockearlo con **MSW** y avisar al backend.

## 7. Flujo de trabajo (SDD)

1. Toda funcionalidad nace en `specs/<CODE>-<slug-in-english>/` (ej. `specs/REST-01-profile-schedule/`), copiando `specs/_template/`.
2. `spec.md`: **qué** y **por qué** (historias, criterios de aceptación). Se aprueba antes de programar.
3. `plan.md`: **cómo** (módulo, capas, pantallas, endpoints, estados de error).
4. `tasks.md`: tareas pequeñas y verificables.
5. El PR referencia el código: `feat(catalog): CAT-03 extractor de PDF`.
6. Decisiones que afectan a más de un módulo → ADR en `docs/adr/`.

## 8. Convenciones

- **Archivos:** componentes `PascalCase.tsx`; hooks `useXxx.ts`; resto `camelCase.ts`; carpetas `kebab-case`. Excepción: `packages/ui` en kebab-case.
- **Exports:** con nombre (`export function`), sin `export default`, salvo los archivos que Next.js exige (`page.tsx`, `layout.tsx`, `next.config.ts`).
- **Tests:** todo `domain/` y `application/` lleva test Vitest al lado (`canPlaceOrder.test.ts`).
- **Dinero:** en céntimos (`Cents`, entero) dentro del dominio; se formatea solo en la UI con `formatPEN`.
- **Ciudad:** concepto global; las rutas públicas de `web` llevan la ciudad: `/abancay/restaurantes`.
- **Commits:** Conventional Commits con scope del módulo: `feat(orders): ORD-03 bloqueo por cobertura`.

## 9. Comandos

```bash
pnpm install                                 # instala todo el monorepo
pnpm dev                                     # web :3000, erp :3001, admin :3002
pnpm dev --filter erp                        # solo una app
pnpm check                                   # typecheck + lint + test + build
pnpm --filter @mitay/core test               # tests de un paquete
pnpm --filter @mitay/api-client generate     # tipos desde el OpenAPI del backend
pnpm add <package> --filter erp              # dependencia para una app
```

Antes de entregar cualquier cambio: `pnpm check` en verde.

## 10. Qué NO hacer

- No escribir comentarios (sección 0.2).
- No nombrar archivos, carpetas, variables ni rutas de erp/admin en español (sección 0.1).
- No dejar líneas en blanco dentro del JSX (sección 0.3).
- No poner lógica de negocio en componentes, `page.tsx` o hooks: va en `domain`.
- No importar `infrastructure` desde la UI saltándose el `index.ts` del módulo.
- No usar `fetch` directo: siempre `@mitay/api-client`.
- No crear `AGENTS.md`, `README.md` ni `.gitignore` dentro de apps o paquetes.
- No escribir versiones en `package.json` si la librería está en el catalog.
- No agregar dependencias sin anotarlo en el `plan.md` del spec o en un ADR.
