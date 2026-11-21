# NOT-02 · Avisos administrativos

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | admin, erp | notifications | 3 · Operación en vivo, administración y directorio | FND-04, AUTH-03 |

## Objetivo

Que Sysari envíe avisos a los restaurantes y que estos los lean en su panel.

## Rutas y pantallas

- admin: `/announcements` → `AnnouncementsView` (redactar y enviar)
- erp: campana en la topbar + `/notifications` → `NotificationsView`

## Criterios de aceptación

- [ ] Admin: destinatarios = todos, una ciudad o un restaurante; título, mensaje y nivel (info, alerta)
- [ ] ERP: contador de no leídos, lista y marcar como leído
- [ ] Avisos de cuenta (bloqueo, cambio de plan) llegan por el mismo canal

## Cómo

- Tipos compartidos en `core/notifications/domain`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/admin/announcements` | Envía aviso |
| GET | `/notifications` | Avisos del restaurante |
| PATCH | `/notifications/:id/read` | Marca como leído |
