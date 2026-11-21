# ADM-05 · Registro de actividad del sistema

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | admin | administration | 4 · Crecimiento y analítica | ADM-01 |

## Objetivo

Consultar cambios críticos: precios, bajas de productos, cambios de RUC.

## Rutas y pantallas

- `/audit-log` → `AuditLogView`

## Criterios de aceptación

- [ ] Tabla: fecha, actor, acción, entidad y diferencia antes/después
- [ ] Filtros por tipo de acción, restaurante y fechas
- [ ] Solo lectura

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/admin/audit-log` | Eventos filtrados |
