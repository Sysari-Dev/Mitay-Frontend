# CAT-05 · Publicación de eventos y campañas

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | erp | catalog | 4 · Crecimiento y analítica | CAT-01, REST-02 |

## Objetivo

Anunciar promociones o eventos temporales (Halloween, aniversario) con imagen y fecha de fin automática.

## Rutas y pantallas

- `/campaigns` → `CampaignsView`
- `/campaigns/new` y `/campaigns/[id]` → `CampaignFormView`

## Criterios de aceptación

- [ ] Campos: título, descripción, imagen, fecha de inicio y de fin
- [ ] Estado calculado: Programada, Activa, Vencida
- [ ] Las vencidas se ocultan del público automáticamente

## Cómo

- `core/catalog/domain`: `getCampaignStatus(campaign, now)`.

## Contrato API (propuesto, acordar con backend)

| Método | Ruta | Uso |
|---|---|---|
| GET/POST/PUT/DELETE | `/campaigns[/:id]` | CRUD de campañas |
