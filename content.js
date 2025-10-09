(function () {
    const NS = "[NOVAI/content]";
    // ---- estado ----
    let injected = false;
    let mo = null;
    let spaTimer = null;
  
    let lastVisitas = null;      // total de visitas agregado
    let lastConvRatio = null;    // vendidos / visitas (0..1)
    let lastPrice = null;        // preço atual
  
    let monthlySeries = null;         // série pronta (labels/visits/revenue)
    let monthlyFetchInFlight = false; // evita chamadas paralelas
    let monthlyFetched = false;       // garante fetch único por item/página
    let lastCreatedAt = null;
    const dispatchedProductData = new Set();

    let subtitleObs = null;          // NEW: observer do subtítulo
    let subtitlePatchLock = 0;
  
    const ROOT_ID = "novai-root";
    let lastUrl = location.href;
    const NVAI_EVENTS = {
      SCRAPE_REQUEST: "NovaiScrapeScriptsURL",
      SCRAPE_RESPONSE: "NovaiScrapedScriptsURL",
      STORE_PRODUCT_DATA: "NovaiStoreProductData",
      PRODUCT_DATA_RESPONSE: "NovaiProductDataResponse",
    };

    const NVAI_PRODUCT_STORAGE = {
      items: {},
    };

    const NVAI_SCRAPED_DATA = {};
    const NVAI_IN_FLIGHT_SCRIPTS = new Map();
    const NVAI_CARD_CACHE = new Map();
    const NVAI_VISITS_CACHE = new Map();
    const NVAI_VISITS_IN_FLIGHT = new Map();
    const NVAI_SPINNER_HTML = '<span class="novai-spinner" aria-hidden="true"></span>';

    document.addEventListener(NVAI_EVENTS.PRODUCT_DATA_RESPONSE, (event) => {
      const detail = event?.detail;
      if (!detail || typeof detail !== "object") return;
      NVAI_PRODUCT_STORAGE.items = {
        ...NVAI_PRODUCT_STORAGE.items,
        ...detail,
      };
    });

    document.addEventListener(NVAI_EVENTS.STORE_PRODUCT_DATA, (event) => {
      const payload = event?.detail;
      if (!payload || !payload.itemId) return;
      const stored = {
        itemId: payload.itemId,
        itemSales: payload.itemSales ?? payload.sales ?? null,
        startTime: payload.startTime ?? null,
        storedAt: Date.now(),
      };
      NVAI_PRODUCT_STORAGE.items[payload.itemId] = stored;
      try {
        chrome.runtime.sendMessage(
          { type: "NOVAI_STORE_PRODUCT_DATA", data: stored },
          () => void chrome.runtime.lastError
        );
      } catch (err) {
        warn("Falha ao enviar dados ao background", err);
      }
    });

    document.addEventListener(NVAI_EVENTS.SCRAPE_RESPONSE, (event) => {
      const detail = event?.detail;
      const idRef = detail?.idRef;
      if (!idRef) return;
      NVAI_SCRAPED_DATA[idRef] = detail;
    });

    document.addEventListener(NVAI_EVENTS.SCRAPE_REQUEST, (event) => {
      const detail = event?.detail || {};
      const { url, idRef, noRedirect = false, prefix = "" } = detail;
      if (!url || !idRef) return;
      const finalUrl = prefix ? `${prefix}${url}` : url;
      try {
        chrome.runtime.sendMessage(
          { type: "NOVAI_FETCH_SCRIPTS", url: finalUrl, noRedirect: !!noRedirect },
          (resp) => {
            const runtimeErr = chrome.runtime.lastError;
            if (runtimeErr) {
              document.dispatchEvent(
                new CustomEvent(NVAI_EVENTS.SCRAPE_RESPONSE, {
                  detail: {
                    url: finalUrl,
                    idRef,
                    error: runtimeErr.message || "runtime error",
                  },
                })
              );
              return;
            }

            if (!resp || resp.ok !== true) {
              document.dispatchEvent(
                new CustomEvent(NVAI_EVENTS.SCRAPE_RESPONSE, {
                  detail: {
                    url: finalUrl,
                    idRef,
                    error: resp?.error || "Erro ao obter scripts",
                  },
                })
              );
              return;
            }

            document.dispatchEvent(
              new CustomEvent(NVAI_EVENTS.SCRAPE_RESPONSE, {
                detail: {
                  url: finalUrl,
                  idRef,
                  scripts: resp.scripts || [],
                  html: resp.html || null,
                },
              })
            );
          }
        );
      } catch (err) {
        document.dispatchEvent(
          new CustomEvent(NVAI_EVENTS.SCRAPE_RESPONSE, {
            detail: {
              url: finalUrl,
              idRef,
              error: err?.message || String(err),
            },
          })
        );
      }
    });


    // --- no topo do arquivo (perto das outras variáveis de estado)
let chartHoverCount = 0;
let chartCloseTimer = null;

// helpers
function openPanel(panel, card){
  clearTimeout(chartCloseTimer);
  ensureChartPortal(panel);

  if (!monthlySeries || monthlySeries.length === 0) {
    showChartPlaceholder(monthlyFetchInFlight ? "Carregando..." : "Sem dados ainda");
  } else {
    drawRevenueChart(monthlySeries);
  }
  placePanelNearCard(panel, card, "above");
  panel.style.display = "block";
}
function closePanelLater(panel, delay = 140){
  clearTimeout(chartCloseTimer);
  chartCloseTimer = setTimeout(() => {
    if (chartHoverCount <= 0) hidePanel(panel);
  }, delay);
}

function findCardContentHost(li) {
  return (
    li.querySelector('.poly-card__content') ||            // layout novo
    li.querySelector('.ui-search-result__content') ||     // layout antigo
    li                                                     // fallback: o próprio li
  );
}


  
    // ---- utils ----
    function nowUrlChanged() {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        return true;
      }
      return false;
    }
    const log = (...a) => console.log(NS, ...a);
    const warn = (...a) => console.warn(NS, ...a);
    const error = (...a) => console.error(NS, ...a);
  
    function resetPerPageState() {
      lastVisitas = null;
      lastConvRatio = null;
      lastPrice = null;
      monthlySeries = null;
      monthlyFetchInFlight = false;
      monthlyFetched = false;
      dispatchedProductData.clear();
      NVAI_VISITS_CACHE.clear();
      NVAI_VISITS_IN_FLIGHT.clear();
    }

    function nvaiIsCatalogPath(pathname) {
      if (!pathname) return false;
      const lower = String(pathname).toLowerCase();
      return lower.includes('/p/') || lower.includes('/up/');
    }

    function nvaiIsCatalogHref(href) {
      if (!href) return false;
      try {
        const u = new URL(href, location.origin);
        return nvaiIsCatalogPath(u.pathname);
      } catch {
        return nvaiIsCatalogPath(href);
      }
    }

    function getItemIdFromUrl() {
  const { href, pathname } = window.location;

  // catálogo se a URL tiver /p/ ou /up/ no caminho
  const isCatalog = nvaiIsCatalogPath(pathname);
  
  // captura MLB seguido de exatamente 10 dígitos (como MLB1234567890)
  const ids = [...href.matchAll(/MLB-?(\d{10})/gi)]
    .map(m => `MLB${m[1]}`); // sempre normaliza para MLB + 10 dígitos

  log('getItemIdFromUrl', { href, pathname, isCatalog, ids });

  if (ids.length === 0) return null;

  // catálogo → 2º MLB; comum → 1º MLB (com fallback)
  return isCatalog ? (ids[1] || ids[0]) : ids[0];
}

function isCatalogPage() {
  // catálogo se o pathname tiver /p/ ou /up/
  return nvaiIsCatalogPath(window.location.pathname);
}

function findPdpContainer() {
  return (
    document.querySelector('.ui-pdp-container.ui-pdp-container--pdp') ||
    document.querySelector('main .ui-pdp-container--pdp') ||
    document.querySelector('.ui-vip-core .ui-pdp-container') ||
    null
  );
}

function restoreHostPosition(host) {
  if (host && host.dataset.novaiMadeRelative === '1') {
    host.style.position = host.dataset.novaiPrevPos || '';
    delete host.dataset.novaiPrevPos;
    delete host.dataset.novaiMadeRelative;
  }
}

function isCatalogLi(li){
  if (!li) return false;
  // Qualquer link do card com /p/ ou /up/ indica Catálogo
  return Array.from(li.querySelectorAll('a[href]')).some((a) => nvaiIsCatalogHref(a.getAttribute('href')));
}

function countCatalogInList(ol){
  if (!ol) return 0;
  let n = 0;
  for (const li of Array.from(ol.children)) {
    if (isCatalogLi(li)) n++;
  }
  return n;
}

// ⬇️ helper: extrai nome do item do <li>
function getItemNameFromLi(li) {
  if (!li) return "";
  const clean = (s) => (s || "")
    .replace(/\u200B/g, "")     // zero-width
    .replace(/\s+/g, " ")
    .trim();

  // 1) tenta pelo <a>
  const a =
    li.querySelector('h3 a[href]') ||
    li.querySelector('a[href*="/MLB"]') ||
    li.querySelector('a[href*="/p/"]') ||
    li.querySelector('a[href*="/up/"]') ||
    li.querySelector('a[href]');
  if (a) {
    const t =
      a.getAttribute("title") ||
      a.getAttribute("aria-label") ||
      a.textContent;
    if (t) return clean(t);
  }

  // 2) títulos comuns (layouts novo/antigo)
  const titleSel = [
    ".poly-component__title",
    ".poly-component__title-wrapper",
    ".ui-search-item__title",
    "h3"
  ].join(",");
  const tEl = li.querySelector(titleSel);
  if (tEl) return clean(tEl.textContent);

  return "";
}


function ensureCatalogChipInContainer() {
  const ID = 'novai-catalog-chip';
  const shouldShow = isCatalogPage();
  let chip = document.getElementById(ID);

  // se não for catálogo, remove e restaura host (se tivermos alterado)
  if (!shouldShow) {
    if (chip) {
      const host = chip.parentElement;
      chip.remove();
      restoreHostPosition(host);
    }
    return;
  }

  const host = findPdpContainer();
  if (!host) {
    // container ainda não montou; tenta de novo no próximo ensureUi
    if (chip) {
      const oldHost = chip.parentElement;
      chip.remove();
      restoreHostPosition(oldHost);
    }
    return;
  }

  // garante que o host seja referência de posicionamento
  const pos = getComputedStyle(host).position;
  if (pos === 'static') {
    host.dataset.novaiPrevPos = pos;      // "static"
    host.style.position = 'relative';
    host.dataset.novaiMadeRelative = '1';
  }

  // cria/move o chip
  if (!chip) {
    chip = document.createElement('div');
    chip.id = ID;
    chip.textContent = 'catalogo';
    Object.assign(chip.style, {
      position: 'absolute',
      top: '8px',
      left: '8px',
      zIndex: '1000',
      background: 'var(--novai-ml-yellow, #ffe600)',
      color: '#111',
      fontWeight: '700',
      fontSize: '12px',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '6px 10px',
      borderRadius: '9999px',
      border: '2px solid rgba(0,0,0,.12)',
      boxShadow: '0 6px 18px rgba(0,0,0,.20)',
      pointerEvents: 'none',
      userSelect: 'none',
    });
    host.appendChild(chip);
  } else if (chip.parentElement !== host) {
    const oldHost = chip.parentElement;
    chip.remove();
    restoreHostPosition(oldHost);
    host.appendChild(chip);
  }
}
  
    const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  
// ====== BUSCA/LISTA ======
const NOVAI_SEARCH_BAR_ID = 'novai-search-header';
let searchObs = null;
let classifiedCache = new Set(); // evita reclassificar os mesmos IDs

function isSearchListingPage() {
  // heurística: existe uma lista de itens de busca
  return !!findSearchOl();
}

function findSearchOl() {
  // lista padrão das páginas de busca
  return (
    document.querySelector('ol.ui-search-layout') ||
    document.querySelector('ol.ui-search-layout--stack') ||
    null
  );
}

function findSearchMain() {
  return (
    document.querySelector('main#root-app') ||
    document.querySelector('main[role="main"]#root-app') ||
    document.querySelector('main[role="main"]') ||
    document.querySelector('#root-app') ||
    null
  );
}

// mesma lógica do getItemIdFromUrl, mas para HREF arbitrário
function parseItemIdFromHref(href) {
  if (!href) return null;
  try {
    const u = new URL(href, location.origin);
    const isCatalog = nvaiIsCatalogPath(u.pathname);
    // captura MLB seguido de exatamente 10 dígitos
    const ids = [...u.href.matchAll(/MLB-?(\d{10})/gi)]
      .map(m => `MLB${m[1]}`); // sempre normaliza para MLB + 10 dígitos
    if (ids.length === 0) return null;
    return isCatalog ? (ids[1] || ids[0]) : ids[0];
  } catch {
    return null;
  }
}

function collectSearchItems() {
  const ol = findSearchOl();
  if (!ol) return { items: [], total: 0 };

  const lis = Array.from(ol.children).filter(el => el.tagName === 'LI');
  const seen = new Set();
  const items = [];

  for (const li of lis) {
    const a =
      li.querySelector('h3 a[href]') ||
      li.querySelector('a[href*="/MLB"]') ||
      li.querySelector('a[href*="/p/"]') ||
      li.querySelector('a[href*="/up/"]') ||
      li.querySelector('a[href]');
    if (!a) continue;

    const url = a.getAttribute('href');
    const id = parseItemIdFromHref(url);
    if (!id || seen.has(id)) continue;
    seen.add(id);

    const isCatalog = nvaiIsCatalogHref(url);
    items.push({ url, itemId: id, catalog: isCatalog, li });
  }

  return { items, total: lis.length };
}

function findMlHeader() {
  return (
    document.querySelector('header.nav-header') ||
    document.querySelector('header[role="banner"].nav-header') ||
    document.querySelector('header.i-navigation-v2') ||
    document.querySelector('header[role="banner"]') ||
    null
  );
}


function ensureSearchBarSkeleton() {
  let bar = document.getElementById(NOVAI_SEARCH_BAR_ID);
  if (bar) return bar;

  ensureSearchListStyles();

  const header = findMlHeader();
  const main   = findSearchMain() || document.body;

  bar = document.createElement('div');
  bar.id = NOVAI_SEARCH_BAR_ID;
  // zera margem pra “colar”, e tira raio no topo pra não ficar espaço
  bar.style.margin = '0';
  bar.innerHTML = `
  <div class="nv-wrap"
       style="justify-content: space-evenly; margin:0; border-top-left-radius:0; border-top-right-radius:0;">
    <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content: space-evenly; width:100%;">
      <span class="nv-pill">🚚 <b>FULL:</b>&nbsp;<span id="novai-count-full">0</span></span>
      <span class="nv-pill">📣 <b>ADS:</b>&nbsp;<span id="novai-count-ads">0</span></span>
      <span class="nv-pill">🏷️ <b>CATÁLOGO:</b>&nbsp;<span id="novai-count-catalog">0</span></span>
      <span id="novai-competition-pill" class="nv-pill">
        🔥 <b>CONCORRÊNCIA:</b>&nbsp;<span id="novai-competition">—</span>
      </span>
    </div>
  </div>
`;


  if (header && header.parentElement) {
    // insere logo DEPOIS do header oficial
    header.parentElement.insertBefore(bar, header.nextSibling);
  } else {
    // fallback: ainda cola no topo do main
    if (main.firstChild) main.insertBefore(bar, main.firstChild);
    else main.appendChild(bar);
  }

  return bar;
}



function updateSearchBarCounts({ full = 0, ads = 0, catalog = 0, total = 0 }) {
  const elF = document.getElementById('novai-count-full');
  const elA = document.getElementById('novai-count-ads');
  const elC = document.getElementById('novai-count-catalog');
  const comp = document.getElementById('novai-competition');
  const compPill = document.getElementById('novai-competition-pill');

  if (elF) elF.textContent = String(full);
  if (elA) elA.textContent = String(ads);
  if (elC) elC.textContent = String(catalog);

  if (comp && compPill) {
    if (total > 25) {
      comp.textContent = 'Alta';
      compPill.style.background = 'var(--novai-ml-yellow,#ffe600)';
      compPill.style.color = '#111';
      compPill.style.borderColor = '#111';
      compPill.style.fontWeight = '900';
    } else {
      comp.textContent = '—';
      compPill.style.background = '#222';
      compPill.style.color = '#fff';
      compPill.style.borderColor = '#fff';
      compPill.style.fontWeight = '700';
    }
  }
}

function countAdsInList(ol){
  if (!ol) return 0;
  let n = 0;
  for (const li of Array.from(ol.children)) {
    if (isAdsInLi(li)) n++;
  }
  return n;
}

function isAdsInLi(li) {
  if (!li) return false;

  // seletores específicos do layout novo e variantes
  const selectors = [
    'a.poly-component__ads-promotion',
    '.poly-component__ads-promotion',
    '[data-testid="sponsored-label"]',
    '[aria-label="Patrocinado"]',
    '[aria-label*="patrocinad" i]',
    '[aria-label*="anúncio" i]',
    '[aria-label*="anuncio" i]',
    '.poly-component__sponsored',
    '.poly-component__ad',
    '.ui-search-item__ad-label',
    '.ui-search-item__ad-badge',
    '.ui-search-item__ad',
  ];
  if (li.querySelector(selectors.join(','))) return true;

  // link “oficial” para página de publicidade no footer
  const footer = li.querySelector('.poly-footer');
  if (footer && footer.querySelector('a[href*="publicidade.mercadolivre.com.br"]')) return true;

  // fallback por texto (sem acento)
  const scope = footer || li;
  const norm = (s) => (s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();

  const texts = Array.from(scope.querySelectorAll('a, span, small, div'))
    .map(el => norm(el.textContent));

  const hasBadge = texts.some(t =>
    (/\bpatrocinad[oa]s?\b/.test(t) || /\banuncio\b/.test(t)) &&
    !/\bnao\b.*\bpatrocinad[oa]s?\b/.test(t)
  );

  return hasBadge;
}

// Gera uma chave estável a partir da URL do card.
// Removemos params voláteis e o fragmento (#...).
function normalizeUrlKey(href) {
  if (!href) return "";
  try {
    const u = new URL(href, location.origin);
    // params que mudam a cada pageview / não ajudam a identificar o item
    const DROP = new Set([
      "a","position","type","tracking_id","sid","backend_model","search_layout",
      "polycard_client","is_advertising","has_official_store","headerTopBrand","searchVariation"
    ]);
    const keep = new URLSearchParams();
    // Mantém somente os parâmetros estáveis (ex.: 'wid' quando existir)
    u.searchParams.forEach((v, k) => { if (!DROP.has(k)) keep.append(k, v); });

    // Reordena os params para ficar determinístico
    const ordered = [...keep.entries()].sort(([k1],[k2]) => k1.localeCompare(k2));
    const search = ordered.length
      ? "?" + ordered.map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join("&")
      : "";

    // Sem fragmento
    return `${u.protocol}//${u.host.toLowerCase()}${u.pathname}${search}`;
  } catch {
    return String(href);
  }
}

// Pega a URL absoluta principal do <li> e já retorna a url_key
function getLiUrlKey(li) {
  const a =
    li.querySelector('h3 a[href]') ||
    li.querySelector('a[href*="/MLB"]') ||
    li.querySelector('a[href*="/p/"]') ||
    li.querySelector('a[href*="/up/"]') ||
    li.querySelector('a[href]');
  if (!a) return null;

  const hrefRaw = a.getAttribute('href');
  const abs = a.href || new URL(hrefRaw, location.origin).href;
  return normalizeUrlKey(abs);
}


function getLiItemData(li){
  if (!li) return null;
  const a =
    li.querySelector('h3 a[href]') ||
    li.querySelector('a[href*="/MLB"]') ||
    li.querySelector('a[href*="/p/"]') ||
    li.querySelector('a[href*="/up/"]') ||
    li.querySelector('a[href]');
  if (!a) return null;

  // URL absoluta (evita problemas com URL relativa)
  const hrefRaw = a.getAttribute('href');
  const urlAbs = a.href || new URL(hrefRaw, location.origin).href;

  const itemId = parseItemIdFromHref(urlAbs);
  if (!itemId) return null;

  return { itemId, url: urlAbs };
}
// === IDs direto do <ol> ===
function getLiItemId(li){
  if (!li) return null;
  // tenta por href
  const a = li.querySelector('h3 a[href], a[href*="/MLB"], a[href*="/p/"], a[href*="/up/"], a[href]');
  if (a) {
    const id = parseItemIdFromHref(a.getAttribute('href'));
    if (id) return id;
  }
  // fallback: pega por data-attrs comuns
  const wid = li.getAttribute('data-wid') || li.dataset?.wid || "";
  if (/^MLB\d{10}$/i.test(wid)) return wid.toUpperCase();
  return null;
}


function collectItemsFromOl(ol) {
  const items = [];
  if (!ol) return items;

  const lis = Array.from(ol.children).filter(el => el.tagName === 'LI');
  const seen = new Set();

  for (const li of lis) {
    const a =
      li.querySelector('h3 a[href]') ||
      li.querySelector('a[href*="/MLB"]') ||
      li.querySelector('a[href*="/p/"]') ||
      li.querySelector('a[href*="/up/"]') ||
      li.querySelector('a[href]');
    if (!a) continue;

    const href = a.getAttribute('href');
    // captura MLB seguido de exatamente 10 dígitos
    const match = href.match(/MLB-?(\d{10})/i);
    const id = match ? `MLB${match[1]}` : null;
    if (!id || seen.has(id)) continue;
    seen.add(id);

    // URL absoluta
    let url;
    try { url = new URL(href, location.origin).href; } catch { url = href; }

    const urlKey = normalizeUrlKey(url);
    const itemName = getItemNameFromLi(li);
    const catalog = nvaiIsCatalogHref(url);

    items.push({ itemId: id, url, urlKey, itemName, li, catalog });
  }
  return items;
}


async function nvaiLoadCachedProductData(itemIds) {
  if (!Array.isArray(itemIds) || itemIds.length === 0) return {};
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        { type: "NOVAI_GET_PRODUCT_DATA", itemIds },
        (resp) => {
          const runtimeErr = chrome.runtime.lastError;
          if (runtimeErr) {
            warn("Erro ao obter cache de produtos", runtimeErr);
            resolve({});
            return;
          }
          if (resp?.ok && resp.data) {
            document.dispatchEvent(
              new CustomEvent(NVAI_EVENTS.PRODUCT_DATA_RESPONSE, { detail: resp.data })
            );
            resolve(resp.data);
          } else {
            resolve({});
          }
        }
      );
    } catch (err) {
      warn("Falha ao solicitar cache ao background", err);
      resolve({});
    }
  });
}

function nvaiCalculateAgeDays(startTime) {
  if (!startTime) return null;
  const date = new Date(startTime);
  if (Number.isNaN(date.getTime())) return null;
  const diff = Date.now() - date.getTime();
  if (!Number.isFinite(diff)) return null;
  const safeDiff = diff <= 0 ? 0 : diff;
  const wholeDays = Math.floor(safeDiff / (24 * 3600 * 1000));
  return wholeDays + 1;
}

function nvaiParseSalesText(str) {
  if (!str || typeof str !== "string") return null;
  const normalized = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const match = normalized.match(/(?:mais\s+de\s+)?\+?\s*([\d.,]+)\s*(milhoes?|milhao|mil|m|k)?\s*vendid[oa]s/);
  if (!match) return null;
  let raw = match[1].replace(/\./g, "").replace(",", ".");
  let num = Number.parseFloat(raw);
  if (!Number.isFinite(num)) return null;
  const suffix = (match[2] || "").toLowerCase();
  if (suffix.startsWith("milh") || suffix === "m") num *= 1_000_000;
  else if (suffix.startsWith("mil") || suffix === "k") num *= 1_000;
  return Math.round(num);
}

function nvaiBuildCanonicalProductUrl(itemId) {
  if (!itemId) return null;
  const normalized = String(itemId).toUpperCase();
  if (!/^MLB-?\d+$/.test(normalized)) return null;
  const withDash = normalized.includes('-')
    ? normalized
    : normalized.replace(/^MLB/, 'MLB-');
  return `https://produto.mercadolivre.com.br/${withDash}`;
}

function nvaiDecodeJsonString(str) {
  try {
    return JSON.parse(`"${str}"`);
  } catch {
    return str
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/\\"/g, '"');
  }
}

function nvaiStripScriptWrapper(script) {
  if (!script) return "";
  return script
    .replace(/^<script[^>]*>/i, "")
    .replace(/<\/script>$/i, "")
    .trim();
}

function nvaiSafeJsonParse(str) {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function nvaiExtractStateFromScriptBody(body) {
  if (!body) return null;
  const trimmed = body.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("{") && trimmed.includes("pageState")) {
    const parsed = nvaiSafeJsonParse(trimmed);
    if (parsed) return parsed.pageState || parsed.initialState || parsed;
  }

  const preloadedMatch = body.match(/window\.__PRELOADED_STATE__\s*=\s*(\{[\s\S]*?\})\s*;/);
  if (preloadedMatch && preloadedMatch[1]) {
    const parsed = nvaiSafeJsonParse(preloadedMatch[1]);
    if (parsed) return parsed;
  }

  const pushMatch = body.match(/w\[l\]\.push\((\{[\s\S]*?\})\)/);
  if (pushMatch && pushMatch[1]) {
    const parsed = nvaiSafeJsonParse(pushMatch[1]);
    if (parsed) return parsed;
  }

  return null;
}

function nvaiExtractSalesDataFromState(state) {
  if (!state || typeof state !== "object") return null;
  const initial = state.initialState || state.pageState || state;
  const components = initial?.components || {};
  const header = components.header || initial?.header || {};
  const subtitles = [
    header.subtitle,
    header.subtitleText,
    header?.title_subtitle?.subtitle,
    initial?.subtitle,
  ].filter(Boolean);

  let sales = null;
  let subtitleUsed = null;
  for (const text of subtitles) {
    const parsed = nvaiParseSalesText(text);
    if (parsed != null) {
      sales = parsed;
      subtitleUsed = text;
      break;
    }
  }

  const track = components.track || initial?.track || {};
  const melidata = track.melidata_event || {};
  const gtm = track.gtm_event || {};

  const startTime =
    state.startTime ||
    gtm.startTime ||
    gtm.start_time ||
    melidata.event_data?.start_time ||
    melidata.event_data?.startTime ||
    initial?.metadata?.stats?.start_time ||
    null;

  if (sales == null && typeof subtitleUsed !== "string" && typeof header === "object") {
    const fallback = header?.subtitle_html || header?.subtitleHtml;
    if (fallback) {
      const parsed = nvaiParseSalesText(fallback);
      if (parsed != null) sales = parsed;
    }
  }

  return { sales, startTime, subtitle: subtitleUsed };
}

function nvaiExtractSubtitleFromBody(body) {
  if (!body) return null;
  const subtitleMatch = body.match(/"subtitle"\s*:\s*"([^"\\]*?(?:vendid[^"\\]*?))"/i);
  if (subtitleMatch && subtitleMatch[1]) {
    return nvaiDecodeJsonString(subtitleMatch[1]);
  }
  return null;
}

function nvaiExtractSalesDataFromScript(script) {
  if (!script) return null;
  const body = nvaiStripScriptWrapper(script);
  if (!body) return null;

  const state = nvaiExtractStateFromScriptBody(body);
  if (state) {
    const parsed = nvaiExtractSalesDataFromState(state);
    if (parsed && (parsed.sales != null || parsed.startTime)) {
      return parsed;
    }
  }

  const subtitle = nvaiExtractSubtitleFromBody(body);
  if (subtitle) {
    const sales = nvaiParseSalesText(subtitle);
    if (sales != null) return { sales, startTime: null, subtitle };
  }

  return null;
}

function nvaiExtractSalesDataFromScripts(scripts) {
  if (!Array.isArray(scripts)) return { sales: null, startTime: null };
  for (const script of scripts) {
    const parsed = nvaiExtractSalesDataFromScript(script);
    if (parsed && (parsed.sales != null || parsed.startTime)) return parsed;
  }
  return { sales: null, startTime: null };
}

async function nvaiScrapeForScripts(itemId, url, canonical = false, options = {}) {
  const key = `${canonical ? "canonical-" : ""}scripts-${itemId}`;
  if (NVAI_SCRAPED_DATA[key] && !NVAI_SCRAPED_DATA[key].error) {
    const cached = NVAI_SCRAPED_DATA[key];
    return cached.scripts || cached.html || [];
  }
  if (NVAI_IN_FLIGHT_SCRIPTS.has(key)) {
    return NVAI_IN_FLIGHT_SCRIPTS.get(key);
  }

  const promise = new Promise((resolve, reject) => {
    const existing = NVAI_SCRAPED_DATA[key];
    if (existing && !existing.error) {
      resolve(existing.scripts || existing.html || []);
      return;
    }

    const onResponse = (event) => {
      const detail = event?.detail;
      if (!detail || detail.idRef !== key) return;
      cleanup();
      if (detail.error) {
        reject(new Error(detail.error));
      } else {
        NVAI_SCRAPED_DATA[key] = detail;
        resolve(detail.scripts || detail.html || []);
      }
    };

    const onTimeout = () => {
      cleanup();
      reject(new Error("Timeout"));
    };

    const cleanup = () => {
      clearTimeout(timer);
      document.removeEventListener(NVAI_EVENTS.SCRAPE_RESPONSE, onResponse);
      NVAI_IN_FLIGHT_SCRIPTS.delete(key);
    };

    document.addEventListener(NVAI_EVENTS.SCRAPE_RESPONSE, onResponse);
    const timer = setTimeout(onTimeout, options.timeoutMs || 10000);

    document.dispatchEvent(
      new CustomEvent(NVAI_EVENTS.SCRAPE_REQUEST, {
        detail: {
          url,
          idRef: key,
          noRedirect: !!options.noRedirect,
          prefix: options.prefix || "",
        },
      })
    );
  });

  NVAI_IN_FLIGHT_SCRIPTS.set(key, promise);
  return promise;
}


function nvaiGetAgeColor(days) {
  if (days == null) return "#3b82f6";
  if (days > 365) return "#ff0000";
  if (days > 180) return "#f7b500";
  return "#22c55e";
}

function nvaiShouldShareProductData(sales, days) {
  if (sales == null || days == null) return false;
  if (sales >= 100 && days > 30) return true;
  if (sales < 5 && days > 45) return true;
  if (sales < 100 && days >= 90) return true;
  return false;
}

function nvaiDispatchSharedProductData(itemId, startTime, sales) {
  if (!itemId || !startTime) return;
  const key = `${itemId}|${startTime}`;
  if (dispatchedProductData.has(key)) return;
  dispatchedProductData.add(key);
  const detail = {
    itemId,
    startTime,
    itemSales: sales ?? null,
    sales: sales ?? null,
  };
  document.dispatchEvent(new CustomEvent("StoreProductData", { detail }));
}

function ensureNovaiCardSkeleton(li, itemId) {
  if (!li) return null;
  li.classList.add('novai-card-tuned');
  const host = findCardContentHost(li) || li;
  let card = host.querySelector('.novai-metrics-card');
  if (!card) {
    card = document.createElement('div');
    card.className = 'novai-metrics-card';
    host.insertBefore(card, host.firstChild);
  }
  card.dataset.novaiItemId = itemId;
  li.setAttribute('product-id', itemId);
  return card;
}

function updateNovaiMetricsCard(li, itemId, data = {}) {
  const card = ensureNovaiCardSkeleton(li, itemId);
  if (!card) return;

  const {
    loading = false,
    sales = null,
    startTime = null,
    days: daysOverride = null,
    error = false,
  } = data;

  const days = daysOverride != null ? daysOverride : nvaiCalculateAgeDays(startTime);
  const color = nvaiGetAgeColor(days);
  const loader = NVAI_SPINNER_HTML;

  const salesValue = Number.isFinite(Number(sales)) ? Math.max(0, Math.round(Number(sales))) : null;
  const displaySales = loading
    ? loader
    : salesValue != null
    ? (salesValue >= 5 ? `+${salesValue}` : String(salesValue))
    : '--';

  const displayDays = loading
    ? loader
    : days != null
    ? `${days} dia${days === 1 ? '' : 's'}`
    : '--';

  const visitsEntry = NVAI_VISITS_CACHE.get(itemId);
  const visitsLoading = NVAI_VISITS_IN_FLIGHT.has(itemId);
  const visitsValue =
    visitsEntry && Number.isFinite(Number(visitsEntry.total))
      ? Math.max(0, Math.round(Number(visitsEntry.total)))
      : null;
  const displayVisits = visitsLoading
    ? loader
    : visitsValue != null
    ? visitsValue.toLocaleString('pt-BR')
    : '-';
  const visitsButtonState = visitsLoading ? 'loading' : visitsEntry ? 'ready' : 'idle';
  const visitsButtonLabel = visitsEntry ? 'Detalhes' : 'Ver';

  card.innerHTML = `
    <div class="novai-metric-block">
      <span class="novai-metric-label">Criado ha</span>
      <strong>${displayDays}</strong>
    </div>
    <div class="novai-metric-block">
      <span class="novai-metric-label">Vendas</span>
      <strong id="nvai-sales-${itemId}">${displaySales}</strong>
    </div>
    <div class="novai-metric-block novai-visits-block">
      <span class="novai-metric-label">Visitas (6m)</span>
      <div class="novai-visits-row">
        <strong id="novai-visits-${itemId}">${displayVisits}</strong>
        <button
          type="button"
          class="novai-visits-trigger"
          data-item-id="${itemId}"
          data-state="${visitsButtonState}"
        >
          ${visitsLoading ? loader : visitsButtonLabel}
        </button>
      </div>
    </div>
  `;

  card.style.borderLeftColor = color;
  card.dataset.novaiStatus = loading ? 'loading' : (error ? 'error' : 'ready');
  nvaiWireVisitsTrigger(card, itemId);

  if (!loading) {
    if (salesValue != null) li.setAttribute('sales', String(salesValue));
    if (days != null) li.setAttribute('product-days', String(days));
    if (startTime) li.setAttribute('product-start-time', startTime);
    const cacheEntry = {
      itemId,
      itemSales: salesValue,
      startTime: startTime || null,
      itemDays: days != null ? days : null,
      updatedAt: Date.now(),
    };
    NVAI_CARD_CACHE.set(itemId, cacheEntry);

    const effectiveStart = startTime || li.getAttribute('product-start-time') || null;
    if (nvaiShouldShareProductData(salesValue, days) && effectiveStart) {
      nvaiDispatchSharedProductData(itemId, effectiveStart, salesValue);
    }
  }
}
function applyCachedNovaiMetrics(ol) {
  if (!ol) return;
  for (const li of Array.from(ol.children)) {
    const itemId = getLiItemId(li);
    if (!itemId) continue;
    const cached = NVAI_CARD_CACHE.get(itemId) || NVAI_PRODUCT_STORAGE.items[itemId];
    if (!cached) continue;
    updateNovaiMetricsCard(li, itemId, {
      sales: cached.itemSales ?? cached.sales ?? null,
      startTime: cached.startTime ?? null,
      days: cached.itemDays ?? (cached.startTime ? nvaiCalculateAgeDays(cached.startTime) : null),
    });
  }
}

function nvaiBuildVisitRanges(months = 6) {
  const ranges = [];
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
  for (let i = 0; i < months; i++) {
    const from = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const to = new Date(start.getFullYear(), start.getMonth() + i + 1, 0);
    const label = from.toLocaleString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '').trim();
    ranges.push({
      date_from: from.toISOString().slice(0, 10),
      date_to: to.toISOString().slice(0, 10),
      label,
    });
  }
  return ranges;
}

function nvaiFetchVisitSeries(itemId) {
  if (!itemId) return Promise.reject(new Error('itemId ausente'));
  if (NVAI_VISITS_CACHE.has(itemId)) {
    return Promise.resolve(NVAI_VISITS_CACHE.get(itemId));
  }
  if (NVAI_VISITS_IN_FLIGHT.has(itemId)) {
    return NVAI_VISITS_IN_FLIGHT.get(itemId);
  }

  const ranges = nvaiBuildVisitRanges(6);
  const payload = ranges.map(({ date_from, date_to }) => ({ date_from, date_to }));

  const promise = new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(
        { type: 'NOVAI_FETCH_VISITS_SERIES', itemId, ranges: payload },
        (response) => {
          const runtimeErr = chrome.runtime.lastError;
          if (runtimeErr) {
            reject(new Error(runtimeErr.message || 'runtime error'));
            return;
          }
          if (!response || response.ok !== true) {
            reject(new Error(response?.error || 'Erro ao obter visitas'));
            return;
          }

          const rawSeries = Array.isArray(response.data?.series) ? response.data.series : [];
          const mapped = rawSeries.map((entry, idx) => {
            const base = ranges[idx] || {};
            const visits = Number(entry?.visits ?? entry?.total_visits ?? entry?.total ?? 0) || 0;
            return {
              date_from: entry?.date_from || base.date_from,
              date_to: entry?.date_to || base.date_to,
              label: entry?.label || base.label || `${base.date_from} - ${base.date_to}`,
              visits,
            };
          });

          const suppliedTotal = Number(response.data?.total);
          const total = Number.isFinite(suppliedTotal) && suppliedTotal >= 0
            ? Math.round(suppliedTotal)
            : mapped.reduce((acc, seg) => acc + (Number(seg.visits) || 0), 0);

          const cacheEntry = {
            total,
            series: mapped,
            fetchedAt: Date.now(),
          };
          NVAI_VISITS_CACHE.set(itemId, cacheEntry);
          resolve(cacheEntry);
        }
      );
    } catch (err) {
      reject(err);
    }
  }).catch((err) => {
    NVAI_VISITS_CACHE.delete(itemId);
    throw err;
  });

  const inflight = promise.finally(() => NVAI_VISITS_IN_FLIGHT.delete(itemId));
  NVAI_VISITS_IN_FLIGHT.set(itemId, inflight);
  return inflight;
}

function nvaiWireVisitsTrigger(card, itemId) {
  const btn = card.querySelector(`.novai-visits-trigger[data-item-id="${itemId}"]`);
  const valueEl = card.querySelector(`#novai-visits-${itemId}`);
  if (!btn || !valueEl) return;

  const setResult = (data) => {
    const total = Number(data?.total) || 0;
    valueEl.textContent = total.toLocaleString('pt-BR');
    btn.dataset.state = 'ready';
    btn.textContent = 'Detalhes';
    if (Array.isArray(data?.series) && data.series.length) {
      btn.title = data.series
        .map((seg) => {
          const label = seg.label || `${seg.date_from || ''} - ${seg.date_to || ''}`;
          const val = Number(seg.visits || 0).toLocaleString('pt-BR');
          return `${label}: ${val}`;
        })
        .join('\n');
    }
  };

  const setLoading = () => {
    btn.dataset.state = 'loading';
    btn.innerHTML = NVAI_SPINNER_HTML;
    valueEl.innerHTML = NVAI_SPINNER_HTML;
  };

  const setError = (message) => {
    btn.dataset.state = 'error';
    btn.textContent = 'Erro';
    valueEl.textContent = '-';
    if (message) btn.title = message;
  };

  const ensureData = () => {
    if (NVAI_VISITS_CACHE.has(itemId)) {
      setResult(NVAI_VISITS_CACHE.get(itemId));
      return;
    }
    if (btn.dataset.state === 'loading') return;
    setLoading();
    nvaiFetchVisitSeries(itemId)
      .then((data) => setResult(data))
      .catch((err) => {
        warn('Falha ao coletar visitas', { itemId, err });
        setError(err?.message || 'Erro nas visitas');
      });
  };

  if (btn.dataset.bound === '1') {
    if (NVAI_VISITS_CACHE.has(itemId)) {
      setResult(NVAI_VISITS_CACHE.get(itemId));
    }
    return;
  }
  btn.dataset.bound = '1';

  btn.addEventListener('mouseenter', ensureData, { once: true });
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    ensureData();
  });

  if (NVAI_VISITS_CACHE.has(itemId)) {
    setResult(NVAI_VISITS_CACHE.get(itemId));
  }
}
async function nvaiProcessSearchItems(items, ol) {
  if (!Array.isArray(items) || items.length === 0) return;
  const itemIds = items.map((it) => it.itemId).filter(Boolean);
  await nvaiLoadCachedProductData(itemIds);
  if (ol) applyCachedNovaiMetrics(ol);

  for (const item of items) {
    const { itemId, url, li, catalog } = item;
    if (!itemId || !url || !li) continue;

    const cached = NVAI_CARD_CACHE.get(itemId) || NVAI_PRODUCT_STORAGE.items[itemId];
    if (cached && (cached.itemSales != null || cached.sales != null)) {
      updateNovaiMetricsCard(li, itemId, {
        sales: cached.itemSales ?? cached.sales ?? null,
        startTime: cached.startTime ?? null,
        days: cached.itemDays ?? null,
      });
      continue;
    }

    updateNovaiMetricsCard(li, itemId, { loading: true });

    try {
      const canonicalUrl = catalog ? nvaiBuildCanonicalProductUrl(itemId) : null;
      let parsed = null;

      if (canonicalUrl) {
        try {
          const canonicalScripts = await nvaiScrapeForScripts(itemId, canonicalUrl, true);
          parsed = nvaiExtractSalesDataFromScripts(canonicalScripts);
        } catch (err) {
          warn('Falha ao coletar scripts canônicos do item', { itemId, canonicalUrl, err });
        }
      }

      if (!parsed || (parsed.sales == null && !parsed.startTime)) {
        const fallbackScripts = await nvaiScrapeForScripts(itemId, url, false);
        const fallbackParsed = nvaiExtractSalesDataFromScripts(fallbackScripts);
        if (fallbackParsed && (fallbackParsed.sales != null || fallbackParsed.startTime)) {
          parsed = fallbackParsed;
        }
      }

      if (!parsed || (parsed.sales == null && !parsed.startTime)) {
        updateNovaiMetricsCard(li, itemId, { sales: null, startTime: parsed?.startTime ?? null, error: true });
        continue;
      }

      const payload = {
        itemId,
        itemSales: parsed.sales ?? null,
        startTime: parsed.startTime ?? null,
      };
      document.dispatchEvent(new CustomEvent(NVAI_EVENTS.STORE_PRODUCT_DATA, { detail: payload }));
      updateNovaiMetricsCard(li, itemId, {
        sales: parsed.sales ?? null,
        startTime: parsed.startTime ?? null,
      });
    } catch (err) {
      warn('Falha ao coletar scripts do item', { itemId, url, err });
      updateNovaiMetricsCard(li, itemId, { error: true });
    }
  }

  if (ol) applyCachedNovaiMetrics(ol);
}


function wireSearchBarButton() {
  const btn = document.getElementById('novai-btn-buscar-metricas');
  if (!btn) return;

  btn.onclick = async () => {
    const ol = findSearchOl();
    const { items } = collectSearchItems();
    const list = items.length ? items : collectItemsFromOl(ol);
    if (!list.length) return;

    btn.disabled = true;
    const orig = btn.textContent;
    btn.textContent = 'Carregando...';

    try {
      await nvaiProcessSearchItems(list, ol);
      btn.textContent = 'Métricas ativadas ✔';
      setTimeout(() => (btn.textContent = orig), 1800);
    } catch (err) {
      warn('Erro ao ativar métricas de busca', err);
      btn.textContent = 'Tentar novamente';
      setTimeout(() => (btn.textContent = orig), 1800);
    } finally {
      btn.disabled = false;
    }
  };
}




function ensureSearchActionsRow() {
  const ol = findSearchOl();
  if (!ol) return;

  let row = document.getElementById('novai-actions-row');
  if (!row) {
    row = document.createElement('div');
    row.id = 'novai-actions-row';
    row.style.display = 'flex';
    row.style.justifyContent = 'flex-start'; // botão à esquerda
    row.style.margin = '8px 0 14px';
    row.innerHTML = `
      <button id="novai-btn-buscar-metricas" class="nv-btn">
        Ativar Métricas de Busca
      </button>
    `;
    ol.parentElement.insertBefore(row, ol);
  }
  wireSearchBarButton();
}

function isFullInLi(li) {
  if (!li) return false;

  // seletores comuns do badge/ícone FULL (layout novo e antigo)
  const selectors = [
    'svg[aria-label="FULL"]',
    '[aria-label="FULL"]',
    '[aria-label*="full" i]',
    'use[href="#poly_full"]',
    '[data-testid*="full" i]',
    '.ui-search-item__full',                 // legacy
    '.ui-search-item__shipping--full',       // legacy
    '.poly-component__shipping svg[aria-label="FULL"]',
    '.poly-component__shipping [aria-label*="full" i]',
  ];
  if (li.querySelector(selectors.join(','))) return true;

  // checa as áreas onde o texto "Enviado pelo FULL" costuma aparecer
  const scopes = [
    '.poly-component__shipping',
    '.poly-component__shipped-from',
    '.ui-search-item__shipping',
    '.ui-search-item__group__element',
    '.poly-content', '.poly-footer', '.ui-search-result__content'
  ];

  const norm = (s) => (s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();

  for (const sel of scopes) {
    const el = li.querySelector(sel);
    if (!el) continue;
    const t = norm(el.textContent);
    // pega "enviado pelo full", "full" isolado etc. (evita falso positivo tipo "perfil")
    if (/\benviado pelo\b.*\bfull\b/.test(t) || /\bfull\b/.test(t)) return true;
  }

  return false;
}


function ensureSearchListStyles() {
  if (document.getElementById('novai-search-styles')) return;
  const st = document.createElement('style');
  st.id = 'novai-search-styles';
  st.textContent = `
    /* ===== Header NOVAI (preto + amarelo) ===== */
    #${NOVAI_SEARCH_BAR_ID} .nv-wrap{
      background:#111; color:#fff; border:1px solid #fff;
      display:flex; align-items:center; gap:16px;
      padding:10px 14px; border-radius:10px; margin:12px 0 8px 0;
      box-shadow:0 8px 22px rgba(0,0,0,.25);
    }
    #${NOVAI_SEARCH_BAR_ID} .nv-title{ font:800 13px/1 system-ui,-apple-system,Segoe UI,Roboto; letter-spacing:.04em; text-transform:uppercase; color:#ffe600 }
    #${NOVAI_SEARCH_BAR_ID} .nv-pill{
      display:inline-flex; align-items:center; gap:6px;
      background:#222; border:1px solid #fff; color:#fff;
      padding:6px 10px; border-radius:9999px; font-weight:700; font-size:12px;
    }
    #${NOVAI_SEARCH_BAR_ID} .nv-pill b{ letter-spacing:.02em }

    /* Row do botão (fora do header) */
    #novai-actions-row{
      display:flex; justify-content:flex-end; margin:8px 0 14px;
    }
    #novai-actions-row .nv-btn{
      background:var(--novai-ml-yellow,#ffe600); color:#111; font-weight:900;
      padding:8px 12px; border-radius:10px; border:1px solid #111; cursor:pointer;
    }

    /* ===== Grid 3 colunas ===== */
    ol.ui-search-layout.novai-three-col{
      display:grid !important;
      grid-template-columns: repeat(3, minmax(0,1fr)) !important;
      gap:16px !important;
    }
    @media (max-width: 1200px){
      ol.ui-search-layout.novai-three-col{ grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
    }
    @media (max-width: 720px){
      ol.ui-search-layout.novai-three-col{ grid-template-columns: 1fr !important; }
    }
    ol.ui-search-layout.novai-three-col > li{
      list-style:none !important;
      position:relative !important;
      min-height: 100%;
    }

    /* ===== Reorganiza card: imagem em cima, info embaixo ===== */
    /* Poly card (layout novo do ML) */
    .novai-card-tuned .poly-card{ 
      display:flex !important; flex-direction:column !important; 
      height:100%; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; background:#fff;
    }
    .novai-card-tuned .poly-card__portada, 
    .novai-card-tuned .poly-card__portada *{
      width:100% !important;
    }
    .novai-card-tuned .poly-card__portada{
      aspect-ratio:1/1; display:block; background:#fff; 
    }
    .novai-card-tuned .poly-card__portada img{
      width:100% !important; height:100% !important; object-fit:contain !important;
      display:block; background:#fff;
    }
    .novai-card-tuned .poly-card__content{ 
      order:2; padding:10px 12px; display:flex; flex-direction:column; gap:8px;
      flex:1 1 auto;
    }
    .novai-card-tuned h3, 
    .novai-card-tuned .poly-component__title-wrapper, 
    .novai-card-tuned .poly-component__title{
      display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
      margin:0; font-weight:700;
    }

    /* Layout antigo (fallback) */
    .novai-card-tuned .ui-search-result__wrapper{
      display:flex !important; flex-direction:column !important; height:100%;
      border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; background:#fff;
    }
    .novai-card-tuned .ui-search-result__image{
      aspect-ratio:1/1; width:100%; background:#fff;
    }
    .novai-card-tuned .ui-search-result__image img,
    .novai-card-tuned .ui-search-result-image__element{
      width:100% !important; height:100% !important; object-fit:contain !important; background:#fff;
    }
    .novai-card-tuned .ui-search-result__content{
      padding:10px 12px; display:flex; flex-direction:column; gap:8px; flex:1 1 auto;
    }
    .novai-card-tuned .ui-search-item__title{ 
      display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; 
      margin:0; font-weight:700;
    }

    /* Badge "catalogo" no card */
    .novai-catalog-badge{
      position:absolute; top:8px; left:8px; z-index:9;
      background:var(--novai-ml-yellow,#ffe600); color:#111;
      border:1px solid #111; border-radius:9999px;
      padding:2px 8px; font:800 11px/1.2 system-ui,-apple-system,Segoe UI,Roboto;
      text-transform:uppercase; letter-spacing:.04em; pointer-events:none;
    }
    .novai-catalog-badge::before{
      content:''; width:6px; height:6px; border-radius:9999px;
      background:#111; display:inline-block; margin-right:6px; vertical-align:middle;
    }
    .novai-metrics-card{
      display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px;
      padding:8px 10px; margin:8px 0 4px;
      background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px;
      border-left:6px solid #22c55e;
      color:#0f172a; box-shadow:0 2px 6px rgba(15,23,42,.08);
      font:600 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto;
    }
    .novai-metric-block{ display:flex; flex-direction:column; gap:2px; min-width:0; flex:1 1 120px; }
    .novai-metric-block strong{ font-weight:800; font-size:14px; }
    .novai-metric-label{ font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.02em; color:#475569; }
    .novai-visits-row{ display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
    .novai-visits-trigger{ display:inline-flex; align-items:center; gap:4px; background:#eef2ff; border:1px solid #c7d2fe; border-radius:9999px; padding:3px 10px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; cursor:pointer; transition:all .2s ease; color:#1e293b; }
    .novai-visits-trigger:hover{ background:#e0e7ff; border-color:#818cf8; }
    .novai-visits-trigger[data-state="loading"]{ opacity:.65; pointer-events:none; }
    .novai-visits-trigger[data-state="error"]{ background:#fee2e2; border-color:#f87171; color:#b91c1c; }
    .novai-spinner{
      display:inline-block;
      width:16px; height:16px;
      border:2px solid rgba(148,163,184,.35);
      border-top-color:#111;
      border-radius:50%;
      animation:novai-spin 0.65s linear infinite;
    }
    @keyframes novai-spin{ to{ transform:rotate(360deg); } }
  `;
  document.head.appendChild(st);
}

function countFullInList(ol){
  if (!ol) return 0;
  let n = 0;
  for (const li of Array.from(ol.children)) {
    if (isFullInLi(li)) n++;
  }
  return n;
}

function ensureCatalogBadgesFromOl(ol){
  if (!ol) return;
  for (const li of Array.from(ol.children)) {
    const isCat = isCatalogLi(li);
    let badge = li.querySelector('.novai-catalog-badge');

    if (isCat) {
      // garante contexto de posicionamento
      const cs = getComputedStyle(li);
      if (cs.position === 'static') {
        li.dataset.novaiPrevPos = 'static';
        li.style.position = 'relative';
      }
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'novai-catalog-badge';
        badge.textContent = 'catalogo';
        li.appendChild(badge);
      }
    } else if (badge) {
      badge.remove();
      if (li.dataset.novaiPrevPos) {
        li.style.position = li.dataset.novaiPrevPos || '';
        delete li.dataset.novaiPrevPos;
      }
    }
  }
}



async function ensureSearchHeader() {
   if (!isSearchListingPage()) {
    const bar = document.getElementById(NOVAI_SEARCH_BAR_ID);
    if (bar) bar.remove();
    const row = document.getElementById('novai-actions-row');
    if (row) row.remove();
    if (searchObs) { searchObs.disconnect(); searchObs = null; }
    return;
  }

  // ... o restante do ensureSearchHeader que já existe ...
  ensureSearchBarSkeleton();
  const { items, total } = collectSearchItems();
  const ol = findSearchOl();
  ensureCatalogBadgesFromOl(ol);
  ensureSearchActionsRow();

  if (ol) applyCachedNovaiMetrics(ol);

  const catalogLocal = countCatalogInList(ol);
  const fullLocal    = countFullInList(ol);
  const adsLocal     = countAdsInList(ol);
  updateSearchBarCounts({ full: fullLocal, ads: adsLocal, catalog: catalogLocal, total });

  if (ol && !searchObs) {
    searchObs = new MutationObserver(() => {
      if (NVAI_CARD_CACHE.size > 0) applyCachedNovaiMetrics(ol);
      ensureSearchHeader();
    });
    searchObs.observe(ol, { childList: true, subtree: false });
  }
}





    // ---- preço ----
    function getPriceFromDom() {
      const a = document.querySelector('[data-testid="price-amount"]');
      if (a) {
        const raw = a.textContent.trim().replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
        const n = parseFloat(raw);
        if (!Number.isNaN(n)) return n;
      }
  
      const frac = document.querySelector(".price-tag-fraction");
      const cents = document.querySelector(".price-tag-cents");
      if (frac) {
        const f = (frac.textContent || "").replace(/[^\d]/g, "");
        const c = ((cents?.textContent || "").replace(/[^\d]/g, "") || "00").padStart(2, "0");
        const n = parseFloat(`${f}.${c}`);
        if (!Number.isNaN(n)) return n;
      }
  
      const itemprop = document.querySelector('[itemprop="price"]');
      if (itemprop) {
        const rawAttr = itemprop.getAttribute("content");
        if (rawAttr) {
          const v = parseFloat(rawAttr.replace(",", "."));
          if (!Number.isNaN(v)) return v;
        }
        const rawTxt = itemprop.textContent?.trim();
        if (rawTxt) {
          const v2 = parseFloat(rawTxt.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", "."));
          if (!Number.isNaN(v2)) return v2;
        }
      }
      return null;
    }
  
    function observePriceArea() {
      const priceArea =
        document.querySelector("#price") ||
        document.querySelector('[data-testid="price-amount"]') ||
        document.querySelector(".ui-pdp-price__second-line");
      if (!priceArea) return;
  
      const obs = new MutationObserver(() => updateFaturamentoCard());
      obs.observe(priceArea, { childList: true, subtree: true, characterData: true });
    }
  
    // ---- vendidos ----
    function getSoldFromDom() {
      const subtitle = document.querySelector(".ui-pdp-header__subtitle, .ui-pdp-subtitle");
      const txt  = (subtitle?.textContent || "").trim();
      const aria = (subtitle?.getAttribute("aria-label") || "").trim();
  
      const n = parseSoldFromText(aria) ?? parseSoldFromText(txt);
      if (Number.isFinite(n) && n > 0) return n;
  
      for (const node of document.querySelectorAll("span, small, div, p")) {
        const v = parseSoldFromText(node.textContent || "");
        if (Number.isFinite(v) && v > 0) return v;
      }
      return null;
    }
  
    function parseSoldFromText(str) {
      if (!str) return null;
      const re = /(?:mais\s+de\s+)?\+?\s*([\d.,]+)\s*(mil(?:h(?:ão|oes))?|milhões?|k|m)?\s*vendid[oa]s/i;
      const m = str.match(re);
      if (!m) return null;
  
      let base = m[1].replace(/\./g, "").replace(",", ".");
      let num = parseFloat(base);
      if (!Number.isFinite(num)) return null;
  
      const suf = (m[2] || "").toLowerCase();
      if (suf.startsWith("milh") || suf === "m") num *= 1_000_000;
      else if (suf.startsWith("mil") || suf === "k") num *= 1_000;
  
      return Math.round(num);
    }
  
    // ---- cards ----
    function updateFaturamentoCard() {
      const el = document.querySelector("#novai-faturamento");
      if (!el) return;
  
      const preco = getPriceFromDom();
      if (preco != null) lastPrice = preco;
  
      const vendidos = getSoldFromDom();
      const visitas = Number(lastVisitas) || 0;
      if (vendidos && visitas > 0) lastConvRatio = vendidos / visitas;
  
      if (preco != null && vendidos != null) {
        const fat = preco * vendidos;
        el.textContent = brl.format(isFinite(fat) ? fat : 0);
        el.title = `Preço: ${brl.format(preco)} × Vendidos: ${vendidos}`;
      } else {
        el.textContent = "—";
        el.title = `Preço: ${preco ?? "?"} | Vendidos: ${vendidos ?? "?"}`;
      }
    }
  
    function updateConversionCard() {
      const el = document.querySelector("#novai-conversao");
      if (!el) return;
  
      const vendidos = getSoldFromDom();
      const visitas = Number(lastVisitas);
      if (vendidos != null && visitas > 0) {
        el.textContent = ((vendidos / visitas) * 100).toFixed(2) + "%";
        el.title = `Vendidos: ${vendidos} • Visitas: ${visitas}`;
      } else {
        el.textContent = "—";
        el.title = `Vendidos: ${vendidos ?? "?"} • Visitas: ${isNaN(visitas) ? "?" : visitas}`;
      }
    }
  
    function observeSubtitleArea() {
  const container = document.querySelector(".ui-pdp-header__subtitle");
  if (!container) return;

  // evita múltiplos observers
  if (subtitleObs) subtitleObs.disconnect();

  subtitleObs = new MutationObserver((mutations) => {
    // se a mudança foi causada por nós, ignora
    if (subtitlePatchLock > 0) return;

    // se removerem/alterarem nosso conteúdo, reaplica
    const hasNovai = !!container.querySelector(".novai-subtitle");
    if (!hasNovai) {
      renderCustomSubtitle(lastCreatedAt);
    } else {
      // mesmo com nosso conteúdo, revalida quando mudar o "vendidos"
      renderCustomSubtitle(lastCreatedAt);
    }
  });

  subtitleObs.observe(container, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}


  
    // ---- gráfico ----
    function showChartPlaceholder(text) {
        const svg = document.querySelector("#novai-chart");
        if (!svg) return;
        while (svg.firstChild) svg.removeChild(svg.firstChild);
      
        const W = svg.viewBox.baseVal.width || 400;
        const H = svg.viewBox.baseVal.height || 180;
      
        // fundo escuro
        const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bg.setAttribute("x", 0); bg.setAttribute("y", 0);
        bg.setAttribute("width", W); bg.setAttribute("height", H);
        bg.setAttribute("fill", "#111");
        bg.setAttribute("pointer-events", "none");
        svg.appendChild(bg);
      
        // texto central
        const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.setAttribute("x", W / 2);
        t.setAttribute("y", H / 2);
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("dominant-baseline", "middle");
        t.setAttribute("fill", "#9ca3af");
        t.setAttribute("font-size", "12");
        t.setAttribute("pointer-events", "none");
        t.textContent = text || "Sem dados";
        svg.appendChild(t);
      }
  
      function drawRevenueChart(series) {
        const panel = document.querySelector("#novai-chart-panel");
        const svg = document.querySelector("#novai-chart");
        if (!panel || !svg || !Array.isArray(series) || series.length === 0) {
          showChartPlaceholder("Sem dados");
          return;
        }
      
        // limpa
        while (svg.firstChild) svg.removeChild(svg.firstChild);
      
        const tip = ensureChartTip(panel);
      
        const W = svg.viewBox.baseVal.width || 400;
        const H = svg.viewBox.baseVal.height || 180;
        const PADL = 34, PADR = 10, PADT = 8, PADB = 24;
        const innerW = W - PADL - PADR;
        const innerH = H - PADT - PADB;
      
        const labels = series.map(d => d.label);
        const values = series.map(d => Math.max(0, Number(d.revenue) || 0));
        const visits = series.map(d => Math.max(0, Number(d.visits) || 0));
        const qty = series.map(d => Math.max(0, Number(d.quantity) || 0));

        const maxV = Math.max(...values, 1);
      
        const x = (i) => PADL + (i * innerW) / Math.max(series.length - 1, 1);
        const y = (v) => PADT + innerH - (v / maxV) * innerH;
      
        // fundo escuro
        const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bg.setAttribute("x", 0); bg.setAttribute("y", 0);
        bg.setAttribute("width", W); bg.setAttribute("height", H);
        bg.setAttribute("fill", "#111");
        bg.setAttribute("pointer-events", "none");
        svg.appendChild(bg);
      
        // grade (amarela, 4 linhas)
        [0.25, 0.5, 0.75, 1].forEach(frac => {
          const yv = PADT + innerH * (1 - frac);
          const ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
          ln.setAttribute("x1", PADL); ln.setAttribute("x2", PADL + innerW);
          ln.setAttribute("y1", yv);   ln.setAttribute("y2", yv);
          ln.setAttribute("stroke", "var(--novai-ml-yellow, #ffe600)");
          ln.setAttribute("stroke-opacity", "0.35");
          ln.setAttribute("stroke-width", "1");
          ln.setAttribute("pointer-events", "none");
          svg.appendChild(ln);
      
          const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
          txt.setAttribute("x", 6); txt.setAttribute("y", yv + 4);
          txt.setAttribute("fill", "#d1d5db");
          txt.setAttribute("font-size", "10");
          txt.setAttribute("pointer-events", "none");
          txt.textContent = brl.format(maxV * frac);
          svg.appendChild(txt);
        });
      
        // linha da série
        const path = document.createElementNS("http://www.w3.org/2000/svg","path");
        const d = values.map((v,i) => (i===0?`M ${x(i)},${y(v)}`:`L ${x(i)},${y(v)}`)).join(" ");
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "var(--novai-ml-yellow, #ffe600)");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("pointer-events", "none"); // não bloquear os pontos
        svg.appendChild(path);
      
        // labels eixo X (MM/AA) – ~6 rótulos
        const step = Math.ceil(series.length / 6);
        series.forEach((pnt, i) => {
          if (i % step !== 0 && i !== series.length - 1) return;
          const tx = document.createElementNS("http://www.w3.org/2000/svg","text");
          tx.setAttribute("x", x(i));
          tx.setAttribute("y", PADT + innerH + 14);
          tx.setAttribute("text-anchor", "middle");
          tx.setAttribute("fill", "#d1d5db");
          tx.setAttribute("font-size", "10");
          tx.setAttribute("pointer-events", "none");
          const mm = (pnt.label || "").slice(5,7);
          const yy = (pnt.label || "").slice(2,4);
          tx.textContent = `${mm}/${yy}`;
          svg.appendChild(tx);
        });
      
        // helpers para tooltip
        const panelRect = () => panel.getBoundingClientRect();
        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
      
        function showTip(i, clientX, clientY) {
          const rect = panelRect();
          const label = labels[i] || "";
          const val = values[i] || 0;
          const vis = visits[i] || 0;
          const q   = qty[i]     || 0;
      
          tip.innerHTML = `
            <div style="font-weight:700">${label}</div>
            <div>${brl.format(val)}</div>
            <div>Quantidade vendida: ${q.toLocaleString('pt-BR')}</div>
            <div style="opacity:.8">Visitas: ${vis.toLocaleString('pt-BR')}</div>
          `;
      
          // posiciona próximo ao cursor
          const pad = 10;
          let left = clientX - rect.left + pad;
          let top  = clientY - rect.top  - 28;
      
          // clampa dentro do painel
          const tipRect = tip.getBoundingClientRect(); // pode ser 0 na 1ª vez, reposiciona no próximo mousemove
          const maxL = rect.width - (tipRect.width || 160) - pad;
          const maxT = rect.height - (tipRect.height || 50) - pad;
          left = clamp(left, pad, maxL);
          top  = clamp(top,  pad, maxT);
      
          tip.style.transform = `translate(${left}px, ${top}px)`;
          tip.style.opacity = "1";
        }

        function hideTip() {
          tip.style.opacity = "0";
          tip.style.transform = "translate(-9999px,-9999px)";
        }
      
        // pontos com listeners
        series.forEach((pnt, i) => {
          const cx = x(i), cy = y(values[i]);
          const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
          c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", "4");
          c.setAttribute("fill", "var(--novai-ml-yellow, #ffe600)");
          c.style.cursor = "default";
          c.style.pointerEvents = "all"; // garante hover nos pontos
          c.addEventListener("mouseenter", (ev) => {
            showTip(i, ev.clientX, ev.clientY);
          });
          c.addEventListener("mousemove", (ev) => {
            showTip(i, ev.clientX, ev.clientY);
          });
          c.addEventListener("mouseleave", () => {
            hideTip();
          });
          svg.appendChild(c);
        });
      }
  
    function triggerMonthlyFetchOnce(itemId) {
      if (monthlyFetched || monthlyFetchInFlight) return;
      monthlyFetchInFlight = true;
  
      const price = lastPrice ?? getPriceFromDom() ?? 0;
      const conv = lastConvRatio ?? (() => {
        const v = getSoldFromDom(), vs = Number(lastVisitas)||0;
        return (v && vs>0) ? v/vs : 0;
      })();
  
      fetchMonthlyFromBG(itemId, price, conv)
  .then(({ labels, visits, revenues, createdAt, quantityMonths }) => {
    if (createdAt != null) {
      lastCreatedAt = createdAt;
      renderCustomSubtitle(createdAt);
    }
    monthlySeries = labels.map((label, i) => ({
      label,
      visits:   Number(visits[i]) || 0,
      revenue:  Number(revenues[i]) || 0,
      quantity: Number(quantityMonths?.[i]) || 0, // << AQUI
    }));

    monthlyFetched = true;
    log("[chart] monthly series pronta:", monthlySeries.length, "pontos");
  })
  .catch(err => warn("[chart] falha no fetch mensal:", err))
  .finally(() => { monthlyFetchInFlight = false; });

    }
  
    function fetchMonthlyFromBG(itemId, price, convRatio) {
  const conversionPct = (Number(convRatio) || 0) * 100; // backend espera %
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: "GET_VISITS_MONTHLY", itemId, conversion: conversionPct, price },
      (response) => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
        if (!response || !response.ok) return reject(response?.error || "falha");

        const data = response.data || {};
        // atualiza a data (troca "--" por "X dias")
        lastCreatedAt = data.createdAt ?? null;
        renderCustomSubtitle(lastCreatedAt);

        resolve(data); // { labels, visits, revenues, createdAt }
      }
    );
  });
}


    function parseCreatedAt(createdAt) {
  if (!createdAt) return null;
  let d = null;
  if (typeof createdAt === "number") d = new Date(createdAt);
  if (!d || isNaN(d.getTime())) d = new Date(String(createdAt));
  if (isNaN(d.getTime())) {
    const s = String(createdAt).slice(0,10).split("-");
    if (s.length === 3) d = new Date(+s[0], +s[1]-1, +s[2]);
  }
  return isNaN(d.getTime()) ? null : d;
}


function daysSince(dateObj) {
  const ms = Date.now() - dateObj.getTime();
  return Math.max(0, Math.floor(ms / (1000*60*60*24)));
}

function extractSoldTextFromNativeSubtitle() {
  const el = document.querySelector(".ui-pdp-header__subtitle .ui-pdp-subtitle");
  if (!el) return null;
  const src = el.getAttribute("aria-label") || el.textContent || "";
  // pega a parte que contém "vendid" (vendido/vendidos)
  const part = src.split("|").map(s => s.trim()).find(s => /vendid/i.test(s));
  return part || null; // ex.: "+750 mil vendidos"
}

/** Substitui o conteúdo do subtítulo por algo personalizado */
function renderCustomSubtitle(createdAtRaw) {
  try {
    const host =
      document.querySelector(".ui-pdp-header__subtitle .ui-pdp-subtitle") ||
      document.querySelector(".ui-pdp-header__subtitle"); // fallback
    if (!host) return;

    // --- CreatedAt
    const created = parseCreatedAt(createdAtRaw);
    let createdFrag = `
      <span class="novai-pill" title="Criado em —">Criado há --</span>`;
    if (created) {
      const d = daysSince(created);
      const label = d === 0 ? "hoje" : `${d} ${d === 1 ? "dia" : "dias"}`;
      createdFrag = `
        <span class="novai-pill" title="Criado em ${created.toLocaleDateString('pt-BR')}">
          Criado há ${label}
        </span>`;
        const el = document.querySelector("#novai-dias");
  if (el) {
    el.textContent = `últimos ${d} dias`;
    el.title = `Desde ${created.toLocaleDateString('pt-BR')}`;
  }
} else {
  // sem data
  const el = document.querySelector("#novai-dias");
  if (el) {
    el.textContent = "—";
    el.title = "Sem informação de criação";
  }
}

    // --- Vendidos (sempre tentamos mostrar)
    const nativeSold = extractSoldTextFromNativeSubtitle() || "";
    let soldFrag = "";
if (nativeSold) {
  // normaliza o texto nativo (remove "|" e pontos depois de "Novo")
  let raw = nativeSold.replace(/\s*\|\s*/g, " ").replace(/\s{2,}/g, " ").trim();

  // detecta se contém "Novo"
  const hasNovo = /^novo\b/i.test(raw);

  // extrai/ajusta a parte da contagem de vendidos
  let count = raw
    .replace(/^novo[.\s]*/i, "")       // tira "Novo" do começo
    .replace(/^\+/, "Mais de ")        // "+750 mil vendidos" -> "Mais de 750 mil vendidos"
    .replace(/^mais\s+de\s*/i, "Mais de ")
    .trim();

  // garante que começa com "Mais de "
  if (!/^Mais de /i.test(count)) {
    count = "Mais de " + count;
  }
  // garante sufixo "vendidos"
  if (!/vendid[oa]s$/i.test(count)) {
    count = count.replace(/\.*$/, "") + " vendidos";
  }

  const line1 = hasNovo ? "Novo" : "";
  const line2 = count;

  // quebra de linha entre as duas partes
  const labelHtml = [line1, line2].filter(Boolean).join("<br>");

  soldFrag = `
    <span class="novai-pill" title="${count.replace(/"/g, "&quot;")}">
      ${labelHtml}
    </span>`;
}

    const dot = createdFrag && soldFrag ? `<span class="novai-dot">•</span>` : "";
    const nextHTML = `<span class="novai-subtitle">${createdFrag}${dot}${soldFrag}</span>`;

    // Só escreve se mudou (evita loop do MutationObserver)
    if (host.dataset.novaiHtml !== nextHTML) {
      host.dataset.novaiHtml = nextHTML;
      host.innerHTML = nextHTML;
    }
  } catch (e) {
    console.warn("[NOVAI] renderCustomSubtitle error:", e);
  }
}




    // ---- UI ----
    function insertUi(itemId) {
      if (document.getElementById(ROOT_ID)) return;
  
      const anchor =
        document.querySelector(".ui-pdp-header__title-container") ||
        document.querySelector("#price") ||
        document.querySelector(".ui-pdp-container__row");
      if (!anchor || !anchor.parentElement) return;
  
      const block = document.createElement("div");
      block.id = ROOT_ID;
      block.className = "novai-kpi-block";
      block.innerHTML = `
        <div class="novai-kpi-grid">
          <div class="novai-kpi-card big" id="novai-fat-card" style="position:relative;">
            <div class="novai-kpi-head">
              <div class="novai-kpi-icon">💰</div>
              <div class="novai-kpi-title">FATURAMENTO</div>
            </div>
            <div id="novai-faturamento" class="novai-kpi-value">--</div>
            <div class="novai-kpi-sub">
              <span id="novai-dias" class="novai-muted">--</span>
            </div>
            <div id="novai-chart-panel" style="
                position:absolute; inset:auto 0 100% auto;
                width:420px; height:240px; transform:translateY(-8px);
                background:#111; border:1px solid #fff; border-radius:12px;
                box-shadow:0 10px 25px rgba(0,0,0,.12);
                padding:10px 12px; display:none; z-index:99999;">
            <div class="novai-chart-head">
                <span class="novai-chart-title">Faturamento mensal e quantidade vendidas (estimadas)</span>
            </div>
            <svg id="novai-chart" viewBox="0 0 400 180" width="100%" height="180" role="img" aria-label="Gráfico de faturamento"></svg>
            <!-- tooltip HTML absoluto (criado por JS se não existir) -->
            </div>
          </div>
          <div class="novai-kpi-card">
            <div class="novai-kpi-head"><div class="novai-kpi-icon">👁️</div><div class="novai-kpi-title">VISUALIZAÇÕES</div></div>
            <div id="novai-visitas" class="novai-kpi-value">--</div>
          </div>
          <div class="novai-kpi-card">
            <div class="novai-kpi-head"><div class="novai-kpi-icon">📈</div><div class="novai-kpi-title">CONVERSÃO</div></div>
            <div id="novai-conversao" class="novai-kpi-value">--</div>
          </div>
        </div>`;
  
      anchor.parentElement.insertBefore(block, anchor.nextSibling);
  
      // hover do gráfico (NÃO faz fetch aqui)
      const fatCard = block.querySelector("#novai-fat-card");
      const panel = block.querySelector("#novai-chart-panel");
      fatCard.addEventListener("mouseenter", () => {
  chartHoverCount++;
  openPanel(panel, fatCard);
});
fatCard.addEventListener("mouseleave", () => {
  chartHoverCount = Math.max(0, chartHoverCount - 1);
  closePanelLater(panel);
});

// conta hover no próprio painel (para não fechar ao passar o mouse nele)
panel.addEventListener("mouseenter", () => {
  chartHoverCount++;
  // já está aberto/posicionado, mas garantimos
  panel.style.display = "block";
});
panel.addEventListener("mouseleave", () => {
  chartHoverCount = Math.max(0, chartHoverCount - 1);
  closePanelLater(panel);
});
  
      injected = true;
  
      // GET_VISITS → total agregado dentro de data.itemId
      chrome.runtime.sendMessage({ type: "GET_VISITS", itemId }, (response) => {
        if (!response?.ok) {
          warn("GET_VISITS falhou:", response?.error);
          return;
        }
  
        // formatos aceitos:
        // { itemId: 2395 }   (principal)
        // { [MLB...]: 2395 } (fallback)
        // { itemId: "2395" }
        let totalRaw = response.data?.itemId ?? response.data?.[itemId] ?? response.data;
        if (typeof totalRaw === "object" && totalRaw !== null) {
          // futuro: { total_visits: 2395 } etc.
          totalRaw = totalRaw.total_visits ?? totalRaw.total ?? totalRaw.visits ?? totalRaw.value ?? 0;
        }
        const totalVisitas = Number(totalRaw) || 0;
        log("[GET_VISITS] total:", totalVisitas);
  
        const el = document.querySelector("#novai-visitas");
        if (el) el.textContent = totalVisitas.toLocaleString("pt-BR");
        lastVisitas = totalVisitas;
  
        updateFaturamentoCard();
        updateConversionCard();
        observePriceArea();
        observeSubtitleArea();
        renderCustomSubtitle(lastCreatedAt); 
  
        // fetch mensal UMA vez por item
        triggerMonthlyFetchOnce(itemId);
      });
    }

function ensureChartPortal(panel) {
  if (!panel) return;
  if (panel.parentElement !== document.body) {
    document.body.appendChild(panel);
  }
  // garantias de estilo quando virar "portal"
  panel.style.position = "fixed";
  panel.style.inset = "auto auto auto auto"; // reseta
  panel.style.transform = "none";
  panel.style.zIndex = "2147483646"; // super alto
}
// Calcula uma posição perto do card, respeitando viewport
function placePanelNearCard(panel, card, prefer = "above") {
  if (!panel || !card) return;
  const r = card.getBoundingClientRect();

  panel.style.display = "block";
  panel.style.visibility = "hidden"; // mede sem flicker

  // tamanhos (fallback pros valores do inline)
  const pw = panel.offsetWidth  || 420;
  const ph = panel.offsetHeight || 240;
  const gap = 8;

  let left = r.left;
  let top  = prefer === "above" ? (r.top - ph - gap) : (r.bottom + gap);

  // clampa dentro do viewport
  left = Math.min(Math.max(6, left),  window.innerWidth  - pw - 6);
  top  = Math.min(Math.max(6, top ),  window.innerHeight - ph - 6);

  panel.style.left = left + "px";
  panel.style.top  = top  + "px";
  panel.style.visibility = "visible";
}

function hidePanel(panel){
  if (panel) panel.style.display = "none";
}
    function ensureChartTip(panel) {
        let tip = panel.querySelector("#novai-chart-tip");
        if (!tip) {
          tip = document.createElement("div");
          tip.id = "novai-chart-tip";
          // começa “fora” da tela
          tip.style.transform = "translate(-9999px,-9999px)";
          panel.appendChild(tip);
        }
        return tip;
      }

    function ensureUi() {
      if (nowUrlChanged()) {
        injected = false;
        resetPerPageState();
      }
      ensureCatalogChipInContainer();
      ensureSearchHeader();
      const root = document.getElementById(ROOT_ID);
      if (root && !document.body.contains(root)) {
        injected = false;
        resetPerPageState();
      }
      if (!document.getElementById(ROOT_ID)) {
        const itemId = getItemIdFromUrl();
        if (itemId) insertUi(itemId);
      }
    }
  
    // heartbeat & SPA hooks
    setInterval(ensureUi, 2000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) ensureUi(); });
    ["pushState","replaceState"].forEach(fn => {
      const orig = history[fn];
      history[fn] = function() { const res = orig.apply(this, arguments); setTimeout(ensureUi, 50); return res; };
    });
    window.addEventListener("popstate", () => setTimeout(ensureUi, 50));
  
    function injectKpiCardsDebounced() {
      clearTimeout(spaTimer);
      spaTimer = setTimeout(() => {
        if (!injected) {
          const itemId = getItemIdFromUrl();
          if (itemId) insertUi(itemId);
        }
      }, 150);
    }
  
    function setupObserver() {
      if (mo) return;
      mo = new MutationObserver(injectKpiCardsDebounced);
      mo.observe(document.body, { childList: true, subtree: true });
      log("MutationObserver configurado.");
    }
  
    // boot
    setupObserver();
    injectKpiCardsDebounced();
  })();










