# WEB-04 · SEO técnico

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | web | marketing | 1 · Acceso y presencia pública | WEB-01 |

## Objetivo

Que Google entienda, indexe y muestre bien a MITAY en búsquedas locales.

## Rutas y pantallas

- `sitemap.xml`, `robots.txt`, imágenes Open Graph

## Criterios de aceptación

- [ ] `metadata` por página: título, descripción, canonical, `lang="es-PE"`
- [ ] `sitemap.ts` dinámico con ciudades y restaurantes; `robots.ts`
- [ ] Datos estructurados JSON-LD: Organization, WebSite, Restaurant, BreadcrumbList, FAQPage
- [ ] Imágenes Open Graph generadas por página (`next/og`)
- [ ] Core Web Vitals: LCP < 2.5 s, CLS < 0.1; imágenes con `next/image`
- [ ] Verificación en Google Search Console

## Cómo

- Palabras clave objetivo: "restaurantes en Abancay", "delivery Abancay", "qué comer en Abancay", "comida a domicilio Abancay".

## Fuera de alcance

- Ficha de Google Business Profile (tarea de marketing, no de código).
