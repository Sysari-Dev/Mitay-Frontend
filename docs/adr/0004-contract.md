# ADR-0004: Contrato

- **Estado:** Aceptado
- **Fecha:** 2026-11-20

## Contexto
Frontend, backend (NestJS) y mobile (Expo) los hacen personas distintas en repos distintos. El mayor riesgo es interpretar diferente qué devuelve cada endpoint.

## Decisión
- El backend expone OpenAPI con `@nestjs/swagger` en `http://localhost:4000/api-json` (puerto 4000 para no chocar con las apps).
- `@mitay/api-client` genera los tipos con `openapi-typescript` (`pnpm --filter @mitay/api-client generate`) y usa `openapi-fetch`. Prohibido escribir DTOs a mano.
- Endpoints aún no implementados se acuerdan en el spec y se mockean con **MSW**.
- Los DTOs se traducen a entidades de dominio en `infrastructure/mappers`.
- El backend permite CORS para `mitay.sysari.net`, `panel.mitay.sysari.net` y `admin.mitay.sysari.net`.

## Alternativas consideradas
- **Tipos escritos a mano:** se desincronizan.
- **tRPC / GraphQL:** el backend ya eligió REST con NestJS; además el mobile consume el mismo API.

## Consecuencias
- (+) Un cambio del backend rompe la compilación del frontend en vez de romper producción.
- (+) Mobile puede generar su cliente desde el mismo archivo.
- (−) Depende de que el backend mantenga los decoradores de Swagger al día.

## Pendiente de acordar con backend
- Refresh token: cookie httpOnly (web) y variante para Expo (AUTH-03).
- Tiempo real (NOT-01): WebSocket Gateway de NestJS vs SSE.
- Subida de imágenes (REST-02, CAT-05): URLs firmadas directas vs vía backend.
