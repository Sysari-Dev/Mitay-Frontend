# Plan técnico: <CODIGO>

## Módulo y capas
| Capa | Archivo(s) | Responsabilidad |
|---|---|---|
| domain | `packages/core/src/<module>/domain/...` | |
| application | `packages/core/src/<module>/application/...` | |
| infrastructure | `packages/core/src/<module>/infrastructure/...` | |
| presentation | `apps/<app>/src/modules/<module>/presentation/...` | |

## Rutas y pantallas
| Ruta | page.tsx → View | Sections |
|---|---|---|
| `/...` | `XxxView` | `...Section` |

## Endpoints (contrato OpenAPI)
| Método | Ruta | Estado en backend | Mock MSW |
|---|---|---|---|
| GET | `/...` | Existe / Pendiente | Sí / No |

## Estados de la UI
- Cargando, vacío, error, éxito, sin permiso.

## Componentes de @mitay/ui necesarios
- Existentes: ...
- Nuevos: ...

## Dependencias nuevas
- Ninguna / paquete + motivo.

## Riesgos
- ...
