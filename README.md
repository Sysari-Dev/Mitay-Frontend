# mitay-frontend

Frontend de **MITAY** (Sysari): catálogo hiperlocal de restaurantes en Abancay que genera comandas por WhatsApp.

| App | Descripción | Local | Producción |
|---|---|---|---|
| `apps/web` | Landing y directorio SEO | http://localhost:3000 | `mitay.sysari.net` |
| `apps/erp` | Panel del restaurante | http://localhost:3001 | `panel.mitay.sysari.net` |
| `apps/admin` | Panel interno de Sysari | http://localhost:3002 | `admin.mitay.sysari.net` |

- Arquitectura y reglas: [AGENTS.md](AGENTS.md) (**léelo antes de programar**)
- Decisiones técnicas: [Monorepo](docs/adr/0001-monorepo.md) · [Hexagonal](docs/adr/0002-hexagonal.md) · [UI atómica](docs/adr/0003-ui-atomic.md) · [Contrato](docs/adr/0004-contract.md)
- Hoja de ruta y tareas (SDD): [specs](specs/README.md)
- Guías: [arquitectura](docs/guides/architecture.md) · [UI](docs/guides/ui.md)

### Reglas básicas

- Código, archivos, carpetas y rutas del ERP/admin en **inglés** (`CatalogView.tsx`, `/catalog`).
- Documentación y texto que ve el usuario en **español**.
- **Sin comentarios** en el código: se explica con buenos nombres y en la documentación.
- **JSX compacto**: sin líneas en blanco entre etiquetas.

Detalle completo en la sección 0 de [AGENTS.md](AGENTS.md).

---

## Instalación

### 1. Requisitos (una sola vez por computadora)

| Herramienta | Versión | Cómo verificar |
|---|---|---|
| [Node.js](https://nodejs.org) | 22 o superior (recomendado 24 LTS, ver `.nvmrc`) | `node -v` |
| pnpm | 12.21.0 (fijada en `package.json`) | `pnpm -v` |
| Git | cualquiera reciente | `git --version` |

Instalar pnpm:

```bash
npm install -g pnpm@12.21.0
```

> Usa **solo pnpm** en este repo. `npm install` o `yarn` generan otro lockfile y rompen el monorepo.

### 2. Clonar e instalar (un solo comando instala todo)

```bash
git clone <url-del-repo> mitay-frontend
cd mitay-frontend
pnpm install
```

`pnpm install` en la raíz instala **todas** las apps y paquetes del monorepo de una vez (no hay que entrar a cada carpeta).

### 3. Variables de entorno

Si una app tiene un archivo `.env.example`, cópialo como `.env.local` en la misma carpeta y completa los valores:

```bash
cp apps/erp/.env.example apps/erp/.env.local
```

Los archivos `.env*` nunca se suben al repositorio (solo `.env.example`). Pide los valores reales al equipo.

### 4. Verificar que todo funciona

```bash
pnpm check
```

Corre typecheck, lint, tests y build de todo el monorepo. Si termina en verde, tu entorno está listo.

### 5. Levantar en desarrollo

```bash
pnpm dev                # las 3 apps a la vez
pnpm dev --filter erp   # solo una app
```

---

## Comandos frecuentes

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Levanta las apps en modo desarrollo |
| `pnpm build` | Build de producción de todo |
| `pnpm typecheck` | Revisa tipos de TypeScript |
| `pnpm lint` | ESLint |
| `pnpm test` | Tests unitarios (Vitest) |
| `pnpm check` | Todo lo anterior junto (correr antes de un PR) |
| `pnpm add <paquete> --filter <app>` | Agrega una dependencia a una app o paquete |
| `pnpm --filter @mitay/api-client generate` | Regenera los tipos del API desde el OpenAPI del backend |

Turborepo guarda caché: si nada cambió, `build`/`test` terminan en segundos.

## Estructura

```
apps/        → lo que se despliega (web, erp, admin) — Next.js
packages/    → librerías internas @mitay/* (core, ui, utils, api-client, config)
specs/       → hoja de ruta y una tarea por requerimiento (REST-01, CAT-03…)
docs/guides/ → guías de arquitectura y UI
docs/adr/    → decisiones de arquitectura
```

## Preguntas frecuentes del monorepo

**¿Por qué cada app tiene su propia carpeta `node_modules`?**
No es duplicación. Las librerías se descargan **una sola vez** en `node_modules/.pnpm` (raíz); el `node_modules` de cada app solo contiene accesos directos (symlinks) a las librerías que esa app declaró. Así una app no puede usar por accidente una librería que no declaró (y que fallaría al desplegarla sola en Vercel).

**¿Por qué cada app declara `next`, `react`, etc. si son iguales?**
Porque cada app se despliega por separado y debe saber qué necesita. Lo que **no** se repite son las versiones: viven en un solo lugar, el `catalog` de `pnpm-workspace.yaml`, y los `package.json` dicen `"catalog:"`.

## Problemas comunes

- **`pnpm: command not found`** → instala pnpm (paso 1) y abre una terminal nueva.
- **Error de versión de Node al instalar** → el repo exige Node 22+ (`engine-strict`). Actualiza Node.
- **VS Code marca errores que `pnpm typecheck` no muestra** → Ctrl+Shift+P → "TypeScript: Restart TS Server".
- **Puerto ocupado** → otra app ya usa 3000/3001/3002; ciérrala o cambia el puerto en el `package.json` de la app.

## Despliegue

Cada app es un proyecto distinto en Vercel apuntando a este mismo repo (Root Directory = `apps/<app>`). Ver [ADR-0001 Monorepo](docs/adr/0001-monorepo.md).
