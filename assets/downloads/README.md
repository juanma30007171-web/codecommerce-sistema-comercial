# Descargables (lead magnets)

Aquí van los archivos que se entregan a quien completa un formulario.

## Guía maestra para empezar a trabajar con Inteligencia Artificial

- **Archivo esperado:** `guia-maestra-ia-codecommerce.pdf` (aún no existe; no crear un PDF vacío).
- **URL pública:** `/assets/downloads/guia-maestra-ia-codecommerce.pdf`
- **Referenciado en:** `index.html` → `<form id="leadGuideForm" data-guide-url="...">` (sección `#guia-ia`).
- **Lógica:** `assets/js/main.js` → bloque "Guía IA". Mientras `LEAD_GUIDE_ENDPOINT` esté vacío, el formulario
  no envía ni guarda datos y muestra el estado "en preparación" con salida a WhatsApp.

Para activarlo: subir el PDF con ese nombre exacto, conectar el backend en `LEAD_GUIDE_ENDPOINT` y, tras un envío
exitoso, mostrar `#leadGuideSuccess` con `#leadGuideDownload` apuntando a `data-guide-url`.
Recomendado: PDF optimizado para web (idealmente < 5 MB).
