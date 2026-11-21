# ADM-03 · Gestor de publicidad y planes

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | admin | administration | 3 · Operación en vivo, administración y directorio | ADM-01, ADM-02 |

## Objetivo

Administrar el plan de cada restaurante y los banners por ciudad. Es el motor de ingresos.

## Rutas y pantallas

- `/plans` → `PlansView`
- `/banners` → `BannersView`

## Criterios de aceptación

- [ ] Planes: Gratis (MVP), Destacado semanal, Destacado mensual, Analítica; asignar con fechas de vigencia
- [ ] Destacados alimentan las secciones "Recomendados" de la app y del directorio web (WEB-03)
- [ ] Banners por ciudad: imagen, enlace, orden y vigencia
- [ ] Vista de qué restaurantes tienen plan activo y cuándo vence

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET/PUT | `/admin/restaurants/:id/plan` | Plan y vigencia |
| GET/POST/PUT/DELETE | `/admin/banners[/:id]` | Banners por ciudad |

## Fuera de alcance

- Cobro en línea (los pagos se coordinan fuera del sistema en el MVP).
