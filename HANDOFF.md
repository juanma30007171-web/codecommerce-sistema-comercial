# HANDOFF — Code Commerce (landing Sistema Comercial)

_Actualizado: 2026-10-02_

- **Proyecto:** CodeCommerce — Sistema Comercial Autogestionable (landing de lanzamiento)
- **Repo:** https://github.com/juanma30007171-web/codecommerce-sistema-comercial
- **Rama:** `master`
- **Stack:** sitio estático (HTML + CSS + JS sin framework ni build). `server.mjs` es un servidor de preview local con 0 dependencias. Hosting estático (Netlify).

## Instalar y ejecutar

```bash
git clone https://github.com/juanma30007171-web/codecommerce-sistema-comercial.git
cd codecommerce-sistema-comercial
node server.mjs        # o: pnpm dev / npm run dev  → http://localhost:4322
```

No hay dependencias que instalar (`pnpm install` no hace falta) ni lockfile. Solo se necesita Node 18+.

## Variables de entorno

Ninguna es necesaria. `.env.example` documenta:

- `PORT` — puerto opcional del servidor de preview.
- `META_CAPI_ACCESS_TOKEN` — reservada para Conversions API (sin implementar; requiere backend).

## Estado actual

- Landing completa y publicada en el repo; árbol de trabajo limpio y sincronizado con `origin/master`.
- No hay build, typecheck, lint ni tests en este proyecto. Verificación disponible: `node --check` de los scripts y carga local con `server.mjs`.

## Qué funciona

- Landing completa (secciones, videos, demo del Copiloto, CTAs a WhatsApp).
- Capa de medición propia vía `window.dataLayer` (`whatsapp_click`, `cta_click`, `copilot_tab_view`, `copilot_demo_interaction`) en `assets/js/main.js`.
- Meta Pixel conectado (ID `1380723414108451`): se inicializa una vez y envía `PageView` una vez por carga (ver abajo).

## Pendiente

- Decidir qué botones disparan cada evento de Meta (no instrumentado a propósito).
- Google Tag Manager aún no está inyectado (el `dataLayer` existe pero nadie lo consume).
- `VISUAL_ASSETS_TODO.md` lista assets visuales pendientes.

## Meta Tracking

**El Meta Pixel de Code Commerce está conectado.** Pixel ID: `1380723414108451`.

- `assets/js/meta-pixel.js` — carga `fbevents.js`, inicializa el Pixel una sola vez, envía `PageView` una vez por carga y expone `window.ccMeta.track(evento, params)`.
- `index.html` — incluye ese script justo antes de `main.js`. No hay otro snippet de Meta en el sitio.

**Dónde está el Pixel ID:** como el sitio es estático no existe `NEXT_PUBLIC_META_PIXEL_ID`. El ID vive en la constante al inicio de `assets/js/meta-pixel.js`:

```js
const META_PIXEL_ID = "1380723414108451";
```

Es un identificador público, así que se versiona y se despliega con un commit normal.

**Aún sin implementar:** Conversions API (CAPI) y los eventos por botón. Hoy solo se envía `PageView`.

Eventos disponibles para instrumentar: `Lead`, `Contact`, `Schedule`, `ViewContent` (estándar) y `WhatsAppClick` (custom). Ejemplo:

```js
window.ccMeta.track("Lead");
window.ccMeta.track("ViewContent", { content_name: "precio" });
```

Los listeners de CTA ya existentes en `assets/js/main.js` (los que hacen `dataLayer.push`) son el lugar natural para añadir estas llamadas cuando se defina la instrumentación.

## Continuar desde otro computador

1. Clonar el repo y ejecutar `node server.mjs`.
2. Verificar con Meta Pixel Helper (o DevTools → Network, filtro `facebook`) que llega un solo `PageView` del Pixel `1380723414108451`.
3. Definir e instrumentar los eventos por botón.
4. Commit + push a `master` y desplegar.
