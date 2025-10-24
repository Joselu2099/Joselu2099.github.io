// script.js — interacciones pequeñas para el portfolio
// Requisitos implementados:
// - scroll suave entre secciones
// - reveal animations al hacer scroll (fade/slide)
// - cambio de estilo del header al hacer scroll

const clickSound = new Audio("sounds/discord.mp3");

// Validación simple y reutilizable de email
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // Regexp ligera: cubre la mayoría de casos razonables sin ser excesivamente estricta
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Snackbar global: crear elemento y helpers para mensajes transitorios
let snackbarEl = document.querySelector('.snackbar');
if (!snackbarEl) {
  if (document.body) {
    snackbarEl = document.createElement('div');
    snackbarEl.className = 'snackbar';
    document.body.appendChild(snackbarEl);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (!snackbarEl) {
        snackbarEl = document.createElement('div');
        snackbarEl.className = 'snackbar';
        document.body.appendChild(snackbarEl);
      }
    });
  }
}
let snackbarTimeout = null;
function showSnackbar(message, { duration = 3200 } = {}) {
  if (!snackbarEl) {
    snackbarEl = document.createElement('div');
    snackbarEl.className = 'snackbar';
    // atributos de accesibilidad
    snackbarEl.setAttribute('role', 'status');
    snackbarEl.setAttribute('aria-live', 'polite');
    if (document.body) document.body.appendChild(snackbarEl); else document.addEventListener('DOMContentLoaded', () => document.body.appendChild(snackbarEl));
  }
  snackbarEl.textContent = message;
  // Asegurar que el elemento está anexado al DOM
  if (!snackbarEl.parentNode && document.body) document.body.appendChild(snackbarEl);

  // Limpiar estado previo
  if (snackbarTimeout) {
    clearTimeout(snackbarTimeout);
    snackbarTimeout = null;
  }

  // Preparar el elemento para la animación: quitar clase y forzar layout
  snackbarEl.classList.remove('show');
  // No usar display:none; dejar que la clase controle opacidad/transform
  snackbarEl.style.opacity = '0';
  snackbarEl.style.transform = 'translateX(-50%) translateY(12px)';

  // Dar un pequeño retraso para que el navegador pinte el elemento y la transición funcione en el primer intento
  setTimeout(() => {
    // limpiar estilos inline para dejar que la clase controle la animación
    snackbarEl.style.opacity = '';
    snackbarEl.style.transform = '';
    snackbarEl.classList.add('show');
  }, 20);

  // Ocultar el snackbar después de duration ms (quitar clase -> transition) y después ocultar display
  snackbarTimeout = setTimeout(() => {
    // remove 'show' to start hide transition
    snackbarEl.classList.remove('show');
    // after transition ends, clear text and inline styles
    const onTransitionEnd = (ev) => {
      if (ev && ev.target !== snackbarEl) return;
      snackbarEl.textContent = '';
      snackbarEl.style.opacity = '';
      snackbarEl.style.transform = '';
      snackbarEl.removeEventListener('transitionend', onTransitionEnd);
    };
    snackbarEl.addEventListener('transitionend', onTransitionEnd);
    // safety: if transitionend doesn't fire, cleanup after an extra timeout
    setTimeout(() => {
      if (snackbarEl.classList.contains('show')) return;
      snackbarEl.textContent = '';
      snackbarEl.style.opacity = '';
      snackbarEl.style.transform = '';
      snackbarEl.removeEventListener('transitionend', onTransitionEnd);
    }, 600);
  }, duration);
}
// Exponer helper global (por si se usa desde inline handlers)
window.showSnackbar = showSnackbar;

// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

  // Añadir sonido de click a botones/enlaces dentro de cualquier contenedor con class="contact-form"
  const contactForms = document.querySelectorAll('.contact-form');
  if (contactForms.length && typeof clickSound !== 'undefined' && clickSound && typeof clickSound.play === 'function') {
    contactForms.forEach(form => {
      form.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('click', (ev) => {
          try {
            // Si el elemento forma parte de un formulario de contacto, validar el email antes de reproducir sonido
            const hostForm = el.closest('.contact-form');
            if (hostForm) {
              const emailInput = hostForm.querySelector('input[type="email"], input[name="email"]');
              const emailVal = emailInput ? (emailInput.value || '').trim() : '';
              if (emailInput && !isValidEmail(emailVal)) {
                // No reproducir sonido y dar una señal visual/accion mínima
                try { emailInput.setAttribute('aria-invalid', 'true'); } catch(e) {}
                // Si el click viene de un botón submit, evitar el envío también
                if (el.tagName && el.tagName.toLowerCase() === 'button' && el.type !== 'button') {
                  ev.preventDefault();
                }
                // Llevar foco al campo inválido
                if (emailInput && typeof emailInput.focus === 'function') emailInput.focus();
                return; // salir sin reproducir audio
              }
              // Si pasa la validación, limpiar posible marcador de error
              if (emailInput) emailInput.removeAttribute('aria-invalid');
            }

            clickSound.currentTime = 0;
            const playPromise = clickSound.play();
            // Manejar navegadores que devuelven una promesa
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => { /* noop si la reproducción es bloqueada */ });
            }
          } catch (err) {
            // noop si el audio no puede reproducirse
          }
        });
      });
    });
  }

  // Setear año en el footer si existe el span#year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Auto-aplicar .reveal a elementos 'clave' si el autor no los marcó manualmente
  const autoRevealSelectors = ['.hero-text', '.card', '.timeline-item', '.skill', '.about-text', '.contact-form'];
  autoRevealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });
  });

  // 1) Smooth scroll para enlaces internos (degradado del script inline anterior)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // 2) Reveal on scroll usando IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    // Stagger: añadiremos una ligera demora basada en el índice dentro del mismo grupo
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Aplica retraso si el elemento tiene data-delay, o usa un valor por defecto
          const baseDelay = parseFloat(entry.target.datasetDelay) || 0;
          const delay = baseDelay + (entry.target.datasetIndex ? parseFloat(entry.target.datasetIndex) * 80 : 0);
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          // Unobserve después de aplicar
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    // Asignar índices por grupo para un pequeño stagger visual
    revealElements.forEach((el, i) => {
      el.datasetIndex = i % 6; // ciclos de 6 para evitar delays muy largos
      revealObserver.observe(el);
    });
  } else {
    // Fallback: mostrar si IntersectionObserver no está disponible
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 3) Manejo del header al hacer scroll: añadir clase cuando se pasa cierto umbral
  const header = document.querySelector('.site-header');
  const headerToggle = () => {
    if (!header) return;
    const scrolled = window.scrollY || window.pageYOffset;
    if (scrolled > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  // Ejecutar en carga y al hacer scroll
  headerToggle();
  window.addEventListener('scroll', throttle(headerToggle, 100));

  // 5) Sombreado lateral para nav-scroll: muestra sombras si hay contenido desbordado
  const navWrap = document.querySelector('.nav-scroll-wrap');
  if (navWrap) {
    const nav = navWrap.querySelector('.nav-scroll');
    const updateNavShadows = () => {
      if (!nav) return;
      const maxScrollLeft = nav.scrollWidth - nav.clientWidth;
      if (nav.scrollLeft > 8) navWrap.classList.add('show-left'); else navWrap.classList.remove('show-left');
      if (nav.scrollLeft < maxScrollLeft - 8) navWrap.classList.add('show-right'); else navWrap.classList.remove('show-right');
    };
    // Inicializar
    updateNavShadows();
    // Eventos
    nav.addEventListener('scroll', throttle(updateNavShadows, 80));
    window.addEventListener('resize', throttle(updateNavShadows, 200));
  }

  // 4) Mantener la funcionalidad del formulario de contacto: handleContact
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Validar email antes de 'enviar'
      const emailInput = contactForm.querySelector('input[type="email"], input[name="email"]');
      const emailVal = emailInput ? (emailInput.value || '').trim() : '';
      if (emailInput && !isValidEmail(emailVal)) {
        showSnackbar('Please enter a valid email address before sending.');
        try { emailInput.setAttribute('aria-invalid', 'true'); } catch(e) {}
        emailInput.focus();
        return;
      }

      const data = new FormData(contactForm);
      // Aquí puedes reemplazar el console.log con envío real a un endpoint
      console.log('Contact:', Object.fromEntries(data.entries()));
      // Simple feedback to the user
      showSnackbar('Thanks — your message was received (mock).');
      contactForm.reset();
    });
  }

  // === Menú de idiomas: toggle, cerrar con Escape o click fuera ===
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');
  const langWrap = document.querySelector('.lang-wrap');
  if (langToggle && langMenu && langWrap) {
    const openMenu = () => {
      langWrap.classList.add('open');
      langToggle.setAttribute('aria-expanded', 'true');
      langMenu.setAttribute('aria-hidden', 'false');
    };
    const closeMenu = () => {
      langWrap.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
      langMenu.setAttribute('aria-hidden', 'true');
    };

    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (langWrap.classList.contains('open')) closeMenu(); else openMenu();
    });

    // Selección de idioma (solo visual por ahora)
    langMenu.querySelectorAll('.lang-item').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const chosen = btn.dataset.lang || 'en';
        // Marcar selección visualmente
        langMenu.querySelectorAll('.lang-item').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        // Actualizar tooltip del botón
        langToggle.title = btn.textContent.trim();
        closeMenu();
        // Nota: implementación real de cambio de idioma se hará más adelante
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && langWrap.classList.contains('open')) closeMenu();
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (ev) => {
      if (!langWrap.contains(ev.target)) closeMenu();
    });
  }

  // === i18n: cargar y aplicar traducciones ===
  // Cargamos desde /i18n.json cuando sea posible; si falla, intentamos el bloque inline #i18n-data como fallback.
  let I18N = {};
  const i18nReady = (async () => {
    try {
      const resp = await fetch('./i18n.json', { cache: 'no-store' });
      if (resp && resp.ok) {
        I18N = await resp.json();
        return;
      }
    } catch (e) {
      // fallthrough to inline fallback
    }
    // Fallback: parse inline script if exists
    try {
      const inline = document.getElementById('i18n-data');
      if (inline) I18N = JSON.parse(inline.textContent);
    } catch (err) {
      console.warn('i18n: could not load translations (external or inline)', err);
    }
  })();

  // Aplica traducciones a los elementos con data-i18n y data-i18n-html
  function applyTranslations(lang) {
    if (!I18N || !I18N[lang]) return;
    const bundle = I18N[lang];
    try {
      const htmlEls = document.querySelectorAll('[data-i18n-html]').length;
      const textEls = document.querySelectorAll('[data-i18n]').length;
      console.debug(`i18n: applying ${htmlEls} html + ${textEls} text translations for`, lang);
    } catch (e) {}
    // data-i18n-html -> innerHTML (use con precaución)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const parts = key.split('.');
      let val = bundle;
      for (const p of parts) {
        if (val && Object.prototype.hasOwnProperty.call(val, p)) val = val[p]; else { val = null; break; }
      }
      if (val !== null && typeof val !== 'object') {
        el.innerHTML = val;
      }
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      // key puede ser 'nav.about' o 'projects.sfoc.title'
      const parts = key.split('.');
      let val = bundle;
      for (const p of parts) {
        if (val && Object.prototype.hasOwnProperty.call(val, p)) val = val[p]; else { val = null; break; }
      }
      if (val !== null && typeof val !== 'object') {
        // sustituir texto o placeholder
        if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Footer special: reemplazar {year}
    if (bundle.footer && bundle.footer.copyright) {
      const yearEl = document.getElementById('year');
      const y = yearEl ? yearEl.textContent || new Date().getFullYear() : new Date().getFullYear();
      document.querySelectorAll('[data-i18n-footer]').forEach(el => {
        el.textContent = bundle.footer.copyright.replace('{year}', y);
      });
    }
  }

  // Cambiar idioma y persistir
  function setLanguage(lang) {
    if (!lang) return;
    const available = Object.keys(I18N || {});
    if (!available.includes(lang)) lang = available[0] || 'en';
    applyTranslations(lang);
    // store current language for runtime use (toggle labels, etc.)
    window.CURRENT_LANG = lang;
    localStorage.setItem('site_lang', lang);
    // actualizar título / tooltip del botón
    if (langToggle) langToggle.title = (I18N[lang] && I18N[lang].nav && I18N[lang].nav.about) ? I18N[lang].nav.about : 'Lang';
    // marcar item seleccionado visualmente
    if (langMenu) {
      langMenu.querySelectorAll('.lang-item').forEach(b => b.classList.remove('selected'));
      const btn = langMenu.querySelector(`[data-lang="${lang}"]`);
      if (btn) btn.classList.add('selected');
    }
  }

  // Inicializar lenguaje desde localStorage o por defecto (en) una vez cargado I18N
  const initialLang = localStorage.getItem('site_lang') || 'en';
  i18nReady.then(() => {
    try { console.debug('i18n: loaded locales ->', Object.keys(I18N || {})); } catch (e) {}
    setLanguage(initialLang);
  });

  // Manejar clicks en el menú de idiomas (ya había lógica de selección; la consolidamos)
  if (langMenu) {
    langMenu.querySelectorAll('.lang-item').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const chosen = btn.dataset.lang || 'en';
        setLanguage(chosen);
      });
    });
  }

  // Botón mobile language
  const langToggleMobile = document.getElementById('langToggleMobile');
  if (langToggleMobile) {
    langToggleMobile.addEventListener('click', (e) => {
      // abrir el menú desktop si está disponible, else cycle languages
      if (langWrap) {
        // abrir menú para elegir
        langWrap.classList.add('open');
        langMenu.setAttribute('aria-hidden', 'false');
      } else {
        // fallback: ciclar idiomas
        const keys = Object.keys(I18N || {});
        const current = localStorage.getItem('site_lang') || 'en';
        const idx = keys.indexOf(current);
        const next = keys[(idx + 1) % keys.length];
        setLanguage(next);
      }
    });
  }

  // === Mobile menu (hamburger) ===
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    const openMobile = () => {
      mobileMenu.classList.add('open');
      // Marcar estado global en body para CSS (ocultar nav-scroll, etc.)
      document.body.classList.add('menu-open');
      navToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      // Cerrar cualquier menú abierto (p.ej. lang menu) para evitar solapamientos
      if (langWrap && langWrap.classList.contains('open')) {
        langWrap.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
        if (langMenu) langMenu.setAttribute('aria-hidden', 'true');
      }
    };
    const closeMobile = () => {
      mobileMenu.classList.remove('open');
      // quitar marcador global
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileMenu.classList.contains('open')) closeMobile(); else openMobile();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobile();
    });

    // Cerrar al click fuera
    document.addEventListener('click', (ev) => {
      if (!mobileMenu.contains(ev.target) && ev.target !== navToggle) closeMobile();
    });

    // Cerrar al elegir un enlace dentro del mobile menu
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => closeMobile());
    });
  }
});

// Extra interactivity: hide short vision summary when details is open, and toggle project description summary text
document.addEventListener('DOMContentLoaded', () => {
  // 1) Vision details: hide preceding .muted paragraph when opened
  const visionDetails = document.querySelector('.vision-details');
  if (visionDetails) {
    const shortSummary = visionDetails.previousElementSibling && visionDetails.previousElementSibling.classList && visionDetails.previousElementSibling.classList.contains('muted') ? visionDetails.previousElementSibling : null;
    const syncVision = () => {
      if (!shortSummary) return;
      if (visionDetails.open) shortSummary.style.display = 'none'; else shortSummary.style.display = '';
    };
    // Initial sync
    syncVision();
    visionDetails.addEventListener('toggle', syncVision);
  }

  // 2) Project descriptions: change summary text to reflect open state
  document.querySelectorAll('.project-desc').forEach(detailsEl => {
    const summary = detailsEl.querySelector('summary');
    if (!summary) return;
    // Prefer updating a visually-hidden label inside the summary and aria-expanded
    const hiddenLabel = summary.querySelector('.visually-hidden');
    const updateSummary = () => {
      const isOpen = !!detailsEl.open;
      // keep aria-expanded in sync
      try { summary.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); } catch (e) {}

      // Accordion behaviour: when one opens, close siblings
      if (isOpen) {
        document.querySelectorAll('.project-desc').forEach(other => {
          if (other !== detailsEl && other.open) other.open = false;
        });
      }
      // Update visually-hidden label text if available
      try {
        const lang = window.CURRENT_LANG || (localStorage.getItem('site_lang') || 'en');
        const bundle = I18N && I18N[lang] ? I18N[lang] : null;
        if (hiddenLabel && bundle && bundle.projects && bundle.projects.toggle) {
          hiddenLabel.textContent = isOpen ? bundle.projects.toggle.hide : bundle.projects.toggle.show;
        }
      } catch (e) {
        // noop
      }
    };

    // initialize state
    updateSummary();
    detailsEl.addEventListener('toggle', updateSummary);
  });
});

// Helper: throttle simple para limitar frecuencia de eventos
function throttle(fn, wait) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// Exportar handleContact por compatibilidad si algún inline llama a ella
// (index.html antes tenía handleContact global). Dejamos una referencia segura.
window.handleContact = function(e) {
  // Si se llama desde inline, el evento ya es prevenido arriba en el listener añadido
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  const form = e && e.currentTarget ? e.currentTarget : document.querySelector('.contact-form');
  if (!form) return;
  const data = new FormData(form);
  console.log('Contact:', Object.fromEntries(data.entries()));
  if (typeof showSnackbar === 'function') showSnackbar('Thanks — your message was received (mock).'); else alert('Thanks — your message was received (mock).');
  form.reset();
};