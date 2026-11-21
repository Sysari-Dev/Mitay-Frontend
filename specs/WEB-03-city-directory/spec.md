# WEB-03 · Directorio SEO por ciudad

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | web | marketing | 3 · Operación en vivo, administración y directorio | WEB-04, ADM-02, ADM-03 |

## Objetivo

Capturar búsquedas como "restaurantes en Abancay" con páginas públicas indexables. Los destacados pagados son ingreso directo.

## Rutas y pantallas

- `/[ciudad]/restaurantes` → `CityDirectoryView`
- `/[ciudad]/restaurantes/[slug]` → `RestaurantPageView`
- `/[ciudad]/[categoria]` (ej. `/abancay/pollerias`) → `CategoryDirectoryView`

## Criterios de aceptación

- [ ] Listado con filtros por categoría y "Abierto ahora" (`isOpenNow`)
- [ ] Primeros puestos "Recomendados" para planes destacados, con etiqueta de patrocinio
- [ ] Ficha: logo, portada, horario, estado, carta de solo lectura, ubicación y CTA "Pide en la app"
- [ ] Texto introductorio único por ciudad y categoría (no contenido duplicado)
- [ ] Páginas estáticas con revalidación; 404 para ciudades inactivas

## Cómo

- Reutiliza lectura de `core/restaurant` y `core/catalog`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/public/cities/:slug/restaurants` | Restaurantes activos de la ciudad |
| GET | `/public/restaurants/:slug` | Ficha pública con carta |

## Fuera de alcance

- Pedir desde la web (los pedidos se hacen en la app).
