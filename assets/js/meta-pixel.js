// Meta Pixel de CodeCommerce: infraestructura lista, sin Pixel conectado todavía.
// Este sitio es estático (sin build ni variables de entorno), así que el ID del
// Pixel se configura aquí. Es un identificador público: se puede versionar.
// Con el ID vacío no se carga ningún script ni se envía ningún evento.
(() => {
  "use strict";

  // ↓↓↓ Pegar aquí el Pixel ID de Meta Events Manager (solo números). ↓↓↓
  const META_PIXEL_ID = "";

  // Eventos propios (se envían con trackCustom). El resto son estándar de Meta:
  // PageView, Lead, Contact, Schedule, ViewContent.
  const CUSTOM_EVENTS = ["WhatsAppClick"];

  const enabled = META_PIXEL_ID.trim() !== "";

  if (enabled && !window.fbq) {
    const fbq = function (...args) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    fbq("init", META_PIXEL_ID.trim());
    // Página única: un solo PageView por carga.
    fbq("track", "PageView");
  }

  // Punto único para enviar eventos desde main.js u otros scripts:
  //   window.ccMeta.track("Lead")
  //   window.ccMeta.track("ViewContent", { content_name: "precio" })
  window.ccMeta = {
    enabled,
    track(event, params) {
      if (!enabled || !window.fbq) return;
      const method = CUSTOM_EVENTS.includes(event) ? "trackCustom" : "track";
      if (params) {
        window.fbq(method, event, params);
      } else {
        window.fbq(method, event);
      }
    }
  };
})();
