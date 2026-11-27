# ADR-0010: `presentation` organizada por pantalla

- **Estado:** Aceptado. Reemplaza la estructura de carpetas de `presentation` definida en [ADR-0002](0002-hexagonal.md) y [ADR-0003](0003-ui-atomic.md); el resto de esos ADR sigue vigente.
- **Fecha:** 2026-11-27

## Contexto

`presentation/{views,sections,components,hooks}` agrupa por **tipo de archivo**. Un módulo como `restaurant` tendrá varias pantallas (perfil, edición, horario, marca, cobertura, onboarding) y cada carpeta de tipo acumularía decenas de archivos de pantallas distintas: para tocar una pantalla había que abrir cuatro carpetas y deducir qué archivo le pertenece. Además apareció un "section que llama a sections" para manejar estados, rompiendo la jerarquía View → Sections → Components.

## Decisión

Cada módulo organiza su interfaz **por pantalla**, y dentro de cada pantalla por tipo:

```
apps/<app>/src/modules/<module>/presentation/
├─ <screen>/                  kebab-case del nombre de la View sin "View" (RestaurantProfileView → restaurant-profile)
│  ├─ <Screen>View.tsx        Server Component: Suspense y composición; lo renderiza page.tsx
│  ├─ <Screen>Content.tsx     opcional, cliente: decide el estado (carga, vacío, error, listo) y arma las sections
│  ├─ sections/               bloques visibles de la pantalla; nunca importan otra section
│  ├─ components/             piezas de negocio usadas solo por esta pantalla
│  └─ hooks/                  hooks usados solo por esta pantalla
└─ shared/                    lo que usan 2+ pantallas del módulo
   ├─ components/
   ├─ hooks/
   └─ fixtures/               datos de ejemplo mientras no hay API (FND-08)
```

Escalera para promover piezas (la primera que aplique):

| Lo usan | Va en |
|---|---|
| 1 pantalla | `presentation/<screen>/…` |
| 2+ pantallas del mismo módulo | `presentation/shared/…` |
| 2+ módulos de la app | `apps/<app>/src/shared/…` |
| 2+ apps | `packages/ui` (visual) o `packages/utils` (helper puro) |

Reglas:

- La View (o su `Content`) es la única que decide estados y compone sections.
- Una section es un bloque visible (una tarjeta, un formulario) y no importa otras sections.
- Sin archivos `index.ts` de reexportación: se importa la ruta exacta.

## Alternativas consideradas

- **Mantener carpetas por tipo:** no escala; mezcla pantallas y dispersa cada una en cuatro carpetas.
- **Subcarpetas por pantalla dentro de cada tipo** (`sections/profile/`, `components/profile/`): respeta la regla anterior, pero una pantalla sigue repartida en cuatro lugares.
- **Una carpeta por ruta dentro de `app/`** (colocation de Next): mezcla rutas con interfaz y contradice "`app/` sin lógica".

## Consecuencias

- Positivas: una pantalla se lee, cambia o borra en una sola carpeta; queda claro qué es compartido; agentes y personas encuentran los archivos por nombre de la View.
- Negativas / costos: rutas de import más largas (`@/modules/restaurant/presentation/restaurant-profile/sections/…`); hay que decidir conscientemente cuándo algo sube a `shared/`.
