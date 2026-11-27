# REST-04 · Ubicación y radio de reparto

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| 🔵 UI lista | erp | restaurant | 2 · Restaurante operativo | REST-01 |

## Objetivo

Que el restaurante fije el punto exacto de su local y su radio máximo de reparto, para que la app avise al cliente cuando su dirección queda fuera de cobertura ("Este local no llega a tu dirección"). **No define cobros**: las tarifas de envío (por tramos o por zona) quedan para una fase futura con motorizados.

## Rutas y pantallas

- `/restaurant/delivery` → `RestaurantDeliveryView` (Mi restaurante, pestaña Cobertura)

## Criterios de aceptación

- [x] Mapa para fijar el punto del local: arrastrar el pin, tocar el mapa o "Usar mi ubicación" (geolocalización con mensajes si se niega el permiso)
- [x] Campos Latitud y Longitud sincronizados con el pin (alternativa sin arrastrar; es lo único que se guarda junto al radio)
- [x] Radio máximo en km (0,5 a 20, por defecto 5) con círculo visible en el mapa
- [x] Resumen "Hasta dónde llegas": distritos de la provincia dentro y fuera del radio, con su distancia
- [x] Estados de carga (skeleton por sección), error y responsive (360 px → escritorio)
- [ ] Conectar `PUT /restaurants/me/location`

## Cómo

- Mapa: `MapPicker` en `@mitay/ui/organisms` con Leaflet + OpenStreetMap ([ADR-0007](../../docs/adr/0007-maps.md)); también lo usará ADM-02.
- `core/restaurant/domain`: `restaurantCoverageSchema`, `isWithinDeliveryRadius(origin, radiusKm, destination)` (usa `distanceKm` del shared-kernel). ORD-03 reutiliza esta regla en la app móvil.
- La dirección y el distrito se editan en Perfil (`/restaurant/edit`); esta pestaña no los repite.
- "Hasta dónde llegas" usa los distritos de la provincia del local con su centro (`geo.DISTRICT.center_lat` / `center_lng`). Hoy salen de `districtOptionsFixture` (coordenadas aproximadas); con API vendrán del endpoint de distritos, con la misma forma `{ id, name, center: { lat, lng } }`.
- `MapPicker` remonta el lienzo de Leaflet cuando Next oculta la ruta con `<Activity>` (Cache Components): Leaflet destruye su mapa al ocultarse y no puede reutilizarlo.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/restaurants/me/location` | `latitude`, `longitude`, `maxDeliveryRadiusKm` actuales |
| PUT | `/restaurants/me/location` | Guarda `latitude`, `longitude`, `maxDeliveryRadiusKm` |
| GET | `/geo/districts?provinceId={id}` | Distritos activos de la provincia con `centerLat` y `centerLng` (también lo usan Perfil y ADM-02) |

## Fuera de alcance

- Tarifas de envío por tramos o por zona (`partner.DELIVERY_ZONE_RATE`): fase futura con motorizados.
- Selector de ciudad: el distrito ya se define en Perfil.
