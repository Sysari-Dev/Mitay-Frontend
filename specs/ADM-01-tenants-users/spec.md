# ADM-01 · Control de inquilinos y usuarios

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | admin | administration | 3 · Operación en vivo, administración y directorio | FND-04, AUTH-03 |

## Objetivo

Ver y moderar todos los restaurantes y clientes, con bloqueo preventivo.

## Rutas y pantallas

- `/tenants` → `TenantsView`, `/tenants/[id]` → `TenantDetailView`
- `/users` → `UsersView`

## Criterios de aceptación

- [ ] Tabla con búsqueda y filtros (ciudad, estado, plan)
- [ ] Detalle del restaurante: perfil, plan, métricas básicas, historial
- [ ] Bloquear/desbloquear con motivo obligatorio y confirmación
- [ ] Lista de clientes finales con bloqueo

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/admin/restaurants` | Listado filtrable |
| PATCH | `/admin/restaurants/:id/status` | Bloqueo |
| GET | `/admin/users` | Clientes |
| PATCH | `/admin/users/:id/status` | Bloqueo |
