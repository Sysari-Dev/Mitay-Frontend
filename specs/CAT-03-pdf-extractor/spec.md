# CAT-03 · Extractor de cartas en PDF

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | catalog | 4 · Crecimiento y analítica | CAT-01 |

## Objetivo

Subir la carta en PDF y obtener un borrador estructurado de categorías y platos sin tipearlos a mano.

## Rutas y pantallas

- `/catalog/import` → `CatalogImportView` (paso 1: subir)

## Criterios de aceptación

- [ ] Zona para arrastrar PDF, límite de tamaño y validación de tipo
- [ ] Progreso de subida y estado "Analizando carta…"
- [ ] Errores claros si el PDF no se puede leer
- [ ] El borrador devuelto pasa a la revisión de CAT-04

## Cómo

- `file-dropzone` de `@mitay/ui`. El análisis lo hace el backend.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/catalog/import` | Recibe PDF (multipart) y devuelve borrador JSON |

## Fuera de alcance

- Fotos de carta (solo PDF en el MVP).
