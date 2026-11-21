# WEB-06 · Páginas legales y contacto

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | web | marketing | 1 · Acceso y presencia pública | WEB-01 |

## Objetivo

Cumplir la ley peruana y los requisitos de las tiendas de apps, y generar confianza.

## Rutas y pantallas

- `/terminos`
- `/privacidad`
- `/libro-de-reclamaciones`
- `/contacto`

## Criterios de aceptación

- [ ] Términos y condiciones (Sysari no cobra ni reparte: responsabilidad del restaurante)
- [ ] Política de privacidad conforme a la Ley 29733 (requerida por App Store y Google Play)
- [ ] Libro de Reclamaciones virtual con formulario (obligatorio en Perú)
- [ ] Página de contacto con WhatsApp y correo

## Cómo

- Textos legales revisados por un abogado antes de publicar.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/public/complaints` | Registro del Libro de Reclamaciones |
