# AUTH-04 · Gestión de contraseñas

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp, admin | identity | 1 · Acceso y presencia pública | AUTH-01 |

## Objetivo

Recuperar el acceso por correo y cambiar la contraseña con la sesión activa.

## Rutas y pantallas

- `/forgot-password` → `ForgotPasswordView`
- `/reset-password?token=` → `ResetPasswordView`
- `/settings/security` → `SecuritySettingsView`

## Criterios de aceptación

- [ ] Solicitud por correo con mensaje neutro (no revela si el correo existe)
- [ ] Enlace temporal: si expiró, mensaje claro y opción de pedir otro
- [ ] Cambio con contraseña actual + nueva + confirmación
- [ ] Tras cambiar, se cierran las demás sesiones (según backend)

## Cómo

- Reutiliza `isStrongPassword` de AUTH-01.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/auth/password/forgot` | Envía enlace de recuperación |
| POST | `/auth/password/reset` | Nueva contraseña con token |
| PATCH | `/auth/password` | Cambio con sesión activa |
