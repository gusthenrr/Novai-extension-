// --- Locale pt-BR para ApexCharts ---
var localePTBR = [{
  name: 'pt-BR',
  options: {
    months: [
      'janeiro','fevereiro','março','abril','maio','junho',
      'julho','agosto','setembro','outubro','novembro','dezembro'
    ],
    shortMonths: [
      'jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'
    ],
    days: [
      'domingo','segunda-feira','terça-feira','quarta-feira',
      'quinta-feira','sexta-feira','sábado'
    ],
    shortDays: ['dom','seg','ter','qua','qui','sex','sáb'],
    toolbar: {
      download: 'Baixar',
      selection: 'Selecionar',
      selectionZoom: 'Zoom por seleção',
      zoomIn: 'Aproximar',
      zoomOut: 'Afastar',
      pan: 'Arrastar',
      reset: 'Redefinir zoom'
    }
  }
}];

// (Opcional) fallback defensivo se alguém renomear por engano
if (typeof localePTBR === 'undefined' || !Array.isArray(localePTBR)) {
  var localePTBR = [];
}
var novaiContorn = "https://nvai-proxy-production.up.railway.app/"
var novaiContorn2 = "https://novai-cors-production.up.railway.app/";
// Derive the extension base URL from the current script tag (reliable in page context)
var extensionBaseUrl = (function(){
  try {
    const src = document.currentScript && document.currentScript.src;
    if (!src) return '';
    // Build a base like chrome-extension://<id>/src/
    return new URL('src/', src).href;
  } catch (_) { return ''; }
})();
// Compute the extension root URL (without the trailing 'src/') for legacy template usage
var extensionRootUrl = (function(){
  if (!extensionBaseUrl) return '';
  try {
    return extensionBaseUrl.endsWith('src/') ? extensionBaseUrl.slice(0, -4) : extensionBaseUrl;
  } catch(_) { return ''; }
})();
// Legacy variable expected by some templates: `${extensionPath}src/...`
var extensionPath = extensionRootUrl;
// Mercado Livre fixed fee for items below the minimum price threshold (MLB)
// Try to read a persisted value, otherwise fallback to a sensible default (BRL 5.00)
var meliCurrentFee = (function(){
  try {
    const v = localStorage.getItem('meliCurrentFee');
    if (v !== null && !isNaN(parseFloat(v))) return parseFloat(v);
  } catch (_) {}
  return 5; // default fixed fee in BRL
})();

// ---- Consolidated global initializations (preloaded state, flags, ids, headers) ----
var globalLogs = Array.isArray(typeof globalLogs !== 'undefined' ? globalLogs : undefined) ? globalLogs : [];
var eaOnAdminPanel = typeof eaOnAdminPanel !== 'undefined' ? eaOnAdminPanel : false;
var listView = typeof listView !== 'undefined' ? listView : undefined;
var mfy_version = typeof mfy_version !== 'undefined' ? mfy_version : null;
var trackDataParsed = (typeof trackDataParsed === 'object' && trackDataParsed) ? trackDataParsed : {};
var dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : (window.dataLayer = []);
var melidata_namespace = window.melidata_namespace || {};
// Try to get embedded __PRELOADED_STATE__ script content safely
var altPreloadedState = (function(){
  try {
    const scripts = Array.from(document.getElementsByTagName('script')).filter(e => e.id === '__PRELOADED_STATE__');
    if (scripts.length > 0) {
      return JSON.parse(scripts[0].innerHTML);
    }
  } catch(_) {}
  return {};
})();
// Prefer window.__PRELOADED_STATE__, fallback to altPreloadedState.pageState
var preLoadedState = (function(){
  const wps = window.__PRELOADED_STATE__;
  if (wps && typeof wps === 'object' && !wps.tagName) return wps;
  if (altPreloadedState && typeof altPreloadedState === 'object') return altPreloadedState.pageState || altPreloadedState;
  return undefined;
})();
var rawID = typeof rawID !== 'undefined' ? rawID : undefined;
var userId = typeof userId !== 'undefined' ? userId : null;
var uid = typeof uid !== 'undefined' ? uid : null;
// Ensure a numeric default for fixed fee if not set elsewhere
meliCurrentFee = (typeof meliCurrentFee === 'number' && !isNaN(meliCurrentFee)) ? meliCurrentFee : 6.5;
var catalogRemoteLookupData = Array.isArray(typeof catalogRemoteLookupData !== 'undefined' ? catalogRemoteLookupData : undefined) ? catalogRemoteLookupData : [];
var eaAPIHeaders = (function(){ try { const h = new Headers(); h.append('X-Api-Key','Ps-RXiTdFgN62dmQhZ9bsoHMCEyT2!ypg!ov%7MEFR#jP3mtZWbDoSvEdctMgF6a'); return h; } catch(_) { return null; } })();

function removeDuplicateElementsById(id) {
  try {
    const nodes = document.querySelectorAll(`[id="${id}"]`);
    nodes.forEach((node, index) => {
      if (index > 0) {
        node.remove();
      }
    });
  } catch (_) {}
}

const cssEscape = (typeof CSS !== 'undefined' && typeof CSS.escape === 'function')
  ? CSS.escape
  : (value) => String(value).replace(/[^a-zA-Z0-9_\-]/g, match => `\\${match}`);

const NOVAI_SKELETON_GRADIENT = "linear-gradient(90deg, rgba(255,245,177,0.7) 25%, rgba(255,224,102,0.95) 50%, rgba(255,245,177,0.7) 75%)";

const NOVAI_INJECTED_ELEMENT_IDS = [
  "eaadvsearchBtn",
  "eaadvsearchForm",
  "eaadvsearchResult",
  "eabar_adsrate",
  "eabar_catalograte",
  "eabar_category",
  "eabar_competition",
  "eabar_fullrate",
  "eabtn-chart",
  "eacattrends",
  "eacattrendsbtn",
  "eachart",
  "eaclosetrendsbox",
  "eacopytrends",
  "eadivider",
  "eafollow_ad",
  "eagrossrev",
  "eahealthmeter",
  "ealistrequest",
  "eamediapop",
  "eameterRate",
  "eameter_modal",
  "eameter_tips",
  "eametersvg",
  "eamoretools",
  "eanotify",
  "eaoffSwitch",
  "eareset",
  "easellerbtn",
  "easortselect",
  "eatoolbox",
  "eatoolsicon",
  "eatrendsbox",
  "main-component-skeleton",
  "mfy-admarker",
  "mfy-modal-content",
  "mfy-modal-overlay",
  "mfy-modal-portal",
  "mfy-smetrics-status",
  "mfy-tool-modal",
  "mfy-track-chart",
  "preco-btn",
  "preco-ativar",
  "preco-img",
  "price-tool",
  "pricetool_content",
  "pricetool_header",
  "pricetool_loading",
  "salesestimatebtn",
  "salesfix",
  "visits-component"
];

var qtySold_normalized = 0;
var qtySold_catalog = 0;
var qtySold_period = { '1d': 0, '7d': 0, '30d': 0, '60d': 0, '90d': 0, total: 0 };
var avgMonthlySalesCount = 0;

const NOVAI_SALES_STATE = {
  qty: {
    normalizedSoldTotal: qtySold_normalized,
    catalogSoldTotal: qtySold_catalog,
    period: { ...qtySold_period }
  },
  averages: {
    monthlySalesCount: avgMonthlySalesCount
  },
  prices: {
    listing: 0,
    catalog: 0,
    local: 0
  }
};

function ensureFiniteNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function coerceNonNegativeInteger(value, fallback = 0) {
  const numeric = ensureFiniteNumber(value, fallback);
  const bounded = Math.max(0, Math.floor(numeric));
  return Number.isFinite(bounded) ? bounded : Math.max(0, Math.floor(fallback));
}

function getNormalizedSoldQtyFromPDP() {
  const subtitleEl = document.querySelector('.ui-pdp-subtitle') || document.querySelector('.ui-pdp-header__subtitle');
  let normalizedQty = 0;

  if (subtitleEl) {
    const subtitleText = subtitleEl.innerText || subtitleEl.textContent || '';
    if (subtitleText && typeof parseSalesText === 'function') {
      try {
        const parsed = parseSalesText(subtitleText);
        if (parsed && Number.isFinite(parsed.thisItemSales)) {
          normalizedQty = parsed.thisItemSales;
        }
      } catch (_) {}
    }
  }

  const fallbacks = [
    () => subtitleEl ? Number(subtitleEl.getAttribute('sales')) : NaN,
    () => Number(vendas),
    () => {
      try {
        const body = ensureCatalogBody?.();
        return Number(body?.sold_quantity);
      } catch (_) {
        return NaN;
      }
    }
  ];

  for (const reader of fallbacks) {
    const candidate = Number(reader());
    if (Number.isFinite(candidate) && candidate > normalizedQty) {
      normalizedQty = candidate;
    }
  }

  return coerceNonNegativeInteger(normalizedQty, 0);
}

function computeCatalogRevenue(qtySoldCatalog, priceCatalog) {
  const qty = coerceNonNegativeInteger(qtySoldCatalog, 0);
  const price = ensureFiniteNumber(priceCatalog, 0);
  const revenue = qty * price;
  return Number.isFinite(revenue) ? revenue : 0;
}

function computeListingPeriodRevenue(periodMap, priceListing, windowKey) {
  if (!periodMap || 'object' != typeof periodMap) return 0;
  const qty = ensureFiniteNumber(windowKey ? periodMap[windowKey] : 0, 0);
  const price = ensureFiniteNumber(priceListing, 0);
  const revenue = qty * price;
  return Number.isFinite(revenue) ? revenue : 0;
}

function computeAvgMonthlyRevenue(monthlySalesCount, price) {
  const monthlyQty = ensureFiniteNumber(monthlySalesCount, 0);
  const priceValue = ensureFiniteNumber(price, 0);
  const revenue = monthlyQty * priceValue;
  return Number.isFinite(revenue) ? revenue : 0;
}

function removeNovaiInjectedNodes(contextLabel = "manual-cleanup") {
  try {
    let removed = 0;
    for (const id of NOVAI_INJECTED_ELEMENT_IDS) {
      const nodes = document.querySelectorAll(`#${cssEscape(id)}`);
      if (!nodes.length) continue;
      nodes.forEach(node => node.remove());
      removed += nodes.length;
    }
    if (removed > 0) {
      console.log(`[NOVAI] Limpeza (${contextLabel}): ${removed} elementos reiniciados.`);
    }
  } catch (cleanupError) {
    console.warn("[NOVAI] Falha ao remover elementos injetados:", cleanupError);
  }
}

function ensureMainComponentSkeleton(container) {
  if (!container) return;
  removeDuplicateElementsById("main-component-skeleton");
  if (!container.querySelector("#main-component-skeleton")) {
    container.insertAdjacentHTML("afterbegin", buildMainComponentSkeleton());
  }
}

function ensureVisitsComponentSkeleton(container) {
  if (!container) return;
  removeDuplicateElementsById("visits-component");
  if (container.querySelector("#visits-component")) return;

  const revenueCard = container.querySelector("#eagrossrev");
  if (revenueCard && typeof revenueCard.insertAdjacentHTML === "function") {
    revenueCard.insertAdjacentHTML("afterend", buildVisitsComponentSkeleton());
    return;
  }

  container.insertAdjacentHTML("afterbegin", buildVisitsComponentSkeleton());
}

const NOVAI_SINCE_WRAPPER_ID = "novai-since-wrapper";
const NOVAI_MEDIA_WRAPPER_ID = "novai-media-wrapper";
const NOVAI_MEDIA_ALERT_ID = "novai-media-alert";
const NOVAI_MEDIA_TOOLTIP_ID = "novai-media-tooltip";
const NOVAI_MEDIA_INFO_ATTR = "data-novai-media-info";
const NOVAI_CREATED_DAYS_ATTR = "data-novai-created-days";
const NOVAI_CREATED_DATE_ATTR = "data-novai-created-date";
const NOVAI_MEDIA_VALUE_ATTR = "data-novai-media-value";
const NOVAI_MEDIA_POPUP_ID = "eamediapop";

let novaiSinceRetryHandle = null;
const NOVAI_SINCE_RETRY_DELAY_MS = 500;
let lastSinceAndMediaOptions = null;

function cancelSinceAndMediaRetry() {
  if (novaiSinceRetryHandle) {
    clearTimeout(novaiSinceRetryHandle);
    novaiSinceRetryHandle = null;
  }
}

function scheduleSinceAndMediaRetry(reason = "missing-anchor") {
  if (novaiSinceRetryHandle) return;
  try {
    if ("anuncio" !== paginaAtual) return;
  } catch (_) {
    return;
  }
  try {
    console.debug(`[NOVAI] Reagendando cartão 'Criado há' (${reason}).`);
  } catch (_) {}
  novaiSinceRetryHandle = setTimeout(() => {
    novaiSinceRetryHandle = null;
    try {
      retrySinceOnly();
    } catch (err) {
      try {
        console.error("[NOVAI] Falha ao reinjetar cartão 'Criado há':", err);
      } catch (_) {}
    }
  }, NOVAI_SINCE_RETRY_DELAY_MS);
}

function retrySinceOnly() {
  try {
    if ("anuncio" !== paginaAtual) return;
  } catch (_) {
    return;
  }
  try {
    if (typeof verif !== "undefined" && verif !== "pro") {
      removeSinceAndMediaContainer();
      return;
    }
  } catch (_) {}

  const headerNode = document.getElementsByClassName("ui-pdp-header")[0];
  if (!headerNode) {
    scheduleSinceAndMediaRetry("missing-header-node");
    return;
  }

  const titleNode = document.getElementsByClassName("ui-pdp-title")[0];
  if (!titleNode) {
    scheduleSinceAndMediaRetry("missing-title-node");
    return;
  }

  const wrapper = ensureSinceAndMediaContainer(titleNode);
  if (!wrapper) {
    scheduleSinceAndMediaRetry("wrapper-not-ready");
  }
}

function buildSinceMarkup() {
  return `
<div id="${NOVAI_SINCE_WRAPPER_ID}" style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;">
  <style>
    /* Grid compacto: 2 colunas (● | texto), 2 linhas (linha 1 = "Criado há", linha 2 = data) */
    #easince.nv-since{
      display:grid !important;                  /* evita gap de baseline do inline-grid */
      grid-template-columns:8px auto;
      grid-template-rows:min-content min-content;
      column-gap:8px; row-gap:0;
      align-items:center;
      line-height:1;                            /* elimina “linha fantasma” embaixo */
      vertical-align:middle;
    }
    /* ● sempre ao lado do "Criado há" (só na linha 1) */
    #easince .since-dot{
      grid-column:1; grid-row:1;
      width:8px; height:8px; border-radius:50%;
      background:var(--novai-ml-yellow,#ffe600);
      align-self:center;
    }
    /* Linha 1: "Criado há X dias" não quebra e fica encorpada */
    #easince .since-line{
      grid-column:2; grid-row:1;
      white-space:nowrap; word-break:keep-all;
      line-height:1;
    }
    #easince .since-line .since-text{ opacity:.95; font-size:.95rem; }   /* maior */
    #easince .since-line .since-days{ font-weight:900; font-size:1rem; } /* um tico maior */

    /* Linha 2: data – aparece no hover, sem reservar espaço quando oculta */
    #easince .novai-since-date{
      grid-column:2; grid-row:2;
      display:block; text-align:left;
      color:#fff !important;
      line-height:1;
      opacity:0; max-height:0; overflow:hidden;
      margin-top:0;                             /* rente ao de cima */
      transition:opacity .18s ease, max-height .18s ease;
    }
    #easince:hover .novai-since-date,
    #easince.is-open .novai-since-date{
      opacity:.98; max-height:18px;             /* expande só o necessário */
    }
  </style>

  <div id="easince"
       class="nv-since"
       style="
         background:#1f1f1f;color:#fff;
         border-radius:12px;                     /* quina mais “card” e limpa */
         padding:4px 12px;                       /* encostado no conteúdo */
         font-weight:800;font-size:.92rem;       /* letras maiores */
         box-shadow:0 6px 12px rgba(0,0,0,.12);
         cursor:default;
       ">
    <span class="since-dot" aria-hidden="true"></span>

    <span class="since-line">
      <span class="since-text">Criado há</span>
      <span ${NOVAI_CREATED_DAYS_ATTR} class="since-days">?</span>
      <span class="since-text">dias</span>
    </span>

    <span ${NOVAI_CREATED_DATE_ATTR} class="novai-since-date">(--/--/----)</span>
  </div>
</div>`;
}



function buildMediaMarkup() {
  return `
    <div id="${NOVAI_MEDIA_WRAPPER_ID}"
         style="margin-top:8px;width:100%;
                display:flex;justify-content:center;align-items:center;
                gap:.5rem;flex-wrap:wrap;text-align:center;">
      <div id="mediabtn"
           style="display:inline-flex;align-items:center;gap:.45rem;
                  background:var(--novai-ml-yellow,#ffe600);color:#111;
                  border-radius:999px;padding:.35rem .9rem;
                  font-weight:900;font-size:.95rem;
                  box-shadow:var(--novai-shadow,0 10px 24px rgba(0,0,0,.22));">
        <span style="font-size:.75rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;opacity:.8;">Média:</span>
        <span ${NOVAI_MEDIA_VALUE_ATTR} style="font-size:1rem;min-width:fit-content;">-</span>
        <span style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;">vendas/mês</span>
      </div>

      <!-- Mantém o atributo para compatibilidade; sem ícone/alerta -->
      <span ${NOVAI_MEDIA_INFO_ATTR} style="display:none;"></span>
    </div>
  `;
}



function ensureMediaWrapperInsideVisitsCard() {
  const visitsValueRow = document.querySelector("#visits-left .novai-kpi-value");
  if (!visitsValueRow) return null;

  let mediaWrapper = document.getElementById(NOVAI_MEDIA_WRAPPER_ID);
  if (!mediaWrapper) {
    visitsValueRow.insertAdjacentHTML("afterend", buildMediaMarkup());
    mediaWrapper = document.getElementById(NOVAI_MEDIA_WRAPPER_ID);
  } else {
    visitsValueRow.insertAdjacentElement("afterend", mediaWrapper);
  }

  return mediaWrapper;
}

function ensureSinceAndMediaContainer(anchorElement) {
  if (!anchorElement) return null;

  let sinceWrapper = document.getElementById(NOVAI_SINCE_WRAPPER_ID);
  if (!sinceWrapper) {
    const subtitleNode = document.querySelector(".ui-pdp-header__subtitle");
    if (subtitleNode && subtitleNode.parentElement) {
      subtitleNode.insertAdjacentHTML("beforebegin", buildSinceMarkup());
    } else {
      anchorElement.insertAdjacentHTML("beforebegin", buildSinceMarkup());
    }
    sinceWrapper = document.getElementById(NOVAI_SINCE_WRAPPER_ID);
  }

  const mediaWrapper = ensureMediaWrapperInsideVisitsCard();

  const missingSince = !sinceWrapper;
  const missingMedia = !mediaWrapper;

  if (missingSince) {
    scheduleSinceAndMediaRetry("since-wrapper-missing");
  }
  if (missingMedia) {
    scheduleSinceAndMediaRetry("visits-card-not-ready");
  }

  if (missingSince && missingMedia) return null;

  if (!missingSince && !missingMedia) {
    cancelSinceAndMediaRetry();
    if (lastSinceAndMediaOptions) {
      requestAnimationFrame(() => {
        try {
          updateSinceAndMediaUI(lastSinceAndMediaOptions);
        } catch (err) {
          try {
            console.warn("[NOVAI] Falha ao atualizar UI de média após injeção:", err);
          } catch (_) {}
        }
      });
    }
  }

  const sinceNode = sinceWrapper ? sinceWrapper.querySelector("#easince") : null;
if (sinceNode && !sinceNode.dataset.novaiHoverBound) {
  sinceNode.dataset.novaiHoverBound = "1";
  sinceNode.addEventListener("mouseenter", () => {
    sinceNode.classList.add("is-open");     // só classe, nada de padding
  }, { passive: true });
  sinceNode.addEventListener("mouseleave", () => {
    sinceNode.classList.remove("is-open");
  }, { passive: true });
}

  const mediaInfoWrapper = mediaWrapper ? mediaWrapper.querySelector(`[${NOVAI_MEDIA_INFO_ATTR}]`) : null;
  const tooltip = mediaWrapper ? mediaWrapper.querySelector(`#${NOVAI_MEDIA_TOOLTIP_ID}`) : null;
  if (mediaInfoWrapper && tooltip && !mediaInfoWrapper.dataset.novaiHoverBound) {
    mediaInfoWrapper.dataset.novaiHoverBound = "1";
    const show = () => {
      if ("none" !== mediaInfoWrapper.style.display) {
        tooltip.style.opacity = "1";
      }
    };
    const hide = () => {
      tooltip.style.opacity = "0";
    };
    mediaInfoWrapper.addEventListener("mouseover", show);
    mediaInfoWrapper.addEventListener("mouseout", hide);
  }

  const mediaAlert = mediaWrapper ? mediaWrapper.querySelector(`#${NOVAI_MEDIA_ALERT_ID}`) : null;
  if (mediaAlert && !mediaAlert.dataset.novaiHoverBound) {
    mediaAlert.dataset.novaiHoverBound = "1";
    mediaAlert.addEventListener("mouseover", (function () {
      let popup = document.getElementById(NOVAI_MEDIA_POPUP_ID);
      if (!popup) {
        mediaAlert.insertAdjacentHTML("afterend", '<div id="' + NOVAI_MEDIA_POPUP_ID + '" class="ui-pdp-buybox" style="pointer-events: none;box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.35) 1px 10px 4px -7px;position: absolute;top: 12rem;padding: 1em;font-size: 14px;font-weight: 400;color: rgb(255, 255, 255);background-color: var(--mfy-main);z-index: 11;display: block;"><b>Anúncio com menos de 30 dias.</b> (Média mensal foi estimada apenas a partir das vendas do primeiro mês).</div>');
        popup = document.getElementById(NOVAI_MEDIA_POPUP_ID);
      }
      popup && (popup.style.display = "block");
    }));
    mediaAlert.addEventListener("mouseout", (function () {
      const popup = document.getElementById(NOVAI_MEDIA_POPUP_ID);
      popup && (popup.style.display = "none");
    }));
  }

  return sinceWrapper || mediaWrapper;
}

function updateSinceAndMediaUI(options = {}) {
  lastSinceAndMediaOptions = { ...options };
  const sinceWrapper = document.getElementById(NOVAI_SINCE_WRAPPER_ID);
  const mediaWrapper = document.getElementById(NOVAI_MEDIA_WRAPPER_ID);
  if (!sinceWrapper && !mediaWrapper) return;

  const daysRaw = options.days;
  const daysNumber = Number(daysRaw);
  const normalizedDays = Number.isFinite(daysNumber) ? Math.max(0, Math.round(daysNumber)) : null;
  if (sinceWrapper) {
    const daysSpan = sinceWrapper.querySelector(`[${NOVAI_CREATED_DAYS_ATTR}]`);
    if (daysSpan) {
      daysSpan.textContent = null !== normalizedDays ? normalizedDays : "?";
    }

    const dateSpan = sinceWrapper.querySelector(`[${NOVAI_CREATED_DATE_ATTR}]`);
    if (dateSpan) {
      const formatted = options.dateBR && "string" == typeof options.dateBR && options.dateBR.trim().length > 0 ? options.dateBR : "--/--/----";
      dateSpan.textContent = `(${formatted})`;
    }
  }

  if (mediaWrapper) {
    const mediaSpan = mediaWrapper.querySelector(`[${NOVAI_MEDIA_VALUE_ATTR}]`);
    if (mediaSpan) {
      let value = options.mediaValue;
      if (typeof value === "number" && !isNaN(value)) {
        value = value;
      } else if (typeof value === "string") {
        value = value.trim();
        if (!value) value = "-";
      } else {
        value = "-";
      }
      mediaSpan.textContent = value;
    }

    const mediaInfoWrapper = mediaWrapper.querySelector(`[${NOVAI_MEDIA_INFO_ATTR}]`);
    if (mediaInfoWrapper) {
      mediaInfoWrapper.style.display = options.showCatalogInfo ? "inline-flex" : "none";
    }

    const mediaAlert = mediaWrapper.querySelector(`#${NOVAI_MEDIA_ALERT_ID}`);
    if (mediaAlert) {
      mediaAlert.style.display = options.showMediaAlert ? "inline-flex" : "none";
    }
  }
}

function removeSinceAndMediaContainer() {
  cancelSinceAndMediaRetry();
  const sinceWrapper = document.getElementById(NOVAI_SINCE_WRAPPER_ID);
  if (sinceWrapper && sinceWrapper.parentNode) {
    sinceWrapper.parentNode.removeChild(sinceWrapper);
  }
  const mediaWrapper = document.getElementById(NOVAI_MEDIA_WRAPPER_ID);
  if (mediaWrapper && mediaWrapper.parentNode) {
    mediaWrapper.parentNode.removeChild(mediaWrapper);
  }
  const popup = document.getElementById(NOVAI_MEDIA_POPUP_ID);
  popup && popup.remove();
}
// ===== NVAI LOADER TOTAL (drop-in) =====
class NvaiLoaderTotal {
  constructor(defaults = {}) {
    this.defaults = {
      size: 40,              // px
      text: 'Analisando...', // legenda opcional
      showText: true,
      ...defaults
    };
    this.styleId = 'novai-atom-loader-css';
  }

  ensureStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(this.styleId)) return;

    const css = `
@keyframes orbit-10 {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(10px) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg) translateX(10px) rotate(-360deg); }
}
@keyframes orbit-14 {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(14px) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg) translateX(14px) rotate(-360deg); }
}
@keyframes orbit-18 {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(18px) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg) translateX(18px) rotate(-360deg); }
}
@keyframes orbit-22 {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(22px) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg) translateX(22px) rotate(-360deg); }
}

.nvai-atom-wrap{display:flex;align-items:center;gap:.5rem;width:auto;height:auto}
.nvai-analysing{color:var(--novai-text,#8E8E93);font-size:.875rem;padding-left:10px}
.nvai-atom{position:relative}
.nvai-electron{
  position:absolute;top:50%;left:50%;
  width:6px;height:6px;border-radius:50%;
  background:var(--novai-main,#F8DD82);
  box-shadow:0 0 6px rgba(248,221,130,0.6)
}
.nvai-e1{animation:orbit-10 1.0s linear infinite}
.nvai-e2{animation:orbit-14 1.4s linear infinite}
.nvai-e3{animation:orbit-18 1.8s linear infinite}
.nvai-e4{animation:orbit-22 2.2s linear infinite}
    `.trim();

    const style = document.createElement('style');
    style.id = this.styleId;
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Gera o HTML do loader (tamanho/legenda customizáveis)
  getHTML(opts = {}) {
    this.ensureStyles();
    const { size, text, showText } = { ...this.defaults, ...opts };
    const label = showText ? `<span class="nvai-analysing">${text}</span>` : '';

    return `
<div data-nvai-spinner="true" role="status" aria-live="polite" class="nvai-atom-wrap">
  <div class="nvai-atom" style="width:${size}px;height:${size}px;">
    <span class="nvai-electron nvai-e1"></span>
    <span class="nvai-electron nvai-e2"></span>
    <span class="nvai-electron nvai-e3"></span>
    <span class="nvai-electron nvai-e4"></span>
  </div>
  ${label}
</div>
    `.trim();
  }

  // Substitui conteúdo do nó pelo loader
  replaceContent(node, opts = {}) {
    if (!node) return;
    node.innerHTML = this.getHTML(opts);
  }

  // Detecta loader NVAI (e também legados mfy/lottie pra evitar duplicar)
  hasSpinner(node) {
    if (!node) return false;
    return !!node.querySelector('[data-nvai-spinner],[data-novai-spinner],[data-mfy-spinner],lottie-player');
  }

  // Helpers de conveniência (compatíveis com o antigo)
  getWrappedHTML(styleStr = "", opts = {}) {
    return `<div style="${styleStr}">${this.getHTML(opts)}</div>`;
  }

  getInlineHTML(opts = {}) {
    return `<span style="display:inline-block;vertical-align:middle;">${this.getHTML(opts)}</span>`;
  }

  // Monta e retorna o elemento do loader inserido
  mount(node, opts = {}) {
    if (!node) return null;
    this.replaceContent(node, opts);
    return node.querySelector('[data-nvai-spinner]');
  }

  // Remove o loader NVAI do nó
  remove(node) {
    if (!node) return;
    const el = node.querySelector('[data-nvai-spinner]');
    if (el) el.remove();
  }

  // Atalho estático
  static html(opts = {}) {
    return new NvaiLoaderTotal().getHTML(opts);
  }
}

// ===== Instância padrão (recomendado) =====
const nvaiLoaderTotal = new NvaiLoaderTotal();

// String pronta (como antes você tinha "NvaiLoader")
const NvaiLoader = nvaiLoaderTotal.getHTML();

// ---- Resilient UI keep-alive (re-inject after React wipes nodes) ----
let _mfyKeepAliveInterval = null;
let _mfyKeepAliveObserver = null;
let _mfyLastReinitAt = 0;
const _mfyMinReinitGapMs = 1200;
function _mfyScheduleReinit(reason) {
  const now = Date.now();
  if (now - _mfyLastReinitAt < _mfyMinReinitGapMs) return;
  _mfyLastReinitAt = now;
  try {
    const markers = [
      "eaoffSwitch",
      "price-tool",
      "visits-component"
    ].map(id => {
      const count = document.querySelectorAll(`#${cssEscape(id)}`).length;
      return `${id}:${count}`;
    }).join(" | ");
    console.log(`[NOVAI] Reinicialização agendada (${reason}) -> ${markers}`);
  } catch (_) {}
  try { removeNovaiInjectedNodes(`keep-alive:${reason}`); } catch (_) {}
  try { initializeExtensionFeatures(); } catch (_) {}
}
function _mfyKeepAliveTick() {
  try {
    if (paginaAtual === 'anuncio') {
      const hasSwitch = document.getElementById('eaoffSwitch');
      if (!hasSwitch) return _mfyScheduleReinit('missing eaoffSwitch');
      const hasSinceWrapper = document.getElementById(NOVAI_SINCE_WRAPPER_ID);
      if (!hasSinceWrapper) scheduleSinceAndMediaRetry('keep-alive-missing-wrapper');
      const hasMediaWrapper = document.getElementById(NOVAI_MEDIA_WRAPPER_ID);
      if (!hasMediaWrapper) scheduleSinceAndMediaRetry('keep-alive-missing-media');
    } else if (paginaAtual === 'lista') {
      const hasCTA = document.getElementById('ealistrequest') || document.getElementById('mfy-catalog-filter-container');
      if (!hasCTA) return _mfyScheduleReinit('missing list widgets');
    }
  } catch (_) {}
}
function startKeepAlive() {
  if (!_mfyKeepAliveInterval) {
    _mfyKeepAliveInterval = setInterval(_mfyKeepAliveTick, 1500);
  }
  if (!_mfyKeepAliveObserver && typeof MutationObserver !== 'undefined') {
    const root = document.getElementById('root-app') || document.body;
    _mfyKeepAliveObserver = new MutationObserver((mutations) => {
      // If one of our nodes was removed, verify after a tiny delay
      // and only re-inject if the node is STILL missing (avoids duplicates on replace/outerHTML).
      let removedOurNode = false;
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.removedNodes && m.removedNodes.forEach(n => {
            if (n && n.nodeType === 1) {
              const el = n;
              if (el.id === NOVAI_SINCE_WRAPPER_ID) {
                scheduleSinceAndMediaRetry('observer-missing-wrapper');
              }
              if (el.id === 'eaoffSwitch' || el.id === 'ealistrequest' || el.id === 'price-tool' || el.classList?.contains('eamaindropdownmenu')) {
                removedOurNode = true;
              }
            }
          });
        }
      }
      if (removedOurNode) setTimeout(_mfyKeepAliveTick, 100);
    });
    try { _mfyKeepAliveObserver.observe(root, { childList: true, subtree: true }); } catch (_) {}
  }
}
function parseJwt(e) {
  var t = e?.split(".")[1], n = t.replace(/-/g, "+").replace(/_/g, "/"), a = decodeURIComponent(window.atob(n).split("").map((function (e) {
    return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
  }
  )).join(""));
  return JSON.parse(a)
}
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (e, t) => e.get(t)
}
);

function isList() {
  null != document.getElementsByClassName("ui-search-breadcrumb__title")[0] && (paginaAtual = "lista")
}
function eadataStore(e, t, n) {
  const a = {
    value: t,
    expiry: (new Date).getTime() + n
  }
  ;
  localStorage.setItem(e, JSON.stringify(a))
}
function eadataRetrieve(e) {
  const t = localStorage.getItem(e);
  if (!t) return null;
  const n = JSON.parse(t);
  return (new Date).getTime() > n.expiry ? (localStorage.removeItem(e), null): n.value
}
// Default TTL (time-to-live) for local cached values: 30 days
var TTL1 = 30 * 24 * 60 * 60 * 1e3;
const LOCAL_ACCESS_TOKEN_KEY = "local_usertkn";
const LOCAL_REFRESH_TOKEN_KEY = "local_user_refresh";
const AUTH_REQUEST_EVENT = "NovaiRequestAuthState";
const AUTH_STATE_EVENT = "NovaiAuthState";
const AUTH_UPDATE_EVENT = "NovaiAuthTokensUpdated";
const AUTH_OPEN_LOGIN_EVENT = "NovaiOpenLogin";
let pendingAuthSyncPromise = null;

function persistAuthState(detail = {}) {
  const { accessToken, refreshToken, clear, source } = detail || {};
  const ttl = "number" == typeof detail.ttl && detail.ttl > 0 ? detail.ttl : TTL1;

  if (clear) {
    clearStoredAuthTokens();
    return;
  }

  let storedSomething = !1;

  if ("string" == typeof accessToken && accessToken.trim()) {
    try {
      overwriteStoredToken(LOCAL_ACCESS_TOKEN_KEY, accessToken, ttl);
      storedSomething = !0;
    } catch (_) {}
    const canReadHeader = eaHeaders && "function" == typeof eaHeaders.get;
    const canWriteHeader = eaHeaders && "function" == typeof eaHeaders.set;
    let shouldSetHeader = !1;
    try {
      shouldSetHeader = !canReadHeader || !eaHeaders.get("Authorization") || "background" === source;
    } catch (_) {
      shouldSetHeader = !0;
    }
    if (shouldSetHeader && canWriteHeader) {
      try {
        eaHeaders.set("Authorization", `Bearer ${accessToken}`);
      } catch (_) {}
    }
  }

  if ("string" == typeof refreshToken && refreshToken.trim()) {
    try {
      overwriteStoredToken(LOCAL_REFRESH_TOKEN_KEY, refreshToken, ttl);
      storedSomething = !0;
    } catch (_) {}
  }

  if (storedSomething) {
    clearNovaiLoginPrompt();
  }
}

document.addEventListener(AUTH_STATE_EVENT, (event => {
  persistAuthState(event.detail || {});
}));

function requestAuthStateFromBackground() {
  if (pendingAuthSyncPromise) return pendingAuthSyncPromise;

  pendingAuthSyncPromise = new Promise((resolve => {
    const handler = event => {
      clearTimeout(timer);
      resolve(event?.detail || {});
    };
    const timer = setTimeout((() => {
      document.removeEventListener(AUTH_STATE_EVENT, handler);
      resolve(null);
    }), 1e3);

    document.addEventListener(AUTH_STATE_EVENT, handler, { once: !0 });

    try {
      document.dispatchEvent(new CustomEvent(AUTH_REQUEST_EVENT));
    } catch (_) {
      clearTimeout(timer);
      document.removeEventListener(AUTH_STATE_EVENT, handler);
      resolve(null);
    }
  })).finally((() => {
    pendingAuthSyncPromise = null;
  }));

  return pendingAuthSyncPromise;
}

function broadcastAuthTokens(accessToken, refreshToken, options = {}) {
  if (!options.clear && !accessToken && !refreshToken) return;
  const detail = {
    accessToken,
    refreshToken,
    ttl: TTL1,
    source: "page"
  };
  if (options.clear) {
    detail.clear = !0;
  }
  try {
    document.dispatchEvent(new CustomEvent(AUTH_UPDATE_EVENT, { detail }));
  } catch (_) {}
}

function overwriteStoredToken(key, value, ttl) {
  try {
    localStorage.removeItem(key);
  } catch (_) {}
  eadataStore(key, value, ttl);
}

function clearStoredAuthTokens() {
  try {
    localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY);
  } catch (_) {}
  try {
    localStorage.removeItem(LOCAL_REFRESH_TOKEN_KEY);
  } catch (_) {}
  try {
    eaHeaders.delete("Authorization");
  } catch (_) {}
}

const NOVAI_REAUTH_PROMPT_ID = "novai-login-required";
let novaiReauthInProgress = !1;

function clearNovaiLoginPrompt() {
  novaiReauthInProgress = !1;
  const existing = document.getElementById(NOVAI_REAUTH_PROMPT_ID);
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }
}

function renderNovaiLoginPrompt() {
  if (document.getElementById(NOVAI_REAUTH_PROMPT_ID)) return;

  const render = () => {
    if (document.getElementById(NOVAI_REAUTH_PROMPT_ID)) return;
    const container = document.createElement("div");
    container.id = NOVAI_REAUTH_PROMPT_ID;
    container.setAttribute("style", "position:fixed;z-index:2147483646;bottom:24px;right:24px;max-width:320px;background:#111111;color:#ffe600;padding:16px 18px;border-radius:16px;box-shadow:0 20px 45px rgba(0,0,0,.2);font-family:Inter,Roboto,system-ui,sans-serif;display:flex;flex-direction:column;gap:12px;");

    const title = document.createElement("strong");
    title.textContent = "Sessão expirada";
    title.setAttribute("style", "font-size:1.05rem;letter-spacing:.3px;");

    const description = document.createElement("p");
    description.textContent = "Faça login novamente na extensão NOVAI para gerar um novo token de acesso.";
    description.setAttribute("style", "margin:0;font-size:.92rem;line-height:1.45;color:#fef08a;");

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Abrir tela de login";
    button.setAttribute("style", "appearance:none;border:none;border-radius:12px;background:#ffe600;color:#111111;font-weight:700;padding:10px 14px;font-size:.95rem;cursor:pointer;box-shadow:0 10px 25px rgba(255,230,0,.35);");
    button.addEventListener("click", (() => {
      try {
        document.dispatchEvent(new CustomEvent(AUTH_OPEN_LOGIN_EVENT, { detail: { source: "reauth" } }));
      } catch (_) {}
    }));

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(button);

    (document.body || document.documentElement).appendChild(container);
  };

  if ("loading" === document.readyState) {
    document.addEventListener("DOMContentLoaded", render, { once: !0 });
  } else {
    render();
  }
}

function triggerReauthFlow(reason) {
  if (novaiReauthInProgress) return;
  novaiReauthInProgress = !0;
  console.warn(`[NOVAI] ${reason || "sessão inválida"}. Será necessário efetuar o login novamente.`);
  clearStoredAuthTokens();
  broadcastAuthTokens(null, null, { clear: !0 });
  renderNovaiLoginPrompt();
}

function installNovaiFetchInterceptor() {
  if (window.__novaiFetchInterceptInstalled) {
    return;
  }
  const originalFetch = window.fetch;
  if ("function" !== typeof originalFetch) {
    return;
  }

  window.__novaiFetchInterceptInstalled = !0;

  const monitoredStatuses = new Set([401, 403]);

  const getHeadersFrom = (input, init) => {
    if (init && init.headers) return init.headers;
    if (input && "object" == typeof input && "headers" in input) return input.headers;
    return null;
  };

  const headersMatchEa = headers => {
    if (!headers) return !1;
    if (headers === eaHeaders || headers === eaInit?.headers) return !0;
    try {
      if (headers instanceof Headers) {
        if (headers === eaHeaders) return !0;
        const auth = headers.get("Authorization");
        return !!auth && (!eaHeaders || "function" != typeof eaHeaders.get || auth === eaHeaders.get("Authorization"));
      }
    } catch (_) {}

    if (Array.isArray(headers)) {
      return headers.some((entry => {
        if (!entry || entry.length < 2) return !1;
        return "authorization" === String(entry[0]).toLowerCase() && String(entry[1]).startsWith("Bearer ");
      }));
    }

    if ("object" == typeof headers) {
      const auth = headers.Authorization || headers.authorization;
      if ("string" == typeof auth && auth.startsWith("Bearer ")) {
        try {
          return !eaHeaders || "function" != typeof eaHeaders.get || auth === eaHeaders.get("Authorization");
        } catch (_) {
          return !0;
        }
      }
    }

    return !1;
  };

  window.fetch = function(input, init) {
    const headers = getHeadersFrom(input, init);
    const shouldMonitor = headersMatchEa(headers);
    return originalFetch.call(this, input, init).then((response => {
      if (shouldMonitor && response && monitoredStatuses.has(response.status)) {
        triggerReauthFlow("Token de acesso inválido ou expirado");
      }
      return response;
    })).catch((error => {
      if (shouldMonitor) {
        triggerReauthFlow("Falha ao consultar a API protegida");
      }
      throw error;
    }));
  };
}

installNovaiFetchInterceptor();
// Ensure a global user id binding exists to avoid ReferenceError on read
var uid = typeof uid === "undefined" ? null : uid;
// Ensure theme color variables exist for CSS and icon URLs
var mfyMainColor = typeof mfyMainColor === "undefined" ? "#7933ff" : mfyMainColor;
var NovaiColorMain = typeof NovaiColorMain === "undefined" ? (typeof mfyMainColor === "string" ? mfyMainColor.replace('#','') : "7933ff") : NovaiColorMain;
isList();
var getHTML = async function (e, t) {
  try {
    const n = new Headers;
    n.append("Access-Control-Allow-Origin", "*");
    const a = await fetch(e, {
      headers: n
    }
    );
    if (!a.ok) throw new Error(`HTTP error! status: ${a.status}`);
    const i = await a.text(), s = (new DOMParser).parseFromString(i, "text/html");
    t && "function" == typeof t && t(s)
  }
  catch (e) {
    t && "function" == typeof t && t(null, e)
  }
}
, scrapedData = {}, itemsLocalData = {}, inFlightScrapeRequests = new Set, inFlightScriptRequests = new Set;
document.addEventListener("ProductDataResponse", (function (e) {
  try {
    const t = e.detail || {};
    itemsLocalData = {
      ...itemsLocalData || {},
      ...t
    }
  }
  catch (t) {
    itemsLocalData = e.detail
  }
}
)), document.addEventListener("ScrapedURL", (function (e) {
  const {
    url: t, html: n, idRef: a
  }
  = e.detail;
  scrapedData[a] = n
}
)), document.addEventListener("ScrapedScriptsURL", (function (e) {
  const {
    url: t, response: n, idRef: a
  }
  = e.detail;
  scrapedData[a] = n
}
));
var scrapeHTML = async function (e, t, n, a, i) {
  let s = 1 == n ? `canonical-${e}`: e;
  if (void 0 !== scrapedData[s]) {
    let e = scrapedData[s], t = null;
    if ("string" == typeof e) try {
      t = (new DOMParser).parseFromString(e, "text/html")
    }
    catch (e) {
      t = null
    }
    else e instanceof Document && (t = e);
    return void (a && "function" == typeof a && a(t))
  }
  inFlightScrapeRequests.has(s) || (inFlightScrapeRequests.add(s), document.dispatchEvent(new CustomEvent("ScrapeURL", {
    detail: {
      url: t,
      idRef: s,
      noRedirect: i
    }
  }
  )));
  (async() => {
    if (void 0 !== scrapedData[s]) return void n();
    let e = 0;
    const t = () => {
      void 0 !== scrapedData[s] ? (n(), inFlightScrapeRequests.delete (s)): e >= 1e4 ? (a && "function" == typeof a && a(null), inFlightScrapeRequests.delete (s)): (e += 750, setTimeout(t, 750))
    }
    , n = () => {
      let e = scrapedData[s], t = null;
      if ("string" == typeof e) try {
        t = (new DOMParser).parseFromString(e, "text/html")
      }
      catch (e) {
        t = null
      }
      else e instanceof Document && (t = e);
      a && "function" == typeof a && a(t)
    }
    ;
    setTimeout(t, 750)
  }
  )()
}
, scrapeForScripts = async function (e, t, n, a, i, s) {
  let o = n ? `canonical-scripts-${e}`: `scripts-${e}`;
  const r = s ? `${s}${t}`: t;
  if (void 0 !== scrapedData[o]) {
    const e = scrapedData[o];
    return void (e && e.error ? a && "function" == typeof a && a(null, e.error): a && "function" == typeof a && a(e.scripts || e.html, null))
  }
  inFlightScriptRequests.has(o) || (inFlightScriptRequests.add(o), document.dispatchEvent(new CustomEvent("ScrapeScriptsURL", {
    detail: {
      url: r,
      idRef: o,
      noRedirect: i
    }
  }
  )));
  (async() => {
    let e = 0;
    for (;
    void 0 === scrapedData[o] && e < 1e4;
    ) await new Promise((e => setTimeout(e, 100))), e += 100;
    if (void 0 === scrapedData[o]) a && "function" == typeof a && a(null, "Timeout"), inFlightScriptRequests.delete (o);
    else {
      const e = scrapedData[o];
      e.error ? (a && "function" == typeof a && a(null, e.error), inFlightScriptRequests.delete (o)): (a && "function" == typeof a && a(e.scripts || e.html, null), inFlightScriptRequests.delete (o))
    }
  }
  )()
}
, eaHeaders = new Headers;
eaHeaders.append("pragma", "no-cache"), eaHeaders.append("cache-control", "no-cache");
var eaInit = {
  method: "GET",
  headers: eaHeaders,
  cache: "no-store"
}
, title = "", spot = "", spot2 = "", spot3 = "", reflow = "", maisFunc = "", spot_catalog = "", catalog_subt = "", iscatalog = !1, eatrial = "not", iFrame = "", stepOne = "", stepTwo = "", stepLoading = "", cota_minima_MLB = 79, taxa_cota = meliCurrentFee, cota_valid = 0, taxaML_verif = 0, taxa_percentual = 0, productCost = 0, PAV = 0, quotationData = localStorage.getItem("lastquote"), aliquota = 0, margem_raw = "", taxa_mlb = "", taxa_frete = "", frete_valid = 0, simular_btn = "", alerta_form = "", eapricefix = "", paginaAtual = "anuncio", vendas = "", dLayer = void 0, dLayerAlt = "", vendasAlt = "", catalogData = [{
  body: {}
}
], eaMLtaxdata = "", taxlitedata = "", data_br = "", dataMilisec = "", eanow = Date.now(), eadiff = "", dias = "", media_vendas = "", media_vendas_catalogo = "", eabar_category = "", MLenvios = !0, nomeProduto = "", categoryDomain = "", eaList = !1, alert_media_vendas = !1, visitasparavender = null;
null != document.getElementsByClassName("ui-pdp-title")[0] && (nomeProduto = document.getElementsByClassName("ui-pdp-title")[0].innerHTML);
var checkeddimensions = "dimensions=15x30x5,150";

function ensureCatalogBody() {
  if (!Array.isArray(catalogData)) {
    catalogData = [{ body: {} }];
  }
  if (!catalogData[0] || "object" != typeof catalogData[0]) {
    catalogData[0] = { body: {} };
  }
  if (!catalogData[0].body || "object" != typeof catalogData[0].body) {
    catalogData[0].body = {};
  }
  return catalogData[0].body;
}

function updateCatalogBody(partial = {}) {
  const body = ensureCatalogBody();
  for (const [key, rawValue] of Object.entries(partial || {})) {
    if (null == rawValue) continue;
    if ("date_created" === key) {
      const normalized = "string" == typeof rawValue ? rawValue.trim() : rawValue;
      if (!normalized) continue;
      if (!body.date_created) {
        body.date_created = normalized;
      }
      continue;
    }
    if ("sold_quantity" === key) {
      const numeric = Number(rawValue);
      if (!Number.isFinite(numeric)) continue;
      const current = Number(body.sold_quantity);
      if (!Number.isFinite(current) || numeric > current) {
        body.sold_quantity = numeric;
      }
      continue;
    }
    body[key] = rawValue;
  }
  return body;
}

var toolModal = `
  <div id="mfy-tool-modal" class="toolmodal">
    <div class="andes-modal__portal" style="display:none" id="mfy-modal-portal">
      <div id="mfy-modal-overlay" class="andes-modal__overlay andes-modal__overlay--small">
        <div role="dialog" tabindex="-1" class="andes-modal ui-pdp-iframe-reviews andes-modal--small" data-ismodal="true" aria-modal="true" style="max-height: 100%; max-width: 100%;">
          <div id="close-modal" style="position: absolute;top: -3rem;right: -6%;cursor: pointer;z-index: 1000;" onclick="this.parentElement.parentElement.parentElement.style.display = 'none';">
            <img src="https://img.icons8.com/sf-regular/48/ffffff/close-window.png" style="width: 3.1rem;">
          </div>
          <div class="andes-modal__scroll">
            <div class="andes-modal__content" id="mfy-modal-content" style="padding: 4rem;display: flex;flex-direction: column;justify-content: center;align-items: center; min-width: 51rem;">
              <span style="font-size: 1.75rem;font-weight: 800;">Análise de Dados Rastreados</span>
              <span style="font-size: 1.31rem;font-weight: 700;">Sobreposição de Visitas/Vendas</span>
              <div id="mfy-track-chart" style="width: 59rem;height: 27rem;padding-top: 2.1rem;min-height: 365px;">Gráfico</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="tool-modal" style="max-width: 1100px;min-width: 80rem;border-radius: 0.21em;position: relative;background-color:#F5F5F5;width: 77vw;height: 93vh;display: flex;justify-content: space-between;font-size: 1.5rem;font-family: 'montserrat';font-weight: 500;">
      <div class="branding" style="width: 5rem;background: #fff;display: flex;align-items: flex-start;padding: 1.31rem;justify-content: center;border-radius: 0.21em;">
        <img src="https://i.ibb.co/K7Lc6cr/metrify.png" style="width: 1.75rem;height: 1.75rem;">
      </div>

      <div class="modal-content" style="width: 100%;height: 100%;display: flex;padding: 2rem;flex-direction: column;">
        <div class="row1" style="display: flex;width: 100%;height: 8rem;justify-content: space-between;align-items: center;padding: 1.31rem;">
          <div class="column1" style="display: flex;flex-direction: column;justify-content: space-between;align-items: flex-start;">
            <span style="font-size: 1.31em;font-weight: 700;">Painel</span>
            <span style="font-size: 0.77em;color: rgb(0,0,0,.5);">de Ferramentas</span>
          </div>
        </div>

        <div class="row2" style="display: flex;width: 100%;height: fit-content;justify-content: left;align-items: flex-start;padding: 1.31rem 0rem 2.1rem 0rem;border-bottom: 2px solid rgb(215 215 215 / 50%);">
          <div class="block" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;display: flex;flex-direction: column;background-color: #fff;width: 16rem;height: 8.5em;border-radius: 0.31rem;padding: 2rem;">
            <span style="font-size: 1.5rem;font-weight: 700;">Gerador</span>
            <span style="font-size: 1rem;font-weight: 600;color: rgb(0,0,0,.5)">de códigos EAN13</span>
            <span style="font-size: 2.75rem;font-weight: 800;margin-top: 1rem;">
              <img style="opacity: .36; margin: 7px 0px;" src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/64/external-barcode-cyber-monday-xnimrodx-lineal-gradient-xnimrodx.png">
            </span>
          </div>

          <div class="block2" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;display: flex;background-color: #fff;width: 100%;height: 8.5em;border-radius: 0.31rem;padding: 2rem;">
            <div class="inner-column-1" style="display: flex;flex-direction: row;flex: 1;">
              <div class="eangen" style="pointer-events: all;background: rgb(52, 131, 250);border-radius: 11px;width: fit-content;height: fit-content;cursor: pointer;transition: all 0.35s ease 0s;transform: scale(1);margin: 0em 0.7em 0em 0em;">
                <img src="https://img.icons8.com/carbon-copy/100/ffffff/refresh-barcode.png" style="width: 6rem;margin: 1em 0.5em;">
              </div>
              <div style="display: flex;flex-direction: column;">
                <div style="display: flex;margin-bottom: 7px;">
                  <span class="codefield" style="pointer-events: all;font-weight: 700;text-align: left;font-size: 1.35em;padding: 0.75em 1em;border: 1px solid var(--mfy-main)54;border-radius: 1em;">0000000000000</span>
                </div>
                <span style="font-size: 1rem;font-weight: 400;color: rgb(0,0,0,.5);padding: 0em 0.5em;">Clique para gerar um novo código de barras</span>
              </div>
              <span id="snackbar" style="margin: 1.21em 0em;">Copiado!</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="close-track" style="position: relative; top: -44.5%; cursor: pointer; z-index: 1000;">
      <img src="https://img.icons8.com/sf-regular/48/ffffff/close-window.png" style="width: 3.1rem;">
    </div>
  </div>
`;

var eawarning_mlenvios = `
<li style=" font-size: 0.77em; padding: 1em 2em 1em 2em; background-color: #ebebeb; margin-right: 3.5em; margin-top: 0.35em; text-align: center;">
  <b>Atenção:</b> Produto pode não ser aceito pelo Mercado Envios devido ao tamanho.
</li>
`;

var btn = `
Criado em: ${data_br}  |  Há cerca de: ${dias} dias
<br />
<span id="mediabtn" class="andes-button--loud background_novai andes-button" style="margin-top: 0.35em;font-size: 12px!important;display:inline!important;padding-top: 1em;padding-bottom: 1em;position: relative;z-index: 10;border-radius:2rem;">
  Média: ${media_vendas} vendas/mês
</span>
<div id="plusf_wrap" class="hdn smooth transp" style=";font-size:14px;padding: 1.35em;margin: 0.7em 0em -2.35em 0em;width: 110%;">
  <div id="plusf" style="margin-left: 0.5em;">
    <img alt="icon" src="https://ci3.googleusercontent.com/proxy/4AHE0GSzeLFc0tuceXt2Hib-rWVbcK8yqriCrBnrQFdt3LpCrH-NA3nyDKu-IO-65xO2yjlS7rsjGiJWV6QunadzFZlJPWqeb2Shj_fYgwagdLoTOAljMen83VI1eloEUOdeZcR4Su7DrJRWooeRNOF5nZ2fJv2BE06zEE2uKHkiVrr1vOvtY78kR28=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-mail.png"
         style="float: left ; transform: translate(-2px, 0px) ; opacity: 21% ; padding-right: 0.31em ; ">
    <span id="nofull" style="">
      <b>0</b> produtos no
      <svg xmlns="http://www.w3.org/2000/svg" class="logo-full" width="151" height="39" viewBox="0 0 151 39" data-reactroot=""
           style="width: 3.75em ; height: auto ; position: relative ; top: 0.2em ; padding: 0em 0em 0em 0.35em ; ">
        <g fill="#00A650" fill-rule="evenodd">
          <path d="M9.577 0L0 22.286h15.962L9.577 39l25.54-25.071H19.153L28.732 0zM56.094 27.925h-6.931l5.924-24.38h19.706l-1.33 5.483H60.688l-.886 3.801h12.452l-1.33 5.483H58.433l-2.338 9.613zm33.718.439c-8.262 0-12.332-3.582-12.332-8.7 0-.402.12-1.242.202-1.608l3.546-14.51h7.052L84.774 17.91c-.04.183-.12.585-.12 1.023.04 2.01 1.732 3.948 5.158 3.948 3.707 0 5.601-2.12 6.286-4.971l3.507-14.365h7.012L103.11 18.02c-1.451 5.921-4.998 10.344-13.3 10.344zm36.014-.439h-17.732l5.924-24.38h6.932l-4.554 18.897h10.76l-1.33 5.483zm23.844 0h-17.732l5.924-24.38h6.932l-4.554 18.897H151l-1.33 5.483z"></path>
        </g>
      </svg>
      <span style="margin-right: 0.35em;font-size: 0.86em;color: #1ac54f!important;margin-top: 0.14em;">  (top 50)</span>
      <br>
      <span id="nofull2" style="font-size: 0.92em;">- categoria: <b>?</b></span>
    </span>
  </div>
</div>
`;

var mlfee = "";

var nvailoader = `
<style id="novai-atom-loader-css">
@keyframes orbit-10 {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(10px) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg) translateX(10px) rotate(-360deg); }
}
@keyframes orbit-14 {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(14px) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg) translateX(14px) rotate(-360deg); }
}
@keyframes orbit-18 {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(18px) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg) translateX(18px) rotate(-360deg); }
}
@keyframes orbit-22 {
  from { transform: translate(-50%,-50%) rotate(0deg) translateX(22px) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg) translateX(22px) rotate(-360deg); }
}

.nvai-atom-wrap{display:flex;align-items:center;gap:.5rem;width:auto;height:auto}
.nvai-analysing{color:#8E8E93;font-size:.875rem;padding-left:10px}
.nvai-atom{position:relative;width:40px;height:40px}

/* apenas os elétrons */
.nvai-electron{
  position:absolute;top:50%;left:50%;
  width:6px;height:6px;border-radius:50%;
  background:#F8DD82;box-shadow:0 0 6px rgba(248,221,130,0.6)
}
.nvai-e1{animation:orbit-10 1.0s linear infinite}
.nvai-e2{animation:orbit-14 1.4s linear infinite}
.nvai-e3{animation:orbit-18 1.8s linear infinite}
.nvai-e4{animation:orbit-22 2.2s linear infinite}
</style>

<nvailoader class="nvai-atom-wrap">
  <div class="nvai-atom">
    <span class="nvai-electron nvai-e1"></span>
    <span class="nvai-electron nvai-e2"></span>
    <span class="nvai-electron nvai-e3"></span>
    <span class="nvai-electron nvai-e4"></span>
  </div>
  <span class="nvai-analysing">Analisando...</span>
</nvailoader>
`;



var eanotifytag = `
<div style="background-color: var(--mfy-main);background-image: linear-gradient(to right, #003eba -42%, var(--mfy-main) 35%);width:2em;height:2em;position: absolute;top: 2.7em;right: -1em;cursor: pointer;border-right: 2px solid #2c4cff;border-radius: 0px 5px 5px 0px;box-shadow: 0.31em 0 0.35em -0.35em rgb(0 0 0);">
  <img src="https://img.icons8.com/fluent-systems-regular/48/ffffff/urgent-message.png" style="width: 2em;padding: 0.5em 0.35em;position: relative;top: -0.2em;">
</div>
`;

var eameter = `
<span id="eahealthmeter" style="z-index: 100;margin: 0.31em 0.5em;overflow: hidden;align-items: center;color: rgb(52, 131, 250);font-weight: 700;font-size: 1.31em;background-color: rgb(255, 255, 255);padding: 0.35em 0.55em 0.35em 0.5em;box-shadow: rgba(0, 0, 0, 0.11) 0px 3px 6px, rgba(0, 0, 0, 0.1) 0px 3px 6px;border-radius: 1em;display: inline-flex;position: relative;z-index: 999;">
  <img id="eametersvg" src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-speedometer-web-hosting-kmg-design-flat-kmg-design.png" style="width: 1em;margin-right: 3px;pointer-events: none;">
  <div id="earatewrapper" class="eameter"><span id="eameterRate">87</span><span style="font-size: 0.75em;opacity: 50%;">/100</span></div>
</span>
`;

var eameterModal = `
<div id="eameter_modal" class="andes-tooltip andes-tooltip--light" style="margin-bottom: -2em;box-shadow: rgb(0 0 0 / 21%) 0px 3px 6px;position: relative;top: -3em;opacity: 0;transition: opacity 0.35s ease 0s;background-color: rgb(255, 255, 255);border-radius: 0.35em;text-align: left;display: none;width: 13em;padding: 3em 1em 1em 1em;">
  <span style=" font-size: 1em; font-weight: 600; color: var(--mfy-main);">Saúde do Anúncio</span><br>
  <span style=" font-size: 11px; font-weight: 600; position: relative; top: -0.7em; opacity: 50%;">Métrica criada pelo MercadoLivre</span><br>
  <ul style=" display: flex; flex: auto; flex-flow: wrap;">
    <li id="eameter_li_specs" class="eameter_li">Descrição / especificações</li>
    <li class="eameter_li" id="eameter_li_immediate_payment">Mercado Pago Ativo</li>
    <li class="eameter_li" id="eameter_li_good_quality_picture">Imagens com boa qualidade</li>
    <li id="eameter_li_loyalty_discount_eligible" class="eameter_li_off">Desconto por fidelidade</li>
    <li class="eameter_li_off" id="eameter_li_brand_verified">Marca verificada</li>
    <li class="eameter_li" id="eameter_li_cart_eligible">Aceita catálogo</li>
    <li class="eameter_li_off" id="eameter_li_premium">Premium</li>
  </ul>
  <div style="margin-top: 1em;font-size: 0.86em;padding: 1.35em 1em;font-weight: 700;background-color: #ebebebad;border-radius: 1em;">
    <span style=" color: #80808080;"> Sugestão:</span>
    <span id="eameter_tips" style=" font-size: 0.86em; font-weight: 400; color: #3f3f3f;"> Este anúncio já está otimizado.</span>
  </div>
  <style>
    .eameter_li{ text-align:center; background-color:rgb(52,131,250); color:#fff; margin-right:.1em; font-size:10px; letter-spacing:.2px; font-weight:100; border-radius:1em; padding:.35em .5em; margin:.1em;}
    .eameter_li_off{ text-align:center; background-color:rgb(229 229 229); color:rgb(146 146 146); margin-right:.1em; font-size:10px; letter-spacing:.2px; font-weight:100; border-radius:1em; padding:.35em .75em; margin:.1em;}
    .eameter_li_off::before{content: "x ";✔}
    .eameter_li::before{content: "✔ ";}
  </style>
</div>
`;

var eafollow_ad = `
<br><span id="eafollow_ad" class="eafollow_ad">
  <img class="eafollow_img" src="https://img.icons8.com/cotton/64/000000/private-wall-mount-camera.png">
</span>
`;

var eamoretools = `
<span id="eamoretools" class="eatoolboxicon">
  <img id="eatoolsicon" src="https://img.icons8.com/fluency-systems-filled/48/c7c7c7/chevron-up--v2.png"
       style="pointer-events: none;width: 1.11em;transform: rotate(180deg);margin: 1px;transition: all 0.2s;opacity: .35;">
</span>
`;

var eatoolbox = `
<span id="eatoolbox">
  <span class="eatoolboxbar">
`;

var eatoolbox_close = `
  </span>
</span>
`;

var eafollow_url = "https://www.metrify.com.br/seguir-anuncio/";

var eagrossrev = `
<div id="eagrossrev" class="novai-kpi-card novai-rev-card">
  <div class="novai-kpi-head">
    <div class="novai-kpi-icon">💰</div>
    <div class="novai-kpi-title">Faturamento</div>
  </div>

  <div class="novai-kpi-value">
    <span class="eagrossrev-title">R$0,00</span>
  </div>

  <div class="novai-kpi-sub earevstats">
    <div class="novai-rev-controls">
      <span class="ui-pdp-review__amount novai-muted" id="mfy_rev_estimate">Estimativa por períodos.</span>
      <div class="novai-rev-buttons">
        <button class="andes-button--loud background_novai novai-rev-button revbtn1">1 Dia</button>
        <button class="andes-button--loud background_novai novai-rev-button revbtn7">7 Dias</button>
        <button class="andes-button--loud background_novai novai-rev-button revbtn30">30 dias</button>
        <button class="andes-button--loud background_novai novai-rev-button revbtn60">60 dias</button>
        <button class="andes-button--loud background_novai novai-rev-button revbtn90">90 dias</button>
        <button class="andes-button--loud background_novai novai-rev-button revbtntotal">Total</button>
      </div>
    </div>
    <div class="eagrossrev-breakdown">
      <span>
        <span class="ui-pdp-review__amount">Anúncio:</span>
        <span class="eagrossrev-catalog-title">R$0</span>
        <span class="revtitle revperiod">/mês</span>
      </span>
      <span>
        <span class="ui-pdp-review__amount">Catálogo:</span>
        <span class="eagrossrev-catalog-title">R$0</span>
        <span class="revtitle revperiod">/mês</span>
      </span>
    </div>
  </div>
</div>
`;

var ranksearch = `
<span id="eaadvsearchBtn">
  <img src="https://img.icons8.com/material-rounded/24/3f8afe/search-property.png"
       style="width: 1.5em;height: 1.5em;position: relative;top: 0.21em;margin-right: 0.5em;">
  <span class="eahiddenlabel"> Ranking por palavra-chave</span>
</span>
`;

var easwitchoff = `
<span id="eaoffSwitch">
  <img src="https://img.icons8.com/external-gradak-royyan-wijaya/24/3f8afe/external-interface-gradak-interface-gradak-royyan-wijaya-5.png"
       style="width: 1.5em;height: 1.5em;position: relative;top: 0.21em;margin-right: 0.5em;">
  <span class="eahiddenlabel"> Desligar Análises</span>
</span>
`;

var analytics_ui = `
  ${eagrossrev}
  ${eamoretools}
  ${eatoolbox}
  ${eameter}
  ${ranksearch}
  ${easwitchoff}
  ${eatoolbox_close}
  ${eameterModal}
  <span id="eaadvsearchForm" style="position: relative;top: 2.7em;z-index: 0;">
    <input type="text" class="nav-search-input" name="as_word" placeholder="Posição deste anúncio (busca)" maxlength="120" autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="off" tabindex="3" style=" width: 100%;">
    <button class="nav-search-btn" tabindex="4" style=" position: relative; top: -1.75em; background-color: #ebebeb; right: -12.7em; border-radius: 0em 0.31em 0.31em 0em;">
      <div role="img" aria-label="Buscar" class="nav-icon-search"></div>
    </button>
  </span>
  <br>
  <span id="eaadvsearchResult" style="display: none;position: relative;top: 0.5em;">
    <span style="color: #333333;display: block;font-weight: bold;position: relative;top: -0.77em;padding: 1em 0.5em 0.7em 0.5em;border: 1px solid #ebebeb;">
      <img src="https://img.icons8.com/material-rounded/24/7e7e7e/search-property.png" style="width: 1.27em;position: relative;top: 0.27em;opacity: 0.5;">
      <earesult> - | - <span style=" font-size: 0.7em; color: #00000050; letter-spacing: 0.035em; padding: 0.35em 0.75em; background-color: #ebebeb; border-radius: 1em;">"-"</span></earesult>
    </span>
  </span>
`;

const PRICE_BUTTON_SIZE = "4rem";
const PRICE_BUTTON_BOTTOM = "1.5rem";
const PRICE_BUTTON_RIGHT = "2rem";
const PRICE_TOOL_GAP = "1.5rem";
const PRICE_TOOL_Z_INDEX = 2147483646;
const PRICE_BUTTON_Z_INDEX = 2147483647;

var btn_preco = `<div id="preco-btn" class="andes-button andes-button--loud background_novai_black pricebtn"
     style="width: ${PRICE_BUTTON_SIZE};
            height: ${PRICE_BUTTON_SIZE};
            padding: 0;
            border-radius: 50%;
            position: fixed;
            bottom: ${PRICE_BUTTON_BOTTOM};
            right: ${PRICE_BUTTON_RIGHT};
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            z-index: ${PRICE_BUTTON_Z_INDEX};
            cursor: pointer;">
  <img id="preco-img" style="width:50%;" src="https://img.icons8.com/ios-glyphs/30/ffffff/estimate.png"/>
</div>`;

var price_tool = "";

function mountPriceInterface(anchorElement) {
  if (!anchorElement) return;

  const existingPriceButton = document.getElementById("preco-btn");
  const existingPriceTool = document.getElementById("price-tool");

  existingPriceButton?.remove();
  existingPriceTool?.remove();

  anchorElement.insertAdjacentHTML("beforeend", btn_preco);
  anchorElement.insertAdjacentHTML("beforeend", price_tool);

  const insertedButton = document.getElementById("preco-btn");
  if (iscatalog && insertedButton) {
    const priceSubtitles = document.getElementsByClassName("ui-pdp-price__subtitles");
    const priceMainContainers = document.getElementsByClassName("ui-pdp-price__main-container");
    const needsInlineLayout = (!priceSubtitles[0] && priceMainContainers.length < 2) || priceMainContainers.length > 2;

    if (needsInlineLayout) {
      insertedButton.style.margin = "0rem -1rem 3rem 0";
      insertedButton.style.float = "left";
    }
  }

  removeDuplicateElementsById("preco-btn");
  removeDuplicateElementsById("price-tool");
}

var condicao_produto = "";

var preco_Local = "";

var categoria_Local = "";

var tipo_anuncio = "";

var nomeCategoria = "";

var rad_btn = "";

var eapricewarning = !1;

function pricingWarning() {
  if (1 == eapricewarning) {
    (function () {
      let e = preLoadedState.initialState.melidata_track.event_data.category_id;
      e?.length > 0 && o(e);
      (async function (t) {
        if ("" != t && null != t) {
          await new Promise((n => {
            fetchCategoryWithCache(t, (e => {
              e && (s = e), n();
            }));
          }));
        }
        eabar_category.innerHTML = s.name ? s.name: "Categoria";
        let n = document.getElementById("eaadsoncategory");
        s.total_items_in_this_category && n ? n.innerHTML = `<b style="color: var(--mfy-main);font-size:18px;">${s.total_items_in_this_category}</b> anúncios na categoria.`: n.parentElement.parentElement.remove();
      })(e);
    })();
  }
}
function media_ponderada(e) {
  var t = [], n = [], a = 0, i = 0;
  if (e.length % 3 != 0) throw new Error("Não foi possível calcular média.");
  for (let a = 0;
  a < e.length;
  a += 3) t.push(e[a] * e[a + 1]), n.push(e[a + 2]);
  for (let e = 0;
  e < t.length;
  e += 1) a += t[e] * n[e], i += t[e];
  return a / i
}
var comprador = "", vendedor = "", usuario_base = comprador;
function verifDimensions(e) {
  if (e) {
    let t = [];
    for (let n = 0;
    n < e?.length;
    n++) "PACKAGE_HEIGHT" == e[n].id ? t[0] = e[n].value_struct?.number: "PACKAGE_WIDTH" == e[n].id ? t[1] = e[n].value_struct?.number: "PACKAGE_LENGTH" == e[n].id ? t[2] = e[n].value_struct?.number: "PACKAGE_WEIGHT" == e[n].id && (t[3] = e[n].value_struct?.number);
    t.length > 3 && (checkeddimensions = "dimensions=" + Math.ceil(t[0]) + "x" + Math.ceil(t[1]) + "x" + Math.ceil(t[2]) + "," + Math.ceil(t[3]))
  }
}
function dLayerMainFallback() {
  NaN === preco_Local && (preco_Local = parseFloat(catalogData[0].body.price)), null == comprador && (comprador = document.documentElement.innerHTML.split("user_id")[1].split(",")[0].split(":")[1]), null == tipo_anuncio && (tipo_anuncio = null == melidata.q ? document.documentElement.innerHTML.split("listing_type_id")[1]?.split('"')[2]: catalogData[0].body.listing_type_id)
}
function dlayerFallback() {
  const catalogBody = ensureCatalogBody();
  const dataLayerEntry = Array.isArray(dataLayer) && dataLayer.length > 0 ? dataLayer[0] : null;
  const coerceItemId = rawId => {
    if (!rawId && 0 !== rawId) return null;
    if (typeof rawId === "number" && isFinite(rawId)) return `MLB${rawId}`;
    if (typeof rawId === "string") {
      const trimmed = rawId.trim();
      if (!trimmed) return null;
      const mlbMatch = trimmed.match(/^MLB-?(\d+)/i);
      if (mlbMatch) return `MLB${mlbMatch[1]}`;
      const numeric = trimmed.match(/(\d+)/);
      if (numeric) return `MLB${numeric[1]}`;
    }
    return null;
  };
  const normalizeStartTime = value => {
    if (!value && 0 !== value) return null;
    if (value instanceof Date && !isNaN(value.getTime())) return value.toISOString();
    if (typeof value === "number" && isFinite(value)) {
      const normalized = new Date(value);
      return isNaN(normalized.getTime()) ? null : normalized.toISOString();
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return null;
      if (/^\d+$/.test(trimmed)) {
        const numeric = parseInt(trimmed, 10);
        if (!isNaN(numeric)) {
          const normalized = new Date(numeric);
          if (!isNaN(normalized.getTime())) return normalized.toISOString();
        }
      }
      const normalized = new Date(trimmed);
      return isNaN(normalized.getTime()) ? null : normalized.toISOString();
    }
    return null;
  };
  const startTimeCandidates = (() => {
    const inferredItemId = coerceItemId(
      dataLayerEntry?.itemId
      ?? dataLayerEntry?.catalogProductId
      ?? catalogBody?.id
    );
    const localStartTime = inferredItemId && itemsLocalData?.[inferredItemId]?.startTime
      ? itemsLocalData[inferredItemId].startTime
      : null;
    return [
      catalogBody.date_created,
      dataLayerEntry?.startTime,
      dataLayerEntry?.components?.track?.gtm_event?.startTime,
      dataLayerEntry?.components?.track?.startTime,
      dataLayerEntry?.gtm_event?.startTime,
      trackDataParsed?.startTime,
      trackDataParsed?.components?.track?.gtm_event?.startTime,
      preLoadedState?.startTime,
      preLoadedState?.initialState?.startTime,
      preLoadedState?.initialState?.components?.track?.gtm_event?.startTime,
      preLoadedState?.pageState?.startTime,
      preLoadedState?.pageState?.components?.track?.gtm_event?.startTime,
      altPreloadedState?.startTime,
      altPreloadedState?.initialState?.startTime,
      altPreloadedState?.initialState?.components?.track?.gtm_event?.startTime,
      altPreloadedState?.pageState?.startTime,
      altPreloadedState?.pageState?.components?.track?.gtm_event?.startTime,
      melidata_namespace?.track?.gtm_event?.startTime,
      melidata_namespace?.track?.startTime,
      localStartTime
    ].filter(value => value || value === 0);
  })();
  let startTimeRaw = null;
  for (const candidate of startTimeCandidates) {
    const normalized = normalizeStartTime(candidate);
    if (normalized) {
      startTimeRaw = normalized;
      break;
    }
  }
  const vendasAlt = catalogBody.sold_quantity;
  const vendasIsEmpty = typeof vendas === "string" ? vendas.length === 0 : null == vendas;
  if (vendasIsEmpty) {
    const parsedSubtitleSales = (() => {
      const subtitleEl = document.getElementsByClassName("ui-pdp-header__subtitle")[0];
      if (!subtitleEl) return null;
      let salesText = subtitleEl.innerHTML.split(" | ")[1]?.split(" vendidos")[0]?.trim();
      if (!salesText) return null;
      if (salesText.endsWith("mil")) {
        const numeric = parseFloat(salesText.replace("mil", ""));
        return isNaN(numeric) ? null : numeric * 1e3;
      }
      const numeric = parseFloat(salesText.replace(/\./g, "").replace(",", "."));
      return isNaN(numeric) ? null : numeric;
    })();
    if (typeof vendasAlt === "number" && !isNaN(vendasAlt)) vendas = vendasAlt;
    else if (typeof parsedSubtitleSales === "number" && !isNaN(parsedSubtitleSales)) vendas = parsedSubtitleSales;
  }
  if (!startTimeRaw) {
    dLayerMainFallback();
    if (!dlayerFallback._retryTimeout) {
      dlayerFallback._retryTimeout = setTimeout(() => {
        dlayerFallback._retryTimeout = null;
        dlayerFallback();
      }, 400);
    }
    return;
  }
  if (dlayerFallback._retryTimeout) {
    clearTimeout(dlayerFallback._retryTimeout);
    dlayerFallback._retryTimeout = null;
  }
  updateCatalogBody({ date_created: startTimeRaw });
  dLayerAlt = startTimeRaw;
  dLayer = dLayerAlt.split("T")[0];
  if (!dLayer) return void dLayerMainFallback();
  "" == data_br && (data_br = dLayer.split("-").reverse().join("/"));
  const dataMilisec = Date.parse(dLayer);
  if (isNaN(dataMilisec)) return void dLayerMainFallback();
  const diff = eanow - dataMilisec;
  eadiff = diff;
  if ("" == dias) {
    const computedDays = Math.round(diff / (8.64 * Math.pow(10, 7)));
    !isNaN(computedDays) && (dias = computedDays);
  }
  if ("" == media_vendas) {
    if ("number" == typeof vendas && !isNaN(vendas) && dias > 0) {
      const monthlyAvg = Math.round(vendas / (dias / 30));
      if (Number.isFinite(monthlyAvg) && monthlyAvg >= 0) {
        avgMonthlySalesCount = monthlyAvg;
        media_vendas = monthlyAvg;
      } else {
        avgMonthlySalesCount = 0;
        media_vendas = "Indisponível";
      }
    } else {
      avgMonthlySalesCount = 0;
      media_vendas = "Indisponível";
    }
    NOVAI_SALES_STATE.averages.monthlySalesCount = avgMonthlySalesCount;
  }
  updateCatalogBody({ sold_quantity: vendas });
  const diasNumber = "number" == typeof dias ? dias : parseFloat(dias);
  if (!isNaN(diasNumber)) dias = diasNumber;
  if (0 == diasNumber) {
    avgMonthlySalesCount = 0;
    media_vendas = "0";
    NOVAI_SALES_STATE.averages.monthlySalesCount = avgMonthlySalesCount;
  } else if (diasNumber < 30 && !isNaN(diasNumber)) {
    alert_media_vendas = !0;
  }
  dLayerMainFallback();
}
function altContentScpt() {
  const header = document.getElementsByClassName("ui-pdp-header")[0];
  if (!header) return;
  header.insertAdjacentHTML("afterbegin", '<span id="eaoffSwitch" style="top: 0em;left: 0em;background-color:rgb(52, 131, 250);color:#fff;"><img src="https://img.icons8.com/external-gradak-royyan-wijaya/24/3f8afe/external-interface-gradak-interface-gradak-royyan-wijaya-5.png" style="width: 1.5em; height: 1.5em; position: relative; top: 0.21em; margin-right: 0.5em; filter: brightness(5); transform: scaleX(-1);"><span class="eahiddenlabel"> Ligar Análises</span></span>');
  const e = document.getElementById("eaoffSwitch");
  e?.addEventListener("click", (function () {
    e.lastChild.innerText = " Desligar Análises", e.firstChild.style.filter = "brightness(1)", e.firstChild.style.transform = "scaleX(1)", e.setAttribute("style", "top: 0em;left: 0em;"), localSwitchState = eadataRetrieve("eaActive"), null === localSwitchState && (localSwitchState = !0), eadataStore("eaActive", !localSwitchState, TTL1), setTimeout((function () {
      try { initializeExtensionFeatures() } catch (err) {}
    }
    ), 500)
  }
  ))
}
function parseSalesText(e) {
  let t = e?.split(" | ")[1]?.split(" "), n = "", a = 0;
  if (t) {
    for (let e = 0;
    e < t?.length;
    e++) if (t[e].trim().length > 0) {
      n = t[e];
      break
    }
  }
  else n = "0";
  if (n) {
    const e = n.match(/^[+]?(\d+)(mil)?/i);
    a = e ? parseInt(e[1], 10) * (e[2] ? 1e3: 1): 0
  }
  return{
    salesText: n,
    thisItemSales: a
  }
}
function upNovaiVendasAnuncio(vendas) {
  const subtitle = document.querySelector('.ui-pdp-subtitle');
  if (!subtitle) return;

  // margem visual
  if (subtitle.parentElement) {
    subtitle.parentElement.style.margin = '1rem 0';
    subtitle.style.color = '#000'
  }

  // procura um badge já inserido
  let v_a_c = subtitle.querySelector('.Novai-catalog-vendas');
  if (!v_a_c) {
    v_a_c = document.createElement('span');
    v_a_c.className = 'Novai-catalog-vendas';
    v_a_c.innerHTML =
  '<span style="display:inline-block;padding:.18rem .55rem;border-radius:8px;font-size:0.9em;'+
  'background: #fff172ff;color:#111;font-weight:700;'+
  'letter-spacing:.02em;line-height:1;">no catálogo</span><br>'+
  '<strong class="NovaiCatalogoAnuncioSales" '+
  'style="border-radius:8px;'+
  'background: #fff172ff;display:inline-block;padding:.18rem .55rem;line-height:1;font-weight:700;color: #111111;font-size:0.9em;"></strong>'+
  '<span style="font-size:.9em;margin-left:.1rem;color:#111;font-weight:700;'+
  'position:relative;top:-.05em;">desse modelo e vendedor</span>';  
    subtitle.appendChild(v_a_c);
  }

  const salesNode = v_a_c.querySelector('.NovaiCatalogoAnuncioSales');
  if (salesNode) salesNode.textContent = `${vendas} vendidos`;

  subtitle.setAttribute('data-mfy-sales', String(vendas));
}

async function fetchProductDataFromPage(rawItemId, t) {
  const altPS = (typeof window !== "undefined" && window.altPreloadedState) ? window.altPreloadedState : altPreloadedState;
  let normalizedItemId = rawItemId ?? dataLayer[0]?.itemId ?? dataLayer[0]?.catalogProductId;

  if (!normalizedItemId) {
    normalizedItemId = altPS?.pageState?.itemId ?? altPS?.pageState?.catalogProductId ?? altPS?.pageState?.components?.track?.gtm_event?.itemId ?? null;
  }

  if (typeof normalizedItemId === "number") {
    normalizedItemId = `MLB${normalizedItemId}`;
  }

  if (typeof normalizedItemId === "string") {
    normalizedItemId = normalizedItemId.trim();
  }

  const idMatch = typeof normalizedItemId === "string" ? normalizedItemId.match(/MLB-?(\d+)/i) : null;
  if (idMatch) {
    normalizedItemId = `MLB${idMatch[1]}`;
  } else if (typeof normalizedItemId === "string" && /^\d+$/.test(normalizedItemId)) {
    normalizedItemId = `MLB${normalizedItemId}`;
  }

  if (!normalizedItemId) {
    console.warn("fetchProductDataFromPage: unable to determine MLB item id", { rawItemId, dataLayerSnapshot: dataLayer[0] });
    typeof t === "function" && t();
    return;
  }

  const productNumericId = normalizedItemId.replace(/^MLB-?/i, "");
  const productUrl = `https://produto.mercadolivre.com.br/MLB-${productNumericId}`;

  let n = document.getElementsByClassName("ui-pdp-header");
  n.length > 0 && ensureMainComponentSkeleton(n[0]);
  if (iscatalog = !0, itemsLocalData[normalizedItemId] || (document.dispatchEvent(new CustomEvent("GetProductData", {
    detail: {
      itemIds: [normalizedItemId]
    }
  }
  )), await new Promise((e => setTimeout(e, 100)))), itemsLocalData[normalizedItemId] && itemsLocalData[normalizedItemId].startTime && void 0 !== itemsLocalData[normalizedItemId].itemSales) {
    const n = itemsLocalData[normalizedItemId];
    updateCatalogBody({
      date_created: n.startTime,
      sold_quantity: n.itemSales
    });
    vendas = n.itemSales, n.startTime && (dataLayer[0] = dataLayer[0] || {}, dataLayer[0].startTime = n.startTime);
    let a = document.getElementsByClassName("ui-pdp-subtitle")[0];
    if (a && vendas > 0) {
  upNovaiVendasAnuncio(vendas);
}

    t()
  }
  else {
    try {
      scrapeForScripts(normalizedItemId, productUrl, !0, ((n, a) => {
        if (a) t();
        else try {
          let a, i, s = n || [], o = 0;
          if (s.length > 0) {
            let n = null, r = null, l = !1;
            for (let t of s) {
              let s = t;
              if (t.includes("<script")) {
                const e = /<script\b[^>]*>([\s\S]*?)<\/script>/i.exec(t);
                s = e ? e[1]: ""
              }
              if (s && (s.indexOf("initialState") > -1 || s.indexOf("pageState") > -1)) {
                let t = s.match(/w\[l\]\.push\((.*)\)/);
                if (t && t.length > 1) try {
                  n = JSON.parse(t[0].split("(")[1].split(")")[0]), n && (dataLayer[0] = n)
                }
                catch (e) {
                  if (s.startsWith('{"pageState":')) try {
                    n = JSON.parse(s), n.initialState || (n = n.pageState), dataLayer[0] = n
                  }
                  catch (e) {}
                }
                let d = null, m = s.match(/window\.__PRELOADED_STATE__\s*=\s*(\{[\s\S]*?\});/);
                if (m && m[1]) try {
                  d = JSON.parse(m[1]), l = !0
                }
                catch (e) {} if (!d) try {
                  d = JSON.parse(s), l = !0
                }
                catch (e) {} if (d) {
                  r = d.pageState.initialState || d.initialState;
                  let t = r?.components?.header?.subtitle ?? "";
                  i = r?.startTime ?? r?.components?.track?.gtm_event?.startTime;
                  const catalogStartTime = r?.startTime
                    ?? r?.components?.track?.gtm_event?.startTime
                    ?? r?.components?.track?.startTime
                    ?? r?.track?.gtm_event?.startTime
                    ?? r?.track?.startTime
                    ?? i;
                  const catalogSoldQuantity = r?.components?.track?.gtm_event?.sold_quantity
                    ?? r?.components?.track?.sold_quantity
                    ?? r?.sold_quantity
                    ?? r?.item?.sold_quantity
                    ?? r?.listing?.sold_quantity;
                  updateCatalogBody({
                    date_created: catalogStartTime,
                    sold_quantity: catalogSoldQuantity
                  });
                  let n = t?.split(" | ")[1]?.split(" "), s = "";
                  if (n) {
                    for (let e = 0;
                    e < n?.length;
                    e++) if (n[e].trim().length > 0) {
                      s = n[e];
                      break
                    }
                  }
                  else s = "0";
                  if (t) {
                    const t = s.match(/^[+]?(\d+)(mil)?/i);
                    a = t ? parseInt(t[1], 10) * (t[2] ? 1e3: 1): 0, i && (o = dayjs().diff(i, "day") ? dayjs().diff(i, "day"): 0, o++, (a >= 100 && o > 30 || a < 100 && o >= 90 || a < 5 && o > 45) && document.dispatchEvent(new CustomEvent("StoreProductData", {
                      detail: {
                        itemId: normalizedItemId,
                        startTime: i,
                        itemSales: a
                      }
                    }
                    )))
                  }
                  if (l) break
                }
              }
            }
            if (o > 0 && null != a) {
              vendas = a;
              dias = o;
              data_br = dayjs(i).locale("pt-br").format("DD/MM/YYYY");
              const monthlyAvg = Math.round(vendas / (dias / 30));
              if (Number.isFinite(monthlyAvg) && monthlyAvg >= 0) {
                avgMonthlySalesCount = monthlyAvg;
                media_vendas = monthlyAvg;
              } else {
                avgMonthlySalesCount = 0;
                media_vendas = "-";
              }
              NOVAI_SALES_STATE.averages.monthlySalesCount = avgMonthlySalesCount;
              let e = document.getElementsByClassName("ui-pdp-subtitle")[0];
              if (e) {
  upNovaiVendasAnuncio(vendas);
}

              let t = document.getElementById("mediabtn");
              if (t && dias > 0 && !t.querySelector(`[${NOVAI_MEDIA_VALUE_ATTR}]`)) {
                let e = `
<span class="mfy-info-icon_catalog-sales" style="margin: 0 -0.75rem 0 0.75rem;cursor:pointer;">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
       viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       class="lucide lucide-info-icon lucide-info">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
</span>
`;

let n = `
<div class="mfy-catalog-info-tooltip"
     style="pointer-events: none; display: flex; align-items:center; justify-content:center; cursor-events: none; position: absolute; bottom: 35px; left: -15rem; background-color: var(--mfy-main); padding: 0 1rem; z-index: 1000; color: white; border-radius: 0.5rem 0.5rem 0 0.5rem; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.51); width: fit-content; transition: opacity 0.4s ease-in-out; opacity: 0;">
  <div style="font-size: 0.85em;margin-right:.5rem;display:flex;align-items:center;justify-content:center;gap:0.85rem;">
    ${e}
    <span style="line-height: 1.1rem;text-align: start;padding: 0 0 0 1rem;">
      Média de vendas apenas do anúncio vencedor atual deste catálogo.
    </span>
  </div>
</div>
`;

                t.innerHTML = (isNaN(Math.round(vendas / (dias / 30))) ? "-": Math.round(vendas / (dias / 30))) + " vendas/mês" + e + n;
                let a = document.getElementsByClassName("mfy-catalog-info-tooltip")[0];
                a && (t.addEventListener("mouseover", (function () {
                  a.style.opacity = 1
                }
                )), t.addEventListener("mouseout", (function () {
                  a.style.opacity = 0
                }
                )))
              }
            }
            l && t()
          }
        }
        catch (e) {
          t()
        }
      }
      ), !1, novaiContorn)
    }
    catch (e) {}
  }
}
function buildMainComponentSkeleton() {
  return `
  <div id="main-component-skeleton" class="novai-skel-root" aria-hidden="true">
    <style>
      :root{ --novai-ml-yellow:#ffe600; }

      @keyframes novai-skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .novai-skel-root{
        font-family: Proxima Nova, -apple-system, Roboto, Arial, sans-serif;
        color:#fff;
        margin-bottom:16px;
      }

      .novai-skel-grid{
        display:grid;
        gap:16px;
      }

      @media(min-width:768px){
        .novai-skel-grid{
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
      }

      .novai-skel-card{
        position:relative;
        background:#222;
        border-radius:12px;
        padding:16px 18px;
        box-shadow:var(--novai-shadow, 0 6px 18px rgba(0,0,0,.12));
        overflow:hidden;
      }

      .novai-skel-card::before{
        content:"";
        position:absolute;
        top:0; left:0; right:0;
        height:4px;
        background:var(--novai-ml-yellow,#ffe600);
        border-top-left-radius:inherit;
        border-top-right-radius:inherit;
      }

      .novai-skel-head{
        display:flex;
        align-items:center;
        gap:8px;
        margin-bottom:12px;
      }

      .novai-skel-icon{
        width:26px; height:26px;
        border-radius:999px;
        background:rgba(255,224,102,.25);
        display:inline-flex;
        align-items:center;
        justify-content:center;
        font-size:14px;
      }

      .novai-skel-title{
        text-transform:uppercase;
        letter-spacing:.04em;
        font-weight:700;
        font-size:12px;
      }

      .novai-skeleton-line,
      .novai-skel-pill,
      .novai-skel-badge{
        background:${NOVAI_SKELETON_GRADIENT};
        background-size:200% 100%;
        animation: novai-skeleton-loading 1.4s ease infinite;
      }

      .novai-skeleton-line{
        display:block;
        border-radius:999px;
      }

      .novai-skeleton-line--lg{ height:22px; width:60%; margin-bottom:10px; }
      .novai-skeleton-line--md{ height:14px; width:45%; margin-bottom:6px; }
      .novai-skeleton-line--sm{ height:12px; width:32%; }

      .novai-skel-metric{ margin-bottom:6px; }

      .novai-skel-sub{
        display:flex;
        flex-direction:column;
        gap:6px;
        margin-bottom:18px;
        color:#d1d5db;
      }

      .novai-skel-footer{
        display:flex;
        flex-wrap:wrap;
        gap:10px;
        align-items:center;
        justify-content:space-between;
      }

      .novai-skel-pill,
      .novai-skel-badge{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        border-radius:999px;
        color:rgba(34,27,3,0.7);
        font-weight:700;
        min-height:1.8em;
      }

      .novai-skel-pill{ padding:.35rem 1.1rem; min-width:150px; }
      .novai-skel-badge{ padding:.25rem .9rem; min-width:120px; font-size:12px; }
    </style>

    <div class="novai-skel-grid">
      <section id="eagrossrev" class="novai-kpi-card novai-skel-card">
        <header class="novai-skel-head">
          <div class="novai-skel-icon">💰</div>
          <span class="novai-skel-title">Faturamento</span>
        </header>

        <div class="novai-skel-metric">
          <span class="novai-skeleton-line novai-skeleton-line--lg"></span>
        </div>

        <div class="novai-skel-sub">
          <span class="novai-skeleton-line novai-skeleton-line--md"></span>
          <span class="novai-skeleton-line novai-skeleton-line--sm"></span>
        </div>

        <footer class="novai-skel-footer">
          <span class="novai-skel-pill"></span>
          <span class="novai-skel-badge"></span>
        </footer>
      </section>
    </div>
  </div>
`;
}

function buildVisitsComponentSkeleton() {
  const shimmer = `background: ${NOVAI_SKELETON_GRADIENT}; background-size:200% 100%; animation: loading 1.4s ease infinite;`;
  return `
  <div id="visits-component">
    <style>
      @keyframes loading { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      .skeleton-text{ ${shimmer} border-radius:4px; height:1em; display:inline-block; }
      .skeleton-pill{ ${shimmer} border-radius:12px; height:1.2em; display:inline-block; }

      :root{ --novai-ml-yellow:#ffe600; --novai-shadow:0 6px 18px rgba(0,0,0,.12); }
      #visits-grid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }

      /* Card Novai */
      .novai-kpi-card{
        position:relative; background:#222; color:#fff; border:0;
        border-radius:12px; padding:12px 14px; box-shadow:var(--novai-shadow); overflow:hidden;
      }
      .novai-kpi-card::before{
        content:""; position:absolute; top:0; left:0; right:0; height:4px; background:var(--novai-ml-yellow);
      }
      .novai-kpi-head{ display:flex; align-items:center; gap:8px; margin-bottom:6px; }
      .novai-kpi-icon{ width:26px; height:26px; border-radius:999px; background:rgba(255,230,0,.25); display:inline-flex; align-items:center; justify-content:center; font-size:14px; }
      .novai-kpi-title{ text-transform:uppercase; letter-spacing:.04em; font-weight:700; font-size:12px; }

      /* VISITAS (card esquerdo) */
      #visits-left .novai-kpi-head #eabtn-chart{
        margin-left:auto;
        border-radius:2rem; width:26px; height:26px; padding:.14em .2em;
        display:inline-flex; align-items:center; justify-content:center;
        transition:.2s; border:1px solid rgba(255,255,255,.2);
        background:transparent;
      }
      #visits-left #eabtn-chart:hover{ background:var(--novai-ml-yellow); border-color:var(--novai-ml-yellow); }
      #visits-left #eabtn-chart:hover img{ filter:invert(1) brightness(0.2); }

      #visits-left .novai-kpi-value{
        display:block;
        margin-top:2px;
      }
      #visits-left [data-visits-total]{ display:block;                 /* 2ª linha */
        font-size:15px; font-weight:900; color:#fff; line-height:1.1;
        word-break:break-word;}
      #visits-left .visits-total-label{ display:block;                 /* 1ª linha */
        font-size:14px; font-weight:700; color:#fff; opacity:.95; line-height:1;
        margin-bottom:2px; }

      /* CONVERSÃO (card direito) */
      /* >>> força duas linhas: label em cima, valor embaixo */
      #visits-right #vendaporvisitas.venda-row{
        display:block;                 /* vira bloco para empilhar */
        margin-top:2px;
      }
      #visits-right .venda-label{
        display:block;                 /* 1ª linha */
        font-size:14px; font-weight:700; color:#fff; opacity:.95; line-height:1;
        margin-bottom:2px;
      }
      #visits-right .venda-valor{
        display:block;                 /* 2ª linha */
        font-size:15px; font-weight:900; color:#fff; line-height:1.1;
        word-break:break-word;
      }

      /* pílula da conversão: ligeiramente maior */
      #visits-right .conv-pill{
        display:inline-flex; align-items:center; gap:.4rem;
        margin-top:8px;
        background:var(--novai-ml-yellow); color:#111; border-radius:999px;
        padding:.3rem 1rem; font-weight:900; font-size:14px; width:max-content;
      }

      #eadivider{ display:none; }
      #visits-component .ui-pdp-review__amount, #visits-component .revtitle{ color:#d1d5db; }
    </style>

    <div id="visits-grid">
      <!-- ===== LEFT: VISITAS ===== -->
      <div id="visits-left" class="novai-kpi-card">
        <div class="novai-kpi-head">
          <div class="novai-kpi-icon">👁️</div>
          <div class="novai-kpi-title">VISITAS</div>

          <!-- Botão do gráfico no cabeçalho (mantém ids/classes) -->
          <div id="eabtn-chart" class="andes-button--loud background_novai andes-button">
            <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width:1.2em; margin:auto;">
            <div id="eabtn-chart-tooltip"
                 style="width:fit-content; display:none; flex-direction:column; text-align:start; line-height:1; font-size:1rem; color:var(--mfy-main); padding:1rem; opacity:0;">
              ${typeof iscatalog !== 'undefined' && iscatalog
                ? 'Anúncio com menos de 30 dias,<span style="opacity:.5;"> gráfico sem dados suficientes.</span>'
                : 'Clique para ver o gráfico de visitas.'}
            </div>
          </div>
        </div>

        <div class="novai-kpi-value">
          <span class="visits-total-label">Visitas totais:</span>
          <span data-visits-total class="skeleton-text" style="width:80px;"></span>
        </div>
      </div>

      <!-- ===== RIGHT: CONVERSÃO ===== -->
      <div id="visits-right" class="novai-kpi-card">
        <div class="novai-kpi-head">
          <div class="novai-kpi-icon">📈</div>
          <div class="novai-kpi-title">CONVERSÃO</div>
        </div>

        <!-- Vende a cada: 1ª linha (label) + 2ª linha (valor) -->
        <div id="vendaporvisitas" class="venda-row">
          <span class="venda-label">Vende a cada:</span>
          <span class="venda-valor">
            <span data-visits-per-sale class="skeleton-text" style="width:80px;"></span> visitas
          </span>
        </div>

        <!-- Conversão mais visível (pílula) -->
        <div class="conv-pill">
          <span>Conversão:</span>
          <span data-conversion-value class="conv-value">
            <span class="skeleton-text" style="width:30px;"></span>
          </span>
        </div>
      </div>
    </div>

    <div id="eadivider"></div>
  </div>
  `;
}






function updateVisitsComponentContent({
  totalVisits,
  conversion,
  visitsPerSale,
  hasSales,
  isCatalog
}) {
  const container = document.getElementById("visits-component");
  if (!container) return;

  ensureMediaWrapperInsideVisitsCard();

  if (typeof isCatalog === "boolean") {
    container.setAttribute("data-iscatalog", isCatalog ? "true" : "false");
  }

  container.setAttribute("data-loaded", "true");

  const totalNode = container.querySelector("[data-visits-total]");
  if (totalNode) {
    totalNode.textContent = totalVisits ?? "-";
    totalNode.classList.remove("skeleton-text");
    totalNode.style.removeProperty("width");
  }

  const conversionNode = container.querySelector("[data-conversion-value]");
  if (conversionNode) {
    conversionNode.textContent = conversion ?? "-";
    conversionNode.classList.remove("skeleton-text");
    conversionNode.style.removeProperty("width");
  }

  const perSaleContainer = container.querySelector("#vendaporvisitas");
  if (perSaleContainer) {
    if (!perSaleContainer.dataset.defaultDisplay) {
      perSaleContainer.dataset.defaultDisplay = perSaleContainer.style.display || "";
    }
    const perSaleNode = container.querySelector("[data-visits-per-sale]");
    if (perSaleNode) {
      perSaleNode.textContent = visitsPerSale ?? "-";
      perSaleNode.classList.remove("skeleton-text");
      perSaleNode.style.removeProperty("width");
    }
    perSaleContainer.style.display = hasSales ? perSaleContainer.dataset.defaultDisplay : "none";
  }
}
async function altInfo(e) {
  function t() {
    let e = document.getElementById("main-component-skeleton");
    if (e && e.remove(), verifDimensions(catalogData[0]?.body.attributes), dlayerFallback(), dLayerMainFallback(), "anuncio" == paginaAtual) {
      let e = eadataRetrieve("eaActive");
      null === e && (e = !0), e ? contentScpt(): altContentScpt()
    }
    else contentScpt()
  }
  const altPS = (typeof window !== 'undefined' && window.altPreloadedState) ? window.altPreloadedState : altPreloadedState;
  dataLayer[0]?.catalogProductId || (altPS?.pageState?.page !== "vip") ? await fetchProductDataFromPage(e, t) : t()
}
function askPermissions(e, t) {
  // No-op to avoid blocking overlays; always proceed to initialize features
  initializeExtensionFeatures()
}
async function getnewToken(e) {
  let refreshToken = e;
  if (!refreshToken) {
    try {
      refreshToken = eadataRetrieve(LOCAL_REFRESH_TOKEN_KEY);
    } catch (_) {
      refreshToken = null;
    }
    if (!refreshToken) {
      return !1;
    }
  }

  const headers = new Headers;
  headers.append("accept", "application/json");
  headers.append("content-type", "application/json");

  try {
    const response = await fetch("https://nossopoint-backend-flask-server.com/token_access", {
      method: "POST",
      headers,
      body: JSON.stringify({
        refresh_token: refreshToken
      })
    });

    let body = null;
    try {
      body = await response.json();
    } catch (_) {}

    if (body?.refresh_token) {
      try { eadataStore(LOCAL_REFRESH_TOKEN_KEY, body.refresh_token, TTL1); } catch (_) {}
    }

    if (response.ok && body?.access_token) {
      return appendToken(body.access_token, body.refresh_token);
    }
  } catch (_) {}

  return !1;
}
function confirmAuth(e, t) {
  // Avoid showing confirmation modals or forcing reloads
  initializeExtensionFeatures()
}
function checkrefresh() {
  initializeExtensionFeatures()
}
async function checkDatalayer() {
  // Do not prompt for permissions; proceed directly
  initializeExtensionFeatures()
}

function requestData(e, t = {}) {
  return new Promise(((n, a) => {
    const {
      method: i = "GET", body: s, headers: o, cache: r, responseEvent: l
    }
    = t, d = l || `Response_${i}_${Date.now()}_${Math.random()}`;
    let m = {};
    o instanceof Headers ? o.forEach(((e, t) => {
      m[t] = e
    }
    )): m = o;
    const c = {
      type: "REQUEST_DATA",
      responseEvent: d,
      payload: {
        url: e,
        method: i,
        body: s,
        headers: m,
        cache: r
      }
    }
    , p = e => {
      document.removeEventListener(d, p), e.detail.success ? n(e.detail.data): a(new Error(e.detail.error))
    }
    ;
    document.addEventListener(d, p), document.dispatchEvent(new CustomEvent("RequestDataEvent", {
      detail: c
    }
    ))
  }
  ))
}
function getMLinfo() {
  if ("anuncio" == paginaAtual) dataLayer && (item_ID = dataLayer[0]?.itemId ?? dataLayer[0]?.catalogProductId, altInfo(item_ID));
  else if ("lista" == paginaAtual) runOnList();
  else if ("painel" == paginaAtual && "pro" == verif && window.location.href.indexOf("hub") >= 0) {
    let e = window.location.search;
    new URLSearchParams(e);
    let t = setInterval((function () {
      if (null != document.getElementsByClassName("andes-form-control__label")[0]) {
        let e = document.getElementsByClassName("andes-form-control__label"), n = document.getElementsByClassName("sc-ui-variations__field-label");
        for (let n = 0;
        n < e.length;
        n++) if ("Código universal de produto" == e[n].innerHTML) {
          let a = '<div class="eangen" style="padding: 0em 0.5em;background: var(--mfy-main);border-radius: 1em;margin: 1.5em 1em;width: 5em;height: 5em;text-align: center;cursor: pointer;transition: all 0.35s;transform: scale(1);"> <div style="width: 2.1em;height: 2em;margin-bottom: -2em;background-color: var(--mfy-main);position: relative;top: -1em;left: -1.1em;display: flex;border-radius: 10em;"> <img src="https://i.ibb.co/7tHHPPY/icon-color.png" style="pointer-events:none;width:15px;margin: auto;filter: brightness(7.5);"></div> <img src="https://img.icons8.com/carbon-copy/100/ffffff/refresh-barcode.png" style="margin: auto;width: 100%;margin-bottom: -0.5em;"><span style=" /* margin: auto; */ font-size: 11px; color: var(--mfy-main); font-weight: 900;">Gerar EAN13</span> </div>';
          e[n].parentNode.parentNode.insertAdjacentHTML("afterbegin", a);
          let i = document.getElementsByClassName("eangen")[0];
          i.addEventListener("mouseover", (function () {
            this.style.transform = "scale(1.1)"
          }
          )), i.addEventListener("mouseout", (function () {
            this.style.transform = "scale(1)"
          }
          )), i.addEventListener("click", (function () {
            rawID ? generateEAN13(e[n], n, !1): findDocID(e[n], n, !1)
          }
          )), clearInterval(t)
        }
        for (let e = 0;
        e < n.length;
        e++) if ("Código universal de produto (opcional)" == n[e].innerHTML) {
          let a = '<div class="eangen" style="display: flex;background: var(--mfy-main);border-radius: 1em;margin: 1em 1em 0em 1em;width: 3em;height: 3em;text-align: left;cursor: pointer;transition: all 0.35s;transform: scale(1);"> <div style="width: 2.1em;height: 2em;margin-bottom: -2em;background-color: var(--mfy-main);position: relative;top: 0.5em;left: -1.5em;display: flex;padding: 0em 0.35em;border-radius: 10em;"> <img src="https://i.ibb.co/7tHHPPY/icon-color.png" style="pointer-events:none;width:15px;margin: auto;filter: brightness(7.5);"></div> <img src="https://img.icons8.com/carbon-copy/100/ffffff/refresh-barcode.png" style="display: flex;width: 3em;margin-left: -1.75em;"><span style="display: flex;margin: auto;font-size: 12px;line-height: 1em;padding-left: 0.4em;color: var(--mfy-main);font-weight: 900;">Gerar EAN13</span> </div>', i = n[e].parentNode.parentNode.parentNode.parentNode.getElementsByTagName("tbody")[0].getElementsByTagName("input");
          for (let e = 0;
          e < i.length;
          e++) null != i[e].getAttribute("uniqueid") && i[e].parentNode.parentNode.parentNode.insertAdjacentHTML("beforebegin", a);
          let s = document.getElementsByClassName("eangen");
          for (let e = 0;
          e < s.length;
          e++) s[e].addEventListener("mouseover", (function () {
            this.style.transform = "scale(1.1)"
          }
          )), s[e].addEventListener("mouseout", (function () {
            this.style.transform = "scale(1)"
          }
          )), s[e].addEventListener("click", (function () {
            null == rawID ? findDocID(s[e], e, !0): generateEAN13(s[e], e, !0)
          }
          ));
          clearInterval(t)
        }
      }
    }
    ), 500)
  }
}
async function findDocID(e, t, n) {
  console.log("Buscando documento de identidade...", novaiContorn);
  t = t || 0, await fetch(`${novaiContorn}https://api.mercadolibre.com/users/me`, eaInit).then((e => e.json())).then((e => rawID = e.identification.number ?? void 0)).catch ((function (e) {})), generateEAN13(e, t, !!n)
}
function generateEAN13(e, t, n) {
  let a = e.nextSibling, i = "";
  if (n) i = e.nextSibling.firstChild.getElementsByTagName("input")[0];
  else try {
    i = a.getElementsByTagName("input")[0], i.focus()
  }
  catch (t) {
    i = e.nextSibling.firstChild
  }
  let s = "789" + (rawID?.substr(3, 5) ?? "00000") + Math.floor(1e3 + 9e3 * Math.random()), o = s + function (e) {
    if (!e || 12 !== e.length) throw new Error("Invalid EAN 13, should have 12 digits");
    const t = [1,
    3];
    let n = 0;
    return e.split("").forEach(((e, a) => {
      n += parseInt(e, 10) * t[a % 2]
    }
    )), 10 * Math.ceil(n / 10) - n
  }
  (s).toString();
  if (n) {
    let t = e.nextSibling.lastChild.firstChild;
    t.innerHTML = o, t.setAttribute("style", "font-weight: 700; font-size: 1.1em; color: var(--mfy-main);width:16em;")
  }
  else document.getElementsByClassName("codefield")[0] ? document.getElementsByClassName("codefield")[0].innerHTML = o: document.getElementsByClassName("eangen")[0].parentElement.lastChild.innerHTML = '<span style=" font-weight: 700; font-size: 1.1em; color: var(--mfy-main);">' + o + "</span>";
  var r;
  i && (i.value = "", i.placeholder = "Cole o código abaixo neste campo."), navigator.clipboard.writeText(o), (r = document.getElementById("snackbar")).className = "show", setTimeout((() => {
    r.className = r.className.replace("show", "")
  }
  ), 3e3)
}
var verif = "pro";
eadataStore("local_userType", verif, TTL1);
const d = new Date;
let month = d.getMonth() + 1, day = d.getDate();
month <= 9 && day <= 20 && eadataStore("local_userType", verif = "pro", TTL1);
var eanotify = "";
function fetchCategoryWithCache(e, t) {
  document.dispatchEvent(new CustomEvent("GetCategoryData", {
    detail: {
      categoryId: e
    }
  }
  ));
  const n = a => {
    const {
      categoryId: i, categoryData: s
    }
    = a.detail;
    i === e && (s ? t(s): fetch(`${novaiContorn}https://api.mercadolibre.com/categories/${e}`, eaInit).then((e => e.json())).then((n => {
      n.error || document.dispatchEvent(new CustomEvent("StoreCategoryData", {
        detail: {
          categoryId: e,
          categoryData: n
        }
      }
      )), t(n)
    }
    )).catch ((function (e) {
      t(null)
    }
    )), document.removeEventListener("CategoryDataResponse", n))
  }
  ;
  document.addEventListener("CategoryDataResponse", n)
}
function contentScpt() {
  try { removeNovaiInjectedNodes("contentScpt"); } catch (_) {}
  const headerCandidates = document.getElementsByClassName("ui-pdp-header");
  if (!headerCandidates || !headerCandidates[0]) {
    console.warn("[NOVAI] Cabeçalho da PDP não encontrado para injetar os componentes de métricas.");
  }
  function e() {
    salesSpot = document.getElementsByClassName("ui-pdp-header__subtitle"), newSalesDiv = `<div id="salesfix" style="width: fit-content;display: flex;flex-direction: row;height: 14px;align-items: center;border-radius: 1rem;border: 1px solid rgba(0,0,0,0.14);padding: 1rem;position: relative;top: 8px;margin-left: 1rem;">\n    <img src="https://i.ibb.co/K7Lc6cr/metrify.png" style="width: 14px;height: 14px;position: relative;left: 1px;margin-right: -0.5rem">\n    ${vendas} vendidos\n    </div>`, iscatalog ? salesSpot[0].setAttribute("style", "display: flex;flex-direction: row;gap: 1rem; margin: 1rem 0;align-items: center;"): (salesSpot[0].firstChild.setAttribute("style", "display: flex;flex-direction: row;align-items: center;margin-bottom:1.35rem"), salesSpot[0].firstChild.style.width = "max-content")
  }
  function t() {
    var e = [];
    function t() {
      earanksearchBtn = document.getElementById("eaadvsearchBtn"), earanksearchForm = document.getElementById("eaadvsearchForm"), earanksearchResult = document.getElementById("eaadvsearchResult"), earanksearchGo = earanksearchForm.getElementsByTagName("button")[0], earanksearchValue = earanksearchForm.getElementsByTagName("input")[0];
      var t = earanksearchBtn.getElementsByTagName("img")[0];
      iscatalog || dataLayer[0]?.catalogProductId, earanksearchForm.setAttribute("style", "display: none;"), earanksearchBtn.addEventListener("click", (function () {
        e = [], [], earanksearchForm.getElementsByTagName("input")[0].value = "", earanksearchResult.setAttribute("style", "display:none;"), "rgb(52, 131, 250)" != earanksearchBtn.style.backgroundColor ? (earanksearchForm.setAttribute("style", "position: relative;top: 2.7em;z-index: 0;"), earanksearchBtn.style.backgroundColor = "rgb(52, 131, 250)", t.setAttribute("style", "width: 1.5em;height: 1.5em;position: relative;top: 0.21em;filter: brightness(11);"), earanksearchBtn.getElementsByClassName("eahiddenlabel")[0].setAttribute("style", "display:none;")): (earanksearchBtn.getElementsByClassName("eahiddenlabel")[0].removeAttribute("style"), earanksearchForm.setAttribute("style", "display:none;"), t.setAttribute("style", "width: 1.5em;height: 1.5em;position: relative;top: 0.21em;margin-right: 0.5em;"), earanksearchBtn.removeAttribute("style"))
      }
      )), earanksearchGo.addEventListener("click", (function () {
        earanksearchForm.setAttribute("style", "display:none;position: relative; z-index: 0;"), async function (t) {
          earanksearchForm.insertAdjacentHTML("afterend", `<div id="nvailoaderdiv" style="display: flex;width: 100%;">${nvailoader}<span style="position: relative;font-size: 0.86em;font-weight: 700;top: 5em;flex: 1;">Buscando este anúncio nas 20 primeiras páginas. Um momento... </span></div>`), document.getElementsByTagName("nvailoader")[0].style.marginTop = "3em";
          let n = !1;
          for (let i = 0;
          i < 20;
          i++) {
            function a(e) {
              document.getElementById("nvailoaderdiv")?.remove(), document.getElementById("eaadvsearchResult").setAttribute("style", "position: relative;top:1.75em;");
              var n = document.getElementsByTagName("earesult")[0];
              if (n.innerHTML = 'Não encontrado <span style="font-size:0.7em;position: relative;left: -10.5em;top: 1.1em;">(nas 20 primeiras páginas)</span> <span style="font-size: 0.7em;color: #00000050;display: inline-flex;letter-spacing: 0.035em;padding: 0.35em 0.75em;background-color: #ebebeb;border-radius: 1em;position: relative;right: -15.5em;top: -1.35em;">"' + t + '"</span>', n.setAttribute("style", "position:relative;top:-0.35em;"), -1 != e) {
                let a = Math.floor(e / 50) + 1, i = e % 50;
                i += 1, n.innerHTML = `${a}ª Página | ${i}º lugar <span style=" font-size: 0.7em; color: #00000050; letter-spacing: 0.035em; padding: 0.35em 0.75em; background-color: #ebebeb; border-radius: 1em;display:inline-block; margin-left: 2.1em;">"${t}"</span><br><span style="font-size: 0.77em;padding: 2em;color: var(--mfy-main);">*Após anúncios de catálogo e patrocinados.</span>`, n.setAttribute("style", "position:relative;")
              }
            }
            let s = [...e.map((e => e?.map((e => e.id))))];
            -1 !== s.join().split(",").indexOf(item_ID) && (s.join().split(","), n = !0), 0 == n ? (await fetch(`${novaiContorn}https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(t)}&offset=${50*i}`, eaInit).then((e => e.json())).then((t => e.push(t.results))).catch ((function (e) {})), i >= 19 && a(s.join().split(",").indexOf(item_ID))): a(s.join().split(",").indexOf(item_ID))
          }
        }
        (earanksearchValue.value)
      }
      ))
    }
    function n() {
      let e = document.getElementById("eamoretools"), t = !1;
      e.addEventListener("click", (function (e) {
        let n = document.getElementsByClassName("eatoolboxbar")[0];
        t ? (t = !1, n.setAttribute("class", "eatoolboxbar"), this.getElementsByTagName("img")[0].setAttribute("style", "width: 1.11em;transform: rotate(180deg);margin: 2px;transition: all 0.2s;")): (t = !0, n.setAttribute("class", "eatoolboxbar eatoolboxbaropen"), this.getElementsByTagName("img")[0].setAttribute("style", "width: 1.11em;transform: rotate(90deg);margin: 2px;transition: all 0.2s;"))
        anchorMoreToolsButton(0);
      }
      )), function () {
        const priceListing = ensureFiniteNumber(preco_Local, 0);
        NOVAI_SALES_STATE.prices.listing = priceListing;
        NOVAI_SALES_STATE.prices.catalog = priceListing;
        NOVAI_SALES_STATE.prices.local = priceListing;

        qtySold_normalized = getNormalizedSoldQtyFromPDP();
        qtySold_catalog = qtySold_normalized;
        const totalSoldCount = coerceNonNegativeInteger(vendas, qtySold_catalog);
        const monthlyCount = ensureFiniteNumber(avgMonthlySalesCount, 0);

        qtySold_period = {
          '1d': ensureFiniteNumber(monthlyCount / 30, 0),
          '7d': ensureFiniteNumber(monthlyCount * (7 / 30), 0),
          '30d': ensureFiniteNumber(monthlyCount, 0),
          '60d': ensureFiniteNumber(monthlyCount * 2, 0),
          '90d': ensureFiniteNumber(monthlyCount * 3, 0),
          total: totalSoldCount
        };

        NOVAI_SALES_STATE.qty.normalizedSoldTotal = qtySold_normalized;
        NOVAI_SALES_STATE.qty.catalogSoldTotal = qtySold_catalog;
        NOVAI_SALES_STATE.qty.period = { ...qtySold_period };
        NOVAI_SALES_STATE.averages.monthlySalesCount = monthlyCount;

        const revenueByPeriod = {
          '1d': computeListingPeriodRevenue(qtySold_period, priceListing, '1d'),
          '7d': computeListingPeriodRevenue(qtySold_period, priceListing, '7d'),
          '30d': computeAvgMonthlyRevenue(monthlyCount, priceListing),
          '60d': computeListingPeriodRevenue(qtySold_period, priceListing, '60d'),
          '90d': computeListingPeriodRevenue(qtySold_period, priceListing, '90d'),
          total: computeListingPeriodRevenue(qtySold_period, priceListing, 'total')
        };
        const revenueCatalog = computeCatalogRevenue(qtySold_catalog, priceListing);
        const a = document.getElementsByClassName("eagrossrev-title")[0];
        const i = document.getElementsByClassName("earevstats")[0];
        const s = i ? i.querySelectorAll(".eagrossrev-catalog-title") : null;
        const o = document.getElementById("eagrossrev");

        const formatCurrency = (value) => {
          const numeric = ensureFiniteNumber(value, 0);
          return parseFloat(numeric.toFixed(2)).toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        };

        const setAnuncioValue = (value) => {
          if (s?.length > 0) s[0].innerHTML = formatCurrency(value);
          else a.innerHTML = formatCurrency(value);
        };

        if (iscatalog) {
          a.setAttribute("class", "");
          a.parentElement.lastChild.remove();
          a.parentElement.setAttribute("style", "font-size: 0.92em;display: flex;font-weight: 900;");
          let t = a.parentElement.previousElementSibling || a.parentElement.previousSibling;
          if (t instanceof Element) {
            t.remove();
            a.parentElement.insertAdjacentElement("afterbegin", t);
          }
          a.parentElement.parentElement.setAttribute("style", "display: flex;flex-direction: column;");
          a.innerHTML = '<div style="padding: .2rem 1rem;margin: .2rem .75rem;font-size: .88rem;width: fit-content;border-radius:1rem;border:1px solid #ebebeb;">Catálogo & Anúncio vencedor</div>';
          o?.classList.add("novai-rev-has-breakdown");
          s?.length > 0 && (s[0].innerHTML = formatCurrency(revenueByPeriod['30d']));
          s?.length > 1 && (s[1].innerHTML = formatCurrency(revenueCatalog));
        } else {
          a.innerHTML = formatCurrency(revenueByPeriod['30d']);
          o?.classList.remove("novai-rev-has-breakdown");
        }

        i?.setAttribute("style", "transition:all 0.35s;padding: 0em 1em 0.35em 1.7em;color: #d1d5db;");
        let r = document.getElementsByClassName("ui-pdp__header-top-brand")[0], l = document.getElementsByClassName("ui-pdp-highlights")[0];
        if (r) {
          let e = r.getElementsByClassName("ui-pdp__header-top-brand__image-container")[0], t = document.getElementsByClassName("ui-pdp-subtitle")[0];
          t.parentElement.style.margin = e || l ? "1.5rem 0 0 0": "1rem 0px 1rem"
        }
        let d = document.getElementsByClassName("ui-pdp-header")[0];
        d && iscatalog && l && d.setAttribute("style", "display: block!important;");
        if (o && !o.dataset.novaiRevHover) {
          const open = () => o.classList.add("novai-rev-expanded");
          const maybeClose = (evt) => {
            const related = evt?.relatedTarget;
            setTimeout(() => {
              const stillHovering = typeof o.matches === "function" && o.matches(":hover");
              const focusInside = o.contains(document.activeElement);
              const movingInside = related ? o.contains(related) : !1;
              if (!stillHovering && !focusInside && !movingInside) {
                o.classList.remove("novai-rev-expanded");
              }
            }, 0);
          };
          o.addEventListener("mouseenter", open);
          o.addEventListener("mouseleave", maybeClose);
          o.addEventListener("focusin", open);
          o.addEventListener("focusout", maybeClose);
          o.dataset.novaiRevHover = "1";
        }
        let m = document.getElementsByClassName("revbtn1")[0], c = document.getElementsByClassName("revbtn7")[0], p = document.getElementsByClassName("revbtn30")[0], g = document.getElementsByClassName("revbtn60")[0], f = document.getElementsByClassName("revbtn90")[0], u = document.getElementsByClassName("revbtntotal")[0], y = document.getElementsByClassName("revtitle");
        const hasMonthlyRevenue = ensureFiniteNumber(revenueByPeriod['30d'], 0) > 0;
        const hasTotalRevenue = ensureFiniteNumber(revenueByPeriod.total, 0) > 0;
        dias / (vendas || 1) > 1 && m && (m.style.display = "none");
        dias <= 30 && (f && (f.style.display = "none"), g && (g.style.display = "none"));
        !hasMonthlyRevenue && (m && (m.style.display = "none"), c && (c.style.display = "none"), p && (p.style.display = "none"), g && (g.style.display = "none"), f && (f.style.display = "none"));
        !hasTotalRevenue && u && (u.style.display = "none");
        let h = document.getElementsByClassName("revperiod");
        const buttons = [m, c, p, g, f, u].filter(Boolean);
        if (s?.length > 1) {
          s[1].innerHTML = formatCurrency(revenueCatalog);
        }
        if (h?.length > 1) {
          h[1].innerHTML = " Total";
          h[1].classList.remove("revperiod");
        }
        setAnuncioValue(revenueByPeriod['30d']);
        const setActiveButton = (button) => {
          buttons.forEach((btn) => btn.classList.remove("novai-active"));
          button?.classList.add("novai-active");
        };
        const updatePeriodLabels = (label) => {
          if (y?.length > 0) {
            y[0].innerHTML = "Faturamento:";
            if (y.length > 1) y[1].innerHTML = 'Total';
          }
          for (let i = 0;
          i < h?.length;
          i++) h[i].innerHTML = label;
        };
        m?.addEventListener("click", (() => {
          setAnuncioValue(revenueByPeriod['1d']);
          updatePeriodLabels(" /dia");
          setActiveButton(m);
        }));
        c?.addEventListener("click", (() => {
          setAnuncioValue(revenueByPeriod['7d']);
          updatePeriodLabels(" /semana");
          setActiveButton(c);
        }));
        p?.addEventListener("click", (() => {
          setAnuncioValue(revenueByPeriod['30d']);
          updatePeriodLabels(" /mês");
          setActiveButton(p);
        }));
        g?.addEventListener("click", (() => {
          setAnuncioValue(revenueByPeriod['60d']);
          updatePeriodLabels(" /60 dias");
          setActiveButton(g);
        }));
        f?.addEventListener("click", (() => {
          setAnuncioValue(revenueByPeriod['90d']);
          updatePeriodLabels(" /90 dias");
          setActiveButton(f);
        }));
        u?.addEventListener("click", (() => {
          setAnuncioValue(revenueByPeriod.total);
          updatePeriodLabels(" Total");
          setActiveButton(u);
        }));
        const defaultButton = [p, c, m, g, f, u].find((btn) => btn && btn.style.display !== "none");
        defaultButton && setActiveButton(defaultButton);
        let b = document.getElementById("mfy_rev_estimate");
        b && (b.innerHTML = "Estimativa por períodos:")
      }
      ()
    }
    function a() {
      function e(e) {
        !function (e) {
          fetch("https://api.mercadolibre.com/sites/MLB/search?nickname=" + e, eaInit).then((e => e.json())).then((e => t(e))).catch ((function (e) {}))
        }
        (e.nickname)
      }
      function t(t) {
        if (null == t) {
          let t = "", n = document.getElementsByClassName("ui-box-component__title");
          for (let e = 0;
          e < n.length;
          e++) "Informações sobre o vendedor" != n[e].innerText && "Informações da loja" != n[e].innerText && "Devolução grátis" != n[e].innerText || (t = n[e].parentElement.parentElement);
          let a = `${'<span id="easellerbtn" sellerdata="none" open="false" class="andes-button--loud background_novai  andes-button" style="position:relative; z-index:1;margin-bottom: 28px;margin-top: -1em;width: 100%;"><img src="https://img.icons8.com/material-outlined/48/ffffff/individual-server.png" style="width: 1.35em;margin: 0.8em 0.2em -0.35em 0em;display: inline-block;">Informações Extras</span>'}${`<div class="smooth ui-pdp-component-list pr-16 pl-16 alinharvertical" id="sellerinfobox" style="margin: -3em 0em 0em 0em;padding: 2em 0em 1em 0em;height: 0px;overflow: hidden;opacity: 0;">${nvailoader}</div>`}`;
          "" != t && null != t?.firstChild && t?.firstChild.insertAdjacentHTML("beforebegin", a);
          let i = document.getElementById("easellerbtn"), s = document.getElementById("sellerinfobox");
          i?.addEventListener("click", (function () {
            "true" == this.getAttribute("open") ? (s.style.opacity = "0", s.style.height = "0px", s.style.margin = "-3em 0em 0em 0em", this.setAttribute("open", "false")): "false" == this.getAttribute("open") && (s.style.opacity = "1", s.style.height = "auto", s.style.margin = "-3em 0em 2em 0em", this.setAttribute("open", "true")), "none" == this.getAttribute("sellerdata") && fetch(`${novaiContorn}https://api.mercadolibre.com/users/${vendedor}`, eaInit).then((t => e(t))).catch ((function (e) {}))
          }
          ))
        }
        else {
          document.getElementById("easellerbtn").setAttribute("sellerdata", "true");
          let e = document.getElementById("sellerinfobox"), a = e.getElementsByTagName("nvailoader");
          a.length > 0 && e.removeChild(a[0]);
          let i = new Date(t.seller.registration_date).toLocaleDateString("pt-br"), s = "", o = new Date(t.seller.registration_date).getFullYear(), r = (new Date).getFullYear();
          if (parseFloat(o) < parseFloat(r)) {
            let e = parseFloat(r) - parseFloat(o);
            if (e > 1) s = `Há ${e} anos`;
            else if (1 == e) s = `Há ${e} ano`;
            else {
              let e = new Date(t.seller.registration_date), n = Math.floor(e / 864e5), a = Math.floor(new Date / 864e5);
              s = `Há ${a-n} dias`
            }
          }
          let l = t;
          function n(n) {
            l += n, function (n) {
              let a = 0, o = 0, r = 0, l = 0, d = 0, c = [];
              for (let e = 0;
              e < n.length;
              e++) {
                a += [...n[e].results.map((e => e.shipping.free_shipping))].reduce((function (e, t) {
                  return e + (!0 === t)
                }
                ), 0), o += [...n[e].results.map((e => e.shipping.logistic_type))].reduce((function (e, t) {
                  return e + ("fulfillment" === t)
                }
                ), 0);
                let t = [...n[e].results.map((e => e.price))];
                r += t.reduce((function (e, t) {
                  return e + (t <= 79)
                }
                ), 0), l += t.reduce((function (e, t) {
                  return e + (t > 79 && t <= 150)
                }
                ), 0), d += t.reduce((function (e, t) {
                  return e + (t > 150)
                }
                ), 0)
              }
              let p = n[0].available_filters;
              for (let e = 0;
              e < p.length;
              e++) "price" == p[e].id && c.push(p[e].values);
              let g = n[0].available_filters, f = [], u = [];
              for (let e = 0;
              e < g.length;
              e++) "Categories" == g[e].name && f.push(g[e]);
              for (let e = 0;
              e < f[0]?.values.length;
              e++) u.push(f[0].values[e].name);
              let y = "";
              for (let e = 0;
              e < u.length;
              e++) y += `<span style="padding: 1px 7px;border-radius:11px;font-weight: 400;font-size:12px;margin: 2px 2px;" class="andes-button--loud background_novai ">${u[e]}</span>`;
              let h = t.seller.seller_reputation.transactions.canceled, b = h / m * 100, v = `<span style="font-weight: 900;font-size: 0.92em;display: block;margin: 4px;">${r} Anúncios <span style="padding: 1px 7px;border-radius:11px;font-weight: 400;font-size:12px;margin: 2px 2px;border: 2px solid #ebebeb;">até R$79</span></span>\n\n                        <span style="font-weight: 400;font-size: 0.92em;display: block;margin: 4px;">${l} Anúncios <span style="padding: 1px 7px;border-radius:11px;font-weight: 400;font-size:12px;margin: 2px 2px;border: 2px solid #ebebeb;">R$80 até R$150</span></span>\n\n                        <span style="font-weight: 400;font-size: 0.92em;display: block;margin: 4px;">${d} Anúncios <span style="padding: 1px 7px;border-radius:11px;font-weight: 400;font-size:12px;margin: 2px 2px;border: 2px solid #ebebeb;">Acima de R$150</span></span>`, x = `<div class="ealine" style="display: flex;flex-wrap: wrap;"><img src="https://img.icons8.com/fluency-systems-regular/96/${NovaiColorMain}/shop-location.png" style="width: 2.7em;margin: 0px 7px 7px 7px;"> <div style="display: grid;"><span style="font-size: 1.1em;font-weight: 700;">${t.seller.nickname}</span><span style="font-size: 11px;margin-top: -0.75em;">Conta criada: ${i}<span class="andes-button--loud background_novai " style="margin-left: 0.5em;padding: 1px 5px;border-radius: 11px;font-weight: 900;font-size: 10px;">${s}</span></span></div></div>\n\n                        <div style="width: 100%;background: #ebebeb;height: 1px;"></div>\n                        \n                        <div class="ealine" style="display: flex;flex-wrap: wrap;margin-top: 0.5em;"> <div style="padding-left: 1em;"><span style="font-size: 1em;font-weight: 900;">Vendas totais: </span>${m} <span style="padding: 1px 7px;border-radius: 11px;font-weight: 400;font-size: 10px;background-color: #a3a3a3;" class="andes-button--loud background_novai ">${h} canceladas (${b.toFixed(1)}%)</span></div></div>\n                        \n                        <div class="ealine" style="display: flex;flex-wrap: wrap;"> <div style="padding-left: 1em;margin: 4px 0px;"><span style="font-size: 1em;font-weight: 900;">Anúncios:</span> ${t.paging.total} <span style="padding: 1px 7px;border-radius: 11px;font-weight: 400;font-size: 10px;background-color: #39b54a;margin: 0px 4px;" class="andes-button--loud background_novai ">${o} <svg xmlns="http://www.w3.org/2000/svg" class="logo-full" width="151" height="39" viewBox="0 0 151 39" data-reactroot="" style="width: 3.75em;height: auto;position: relative;top: 0.2em;padding: 0em 0em 0em 0.35em;"><g fill="#ffffff" fill-rule="evenodd"><path d="M9.577 0L0 22.286h15.962L9.577 39l25.54-25.071H19.153L28.732 0zM56.094 27.925h-6.931l5.924-24.38h19.706l-1.33 5.483H60.688l-.886 3.801h12.452l-1.33 5.483H58.433l-2.338 9.613zm33.718.439c-8.262 0-12.332-3.582-12.332-8.7 0-.402.12-1.242.202-1.608l3.546-14.51h7.052L84.774 17.91c-.04.183-.12.585-.12 1.023.04 2.01 1.732 3.948 5.158 3.948 3.707 0 5.601-2.12 6.286-4.971l3.507-14.365h7.012L103.11 18.02c-1.451 5.921-4.998 10.344-13.3 10.344zm36.014-.439h-17.732l5.924-24.38h6.932l-4.554 18.897h10.76l-1.33 5.483zm23.844 0h-17.732l5.924-24.38h6.932l-4.554 18.897H151l-1.33 5.483z"></path></g></svg></span><span style="padding: 1px 7px;border-radius: 11px;font-weight: 400;font-size: 10px;background-color: #39b54a;" class="andes-button--loud background_novai ">${a} Frete Grátis</span></div></div>\n\n                        <div class="ealine" style="display: flex;flex-wrap: wrap;"> <div style="padding-left: 1em;margin: 4px 0px;"><span style="font-size: 1em;font-weight: 900;">Anúncios por Ticket:</span><div style="border-left: 2px solid var(--mfy-main);">${v}</div></div></div>\n                        \n                        <div class="ealine" style="display: flex;flex-wrap: wrap;"> <div style="padding-left: 1em;display: flex;flex-wrap: wrap;"><span style="font-size: 1em;font-weight: 900;">Categorias principais do vendedor: </span>${y}</div></div>`;
              e.insertAdjacentHTML("afterbegin", x);
              let w = document.getElementsByClassName("ealine");
              if (iscatalog) for (let e = 1;
              e < w.length - 2;
              e++) w[e].firstElementChild.setAttribute("style", "display:inline-table;")
            }
            (n)
          }
          let d = !1, m = t.seller.seller_reputation.transactions.total, c = Math.ceil(t.paging.total / 50);
          1 == c && (d = !0);
          const p = e => Promise.all(e.map((e => {
            if (e.ok) return e.json();
            throw new Error(e.statusText)
          }
          )));
          (function () {
            let e = [];
            for (let t = 0;
            t < c;
            t++) e.push(fetch(`${novaiContorn}https://api.mercadolibre.com/sites/MLB/search?seller_id=${vendedor}&offset=${50*t}`, eaInit));
            return Promise.all(e)
          }
          )().then(p).then((e => n(e))).then(d = !0).catch ((function (e) {}))
        }
      }
      t()
    }
    function i() {
      document.getElementsByClassName("ui-pdp-breadcrumb")[0].insertAdjacentHTML("beforeend", `<div id="eacattrends" class="novai-trends-wrap" style="width:62em;">
  <style>
    :root{
      --novai-ml-yellow:#ffe600;
      --novai-shadow:0 8px 24px rgba(0,0,0,.18);
    }
    @media (prefers-color-scheme: light){
      :root{ --ntb-bg:#1f1f1f; --ntb-fg:#fff; --ntb-border:rgba(255,255,255,.12); }
    }
    @media (prefers-color-scheme: dark){
      :root{ --ntb-bg:#1b1b1b; --ntb-fg:#fff; --ntb-border:rgba(255,255,255,.10); }
    }

    .novai-trends-wrap{ display:flex; align-items:center; }

    /* Botão estilo NOVAI (SEM faixa amarela no topo) */
    #eacattrendsbtn.novai-trends-btn{
      position:relative;
      display:inline-flex; align-items:center; gap:.6rem;
      background: var(--ntb-bg, #1f1f1f);
      color: var(--ntb-fg, #fff);
      border:1px solid var(--ntb-border, rgba(255,255,255,.12));
      border-radius:999px;
      padding:.5rem .9rem;
      font-weight:900; font-size:.95rem; letter-spacing:.01em;
      box-shadow: var(--novai-shadow);
      cursor:pointer; user-select:none;
      transition: transform .14s ease, box-shadow .14s ease, border-color .14s ease, background .14s ease;
    }
    #eacattrendsbtn.novai-trends-btn:hover{
      transform: translateY(-1px);
      border-color: rgba(255,255,255,.2);
      background:#242424;
    }
    #eacattrendsbtn.novai-trends-btn:focus-visible{
      outline:2px solid var(--novai-ml-yellow);
      outline-offset:2px;
    }

    /* Ícone: fundo suave + traços brancos */
    #eacattrendsbtn .ntb-icon{
      width:28px; height:28px; border-radius:999px;
      background: rgba(255,255,255,.08);
      display:inline-flex; align-items:center; justify-content:center;
      flex: 0 0 28px;
    }
    #eacattrendsbtn .ntb-icon svg{
      width:16px; height:16px; display:block;
      stroke:#fff;                      /* ÍCONE BRANCO */
    }

    /* Texto principal */
    #eacattrendsbtn .ntb-label{
      line-height:1; white-space:nowrap;
    }

    /* Pill de categoria (SEM bolinha preta) */
    #eacattrendsbtn .ntb-pill{
      display:inline-flex; align-items:center;
      background: var(--novai-ml-yellow); color:#111;
      border-radius:999px; padding:.15rem .55rem;
      font-size:.78rem; font-weight:900;
      margin-left:.15rem;
    }
  </style>

  <button id="eacattrendsbtn" class="novai-trends-btn" type="button" aria-label="Ver termos mais buscados desta categoria">
    <span class="ntb-icon" aria-hidden="true">
      <!-- ÍCONE: lupa + seta de tendência (traços brancos) -->
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <!-- lupa -->
        <circle cx="11" cy="11" r="5"></circle>
        <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
        <!-- tendência -->
        <polyline points="7,13 10,10 12,12 16,8"></polyline>
        <polyline points="16,8 16,11"></polyline>
      </svg>
    </span>

    <span class="ntb-label">Termos mais Procurados</span>

    <span class="ntb-pill" title="Categoria atual">Buscar</span>
  </button>
</div>
`);
      let e = document.getElementById("eacattrends");
      function t() {
        n.getElementsByTagName("span")[0].innerText = "Carregando...", fetch(`${novaiContorn}https://api.mercadolibre.com/trends/MLB/${categoria_Local}`, eaInit).then((e => e.json())).then((e => function (e) {
          let n = e, a = [];
          for (let e = 0;
          e < n.length;
          e++) a.push(n[e].keyword);
          let i = a.map((e => e + "\r\n")), s = document.getElementById("eacattrends");
          s.firstChild.getElementsByTagName("span")[0].innerText = `${a.length} Resultados `, fetchCategoryWithCache(categoria_Local, (e => {
            e && (s.lastChild.lastChild.innerText = e.name)
          }
          ));
          let o = `<div id="eatrendsbox" style="margin-left:4px;margin-top: -11px;position: absolute;background: #fff;width: 21em;padding:3em 1em 1.35em 1em;box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;z-index: 2;border-radius: 7px;"><span>Lista de termos mais buscados:</span><textarea style="width: 20em;min-width: 20em;max-width: 20em;height:14em;min-height:14em;max-height:35em;margin: 4px 0px;text-transform: capitalize;" spellcheck="false">${i.join().toString()}</textarea><button id="eacopytrends" style="font-size: 1.1em;font-weight: 600;letter-spacing: -0.01em;padding: 0em 1em;border-radius: 3em;border: 0px;cursor: pointer;">Copiar tudo</button><span id="eaclosetrendsbox" style="float: right;cursor: pointer;font-size: 0.86em;">Fechar <img src="https://img.icons8.com/external-android-line-2px-amoghdesign/48/4a90e2/external-close-multimedia-line-24px-android-line-2px-amoghdesign.png" style="width: 1.5em;position: relative;top: 5px;"></span></div>`, r = document.getElementById("eatrendsbox"), l = document.getElementById("eacattrendsbtn");
          l && l.removeEventListener("click", t), r ? (r.outerHTML = "", document.getElementById("eacattrends").firstChild.insertAdjacentHTML("beforebegin", o)): (document.getElementById("eacattrends").firstChild.insertAdjacentHTML("beforebegin", o), document.getElementById("eacopytrends").addEventListener("click", (function () {
            let e = this.parentNode.getElementsByTagName("textarea")[0];
            e.select(), navigator.clipboard.writeText(e.value), this.innerText = "Copiado!"
          }
          )));
          document.getElementById("eaclosetrendsbox").addEventListener("click", (function () {
            document.getElementById("eatrendsbox").style.display = "none"
          }
          )), l && l.addEventListener("click", (function () {
            document.getElementById("eatrendsbox").style.display = "block"
          }
          ))
        }
        (e))).catch ((function (e) {}))
      }
      iscatalog ? e.setAttribute("style", "min-width:fit-content"): e.parentElement.setAttribute("style", "margin-bottom: -1.5em;");
      let n = document.getElementById("eacattrendsbtn");
      n.addEventListener("click", t)
    }
    const anchorMoreToolsButton = (retries = 3) => {
      const moreTools = document.getElementById("eamoretools");
      if (!moreTools) {
        if (retries > 0) {
          setTimeout(() => anchorMoreToolsButton(retries - 1), 250);
        }
        return;
      }

      const toolbox = document.getElementById("eatoolbox");

      const mainElement = document.querySelector("main");
      if (!mainElement) {
        if (retries > 0) {
          setTimeout(() => anchorMoreToolsButton(retries - 1), 250);
        }
        return;
      }

      try {
        const computed = window.getComputedStyle(mainElement);
        if (computed && computed.position === "static") {
          mainElement.style.position = "relative";
        }
      } catch (_) {}

      if (moreTools.parentElement !== mainElement) {
        mainElement.appendChild(moreTools);
      }

      if (toolbox && toolbox.parentElement !== mainElement) {
        mainElement.appendChild(toolbox);
      }

      moreTools.style.position = "absolute";
      moreTools.style.top = "1rem";
      moreTools.style.right = "1rem";

      if (toolbox) {
        const buttonRect = typeof moreTools.getBoundingClientRect === "function"
          ? moreTools.getBoundingClientRect()
          : null;
        const measuredWidth = buttonRect && buttonRect.width ? buttonRect.width : moreTools.offsetWidth;
        const fallbackWidth = Number.isFinite(measuredWidth) && measuredWidth > 0 ? measuredWidth : 56;
        toolbox.style.position = "absolute";
        toolbox.style.top = "1rem";
        toolbox.style.right = `calc(1rem + ${Math.round(fallbackWidth)}px)`;
        toolbox.style.display = "flex";
        toolbox.style.justifyContent = "flex-end";
        toolbox.style.alignItems = "center";
        toolbox.style.maxWidth = "min(20rem, calc(100vw - 7rem))";
        toolbox.style.width = "min(18rem, calc(100vw - 7rem))";
        toolbox.style.zIndex = "95";
      }

      if (!anchorMoreToolsButton._resizeBound) {
        anchorMoreToolsButton._resizeBound = !0;
        window.addEventListener("resize", () => anchorMoreToolsButton(0));
      }
    };

    const headerNode = spot0[0];
    if (headerNode) {
      const titleNode = headerNode.querySelector(".ui-pdp-title");
      if (titleNode) {
        titleNode.insertAdjacentHTML("afterend", analytics_ui);
      } else {
        headerNode.insertAdjacentHTML("afterbegin", analytics_ui);
      }
    }
    anchorMoreToolsButton();
    i(), function () {
      let e = document.getElementById("eahealthmeter"), t = document.getElementById("eameter_modal");
      e && e.remove(), t && t.remove()
    }
    (), t(), function () {
      let e = eadataRetrieve("eaActive");
      const t = document.getElementById("eaoffSwitch");
      if (!t) return;
      const n = t.querySelector("img");
      const a = t.querySelector(".eahiddenlabel");
      function i() {
        e = eadataRetrieve("eaActive"), null === e && (e = !0);
        if (e) {
          a && (a.innerText = " Desligar Análises"), n && (n.style.filter = "brightness(1)", n.style.transform = "scaleX(1)"), t.setAttribute("style", ""), iscatalog || (t.style.top = "0.31em");
        } else {
          a && (a.innerText = " Ligar Análises"), n && (n.style.filter = "brightness(5)", n.style.transform = "scaleX(-1)"), t.setAttribute("style", "background-color:rgb(52, 131, 250);color:#fff;");
        }
      }
      i(), t.addEventListener("click", (function () {
        e = eadataRetrieve("eaActive"), null === e && (e = !0), eadataStore("eaActive", !e, TTL1), i(), setTimeout((function () {
          try { initializeExtensionFeatures() } catch (err) {}
        }
        ), 1e3)
      }
      ))
    }
    (), n(), iscatalog && (document.getElementById("eaoffSwitch")?.setAttribute("style", "top: 0.35em;"), document.getElementById("eaadvsearchBtn")?.setAttribute("style", "left: 0.25em;")), a(), function () {
      const e = document.getElementById("highlights");
      if (e) {
        const t = e.cloneNode(!0);
        t.style.marginBottom = "1rem", e.remove(), document.querySelector(".ui-pdp-header")?.insertAdjacentElement("beforebegin", t)
      }
    }
    ()
  }
  function n(e) {
    taxaML_verif = parseFloat(e) < parseFloat(cota_minima_MLB) ? taxa_mlb - taxa_cota: taxa_mlb, taxa_percentual = (taxaML_verif / preco_Local).toFixed(3)
  }
  function a() {
    let e = setInterval((() => {
      (rad_btn = document.getElementById("simular")) && (rad_btn.checked = !0, clearInterval(e))
    }
    ), 500)
  }
  function i() {
    price_tool = `\n    <style>\n    @import url("https://fonts.cdnfonts.com/css/montserrat");\n    </style>\n\n    <div id="price-tool" style="\n          position: fixed;\n          bottom: calc(${PRICE_BUTTON_BOTTOM} + ${PRICE_BUTTON_SIZE} + ${PRICE_TOOL_GAP});\n          right: calc(${PRICE_BUTTON_RIGHT} + ${PRICE_BUTTON_SIZE} + ${PRICE_TOOL_GAP});\n          background-color: #fff;\n          box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px,\n            rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;\n          border: 0px !important;\n          z-index: ${PRICE_TOOL_Z_INDEX};\n          max-width: min(90vw, 28rem);\n          width: auto;\n          /* overflow: hidden; */\n        " class="ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical">\n        <div id="etapa2" class="smooth hdn transp" style="width: inherit; float: left; transform: translate(-10px, 0px)">\n            <div style="text-align: right; padding-left: 1.85em; width: 45%">\n                O valor <b>sugerido</b> para publicar seu anúncio é de:\n            </div>\n            <h1 class="price-tag price-tag-fraction" style="width: 53%; overflow: hidden; float: right; margin-top: -1.5em">\n                <span style="margin-right: 0.15em"><img\n                        src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"\n                        height="16" width="20" style="margin-top: 0.2em; opacity: 35%" />R$</span><span\n                    id="valor_sugerido_reais">00</span><span id="valor_sugerido_centavos"\n                    style="font-size: 0.5em; font-weight: 100">,00</span>\n            </h1>\n            <p style="float: right; margin: -1.35em 3.75em 0em 0em; font-size: 11px" class="ui-pdp-review__amount">\n                *Sugestão com alíquota..\n            </p>\n            <div class="detalhamento" id="detalhamento">\n                <ul class="ui-pdp-review__amount">\n                    <li>\n                        Seu custo:\n                        <img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"\n                            height="11" style="padding: 0em 0.5em 0em 0em" /><span class="ui-pdp-price"\n                            id="detalhe-custo">R$&nbsp; 0,00</span>\n                    </li>\n                    <li>\n                        Impostos:<img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"\n                            height="11" style="padding: 0em 0.5em 0em 0.61em" /><span class="ui-pdp-price"\n                            id="detalhe-imposto">R$&nbsp;0</span>\n                    </li>\n                    <li style="transform: translate(4px, 0px)">\n                        Seu lucro:\n                        <img alt="icon"\n                            src="https://ci5.googleusercontent.com/proxy/t9hOuXHFrNPYlckwjpVbXLSlkxMtwzLYCTIi7PchhDo9m0lT7QD15EK5HN7R_R-xZrKcTgNktsim1qXR1LlKrEKQNa030zOY_S-rBf1-Eds9chp_rizwkWlvcacgOpH-Hj7BTbJJ-tG97e7u8JhDtjRMp8DP9Bwv9jtS-VYIrGWn=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/common/back.png"\n                            height="11" style="padding: 0em 0.2em; padding-right: 0.45em" /><span class="ui-pdp-price"\n                            id="detalhe-lucro">R$&nbsp; 0,00</span>\n                    </li>\n                    <li style="transform: translate(-7px, 0px)">\n                        Taxa do ML:<img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png"\n                            height="11" style="padding-right: 0.2em; padding-left: 0.15em" />\n                        <span class="ui-pdp-price" id="detalhe-taxa">R$&nbsp; 0,00</span>\n                    </li>\n                    <li style="transform: translate(9px, 0px)">\n                        Taxa Fixa:<img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png"\n                            height="11" style="padding-right: 0.2em" />\n                        <span class="ui-pdp-price" id="detalhe-taxafixa">R$&nbsp; 0,00</span>\n                    </li>\n                    <li style="transform: translate(30px, 0px)">\n                        Envio:\n                        <img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/4AHE0GSzeLFc0tuceXt2Hib-rWVbcK8yqriCrBnrQFdt3LpCrH-NA3nyDKu-IO-65xO2yjlS7rsjGiJWV6QunadzFZlJPWqeb2Shj_fYgwagdLoTOAljMen83VI1eloEUOdeZcR4Su7DrJRWooeRNOF5nZ2fJv2BE06zEE2uKHkiVrr1vOvtY78kR28=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-mail.png"\n                            height="11" style="padding-right: 0.3em; transform: translate(-2px, 0px)" /><span\n                            class="ui-pdp-price" id="detalhe-envio">R$&nbsp; 0,00</span>\n                    </li>\n                </ul>\n            </div>\n            <a id="vermais" style="float: right; margin: 1em 7em 0em 0em">Ver mais detalhes</a>\n            <p id="eareset" style="\n              float: right;\n              margin: 1em 8.35em 0em 0em;\n              font-weight: 900;\n              color: #aeaeae;\n              font-size: 0.77em;\n              text-align: center;\n            ">
    \n                Problemas no cálculo?<br />Aperte Ctrl+Shift+R\n            </p>\n            <br />\n            <a id="refazer" style="\n              padding: 1em;\n              border-radius: 0.7em;\n              float: right;\n              margin: 1em 5.5em 0em 0em;\n            " class="andes-button--quiet">↻ Refazer simulação</a>\n        </div>\n\n        <div id="etapa1" style="margin: auto; overflow: hidden; width: 100%; margin-top: -1em" class="smooth">\n            <div id="pricetool_header" style="\n              height: 4em;\n              margin-bottom: 1.5em;\n              background-color: #f5f5f5;\n              display: flex;\n              align-items: center;\n              padding: 0em 1em;\n            ">\n                <img style="opacity: 0.21; width: 3.5rem; position: absolute; left: 0.21rem"\n                    src="https://i.ibb.co/FDxGScN/icon-gray.png" title="Metrify" />\n                <h3 style="\n                float: left;\n                font-size: 1.5rem;\n                font-family: 'Montserrat', sans-serif;\n                font-weight: 700;\n                margin-left: 1rem;\n              ">\n                    Precificador\n                </h3>\n                \n            </div>\n\n            <div id="pricetool_content" style="line-height: 1em; padding: 0em 1em">\n                <div id="pricetool_loading" class="new-loader new-hdn">\n                    <lottie-player src="${extensionPath}src/lotties/lf20_uwR49r.json" background="transparent"\n                        speed="1" style="width: 7rem; height: 7rem; margin: auto" loop autoplay></lottie-player>\n                </div>\n\n                <div id="passo-02" class="new-hdn">\n                    <div class="pt_row" style="\n                  display: flex;\n                  justify-content: center;\n                  align-items: center;\n                  flex-direction: column;\n                  padding-top: 1rem;\n                ">\n                        <span style="\n                    background: -webkit-linear-gradient(\n                      left,\n                      rgba(121, 51, 255, 1),\n                      rgba(6, 189, 252, 1)\n                    );\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                    -webkit-text-fill-color: transparent;\n                    font-size: 1.35rem;\n                    font-weight: 800;\n                    font-family: 'Montserrat', sans-serif;\n                  ">\n                            PAV Dinâmico:\n                        </span>\n                        <br />\n                        <span style="font-size: 1rem;margin-top: -0.7rem;">\n                            (Preço alvo de vendas)\n                        </span>\n\n                        <div style="\n              display: flex;\n              flex-direction: column;\n              justify-content: center;\n              align-items: center;\n              font-size: 1.75rem;\n              font-weight: 600;\n              max-width: 100%;\n              min-width: 21rem;\n              margin: 0 auto;\n              padding: 1em;\n              ">\n                            <range-slider class="rangeslider" id="pav-slider" min="7" max="100" step="0.50"></range-slider>\n                        </div>\n\n                        <span style="\n                    background: -webkit-linear-gradient(\n                      left,\n                      rgba(121, 51, 255, 1),\n                      rgba(6, 189, 252, 1)\n                    );\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                    -webkit-text-fill-color: transparent;\n                    font-size: 1.35rem;\n                    font-weight: 800;\n                    font-family: 'Montserrat', sans-serif;\n                  ">\n                            Seus Resultados:\n                        </span>\n                        <br />\n\n                        <div id="pt_highlight_result" style="width: 90%">\n                            <div style="\n                      width: 100%;\n                      border: 1px solid #00000011;\n                      border-radius: 4rem;\n                      font-size: 1.35rem;\n                      display: flex;\n                      justify-content: space-between;\n                      padding: 1em;\n                      font-family: 'Montserrat', sans-serif;\n                      margin: 0.21em 0em;\n                    ">\n                                <span style="font-weight: bold">Você recebe</span>\n                                <span id="pt_result_revenue" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div style="\n                      width: 100%;\n                      border: 1px solid #00000011;\n                      border-radius: 4rem;\n                      font-size: 1.35rem;\n                      display: flex;\n                      justify-content: space-between;\n                      padding: 1em;\n                      font-family: 'Montserrat', sans-serif;\n                      margin: 0.21em 0em;\n                    ">\n                                <span style="font-weight: bold">Lucro</span>\n                                <div>\n                                    <abbr\n                                        title="Valor de lucro final após todas as tarifas, taxas e custos (exceto tributos)."\n                                        style=" text-decoration:none">\n                                        <img id="profit_info" src="https://img.icons8.com/ios-filled/50/000000/info.png"\n                                            style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />\n                                    </abbr>\n                                    <span id="pt_result_profit" style="font-weight: 500">R$0,00</span>\n                                </div>\n                            </div>\n\n                            <div style="\n                      width: 100%;\n                      border: 1px solid #00000011;\n                      border-radius: 4rem;\n                      font-size: 1.35rem;\n                      display: flex;\n                      justify-content: space-between;\n                      padding: 1em;\n                      font-family: 'Montserrat', sans-serif;\n                      margin: 0.21em 0em;\n                    ">\n\n                                <span style="font-weight: bold">Margem/venda</span>\n                                <abbr title="Margem de lucro relativa ao preço alvo de venda cadastrado no marketplace."\n                                    style=" text-decoration:none">\n            
                            <img id="profitpct_info" src="https://img.icons8.com/ios-filled/50/000000/info.png"\n                                        style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />\n                                </abbr>\n                                <span id="pt_result_profitpct" style="font-weight: 500">0%</span>\n                            </div>\n\n                            <div style="\n                      width: 100%;\n                      border: 1px solid #00000011;\n                      border-radius: 4rem;\n                      font-size: 1.35rem;\n                      display: flex;\n                      justify-content: space-between;\n                      padding: 1em;\n                      font-family: 'Montserrat', sans-serif;\n                      margin: 0.21em 0em;\n                    ">\n                                <span style="font-weight: bold">Markup</span>\n                                <div>\n                                    <abbr\n                                        title="Percentual indicador de quanto o preço do produto está acima do seu custo de produção/compra."\n                                        style=" text-decoration:none">\n                                        <img id="markup_info" src="https://img.icons8.com/ios-filled/50/000000/info.png"\n                                            style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />\n                                    </abbr>\n                                    <span id="pt_result_markup" style="font-weight: 500">0%</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="pt_row" style="\n                  width: 77%;\n                  margin: auto;\n                  margin-top: 1.35rem;\n                  margin-bottom: 2rem;\n                ">\n                        <span style="\n                    font-size: 1.21rem;\n                    font-weight: bold;\n                    font-family: 'Montserrat', sans-serif;\n                  ">\n                            Custos de venda:\n                        </span>\n\n                        <div class="pt_row" class="andes-form-control">\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Tarifa:</span>\n                                <span id="pt_result_marketplacecut" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Impostos:</span>\n                                <span id="pt_result_tax" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Taxa Fixa:</span>\n                                <span id="pt_result_fee" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Custo:</span>\n                                <span id="pt_result_cost" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Envio:</span>\n                                <span id="pt_result_shipping" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                        </div>\n                    </div>\n\n                    <div id="pt_goback" style="\n                  display: flex;\n                  align-items: center;\n                  justify-content: center;\n                  font-weight: 600;\n                  font-size: 1.35rem;\n                  width: 90%;\n                  height: 2.5rem;\n                  border-radius: 4rem;\n                  padding: 1rem;\n                  margin: auto;\n                  margin-top: 0.1em;\n                  margin-bottom: 1rem;\n                  background: -webkit-linear-gradient(left, #3c73ff, #12b0fd);\n                  color: white;\n                  font-family: Montserrat, sans-serif;\n                  cursor: pointer;\n                  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px,\n                    rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;\n                ">\n                        Voltar\n                    </div>\n                </div>\n\n                <div id="passo-01">\n                    <div class="pt_row">\n                        <span style="\n                    background: -webkit-linear-gradient(\n                      left,\n                      rgba(121, 51, 255, 1),\n                      rgba(6, 189, 252, 1)\n                    );\n                    background-clip: text;\n 
                                               -webkit-background-clip: text;\n                    -webkit-text-fill-color: transparent;\n                    font-size: 1.35rem;\n                    font-weight: 800;\n                    margin: 0.5em 0em 0em 0.5em;\n                    font-family: 'Montserrat', sans-serif;\n                  ">\n                            PAV\n                        </span>\n                        <br />\n                        <span style="margin: 0.5em 0em 0em 0.5em">(Preço alvo de venda)\n                        </span>\n\n                        <div class="andes-form-control" style="padding: 0em 0.7em 0em 0em; font-weight: bold">\n                            <input id="pav-input" type="number" placeholder="digite o valor" style="\n                      margin: 0.5em 0em 0.5em 0.35em;\n                      font-weight: 400;\n                      background-color: #80808000;\n                      border-radius: 0.25em;\n                      border: 2px solid #00000021;\n                      width: 100%;\n                      font-size: 1em;\n                      padding: 0.35em 0.35em 0.35em 2.1em;\n                      font-family: Proxima Nova, -apple-system, Helvetica Neue,\n                        Helvetica, Roboto, Arial, sans-serif;\n                    " />\n                            <span style="position: absolute; top: 1.7rem; left: 1rem">R$:</span>\n                        </div>\n                    </div>\n\n                    <div class="pt_row" style="\n                  display: flex;\n                  justify-content: space-between;\n                  margin-top: 0.7rem;\n                  font-weight: bold;\n                " class="andes-form-control">\n                        <div id="pt_cost" style="flex: 1; padding: 0em 0.7em 0em 0.7em">\n                            <span style="\n                      font-size: 1.21rem;\n                      font-weight: bold;\n                      font-family: 'Montserrat', sans-serif;\n                    ">\n                                Custo do produto:\n                            </span>\n                            <input id="custo" type="number" style="\n                      margin: 0.5em 0em 0.5em 0.35em;\n                      font-weight: bold;\n                      background-color: #80808000;\n                      border-radius: 0.25em;\n                      border: 2px solid #00000021;\n                      width: 100%;\n                      font-size: 1.1em;\n                      padding: 0.5em 0.35em 0.5em 2em;\n                    " />\n                            <span style="position: relative; top: -2.6rem; left: 1rem">R$:</span>\n                        </div>\n\n                        <div id="pt_taxes" style="flex: 1; padding: 0em 0.7em 0em 0.7em">\n                            <span style="\n                      font-size: 1.21rem;\n                      font-weight: bold;\n                      font-family: 'Montserrat', sans-serif;\n                    ">Sua alíquota de imposto</span><input id="aliq" type="number" style="\n                      margin: 0.5em 0em 0.5em 0em;\n                      font-weight: bold;\n                      background-color: #80808000;\n                      border-radius: 0.25em;\n                      border: 2px solid #00000021;\n                      width: 100%;\n                      font-size: 1.1em;\n                      padding: 0.5em 0.35em 0.5em 0.75em;\n                    " value="0" />\n                            <span style="\n                      position: relative;\n                      top: -2.7rem;\n                      right: -7rem;\n                      font-size: 1.21rem;\n                    ">%</span>\n                        </div>\n                    </div>\n\n                    <div id="preco-ativar" style="\n                  display: flex;\n                  align-items: center;\n                  justify-content: center;\n                  font-weight: 600;\n                  font-size: 1.35rem;\n                  width: 90%;\n                  height: 4.5rem;\n                  border-radius: 7px;\n                  padding: 1rem;\n                  margin: auto;\n                  margin-top: 0.1em;\n                  margin-bottom: 1rem;\n                  background:  var(--mfy-main);\n                  color: white;\n                  font-family: Montserrat, sans-serif;\n                  cursor: pointer;\n                  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px,\n                    rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;\n                ">\n                        Simular\n                    </div>\n\n                    <div id="alerta-form1" class="hdn" style="width: 90%; margin: auto">\n                        <img src="https://img.icons8.com/officexs/16/000000/spam.png" style="width: 0.77em" /><span\n                            style="color: red; font-size: 14px; vertical-align: top">\n                            Preencha os campos acima para simular.</span>\n                    </div>\n                </div>\n\n                <div style="display: none">\n                    <iframe id="quotation-iframe" src=""></iframe>\n                    <input type="checkbox" id="simular" style="margin-left: 0.5em" /><label for="simular" style="\n                  font-size: 0.7em;\n                  float: right;\n                  display: inline-block;\n                  max-width: 6em;\n                  position: relative;\n                  left: -0.7em;\n                  top: 1em;\n                " value="false">Simular com minha conta</label>\n                    <span style="margin: 0.5em 0em 0em 0.5em">Margem de lucro desejada:\n                    </span>\n                    <div class="andes-form-control" style="padding: 0em 0em 0em 0em; font-weight: bold">\n                        <input id="margem" type="number" class="" style="\n                    margin: 0.5em 0em 0.5em 0.35em;\n                    font-weight: bold;\n                    background-color: #80808000;\n                    border-radius: 0.35em;\n                    border: 1px solid #80808047;\n                    width: 7.7em;\n                    font-size: 1em;\n                    padding: 0.35em;\n                    width: 3.5em;\n                    font-family: Proxima Nova, -apple-system, Helvetica Neue,\n                      Helvetica, Roboto, Arial, sans-serif;\n                  " />\n                        % ou R$\n                        <input id="mrgbrl" type="number" class="" style="\n                    margin: 0.5em 0em 0.5em 0.35em;\n                    font-weight: bold;\n                    background-color: #80808000;\n                    border-radius: 0.35em;\n                    border: 1px solid #80808047;\n             
                                                      width: 7.7em;\n                    font-size: 1em;\n                    padding: 0.35em;\n                    width: 7em;\n                    font-family: Proxima Nova, -apple-system, Helvetica Neue,\n                      Helvetica, Roboto, Arial, sans-serif;\n                  " />\n                    </div>\n                    </div>\n                </div>\n            </div>\n        </div>`, (() => {
          const fallbackAnchor = spot2 && spot2[0];
          const anchorElement = document.querySelector("main") || fallbackAnchor || document.body;
          mountPriceInterface(anchorElement);
        })(), function () {
      let e = "";
      switch (tipo_anuncio) {
      case "gold_pro": e = "Premium";
      break;
    case "gold_special": e = "Clássico";
    break;
  case "free": e = "Básico/Gratuito";
  break;
default : e = ""
}
const t = `<div id="mfy-admarker"
     class="ui-pdp-review__amount"
     style="font-size:0.95rem;display:inline-flex;border-radius:1em;
            color:#fff;background:#1f1f1f;box-shadow:0 2px 11px -7px rgba(0,0,0,.8);
            padding:0.2em 1.2em 0.2em 0.2em;align-items:center;width:fit-content;height:1.5rem;">
  <svg class="ui-pdp-icon ui-pdp-icon--protected"
       xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14"
       style="width:1rem;margin:-2px 7px; color:var(--novai-ml-yellow,#ffe600); fill:var(--novai-ml-yellow,#ffe600);">
    <use href="#warranty" style="fill:var(--novai-ml-yellow,#ffe600);"></use>
  </svg>
  ${e}
</div>
`;
const subtitleEl = document.getElementsByClassName("ui-pdp-subtitle")[0];
const subtitleWrapper = subtitleEl?.parentElement ?? null;
const sinceWrapper = document.getElementById(NOVAI_SINCE_WRAPPER_ID);
const existingMarker = document.getElementById("mfy-admarker");
existingMarker?.remove();
if (sinceWrapper) {
  sinceWrapper.insertAdjacentHTML("beforeend", t);
  const sinceWrapperStyle = sinceWrapper.style;
  sinceWrapperStyle.display = sinceWrapperStyle.display || "flex";
  sinceWrapperStyle.alignItems = sinceWrapperStyle.alignItems || "center";
  sinceWrapperStyle.gap = sinceWrapperStyle.gap || ".5rem";
} else if (subtitleWrapper) {
  subtitleWrapper.insertAdjacentHTML("afterbegin", t);
}
if (subtitleWrapper) {
  const parent = subtitleWrapper.parentElement;
  if (sinceWrapper && parent) {
    parent.insertBefore(subtitleWrapper, sinceWrapper.nextSibling);
  }
  subtitleWrapper.style.display = "flex";
  subtitleWrapper.style.flexDirection = "column";
  subtitleWrapper.style.alignItems = "flex-start";
  subtitleWrapper.style.gap = ".35rem";
  subtitleWrapper.style.paddingTop = "1rem";
}
}
();
var e = document.getElementById("price-tool");
e.className = "hdn", document.getElementById("preco-btn").onclick = function () {
  if (null == document.getElementById("mlfee") ? "hdn" == e.className || "hdn ui-pdp-buybox" == e.className ? e.className = "ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical": e.className = "hdn": "hdn" == e.className || "hdn ui-pdp-buybox" == e.className ? (e.className = "ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical", document.getElementById("mlfee").style.display = "none", document.getElementById("mlpft").style.display = "none"): (e.className = "hdn", document.getElementById("mlfee").style.display = "flex", document.getElementById("mlpft").style.display = "flex"), iscatalog) {
    let e = document.getElementById("preco-btn");
    e && e.parentElement?.previousSibling?.previousSibling?.classList.contains("ui-pdp-price__part__container") && e.parentElement?.previousSibling?.previousSibling?.setAttribute("style", "position: relative; left: 4rem;")
  }
}
;
var t = document.getElementById("mrgbrl"), n = document.getElementById("margem");
if (t.addEventListener("focus", (function () {
  n.setAttribute("style", "margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;color: lightgray;background-color: #80808024;border-radius: 0.35em;border: 1px solid #80808000;width: 7.7em;font-size: 1em;padding: 0.35em;width: 3.5em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"), n.setAttribute("disabled", "disabled");
  var e = document.createElement("div");
  e.setAttribute("style", "width: 3.7em;background-color: transparent;position: absolute;height: 2.7em;top: 0.35em;left: 0.2em;"), e.setAttribute("id", "overformbtn"), e.setAttribute("onclick", 'var mrgbrl=document.getElementById("mrgbrl"),mrgpct=document.getElementById("margem");mrgpct.setAttribute("style","margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 3.5em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"),mrgbrl.setAttribute("disabled","disabled");mrgpct.removeAttribute("disabled");mrgbrl.setAttribute("disabled", "disabled");mrgbrl.setAttribute("style","margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;color: lightgray;background-color: #80808024;border-radius: 0.35em;border: 1px solid #80808000;width: 7.1em;font-size: 1em;padding: 0.35em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"),this.remove()'), t.parentNode.insertBefore(e, t)
}
)), n.addEventListener("focus", (function () {
  t.setAttribute("style", "margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;color: lightgray;background-color: #80808024;border-radius: 0.35em;border: 1px solid #80808000;width: 7.1em;font-size: 1em;padding: 0.35em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"), t.setAttribute("disabled", "disabled");
  var e = document.createElement("div");
  e.setAttribute("style", "width: 7.35em;background-color: transparent;position: absolute;height: 2.7em;top: 0.35em;right: 0.5em;"), e.setAttribute("id", "overformbtn"), e.setAttribute("onclick", 'var mrgbrl=document.getElementById("mrgbrl"),mrgpct=document.getElementById("margem");mrgpct.setAttribute("style","margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;color: lightgray;background-color: #80808024;border-radius: 0.35em;border: 1px solid #80808000;width: 7.7em;font-size: 1em;padding: 0.35em;width: 3.5em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"),mrgpct.setAttribute("disabled","disabled");mrgbrl.removeAttribute("disabled"),mrgbrl.setAttribute("style","margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 7em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"),this.remove()'), t.parentNode.insertBefore(e, n), n.removeAttribute("disabled"), n.setAttribute("style", "margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 3.5em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;")
}
)), iscatalog) {
  let e = document.getElementById("price-tool");
  e.classList.add("ui-pdp-buybox"), e.parentElement.setAttribute("style", "align-items:start"), e.style.minWidth = "fit-content";
  let t = document.getElementsByClassName("ui-pdp-price__main-container");
  t.length < 2 && e.parentElement?.previousElementSibling?.setAttribute("style", "margin: 0 0 .75rem 2.2rem");
  let n = document.getElementById("preco-btn");
  if (n) {
    n.style.marginTop = "-2rem", n.nextSibling.style.margin = "-2rem 0 0 4.2rem", n.style.top = "-2rem", n.parentElement?.previousSibling?.previousSibling?.classList.contains("ui-pdp-price__part__container") && n.parentElement?.previousSibling?.previousSibling?.setAttribute("style", "position: relative; left: 4rem;"), t.length > 2 && (n.nextSibling.style.margin = "1rem 0px 0px 0rem", n.style.margin = "2.5rem -1rem 1rem 0");
    let e = n.parentElement;
    if (e) {
      e.getElementsByClassName("andes-money-amount__discount")[0] && (n.style.margin = "3rem 1rem 0rem 0px", n.nextSibling.setAttribute("style", ""))
    }
  }
  let a = document.getElementsByClassName("ui-pdp-price__second-line")[0], i = a?.parentElement, s = i?.firstChild, o = s == a, r = a.getElementsByClassName("ui-pdp-price__second-line__label");
  if (t.length > 1) {
    let e = 0;
    if (r[0] && (e = r[0].children.length), o) e > 0 ? a.firstChild.setAttribute("style", "position: relative; left: 3.1em;"): (a.firstChild.setAttribute("style", "position: relative; left: 4rem;"), a.nextSibling && a.nextSibling.style && (a.nextSibling.style.marginTop = "1rem"));
    else if (e > 2) a.style.margin = "-7rem 0rem 2rem 4rem", s.setAttribute("style", "top: -6.8rem;left: 4rem;position: relative;");
    else {
      let e = document.getElementsByClassName("ui-pdp-highlights"), t = document.getElementsByClassName("ui-vpp-coupons__pills-container");
      e.length > 0 && t.length > 0 && (a.style.margin = "0 0 -5rem 4rem", s.setAttribute("style", "top: 0;left: 4rem;position: relative;"))
    }
  }
  else(t.length = 1) && (a.style.margin = "0 0 0.75rem 0.5rem")
}
}
function s() {
  function e(t) {
    localStorage.removeItem("lastquote");
    var n = window.setInterval((function () {
      quotationData = localStorage.getItem("lastquote"), quoteObject = quotationData ? JSON.parse(quotationData): [], quoteObject?.length > 0 && (window.clearInterval(n), function () {
        if (quotationData = localStorage.getItem("lastquote"), quoteObject = quotationData ? JSON.parse(quotationData): [], quoteObject.length > 0) {
          var t = document.getElementsByTagName("range-slider");
          document.getElementById("dynamic-pav") || t[0].insertAdjacentHTML("beforebegin", `\n            <input style="font-family: 'Montserrat', sans-serif; border: 0;font-size: 1.75rem;font-weight: 600;text-align: center;" id="dynamic-pav" value="R$ ${t[0].value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}">`), document.getElementById("pricetool_loading").classList.add("new-hdn"), document.getElementById("passo-02").classList.remove("new-hdn"), iFrame.setAttribute("src", "");
          var n = document.getElementById("pt_result_tax"), a = document.getElementById("pt_result_shipping"), i = document.getElementById("pt_result_fee"), s = document.getElementById("pt_result_revenue"), o = document.getElementById("pt_result_profit"), r = document.getElementById("pt_result_profitpct"), l = document.getElementById("pt_result_markup"), d = document.getElementById("pt_result_marketplacecut"), m = quoteObject[0];
          let e = {}, b = {};
          var c = 0, p = 0, g = 0;
          try {
            e = m.bricks.find((e => "summary" === e.id)), b = e.bricks.find((e => "summary_container_col0_row3" === e.id)), c = b.bricks[0].data.text.split("R$")[1].trim(), p = m.bricks.find((e => "shipping_container" === e.id)), g = p.bricks[5].bricks[0].data.new_price.split("R$")[1].trim()
          }
          catch (t) {
            e = m.bricks[5], c = e.bricks[6].bricks[0].data.text.split("R$")[1].trim(), p = quoteObject[0].bricks[4].bricks, g = p[Object.keys(p).length - 1].bricks.find((e => null != e.data?.new_price)).data.new_price.split("R$")[1].trim()
          }
          c = c.replace(".", "").replace(",", "."), c = parseFloat(c), s.innerText = c.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          ), g = g.replace(".", "").replace(",", "."), g = parseFloat(g), a.innerText = g.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          );
          var f = PAV >= 79 ? 0: meliCurrentFee;
          i.innerText = f.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          );
          let v = PAV - c, x = PAV * (aliquota / 100);
          n.innerHTML = `<span style="font-size: 0.92rem"> (${parseFloat(aliquota).toFixed(2)}%) </span>` + x.toFixed(2).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          );
          let w = c - productCost - x;
          o.innerText = w.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          );
          let _ = w / PAV;
          r.innerText = (100 * _).toFixed(2) + "%";
          let E = w / productCost * 100;
          l.innerText = E.toFixed(2) + "%";
          let k = v - g - f;
          var u = k / PAV * 100;
          d.innerHTML = `<span style="font-size: 0.92rem"> (${u.toFixed(1)}%) </span>` + k.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          ), document.getElementById("pt_result_cost").innerText = parseFloat(productCost).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          );
          let L = document.getElementById("dynamic-pav");
          function y(e, t = 350) {
            let n;
            return (...a) => {
              clearTimeout(n), n = setTimeout((() => {
                e.apply(this, a)
              }
              ), t)
            }
          }
          L.value = PAV.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          );
          const T = y((() => h()));
          L.addEventListener("keyup", (function (e) {
            T()
          }
          ));
          const A = y((() => h()));
          t[0].addEventListener("input", (e => {
            const t = e.target, n = document.getElementById("dynamic-pav");
            n && (n.value = `R$ ${t.value.replace(".",",").toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}`), A()
          }
          ));
          let S = document.getElementById("pav-slider");
          PAV >= 79 ? (S.setAttribute("min", 79), S.setAttribute("aria-valuemin", 79), S.setAttribute("max", 5 * PAV), S.setAttribute("aria-valuemax", 5 * PAV), S.setAttribute("value", PAV)): (S.setAttribute("min", 7), S.setAttribute("aria-valuemin", 7), S.setAttribute("max", 78), S.setAttribute("aria-valuemax", 78), S.setAttribute("value", PAV));
          let B = document.getElementById("pt_goback");
          B && (B.onclick = function () {
            localStorage.removeItem("lastquote"), stepOne.classList.remove("new-hdn"), stepTwo.classList.add("new-hdn"), stepLoading.classList.add("new-hdn")
          }
          )
        }
        function h() {
          let t = document.getElementById("dynamic-pav");
          function a() {
            let e = PAV * (parseFloat(aliquota) / 100);
            n.innerHTML = `<span style="font-size: 0.92rem"> (${parseFloat(aliquota).toFixed(2)}%) </span>` + e.toFixed(2).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL"
            }
            ), d.innerHTML = `<span style="font-size: 0.92rem"> (${u.toFixed(1)}%) </span>` + (u.toFixed(1) / 100 * PAV).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL"
            }
            );
            let t = PAV - u.toFixed(1) / 100 * PAV - f - g;
            s.innerText = t.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL"
            }
            );
            let a = t - productCost - e;
            o.innerText = a.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL"
            }
            );
            let i = a / PAV * 100;
            r.innerText = i.toFixed(2) + "%";
            let m = a / productCost * 100;
            l.innerText = m.toFixed(2) + "%"
          }
          t = parseFloat(t.value.replace("R$", "")), (null == (PAV = t) || NaN == PAV || "R$ NaN" == PAV || "NaN" == PAV || "" == PAV || " " == PAV || 0 == PAV || PAV < 7) && (PAV = 7), t.value = PAV.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          }
          ), PAV < 79 && f == meliCurrentFee ? a(): PAV >= 79 && f == meliCurrentFee ? (f = 0, e(!0)): PAV >= 79 && 0 == f ? a(): PAV < 79 && 0 == f && (f = meliCurrentFee, e(!0))
        }
      }
      ())
    }
    ), 500);
    if (productCost = document.getElementById("custo")?.value, PAV = t ? parseFloat(document.getElementById("dynamic-pav")?.value.replace("R$", "")): parseFloat(document.getElementById("pav-input")?.value.replace("R$", "")), 0 == (aliquota = document.getElementById("aliq")?.value ?? 0) && (aliquota = 1e-4), "" == productCost || "" == PAV || "" == aliquota) alerta_form.classList.toggle("hdn");
    else {
      alerta_form.classList.add("hdn");
      (PAV * (Math.abs(aliquota) / 100)).toFixed(2);
      iFrame = document.getElementById("quotation-iframe"), stepOne = document.getElementById("passo-01"), stepTwo = document.getElementById("passo-02"), stepLoading = document.getElementById("pricetool_loading"), stepOne.classList.add("new-hdn"), stepLoading.classList.remove("new-hdn"), t && stepTwo.classList.add("new-hdn"), fetchCategoryWithCache(categoria_Local, (e => {
        var t;
        e && (t = e?.settings?.catalog_domain, "" == (iFrame = document.getElementById("quotation-iframe"))?.getAttribute("src") && iFrame?.setAttribute("src", `https://www.mercadolivre.com.br/simulador-de-custos/api/refresh-calculator?user_id=${comprador}&site_id=MLB&locale=pt_BR&channels=marketplace&category_id=${categoria_Local}&domain_id=${t}&condition=new&selling_price_ML=${PAV}&listing_type_id=${tipo_anuncio}&shipping_channel=mercado_envios&listing_types_col1_row2_SUB1=installments&selling_price_MS=0`))
      }
      ))
    }
  }
  simular_btn = document.getElementById("preco-ativar"), alerta_form = document.getElementById("alerta-form1");
  let t = setInterval((() => {
    (simular_btn = document.getElementById("preco-ativar")) && (simular_btn.onclick = function () {
      e()
    }
    , clearInterval(t))
  }
  ), 350)
}
!function () {
  if ("anuncio" == paginaAtual) {
    spot0 = document.getElementsByClassName("ui-pdp-header"), spot = document.getElementsByClassName("ui-pdp-title"), title = spot[0]?.innerText, (spot2 = document.getElementsByClassName("ui-pdp-container__row--price"))[0] || (spot2 = document.getElementsByClassName("ui-pdp-price__main-container")), null != document.getElementsByClassName("ui-pdp-price__subtitles")[0] && (eapricefix = document.getElementsByClassName("ui-pdp-price__subtitles")[0].firstChild);
    let r = new Date;
    r = r.toLocaleDateString("pt-br");
    let l = document.getElementsByClassName("ui-pdp--sticky-wrapper")[iscatalog ? 2: 0];
    if (l) {
      new MutationObserver((function (e) {
        e.forEach((function (e) {
          "top: 10px;" != e.target.getAttribute("style") && "top: 10px;margin-top: 0px;" != e.target.getAttribute("style") && e.target.setAttribute("style", "top: 10px;margin-top: 0px;")
        }
        ))
      }
      )).observe(l, {
        attributes: !0,
        attributeFilter: ["style"]
      }
      )
    }
    const price_tool_fix =`<div id="price-tool" style="position: fixed;bottom: calc(1.5rem + 3.5rem + 1.5rem);right: calc(1.5rem + 3.5rem + 1.5rem);background-color: #fff;box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;border: 0px !important;z-index: 2147483646;max-width: min(90vw, 28rem);width: auto;" class="ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical"><div id="etapa2" class="smooth hdn transp" style="width: inherit;float: left;transform: translate(-10px, 0px);"><div style="text-align: right;padding-left: 1.85em;width: 45%;">O valor <b>sugerido</b> para publicar seu anúncio é de:</div><h1 class="price-tag price-tag-fraction" style="width: 53%;overflow: hidden;float: right;margin-top: -1.5em;"><span style="margin-right: 0.15em;"><img src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png" height="16" width="20" style="margin-top: 0.2em;opacity: 35%;">R$</span><span id="valor_sugerido_reais">00</span><span id="valor_sugerido_centavos" style="font-size: 0.5em;font-weight: 100;">,00</span></h1><p style="float: right;margin: -1.35em 3.75em 0em 0em;font-size: 11px;" class="ui-pdp-review__amount"> *Sugestão com alíquota..</p><div class="detalhamento" id="detalhamento"><ul class="ui-pdp-review__amount"><li>Seu custo: <img alt="icon" src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png" height="11" style="padding: 0em 0.5em 0em 0em;"><span class="ui-pdp-price" id="detalhe-custo">R$&nbsp; 0,00</span></li><li>Impostos:<img alt="icon" src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png" height="11" style="padding: 0em 0.5em 0em 0.61em;"><span class="ui-pdp-price" id="detalhe-imposto">R$&nbsp;0</span></li><li style="transform: translate(4px, 0px);">Seu lucro: <img alt="icon" src="https://ci5.googleusercontent.com/proxy/t9hOuXHFrNPYlckwjpVbXLSlkxMtwzLYCTIi7PchhDo9m0lT7QD15EK5HN7R_R-xZrKcTgNktsim1qXR1LlKrEKQNa030zOY_S-rBf1-Eds9chp_rizwkWlvcacgOpH-Hj7BTbJJ-tG97e7u8JhDtjRMp8DP9Bwv9jtS-VYIrGWn=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/common/back.png" height="11" style="padding: 0em 0.2em;padding-right: 0.45em;"><span class="ui-pdp-price" id="detalhe-lucro">R$&nbsp; 0,00</span></li><li style="transform: translate(-7px, 0px);">Taxa do ML:<img alt="icon" src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png" height="11" style="padding-right: 0.2em;padding-left: 0.15em;"> <span class="ui-pdp-price" id="detalhe-taxa">R$&nbsp; 0,00</span></li><li style="transform: translate(9px, 0px);">Taxa Fixa:<img alt="icon" src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png" height="11" style="padding-right: 0.2em;/* padding-left: 0.15em; */"> <span class="ui-pdp-price" id="detalhe-taxafixa">R$&nbsp; 0,00</span></li><li style="transform: translate(30px, 0px);">Envio: <img alt="icon" src="https://ci3.googleusercontent.com/proxy/4AHE0GSzeLFc0tuceXt2Hib-rWVbcK8yqriCrBnrQFdt3LpCrH-NA3nyDKu-IO-65xO2yjlS7rsjGiJWV6QunadzFZlJPWqeb2Shj_fYgwagdLoTOAljMen83VI1111111eloEUOdeZcR4Su7DrJRWooeRNOF5nZ2fJv2BE06zEE2uKHkiVrr1vOvtY78kR28=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-mail.png" height="11" style="padding-right: 0.3em;transform: translate(-2px, 0px);"><span class="ui-pdp-price" id="detalhe-envio">R$&nbsp; 0,00</span></li></ul></div><a id="vermais" style="float: right;margin: 1em 7em 0em 0em;">Ver mais detalhes</a><p id="eareset" style="float: right;margin: 1em 8.35em 0em 0em;font-weight: 900;color: #aeaeae;font-size: 0.77em;text-align: center;">Problemas no cálculo?<br>Aperte Ctrl+Shift+R</p><br> <a id="refazer" style="padding: 1em;border-radius: 0.7em;float: right;margin: 1em 5.5em 0em 0em;" class="andes-button--quiet">↻ Refazer simulação</a></div><div style="float:left;padding: 0em 1em;" id="etapa1" class="smooth"> <img src="https://img.icons8.com/cotton/64/000000/profit-report.png" style="float: left;width: 2.5em;margin: 0em 0.53em 0em 0em;"><h3 class="ui-pdp-variations__selected-label" style="float: left;">Precificador Escalada Ecom</h3><br><h4 class="ui-pdp-color--GRAY ui-pdp-media__text" style="padding-left: 3.5em;margin-top: 0.5em;">Simule um preço de venda a partir deste anúncio com sua margem.</h4><br><div style="line-height: 1em;"> <span style="margin: 0.5em 0em 0em 0.5em;">Custo do seu produto: </span><div class="andes-form-control" style="padding: 0em 0em 0em 0.7em;font-weight: bold;"> R$:<input id="custo" type="number" class="" style="margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 5.7em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><div id="preco-ativar" class="andes-button andes-button--quiet" style="float: right;margin-top: 0.35em;"><img id="preco-img" style="width: 1.5em;position: relative;top: 0.4em;left: -0.1em;" src="https://img.icons8.com/ios-glyphs/30/ffffff/estimate.png"> Simular</div></div><div><span style="margin: 0.5em 0em 0em 0.5em;">Margem de lucro desejada: </span><div class="andes-form-control" style="padding: 0em 0em 0em 0em;font-weight: bold;"> <input id="margem" type="number" class="" style="margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 3.5em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"> % ou R$ <input id="mrgbrl" type="number" class="" style="margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 7em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"> <br> <span style=" font-size: 0.77em; position: relative; margin: 0em 0em 0em 0.5em; width: 6em; display: inline-block; text-align: right; top: 0.5em; ">Sua alíquota de imposto</span><input id="aliq" type="number" class="" style="margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 3.1em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;" value="0"> % <input type="checkbox" id="simular" style="margin-left: 0.5em;"><label for="simular" style="font-size: 0.7em;float: right;display: inline-block;max-width: 6em;position: relative;left: -0.7em;top: 1em;" value="false">Simular com minha conta</label><div id="alerta-form1" class="hdn"><img src="https://img.icons8.com/officexs/16/000000/spam.png" style="width: 0.77em;"><span style="color:red;font-size: 14px;vertical-align: top;"> Preencha os campos acima para simular.</span></div></div></div></div></div></div>`
    const btn_preco_fix =
    `<div id="preco-btn" class="andes-button andes-button--loud background_novai_black pricebtn"
     style="width: ${PRICE_BUTTON_SIZE};
            height: ${PRICE_BUTTON_SIZE};
            padding: 0;
            border-radius: 50%;
            position: fixed;
            bottom: ${PRICE_BUTTON_BOTTOM};
            right: ${PRICE_BUTTON_RIGHT};
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            z-index: ${PRICE_BUTTON_Z_INDEX};
            cursor: pointer;">
  <img id="preco-img" style="width:50%;" src="https://img.icons8.com/ios-glyphs/30/ffffff/estimate.png"/>
</div>`;
    if (iscatalog) {
      const ensureFinalPriceInterface = () => {
        if (!document.getElementById("preco-btn") || !document.getElementById("price-tool")) {
          const fallbackAnchor = document.querySelector("main") || (spot2 && spot2[0]) || document.body;
          mountPriceInterface(fallbackAnchor);
        }
      };

      ensureFinalPriceInterface();

      variationsbtn = document.getElementsByClassName("ui-pdp-variations--thumbnail");
      spot2 = document.getElementsByClassName("ui-pdp-price__subtitles");

      const priceMainContainers = document.getElementsByClassName("ui-pdp-price__main-container");
      const priceButtonElement = document.getElementById("preco-btn");

      if (!spot2[0] && priceMainContainers.length < 2) {
        spot2 = document.getElementsByClassName("ui-pdp-price__main-container");
        if (priceButtonElement) {
          priceButtonElement.style.margin = "0rem -1rem 3rem 0";
          priceButtonElement.style.float = "left";
        }
      } else if (priceMainContainers.length > 2) {
        spot2 = document.getElementsByClassName("ui-pdp-container__row--price");
        if (priceButtonElement) {
          priceButtonElement.style.margin = "0rem -1rem 3rem 0";
          priceButtonElement.style.float = "left";
        }
      }

      for (let e = 0; e < variationsbtn.length; e++) {
        variationsbtn[e].addEventListener("click", function () {
          let t = this.getAttribute("href");
          this.setAttribute("href", window.location.href.split("br/")[0] + "br" + t);
          window.location.href = this.getAttribute("href");
        });
      }
    }
    function o() {
      if (null != verif && "pro" == verif) {
        eaSince = '<div style="font-size: 0.95rem;font-weight: 700;display: inline-flex;border-radius: 1em;color: rgb(90, 90, 90);box-shadow: rgb(0, 0, 0) 0px 2px 11px -7px;padding: 0.35em 1em;position: relative;transition: 0.35s;min-width: fit-content;cursor:default" id="easince"><span style=" margin-top: 0.2em;">Criado há: ' + (isNaN(dias) ? "?": dias) + ' dia(s)</span><span style="position: absolute;top: 1.75em;font-size: 0.92em;font-weight: 200;opacity: 0;transition: all 0.35s;">(' + (data_br ?? "--/--/----") + ")</span></div>", btn = !alert_media_vendas && dias > 30 ? `<div style="display: flex;align-items: center;justify-content: start;gap: .5rem;">\n            ${eaSince}\n              <span id="mediabtn" class="andes-button--loud background_novai  andes-button" style="font-size: 12px!important;display: flex;padding-bottom: 1em;position: relative;z-index: 10;border-radius:2rem;cursor:default">\n                Média: ${iscatalog&&0==media_vendas?"-":media_vendas} vendas/mês\n              </span>\n              </div>\n              <img style="float:left;margin-right:0.35em;width:28%;margin-top: 0.45em;"`: `<div style="display: flex;align-items: center;justify-content: start;gap: .5rem;">\n            ${eaSince}\n              <div id="mediabtn" class="andes-button--loud background_novai  andes-button" style="font-size: 12px!important;display: flex;padding-bottom: 1em;position: relative;z-index: 10;border-radius:2rem;gap: 0.25rem;">\n                Média:  <div style="min-width: fit-content;font-size: 1.2rem;">${iscatalog&&0==media_vendas?"-":media_vendas}</div> <span style="font-size: .9rem;">vendas/mês</span>\n              </div>\n              <div class="easalesavg-alert" style="display: inline-flex;background: var(--mfy-main);position: relative;z-index: 11;height: 1.75em;border-radius: 100%;padding: 5px;margin-left: -0.5rem;">\n                <img src="https://img.icons8.com/material-outlined/24/ffffff/clock-alert.png">\n              </div>\n              </div>\n              <img style="float:left;margin-right:0.35em;width:28%;margin-top: 0.45em;"`, visits = '<span>? Visitas totais <span class="andes-button--loud background_novai  andes-button" style="margin-left: 0.5em;margin-top: 0.35em;font-size:14px!important;display: inherit;padding: 0.1em 0.4em;"> Conversão de <strong>?%</strong></span></span><br><span class="ui-pdp-subtitle" id="vendaporvisitas" style="position: relative;top: -0.86em;">Vende a cada x Visitas</span>';
        const c = e => e.charAt(0).toUpperCase() + e.slice(1), p = dayjs(), g = 6;
        let f = p.month() - g, u = p.year();
        f < 0 && (u -= 1, f += 12);
        const y = [], h = [];
        for (let e = 0;
        e < g;
        e++) {
          const t = dayjs().year(u).month(f + e).date(1);
          let n = c(t.locale("pt-br").format("MMM"));
          n = n.replace(".", ""), y.push(n), h.push(t.format("YYYY-MM-01"))
        }
        const b = h.map((e => dayjs(e).endOf("month").format("YYYY-MM-DD"))), v = [...h.map(((e, t) => `${novaiContorn2}https://api.mercadolibre.com/items/visits?ids=${item_ID}&date_from=${e}&date_to=${b[t]}`))], x = [];
        function o(e, t) {
          let n = document.getElementById("eagraph"), a = document.getElementById("salesestimatebtn");
          if (n) {
            n.innerHTML = '<span style="font-size: 1.5em;margin-left: 0.35em;font-weight: 700;color: #333;">Análise de Interesse</span> <br> <span style="color: var(--mfy-main);font-size: 1.35em;position: relative;top: -0.31em;margin-left: 0.35em;">dos últimos 6 meses</span><br><div id="eachart" style="width:100%;position: relative;top: -1em;left: -0.7em;"></div><button id="salesestimatebtn" class="andes-button--loud background_novai " style="margin-top: -1em;font-size: 1.1rem;width: 100%;font-weight: 800;padding: 7px 11px;border-radius: 7px;">Estimativa de vendas</button>', n.style.top = "2rem", document.getElementById("salesestimatebtn").remove(), n.insertAdjacentElement("beforeend", a), document.getElementById("salesestimatebtn").style.display = "none", document.getElementById("eachart").style.marginBottom = "-1.5em";
            const e = document.getElementById("eagraph");
            e.style.top = "1.5rem", e.style.padding = "2em 1em", iscatalog && (n.style.marginTop = "-1.65em", n.style.right = "0", n.style.marginBottom = "-5rem")
          }
          else document.getElementById("eadivider").insertAdjacentHTML("beforebegin", '<div class="hdn2 transp smooth" id="eagraph"\n    style="z-index: 111;background-color:#fff;height: fit-content;position: relative;margin-top:-4.35em;font-weight: bolder;font-size: 0.7em;text-align: left;padding: 1em;border-top: 3px solid var(--mfy-main);border-radius: 6px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 0 0 / 21%);">\n    <div style="display: flex; justify-content: space-between;">\n        <div>\n            <span style="font-size: 1.5em;margin-left: 0.35em;font-weight: 700;color: #333;">Análise de\n                Interesse</span>\n            <br>\n            <span\n                style="color: var(--mfy-main);font-size: 1.35em;position: relative;top: -0.31em;margin-left: 0.35em;">dos\n                últimos 6 meses</span>\n        </div>\n    </div>\n    <br>\n    <div id="eachart" style="width:308px!important;position: relative;top: -1em;left: -0.7em;"></div><button\n        id="salesestimatebtn" class="andes-button--loud background_novai "\n        style="margin-top: -1em;font-size: 1.1rem;width: 100%;font-weight: 800;padding: 7px 11px;border-radius: 7px;">Estimativa\n        de vendas</button>\n</div>');
          let i = {
            annotations: {
              points: []
            }
            ,
            chart: {
              locales: localePTBR,
              defaultLocale: "pt-BR",
              type: "area"
            }
            ,
            series: [{
              name: "Visitas",
              data: e
            }
            ],
            stroke: {
              curve: "smooth"
            }
            ,
            xaxis: {
              categories: y
            }
          }
          ;
          if (t) {
            let t = [], n = [];
            e.forEach(((e, n) => {
              t[n] = Math.floor(e / visitasparavender)
            }
            )), e.forEach(((e, a) => {
              n[a] = Math.floor(t[a] * preco_Local).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL"
              }
              ).trim(), i.annotations.points[a] = {
                x: a + 1,
                y: e,
                marker: {
                  size: 7,
                  fillColor: "#ffffff00",
                  strokeColor: "#ffffff00",
                  radius: 1
                }
                ,
                label: {
                  borderColor: "#ffffff00",
                  offsetY: 0,
                  style: {
                    color: "#fff",
                    background: "#00a650"
                  }
                  ,
                  text: Math.floor(t[a] * preco_Local).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL"
                  }
                  ).trim()
                }
              }
            }
            )), i.series[1] = {
              name: "Vendas estimadas",
              type: "column",
              data: t
            }
            , document.getElementById("eagraph").setAttribute("style", "z-index: 111; background-color: rgb(255, 255, 255); height: fit-content; position: absolute; margin-bottom: -5em; margin-top:.35rem; font-weight: bolder; font-size: 0.7em; text-align: left; padding: 2em 1em; border-top: 3px solid rgb(52, 131, 250); border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.21) 0px 2px 5px 0px;width: 35vw;right: 0;")
          }
          new ApexCharts(document.querySelector("#eachart"), i).render()
        }
        let w = !1, _ = !0, E = !1, k = "";
        function r() {
          let e = document.getElementById("eagraph");
          e && (e.classList.toggle("hdn2"), e.classList.toggle("transp")), visitChartOpening = !1
        }
        function l() {
          let e = document.getElementById("eabtn-chart");
          if (e) {
            if (e) {
              function t() {
                if (w) r();
                else if (w = !0, _) {
                  document.querySelector("#eachart") || async function (e) {
                    k = e.innerHTML, nvaiLoaderTotal.replaceContent(e), e.style.backgroundColor = "#ebebeb", x.length = v.length, await Promise.all(v.map(((e, t) => fetch(e, eaInit).then((e => e.json())).then((e => {
                      x[t] = parseFloat(e[0].total_visits)
                    }
                    )).catch ((function (e) {
                      x[t] = 0
                    }
                    ))))).then((() => {
                      o(x)
                    }
                    )), document.getElementById("salesestimatebtn")?.addEventListener("click", (function (e) {
                      e.target.style.visibility = "hidden", o(x, !0)
                    }
                    )), _ = !1, w = !1, e.innerHTML = k, E = !0, r(), e.style.backgroundColor = ""
                  }
                  (e)
                }
              }
              e.removeEventListener("click", t), dias > 30 ? e.addEventListener("click", t): (e.style.transition = "all 0.35s ease", e.style.alignItems = "center", e.addEventListener("mouseover", (function () {
                e.style.width = "fit-content", e.style.backgroundColor = "#ebebeb";
                const t = document.getElementById("eabtn-chart-tooltip");
                t && (t.style.display = "flex", t.style.opacity = "1")
              }
              )), e.addEventListener("mouseout", (function () {
                e.style.backgroundColor = "", e.style.width = "2.35em";
                const t = document.getElementById("eabtn-chart-tooltip");
                t && (t.style.display = "none", t.style.opacity = "0")
              }
              )))
            }
          }
          else setTimeout(l, 300)
        }
        l();
        const L = Date.now();
        function M(e) {
          if (null == e) return null;
          if (typeof e == "number" && Number.isFinite(e)) return e;
          if (typeof e == "string") {
            const t = e.trim();
            if (!t) return null;
            try {
              return M(JSON.parse(t));
            }
            catch (n) {
              const a = t.match(/-?\d[\d.,]*/);
              if (!a) return null;
              const i = a[0].replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", ".");
              const s = parseFloat(i);
              return Number.isFinite(s) ? s: null;
            }
          }
          if (Array.isArray(e)) {
            for (const t of e) {
              const n = M(t);
              if (null !== n && Number.isFinite(n)) return n;
            }
            return null;
          }
          if ("object" == typeof e) {
            if (typeof e.total_visits == "number" && Number.isFinite(e.total_visits)) return e.total_visits;
            if (typeof e.total == "number" && Number.isFinite(e.total)) return e.total;
            if (typeof e.visits == "number" && Number.isFinite(e.visits)) return e.visits;
            const t = Object.keys(e);
            for (const n of t) {
              const a = M(e[n]);
              if (null !== a && Number.isFinite(a)) return a;
            }
          }
          return null;
        }
        function d(e) {
          console.groupCollapsed("[Novai] Visits payload");
          console.log("Raw visits payload:", e);
          const n = M(e);
          console.log("Parsed total visits:", n);
          console.groupEnd();
          const a = typeof n == "number" && Number.isFinite(n) ? n: NaN;
          visitastotais = a;
          const hasVisits = Number.isFinite(a) && a > 0;
          conversaototal = hasVisits ? vendas / a: NaN;
          visitaporvenda = hasVisits ? a / (vendas > 0 ? vendas: 1): NaN;
          visitaporvenda_fix = Number.isFinite(visitaporvenda) ? parseFloat(visitaporvenda).toFixed(0): "?";
          visitasparavender = Number.isFinite(visitaporvenda) ? parseFloat(visitaporvenda_fix): NaN;
          const formattedTotalVisits = Number.isFinite(visitastotais) ? visitastotais.toLocaleString("pt-br") : "-";
          const conversionPercentage = Number.isFinite(conversaototal) ? `${(100 * conversaototal).toFixed(1)}%` : "-";
          const formattedVisitsPerSale = Number.isFinite(visitasparavender) ? visitasparavender.toLocaleString("pt-br") : "-";
          const hasSales = vendas > 0 && Number.isFinite(visitasparavender);
          const elapsed = Date.now() - L;
          const delay = Math.max(0, 800 - elapsed);
          setTimeout((() => {
            updateVisitsComponentContent({
              totalVisits: formattedTotalVisits,
              conversion: conversionPercentage,
              visitsPerSale: formattedVisitsPerSale,
              hasSales,
              isCatalog: !!iscatalog
            });
            setTimeout(l, 250);
          }
          ), delay);
        }
        const handleVisitsResponse = async e => {
          const {
            itemId: t, visitsData: n
          }
          = e.detail || {};
          console.debug("[Novai] VisitsDataResponse event", e.detail);

          try {
            if (t === item_ID && n) {
              d(n);
              return;
            }

            const authReady = await ensureAuthHeaderForRequests("métricas de visitas");
            if (!authReady) {
              const holder = document.getElementById("visits-component");
              holder && updateVisitsComponentContent({ totalVisits: "-", conversion: "-", visitsPerSale: "-", hasSales: !1, isCatalog: !!iscatalog });
              return;
            }

            const response = await fetch(`${novaiContorn2}https://api.mercadolibre.com/visits/items?ids=${item_ID}`, eaInit);
            const body = await response.json();
            console.debug("[Novai] Visits API response", body);
            d(body);
            document.dispatchEvent(new CustomEvent("StoreVisitsData", {
              detail: {
                itemId: item_ID,
                visitsData: body
              }
            }));
          }
          catch (t) {
            console.error("[Novai] Visits API error", t);
            const n = document.getElementById("visits-component");
            n && updateVisitsComponentContent({ totalVisits: "-", conversion: "-", visitsPerSale: "-", hasSales: !1, isCatalog: !!iscatalog });
          }
          finally {
            document.removeEventListener("VisitsDataResponse", handleVisitsResponse);
          }
        };

        document.addEventListener("VisitsDataResponse", handleVisitsResponse);
        document.dispatchEvent(new CustomEvent("GetVisitsData", {
          detail: {
            itemId: item_ID
          }
        }));
        function m(e) {
          let t = 0;
          function n() {
            pct_calc1 = (taxa_mlb - t) / preco_Local, pct_calc = 100 * pct_calc1, mlfee = '<br><div id="mlfee" style="background-color: #efefef; box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px; color: rgb(63, 63, 63); padding: 0em 0.77em 0.45em 0.35em; display: inline-flex; border-radius: 1em 1em 1em 0em; margin-left: 3.5em; visibility: visible;"><img src="https://img.icons8.com/plumpy/24/000000/refund-2.png" style=" position: relative; top: 0.21em; width: 1.35em; "><span style=" font-size: 0.77em; position: relative; top: 0.5em; left: 0.35em; font-weight: bolder; "><strong>' + taxa_mlb.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL"
            }
            ) + "</strong> em taxas <b>(" + pct_calc.toFixed(1) + "%)</b> </span></div>", pftcalc = preco_Local - taxa_mlb, mlpft = '<div id="mlpft" style="background-color: var(--mfy-main);color: #ffffff;padding: 0em 1em 0.45em 0.35em;display: inline-flex;border-radius: 0em 1em 1em 1em;margin-top: 0.35em;margin-left: 3.5em;"><img src="https://img.icons8.com/ios-glyphs/64/ffffff/refund-2.png" style="position: relative;top: 0.21em;width: 1.35em;"><span style="font-size: 1.1em;position: relative;top: 0.21em;left: 0.31em;font-weight: bolder;"><strong>' + pftcalc.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL"
            }
            ) + "</strong> de receita </span></div>", (() => {
            const existingFee = document.getElementById("mlfee");
            const existingProfit = document.getElementById("mlpft");
            existingFee?.remove();
            existingProfit?.remove();
            spot2[0]?.insertAdjacentHTML("beforeend", mlfee);
            spot2[0]?.insertAdjacentHTML("beforeend", mlpft);
          })()
          }
          taxa_mlb = e.sale_fee_amount, preco_Local < cota_minima_MLB ? (t = taxa_cota, n()): (t = 0, n())
        }
        (() => {
          const titleNode = spot[0];
          if (!titleNode) {
            scheduleSinceAndMediaRetry("missing-title-node");
            return;
          }
          const titleParent = titleNode.parentElement;
          titleParent && titleParent.setAttribute("style", "flex-direction: column;");
          if ("pro" === verif) {
            const wrapper = ensureSinceAndMediaContainer(titleNode);
            const numericDays = Number(dias);
            updateSinceAndMediaUI({
              days: dias,
              dateBR: data_br,
              mediaValue: iscatalog && 0 == media_vendas ? "-" : media_vendas,
              showCatalogInfo: !!(iscatalog && Number.isFinite(numericDays) && numericDays > 0),
              showMediaAlert: !!alert_media_vendas
            });
          } else {
            removeSinceAndMediaContainer();
          }
          if ("anuncio" == paginaAtual && "pro" == verif) {
            const e = Array.from(document.getElementsByClassName("ui-pdp-gallery__wrapper")), t = '<div class="eadownloadicon"><img src="https://img.icons8.com/fluency-systems-regular/48/ffffff/file-download.png" alt="Baixar imagem"></div>', a = '<span class="eagetallimgs ui-pdp-gallery__wrapper"><label class="ui-pdp-gallery__label"><div class="ui-pdp-thumbnail ui-pdp-gallery__thumbnail"><div class="eagetallimgs-inside ui-pdp-thumbnail__picture" style="background: #FFD600;padding: 1em;"><img width="44" height="44" src="https://img.icons8.com/material-rounded/24/ffffff/download-2.png" style=" position: relative; top: -0.5em;"><span style=" color: #fff; position: relative; top: -1em; font-size: 11px;">Todas</span></div></div></label></span>', i = document.getElementsByClassName("ui-pdp-gallery__column")[0], s = [];
            const n = e => {
              e.style.display = "flex", e.style.alignItems = "center", e.style.justifyContent = "center", e.style.width = "44px", e.style.height = "44px", e.style.margin = "0.5em 0 0 0.5em", e.style.background = "#FFD600", e.style.borderRadius = "12px", e.style.cursor = "pointer"
            }
            , o = e => {
              e && (e.style.width = "24px", e.style.height = "24px")
            }
            ;
            for (let r = 0;
            r < e.length;
            r++) {
              const a = e[r], l = a.getElementsByTagName("img")[0];
              if (void 0 === l) continue;
              const c = `${l.getAttribute("src").replace("_Q","_NQ").replace("NP_","NP_2X_").replace("-R","-F").replace(".webp",".jpg")}`;
              s.includes(c) || s.push(c);
              const d = l.parentNode && l.parentNode.parentNode;
              if (!d) continue;
              const u = a.querySelectorAll(".eadownloadicon");
              if (u.length > 1) for (let e = 1;
              e < u.length;
              e++) u[e].remove();
              if (0 === r) {
                if (u[0]) u[0].remove();
                continue;
              }
              let m = u[0];
              m || (d.insertAdjacentHTML("afterend", t), m = a.querySelector(".eadownloadicon"));
              if (!m) continue;
              n(m), m.dataset.eaDownloadSrc = c, m.dataset.eaDownloadIndex = r.toString();
              const g = m.querySelector("img");
              o(g);
              m.dataset.eaBound || (m.dataset.eaBound = "true", m.setAttribute("role", "button"), m.setAttribute("tabindex", "0"), m.addEventListener("click", (function () {
                const e = this.dataset.eaDownloadSrc, t = parseInt(this.dataset.eaDownloadIndex || "0", 10);
                e && f(e, "imagem" + (t + 1))
              }
              )), m.addEventListener("keydown", (function (e) {
                "Enter" !== e.key && " " !== e.key || (e.preventDefault(), this.click())
              }
              )))
            }
            i && !i.querySelector(".eagetallimgs") && i.insertAdjacentHTML("afterbegin", a);
            const r = i && i.querySelector(".eagetallimgs");
            r && (r.style.display = "flex", r.style.alignItems = "center", r.style.justifyContent = "center", r.style.cursor = "pointer", r.dataset.eaDownloadSources = JSON.stringify(s), r.dataset.eaBound || (r.dataset.eaBound = "true", r.addEventListener("click", (function () {
              let e = [];
              try {
                e = JSON.parse(this.dataset.eaDownloadSources || "[]")
              } catch (e) {
                console.error("Failed to parse download sources", e)
              }
              for (let t = 0;
              t < e.length;
              t++) f(e[t], "imagem" + (t + 1))
            }
            ))));
            async function f(e, t) {
              const n = await fetch(e), a = await n.blob(), i = URL.createObjectURL(a), s = document.createElement("a");
              s.href = i, s.download = t, document.body.appendChild(s), s.click(), document.body.removeChild(s)
            }
          }
        })(), t(), async function () {
          document.dispatchEvent(new CustomEvent("GetCategoryData", {
            detail: {
              categoryId: categoria_Local
            }
          }
          ));
          const e = t => {
            const {
              categoryId: n, categoryData: a
            }
            = t.detail;
            n === categoria_Local && a && a.listing ? m(a.listing): fetch(`${novaiContorn2}https://api.mercadolibre.com/sites/MLB/listing_prices?price=${preco_Local}&category_id=${categoria_Local}&listing_type_id=${tipo_anuncio}`, eaInit).then((e => e.json())).then((e => {
              if (a) {
                const t = {
                  ...a,
                  listing: e
                }
                ;
                document.dispatchEvent(new CustomEvent("StoreCategoryData", {
                  detail: {
                    categoryId: categoria_Local,
                    categoryData: t
                  }
                }
                ))
              }
              m(e)
            }
            )).catch ((function (e) {})), document.removeEventListener("CategoryDataResponse", e)
          }
          ;
          document.addEventListener("CategoryDataResponse", e), n(preco_Local)
        }
        (), dLayerMainFallback(), fetchCategoryWithCache(categoria_Local, (e => {
          e && (nomeCategoria = e.name)
        }
        )), setTimeout(i, 50), setTimeout(e, 150), setTimeout(a, 175), setTimeout(s, 500), setTimeout((function () {
          if (spot0[0]) {
            const headerNode = spot0[0];
            ensureVisitsComponentSkeleton(headerNode);
            let e = headerNode.parentElement;
            e.parentElement.firstElementChild
          }
        }
        ), 200)
      }
      else {
        scheduleSinceAndMediaRetry("missing-header");
      }
    }
    spot3 = document.getElementsByClassName("ui-pdp-title"), reflow = document.getElementsByClassName("ui-pdp-header__title-container"), maisFunc = document.getElementById("plusf");
    const headerEl = document.getElementsByClassName("ui-pdp-header")[0];
    const headerWrapper = headerEl?.parentNode?.parentNode ?? null;
    headerWrapper?.setAttribute("style", "max-width:352px;margin:auto;margin-right:1em;");
    const bookmarkEl = document.getElementsByClassName("ui-pdp-bookmark")[0];
    if (bookmarkEl) {
      const bookmarkStyle = "transform: scale(0.77);top: 1.21em!important;position: absolute;left: ";
      bookmarkEl.setAttribute("style", `${bookmarkStyle}${iscatalog ? "22.5" : "21.5"}em!important;`);
    }
    dataLayer && (condicao_produto = dataLayer[0]?.condition, preco_Local = dataLayer[0]?.localItemPrice, categoria_Local = dataLayer[0]?.categoryId, tipo_anuncio = dataLayer[0]?.listingType ?? document.documentElement.innerHTML.split("listing_type_id")[1]?.split('"')[2], comprador = dataLayer[0]?.buyerId, vendedor = dataLayer[0]?.sellerId, dLayer = dataLayer[0]?.startTime, item_ID = dataLayer[0]?.itemId ?? dataLayer[0]?.catalogProductId ?? null);
    const subtitleEl = document.getElementsByClassName("ui-pdp-header__subtitle")[0];
    let subtitleSales = subtitleEl?.innerHTML?.split(" | ")[1]?.split(" vendidos")[0]?.trim() ?? null;
    if ("string" == typeof subtitleSales && subtitleSales.endsWith("mil")) {
      const parsed = parseFloat(subtitleSales.replace("mil", ""));
      subtitleSales = isNaN(parsed) ? subtitleSales: 1e3 * parsed;
    } else if ("string" == typeof subtitleSales) {
      const normalized = parseFloat(subtitleSales.replace(/\./g, "").replace(",", "."));
      subtitleSales = isNaN(normalized) ? subtitleSales: normalized;
    }
    if (("string" == typeof vendas && 0 == vendas.length || null == vendas) && null != subtitleSales) vendas = subtitleSales;
    dLayer && "" == data_br ? (data_br = dayjs(dLayer).locale("pt-br").format("DD/MM/YYYY"), dataMilisec = Date.parse(dLayer), eadiff = eanow - dataMilisec, dias = Math.round(eadiff / (8.64 * Math.pow(10, 7))),
    (() => {
      if (0 == dias || isNaN(vendas)) {
        avgMonthlySalesCount = 0;
        media_vendas = "Indisponível (0 dias)";
      } else {
        const monthlyAvg = Math.round(vendas / (dias / 30));
        if (Number.isFinite(monthlyAvg) && monthlyAvg >= 0) {
          avgMonthlySalesCount = monthlyAvg;
          media_vendas = monthlyAvg;
        } else {
          avgMonthlySalesCount = 0;
          media_vendas = "Indisponível (0 dias)";
        }
      }
      NOVAI_SALES_STATE.averages.monthlySalesCount = avgMonthlySalesCount;
    })(), o()): o()
  }
}
()
}
async function ensureAuthorizationToken() {
  if (eaHeaders && "function" == typeof eaHeaders.get && eaHeaders.get("Authorization")) return !0;

  let storedAccess = getStoredAccessToken();
  let storedRefresh = getStoredRefreshToken();

  if (!storedAccess && !storedRefresh) {
    await requestAuthStateFromBackground();
    storedAccess = getStoredAccessToken();
    storedRefresh = getStoredRefreshToken();
  }

  if (storedAccess && !isAccessTokenExpired(storedAccess)) {
    return appendToken({
      access_token: storedAccess,
      refresh_token: storedRefresh
    });
  }

  if (storedRefresh) {
    const refreshed = await getnewToken(storedRefresh);
    if (refreshed) return refreshed;
  }

  console.warn("NOVAI: Nenhum token de acesso válido encontrado. Conclua o login na extensão para habilitar as métricas.");
  triggerReauthFlow("Nenhum token de acesso válido encontrado");
  return !1;
}

async function ensureAuthHeaderForRequests(context = "requisições protegidas") {
  const hasHeader = !!(eaHeaders && "function" == typeof eaHeaders.get && eaHeaders.get("Authorization"));
  if (hasHeader) return !0;

  const ensured = await ensureAuthorizationToken().catch((() => !1));
  const headerReady = !!(eaHeaders && "function" == typeof eaHeaders.get && eaHeaders.get("Authorization"));

  if (!ensured || !headerReady) {
    console.warn(`[NOVAI] ${context}: não foi possível preparar um token de acesso válido para consultas à API do Mercado Livre.`);
    triggerReauthFlow(`Falha ao preparar token para ${context}`);
    return !1;
  }

  return !0;
}

function initializeExtensionFeatures() {
  if (eaHeaders && "function" == typeof eaHeaders.get && eaHeaders.get("Authorization")) {
    dataCleanup();
    return;
  }

  if (!ensureAuthPromise) {
    ensureAuthPromise = ensureAuthorizationToken().catch((() => !1)).then((() => {
      dataCleanup();
    })).finally((() => {
      ensureAuthPromise = null;
    }));
  }
}
function storeFresh() {
  initializeExtensionFeatures()
}
async function findfreshAuth() {
  initializeExtensionFeatures()
}
function appendToken(tokenOrPayload, maybeRefreshToken) {
  let accessToken = tokenOrPayload;
  let refreshToken = maybeRefreshToken;

  if (tokenOrPayload && "object" == typeof tokenOrPayload) {
    accessToken = tokenOrPayload.access_token ?? tokenOrPayload.token ?? tokenOrPayload.accessToken;
    refreshToken = refreshToken ?? tokenOrPayload.refresh_token ?? tokenOrPayload.refreshToken;
  }

  if (!accessToken) {
    return !1;
  }
  try {
    eaHeaders.set("Authorization", `Bearer ${accessToken}`);
  } catch (_) {}
  try {
    overwriteStoredToken(LOCAL_ACCESS_TOKEN_KEY, accessToken, TTL1);
  } catch (_) {}
  if (refreshToken) {
    try { overwriteStoredToken(LOCAL_REFRESH_TOKEN_KEY, refreshToken, TTL1); } catch (_) {}
  }
  broadcastAuthTokens(accessToken, refreshToken);
  clearNovaiLoginPrompt();
  return !0;
}
function dataCleanup() {
  if ("anuncio" === paginaAtual) {
    try {
      removeNovaiInjectedNodes("data-cleanup");
    } catch (_) {}
    let e = document.getElementsByTagName("nvailoader");
    if (e) for (loader of e) loader.remove()
  }
  getMLinfo()
}
var extdataVerified = !1, userdataOk = !0, dataTrial = 0;
async function validateToken() {
  initializeExtensionFeatures()
}
function findTier() {
  verif = "pro", initializeExtensionFeatures()
}
async function registerNewAcc() {
  initializeExtensionFeatures()
}
async function getnstoreData() {
  initializeExtensionFeatures()
}
async function verifyData() {
  initializeExtensionFeatures()
}
const kFormatter = e => {
  if (Math.abs(e) > 999) {
    const t = Math.sign(e), n = (Math.abs(e) / 1e3).toFixed(1);
    return t * parseFloat(n) + "k"
  }
  return e.toString()
}
;
const TOKEN_EXPIRY_SKEW_MS = 6e4;
let ensureAuthPromise = null;

function getStoredAccessToken() {
  try {
    return eadataRetrieve(LOCAL_ACCESS_TOKEN_KEY);
  } catch (_) {
    return null;
  }
}

function getStoredRefreshToken() {
  try {
    return eadataRetrieve(LOCAL_REFRESH_TOKEN_KEY);
  } catch (_) {
    return null;
  }
}

function isAccessTokenExpired(token) {
  try {
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return !1;
    const expiry = 1e3 * payload.exp;
    return Date.now() + TOKEN_EXPIRY_SKEW_MS >= expiry;
  } catch (_) {
    return !1;
  }
}
function runOnList() {
  if ("lista" === paginaAtual) {
    preLoadedState = "object" != typeof window.__PRELOADED_STATE__ || null === window.__PRELOADED_STATE__ || window.__PRELOADED_STATE__.tagName ? altPreloadedState?.pageState: window.__PRELOADED_STATE__, listView = preLoadedState?.initialState.analytics_track.pageLayout;
    let d = document.getElementsByClassName("ui-search-results")[0] ?? document.getElementsByClassName("ui-search-layout--grid__grid__layout--grid")[0], m = d.getElementsByTagName("ol")[0] ?? d.getElementsByClassName("ui-search-layout--grid__grid")[0], c = d.querySelectorAll("li");
    var e = preLoadedState.initialState.results.filter((e => e.polycard)).map((e => e.polycard)).length > 0 ? preLoadedState.initialState.results.filter((e => e.polycard)).map((e => e.polycard)): preLoadedState.initialState.results.filter((e => e.trends_categories?.polycards))[0].trends_categories.polycards;
    c = Array.from(c), c = c.filter((e => e.classList.contains("ui-search-layout__item")));
    let p = c.length, g = p;
    var t = p;
    let f = `
<div id="ealistrequest"
     style="
      transition: all .25s;
      display:flex; align-items:center; gap:.6em; justify-content:center;
      background: linear-gradient(to bottom, #ffe600 0, #ffe600 4px, #222222 4px, #222222 100%);
      padding:.75em 2em; margin:0 0 1rem 0; border-radius:.5em;
      width:fit-content; color:#fff; font-size:.77em; cursor:pointer;
      border:1px solid #fff; box-shadow:0 6px 18px rgba(0,0,0,.06);
     ">
  <span style="font-weight:700; font-size:1.11em; letter-spacing:.01em; margin:.35em; font-family: Montserrat;">
    Buscar Métricas
  </span>
  <!-- ícone inline (sem dependências) -->
  <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"
       fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       style="display:block;">
    <!-- eixo -->
    <path d="M3 3v18h18"></path>
    <!-- linha de tendência -->
    <polyline points="6,15 10,11 13,13 18,8"></polyline>
    <!-- marcadores -->
    <circle cx="6" cy="15" r="1"></circle>
    <circle cx="10" cy="11" r="1"></circle>
    <circle cx="13" cy="13" r="1"></circle>
    <circle cx="18" cy="8" r="1"></circle>
  </svg>
</div>`;



    let u = `
    <div class="mfy-ad-listinfo_widget" style="display: flex;align-items: center;justify-content: space-between;border-radius: 5rem;margin: 0rem 1rem;position: relative; z-index:999">
    <div style="display: flex; gap: .5rem;">
    <div style="
    background-color: var(--mfy-main);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .25rem .75rem;
    border-radius: 5rem;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.02rem;
    gap: .25rem;
" class="imageset"><img width="16" height="16" src="https://img.icons8.com/material-outlined/ffffff/24/stack-of-photos--v1.png" alt="stack-of-photos--v1">10</div>
<div style="
    background-color: #fff;
    color: var(--mfy-main);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .2rem .5rem;
    border-radius: 5rem;
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: 0.02rem;
    border: 1px solid #ebebeb;
    box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;
" class="reviews"><img width="18" height="18" src="https://img.icons8.com/sf-ultralight-filled/${NovaiColorMain}/25/star.png" alt="star">4.5</div>
<div style="
    background-color: #fff;
    color: var(--mfy-main);
    display: flex;
    gap: .25rem;
    align-items: center;
    justify-content: center;
    padding: .2rem .5rem;
    border-radius: 5rem;
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: 0.02rem;
    border: 1px solid #ebebeb;
    box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;
" class="local"><img width="16" height="16" src="https://img.icons8.com/material-outlined/${NovaiColorMain}/24/visit.png" alt="box--v1">0un</div>
</div>
<div style="
      background-color: #ffe600;          /* NOVAI amarelo */
      color: #111;                        /* texto preto */
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .35rem 1rem;
      border-radius: 1rem;                /* ambos os lados arredondados */
      border: 2px solid #000;             /* borda preta */
      font-size: 1.1rem;
      font-weight: 900;
      letter-spacing: 0.02rem;
      gap: 1rem;
      box-shadow: 0 6px 18px rgba(0,0,0,.06);
      position: absolute;
      top: 0;                             /* canto superior direito */
      right: 0;
      " class="iscatalog">Catálogo</div>
    
</div>`;

  c && "pro" == verif && !document.getElementById("ealistrequest") && (m.insertAdjacentHTML("beforebegin", f), function () {
      let e = preLoadedState.initialState.results.filter((e => e.trends_categories?.polycards)).length > 0, t = preLoadedState.initialState.results.filter((e => e.trends_categories?.polycards))[0], n = e ? t.trends_categories.polycards: preLoadedState.initialState.results, i = e ? n: n.filter((e => e.id && e.id.startsWith("POLYCARD"))), s = !(!i[0]?.polycard && !e);
      i = i[0]?.polycard ? i.map((e => e.polycard)): i.filter((e => e?.id && e.id.startsWith("MLB")));
      var o = {
        imageset: null,
        reviews: null,
        medal: null,
        local: null
      }
      ;
      let l = 0;
      try {
        i.forEach(((e, t) => {
          const n = e, i = {
            reviews: s ? n?.reviews?.rating_average: n?.components?.filter((e => "reviews" === e.type))[0]?.reviews?.rating_average
          }
          ;
          Object.keys(i).forEach((e => {
            i[e] && !o[e] && (o[e] = !0)
          }
          ));
          let r = !n?.metadata?.url.startsWith("produto");
          r = null != r && r;
          let d = n?.is_ad ?? "Patrocinado" === n?.ads_promotions?.text, m = !1;
          s && n?.components.forEach((e => {
            e && "shipped_from" === e.id && e.shipped_from?.text?.includes("{vpp_full_icon}") && (m = !0)
          }
          )), m && (null == a ? a = 1: a += 1);
          let p = u, g = document.createElement("div");
          g.innerHTML = p;
          let f, y = g.firstElementChild;
          if (0 == r ? y.querySelector(".iscatalog").remove(): (y.setAttribute("catalog", !0), l++), y.querySelector(".local") && y.querySelector(".local").remove(), y.querySelector(".imageset") && y.querySelector(".imageset").remove(), d && c[t]) {
            let e = c[t].querySelector(".ui-search-item__pub-label") ?? c[t].querySelector(".poly-component__ads-promotions");
            e && e.setAttribute("style", "background-color: #ffd900ff;color: var(--mfy-dark);border-radius: 0.5em;padding: 0.25em 0.75em;font-size: 0.86em;font-weight: 800;letter-spacing: 0.01em;margin-left: 0.5em;display: flex;align-items: center;justify-content: center;text-align: center; ")
          }
          if ("listing" == listView) {
            y.style.position = "absolute", y.style.bottom = "7%";
            let e = y.querySelector(".iscatalog");
            e && (e.style.borderRadius = "0 1rem 1rem 0", e.style.position = "absolute", e.style.top = "-3.5rem", e.style.left = "-2.7rem", e.style.right = "auto")
          }
          i.reviews ? y.querySelector(".reviews").innerHTML = y.querySelector(".reviews").getElementsByTagName("img")[0].outerHTML + `${i.reviews}`: y.querySelector(".reviews").remove(), y.querySelector(".imageset") && (y.querySelector(".imageset").innerHTML = y.querySelector(".imageset").getElementsByTagName("img")[0].outerHTML + `${i.imageset}`), i.local && (y.querySelector(".local").innerHTML = y.querySelector(".local").getElementsByTagName("img")[0].outerHTML + `${i.local}`), c[t] && (f = c[t].querySelector(".ui-search-result__image") || c[t].querySelector(".poly-card__portada"));
          // Prevent duplicate widget insertion on re-init
          if (c[t] && !c[t].querySelector('.mfy-ad-listinfo_widget') && f) {
            f.insertAdjacentElement("afterend", y);
          }
        }
        ))
      }
      catch (e) {} function d(e) {
        switch (e) {
        case "imageset": return "Imagens (Soma de todas as variações)";
      case "reviews": return "Média de avaliações";
    case "local": return "Local do vendedor";
  default : return ""
}
}
(async function (e) {
  let t = document.getElementById("eabar_catalograte");
  for (;
  !t;
  ) await new Promise((e => setTimeout(e, 100))), t = document.getElementById("eabar_catalograte");
  t && (t.innerHTML = `${e.toString().padStart(2,"0")}${t.innerHTML.split("-").splice(1).join("-").split("(0%)")[0]}(${(e/g*100).toFixed(0).toString().padStart(2,"0")}%)`);
  r(null, 1 + e / g), [{
    id: "eabar_category",
    content: "Categoria"
  }
  ,
  {
    id: "eabar_fullrate",
    content: "Anúncios no Full"
  }
  ,
  {
    id: "eabar_adsrate",
    content: "Patrocinados"
  }
  ,
  {
    id: "eabar_catalograte",
    content: "Anúncios em Catálogo"
  }
  ].forEach((e => {
    let t = document.getElementById(e.id).previousElementSibling;
    t && (t.setAttribute("id", `${e.id}_sibling`), tippy(`#${e.id}_sibling`, {
      content: e.content,
      placement: "top",
      theme: "mfy"
    }
    ))
  }
  ))
}
)(l), Object.keys(o).forEach((e => {
  !0 === o[e] && tippy(`.${e}`, {
    content: `${d(e)}`,
    placement: "top",
    theme: "mfy"
  }
  )
}
))
}
());
let y = document.getElementById("ealistrequest");
function n(e) {
  let t = e.target, a = document.getElementById("ealistrequest");
  t.removeEventListener("click", n), a.style.margin = "0rem 0rem 1rem 0rem", a.outerHTML = `<div id="ealistrequest" style=" margin: 0.35rem 0.35rem 1rem 0.35rem; font-weight: 500;font-size: 1em;letter-spacing: 0.01em;font-family: Montserrat;transition: all 0.25s;display: flex;align-items: center;justify-content: center;background: #222222;/* background: linear-gradient(25deg, rgb(121 51 255) 92%, rgb(77 18 190) 100%); */padding: 0.75em 2em;border-radius: 0.5em;width: fit-content;color: #fff;font-size: 0.77em;cursor: pointer;box-shadow: rgb(0 0 0 / 10%) 0px 11px 6px -7px, rgb(0 0 0 / 13%) 0px 4px 3px -3px;">Carregando ${NvaiLoader} </div>`;
  let i = document.getElementsByClassName("mfy-ad-listinfo_widget");
  for (let e = 0;
  e < i.length;
  e++) i[e].style.display = "none";
  for (let e = 0;
  e < c.length;
  e++) l(c[e], e);
  function s(e) {
    let t = e[0], n = Array.from(t.querySelectorAll("ol > li")), a = document.getElementById("easortselect");
    a && a.addEventListener("change", (e => {
      !function (e, t) {
        let n = document.getElementById("easortselect").value, a = e[0]?.parentNode || t;
        if ("og" !== n && a) {
          let t = [...e];
          switch (n) {
          case "sales": const e = e => {
            const t = parseFloat(e.getAttribute("sales"));
            return isNaN(t) ? 0: t
          }
          ;
          t.sort(((t, n) => e(n) - e(t)));
          break;
        case "lessprice": t.sort(((e, t) => parseFloat(e.getAttribute("product-price")) - parseFloat(t.getAttribute("product-price"))));
        break;
      case "mostprice": t.sort(((e, t) => parseFloat(t.getAttribute("product-price")) - parseFloat(e.getAttribute("product-price"))));
      break;
    case "time": t.sort(((e, t) => parseFloat(e.getAttribute("product-days")) - parseFloat(t.getAttribute("product-days"))));
    break
  }
  t.forEach((e => {
    e.style.margin = "0rem 0rem 1rem 0rem", a.appendChild(e)
  }
  )), a.style.display = "flex", a.style.justifyContent = "space-around", a.querySelectorAll(".slick-active img").forEach((e => {
    e.dataset.src && (e.src = e.dataset.src)
  }
  ))
}
}
(n, t)
}
))
}
setTimeout((function () {
  // Avoid inserting the toolbar twice if it already exists (e.g., after re-init)
  if (document.getElementById("mfy-smetrics-status")) {
    // Ensure behaviors still wire up on re-init
    const t = document.getElementsByClassName("ui-search-results")[0] ?? document.getElementsByClassName("ui-search-layout--grid__grid__layout--grid")[0];
    const n = t.querySelectorAll("ol");
    s(n);
    document.getElementById("ealistrequest")?.remove();
    return;
  }
  let e = `<style>
  #mfy-spinner {
    width: 22px;
    height: 22px;
    border: 3px solid #444;
    border-top-color: #FFE600;
    border-radius: 50%;
    animation: mfy-spinner-spin 1s linear infinite;
  }

  @keyframes mfy-spinner-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
<div style="display:flex; flex-direction:row; align-items:center; justify-content:space-between; width:100%; gap:1rem; font-family: Montserrat, sans-serif; margin-bottom: 10px;">
    <div style="display:flex; flex-direction:row; align-items:center; gap:1.5rem;">
      <div id="mfy-catalog-filter-container" style="display:flex; flex-direction:row; align-items:center; gap:.5rem; background:#222; border:1px solid #383838; padding:.4rem; border-radius:8px;">
        <button type="button" data-filter="todos" class="mfy-catalog-filter-btn" style="padding: 0.5rem 1rem; border-radius: 6px; border: none; background:#FFE600; color:#111; font-weight:700; font-size: 0.9rem; cursor:pointer; transition: all .2s ease;">Todos</button>
        <button type="button" data-filter="filtrar" class="mfy-catalog-filter-btn" style="padding: 0.5rem 1rem; border-radius: 6px; border: none; background:#333; color:#eaeaea; font-weight:600; font-size: 0.9rem; cursor:pointer; transition: all .2s ease;">Catálogos</button>
        <button type="button" data-filter="ocultar" class="mfy-catalog-filter-btn" style="padding: 0.5rem 1rem; border-radius: 6px; border: none; background:#333; color:#eaeaea; font-weight:600; font-size: 0.9rem; cursor:pointer; transition: all .2s ease;">Ocultar catálogos</button>
      </div>
      <div id="mfy-smetrics-status" style="display:flex; flex-direction:row; align-items:center; min-width: 22px;">
        <div id="mfy-spinner"></div>
      </div>
    </div>
    <div style="display:flex; align-items:center; background:#222; border: 1px solid #383838; border-radius: 8px; padding: 0.4rem 0.5rem 0.4rem 1rem;">
      <span style="font-size: 0.9rem; color: #aaa; margin-right: 0.75rem; white-space: nowrap;">
        Filtrar por
      </span>
      <select disabled id="easortselect" style="appearance: none; -webkit-appearance: none; -moz-appearance: none; background: transparent; border: none; font-size: 1rem; font-weight: 700; color: #fff; font-family: Montserrat; border-radius: .4rem; padding: .15rem 1.8rem .15rem 0; cursor: pointer; outline: none; background-image: url('data:image/svg+xml,%3csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 16 16\\'%3e%3cpath fill=\\'none\\' stroke=\\'%23FFE600\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M2 5l6 6 6-6\\'/%3e%3c/svg%3e'); background-repeat: no-repeat; background-position: right 0.2rem center; background-size: 1em;">
        <option value="og" style="color:#fff;background:#111;">Selecione</option>
        <option value="time" style="color:#fff;background:#111;">Mais recentes</option>
        <option value="sales" style="color:#fff;background:#111;">Número de vendas</option>
        <option value="mostprice" style="color:#fff;background:#111;">Maior preço</option>
        <option value="lessprice" style="color:#fff;background:#111;">Menor preço</option>
      </select>
    </div>
</div>`, t = document.getElementsByClassName("ui-search-results")[0] ?? document.getElementsByClassName("ui-search-layout--grid__grid__layout--grid")[0], n = t.querySelectorAll("ol");
  n[0].insertAdjacentHTML("beforebegin", e), s(n), document.getElementById("ealistrequest")?.remove();
  const applyCatalogFilter = (lists, mode) => {
    const normalizedMode = ["todos", "ocultar", "filtrar"].includes(mode) ? mode : "todos";
    lists.forEach((listNode => {
      if (!listNode || "OL" !== listNode.tagName) return;
      Array.from(listNode.children).forEach((item => {
        if (!item || "LI" !== item.tagName) return;
        const isCatalog = "true" === item.getAttribute("catalog");
        switch (normalizedMode) {
          case "ocultar":
            item.style.display = isCatalog ? "none" : "";
            break;
          case "filtrar":
            item.style.display = isCatalog ? "" : "none";
            break;
          default:
            item.style.display = "";
        }
      }))
    }))
  };
  const setupCatalogFilterButtons = lists => {
    const container = document.getElementById("mfy-catalog-filter-container");
    if (!container) return;
    const buttons = Array.from(container.querySelectorAll("[data-filter]"));
    if (buttons.length === 0) return;
    const baseStyle = "padding: 0.35rem 0.75rem; border-radius: .4rem; border: 1px solid #333; background:#111; color:#fff; font-weight:600; cursor:pointer; transition: background .2s, color .2s;";
    const activeStyle = "padding: 0.35rem 0.75rem; border-radius: .4rem; border: 1px solid #FFE600; background:#FFE600; color:#111; font-weight:600; cursor:pointer; transition: background .2s, color .2s;";
    const setActive = activeButton => {
      buttons.forEach((button => {
        button.setAttribute("style", button === activeButton ? activeStyle : baseStyle);
      }));
    };
    const handleFilterChange = (button) => {
      setActive(button);
      applyCatalogFilter(lists, button.dataset.filter);
    };
    buttons.forEach((button => {
      button.setAttribute("style", baseStyle);
      button.addEventListener("click", (() => handleFilterChange(button)));
    }));
    const defaultButton = buttons.find((button => "todos" === button.dataset.filter)) || buttons[0];
    defaultButton && handleFilterChange(defaultButton);
  };
  setupCatalogFilterButtons(Array.from(n));
}
), 2750)
}
y?.addEventListener("click", (e => n(e))), y?.addEventListener("mouseover", (function () {
  this.style.transform = "scale(1.05)"
}
)), y?.addEventListener("mouseout", (function () {
  this.style.transform = "scale(1)"
}
));
// Bind CTA listeners only once to prevent duplicate handlers
if (y && !y.dataset.bound) {
  y.addEventListener("click", (e => n(e)));
  y.addEventListener("mouseover", function () { this.style.transform = "scale(1.05)" });
  y.addEventListener("mouseout", function () { this.style.transform = "scale(1)" });
  y.dataset.bound = "1";
}
document.getElementsByTagName("nvailoader");
var a = document.getElementsByClassName("fulfillment ui-pb-label-builder fulfillment fulfillment").length > 0 ? document.getElementsByClassName("fulfillment ui-pb-label-builder fulfillment fulfillment"): document.querySelectorAll(".poly-component__shipped-from").length > 0 ? document.querySelectorAll(".poly-component__shipped-from"): document.getElementsByClassName("poly-shipping__promise-icon--full"), i = e.filter((e => e.metadata && "true" === e.metadata.is_pad)), s = [];
function o(e) {
  let t = document.getElementById("eacatextrainfo");
  function n() {
    a.getElementsByTagName("span")[0].innerText = "Carregando...", fetch(`${novaiContorn}https://api.mercadolibre.com/trends/MLB/${e}`, eaInit).then((e => e.json())).then((t => function (t) {
      let a = t, i = [];
      for (let e = 0;
      e < a.length;
      e++) i.push(a[e].keyword);
      let s = i.map((e => e + "\r\n")), o = document.getElementById("eacattrends");
      o.firstChild.getElementsByTagName("span")[0].innerText = `${i.length} Resultados `, fetchCategoryWithCache(e, (e => {
        e && (o.lastChild.lastChild.innerText = e.name)
      }
      ));
      let r = `<div id="eatrendsbox" style="margin-left:4px;margin-top: -11px;position: absolute;background: #fff;width: 21em;padding:3em 1em 1.35em 1em;box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;z-index: 2;border-radius: 7px;"><span>Lista de termos mais buscados:</span><textarea style="width: 20em;min-width: 20em;max-width: 20em;height:14em;min-height:14em;max-height:35em;margin: 4px 0px;text-transform: capitalize;" spellcheck="false">${s.join().toString()}</textarea><button id="eacopytrends" style="font-size: 1.1em;font-weight: 600;letter-spacing: -0.01em;padding: 0em 1em;border-radius: 3em;border: 0px;cursor: pointer;">Copiar tudo</button><span id="eaclosetrendsbox" style="float: right;cursor: pointer;font-size: 0.86em;">Fechar <img src="https://img.icons8.com/external-android-line-2px-amoghdesign/48/4a90e2/external-close-multimedia-line-24px-android-line-2px-amoghdesign.png" style="width: 1.5em;position: relative;top: 5px;"></span></div>`, l = document.getElementById("eatrendsbox"), d = document.getElementById("eacattrendsbtn");
      d && d.removeEventListener("click", n), l ? (l.outerHTML = "", document.getElementById("eacattrends").firstChild.insertAdjacentHTML("beforebegin", r)): (document.getElementById("eacattrends").firstChild.insertAdjacentHTML("beforebegin", r), document.getElementById("eacopytrends").addEventListener("click", (function () {
        let e = this.parentNode.getElementsByTagName("textarea")[0];
        e.select(), navigator.clipboard.writeText(e.value), this.innerText = "Copiado!"
      }
      )));
      document.getElementById("eaclosetrendsbox").addEventListener("click", (function () {
        document.getElementById("eatrendsbox").style.display = "none"
      }
      )), d && d.addEventListener("click", (function () {
        document.getElementById("eatrendsbox").style.display = "block"
      }
      ))
    }
    (t))).catch ((function (e) {}))
  }
  t?.insertAdjacentHTML("beforeend", '<div id="eacattrends" style="display: inline-block;margin-bottom: 21px;"><span id="eacattrendsbtn" style="position:relative;z-index:3;font-weight:700;background-color:var(--mfy-main);color:#fff;padding:0.35em 0.75em;border-radius:7px;margin: 0em 0.5em;cursor: pointer;"><img src="https://img.icons8.com/ios-glyphs/60/ffffff/hot-sales-hours.png" style="width: 1.21em;position: relative;top: 3px;">\n            <span>Termos mais buscados! </span> <span style="font-size: 0.7em;position: relative;top: -2px;right: -3px;padding: 0px 5px 1px 5px;margin: 0px 0px 0px 5px;border: 1px solid #fff;border-radius: 1em;">categoria</span></span></div>'), t.setAttribute("style", "margin-bottom: -1.5em;");
  let a = document.getElementById("eacattrendsbtn");
  a.addEventListener("click", n)
}
function r(e, t) {
  eabar_competition = document.getElementById("eabar_competition");
  let n = !!e;
  e = n ? e: eabar_competition.getAttribute("points");
  let a = t ? parseFloat(t.toFixed(2)): 1, i = e;
  eabar_competition.setAttribute("points", n ? i.reduce(((e, t) => e + t), 0): i);
  let s = n ? media_ponderada(i).toFixed(0): e * a, o = "Calculando...";
  s < 40 ? o = "Baixa": s >= 40 && s < 80 ? (o = "Média", eabar_competition.style.background = "#fff159", eabar_competition.style.color = "#1e3d6e"): s >= 80 && (o = "Alta", eabar_competition.style.background = "red"), eabar_competition.innerHTML = o
}
async function l(n, a) {
  var i = n, s = i?.querySelector(".poly-component__title-wrapper")?.innerText ?? i?.querySelector(".poly-poly-component__title")?.innerText, o = e[a];
  // If metrics box already exists for this item, avoid reinserting or reprocessing
  if (i.querySelector(`div.${o?.metadata?.id ?? ''}`) || i.querySelector(`#loader-${o?.metadata?.id ?? ''}`)) {
    return;
  }
  // Insert loader only if not already present and metrics box not present
  const contentWrapper = i.getElementsByClassName("ui-search-result__content-wrapper")[0] ?? i.getElementsByClassName("poly-card__content")[0];
  if (!i.querySelector('nvailoader') && !i.querySelector(`div.${o?.metadata?.id ?? ''}`)) {
    contentWrapper?.insertAdjacentHTML("afterbegin", nvailoader);
  }
  async function aWrapper(e) {
    !function (n) {
      function a(e) {
        let t = "true" == i.getAttribute("catalog") || n.catalogListed, a = e.match(/window\.__PRELOADED_STATE__\s*=\s*(\{.*\});/);
        !a && e.startsWith('{"pageState":') && (a = [], a[1] = e);
        let r, l = null, d = e.match(/w\[l\]\.push\((.*)\)/);
        d && d.length > 1 ? r = d[0]: t || d && d.length > 1 && (r = `(${e})`);
        try {
          if (r) {
            try {
              l = JSON.parse(r.split("w[l].push(")[1].split(")")[0])
            }
            catch (e) {
              l = null
            }
            null == l?.startTime && e.startsWith('{"pageState":{') && (r = e, l = JSON.parse(r), l.initialState || (l = l.pageState))
          }
          null != l && null != l || e.startsWith('{"pageState":{') && (l = JSON.parse(e), l.initialState || (l = l.pageState))
        }
        catch (e) {
          l = null
        }
        if (a && a.length >= 1) {
          let r = a[1];
          try {
            let a = JSON.parse(r);
            a.initialState || (a = a.pageState);
            let d = !1, c = 0, p = l?.startTime ?? l?.initialState?.components?.track?.gtm_event?.startTime, g = a.initialState.components.header.subtitle?.split(" | ")[1]?.split(" "), f = "";
            if (g) {
              for (let e = 0;
              e < g?.length;
              e++) if (g[e].trim().length > 0) {
                f = g[e];
                break
              }
            }
            else f = 0;
            f = f ?? "0";
            var m = 0;
            let u = i.getElementsByClassName("poly-component__title-wrapper")?.[0]?.getElementsByTagName("a")?.[0]?.getAttribute("href");
            u?.split("wid=MLB")[1]?.split("&")[0], u?.split("#")[0];
            if (t && n.itemID) {
              if (itemsLocalData[n.itemID]) p = itemsLocalData[n.itemID]?.startTime ?? 0, (m = itemsLocalData[n.itemID]?.itemSales ?? 0) && null == i.getAttribute("sales") && i.setAttribute("sales", m), c = dayjs().diff(p, "day") ? dayjs().diff(p, "day"): 0, c++;
              else if (e) {
                let t = e, a = null;
                try {
                  a = JSON.parse(t)
                }
                catch (e) {
                  try {
                    const e = t.match(/(\{(?:[^{}]|{[^{}]*})*\})/);
                    if (!e || !e[1]) throw new Error("No JSON object found");
                    a = JSON.parse(e[1])
                  }
                  catch (e) {
                    try {
                      const e = t.split("w[l].push(")[1].split(")")[0];
                      a = JSON.parse(e)
                    }
                    catch (e) {
                      try {
                        const e = t.match(/window\.\w+\s*=\s*({.*?});?/);
                        if (!e) return;
                        a = JSON.parse(e[1])
                      }
                      catch (e) {
                        return
                      }
                    }
                  }
                }
                if (a) {
                  const e = a.pageState.initialState || a;
                  let t = e?.components?.header?.subtitle;
                  if (f = t?.split("|  ")?.[1]?.split(" ")?.[0], t && f) {
                    const t = f.match(/^[+]?(\d+)(mil)?/i);
                    m = t ? parseInt(t[1], 10) * (t[2] ? 1e3: 1): 0;
                    let a = e?.components?.track?.gtm_event?.startTime;
                    globalLogs.push(n.itemID, a), a && (c = dayjs().diff(a, "day") ? dayjs().diff(a, "day"): 0, c++, c > 180 && c < 365 ? s = "#f7b500": c > 365 && (s = "#ff0000"), null != i.getAttribute("product-days") && 0 != i.getAttribute("product-days") || i.setAttribute("product-days", c), (m >= 100 && c > 30 || m < 100 && c >= 90 || m < 5 && c > 45) && document.dispatchEvent(new CustomEvent("StoreProductData", {
                      detail: {
                        itemId: n.itemID,
                        startTime: a,
                        itemSales: m
                      }
                    }
                    )))
                  }
                  i.querySelector(`#${n.itemID}`) && m && i.setAttribute("sales", m)
                }
              }
            }
            else {
              if (null != f && null != f && !m) {
                let e = f.toString().match(/^[+]?(\d+)(mil)?/i);
                m = e ? parseInt(e[1], 10) * (e[2] ? 1e3: 1): 0
              }
              i.setAttribute("sales", m)
            }
            p && (c = dayjs().diff(p, "day") ? dayjs().diff(p, "day"): 0, c++, c > 180 && c < 365 ? s = "#f7b500": c > 365 && (s = "#ff0000"), null != i.getAttribute("product-days") && 0 != i.getAttribute("product-days") || (i.setAttribute("product-days", c), (m >= 100 && c > 30 || m < 100 && c >= 90 || m < 5 && c > 45) && document.dispatchEvent(new CustomEvent("StoreProductData", {
              detail: {
                itemId: n.itemID,
                startTime: p,
                itemSales: m
              }
            }
            ))));
            let y = a.initialState.track?.melidata_event?.event_data?.price ?? n.price;
            i.setAttribute("product-price", y), m && null == i.getAttribute("sales") && i.setAttribute("sales", m), i.setAttribute("product-id", n.itemID), i.setAttribute("product-price", y), i.setAttribute("shipping", l?.shipping ?? ""), o(c, m, d)
          }
          catch (e) {}
        }
        else if (e?.startsWith('{"pageState":{')) {
          let a = JSON.parse(e).pageState.initialState.components.header.subtitle;
          if (salesText = a?.split("|  ")[1]?.split(" ")[0], salesText) {
            const e = salesText.match(/^[+]?(\d+)(mil)?/i);
            m = e ? parseInt(e[1], 10) * (e[2] ? 1e3: 1): 0
          }
          else m = 0;
          i.setAttribute("sales", m);
          const r = i.querySelector(`#${n.itemID}`);
          r && (r.innerHTML = `${m<5?m:"+"+m}`);
          let d = l?.startTime ?? l.initialState.components.track?.gtm_event?.startTime, c = 0;
          d && (c = dayjs().diff(d, "day") ? dayjs().diff(d, "day"): 0, c++, c > 180 && c < 365 ? s = "#f7b500": c > 365 && (s = "#ff0000"), null == i.getAttribute("product-days") && (i.setAttribute("product-days", c), (m >= 100 && c > 30 || m < 100 && c >= 90 || m < 5 && c > 45) && document.dispatchEvent(new CustomEvent("StoreProductData", {
            detail: {
              itemId: n.itemID,
              startTime: d,
              itemSales: m
            }
          }
          ))));
          let p = state.initialState.track?.melidata_event?.event_data?.price ?? n.price;
          i.setAttribute("product-price", p), m && null == i.getAttribute("sales") && i.setAttribute("sales", m), i.setAttribute("product-id", n.itemID), i.setAttribute("product-price", p), i.setAttribute("shipping", l?.shipping ?? "");
          let g = !1;
          (state.initialState?.metadata?.url_canonical?.startsWith("https://www.mercadolivre") || t) && (g = !0), o(c, m, !0)
        }
      }
  var s = "#7CFC00";
      function o(a, o, r) {
        let l = null != itemsLocalData[n.itemID];
        a > 180 && a < 365 ? s = "#f7b500": a > 365 && (s = "#ff0000");
        const d = e => dayjs(e).format("YYYY-MM-DD"), m = dayjs().subtract(6, "month"), c = Array.from({
          length: 6
        }
        , ((e, t) => m.add(t, "month"))), g = c.map((e => d(e.startOf("month")))), f = c.map((e => d(e.endOf("month")))), u = f.map(((e, t) => `${novaiContorn2}https://api.mercadolibre.com/items/visits?ids=${n.itemID}&date_from=${g[t]}&date_to=${e}`));
        let y = "position: absolute; bottom: -21px; z-index: 99;";
        "gallery" == listView && (y = "position: relative; z-index: 99;");
        let h = `<div class="${n.itemID}" style="${y}font-family: 'Montserrat', sans-serif;margin: -2.5em 0em 1em 0em;display: flex;padding: 0.5em;background: #222222;align-items: center;justify-content: space-around;width: 19rem;height: 3.5rem;border-radius: 0.7em;border-top: 5px solid ${s};box-shadow: rgba(0, 0, 0, 0.4) 0px 8px 13px -3px, rgba(0, 0, 0, 0.2) 0px 4px 6px -2px;box-sizing: border-box;">

  <!-- Seção: Criado há -->
  <div style="font-size: 0.61em;font-weight: 400;color: #f0f0f0;line-height: 1.31em;flex: 1.35;text-align: center;">Criado há: <br>
    <span style="font-size: 0.86rem;font-weight: 700;">
      <span class="created-at" style="font-size: 1.1rem;font-weight: 700;">${r&&!l?NvaiLoader:a}</span> ${r?"":"dia(s)"}
    </span>
  </div>

  <!-- Seção: Vendas -->
  <div style="font-size: 0.61em;font-weight: 400;color: #f0f0f0;line-height: 1.31em;flex: 1;padding-left: 1em;border-left: 1px solid #444444;text-align: center;">Vendas: <br>
    <span id="${n.itemID}" style="font-size: 1.21rem;font-weight: 700;">${NvaiLoader}</span>
  </div>

  <!-- Seção: Visitas -->
  <div style="font-size: 0.61em;font-weight: 400;color: #f0f0f0;line-height: 1.31em;flex: 2;padding-left: 1em;border-left: 1px solid #444444;display: flex;align-items: center;justify-content: space-between;">
    <div>Visitas: <br>
      <span style="font-size: 0.8rem">(6m)</span>
    </div>
    <div id="loader-${n.itemID}" class="itemloader" style="cursor: pointer;display: flex;align-items: center;justify-content: center;">
      <img style="cursor: pointer;width:1.21rem;margin-right: 0.31rem;" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/f0f0f0/external-qr-code-scan-coding-tanah-basah-basic-outline-tanah-basah.png" alt="QR Code Icon"/> Ver
    </div>
  </div>

</div>`, b = i.getElementsByTagName("nvailoader")[0];

        if (b) {
          b.outerHTML = h;
        } else {
          // Fallback: if the temporary loader vanished (e.g., by React re-render), insert the card directly once
          if (!i.querySelector(`div.${n.itemID}`)) {
            const cw = i.getElementsByClassName("ui-search-result__content-wrapper")[0] ?? i.getElementsByClassName("poly-card__content")[0];
            cw?.insertAdjacentHTML("afterbegin", h);
          }
        }
        let v = null != o ? `${o<5?o:"+"+o}`: "-";
        if (!r) {
          const salesEl = i.querySelector(`#${n.itemID}`);
          salesEl && (salesEl.innerHTML = v);
        }
        i.setAttribute("product-days", a), o && null == i.getAttribute("sales") && i.setAttribute("sales", o), document.getElementById(`loader-${n.itemID}`)?.addEventListener("mouseover", function () {
          if (nvaiLoaderTotal.hasSpinner(this) || this.getAttribute("visit-data") === "true") return;
          nvaiLoaderTotal.replaceContent(this);
          (async (holder) => {
            const points = [];
            for (let idx = 0; idx < u.length; idx++) {
              try {
                const res = await fetch(u[idx], eaInit).then(r => r.json());
                points.push({ date: (new Date).getTime() * (idx + 1), value: parseFloat(res[0].total_visits) });
              } catch (_) {
                points.push({ date: (new Date).getTime() * (idx + 1), value: 0 });
              }
            }
            am5.ready(function () {
              var green = am5.color(3441658), red = am5.color(11730944);
              var change = Math.round(1000 * ((((points[points.length - 1] ? points[points.length - 1].value : 0) / (points[0] ? points[0].value || 1 : 1)) - 1))) / 10;
              var stroke = change < 0 ? red : green;
              holder.style.overflow = "auto";
              var chartDiv = document.createElement("div");
              chartDiv.style.fontSize = "0em";
              chartDiv.style.width = "57px";
              chartDiv.style.height = "25px";
              chartDiv.style.padding = "0.2em 0.4em";
              chartDiv.style.float = "left";
              holder.innerHTML = "";
              holder.setAttribute("visit-data", "true");
              holder.appendChild(chartDiv);
              var root = am5.Root.new(chartDiv);
              root.setThemes([am5themes_Micro.new(root)]);
              var chart = root.container.children.push(am5xy.XYChart.new(root, { panX: false, panY: false, wheelX: "none", wheelY: "none" }));
              chart.plotContainer.set("wheelable", false);
              chart.zoomOutButton.set("forceHidden", true);
              var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, { maxDeviation: 0, baseInterval: { timeUnit: "day", count: 1 }, renderer: am5xy.AxisRendererX.new(root, {}) }));
              var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { strictMinMax: true, renderer: am5xy.AxisRendererY.new(root, {}) }));
              var series = chart.series.push(am5xy.LineSeries.new(root, { xAxis: xAxis, yAxis: yAxis, valueYField: "value", valueXField: "date", stroke: stroke }));
              series.strokes.template.setAll({ strokeWidth: 2 });
              series.data.setAll(points);
            });
          })(this);
        });
        (function () {
          t--, function () {
            function e() {
              let e = document.getElementById("easortselect");
              e && (e.disabled = !1);
              let t = document.getElementById("mfy-catalog-filter-container");
              t && (t.style.display = "block");
              let n = document.getElementById("mfy-smetrics-status");
              n && setTimeout((function () {
                n.style.display = "none"
              }
              ), 700)
            }
            t <= 2 && e();
            t / p >= .7 && setTimeout((function () {
              e()
            }
            ), 14e3)
          }
          ();
          let e = document.getElementById("mfy-smetrics-progress"), n = setInterval((function () {
            e = document.getElementById("mfy-smetrics-progress"), e && (e.value = e.value + 1, clearInterval(n))
          }
          ), 500)
        }())
      }
      let r = n.title.toLowerCase().replace(/[ãâàáäåāăąạảấầẩẫậắằẳẵặ]/g, "").replace(/[õôòóöøōŏőơọỏốồổỗộớờởỡợ]/g, "").replace(/[ñńņňṅṇṉṋṅ]/g, "").replace(/[ēĕėęěẹẻẽếềểễệ]/g, "").replace(/[īĭįỉịớờởỡợ]/g, "").replace(/[ūŭůűųụủứừửữự]/g, "").replace(/[ýỳỵỷỹ]/g, "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^-/, ""), l = "https://produto.mercadolivre.com.br/MLB-" + n.itemID.split("MLB")[1], d = (n.catalogID.split("MLB")[1], n.itemID, i.getElementsByClassName("mfy-ad-listinfo_widget")[0]?.getAttribute("catalog"), l);
      if (i.setAttribute("product-id", n.itemID), i.setAttribute("product-price", n.price), i.setAttribute("shipping", n.shipping), "true" == i.getElementsByClassName("mfy-ad-listinfo_widget")[0]?.getAttribute("catalog") || n.catalogListed) {
        i.setAttribute("catalog", !0);
       let e = `
<div style="
  background-color: #ffe600;          /* NOVAI amarelo */
  color: #111;                        /* texto preto */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;                /* cantos arredondados */
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 0.02rem;
  gap: 1rem;
  padding: 0.75rem 1rem 0.5rem 1rem;
  border: 2px solid #000;             /* borda preta */
  box-shadow: 0 6px 18px rgba(0,0,0,.06);
  position: absolute;                 /* continua relativo ao card */
  top: 0;                             /* canto superior direito do card */
  right: 0;
  z-index: 2147483647;                /* acima de tudo no card */
  pointer-events: auto;               /* clicável */
" class="iscatalog">
  Catálogo
</div>`;



        i.getElementsByClassName("poly-card__content")[0].insertAdjacentHTML("afterbegin", e)
      }
      else i.setAttribute("catalog", !1);
      null == itemsLocalData[n.itemID] && "true" !== i.getAttribute("cache-req-started") && (i.setAttribute("cache-req-started", "true"), document.dispatchEvent(new CustomEvent("GetProductData", {
        detail: {
          itemIds: [n.itemID]
        }
      }
      )));
      if (null == itemsLocalData[n.itemID]) scrapeForScripts(n.itemID, d, !1, (function (e, t) {
        if (t) itemSales = 0;
        else try {
          const t = e || [];
          if (t.length > 0) for (let e of t) {
            const t = /<script\b[^>]*>([\s\S]*?)<\/script>/i.exec(e);
            let n = t ? t[1]: e;
            (n && n.indexOf("initialState") > -1 || n.indexOf('"pageState":{') > -1) && a(n)
          }
          else itemSales = 0
        }
        catch (e) {
          itemSales = 0
        }
      }
      ), !1, n.catalogListed ? novaiContorn: null);
      else {
        let e = itemsLocalData[n.itemID]?.startTime ?? 0, t = itemsLocalData[n.itemID]?.itemSales ?? 0, a = dayjs().diff(e, "day") ? dayjs().diff(e, "day"): 0;
        a++, o(a, t, !1)
      }
      if ("gallery" != listView) {
        let e = document.getElementById(n.itemID)?.parentElement?.parentElement;
        e && (e.style.bottom = "-7px")
      }
    }
    ({
      itemID: e.metadata.id ?? "",
      title: s ?? "",
      catalogID: "",
      permalink: "",
      category: "",
      shipping: "",
      startTime: "",
      initialQuantity: "",
      availableQuantity: "",
      listingType: "",
      price: "",
      categoryId: e?.metadata.category_id ?? "",
      soldQuantity: "",
      catalogListed: !e?.metadata?.url?.startsWith("produto")
    }
    )
  }
  await aWrapper(o);
}
"lite" != verif && (function () {
  const insertHeader = function () {
    try {
      if (paginaAtual !== "lista") return;
      if (document.getElementById("eanotify")) return; // idempotent
      const n = document.getElementById("root-app");
      if (!n) return;
      let e = `<div id="eanotify"
      // style="background: #222222; margin-top: 0em; transition: all 0.35s ease 0s; display: flex; align-items: center; justify-content: center; height: 3.5em;">
      <div style="
      display: flex;
      justify-content: space-between;
      gap: 1.2rem;
      width: 100%;
      max-width: 1215px;
      padding: 0 1em;
      ">
      
      <style>
      .eafont1 {
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.035em;
        font-size: 0.75em
        }
        
        .eafont2 {
          font-weight: 900;
                  font-size: 1.1em;
                  color: #fff;
                  margin-left: 0.21em;
                  margin-bottom: 0.1em
              }
          </style>
          <div style="display: flex;align-items: center;margin-right: 1em;"><img
                  src="https://img.icons8.com/metro/26/ffffff/opened-folder.png"
                  style="width: 21px;margin-right: 0.35em;"><span id="eabar_category"
                  style="font-weight: 900;font-size: 1.1em;color: #dceaff;margin-left: 0.21em;margin-bottom: 0.1em;">-</span>
          </div>
          
          <div style="display: flex;align-items: center;margin-right: 1em; min-width: 4em;"></div>

          <div style="display: flex;align-items: center;margin-right: 1em;"><img
                  src="https://img.icons8.com/fluent-systems-filled/48/ffffff/lightning-bolt.png"
                  style="width: 21px;margin-right: 0.35em;"><span id="eabar_fullrate" class="eafont2">-<span
                      style="font-size: 0.77em;"><span
                          style="letter-spacing: 1px;margin-left: -0.31em;color: #d8ca0070;">/${p}</span><span
                          style="color: #14305c;letter-spacing: 0.05em;">(0%)</span></span></span></div>
          <div style="display: flex;align-items: center;margin-right: 1em;"><img
                  src="https://img.icons8.com/fluent-systems-filled/48/ffffff/post-ads.png"
                  style="width: 21px;margin-right: 0.35em;"><span id="eabar_adsrate" class="eafont2">-<span
                      style="font-size: 0.77em;"><span
                          style="letter-spacing: 1px;margin-left: -0.31em;color:#ffffff70;">/${p}</span><span
                          style="color: #14305c;letter-spacing: 0.05em;">(0%)</span></span></span></div>
          <div style="display: flex;align-items: center;margin-right: 1em;"><img
          src="https://img.icons8.com/ios-glyphs/ffffff/30/pricing-structure.png"
          style="width: 21px;margin-right: 0.35em;"><span id="eabar_catalograte" class="eafont2">-<span
              style="font-size: 0.77em;"><span
                  style="letter-spacing: 1px;color:#ffffff70;">/${p}</span><span
                  style="color: #14305c;margin-left: 0.2rem;">(0%)</span></span></span></div>

          <div style="margin-right: 1em;display: flex;align-items: center;"><img
                  src="https://img.icons8.com/ios-glyphs/30/ffffff/fire-element--v1.png"
                  style="width: 21px;margin-right: 0.35em;"><span style="color: #fff"
                  class="eafont1">Concorrência: </span><span id="eabar_competition"
                  style="font-weight: 900;font-size: 1.14em;color: #ffffff;margin-left: 0.21em;background-color: #3456e270;border-radius: 4px;padding: 0.21em 1em;">-
              </span>
          </div>
          

      </div>
</div>`;
  let t = '<div id="eacatextrainfo" style="display:none"><span style="padding: 4px;"><img style="width: 1.5em;margin-bottom: -4px;" src="https://img.icons8.com/cotton/64/000000/info--v2.png"/></span><span id="eaadsoncategory" style="font-size: 14px;">Carregando...</span></div>';
      // Safe lookup for first section to avoid null deref
      let l = n.firstChild ? n.firstChild.getElementsByTagName("section")[0] : null, d = t, m = l, c = "beforeend";
      l?.children.length > 0 ? ("ul" === l.firstChild.tagName.toLowerCase() ? (l?.setAttribute("style", "padding: 1em; margin: 0 0 7px; border-radius: 5px; display: flex; align-items: flex-start; flex-direction: column;"), l.firstChild.style.marginBottom = "1.2em"): (d = `<section id='ealistsection' class="ui-search-top-keywords" style=" padding: 1em; margin: 0 0 7px; border-radius: 5px; display: flex; align-items: flex-start; flex-direction: column;">${t}</section>`, m = document.getElementById("root-app").firstChild, c = "afterbegin"), m?.insertAdjacentHTML(c, d)): (d = `<section id='ealistsection' class="ui-search-top-keywords" style="z-index:999; padding: 1em; margin: 0 0 7px; border-radius: 5px; display: flex; align-items: flex-start; flex-direction: column;">${t}</section>`, m = document.getElementById("root-app").firstChild, c = "afterbegin", m?.insertAdjacentHTML(c, d));
      n.insertAdjacentHTML("afterbegin", e);
  (eabar_category = document.getElementById("eabar_category")).innerHTML = "carregando...";
  // Show helper only while loading
  const eacat = document.getElementById("eacatextrainfo");
  eacat && (eacat.style.display = "block");
      eabar_fullrate = document.getElementById("eabar_fullrate");
      {
        const total = a.length > 50 ? 50 : a.length;
        const percent = Math.min(100, Math.round((a.length / 50) * 100));
        eabar_fullrate.innerHTML = total.toString().padStart(2, "0") + ' <span style="font-size: 0.77em;"> <span style="letter-spacing: 1px;margin-left: -0.31em;color: #ffffff70;"> /' + p + '</span> <span style="color: #14305c;letter-spacing: 0.05em;">(' + percent + '%)</span></span>';
      }
      eabar_adsrate = document.getElementById("eabar_adsrate");
      {
        const totalAds = i.length;
        const percentAds = Math.min(100, Math.round((i.length / 50) * 100));
        eabar_adsrate.innerHTML = totalAds.toString().padStart(2, "0") + ' <span style="font-size: 0.77em;"> <span style="letter-spacing: 1px;margin-left: -0.31em;color: #ffffff70;"> /' + p + '</span> <span style="color: #14305c;letter-spacing: 0.05em;">(' + percentAds + '%)</span></span>';
      }
      let g = parseFloat((i.length / 50 * 100).toFixed(0));
      g <= 0 && (g = 1), r([g,
      parseFloat((0).toFixed(0)),
      parseFloat((a.length / 50 * 100).toFixed(0))]), eanotify = document.getElementById("eanotify");
      (function () {
        let e = preLoadedState.initialState.melidata_track.event_data.category_id;
        e?.length > 0 && o(e), async function (e) {
          "" != e && null != e && await new Promise((t => {
            fetchCategoryWithCache(e, (e => {
              e && (s = e), t();
            }));
          })), eabar_category.innerHTML = s.name ? s.name: "Categoria";
          let t = document.getElementById("eaadsoncategory");
          if (s.total_items_in_this_category && t) {
            t.innerHTML = `<b style=\"color: var(--mfy-main);font-size:18px;\">${s.total_items_in_this_category}</b> anúncios na categoria.`;
            // Hide the helper when loaded
            const inf = document.getElementById("eacatextrainfo");
            inf && (inf.style.display = "none");
          } else {
            // nothing to show, remove the container
            t.parentElement.parentElement.remove();
          }
        }(e);
      }());
    } catch(_) {}
  };
  if (document.readyState === "complete" || document.readyState === "interactive") setTimeout(insertHeader, 0);
  window.addEventListener("load", insertHeader, { once: true });
  document.addEventListener("DOMContentLoaded", insertHeader, { once: true });
})();
}
}
function pageType() {
  const pls = (typeof window !== 'undefined' && window.preLoadedState) ? window.preLoadedState : undefined;
  if (!pls || !pls.userId) {
    if (document.getElementsByClassName("ui-search-breadcrumb__title")[0] != null) {
      paginaAtual = "lista";
    }
  } else {
    paginaAtual = "painel";
  }
  verifyData("pageType")
}
if (null != sessionStorage.getItem("eauser")) usuario_logado = sessionStorage.getItem("eauser");
else var usuario_logado = null;
function runLogged() {
  eaOnAdminPanel || "https://www.mercadolivre.com.br/" != window.location.href && function (e) {
    let t = document.getElementsByClassName("nav-header-plus-menu-wrapper")[0], n = `<div class="eadropdown" style="pointer-events: all;min-width: 27px;height: 27px;transition: all 0.35s ease 0s;background-color: ${"lite"==verif?"var(--mfy-main)":"rgb(255, 214, 43)"};position: relative;top: 4px;left: -1em;display: flex;border-radius: 10em;align-items: center;cursor: pointer;z-index: 31;"> <img src="https://i.ibb.co/K7Lc6cr/metrify.png" style="pointer-events:none;width:15px;margin: auto;${"lite"==verif?"filter: brightness(10.5);":""}"></div>`;
    if (void 0 !== t && t.insertAdjacentHTML("afterbegin", n), e);
    else var a = document.getElementsByClassName("eadropdown")[0];
    a && (a.addEventListener("mouseover", (function () {
      let e = document.getElementsByClassName("eamaindropdownmenu")[0];
      if (e) e.style.opacity = "100%", e.style.display = "block", e.style.transform = "scale(1)", a.style.backgroundColor = "var(--mfy-main)";
      else {
        let e = "";
        "pro" == verif && (e = '<li class="eadropmenu-tools"> Ferramentas <img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/000000/external-single-chevron-arrow-as-a-notch-badge-basic-shadow-tal-revivo.png" style=" height: 1em; margin-right: -1.1em; position: relative; top: 0.21em;"></li>');
        let t = `<div class="modeless-box eamaindropdownmenu" style="width: 175px; z-index:999; top: 8em; margin-right: 2.7em; right: 12em; transition: all 0.1s ease 0.21s; text-align: right; display: block;"><div class="modeless-box-header"><span style="font-size: 0.86em;letter-spacing: -0.1px;font-weight: bolder;">${usuario_logado}</span></div><div class="eadrop01" style="opacity: 100%;transition: 0.7s all;"><ul style="list-style-type: none;margin: 0;padding: 0;font-size: 14px;display: block;cursor: pointer;"><li><a target="_blank"  href="https://bit.ly/metrify-ext-conectar">Reconectar</a></li>` + e + ("lite" != verif ? "": "<li>Fazer Upgrade</li>") + '</ul></div><div style="font-size: 0.86em;font-weight: 400;color: lightgray;text-align: center;" class="modeless-box-header">Versão ' + mfy_version + "</div></div>";
        this.insertAdjacentHTML("afterend", t);
        let n = document.getElementsByClassName("eamaindropdownmenu")[0], i = '<div class="eaxtradropdown" style="box-sizing: border-box; width: 171px; right: -13.16em; top: 3.1em; transition: all 0.1s ease 0.21s; text-align: left; display: block; max-height: 440px; position: absolute; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased; font-size: 13px; z-index: 77; opacity: 0; pointer-events: none;" ><div class="eadropxtra" style="background-color: #ededed;opacity: 100%;transition: 0.7s all;border-radius: 0em 3px 3px 3px;box-shadow: 0px 11px 4px -10px rgb(0 0 0 / 51%);"><ul style="list-style-type: none;margin: 0;padding: 0;font-size: 14px;display: block;cursor: pointer;"><li>Gerador de EAN13</li></ul></div></div>', s = document.getElementsByClassName("eadropmenu-tools")[0];
        if (s) {
          s.innerHTML = s.innerHTML + i;
          let e = document.getElementsByClassName("eadropmenu-tools")[0], t = document.getElementsByClassName("eaxtradropdown")[0];
          e.onclick = function () {
            t.style.opacity = "1", t.style.pointerEvents = "auto"
          }
          , t.addEventListener("mouseout", (function () {
            setTimeout((function () {
              t.style.opacity = "0", t.style.pointerEvents = "none"
            }
            ), 1e3)
          }
          )), t.addEventListener("mouseover", (function () {
            this.style.opacity = "1", this.style.pointerEvents = "auto"
          }
          )), t.getElementsByTagName("li")[0].onclick = function () {
            let e = document.getElementById("mfy-tool-modal");
            if (e) e.style.display = "block";
            else {
              document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", toolModal), document.getElementById("close-track").addEventListener("click", (function () {
                document.getElementById("mfy-tool-modal").style.display = "none"
              }
              ));
              let e = document.getElementsByClassName("eangen")[0];
              e.addEventListener("mouseover", (function () {
                this.style.transform = "scale(1.1)"
              }
              )), e.addEventListener("mouseout", (function () {
                this.style.transform = "scale(1)"
              }
              )), e.addEventListener("click", (function () {
                rawID ? generateEAN13(e, !1): findDocID(e, !1)
              }
              ))
            }
          }
        }
        let o = document.getElementsByClassName("eadrop01")[0].firstChild.firstChild;
        if (0 == userdataOk) {
          if (o) {
            o.style.fontWeight = "bold", o.style.color = "red";
            let e = '<div style="background: red;width: 1em;text-align: center;border-radius: 5em;color: #fff;display: inline;font-size: 0.7em;font-weight: bolder;padding: 0em 0.7em;margin-left: 0.35em;" class="eadropalert">!</div>';
            o.firstChild.insertAdjacentHTML("beforeend", e)
          }
        }
        else o.remove();
        let r = '<div class="eatiertag" style="position: relative;display: block;text-align: center;background-color: #ebebeb;margin: 0.7em 1.6em -0.8em 1.6em;padding: 0.2em 1em;border-radius: 3.5em;cursor: pointer;z-index: 11;">...</div>';
        n.lastChild.insertAdjacentHTML("beforebegin", r);
        let l = document.getElementsByClassName("eatiertag")[0];
        l.innerHTML = "lite" == verif ? "Ativar Licença": `Conta ${verif.charAt(0).toUpperCase()}${verif.slice(1)}<img style="width:1rem" src="https://img.icons8.com/${NovaiColorMain}/ios-glyphs/30/guarantee--v1.png">`, l.addEventListener("mouseover", (function () {
          this.style.backgroundColor = "var(--mfy-main)", this.style.color = "#fff", this.style.fontWeight = "bold", this.innerHTML = "pro" == verif ? "Verificar": "Ativar"
        }
        )), l.addEventListener("mouseout", (function () {
          this.style.backgroundColor = "#ebebeb", this.style.color = "inherit", this.style.fontWeight = "inherit", this.innerHTML = "lite" == verif ? "Ativar Licença": `Conta ${verif.charAt(0).toUpperCase()}${verif.slice(1)}`
        }
        )), l.addEventListener("click", (function () {
          if (this.style.backgroundColor = "var(--mfy-main)", this.style.color = "#fff", this.style.fontWeight = "bold", this.innerHTML = "Verificando conta...", "pro" != verif) {
            window.localStorage.clear();
            const e = '<div style="display: flex;align-items: center;justify-content: center;flex-direction: column;" id="paycheck"> <span style="\n            font-weight: bolder;\n            margin: 0.2rem;\n            font-size: 1.35rem;\n            font-variant: small-caps;\n        ">e-mail de compra</span> <input type="text" value="" style="\n            border: 1px solid rgba(0,0,0,.1);\n            border-radius: 1rem;\n        "><button style="position: relative;display: block;border: 0;text-align: center;background-color: rgb(235, 235, 235);margin: 0.7em 1.6em -0.8em;padding: 0.2em 1em;border-radius: 0.35rem;cursor: pointer;z-index: 11;color: inherit;font-weight: inherit;" id="validatebuy">Validar</button></div>';
            l.style.display = "none", this.insertAdjacentHTML("beforebegin", e), document.getElementById("validatebuy").addEventListener("click", (async function () {
              const e = document.getElementById("paycheck"), t = e.firstChild.nextSibling.nextElementSibling, n = t?.value;
              if (null == n || null == n || "" == n) t.style.border = "1px solid var(--mfy-main)";
              else {
                e.lastChild.innerHTML = "Verificando...";
                try {
                  await fetch(mfyEndpoints.validate, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    }
                    ,
                    body: JSON.stringify({
                      email: freya.messages.user.email,
                      buyEmail: n
                    }
                    )
                  }
                  ).then((e => e.json())).then((t => {
                    "Plano atualizado!" == t || "Plano atualizado!" == t.msg ? (e.lastChild.innerHTML = "Conta verificada!", e.lastChild.style.backgroundColor = "var(--mfy-main)", e.lastChild.style.color = "#fff", e.lastChild.style.fontWeight = "bold", localStorage.setItem("userverif", "pro"), getnstoreData("userverif")): (e.lastChild.innerHTML = t.msg, e.lastChild.style.backgroundColor = "red", e.lastChild.style.color = "#fff", e.lastChild.style.fontWeight = "bold", e.lastChild.style.padding = "0.5rem 0rem")
                  }
                  ))
                }
                catch (e) {}
              }
            }
            ))
          }
          else getnstoreData("userverif")
        }
        )), n.addEventListener("mouseover", (function () {
          let e = document.getElementsByClassName("eamaindropdownmenu")[0];
          e.style.opacity = "100%", e.style.display = "block", e.style.transform = "scale(1)", a.style.backgroundColor = "var(--mfy-main)"
        }
        ))
      }
      e = document.getElementsByClassName("eamaindropdownmenu")[0], e.addEventListener("mouseout", (function () {
        let e = document.getElementsByClassName("eamaindropdownmenu")[0];
        e.style.opacity = 0, e.style.transform = "scale(0)", a.style.filter = ""
      }
      ))
    }
    )), a.addEventListener("mouseout", (function () {
      let e = document.getElementsByClassName("eamaindropdownmenu")[0];
      e.style.opacity = 0, e.style.transform = "scale(0)", a.style.backgroundColor = "#ffd62b", a.style.filter = ""
    }
    )))
  }
  (), pageType()
}
async function findUser() {
  if ("undefined" != sessionStorage.getItem("eauser") && null != sessionStorage.getItem("eauser")) {
    let e = sessionStorage.getItem("eauser"), t = null;
    if ("loading" !== document.readyState) {
      const n = () => new Promise((e => {
        if (window.freya && window.freya.messages && window.freya.messages.user) return void e(window.freya.messages.user);
        const t = setInterval((() => {
          window.freya && window.freya.messages && window.freya.messages.user && (clearInterval(t), clearTimeout(n), e(window.freya.messages.user))
        }
        ), 100), n = setTimeout((() => {
          clearInterval(t), e(void 0)
        }
        ), 5e3)
      }
      ));
      try {
        mfyuser = await n()
      }
      catch (e) {
        mfyuser = void 0
      }
      let a = window.melidata_namespace ? window.melidata_namespace: null;
      const i = Date.now(), s = 5e3;
      for (;
      !(a && a.actual_track && a.actual_track.user && a.actual_track.user.user_id || Date.now() - i > s);
      ) await new Promise((e => setTimeout(e, 500)));
      a?.actual_track?.user?.user_id && (mfyuser.id = a.actual_track.user.user_id), t = mfyuser.email, usuario_logado = t, t != e && sessionStorage.setItem("eauser", t)
    }
    runLogged()
  }
  else if ("loading" !== document.readyState) {
    let e = sessionStorage.getItem("eauser"), t = null;
    for (;
    !window.freya || !window.freya.messages || !window.freya.messages.user;
    ) await new Promise((e => setTimeout(e, 500)));
    mfyuser = freya.messages.user;
    let n = window.melidata_namespace ? window.melidata_namespace: null;
    for (;
    !(n && n.actual_track && n.actual_track.user && n.actual_track.user.user_id);
    ) await new Promise((e => setTimeout(e, 500)));
    if (mfyuser.id = n.actual_track.user.user_id, t = mfyuser.email, usuario_logado = t, t && t != e && sessionStorage.setItem("eauser", t), null != usuario_logado) runLogged();
    else {
      let e = '<a href="https://www.mercadolivre.com/jms/mlb/lgz/login"><span style="font-size: 0.92em;font-variant-caps: all-small-caps;padding: 0.21em 0.75em;border: 1px solid gray;border-radius: 2em;position: relative;">Usuário não logado</span></a>';
      document.getElementsByClassName("nav-header-menu-wrapper")[0]?.lastChild?.insertAdjacentHTML("afterbegin", e)
    }
  }
}
function mfyStart() {
  // Ensure dayjs is bound from window and initialize uid once if missing
  dayjs = window.dayjs;
  try { startKeepAlive(); } catch(_) {}
  if (uid == null) {
    (async function () {
      const start = Date.now();
      const timeoutMs = 5000;
      while (!((window.melidata_namespace && window.melidata_namespace.actual_track && window.melidata_namespace.actual_track.user && window.melidata_namespace.actual_track.user.user_id) || (window.freya && window.freya.messages && window.freya.messages.user && window.freya.messages.user.user_id)) && Date.now() - start < timeoutMs) {
        await new Promise(r => setTimeout(r, 250));
      }
      const fromMelidata = window.melidata_namespace?.actual_track?.user?.user_id;
      const fromFreya = window.freya?.messages?.user?.user_id;
      uid = fromMelidata || fromFreya || uid; // keep null if still unavailable
    })();
  }
  if (null != mfy_version && null != mfy_version && "" != mfy_version || document.dispatchEvent(new CustomEvent("MetrifyVersion", {
    detail: ""
  }
  )), window.location.href.startsWith("https://lista") || window.location.href.startsWith("https://produto") | window.location.href.startsWith("https://www.mercadolivre")) {
    let e = `
    :root{
  --novai-ml-yellow:#ffe600;
  --novai-fg:#222222;
  --novai-muted:#6b7280;
  --novai-border:#e5e7eb;
  --novai-bg:#ffffff;
  --novai-shadow:0 6px 18px rgba(0,0,0,.06);
  /* bridge p/ estilos antigos */
  --mfy-main: var(--novai-ml-yellow);
  --mfy-dark: #212936;
  --mfy-main-font: "Montserrat", sans-serif;
}
@media (prefers-color-scheme: dark){
  :root{
    --novai-fg:#f3f4f6;
    --novai-muted:#9ca3af;
    --novai-border:#272a30;
    --novai-bg:#0f1115;
    --novai-shadow:0 8px 24px rgba(0,0,0,.35);
  }
}
.select {
  position: relative;
  min-width: 200px;
}
.select svg {
  position: absolute;
  right: 12px;
  top: calc(50% - 3px);
  width: 10px;
  height: 6px;
  stroke-width: 2px;
  stroke: #9098a9;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}
.select select {
  margin-left: 1rem;
  -webkit-appearance: none;
  padding: 7px 40px 7px 12px;
  width: 100%;
  border: 1px solid #e8eaed;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 3px -2px #9098a9;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 150ms ease;
}
.select select:required:invalid {
  color: #5a667f;
}
.select select option {
  color: #223254;
}
.select select option[value=""][disabled] {
  display: none;
}
.select select:focus {
  outline: none;
  border-color: #07f;
  box-shadow: 0 0 0 2px rgba(0,119,255,0.2);
}
.select select:hover + svg {
  stroke: #07f;
}
.sprites {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}

* {
  scrollbar-width: auto;
  scrollbar-color: #c2c2c2 #ffffff;
}
*::-webkit-scrollbar {
  width: 11px;
  height: 11px;
}
*::-webkit-scrollbar-track {
  background: #ffffff11;
}
*::-webkit-scrollbar-thumb {
  background-color: #c2c2c2;
  border-radius: 10px;
}

.eatoolboxbar {
  opacity: 0;
  overflow: hidden;
  color: #333333;
  height: 3.75em;
  border-radius: 2em;
  display: block;
  font-weight: bold;
  position: relative;
  background-color: #fff;
  z-index: 31;
  border: 1px solid #ebebeb;
  margin-bottom: 0;
  box-shadow: rgb(0 0 0 / 7%) 0 3px 6px;
  pointer-events: none;
  width: 100%;
  transition: opacity 0.21s ease, transform 0.21s ease;
  transform: translateX(0.5rem);
}
.eatoolboxicon {
  z-index: 100;
  overflow: hidden;
  cursor: alias;
  align-items: center;
  color: rgb(52, 131, 250);
  font-weight: 700;
  font-size: 1.36em;
  background-color: rgb(250, 250, 250);
  padding: 0.35em 0.31em;
  border-radius: 1em;
  display: inline-flex;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.eatoolboxbaropen {
  pointer-events: auto;
  opacity: 1;
  color: #333333;
  height: 3.75em;
  border-radius: 2em;
  display: block;
  font-weight: bold;
  position: relative;
  background-color: #fff;
  z-index: 31;
  top: 0;
  transition: all 0.21s;
  width: 100%;
  border: 1px solid #ebebeb;
  margin-bottom: 0;
  box-shadow: rgb(0 0 0 / 7%) 0px 3px 6px;
  transform: translateX(0);
}
  
.novai-kpi-card{
  position:relative;
  background:#222;
  color:#fff;
  border:0;                 /* <<< sem borda */
  border-radius:12px;
  padding:10px 12px;
  box-shadow:var(--novai-shadow);
  overflow:hidden;
}
/* Faixa amarela no topo */
.novai-kpi-card::before{
  content:"";
  position:absolute;
  top:0; left:0; right:0;   /* <<< sem -1px */
  height:4px;
  background:var(--novai-ml-yellow);
  border-top-left-radius:inherit;
  border-top-right-radius:inherit;
  pointer-events:none;
}

/* Cabeçalho (ícone + título) */
.novai-kpi-head{
  display:flex; align-items:center; gap:8px;
  margin-bottom:6px;
}
.novai-kpi-icon{
  width:26px; height:26px; border-radius:999px;
  background: rgba(255,230,0,.25);
  display:inline-flex; align-items:center; justify-content:center;
  font-size:14px;
}
.novai-kpi-title{
  color:#fff; text-transform:uppercase; letter-spacing:.04em;
  font-weight:700; font-size:12px;
}

/* Valor + subtítulo */
.novai-kpi-value{
  color: #ffffff; font-weight:900; font-size:24px; line-height:1.1;
  margin:2px 0 6px;
}

.novai-kpi-sub{ display:flex; align-items:baseline; gap:8px; color:#bbb; font-size:12px; }
.novai-muted{ color: #bbb; }

/* Integra o seu card antigo (#eagrossrev) ao skin Novai */
#eagrossrev.novai-kpi-card{
  /* anula o absolute antigo se houver: */
  position:relative !important;
  left:auto; right:auto; top:auto;
  display:block; width:auto;
  color:#fff;
}

/* Controles e detalhamento do faturamento */
#eagrossrev .earevstats{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:10px;
  color:#d1d5db;
}
#eagrossrev .novai-rev-controls{
  display:none;
  flex-direction:column;
  gap:8px;
}
#eagrossrev.novai-rev-expanded .novai-rev-controls{
  display:flex;
}
#eagrossrev .novai-rev-buttons{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
}
#eagrossrev .novai-rev-button{
  background:transparent;
  border:1px solid rgba(255,255,255,.18);
  color:#d1d5db;
  padding:.25em .75em;
  border-radius:6px;
  font-size:12px;
  font-weight:700;
  transition:background-color .2s ease,color .2s ease,border-color .2s ease;
}
#eagrossrev .novai-rev-button:hover{
  border-color:rgba(255,255,255,.35);
}
#eagrossrev .novai-rev-button:active{
  transform:translateY(1px);
}
/* Texto auxiliar */
#eagrossrev #mfy_rev_estimate{
  color:#fff;
  font-size:11px;
}
/* Estado selecionado para qualquer variação de classe */
#eagrossrev .novai-rev-button.novai-active,
#eagrossrev .novai-rev-button.is-active,
#eagrossrev .novai-rev-button[aria-pressed="true"]{
  background:var(--novai-ml-yellow);
  color:#111;
  border-color:var(--novai-ml-yellow);
  box-shadow:0 0 0 2px rgba(255,230,0,.25) inset;
}
#eagrossrev .eagrossrev-breakdown{
  display:none;
  flex-direction:column;
  gap:6px;
  color: #d1d5db;
}
#eagrossrev.novai-rev-has-breakdown .eagrossrev-breakdown{
  display:flex;
}
#eagrossrev .eagrossrev-breakdown .ui-pdp-review__amount{
  font-size:13px;
  font-weight:600;
}
#eagrossrev .eagrossrev-breakdown span{
  display:flex;
  align-items:baseline;
  gap:6px;
  font-size:.92em;
  font-weight:900;
  color:#fff;
}

#eagrossrev .eagrossrev-breakdown .eagrossrev-catalog-title{
  font-size:1.35em;
  color: #ffffff;
}
#eagrossrev .eagrossrev-breakdown .revtitle{
  color:#d1d5db;
}
#eaoffSwitch {
  overflow: hidden;
  display: inline-flex;
  box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;
  color: var(--mfy-main);
  font-weight: 400;
  font-size: 0.91em;
  position: relative;
  z-index: 30;
  background-color: #ffffff;
  top: -0.31em;
  left: 1em;
  min-width: 3.1em;
  height: 3.1em;
  padding: 0.5em 0.75em 0.35em 0.75em;
  line-height: 2.1em;
  cursor: pointer;
  border-radius: 2em;
}
#eaoffSwitch:hover > .eahiddenlabel {
  opacity: 1;
  margin-right: 0em;
  font-weight: 900;
  transition: all 0.35s;
}

#eaadvsearchBtn {
  overflow: hidden;
  display: none; /* inline-flex */
  box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;
  color: var(--mfy-main);
  font-weight: 400;
  font-size: 0.91em;
  position: absolute;
  z-index: 31;
  background-color: #ffffff;
  top: 0.35em;
  height: 3.1em;
  /* font-size: 0.7em; */
  padding: 0.5em 0.75em 0.35em 0.75em;
  line-height: 2.1em;
  cursor: pointer;
  border-radius: 2em;
}
#eaadvsearchBtn:hover > .eahiddenlabel {
  opacity: 1;
  margin-right: 0em;
  font-weight: 900;
  transition: all 0.35s;
}
.eahiddenlabel {
  opacity: 0;
  margin-right: -12.2em;
  font-weight: 900;
  transition: all 0.35s;
}

.eagetallimgs {
  display: inline-block;
}
.eagetallimgs-inside {
  transform: scale(1);
  transition: all 0.14s;
  line-height: 1.3em;
}
.eagetallimgs-inside:hover {
  transform: scale(1.1);
  line-height: 1em;
}
.eadownloadicon {
  padding: 4px;
  position: relative;
  z-index: 11;
  background: var(--mfy-main);
  width: 2em;
  height: 2em;
  border-radius: 7px;
  margin-top: -2em;
  cursor: grabbing;
  opacity: 0.7;
  transform: scale(0.75);
  transition: all 0.21s;
}
.eadownloadicon:hover {
  opacity: 1;
  transform: scale(1);
  transition: all 0.35s;
}

.eadrop01 li {
  padding: 11px;
  padding-right: 21px;
}
.eadrop01 li a {
  color: #333;
  text-decoration: none;
}
.eadrop01 li:hover {
  background-color: #f5f5f5;
}
.eadropdown:hover {
  background-color: var(--mfy-main) !important;
  transition: all 0.35s;
}
.eadropdown:hover img {
  filter: brightness(35);
}
.eadropxtra li {
  padding: 11px;
  padding-left: 21px;
  border-bottom: 1px solid #7e7e7e1f;
}
.eadropxtra li a {
  color: #333;
}
.eadropxtra li:hover {
  background-color: #fff;
}
.eameter {
  opacity: 0;
  margin-right: -2.77em;
  transition: all 0.35s;
  pointer-events: none;
}
#eahealthmeter:hover .eameter {
  pointer-events: none;
  opacity: 100;
  margin-right: 0;
  transition: all 0.35s;
}
.smooth {
  transition: all 0.35s;
  opacity: 100%;
}
.new-loader {
  display: flex;
  height: 21rem;
  align-content: center;
}
.new-hdn {
  display: none;
}
.hdn {
  transform: rotateX(90deg);
  overflow: hidden;
  padding: 0px;
  height: 0em;
  transition: opacity 0.5s;
}
.hdn2 {
  transition: all 0.5s ease-in-out;
  display: none;
  -webkit-box-shadow: 0 0px 0px 0 #fff0 !important;
  background-color: #fff0 !important;
  border-top: 0px solid #fff0 !important;
  margin-top: -6.1em !important;
  overflow: hidden;
  padding: 0px;
  height: 0em !important;
  transition: opacity 0.35s;
}
.transp {
  opacity: 0%;
}
.detalhamento {
  transition: all 0.5s ease-in-out;
  opacity: 100%;
  text-align: -webkit-left;
  margin: 2em 1em 0em 2em;
  padding: 0.7em 0em 0em 3.5em;
  margin-top: 1em;
  border-top: 1px solid #80808075;
}
.alinharvertical {
  padding: 1em 0em;
}
.eafollow_ad {
  border: 1px solid lightgray;
  border-radius: 2em;
  display: flex;
  align-items: center;
  position: absolute;
  right: 1px;
  padding: 0.35em 0.75em;
  cursor: pointer;
}
.eafollow_img {
  margin-top: 3px;
  width: 1.75em;
  filter: grayscale(100%);
  opacity: 35%;
  transition: all 0.14s;
}
.eafollow_img:hover {
  width: 2em;
  filter: grayscale(0%);
  opacity: 100%;
  transition: all 0.14s;
}

:root {
  --mfy-main: ${mfyMainColor};
  --mfy-dark: #212936;
  --mfy-outline: #eef0f3;
  --mfy-success: #57dd98;
  --mfy-smoke: #f9fafb;
  --mfy-main-font: "Montserrat", sans-serif;
  --mfy-outline-10: #eef0f310;
  --mfy-dark-50: #21293650;
  --mfy-dark-35: #21293635;
  --mfy-main-14: #7933ff14;
  --mfy-warning: #fbbd23;
  --mfy-danger: #ff4545;
}

.background_novai {
  background-color: var(--novai-ml-yellow,#ffe600);
}
.background_novai_black{
background-color:rgba(0, 0, 0, 0.91);
}

#preco-btn {
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

#preco-btn img {
  transition: filter 0.2s ease;
}

#preco-btn:hover {
  background-color: var(--novai-ml-yellow,#ffe600);
}

#preco-btn:hover img {
  filter: brightness(0) saturate(100%);
}

.tippy-box[data-theme~="mfy"] {
  background-color: var(--mfy-main);
  color: white;
}

.tracked-results-maindiv {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  max-height: 40vh;
  height: 40vh;
}
@media only screen and (min-height: 900px) {
  .tracked-results-maindiv {
    max-height: 38rem;
    height: 38rem;
  }
}
.track-menu-button {
  color: rgb(0,0,0,.5);
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid rgb(0,0,0,.1);
  padding: 0.5em 1em;
  margin: 0em 1em;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;
  border-radius: 1em;
}
.track-menu-button_active {
  font-weight: 700;
  background-color: #fff;
  padding: 0.5em 1em;
  margin: 0em 1em;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;
  border-radius: 1em;
}

.starttime {
  font-size: 0.86rem;
}
.mfy-result-button {
  text-align: center;
  border: 1px solid rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 5rem;
  cursor: pointer;
  margin-top: 1em;
  transition: 0.35s all;
}
.mfy-result-button:hover {
  background-color: #F56565;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transform: translate(0px, 7px);
  transition: 0.35s all;
}
.mfy-result-button:hover img {
  filter: invert(1) brightness(100);
}
.mfy-result-button_options {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.mfy-result-button_style {
  border: 1px solid rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 5rem;
  cursor: pointer;
  /* margin-top: 1em; */
  transition: 0.35s all;
}
.mfy-result-button_style:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transform: translate(0px, 7px);
  transition: 0.35s all;
  border: 2px solid rgb(0 0 0 / 10%);
}
.result-div {
  margin-bottom: 0.75em;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  height: 14rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;
  border-radius: 0.71rem;
  border-left: 7px solid;
  border-color: #00000020;
}

#pav-slider input:focus-visible {
  outline: none !important;
}
pav-slider :focus-visible {
  outline: none !important;
}
.track-btn {
  border: 2px solid #ededed;
  border-radius: 2rem;
  margin: 1em;
  padding: 0.5em 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.35s;
}
.track-btn:hover {
  transform: scale(0.9);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  transition: all 0.35s;
}
.eabanner {
  margin: auto;
  margin-bottom: 1rem;
  width: 100%;
  height: 200px;
  box-shadow: rgb(0 0 0 / 14%) -1px 20px 16px -10px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: end;
  cursor: pointer;
}
.notificationtext {
  border-radius: 0.5rem;
  transition: all 0.35s;
  opacity: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
}
.eabanner:hover .notificationtext {
  border-radius: 0.5rem;
  transition: all 0.35s;
  opacity: 1;
  font-size: 1em;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  color: white;
  background: var(--mfy-main);
  /* background: linear-gradient(0deg, rgba(0,0,0,1) 11%, rgba(0,0,0,0) 100%); */
}
.myml-nav__section-title {
  opacity: 1;
}
.toolmodal {
  position: fixed;
  top: 0;
  background-color: #000000ab;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  backdrop-filter: blur(11px);
  display: flex;
  justify-content: center;
  align-items: center;
}

#snackbar {
  visibility: hidden;
  color: #fff;
  background-color: #333;
  min-width: 250px;
  margin-left: -125px;
  border-radius: 2px;
  padding: 16px;
  text-align: center;
  left: 50%;
  bottom: 30px;
  z-index: 1;
  position: fixed;
}
/* This will be activated when the snackbar's class is 'show' which will be added through JS */
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
/* Animations for fading in and out */
@-webkit-keyframes fadein {
  from { bottom: 0; opacity: 0; }
  to   { bottom: 30px; opacity: 1; }
}
@keyframes fadein {
  from { bottom: 0; opacity: 0; }
  to   { bottom: 30px; opacity: 1; }
}
@-webkit-keyframes fadeout {
  from { bottom: 30px; opacity: 1; }
  to   { bottom: 0; opacity: 0; }
}
@keyframes fadeout {
  from { bottom: 30px; opacity: 1; }
  to   { bottom: 0; opacity: 0; }
}

</style>
`;
let t = document.createElement("style");

    t.innerHTML = e, document.body.appendChild(t);
    let n = document.createElement("link");
    n.rel = "preconnect", n.href = "https://fonts.googleapis.com";
    let a = document.createElement("link");
    a.rel = "preconnect", a.href = "https://fonts.gstatic.com", a.crossOrigin = "true";
    let i = document.createElement("link");
    i.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap", i.rel = "stylesheet", document.body.appendChild(n), document.body.appendChild(a), document.body.appendChild(i);
    let s = document.createElement("link");
    s.rel = "stylesheet", s.href = "https://cdn.jsdelivr.net/npm/range-slider-element@2/dist/range-slider-element.css", document.body.appendChild(s)
  }
  findUser()
}
function onMessage(e) {
  if ("https://www.mercadolivre.com.br" === e.origin) {
    var t = e.data;
    "function" == typeof window[t.func] && window[t.func].call(null, t.message)
  }
}
function iframeCall(e) {
  try {
    localStorage.setItem("lastquote", e)
  }
  catch (e) {}
}
document.addEventListener("MetrifyVersion", (function (e) {
  "" != e.detail && null != e.detail && null != e.detail && (mfy_version = e.detail, document.removeEventListener("MetrifyVersion", (function (e) {})))
}
)), window.addEventListener ? window.addEventListener("message", onMessage, !1): window.attachEvent && window.attachEvent("onmessage", onMessage, !1), window.addEventListener("load", (async() => {
  for (document.dispatchEvent(new CustomEvent("GetProductData", {
    detail: {
      itemIds: []
    }
  }
  ));
  !window.dayjs;
  ) await new Promise((e => setTimeout(e, 200)));
  mfyStart()
}
)), 0 === window.location.href.indexOf("https://www.mercadolivre.com.br/") && parent.postMessage({
  func: "iframeCall",
  message: document.body.innerText
}
, "*");
