# CAT-01 · Gestión de categorías y platos

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| 🔵 UI lista | erp | catalog | 2 · Restaurante operativo | FND-03, FND-04 |

## Objetivo

Que el restaurante arme su carta: secciones (categorías) y platos con precio, descripción e imagen.

## Rutas y pantallas

- `/catalog` → `CatalogView`
- `/catalog/dishes/new` y `/catalog/dishes/[id]` → `DishFormView`

## Criterios de aceptación

- [x] Crear, renombrar, reordenar y eliminar categorías (diálogo "Categorías"; reordenar con flechas ↑↓ en lugar de arrastrar: más fiable en celular y sin dependencias; solo se eliminan categorías sin platos)
- [x] Plato: nombre, descripción, precio en soles, categoría, imagen y disponibilidad (mismo formulario para crear y editar, con vista previa "Así se verá en tu carta"; `?category=` preselecciona la categoría)
- [x] Borrado lógico con confirmación (UI de confirmación lista; el borrado lógico lo hace el backend con `deleted_at`)
- [x] Búsqueda (sin importar tildes ni mayúsculas) y filtro por categoría
- [x] Precio ingresado en soles (acepta `12`, `12.5` o `12,50`) y guardado en céntimos (`dishPriceSchema` usa `solesToCents`)

## Cómo

- `core/catalog/domain`: `Dish`, `MenuCategory`, `filterDishes`, `moveCategory`, `canDeleteCategory`, `categoryNameSchema`; `dishFormSchema`, `dishPriceSchema`, `centsToPriceInput`, `validateDishImage` (foto JPG/PNG/WebP hasta 3 MB, regla común en `shared-kernel/imageFile`).
- Vista principal en `presentation/catalog/`; formulario del plato en `presentation/dish-form/` (`DishFormView mode="create" | "edit"`; ID inexistente muestra "No encontramos este plato").

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/catalog` | Categorías con platos |
| POST/PUT/DELETE | `/categories[/:id]` | CRUD de categorías |
| POST/PUT/DELETE | `/dishes[/:id]` | CRUD de platos |
| PATCH | `/categories/order` | Orden de categorías |
