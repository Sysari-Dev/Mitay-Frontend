# AUTH-02 · Autenticación con Google

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | identity | 1 · Acceso y presencia pública | AUTH-01 |

## Objetivo

Ingreso y registro de restaurantes en un clic con su cuenta de Google.

## Rutas y pantallas

- erp: botón "Continuar con Google" en `/login` y `/register`

## Criterios de aceptación

- [ ] Botón con Google Identity Services; el `id_token` se envía al backend
- [ ] Si la cuenta no existe, se crea y va al onboarding (REST-01)
- [ ] Si el correo ya existe con contraseña, el backend la vincula o muestra mensaje claro
- [ ] Manejo de cancelación y bloqueo de popups

## Cómo

- Variable `NEXT_PUBLIC_GOOGLE_CLIENT_ID`. Caso de uso `loginWithGoogle(idToken)` en `core/identity/application`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/auth/google` | Valida el id_token y devuelve sesión |

## Fuera de alcance

- Google en el Admin (solo correo y contraseña, para reducir superficie de ataque).
