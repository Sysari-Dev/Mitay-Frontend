# REST-01 · Perfil corporativo y horarios

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | restaurant | 2 · Restaurante operativo | FND-04, AUTH-03 |

## Objetivo

Que el restaurante registre sus datos legales, su WhatsApp de pedidos y su horario semanal. Es el onboarding obligatorio tras registrarse.

## Rutas y pantallas

- `/restaurant` → `RestaurantProfileView` (Mi restaurante, pestaña Perfil)
- `/restaurant/edit` → `RestaurantProfileEditView` (formulario del perfil, sin pestañas)
- `/restaurant/schedule` → `RestaurantScheduleView` (pestaña Horario)
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
- UI: `ScheduleEditor` en `presentation/restaurant-schedule/components` (sube a `presentation/shared` si el onboarding lo reutiliza).

## Avance (maquetado)

- [x] Pestaña **Perfil** (`/restaurant`) maquetada con datos de ejemplo: datos del negocio (RUC validado con `isValidRuc`), WhatsApp de pedidos con enlace de prueba, ubicación, vista previa "Así te verán" con `isOpenNow` y estados de carga, vacío y error (`?state=`).
- [x] Vista de edición del perfil (`/restaurant/edit`): React Hook Form + `restaurantProfileSchema` de `@mitay/core/restaurant`; guardado simulado que vuelve a `/restaurant`.
- [ ] Pestaña **Horario** y onboarding.
- Nota para backend: la BD usa `day_of_week` 1 = lunes … 7 = domingo; `WeeklySchedule` de core usa 0 = domingo … 6 = sábado. Mapear en `infrastructure`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/restaurants/me` | Perfil actual |
| PUT | `/restaurants/me` | Actualiza datos corporativos |
| PUT | `/restaurants/me/schedule` | Actualiza horario |

## Fuera de alcance

- Auditoría de cambio de RUC (la registra el backend, se ve en ADM-05).
