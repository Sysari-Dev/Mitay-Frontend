# FND-05 · Capa de datos

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp, admin, web | — | 0 · Fundaciones | FND-01 |

## Objetivo

Conectar las apps al backend de forma tipada, con caché, manejo de errores uniforme y mocks para no depender del backend.

## Criterios de aceptación

- [ ] `QueryProvider` (TanStack Query) en `apps/<app>/src/shared/providers` con reintentos y tiempos de caché por defecto
- [ ] Cliente `@mitay/api-client` configurado por variable `NEXT_PUBLIC_API_URL` (en cada `.env.example`)
- [ ] Errores del API traducidos a mensajes en español y mostrados con toaster
- [ ] MSW activable con `NEXT_PUBLIC_API_MOCKS=true` para desarrollo sin backend
- [ ] Primer repositorio real de ejemplo en `core` siguiendo las 4 capas
- [ ] Tipos generados desde el OpenAPI del backend en cuanto esté disponible

## Cómo

- Dependencias: `@tanstack/react-query`, `msw` (al catalog).
- El `ApiClient` se inyecta a los repositorios de `infrastructure`; los hooks de `presentation` llaman casos de uso.
