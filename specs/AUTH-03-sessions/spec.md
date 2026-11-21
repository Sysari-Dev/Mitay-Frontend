# AUTH-03 · Gestión de sesiones y roles

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp, admin | identity | 1 · Acceso y presencia pública | FND-05 |

## Objetivo

Mantener la sesión segura con tokens de acceso y refresco, y proteger cada ruta según el rol.

## Rutas y pantallas

- Todas las rutas de `(dashboard)` en erp y admin quedan protegidas

## Criterios de aceptación

- [ ] Decisión registrada en `docs/adr/0005-auth.md`: refresh token en cookie httpOnly (web) y variante para Expo
- [ ] Paquete `@mitay/auth`: obtener sesión, refrescar ante 401 y cerrar sesión
- [ ] Protección de rutas en el servidor con el proxy de Next 16 (antes `middleware`; revisar docs locales)
- [ ] erp exige rol `restaurant`; admin exige rol `admin`; si no, cierra sesión con mensaje
- [ ] Cierre de sesión desde el menú de usuario; sesión expirada redirige a `/login`

## Cómo

- El access token vive en memoria; nunca en `localStorage`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/auth/refresh` | Renueva el access token |
| POST | `/auth/logout` | Invalida la sesión |
| GET | `/auth/me` | Usuario y rol actual |
