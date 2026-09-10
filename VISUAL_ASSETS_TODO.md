# Visual Assets — pendientes de producción real

Todo lo que hoy se ve en la landing (chat del Copiloto, panel de campaña, análisis de video,
diagrama de funnel, mockups) está construido con HTML/CSS/SVG — **proof of mechanism simulado**,
cero peso de imagen o video real. Es intencional: nada se carga hoy que no podamos respaldar, y
el rendimiento se mantiene liviano mientras no existan assets reales. No se usó fotografía ni
video generado por IA como evidencia en ningún punto de la página.

Cuando CodeCommerce tenga clientes reales de esta oferta, estos son los assets que reemplazan a
las simulaciones actuales.

---

### ASSET 01 — Hero Copilot Loop
**Función:** primer momento de la página; debe demostrar el producto en movimiento sin depender de texto.
**Tipo:** screen recording o motion graphic del Copiloto real (no actores, no locución).
**Formato:** `video/webm` + `video/mp4`, poster en WebP, `preload="none"`.
**Duración:** 6–10s, loop.
**Contenido:** subir una captura, subir un video, el Copiloto responde, aparece una recomendación.
**Dónde:** `#hero` → `.hero-demo` (hoy: panel de campaña + chat simulados en CSS/JS).
**Prioridad:** alta.

---

### ASSET 02 — Creative analysis (demo)
**Función:** mostrar el análisis de un anuncio real, con timecodes reales.
**Tipo:** `video/mp4` demo, 12–15s, el mismo anuncio que se analiza en el texto.
**Formato:** menor a 2MB comprimido, poster estático, sin autoplay pesado.
**Contenido:** un anuncio real de cliente con los timecodes del análisis ajustados al video real.
**Dónde:** `#copiloto` → tab "Analizar" y el panel de campaña (`.campaign-video`, hoy un
placeholder CSS con ícono de play y barras decorativas).
**Prioridad:** alta — es el diferenciador más protagonista de la página.

---

### ASSET 03 — Foto real: sesión de grabación
**Función:** mostrar el "detrás de cámaras" de una de las 5 sesiones de grabación incluidas.
**Tipo:** fotografía real, no stock.
**Formato:** `image/webp`, mínimo 1600×1200px, orientación horizontal.
**Contenido:** equipo de CodeCommerce grabando un creativo — nunca actores posando, nunca "brazos cruzados".
**Dónde:** candidato para `#que-recibes` (tarjeta "5 anuncios listos"). No hay foto de equipo en
la página — la sección "Quién construye esto" es deliberadamente editorial (tres disciplinas del
servicio), sin fotografía ni placeholder de equipo.
**Prioridad:** media.

---

### ASSET 04 — Foto real: Ads Manager / trabajo de campaña
**Función:** reforzar que las métricas mostradas vienen de un flujo de trabajo real.
**Tipo:** fotografía o captura real (recortada/anonimizada si no hay autorización de marca).
**Formato:** `image/webp`, 1200×900px mínimo.
**Contenido:** computador con Meta Ads Manager abierto, o una revisión de campaña en curso.
**Dónde:** sin sección asignada todavía — evaluar si aporta antes de darle un lugar en la página.
**Prioridad:** baja.

---

### ASSET 05 — WhatsApp / lead handoff
**Función:** mostrar el momento real en que la automatización entrega una conversación al humano.
**Tipo:** captura real de WhatsApp Business (anonimizada), o fotografía de un teléfono en uso.
**Formato:** `image/webp`.
**Contenido:** una conversación real donde se ve el traspaso "bot → humano".
**Dónde:** candidato para `#que-recibes` (tarjeta "WhatsApp automatizado").
**Prioridad:** media.

---

## Reglas al reemplazar

- Nunca reemplazar una simulación con un dato que no sea real. Si no hay caso real todavía, la
  simulación se queda tal como está (ya etiquetada como demostración del mecanismo en el footer).
- Todo asset de cliente real requiere autorización antes de publicarse.
- Mantener el tratamiento visual existente (paneles con corchetes de instrumento, pie de figura
  `FIG. XX`) para que el reemplazo no rompa el sistema visual.
- Video siempre con poster + `preload="none"`, nunca autoplay de un archivo pesado en el hero.
- Ninguna fotografía de banco de imágenes ni generada por IA se usa como evidencia (brazos
  cruzados, gráficos ficticios en pantalla, empresarios genéricos) — si falta el asset real, el
  placeholder actual (CSS/ícono, claramente marcado) se queda hasta tener la foto real.

No se detiene la implementación esperando estos assets — la página funciona completa sin ellos.
