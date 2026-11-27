# Specs y hoja de ruta

Fuente única del **estado del proyecto**. Al iniciar una sesión, leer este archivo y luego solo el spec de la tarea a trabajar.

Progreso: **2 hechas**, **1 con UI lista**, **2 en esqueleto**, **30 pendientes** de 35.

Leyenda: ✅ Hecho · 🔵 UI lista (maquetada con datos de ejemplo, falta conectar la API) · 🟡 Esqueleto / en progreso · ⬜ Pendiente

Una tarea pasa a 🔵 cuando su pantalla está maquetada en FND-08 y aprobada; pasa a ✅ solo cuando funciona con el backend real.

## Alcance

Este repo implementa la parte **web** del documento de requerimientos:

| Grupo | Qué cubre | App |
|---|---|---|
| FND | Fundaciones técnicas (no están en el documento original) | todas |
| AUTH | Acceso al ERP y al Admin | erp, admin |
| REST | Gestión del restaurante (B2B) | erp |
| CAT | Carta y campañas | erp |
| NOT | Alertas y avisos | erp, admin |
| ADM | Administración y auditoría de Sysari | admin |
| WEB | Landing, captación B2B, SEO e ingresos (no están en el documento original) | web |

**Fuera de este repo** (app mobile del cliente, React Native/Expo): ORD-01 perfil del consumidor, ORD-02 exploración, ORD-03 validación de horario y cobertura, ORD-04 registro de intención de pedido. Lo que se reutiliza aquí: las intenciones de ORD-04 se **leen** en NOT-01, REST-05 y ADM-04; la regla de ORD-03 (`canPlaceOrder`) puede vivir en `@mitay/core` para que Expo la importe; los datos públicos de ORD-02 alimentan WEB-03.

## Fase 0 · Fundaciones

| Código | Tarea | Apps | Estado | Depende de |
|---|---|---|---|---|
| [FND-01](FND-01-monorepo/spec.md) | Monorepo y herramientas | todas | ✅ Hecho | — |
| [FND-02](FND-02-design-system/spec.md) | Sistema de diseño base | todas | ✅ Hecho | FND-01 |
| [FND-03](FND-03-ui-kit/spec.md) | Kit de componentes UI | todas | ⬜ Pendiente | FND-02 |
| [FND-04](FND-04-app-shell/spec.md) | Shell del ERP y del Admin | erp, admin | ⬜ Pendiente | FND-03 |
| [FND-05](FND-05-data-layer/spec.md) | Capa de datos | erp, admin, web | ⬜ Pendiente | FND-01 |
| [FND-06](FND-06-lint-rules/spec.md) | Reglas de arquitectura automáticas | todas | ⬜ Pendiente | FND-01 |
| [FND-07](FND-07-ci-deploy/spec.md) | Git, CI y despliegue | todas | ⬜ Pendiente | FND-01 |
| [FND-08](FND-08-erp-mockups/spec.md) | Maquetado del ERP (solo UI, datos de ejemplo) | erp | 🟡 Esqueleto | FND-03, FND-04 |

## Fase 1 · Acceso y presencia pública

| Código | Tarea | Apps | Estado | Depende de |
|---|---|---|---|---|
| [AUTH-01](AUTH-01-login-register/spec.md) | Registro e inicio de sesión | erp, admin | ⬜ Pendiente | FND-03, FND-05, AUTH-03 |
| [AUTH-02](AUTH-02-google-login/spec.md) | Autenticación con Google | erp | ⬜ Pendiente | AUTH-01 |
| [AUTH-03](AUTH-03-sessions/spec.md) | Gestión de sesiones y roles | erp, admin | ⬜ Pendiente | FND-05 |
| [AUTH-04](AUTH-04-password-management/spec.md) | Gestión de contraseñas | erp, admin | ⬜ Pendiente | AUTH-01 |
| [WEB-01](WEB-01-landing/spec.md) | Landing principal | web | 🟡 Esqueleto | FND-03 |
| [WEB-02](WEB-02-for-restaurants/spec.md) | Página para restaurantes (captación B2B) | web | ⬜ Pendiente | FND-03 |
| [WEB-04](WEB-04-technical-seo/spec.md) | SEO técnico | web | ⬜ Pendiente | WEB-01 |
| [WEB-06](WEB-06-legal-pages/spec.md) | Páginas legales y contacto | web | ⬜ Pendiente | WEB-01 |

## Fase 2 · Restaurante operativo

| Código | Tarea | Apps | Estado | Depende de |
|---|---|---|---|---|
| [REST-01](REST-01-profile-schedule/spec.md) | Perfil corporativo y horarios | erp | ⬜ Pendiente | FND-04, AUTH-03 |
| [REST-02](REST-02-branding/spec.md) | Personalización de marca | erp | 🔵 UI lista | REST-01, FND-03 |
| [REST-03](REST-03-availability/spec.md) | Disponibilidad operativa | erp | ⬜ Pendiente | REST-01, FND-04 |
| [REST-04](REST-04-location-coverage/spec.md) | Ubicación y cobertura de envío | erp | ⬜ Pendiente | REST-01, ADM-02 |
| [CAT-01](CAT-01-categories-dishes/spec.md) | Gestión de categorías y platos | erp | ⬜ Pendiente | FND-03, FND-04 |
| [CAT-02](CAT-02-dish-availability/spec.md) | Control de inventario rápido | erp | ⬜ Pendiente | CAT-01 |
| [ADM-02](ADM-02-cities/spec.md) | Gestión de ciudades operativas | admin | ⬜ Pendiente | FND-04, AUTH-03 |

## Fase 3 · Operación en vivo, administración y directorio

| Código | Tarea | Apps | Estado | Depende de |
|---|---|---|---|---|
| [NOT-01](NOT-01-live-orders/spec.md) | Alertas de pedido en tiempo real | erp | ⬜ Pendiente | FND-04, AUTH-03 |
| [NOT-02](NOT-02-admin-notices/spec.md) | Avisos administrativos | admin, erp | ⬜ Pendiente | FND-04, AUTH-03 |
| [ADM-01](ADM-01-tenants-users/spec.md) | Control de inquilinos y usuarios | admin | ⬜ Pendiente | FND-04, AUTH-03 |
| [ADM-03](ADM-03-plans-banners/spec.md) | Gestor de publicidad y planes | admin | ⬜ Pendiente | ADM-01, ADM-02 |
| [WEB-03](WEB-03-city-directory/spec.md) | Directorio SEO por ciudad | web | ⬜ Pendiente | WEB-04, ADM-02, ADM-03 |
| [WEB-05](WEB-05-analytics/spec.md) | Medición y conversión | web, erp | ⬜ Pendiente | WEB-01, WEB-06 |

## Fase 4 · Crecimiento y analítica

| Código | Tarea | Apps | Estado | Depende de |
|---|---|---|---|---|
| [REST-05](REST-05-metrics/spec.md) | Resumen de métricas básicas | erp | ⬜ Pendiente | FND-04 |
| [CAT-03](CAT-03-pdf-extractor/spec.md) | Extractor de cartas en PDF | erp | ⬜ Pendiente | CAT-01 |
| [CAT-04](CAT-04-bulk-confirm/spec.md) | Confirmación masiva de carta | erp | ⬜ Pendiente | CAT-03 |
| [CAT-05](CAT-05-campaigns/spec.md) | Publicación de eventos y campañas | erp | ⬜ Pendiente | CAT-01, REST-02 |
| [ADM-04](ADM-04-conversions/spec.md) | Auditoría de conversiones | admin | ⬜ Pendiente | ADM-01 |
| [ADM-05](ADM-05-audit-log/spec.md) | Registro de actividad del sistema | admin | ⬜ Pendiente | ADM-01 |

## Decisiones pendientes con backend

| ADR | Tema | Bloquea |
|---|---|---|
| 0005-auth | Refresh token: cookie httpOnly y variante para Expo | AUTH-03 |
| 0006-uploads | Subida de imágenes: URL firmada vs vía backend | REST-02, CAT-01, CAT-05 |
| 0007-maps | Librería de mapas (recomendado MapLibre/Leaflet + OpenStreetMap) | REST-04, ADM-02 |
| 0008-realtime | Tiempo real: WebSocket vs SSE | NOT-01 |
| 0009-analytics | Herramienta de analítica web | WEB-05 |

## Flujo de trabajo (SDD)

1. Elegir la siguiente tarea ⬜ cuyas dependencias estén ✅.
2. Leer **solo** su `spec.md`. Si falta algo o cambia el alcance, actualizar el spec antes de programar.
3. Si la tarea es grande, agregar en la misma carpeta un `plan.md` (archivos, componentes, decisiones) y acordarlo.
4. Implementar marcando los criterios `- [x]` a medida que se cumplen.
5. Al terminar: `pnpm check` en verde, cambiar el estado en el spec **y** en este índice, y actualizar el contador de progreso.
6. PR con el código en el título: `feat(catalog): CAT-01 gestión de categorías y platos`.
7. Una tarea nueva se crea copiando [`_template/spec.md`](_template/spec.md) con un código del grupo correspondiente y slug en inglés.
