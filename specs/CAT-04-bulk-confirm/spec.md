# CAT-04 · Confirmación masiva de carta

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | catalog | 4 · Crecimiento y analítica | CAT-03 |

## Objetivo

Revisar, corregir y aprobar el borrador extraído del PDF para guardarlo de una vez.

## Rutas y pantallas

- `/catalog/import` → `CatalogImportView` (paso 2: revisar)

## Criterios de aceptación

- [ ] Tabla editable: nombre, descripción, precio, categoría; eliminar filas
- [ ] Asignar a categorías existentes o crear nuevas
- [ ] Resaltar filas inválidas (sin precio, duplicadas) antes de confirmar
- [ ] Confirmación guarda todo en lote y muestra el resumen

## Cómo

- `core/catalog/domain`: `validateDraftMenu`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/catalog/import/confirm` | Guarda los platos aprobados en lote |
