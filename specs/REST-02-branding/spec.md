# REST-02 · Personalización de marca

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| 🔵 UI lista | erp | restaurant | 2 · Restaurante operativo | REST-01, FND-03 |

## Objetivo

Que cada restaurante suba su logo y portada y defina sus colores y eslogan para destacar en la app y en el directorio web.

## Rutas y pantallas

- `/restaurant/branding` → `RestaurantBrandingView` (Mi restaurante, pestaña Marca)

## Criterios de aceptación

- [x] Subida de logo (cuadrado, máx. 2 MB) y portada (16:9, máx. 5 MB) con vista previa, formatos JPG/PNG/WebP — UI con previsualización local; la subida real espera ADR 0006
- [x] Selector de color de marca (9 sugeridos + personalizado) con aviso si el contraste con el texto es insuficiente (`getBrandColorContrast`, WCAG ≥ 4.5)
- [x] Eslogan con límite de caracteres — **se edita en Perfil** (`/restaurant/edit`) para no duplicar el campo (decisión de producto)
- [x] Vista previa de la tarjeta del restaurante como se verá en la app, aplicando `--brand-primary` (en vivo)

## Cómo

- Decisión pendiente `docs/adr/0006-uploads.md`: subida directa con URL firmada vs vía backend.
- `core/restaurant/domain`: `getBrandColorContrast(color)`, `validateBrandImage(file, kind)`, `restaurantBrandingSchema`.
- UI: `ImageDropzone` (`@mitay/ui/organisms`); pantalla en `presentation/restaurant-branding/`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/uploads/sign` | URL firmada para subir imagen (si se elige esa opción) |
| PUT | `/restaurants/me/branding` | Logo, portada, color y eslogan |

## Fuera de alcance

- Editor de imágenes avanzado (recorte básico sí, filtros no).
