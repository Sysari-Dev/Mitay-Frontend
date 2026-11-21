# NOT-01 · Alertas de pedido en tiempo real

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | notifications | 3 · Operación en vivo, administración y directorio | FND-04, AUTH-03 |

## Objetivo

Avisar al instante al restaurante cuando un cliente confirma un pedido en la app, para que lo atienda por WhatsApp.

## Rutas y pantallas

- `/orders` → `OrdersView` (lista en vivo e historial)
- Aviso global en todo el ERP

## Criterios de aceptación

- [ ] Toast + sonido + contador en la navegación al llegar una intención de pedido
- [ ] Notificación del navegador si el usuario dio permiso (pedir permiso con explicación)
- [ ] Detalle: cliente, platos, total, método de pago, hora y enlace a la ubicación en el mapa
- [ ] Reconexión automática y aviso si se pierde la conexión
- [ ] Silenciar sonido desde la topbar

## Cómo

- Decisión pendiente `docs/adr/0008-realtime.md`: WebSocket (Gateway de NestJS) vs SSE.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/orders?status=&page=` | Historial de intenciones de pedido |
| WS/SSE | `/orders/stream` | Eventos en vivo del restaurante |

## Fuera de alcance

- Gestión de estados del pedido (el pedido se atiende en WhatsApp).
