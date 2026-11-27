# FND-03 · Kit de componentes UI

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | todas | — | 0 · Fundaciones | FND-02 |

## Objetivo

Tener los componentes genéricos que necesitan todos los formularios, tablas y paneles antes de construir funcionalidades.

## Criterios de aceptación

- [ ] Átomos: input, textarea, label, select, checkbox, switch, avatar, skeleton, separator, tooltip (hechos: input, textarea, label, select, skeleton, card, switch, checkbox, popover)
- [ ] Moléculas: form-field (label + control + error con React Hook Form), search-bar, price-tag, status-pill, empty-state (hechos: form-field, empty-state, password-input)
- [ ] Organismos: dialog/confirm-dialog, sheet, dropdown-menu, tabs, data-table (orden, paginación), toaster, file-dropzone (hechos: image-dropzone, dialog, dropdown-menu; molécula confirm-dialog)
- [ ] Todo usa solo tokens, funciona en claro/oscuro y es accesible con teclado
- [ ] Ruta de muestra en `admin` (`/ui`) para revisar el kit visualmente

## Cómo

- Agregar con `pnpm dlx shadcn@latest add <x>` desde `packages/ui` y limpiar según [guía de UI §9](../../docs/guides/ui.md).
- Dependencias nuevas: `react-hook-form`, `zod`, `@hookform/resolvers`, `sonner`, `@tanstack/react-table`, `lucide-react` (al catalog).

## Fuera de alcance

- Componentes con vocabulario de negocio (van en cada módulo).
