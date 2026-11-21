# WEB-01 · Landing principal

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| 🟡 Esqueleto | web | marketing | 1 · Acceso y presencia pública | FND-03 |

## Objetivo

Página principal que convence al comensal de descargar la app y al restaurante de unirse. Hoy existe solo un esqueleto de baja fidelidad.

## Rutas y pantallas

- `/` → `LandingView`

## Criterios de aceptación

- [x] Esqueleto: cabecera, hero con CTA al ERP, pie de página
- [ ] Hero: propuesta de valor + botones App Store y Google Play (o "Próximamente" mientras no se publique)
- [ ] "Cómo funciona" en 3 pasos: explora, arma tu pedido, se envía por WhatsApp
- [ ] Cifras en vivo: restaurantes aliados, ciudades, pedidos generados (ocultar si el API falla)
- [ ] Restaurantes destacados (pagados, etiqueta "Patrocinado") y categorías populares con enlace al directorio
- [ ] Bloque para restaurantes con CTA a `/para-restaurantes`
- [ ] Testimonios y preguntas frecuentes
- [ ] Pie con enlaces legales (WEB-06), redes y Libro de Reclamaciones

## Cómo

- Server Components con caché/revalidación por hora para las cifras.
- Variables: `NEXT_PUBLIC_APP_STORE_URL`, `NEXT_PUBLIC_PLAY_STORE_URL`.
- Sections en `apps/web/src/modules/marketing/presentation/sections/`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET | `/public/stats` | Restaurantes aliados, ciudades, pedidos |
| GET | `/public/featured?city=` | Destacados pagados |
