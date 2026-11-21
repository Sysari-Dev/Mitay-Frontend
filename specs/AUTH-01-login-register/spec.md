# AUTH-01 · Registro e inicio de sesión

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp, admin | identity | 1 · Acceso y presencia pública | FND-03, FND-05, AUTH-03 |

## Objetivo

Que un restaurante cree su cuenta e ingrese al ERP con correo y contraseña, y que el equipo de Sysari ingrese al Admin.

## Rutas y pantallas

- erp: `/login` → `LoginView`, `/register` → `RegisterView`
- admin: `/login` → `LoginView` (sin registro: las cuentas admin se crean internamente)

## Criterios de aceptación

- [ ] Validación con Zod: correo válido, contraseña de 8+ caracteres con letra y número
- [ ] Mostrar/ocultar contraseña, estado de carga y errores del backend en español
- [ ] Registro (solo erp): nombre del local, nombre del responsable, correo, contraseña, aceptación de términos
- [ ] Tras registrarse, redirige al onboarding del perfil (REST-01)
- [ ] Tras ingresar, redirige a `/` o a la ruta que intentaba abrir
- [ ] Un usuario con rol incorrecto no puede ingresar a otra app (restaurante → admin)

## Cómo

- `core/identity/domain`: `isStrongPassword`, tipos `Role` (`client`, `restaurant`, `admin`), `Credentials`.
- `core/identity/application`: `login`, `register` + puerto `AuthRepository`.
- UI: `LoginForm`, `RegisterForm` en `presentation/sections`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/auth/login` | Ingreso con correo y contraseña |
| POST | `/auth/register` | Alta de cuenta de restaurante |

## Fuera de alcance

- Registro de clientes finales (app mobile).
