# CAT-01 · Gestión de categorías y platos

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | catalog | 2 · Restaurante operativo | FND-03, FND-04 |

## Objetivo

Que el restaurante arme su carta: secciones (categorías) y platos con precio, descripción e imagen.

## Rutas y pantallas

- `/catalog` → `CatalogView`
- `/catalog/dishes/new` y `/catalog/dishes/[id]` → `DishFormView`

## Criterios de aceptación

- [ ] Crear, renombrar, reordenar (arrastrar) y eliminar categorías
- [ ] Plato: nombre, descripción, precio en soles, categoría, imagen
- [ ] Borrado lógico con confirmación
- [ ] Búsqueda y filtro por categoría
- [ ] Precio ingresado en soles y guardado en céntimos (`solesToCents`)

## Cómo

- `core/catalog/domain`: `Dish`, `Category`, `validateDish` (precio > 0, nombre requerido).

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/catalog` | Categorías con platos |
| POST/PUT/DELETE | `/categories[/:id]` | CRUD de categorías |
| POST/PUT/DELETE | `/dishes[/:id]` | CRUD de platos |
| PATCH | `/categories/order` | Orden de categorías |
