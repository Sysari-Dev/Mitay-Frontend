# FND-04 · Shell del ERP y del Admin

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp, admin | — | 0 · Fundaciones | FND-03 |

## Objetivo

Estructura de navegación de los paneles: barra lateral, barra superior y contenedor de páginas, usable desde el celular (los dueños de restaurantes trabajan desde el teléfono).

## Rutas y pantallas

- erp: grupo `app/(dashboard)/` con `layout.tsx`
- admin: grupo `app/(dashboard)/` con `layout.tsx`

## Criterios de aceptación

- [ ] `DashboardTemplate` en `@mitay/ui/templates` (sidebar colapsable, topbar, área de contenido)
- [ ] En móvil la navegación se abre como `sheet`; en escritorio sidebar fija
- [ ] Topbar con espacio para: interruptor abierto/cerrado (REST-03), campana (NOT-02), menú de usuario, ThemeToggle
- [ ] Navegación del ERP: Inicio · Mi negocio (Mi restaurante, Mi carta, Campañas) · Ventas (Pedidos) · Cuenta (Mi cuenta)
- [ ] Navegación del Admin: Inicio, Restaurantes, Usuarios, Ciudades, Planes y banners, Conversiones, Auditoría, Avisos
- [ ] Estado activo de la ruta actual y títulos por página

## Cómo

- Template genérico en `packages/ui/src/templates/dashboard-template.tsx` recibe los items de navegación por props.
- Los items concretos viven en `apps/<app>/src/shared/components/` (son de una sola app).
