# CAT-02 · Control de inventario rápido

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | catalog | 2 · Restaurante operativo | CAT-01 |

## Objetivo

Marcar un plato como agotado o disponible en un toque, en tiempo real.

## Rutas y pantallas

- Interruptor en cada plato de `/catalog`

## Criterios de aceptación

- [ ] Interruptor por plato con actualización optimista
- [ ] Filtro "Agotados"
- [ ] Acción masiva: reactivar todos al inicio del día

## Cómo

- Hook `useToggleDishAvailability` con TanStack Query (mutación optimista).

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| PATCH | `/dishes/:id/availability` | Disponible o agotado |
