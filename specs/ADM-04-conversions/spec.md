# ADM-04 · Auditoría de conversiones

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | admin | administration | 4 · Crecimiento y analítica | ADM-01 |

## Objetivo

Medir cuántas intenciones de pedido genera MITAY para cada negocio. Es la prueba de valor para vender planes.

## Rutas y pantallas

- `/conversions` → `ConversionsView`

## Criterios de aceptación

- [ ] Filtros por fechas, ciudad y restaurante
- [ ] Totales y gráfico por día
- [ ] Exportar CSV

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/admin/order-intents` | Intenciones de pedido filtradas |
