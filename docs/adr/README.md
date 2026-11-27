# Architecture Decision Records (ADR)

Un ADR registra **una decisión** que afecta a más de un módulo o app: contexto, decisión y consecuencias. No se editan: si una decisión cambia, se crea un ADR nuevo que **reemplaza** al anterior.

| # | Decisión | Estado |
|---|---|---|
| [0001](0001-monorepo.md) | Monorepo | Aceptado |
| [0002](0002-hexagonal.md) | Hexagonal | Aceptado (estructura de `presentation` reemplazada por 0010) |
| [0003](0003-ui-atomic.md) | UI atómica | Aceptado (estructura de `presentation` reemplazada por 0010) |
| [0004](0004-contract.md) | Contrato | Aceptado |
| [0010](0010-presentation-by-screen.md) | `presentation` organizada por pantalla | Aceptado |

Para una decisión nueva, copia [`0000-template.md`](0000-template.md) con el siguiente número libre y un nombre corto en inglés. Los números 0005–0009 están reservados para las decisiones pendientes con backend (ver `specs/README.md`).
