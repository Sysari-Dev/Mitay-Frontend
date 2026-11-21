# FND-06 · Reglas de arquitectura automáticas

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | todas | — | 0 · Fundaciones | FND-01 |

## Objetivo

Que las reglas de AGENTS.md se verifiquen solas en `pnpm lint`, para que ninguna persona ni IA las rompa sin darse cuenta.

## Criterios de aceptación

- [ ] `eslint-plugin-boundaries`: capas de `core` y prohibición de importar `infrastructure` desde la UI
- [ ] Prohibir comentarios en código (regla que marque `//`, `/* */` excepto archivos generados)
- [ ] Prohibir `fetch` directo fuera de `@mitay/api-client`
- [ ] Prohibir `export default` salvo archivos de Next
- [ ] ESLint también en `packages/*` (hoy solo corre en apps)

## Cómo

- Todo en `packages/config/eslint/`; apps y paquetes solo reexportan la configuración.
