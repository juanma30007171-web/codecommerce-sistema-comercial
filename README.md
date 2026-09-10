# CodeCommerce — Sistema Comercial Autogestionable

Landing de lanzamiento para la nueva oferta de CodeCommerce: un sistema comercial
(web + anuncios + WhatsApp automatizado + campaña inicial + Copiloto de Marketing
con IA) construido para pymes colombianas que quieren dejar de depender de una
agencia sin volverse expertas en marketing digital.

No es una plantilla: la arquitectura, el copy y el sistema visual se diseñaron
específicamente para esta oferta, siguiendo el flujo de conversión
`codecommerce-conversion → frontend-design → codecommerce-web` del sistema CodeCommerce.

---

## Cómo ejecutar

```bash
npm run dev
```

Abre `http://localhost:4322`. No requiere instalación de dependencias
(servidor estático de Node sin librerías externas).

**Producción:** son archivos estáticos. Se despliega tal cual en Netlify,
Vercel, Cloudflare Pages o cualquier hosting estático.

---

## Estructura

```
index.html            Landing completa (13 secciones, semántica, SEO, JSON-LD)
assets/css/styles.css Sistema visual "panel de control"
assets/js/main.js     Interacciones + capa de medición (dataLayer)
assets/img/           Favicon (marca de corchetes + punto de señal)
robots.txt · sitemap.xml
server.mjs            Servidor de preview local (0 dependencias)
```

---

## Arquitectura de conversión (resumen)

**Territorio:** *Independencia asistida* — ni agencia (dependencia permanente),
ni curso (aprende todo solo), ni software (una herramienta sin guía). Construimos
y lanzamos contigo; después la IA te ayuda a operar; el control queda en tus manos.

**Página como argumento (V3)**, en este orden: relevancia + sistema visual (hero)
→ un solo sistema (independencia asistida, sin múltiples proveedores) → mecanismo
(cómo funciona) → oferta completa (qué recibes) → demostración del producto
(Copiloto: crear / analizar / optimizar / aprender) → confianza (IA que no
inventa datos) → ritmo semanal → prueba concreta de inversión publicitaria
($600.000, explícitamente desacoplada del precio) → antes/después (contraste
directo dependencia vs. propiedad) → precio ($1.999.000, único, dominante) →
continuidad opcional → calificación (para quién sí/no + quién construye esto) →
objeciones (FAQ) → cierre.

**Precio:** $1.999.000 COP, pago único. El $600.000 COP de inversión publicitaria
inicial nunca aparece en el hero ni junto al precio total — se presenta solo,
explícitamente etiquetado ("inversión publicitaria inicial incluida"), en su
propia sección (`#presupuesto`) y como un ítem más de la lista en `#inversion`.

**CTA primario:** "Quiero implementar CodeCommerce" → WhatsApp con mensaje
prellenado, repetido en los puntos de decisión (hero, sección de presupuesto,
precio, cierre) y fijo en móvil. No hay CTA secundario de conversión — solo el
micro-CTA "Ver qué incluye" (scroll) para el visitante que aún no está listo
para escribir.

**Prueba social:** esta oferta es nueva y todavía no tiene casos de éxito propios.
Por decisión explícita no se inventaron testimonios, cifras de clientes ni
resultados. Se usa únicamente *proof of mechanism*: pantallas reales del
funcionamiento del Copiloto (chat, análisis de video con timecodes, distinción
evidencia/hipótesis). Está señalado en el footer y debe mantenerse así hasta que
existan casos reales — momento en el que se reemplaza con fuente identificada,
nunca se acumula sobre lo demostrativo sin aclararlo.

---

## Dirección artística

- **Idea visual:** la página se presenta como el *panel de control de tu negocio*,
  no como una vitrina publicitaria. Cada pantalla del Copiloto se muestra como una
  pieza de evidencia exhibida (`FIG. 01`, `FIG. 02`…), con marco de corchetes de
  instrumento — el motivo de firma de la página.
- **Color:** papel gris-verdoso (`--paper #F1F2ED`) · tinta (`--ink #14181C`) ·
  verde señal (`--signal #1F8A5B`, "sistema encendido") · arcilla (`--clay #C1502E`,
  calidez puntual / hipótesis) · línea (`--line #D3D4C7`). Deliberadamente evita el
  combo crema+terracota, el negro+neón de "AI startup" y el azul clínico genérico.
- **Tipografía:** Instrument Serif (display, con carácter propio) · Archivo (texto) ·
  Space Mono (precios, timecodes, badges — el "libro contable" de la página).
- **Motivo propio:** paneles con esquinas de corchete + pie de figura mono,
  tratando cada pantalla simulada como evidencia mostrada, no como mockup
  decorativo — coherente con el pilar "no inventamos datos".
- **Motion:** revelado al hacer scroll (respeta `prefers-reduced-motion`), señal
  verde que "viaja" por el diagrama Construimos→Optimizas, conversación del
  Copiloto que se escribe progresivamente en el hero, contador del presupuesto.
  Nada de animación decorativa sin función.
- **Ritmo — editorial × sistema de control:** la página alterna deliberadamente
  entre fondo crema ("mundo editorial": filosofía, problema, ownership, precio
  explicado, copy) y fondo tinta ("mundo producto": Cómo funciona, Copiloto,
  Inversión, cierre) — clase `.section--dark`. No es alternancia mecánica sección
  por sección; son 4 momentos de mayor densidad de producto, separados por calma.
- **Lenguaje visual propio:** etiquetas mono en mayúscula (`CAMPAÑA ACTIVA`,
  `EVIDENCIA`, `HIPÓTESIS`), numeración `01/02/03`, y anotaciones de sistema con
  flecha `↳ revisar / ↳ mantener / ↳ probar variante / ↳ falta información`
  (clase `.annot`) — reutilizadas en el panel de campaña, el análisis de video y
  la sección de confianza, para que el producto se sienta reconocible sin logo.

---

## WhatsApp comercial (configurado — número real)

`assets/js/main.js` centraliza número y mensaje en dos constantes; ningún
componente repite la URL a mano:

```js
const WHATSAPP_NUMBER = "573165264913";
const WHATSAPP_MESSAGE = "Hola, vi el Sistema Comercial Autogestionable de CodeCommerce y quiero conocer cómo podríamos implementarlo en mi negocio.";
```

Todo elemento marcado `[data-wa]` en el HTML recibe automáticamente
`href="https://wa.me/573165264913?text=..."` (mensaje codificado) al cargar la
página. Los 8 CTA comerciales reales lo usan: nav, nav-mobile, hero, sección
$600K, precio, cierre, footer y la barra fija de móvil. Para cambiar el número o
el mensaje en el futuro, se edita **una sola vez** en `main.js`.

## Medición (lista para conectar)

Cada clic en un CTA `[data-wa]` dispara `window.dataLayer.push({ event:
"whatsapp_click", source })`, con `source` diferenciado por origen: `hero`,
`budget`, `pricing`, `final_cta`, `navigation`, `footer`, `sticky_mobile`. El
resto de CTA no comerciales (p. ej. "Ver cómo funciona") disparan `cta_click`.
Los tabs del Copiloto disparan `copilot_tab_view`; las interacciones internas de
la demo (ver abajo) disparan `copilot_demo_interaction`. No hay cuentas de
analytics reales conectadas todavía — no se montó ninguna arquitectura nueva
para esto, solo se documentan los eventos ya emitidos por `dataLayer` para que
conectar **GTM → GA4 / Meta Pixel / conversiones de WhatsApp** sea inmediato.

**Importante (modo Showcase):** el CTA abre WhatsApp directamente — no hay
formulario con backend real. Esto es intencional: es la única vía de conversión
real que este negocio ya usa, y evita simular una integración que no existe.

**CTA internos de la demo vs. CTA comerciales reales:** los botones "Ayúdame a
crearla →" dentro del panel de campaña y del chat del hero son parte de la
*simulación* del Copiloto — al hacer clic, continúan la conversación en el mismo
panel (muestran 3 variantes de hook) y **nunca navegan ni abren WhatsApp** (no
tienen `[data-wa]`). Solo los CTA marcados `[data-wa]` fuera del mockup son CTA
comerciales reales.

---

## Placeholders — reemplazar antes de publicar

| Qué | Dónde | Qué poner |
|---|---|---|
| Correo de contacto | `index.html` → footer | Correo real de CodeCommerce |
| Dominio / canonical / OG url | `index.html` → `<head>` | Dominio real de publicación |
| Teléfono / dirección en JSON-LD | `index.html` → `<script type="application/ld+json">` | Datos reales si se publica con SEO local |
| Favicon | `assets/img/favicon.svg` | Logo real de CodeCommerce si difiere de la marca de corchetes |
| Tiempo de implementación (FAQ) | `index.html` → pregunta "¿Cuánto tarda la implementación?" | Cuando exista un tiempo estándar definido, reemplazar la respuesta actual (que evita inventar una cifra) |

El número de WhatsApp **ya no es un placeholder** — es el número comercial real
(`573165264913`), confirmado en la pasada final de lanzamiento.

Ningún testimonio, cifra de clientes o resultado se inventó. Cuando existan casos
reales, se agregan con proximidad a la afirmación que respaldan (no en una sola
sección genérica de "testimonios"). Ver `VISUAL_ASSETS_TODO.md` para el listado
completo de fotografía/video reales pendientes de producción.

---

Demo de lanzamiento · CodeCommerce
