# WEB-02 · Página para restaurantes (captación B2B)

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | web | marketing | 1 · Acceso y presencia pública | FND-03 |

## Objetivo

Convertir dueños de restaurantes en socios: explicar el valor, los planes y facilitar el registro.

## Rutas y pantallas

- `/para-restaurantes` → `ForRestaurantsView`

## Criterios de aceptación

- [ ] Propuesta: 0% de comisión, pedidos directo a WhatsApp, carta digital, carga desde PDF, métricas
- [ ] Calculadora de ahorro: ventas mensuales × comisión típica de otras apps = lo que ahorras con MITAY
- [ ] Planes: Gratis, Destacado (semanal/mensual), Analítica, con lo que incluye cada uno
- [ ] Formulario de contacto (nombre del local, responsable, WhatsApp, distrito) y botón de WhatsApp de Sysari
- [ ] CTA principal: "Registrar mi restaurante" → `panel.mitay.sysari.net/register`
- [ ] Preguntas frecuentes para dueños

## Cómo

- `core/marketing/domain`: `calculateCommissionSavings(monthlySales, commissionRate)` con test.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| POST | `/public/leads` | Registra un prospecto |
