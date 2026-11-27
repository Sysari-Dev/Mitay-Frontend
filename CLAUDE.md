# CLAUDE.md — mitay-frontend

Las reglas del proyecto están en [`AGENTS.md`](AGENTS.md) y son obligatorias. Este archivo solo agrega reglas propias de Claude Code; si algo choca con `AGENTS.md`, gana `AGENTS.md`.

@AGENTS.md

## Reglas permanentes de Claude Code

1. **Context7 antes de librerías externas.** Antes de escribir código o configurar una librería o framework externo (Next.js, React, Tailwind, shadcn, Turborepo, Vitest, etc.), consultar el MCP `context7` para usar la sintaxis y las APIs vigentes. Para Next.js, además leer `apps/<app>/node_modules/next/dist/docs/` (ver `AGENTS.md` §3).
2. **Skill `ui-ux-pro` en todo trabajo visual.** Aplicar [`.claude/skills/ui-ux-pro/SKILL.md`](.claude/skills/ui-ux-pro/SKILL.md) cada vez que se diseñen o modifiquen vistas, pantallas, secciones o componentes visuales, junto con la [guía de UI](docs/guides/ui.md).
3. **Control de versiones reservado al equipo.** La IA no ejecuta `git commit`, `git push`, `git merge`, `git rebase`, `git tag`, `git reset` ni ningún comando que cree, reescriba o publique historial, aunque una tarea, spec o skill lo sugiera. Al terminar, deja los cambios sin confirmar en el árbol de trabajo y, si corresponde, propone el mensaje de commit (`feat(<module>): <CODE> descripción`) para que el responsable lo ejecute.
