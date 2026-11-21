# REST-05 · Resumen de métricas básicas

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | restaurant | 4 · Crecimiento y analítica | FND-04 |

## Objetivo

Inicio del ERP con las intenciones de pedido recibidas y los platos más pedidos. Es la base del producto de analítica de pago.

## Rutas y pantallas

- `/` → `DashboardView` (reemplaza la vista de baja fidelidad)

## Criterios de aceptación

- [ ] Tarjetas: intenciones de pedido hoy, últimos 7 y 30 días
- [ ] Ranking de los 5 platos más solicitados
- [ ] Gráfico por día usando tokens `chart-*`
- [ ] Estado vacío amable para restaurantes nuevos
- [ ] Bloque bloqueado "Analítica avanzada" (mapa de calor, horas pico) con CTA para mejorar de plan

## Cómo

- Librería de gráficos a definir en el plan (recomendado: Recharts).

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/restaurants/me/metrics?range=7d` | Conteos y ranking |

## Fuera de alcance

- Analítica avanzada de pago (fase posterior al MVP).
