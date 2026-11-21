# REST-03 · Disponibilidad operativa

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | restaurant | 2 · Restaurante operativo | REST-01, FND-04 |

## Objetivo

Interruptor manual para cerrar temporalmente el restaurante ante imprevistos, sin tocar el horario.

## Rutas y pantallas

- Interruptor en la topbar del ERP (visible en todas las páginas)

## Criterios de aceptación

- [ ] Estado calculado visible: "Abierto ahora", "Cerrado por horario" o "Cerrado manualmente"
- [ ] Confirmación al cerrar manualmente, con motivo opcional
- [ ] Actualización optimista con reversión si el backend falla

## Cómo

- `core/restaurant/domain`: `getOperationalStatus(restaurant, now)` (combina interruptor + `isOpenNow`; lo reutiliza Expo).

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| PATCH | `/restaurants/me/availability` | Abre o cierra manualmente |
