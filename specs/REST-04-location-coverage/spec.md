# REST-04 · Ubicación y cobertura de envío

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | restaurant | 2 · Restaurante operativo | REST-01, ADM-02 |

## Objetivo

Registrar la ubicación del local, su ciudad, el radio máximo de reparto y las tarifas referenciales por distancia.

## Rutas y pantallas

- `/restaurant/delivery` → `RestaurantDeliveryView` (Mi restaurante, pestaña Cobertura)

## Criterios de aceptación

- [ ] Mapa para fijar el punto del local (arrastrar marcador o usar ubicación actual)
- [ ] Selector de ciudad base (ciudades activas de ADM-02)
- [ ] Radio máximo en km con círculo visible en el mapa
- [ ] Tarifas por tramos de distancia (ej. 0–2 km S/ 3, 2–4 km S/ 5) sin huecos ni superposición

## Cómo

- Decisión pendiente `docs/adr/0007-maps.md` (recomendado: MapLibre/Leaflet con OpenStreetMap, sin costo).
- Mapa genérico `map-picker` en `@mitay/ui/organisms` (también lo usa ADM-02).
- `core/restaurant/domain`: `deliveryFeeFor(distanceKm, zones)`, `validateDeliveryZones`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/cities` | Ciudades activas |
| PUT | `/restaurants/me/location` | Ubicación, ciudad, radio y tarifas |
