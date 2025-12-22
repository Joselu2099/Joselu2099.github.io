/* boda.js — lógica mínima sin dependencias */

const CONFIG = {
  coupleName: 'Jose Luis & Sarita',
  weddingDate: 'Sábado 18 de abril · 12:00h',
  locationText: 'El Casón de la Vega, Santomera, Murcia.',
  mapsUrl: 'https://maps.google.com/?q=El+Cason+de+la+Vega+Santomera+Murcia',
  iban: 'ES03 1583 0001 1091 2475 6174',
  titular: 'S C Gutiérrez & J S Carrasco',
  concepto: 'Boda Jose Luis y Sarita 18/04',
  btc: '',
  eth: ''
};

function applyConfig() {
  const nameEl = document.getElementById('couple-name');
  const dateEl = document.getElementById('wedding-date');
  const locEl = document.getElementById('location-text');
  const mapsBtn = document.getElementById('maps-link');
  const ibanEl = document.getElementById('iban-value');
  const holderEl = document.getElementById('iban-holder');
  const conceptoEl = document.getElementById('concepto-value');
  const btcEl = document.getElementById('btc-value');
  const ethEl = document.getElementById('eth-value');

  if (nameEl) nameEl.textContent = CONFIG.coupleName;
  if (dateEl) dateEl.textContent = CONFIG.weddingDate;
  if (locEl) locEl.textContent = CONFIG.locationText;
  if (mapsBtn) mapsBtn.dataset.url = CONFIG.mapsUrl;
  if (holderEl) holderEl.textContent = CONFIG.titular;
  if (ibanEl) ibanEl.textContent = CONFIG.iban;
  if (conceptoEl) conceptoEl.textContent = CONFIG.concepto;
  if (btcEl) btcEl.textContent = CONFIG.btc;
  if (ethEl) ethEl.textContent = CONFIG.eth;

  const btcUri = document.getElementById('btc-uri');
  const ethUri = document.getElementById('eth-uri');
  if (btcUri) btcUri.href = `bitcoin:${CONFIG.btc}`;
  if (ethUri) ethUri.href = `ethereum:${CONFIG.eth}`;
}

function showMethod(targetId) {
  const buttons = document.querySelectorAll('.gift-switch__btn');
  const panels = document.querySelectorAll('.gift-panel');

  buttons.forEach((btn) => {
    const isActive = btn.dataset.target === targetId;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === targetId;
    panel.classList.toggle('is-active', isTarget);
    panel.hidden = !isTarget;
  });
}

function copyToClipboard(text) {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(showToast).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showToast();
}

function showToast(message = 'Copiado') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1600);
}

function openMaps(url) {
  if (!url) return;
  window.open(url, '_blank', 'noopener');
}

function init() {
  applyConfig();

  const switchButtons = document.querySelectorAll('.gift-switch__btn');
  switchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) showMethod(target);
    });
  });

  // Estado inicial
  showMethod('panel-transferencia');

  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.copyValue;
      copyToClipboard(value);
    });
  });

  const mapsBtn = document.getElementById('maps-link');
  if (mapsBtn) {
    mapsBtn.addEventListener('click', () => openMaps(mapsBtn.dataset.url));
  }

  // Enlaces de wallet dinámicos (por si se reconfiguran)
  const btcUri = document.getElementById('btc-uri');
  const ethUri = document.getElementById('eth-uri');
  if (btcUri) btcUri.href = `bitcoin:${CONFIG.btc}`;
  if (ethUri) ethUri.href = `ethereum:${CONFIG.eth}`;
}

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initScrollObserver();
});

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
        });
    });
}

window.copyToClipboard = function(text) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast()).catch(err => console.error(err));
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = text; textArea.style.position = "fixed"; document.body.appendChild(textArea);
        textArea.focus(); textArea.select();
        try { document.execCommand('copy'); showToast(); } catch (err) { console.error(err); }
        document.body.removeChild(textArea);
    }
};

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

function initScrollObserver() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', init);