# CAT-02 · Control de inventario rápido

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| 🔵 UI lista | erp | catalog | 2 · Restaurante operativo | CAT-01 |

## Objetivo

Marcar un plato como agotado o disponible en un toque, en tiempo real.

## Rutas y pantallas

- Interruptor en cada plato de `/catalog`

## Criterios de aceptación

- [x] Interruptor por plato con actualización optimista (estado local; con API, mutación de TanStack Query)
- [x] Filtro "Agotados" (selector de estado con conteo)
- [x] Acción masiva: aviso "Tienes N platos agotados" con "Reactivar todos" y confirmación

## Cómo

- Hook `useToggleDishAvailability` con TanStack Query (mutación optimista).

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| PATCH | `/dishes/:id/availability` | Disponible o agotado |
