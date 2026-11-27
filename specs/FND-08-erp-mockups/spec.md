# FND-08 · Maquetado del ERP

| Estado | Apps | Módulo | Fase | Depende de |
|---|---|---|---|---|
| 🟡 Esqueleto | erp | identity, restaurant, catalog, notifications | 0 · Fundaciones | FND-03, FND-04 |

## Objetivo

Maquetar **solo la interfaz** de todas las pantallas del ERP con datos de ejemplo fijos, para validar diseño, flujos y experiencia móvil del dueño del restaurante antes de conectar backend. Cada spec funcional (AUTH, REST, CAT, NOT) reutiliza después estas vistas y solo reemplaza los datos de ejemplo por datos reales.

## Rutas y pantallas

Navegación (sin "Configuración": el MVP solo muestra lo que funciona):

| Grupo | Items |
|---|---|
| — | Inicio |
| Mi negocio | Mi restaurante (perfil, horario, marca, cobertura), Mi carta, Campañas |
| Ventas | Pedidos (intenciones de pedido, NOT-01) |
| Cuenta | Mi cuenta (correo y contraseña) |


| Ruta | View | Módulo | Spec funcional que la conectará |
|---|---|---|---|
| `/login` | `LoginView` | identity | AUTH-01, AUTH-02 |
| `/register` | `RegisterView` | identity | AUTH-01, AUTH-02 |
| `/forgot-password` | `ForgotPasswordView` | identity | AUTH-04 |
| `/reset-password` | `ResetPasswordView` | identity | AUTH-04 |
| `/onboarding` | `OnboardingView` | restaurant | REST-01 |
| `/` | `DashboardView` | restaurant | REST-05 |
| `/catalog` | `CatalogView` | catalog | CAT-01, CAT-02 |
| `/catalog/dishes/new`, `/catalog/dishes/[id]` | `DishFormView` | catalog | CAT-01 |
| `/catalog/import` | `CatalogImportView` (paso subir + paso revisar) | catalog | CAT-03, CAT-04 |
| `/campaigns` | `CampaignsView` | catalog | CAT-05 |
| `/campaigns/new`, `/campaigns/[id]` | `CampaignFormView` | catalog | CAT-05 |
| `/orders` | `OrdersView` (en vivo + historial) | notifications | NOT-01 |
| `/notifications` | `NotificationsView` | notifications | NOT-02 |
| `/restaurant` | `RestaurantProfileView` (pestaña Perfil) | restaurant | REST-01 |
| `/restaurant/schedule` | `RestaurantScheduleView` (pestaña Horario) | restaurant | REST-01 |
| `/restaurant/branding` | `RestaurantBrandingView` (pestaña Marca) | restaurant | REST-02 |
| `/restaurant/delivery` | `RestaurantDeliveryView` (pestaña Cobertura) | restaurant | REST-04 |
| `/account` | `AccountView` (Mi cuenta) | identity | AUTH-04 |

Elementos globales en la topbar del shell (FND-04): interruptor abierto/cerrado (REST-03), campana de avisos (NOT-02) y aviso de pedido en vivo (NOT-01).

## Criterios de aceptación

- [ ] Todas las rutas de la tabla existen y renderizan su View; `/login`, `/register`, `/forgot-password` y `/reset-password` fuera del grupo `(dashboard)`, el resto dentro.
- [ ] Datos de ejemplo realistas de Abancay (platos, precios en céntimos mostrados con `formatPEN`, horarios, pedidos) en `apps/erp/src/modules/<module>/presentation/fixtures/`.
- [ ] Cada vista con datos muestra sus estados de carga (skeleton), vacío, error y éxito; se pueden previsualizar con el parámetro `?state=loading|empty|error` solo en desarrollo.
- [ ] Formularios con validación visual (errores por campo, botón con estado "Guardando…") sin envío real.
- [ ] Interacciones locales simuladas: interruptor abierto/cerrado, marcar plato agotado, ver detalle de una intención de pedido, silenciar el sonido de avisos, pasos del importador y del onboarding.
- [ ] Mobile-first: correcto a 360 px, 768 px y 1280 px, sin scroll horizontal; acción principal al alcance del pulgar en móvil.
- [ ] Solo tokens de color; revisado en tema claro y oscuro; navegable con teclado y con contraste AA.
- [ ] Cumple [`ui-ux-pro`](../../.claude/skills/ui-ux-pro/SKILL.md), la [guía de UI](../../docs/guides/ui.md) y `AGENTS.md` (sin comentarios, JSX compacto, nombres en inglés, textos en español).
- [ ] `pnpm check` en verde.

## Cómo

- Jerarquía `page.tsx → View → Sections → Components → @mitay/ui`; los componentes de negocio (DishCard, OrderCard, ScheduleEditor, OpenStatusSwitch…) en `presentation/components` del módulo.
- Los fixtures se tipan con tipos locales de `presentation`, con nombres y forma pensados para coincidir con los futuros tipos de `@mitay/core`, de modo que conectar datos reales sea solo cambiar la fuente.
- Estado local con `useState` en hooks de `presentation/hooks`; sin llamadas de red, sin `@mitay/api-client` ni lógica en `core`.
- Se maqueta por bloques, en este orden sugerido: acceso → shell y dashboard → carta → pedidos y avisos → configuración y onboarding → campañas → importador.
- Validar cada bloque con capturas de Playwright en móvil y escritorio.

## Avance

- [x] Bloque 0 · Layout de baja fidelidad: `DashboardTemplate` en `@mitay/ui/templates` compuesto por `Sidebar` y `Topbar` (organisms) y `SidebarNavItem` (molecule), con sidebar fija en escritorio y menú lateral en móvil; `ErpLayout` con la navegación del ERP y rutas `/`, `/orders`, `/catalog`, `/campaigns`, `/restaurant`, `/account` con un contenedor de marcador por página.
- [x] Iconos de navegación con `lucide-react` (catalog, en `packages/ui` y las tres apps).
- [ ] Pendiente para alta fidelidad: contador de pedidos en la navegación (NOT-01), sidebar colapsable y `sheet` de FND-03/FND-04.

## Fuera de alcance

- Conexión al backend, autenticación real, persistencia y reglas de dominio en `@mitay/core` (van en cada spec funcional).
- Mapa interactivo de cobertura (REST-04 depende de ADR 0007): se maqueta un contenedor reservado.
- Subida real de imágenes y PDF (ADR 0006): solo la UI del dropzone.
- Tiempo real de pedidos (ADR 0008): se simula con datos fijos.
- Pantallas de `admin` y `web`.
