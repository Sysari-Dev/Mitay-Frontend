# REST-01 · Perfil corporativo y horarios

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | restaurant | 2 · Restaurante operativo | FND-04, AUTH-03 |

## Objetivo

Que el restaurante registre sus datos legales, su WhatsApp de pedidos y su horario semanal. Es el onboarding obligatorio tras registrarse.

## Rutas y pantallas

- `/settings/profile` → `ProfileSettingsView`
- `/settings/schedule` → `ScheduleSettingsView`
- `/onboarding` → asistente que reutiliza ambas secciones

## Criterios de aceptación

- [ ] Campos: nombre comercial, razón social, RUC (`isValidRuc`), WhatsApp (+51, 9 dígitos)
- [ ] Horario por día con varios rangos (ej. almuerzo y cena) y rangos que cruzan medianoche
- [ ] Acción "copiar este horario a otros días"
- [ ] Validación: formato HH:mm y sin rangos superpuestos
- [ ] Vista previa "Así te verán: Abierto ahora / Cerrado" usando `isOpenNow`
- [ ] Si el perfil está incompleto, el ERP redirige a `/onboarding`

## Cómo

- `core/restaurant/domain`: entidad `Restaurant`, `isProfileComplete`, `validateSchedule` (reusa `WeeklySchedule`).
- `packages/utils`: `isValidPeruvianMobile`.
- UI: `ScheduleEditor` en `presentation/components`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/restaurants/me` | Perfil actual |
| PUT | `/restaurants/me` | Actualiza datos corporativos |
| PUT | `/restaurants/me/schedule` | Actualiza horario |

## Fuera de alcance

- Auditoría de cambio de RUC (la registra el backend, se ve en ADM-05).
