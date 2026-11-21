# ADM-02 · Gestión de ciudades operativas

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | admin | administration | 2 · Restaurante operativo | FND-04, AUTH-03 |

## Objetivo

Habilitar ciudades (Abancay, luego Cusco…) con su centro geográfico. Va antes que REST-04 y WEB-03, que dependen de ellas.

## Rutas y pantallas

- `/cities` → `CitiesView`

## Criterios de aceptación

- [ ] Crear/editar: nombre, slug (generado y editable), coordenadas del centro en mapa
- [ ] Activar/desactivar ciudad
- [ ] El slug valida formato URL porque se usa en la web (`/abancay/restaurantes`)

## Cómo

- `core/shared-kernel`: `toCitySlug(name)`. Reutiliza `map-picker` de REST-04.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET/POST/PUT | `/admin/cities[/:id]` | CRUD de ciudades |
