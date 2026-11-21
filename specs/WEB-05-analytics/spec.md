# WEB-05 · Medición y conversión

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | web, erp | marketing | 3 · Operación en vivo, administración y directorio | WEB-01, WEB-06 |

## Objetivo

Saber qué funciona para atraer descargas y restaurantes, y demostrarlo con datos.

## Criterios de aceptación

- [ ] Herramienta definida en `docs/adr/0009-analytics.md` (recomendado: Vercel Analytics + GA4 o Plausible)
- [ ] Eventos: clic en tienda de apps, clic "Registrar mi restaurante", envío de lead, clic en WhatsApp, vista de ficha
- [ ] Conservar parámetros UTM de campañas
- [ ] Banner de consentimiento de cookies (Ley 29733)

## Cómo

- Función `trackEvent` en `apps/web/src/shared/lib`.
