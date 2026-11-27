---
name: ui-ux-pro
description: Manual experto de UI/UX para Next.js (App Router) + Tailwind v4 en MITAY. Usar siempre que se diseñe, cree o modifique una vista, pantalla, sección o componente visual en web, erp, admin o packages/ui (mobile-first, jerarquía visual, estados vacío/carga/error, accesibilidad, contraste, espaciado y flujos de conversión).
---

# UI/UX Pro — MITAY

Manual para diseñar interfaces comerciales y móviles de calidad. Complementa (no reemplaza) [`AGENTS.md`](../../../AGENTS.md) y la [guía de UI](../../../docs/guides/ui.md): tokens, temas, tipografía y jerarquía View → Sections → Components → `@mitay/ui` salen de ahí.

## 0. Antes de diseñar

1. ¿Quién usa la pantalla y en qué dispositivo? `web` = comensal y dueño desde el celular con datos móviles; `erp` = dueño del restaurante, a menudo en celular en plena hora punta; `admin` = equipo Sysari en escritorio.
2. ¿Cuál es **la única acción principal** de la pantalla? Todo lo demás se subordina a ella.
3. ¿Qué estados existen? Enumerar: carga, vacío, error, éxito, parcial, sin permisos, sin conexión.
4. ¿Qué componentes de `@mitay/ui` ya resuelven esto? Reutilizar antes de crear.

## 1. Mobile-first

- Escribir las clases base para ~360 px y ampliar con `sm:` `md:` `lg:`. Nunca diseñar en escritorio y "encoger".
- Una columna por defecto; las grillas aparecen desde `md:`.
- Objetivos táctiles de **mínimo 44×44 px** (`min-h-11`, `size-11`) con al menos 8 px de separación.
- Acción principal al alcance del pulgar: en móvil, barra inferior fija (`fixed inset-x-0 bottom-0` con `pb-[env(safe-area-inset-bottom)]`) para carrito, "Enviar por WhatsApp" o "Guardar".
- Sin scroll horizontal accidental: probar a 360 px; tablas anchas → tarjetas apiladas en móvil o contenedor con `overflow-x-auto` explícito.
- Inputs con `type`, `inputMode` y `autoComplete` correctos (`tel`, `email`, `numeric`) para abrir el teclado adecuado; texto de input ≥ 16 px (`text-base`) para que iOS no haga zoom.
- Imágenes con `next/image`, `sizes` real y `priority` solo en la imagen principal visible al cargar.

## 2. Jerarquía visual

- Un solo foco por pantalla: un único `<Button>` relleno en `primary` (Rocoto). El resto en `outline`, `ghost` o `link`, o en otro `color`.
- Todo botón es `Button` de `@mitay/ui/atoms/button`; nunca `<button>` con estilos propios. Un enlace con forma de botón usa `<Button asChild><Link /></Button>`.
- Escala tipográfica limitada: título de página, título de sección, cuerpo, apoyo. No inventar tamaños intermedios.
- Títulos con `font-heading` (Nunito, automático en `h1`–`h4`); cuerpo con `font-sans` (Figtree). Un `h1` por página y niveles sin saltos.
- Jerarquía por tamaño, peso y espacio antes que por color. `text-muted-foreground` para texto de apoyo, nunca para información crítica.
- Agrupar por proximidad: más espacio entre grupos que dentro de un grupo.
- Ancho de lectura cómodo: `max-w-prose` o `max-w-2xl` para texto corrido.
- Precios destacados y alineados (`tabular-nums`); siempre con `formatPEN`, nunca formateo a mano.

## 3. Espaciado y layout

- Usar solo la escala de Tailwind en múltiplos de 4 px: `1, 2, 3, 4, 6, 8, 12, 16`. Nada de valores arbitrarios (`p-[13px]`).
- Ritmo estándar: `gap-2` dentro de un control, `gap-4` entre campos, `gap-6`/`gap-8` entre bloques, `py-12`+ entre secciones de landing.
- Márgenes laterales de página: `px-4` móvil, `sm:px-6`, `lg:px-8`, dentro de un contenedor `mx-auto max-w-*`.
- Preferir `flex`/`grid` con `gap` sobre márgenes en hijos.
- Radios desde tokens (`rounded-md` … `rounded-2xl`), coherentes por nivel: controles más chicos que tarjetas.

## 4. Color, contraste y temas

- **Solo tokens** (`bg-primary`, `text-foreground`, `border-border`); la paleta de Tailwind está desactivada. Cada fondo usa su pareja `-foreground`.
- Contraste WCAG AA: texto normal ≥ 4.5:1, texto grande y bordes de controles ≥ 3:1. Verificar en tema **claro y oscuro**.
- El color nunca es la única señal: acompañar estados con icono o texto ("Cerrado", "Agotado").
- `destructive` solo para errores y acciones irreversibles; `success`, `warning`, `info` para estados. Nunca `primary` para un error.
- Marca del restaurante con `--brand-primary` / `bg-brand` solo dentro de su contenedor; el chrome de MITAY no cambia.
- Diseñar primero en tema claro (por defecto) y revisar el oscuro antes de entregar.

## 5. Estados obligatorios

Toda vista o sección que dependa de datos cubre los cinco:

| Estado | Cómo |
|---|---|
| Carga | Skeleton con la misma forma y tamaño del contenido final (evita saltos de layout). En App Router, `loading.tsx` o `<Suspense fallback>` por sección, no un spinner de página completa. |
| Vacío | Ilustración o icono sobrio + qué significa + **una acción** para salir del vacío ("Agrega tu primer plato"). Distinguir "aún no hay datos" de "tu búsqueda no tiene resultados" (este último ofrece limpiar filtros). |
| Error | Mensaje en español, humano y accionable: qué pasó + qué hacer + botón "Reintentar". En App Router, `error.tsx` por segmento. Nunca mostrar stack ni códigos crudos. |
| Éxito | Confirmación breve (toast o mensaje en línea) cerca de donde ocurrió la acción. |
| Parcial / deshabilitado | Explicar por qué algo no está disponible ("Abre a las 12:00") en vez de solo ocultarlo o atenuarlo. |

- Botones con estado de envío: deshabilitados + etiqueta de progreso ("Guardando…") y sin doble envío.
- Actualizaciones optimistas solo cuando el revertir es claro.
- Reservar espacio para contenido que llega tarde (imágenes con `aspect-*`, skeletons) para CLS ≈ 0.

## 6. Accesibilidad

- HTML semántico primero: `button` para acciones, `a`/`Link` para navegación, `nav`, `main`, `header`, `section` con encabezado, `ul` para listas.
- Todo control con nombre accesible: `<label htmlFor>` visible en formularios; `aria-label` en botones de solo icono.
- Foco visible siempre (`focus-visible:ring-2 ring-ring`); nunca `outline-none` sin reemplazo. Orden de tabulación lógico.
- Errores de formulario: mensaje junto al campo, `aria-invalid` y `aria-describedby`; al enviar, foco al primer campo inválido.
- Mensajes dinámicos (carrito, toasts, nuevos pedidos) en región `aria-live="polite"`.
- Diálogos y menús con foco atrapado, cierre con Escape y retorno del foco (usar los de shadcn/Radix en `@mitay/ui`).
- Respetar `motion-reduce:`; animaciones cortas (150–250 ms) y solo con propósito.
- `alt` descriptivo en imágenes de platos y locales; `alt=""` en decorativas.
- `lang="es"` en `<html>` y textos visibles en español.

## 7. Flujos de conversión sin fricción

- **Comensal (web):** del descubrimiento al pedido en el menor número de toques. Carrito siempre visible con total y conteo; agregar un plato sin salir de la carta; resumen claro antes de "Enviar por WhatsApp"; pedir solo los datos imprescindibles.
- **Captación B2B (web → erp):** propuesta de valor en el primer pantallazo (sin comisiones), prueba social, un CTA repetido en puntos clave, formulario corto (dividir en pasos si pasa de ~5 campos, con indicador de progreso).
- **Restaurante (erp):** acciones frecuentes (marcar agotado, abrir/cerrar local) a un toque y sin confirmación modal; confirmar solo lo irreversible y con la consecuencia explícita.
- Formularios: valores por defecto sensatos, validación al salir del campo (no en cada tecla), mensajes que dicen cómo corregir, no borrar lo escrito tras un error.
- Copys: verbos concretos en botones ("Publicar carta", no "Aceptar"); tono cercano y local; números y horarios en formato peruano.
- Evitar patrones oscuros: nada de casillas premarcadas para publicidad ni cancelación escondida.

## 8. Next.js App Router

- `page.tsx` solo renderiza una View; los datos se piden en Server Components y lo interactivo se aísla en hojas `'use client'` lo más pequeñas posible.
- `loading.tsx`, `error.tsx` y `not-found.tsx` por segmento cuando la ruta carga datos.
- `metadata` en español y por página en `web` (SEO); títulos útiles también en `erp`/`admin`.
- Fuentes desde `@mitay/ui/lib/fonts`, nunca `next/font` directo en las apps.
- Antes de usar una API de Next, revisar `apps/<app>/node_modules/next/dist/docs/` y Context7.

## 9. Checklist de entrega

- [ ] Se ve bien a 360 px, 768 px y 1280 px, sin scroll horizontal.
- [ ] Una sola acción primaria visible y al alcance del pulgar en móvil.
- [ ] Estados de carga, vacío, error y éxito implementados.
- [ ] Solo tokens de color; contraste AA en claro y oscuro.
- [ ] Navegable con teclado, foco visible, labels y `alt` presentes.
- [ ] Espaciado en la escala de 4 px, sin valores arbitrarios.
- [ ] Componentes genéricos en `@mitay/ui`; los de negocio en `presentation/<screen>/` o `presentation/shared/` del módulo (ADR-0010).
- [ ] Reglas de `AGENTS.md`: sin comentarios, JSX sin líneas en blanco, nombres en inglés, textos en español.
- [ ] Si Playwright MCP está disponible: captura en móvil y escritorio para revisar el resultado real.
