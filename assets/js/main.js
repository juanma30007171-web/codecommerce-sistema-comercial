// CodeCommerce — Sistema Comercial Autogestionable
// Sin dependencias externas. Capa de medición lista para conectar GTM en producción.

(() => {
  "use strict";

  // ==================== Configuración comercial de WhatsApp ====================
  // Número real de CodeCommerce. Un solo lugar para número + mensaje: todo CTA
  // comercial (marcado con [data-wa] en el HTML) se construye desde aquí, nunca
  // se repite la URL a mano en cada componente.
  const WHATSAPP_NUMBER = "573165264913";
  const WHATSAPP_MESSAGE = "Hola, vi el Sistema Comercial Autogestionable de CodeCommerce y quiero conocer cómo podríamos implementarlo en mi negocio.";
  const buildWhatsAppUrl = () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  // Nombres de origen para el evento whatsapp_click (analytics), por data-cta.
  const WA_SOURCE_MAP = {
    hero: "hero",
    budget: "budget",
    pricing: "pricing",
    final: "final_cta",
    nav: "navigation",
    "nav-mobile": "navigation",
    footer: "footer",
    "sticky-mobile": "sticky_mobile"
  };
  // =================================================================================

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- CTA comerciales reales: enlazan a WhatsApp + trackean whatsapp_click ---------- */
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.setAttribute("href", buildWhatsAppUrl());
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
    el.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      const ctaName = el.getAttribute("data-cta");
      window.dataLayer.push({
        event: "whatsapp_click",
        source: WA_SOURCE_MAP[ctaName] || ctaName || "unknown"
      });
    });
  });

  /* ---------- Resto de CTA con seguimiento (no comerciales: ej. "Ver cómo funciona") ---------- */
  document.querySelectorAll("[data-cta]:not([data-wa])").forEach((el) => {
    el.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_click",
        cta: el.getAttribute("data-cta"),
        intent: el.getAttribute("data-intent") || null
      });
    });
  });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Video comercial: overlay de play propio sobre el poster ---------- */
  const commercialVideo = document.getElementById("commercialVideo");
  const videoPlayBtn = document.getElementById("videoPlayBtn");
  if (commercialVideo && videoPlayBtn) {
    videoPlayBtn.addEventListener("click", () => {
      commercialVideo.setAttribute("controls", "");
      commercialVideo.play();
    });
    commercialVideo.addEventListener("play", () => {
      videoPlayBtn.classList.add("is-hidden");
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Flow diagram: signal travels down; earlier steps mark as done (microvictorias) ---------- */
  const flowSteps = document.querySelectorAll(".flow-step");
  if ("IntersectionObserver" in window && flowSteps.length) {
    const flowStepsArr = Array.from(flowSteps);
    const flowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-active");
          const stepNum = Number(entry.target.getAttribute("data-step"));
          flowStepsArr.forEach((s) => {
            if (Number(s.getAttribute("data-step")) < stepNum) s.classList.add("is-complete");
          });
        });
      },
      { threshold: 0.5 }
    );
    flowStepsArr.forEach((el) => flowObserver.observe(el));
  }

  /* ---------- $600.000 count-up ---------- */
  const budgetCount = document.getElementById("budgetCount");
  if (budgetCount) {
    const target = 600000;
    const formatCOP = (n) => "$" + Math.round(n).toLocaleString("es-CO");
    const animateCount = () => {
      if (prefersReducedMotion) {
        budgetCount.textContent = formatCOP(target);
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        budgetCount.textContent = formatCOP(target * eased);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      const budgetObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.6 }
      );
      budgetObserver.observe(budgetCount);
    } else {
      budgetCount.textContent = formatCOP(target);
    }
  }

  /* ---------- Copilot tabs ---------- */
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      tabButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        const match = panel.id === `panel-${target}`;
        panel.classList.toggle("is-active", match);
        panel.hidden = !match;
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "copilot_tab_view", tab: target });
    });
  });

  /* ---------- Hero chat: scripted conversation ---------- */
  const heroThread = document.getElementById("heroChatThread");
  if (heroThread) {
    const script = [
      { role: "user", text: "Mi campaña lleva una semana. ¿Cómo sé si está funcionando?" },
      { role: "bot", text: "Envíame esta captura de Meta y el anuncio que estás usando." },
      { role: "chip", text: "metricas.png" },
      { role: "chip", text: "anuncio-02.mp4" },
      { role: "bot", text: "Tus costos de impresión siguen estables, pero menos personas están haciendo clic. Antes de cambiar audiencia, probaría una nueva apertura en el anuncio #2." },
      { role: "cta", text: "Ayúdame a crearla →" }
    ];

    const buildMsg = (item) => {
      if (item.role === "chip") {
        const chip = document.createElement("div");
        chip.className = "upload-chip mono";
        chip.innerHTML = `${item.text} <span class="chip-check">✓</span>`;
        chip.style.alignSelf = "flex-end";
        return chip;
      }
      if (item.role === "cta") {
        // Botón interno de la DEMO — nunca navega. Continúa la simulación del
        // Copiloto en el mismo panel. Los CTA comerciales reales están fuera
        // de este mockup (hero, precio, cierre, nav, barra móvil).
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn--primary btn--small hero-chat-cta";
        btn.textContent = item.text;
        btn.addEventListener("click", () => {
          if (btn.disabled) return;
          btn.disabled = true;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: "copilot_demo_interaction", demo: "hero-chat", action: "ayudame-a-crearla" });

          const typing = document.createElement("div");
          typing.className = "msg-typing";
          typing.innerHTML = "<span></span><span></span><span></span>";
          heroThread.appendChild(typing);

          const reveal = () => {
            typing.remove();
            const bot = document.createElement("p");
            bot.className = "msg msg--bot";
            const tag = document.createElement("span");
            tag.className = "msg-tag";
            tag.textContent = "Copiloto";
            bot.appendChild(tag);
            bot.appendChild(document.createTextNode("Vamos a mantener el cuerpo del anuncio y probar tres aperturas nuevas."));
            heroThread.appendChild(bot);

            const hooks = document.createElement("div");
            hooks.className = "hook-options";
            [
              ["Hook A", "¿Tu curso de vigilancia está por vencerse?"],
              ["Hook B", "Si trabajas en seguridad privada, revisa esto antes de renovar tu curso."],
              ["Hook C", "¿Necesitas renovar tu curso de vigilancia este mes?"]
            ].forEach(([label, text]) => {
              const opt = document.createElement("div");
              opt.className = "hook-opt";
              opt.innerHTML = `<span class="hook-opt-label mono">${label}</span><p>"${text}"</p>`;
              hooks.appendChild(opt);
            });
            heroThread.appendChild(hooks);
          };
          if (prefersReducedMotion) reveal();
          else setTimeout(reveal, 650);
        });
        return btn;
      }
      const p = document.createElement("p");
      p.className = item.role === "user" ? "msg msg--user" : "msg msg--bot";
      if (item.role === "bot") {
        const tag = document.createElement("span");
        tag.className = "msg-tag";
        tag.textContent = "Copiloto";
        p.appendChild(tag);
        p.appendChild(document.createTextNode(item.text));
      } else {
        p.textContent = item.text;
      }
      return p;
    };

    if (prefersReducedMotion) {
      script.forEach((item) => heroThread.appendChild(buildMsg(item)));
    } else {
      let played = false;
      const playScript = () => {
        if (played) return;
        played = true;
        let i = 0;
        const next = () => {
          if (i >= script.length) return;
          const item = script[i];
          const delay = item.role === "bot" ? 700 : item.role === "chip" ? 320 : 380;
          if (item.role === "bot") {
            const typing = document.createElement("div");
            typing.className = "msg-typing";
            typing.innerHTML = "<span></span><span></span><span></span>";
            heroThread.appendChild(typing);
            setTimeout(() => {
              typing.remove();
              heroThread.appendChild(buildMsg(item));
              i += 1;
              setTimeout(next, 400);
            }, delay);
          } else {
            heroThread.appendChild(buildMsg(item));
            i += 1;
            setTimeout(next, delay);
          }
        };
        next();
      };

      if ("IntersectionObserver" in window) {
        const heroObserver = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                playScript();
                obs.disconnect();
              }
            });
          },
          { threshold: 0.4 }
        );
        heroObserver.observe(heroThread);
      } else {
        playScript();
      }
    }
  }

  /* ---------- Mobile CTA bar: hide once the final CTA / pricing is on screen ---------- */
  const mobileCtaBar = document.getElementById("mobileCtaBar");
  const priceSection = document.getElementById("inversion");
  const finalSection = document.getElementById("empezar");
  if (mobileCtaBar && "IntersectionObserver" in window && (priceSection || finalSection)) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) mobileCtaBar.classList.add("is-hidden");
        });
      },
      { threshold: 0.3 }
    );
    if (priceSection) barObserver.observe(priceSection);
    if (finalSection) barObserver.observe(finalSection);

    const showObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) mobileCtaBar.classList.remove("is-hidden");
        });
      },
      { threshold: 0 }
    );
    if (priceSection) showObserver.observe(priceSection);
  }

  /* ---------- Panel de campaña: el CTA interno continúa la demo, no navega ---------- */
  const decisionCta = document.getElementById("decisionCta");
  const decisionResult = document.getElementById("decisionResult");
  if (decisionCta && decisionResult) {
    decisionCta.addEventListener("click", () => {
      if (decisionCta.disabled) return;
      decisionCta.disabled = true;
      decisionCta.textContent = "Generando variantes…";
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "copilot_demo_interaction", demo: "campaign-panel", action: "ayudame-a-crearla" });

      const reveal = () => {
        decisionCta.textContent = "Variantes listas ✓";
        decisionResult.hidden = false;
        requestAnimationFrame(() => decisionResult.classList.add("is-visible"));
      };
      if (prefersReducedMotion) reveal();
      else setTimeout(reveal, 550);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
