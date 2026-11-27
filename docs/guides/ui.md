# Guía de UI

Léela cuando toques componentes, estilos, colores, tipografía o temas. Decisión de fondo: [UI atómica](../adr/0003-ui-atomic.md).

## 1. Jerarquía

```
app/(group)/route/page.tsx  → ruta de Next: params, metadata, permisos. Renderiza UNA View.
  └─ View                   → modules/<module>/presentation/<screen>/<Screen>View.tsx
      └─ Sections           → modules/<module>/presentation/<screen>/sections
          └─ Components     → modules/<module>/presentation/<screen>/components (negocio; si lo usan 2+ pantallas, presentation/shared)
              └─ @mitay/ui  → atoms / molecules / organisms (genéricos)
layout.tsx                  → renderiza el layout de la app (p. ej. ErpLayout en shared/components), que arma un template de @mitay/ui
```

```tsx
import { CatalogView } from '@/modules/catalog/presentation/catalog/CatalogView'

export const metadata = { title: 'Mi carta' }

export default function Page() {
  return <CatalogView />
}
```

## 2. Niveles en `packages/ui`

| Nivel | Existe hoy | Ejemplos futuros |
|---|---|---|
| `atoms/` | `button`, `badge`, `card`, `skeleton`, `input`, `textarea`, `select`, `label`, `switch`, `checkbox`, `popover` | avatar, tooltip |
| `molecules/` | `theme-toggle`, `sidebar-nav-item`, `app-brand`, `empty-state`, `form-field`, `password-input` | search-bar, price-tag |
| `organisms/` | `theme-preview`, `sidebar`, `topbar`, `image-dropzone`, `map-picker` (Leaflet, ADR-0007) | data-table, dialog |
| `templates/` | `dashboard-template` | marketing-template |
| `lib/` | `utils` (`cn`), `theme`, `fonts` | — |

Componentes con vocabulario de negocio (DishCard, ScheduleEditor, LiveOrderToast) van en `presentation/<screen>/components` del módulo (o `presentation/shared` si los usan varias pantallas), nunca en `packages/ui`. Estructura completa en [ADR-0010](../adr/0010-presentation-by-screen.md).

## 3. Estilos

- Solo Tailwind. Nada de CSS modules ni styled-components.
- Colores, tipografía y radios **siempre** desde tokens (`bg-primary`, no `bg-[#e85d04]`).
- **Paleta por defecto de Tailwind desactivada** (`--color-*: initial`): `bg-red-500`, `text-white` no existen.
- `src/app/globals.css` de cada app: solo `@import "tailwindcss";` y `@import "@mitay/ui/styles.css";`.
- Variantes con `cva`; clases con `cn()` (`@mitay/ui/lib/utils` o `"cn"`, equivalentes).
- Marca del restaurante (REST-02): variable `--brand-primary` en un contenedor + utilidad `bg-brand`.

## 4. Identidad de color: "Rocoto + Chicha"

Inspirada en la cocina peruana. El coral despierta el apetito sin ser el naranja de Rappi/Didi ni el rojo de PedidosYa/iFood; el morado no lo usa ninguna app de delivery. Descartados: amarillo/ámbar (Glovo y el cliente de Sysari Dados & Bocados usan dorado sobre negro) y azul (reduce el apetito).

| Token | Nombre | Uso |
|---|---|---|
| `primary` | Rocoto (coral) | CTA principal, marca, acciones clave |
| `secondary` | Chicha morada | Acciones secundarias, navegación, identidad del admin |
| `tertiary` | Menta (huacatay) | Acentos frescos, etiquetas, gráficos |

- `destructive` es un carmesí más oscuro que `primary`: un error nunca parece un CTA.
- Antes de basar a MITAY en un color, revisar que no se parezca a un cliente de Sysari.

## 5. Tipografía

| Utilidad | Fuente | Uso |
|---|---|---|
| `font-heading` | **Nunito** | Títulos (`h1`–`h4` automático) y logotipo |
| `font-sans` | **Figtree** | Texto e interfaz (por defecto en `body`) |
| `font-mono` | **Geist Mono** | Códigos, tokens, IDs |

Definidas una vez en `packages/ui/src/lib/fonts.ts`; cada `layout.tsx` aplica `fontVariables` en `<html>`. No importar `next/font` en las apps.

## 6. Tokens y temas

En `packages/ui/src/styles/globals.css`: claros en `:root`, oscuros en `.dark`. Cada color tiene pareja `-foreground`.

| Grupo | Utilidades |
|---|---|
| Superficies | `background`, `foreground`, `card`, `popover`, `muted`, `accent` |
| Marca | `primary`, `secondary`, `tertiary`, `brand` |
| Estados | `success`, `warning`, `info`, `destructive` |
| Bordes y foco | `border`, `input`, `ring` |
| Gráficos | `chart-1` … `chart-5` |
| Paneles laterales | `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring` |
| Radios | `rounded-sm` … `rounded-2xl` |

- **Tema por defecto: siempre claro** (`DEFAULT_THEME = 'light'`), aunque el sistema esté en oscuro. La elección del usuario se guarda en `localStorage` (`mitay-theme`).
- `@mitay/ui/lib/theme`: `themeScript` (en el `<head>` de cada `layout.tsx`), `applyTheme('light' | 'dark' | 'system')`.
- `@mitay/ui/molecules/theme-toggle` y `@mitay/ui/organisms/theme-preview`.
- Un color nuevo se agrega en tres lugares: `:root`, `.dark` y `@theme inline`.

## 7. Botón

Único botón del sistema: `Button` de `@mitay/ui/atoms/button`. No se escriben `<button>` con estilos propios en apps ni en otros componentes.

| Prop | Valores | Por defecto |
|---|---|---|
| `variant` | `filled`, `outline`, `ghost`, `link` | `filled` |
| `color` | `primary`, `secondary`, `tertiary`, `brand`, `destructive`, `success`, `warning`, `info`, `neutral` | `primary` |
| `size` | `sm`, `default`, `lg`, `icon-sm`, `icon`, `icon-lg` (44 px, táctil) | `default` |
| `animated` | `true`: crece sutilmente al pasar el cursor y se encoge al presionar (respeta `prefers-reduced-motion`) | `false` |
| `asChild` | Aplica los estilos a su hijo (`Link`, `a`) | `false` |

- Siempre `cursor-pointer`; deshabilitado con `cursor-not-allowed` y opacidad. `type="button"` por defecto (los de envío llevan `type="submit"`).
- Los colores salen de tokens, así que el tema oscuro se aplica solo.
- Botones de solo icono llevan `aria-label`.
- `neutral` es para acciones de interfaz (menú, cerrar, cambiar tema); los colores de marca, para acciones de negocio.

```tsx
<Button>Publicar carta</Button>
<Button variant="outline" color="secondary" animated>Ver campañas</Button>
<Button variant="ghost" color="neutral" size="icon-lg" aria-label="Cerrar menú"><X /></Button>
```

## 8. Formularios

Librería: **React Hook Form + Zod** (`@hookform/resolvers/zod`). Formik no: re-renderiza todo el formulario y está casi sin mantenimiento.

**Validación (antes de enviar al backend):**

- Reglas por campo una sola vez en `@mitay/core/shared-kernel` (`validation.ts`): `emailSchema`, `personNameSchema`, `rucSchema`, `peruvianMobileSchema`, `optionalPhoneSchema`, `addressSchema`, `requiredTextSchema`, `optionalTextSchema`. Mensajes en español, con tests.
- Esquema de cada formulario en el dominio del módulo (`@mitay/core/restaurant` → `restaurantProfileSchema`), armado con esas reglas. Sirve igual para erp, admin y Expo.
- `useForm<Input, unknown, Output>({ resolver: zodResolver(schema), mode: onTouched })`: valida al salir del campo y luego mientras se corrige; al enviar enfoca el primer campo inválido.

**UI (`@mitay/ui`, sin dependencia de React Hook Form):**

| Pieza | Uso |
|---|---|
| `Input` | Texto; `startAddon` / `endAddon` para prefijos (`+51`) o botones. |
| `Textarea`, `Label` | Controles base. |
| `Select` | Lista propia sobre Radix Select (teclado, lector de pantalla, posición automática). Es controlado: con React Hook Form se usa con `Controller`. Opciones con `description` opcional. |
| `PasswordInput` | Contraseña con botón mostrar/ocultar. |
| `Switch` | Interruptor (`role="switch"`), controlado con `checked` / `onCheckedChange`. Propio, sin Radix: el input oculto de Radix genera avisos de hidratación dentro de formularios. |
| `Checkbox`, `Popover` | Sobre Radix; el popover usa la animación `animate-popover-in`. |
| `FormField` | Etiqueta + control + mensaje (error > éxito > ayuda) + contador + "Opcional". Conecta `id`, `aria-invalid` y `aria-describedby` por render prop. |

Estados visuales comunes (`lib/field-styles.ts`): borde gris fino en reposo, más oscuro al pasar el cursor, `primary` con halo suave al enfocar (200 ms), `destructive` con error (`aria-invalid`) y `success` con mensaje de éxito (`data-success`; no usar `data-state`, que lo ocupa Radix).

```tsx
<FormField label="RUC" error={errors.ruc?.message} success={rucSuccess}>
  {(control) => <Input {...control} {...register(ruc)} inputMode="numeric" maxLength={11} />}
</FormField>
```

## 9. Agregar componentes de shadcn/ui

```bash
cd packages/ui
pnpm dlx shadcn@latest add input
```

- Se instalan en `src/atoms/`; si es complejo (`dialog`, `data-table`), moverlo a `molecules/` u `organisms/`.
- Archivos en kebab-case (convención shadcn); import `@mitay/ui/atoms/input`.
- Después de agregar: borrar comentarios, quitar líneas en blanco del JSX y reemplazar colores que no sean tokens (`text-white` → `text-*-foreground`).
