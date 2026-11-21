# FND-07 · Git, CI y despliegue

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| ⬜ Pendiente | todas | — | 0 · Fundaciones | FND-01 |

## Objetivo

Repositorio remoto con verificación automática en cada PR y despliegue de las tres apps en sus dominios.

## Criterios de aceptación

- [ ] Repositorio git inicializado y publicado (rama `main` protegida)
- [ ] GitHub Actions: `pnpm install --frozen-lockfile` + `pnpm check` en cada PR
- [ ] Tres proyectos en Vercel (Root Directory `apps/<app>`) con preview por PR
- [ ] Dominios: `mitay.sysari.net`, `panel.mitay.sysari.net`, `admin.mitay.sysari.net`
- [ ] Variables de entorno cargadas en Vercel por app
- [ ] Playwright configurado con un test e2e de humo por app

## Cómo

- Vercel Pro para uso comercial (el plan Hobby no lo permite).
