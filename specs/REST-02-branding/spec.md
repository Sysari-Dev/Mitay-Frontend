# REST-02 · Personalización de marca

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | restaurant | 2 · Restaurante operativo | REST-01, FND-03 |

## Objetivo

Que cada restaurante suba su logo y portada y defina sus colores y eslogan para destacar en la app y en el directorio web.

## Rutas y pantallas

- `/restaurant/branding` → `RestaurantBrandingView` (Mi restaurante, pestaña Marca)

## Criterios de aceptación

- [ ] Subida de logo (cuadrado) y portada (16:9) con vista previa, formatos JPG/PNG/WebP y límite de tamaño
- [ ] Selector de color de marca con aviso si el contraste con el texto es insuficiente
- [ ] Eslogan con límite de caracteres
- [ ] Vista previa de la tarjeta del restaurante como se verá en la app, aplicando `--brand-primary`

## Cómo

- Decisión pendiente `docs/adr/0006-uploads.md`: subida directa con URL firmada vs vía backend.
- `core/restaurant/domain`: `hasReadableContrast(color)`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/uploads/sign` | URL firmada para subir imagen (si se elige esa opción) |
| PUT | `/restaurants/me/branding` | Logo, portada, color y eslogan |

## Fuera de alcance

- Editor de imágenes avanzado (recorte básico sí, filtros no).
