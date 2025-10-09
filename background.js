// background.js
console.log("[BG] service worker up");

const API_BASE = "https://nossopoint-backend-flask-server.com";

const NVAI_SCRIPT_CACHE = new Map();
const NVAI_SCRIPT_CACHE_TTL = 60 * 60 * 1000; // 1h
const NVAI_PRODUCT_STORAGE_KEY = "novai_product_cache_v1";
const NVAI_VISITS_CACHE = new Map();
const NVAI_VISITS_CACHE_TTL = 15 * 60 * 1000; // 15 min

// ---------- cookies ----------
function getCookieHeaderForUrl(url) {
  return new Promise((resolve) => {
    try {
      chrome.cookies.getAll({ url }, (cookies) => {
        if (!cookies || cookies.length === 0) return resolve("");
        const kv = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
        console.log("[BG] cookies coletados:", cookies.length, "itens");
        resolve(kv);
      });
    } catch (err) {
      console.error("[BG] getCookieHeaderForUrl error:", err);
      resolve("");
    }
  });
}

/* ---------- helpers HTTP ---------- */
async function postJSON(url, body, extraHeaders = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body ?? {}),
  });

  if (!res.ok) {
    let detail = "";
    try { detail = await res.text(); } catch {}
    throw new Error(`POST ${url} -> ${res.status} ${detail}`.trim());
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();

  // fallback: tenta parsear como JSON, senão devolve texto
  const raw = await res.text();
  try { return JSON.parse(raw); } catch { return raw; }
}

// tenta uma lista de endpoints alternativos (nome flexível no backend)
async function postFirst(paths, body, extraHeaders = {}) {
  let lastErr;
  const arr = Array.isArray(paths) ? paths : [paths];
  for (const p of arr) {
    try {
      return await postJSON(`${API_BASE}${p}`, body, extraHeaders);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("All endpoints failed");
}

/* ---------- util: labels “mensais” (janelas de 30d) ---------- */
function makeMonthLabels_30dWindows(n = 24) {
  const out = [];
  for (let i = n; i >= 1; i--) {
    const from = new Date(Date.now() - i * 30 * 24 * 3600 * 1000);
    const yyyy = from.getFullYear();
    const mm = String(from.getMonth() + 1).padStart(2, "0");
    out.push(`${yyyy}-${mm}`);
  }
  return out;
}

/* ---------- util: heurística local p/ ADS (fallback) ---------- */
function isLikelyAdsUrl(url = "") {
  try {
    const u = new URL(url);
    const host = u.hostname || "";
    const full = u.href;

    if (/^click\d*\.mercadolivre/.test(host) || /^click\d*\.mercadolibre/.test(host)) return true;
    if (/publicidade\.mercadolivre/i.test(host) || /publicidad\.mercadolibre/i.test(host)) return true;
    if (/\/mlm\/clicks\/external/i.test(full)) return true;
    if (/\/count_cking/i.test(full)) return true;
    if (/[?&](gclid|msclkid|fbclid)=/i.test(full)) return true;

    return false;
  } catch {
    return false;
  }
}

/* ---------- pegar <script> de uma HTML ---------- */
function extractScriptsFromHtml(html) {
  const scripts = [];
  if (typeof html !== "string") return scripts;
  const regex = /<script\b[^>]*>[\s\S]*?<\/script>|<script\b[^>]*\/>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    scripts.push(match[0]);
  }
  return scripts;
}

async function fetchVisitsRange(itemId, dateFrom, dateTo) {
  const url = new URL('https://api.mercadolibre.com/items/visits');
  url.searchParams.set('ids', itemId);
  if (dateFrom) url.searchParams.set('date_from', dateFrom);
  if (dateTo) url.searchParams.set('date_to', dateTo);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`visits ${res.status}: ${body}`.trim());
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Falha ao decodificar resposta de visitas');
  }

  const entry = Array.isArray(data) ? data[0] : data;
  return Number(entry?.total_visits ?? entry?.total ?? entry?.visits ?? 0) || 0;
}

async function fetchScriptsOnly(url, noRedirect = false) {
  if (!url) throw new Error("URL inválida");
  const key = `${url}|nr:${noRedirect ? 1 : 0}`;
  const cached = NVAI_SCRIPT_CACHE.get(key);
  if (cached && Date.now() - cached.timestamp < NVAI_SCRIPT_CACHE_TTL) {
    return cached.payload;
  }

  const res = await fetch(url, {
    credentials: "include",
    redirect: noRedirect ? "manual" : "follow",
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  // Em redirecionamento "opaqueredirect" (alguns fluxos), seguimos adiante
  if (!res.ok && res.type !== "opaqueredirect") {
    throw new Error(`HTTP ${res.status}`);
  }

  const html = await res.text();
  const scripts = extractScriptsFromHtml(html);
  const payload = { scripts };
  NVAI_SCRIPT_CACHE.set(key, { timestamp: Date.now(), payload });
  return payload;
}

/* ---------- storage local (cache de produtos) ---------- */
function readProductStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get([NVAI_PRODUCT_STORAGE_KEY], (result) => {
      if (chrome.runtime.lastError) {
        console.warn("[BG] storage read error", chrome.runtime.lastError);
        resolve({});
        return;
      }
      resolve(result[NVAI_PRODUCT_STORAGE_KEY] || {});
    });
  });
}

function writeProductStorage(map) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [NVAI_PRODUCT_STORAGE_KEY]: map }, () => {
      if (chrome.runtime.lastError) {
        console.warn("[BG] storage write error", chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

/* ---------- onMessage ---------- */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // visitas agregadas
  if (message.type === "GET_VISITS") {
    const { itemId } = message;
    console.log("[BG] /visitsItems itemId =", itemId);

    postJSON(`${API_BASE}/visitsItems`, { itemId })
      .then((data) => {
        console.log("[BG] resposta /visitsItems:", data);
        sendResponse({ ok: true, data });
      })
      .catch((err) => {
        console.error("[BG] fetch error /visitsItems:", err);
        sendResponse({ ok: false, error: String(err.message || err) });
      });

    return true; // async
  }

  // visitas por “mês”(30d) + faturamento
  if (message.type === "GET_VISITS_MONTHLY") {
    const { itemId, conversion, price } = message;
    const convNum = Number(conversion) || 0; // % (backend espera %)

    postFirst(
      ["/visitas_por_mes", "/visitas_por_mes_30d"],
      { itemId, conversion: convNum, price }
    )
      .then((data) => {
        // Esperado do backend (flexível): arrays de visitas/faturamento/quantidade do mais novo -> mais antigo
        const visitasArr = [...(data?.visitas_por_mes || data?.visits || [])];
        const faturArr   = [...(data?.faturamento_por_mes || data?.revenues || [])];
        const quantArr   = [...(data?.quantidade_por_mes || data?.quantities || [])];

        // Backend costuma vir do presente para o passado → invertimos
        visitasArr.reverse();
        faturArr.reverse();
        quantArr.reverse();

        const labels = makeMonthLabels_30dWindows(Math.min(24, visitasArr.length));
        const len = Math.min(labels.length, visitasArr.length, faturArr.length);

        const payload = {
          labels: labels.slice(-len),
          visits: visitasArr.slice(-len),
          revenues: faturArr.slice(-len),
          createdAt: data?.data_criacao ?? data?.createdAt ?? null,
          quantityMonths: quantArr.slice(-len),
        };

        console.log("[BG] resposta /visitas_por_mes (normalizada):", payload);
        sendResponse({ ok: true, data: payload });
      })
      .catch((err) => {
        console.error("[BG] fetch error /visitas_por_mes:", err);
        sendResponse({ ok: false, error: String(err.message || err) });
      });

    return true; // async
  }

  // baixar scripts de uma página (HTML)
  if (message.type === "NOVAI_FETCH_SCRIPTS") {
    const { url, noRedirect = false } = message;
    (async () => {
      try {
        const payload = await fetchScriptsOnly(url, noRedirect);
        sendResponse({ ok: true, scripts: payload.scripts });
      } catch (err) {
        console.error("[BG] NOVAI_FETCH_SCRIPTS erro", err);
        sendResponse({ ok: false, error: String(err?.message || err) });
      }
    })();
    return true; // async
  }

  // visitas (�ltimos 6 meses) via API p�blica
  if (message.type === "NOVAI_FETCH_VISITS_SERIES") {
    const itemId = message.itemId;
    const ranges = Array.isArray(message.ranges) ? message.ranges : [];

    (async () => {
      try {
        if (!itemId || ranges.length === 0) {
          sendResponse({ ok: false, error: "Parametros invalidos" });
          return;
        }

        const signature = ranges
          .map((r) => `${r?.date_from || ""}|${r?.date_to || ""}`)
          .join(",");
        const cached = NVAI_VISITS_CACHE.get(itemId);
        const now = Date.now();
        if (cached && cached.signature === signature && now - cached.timestamp < NVAI_VISITS_CACHE_TTL) {
          sendResponse({ ok: true, data: { total: cached.total, series: cached.series } });
          return;
        }

        const series = [];
        for (const range of ranges) {
          const visits = await fetchVisitsRange(itemId, range?.date_from, range?.date_to);
          series.push({
            date_from: range?.date_from || null,
            date_to: range?.date_to || null,
            label: range?.label || null,
            visits,
          });
        }
        const total = series.reduce((acc, seg) => acc + (Number(seg.visits) || 0), 0);

        NVAI_VISITS_CACHE.set(itemId, {
          total,
          series,
          timestamp: now,
          signature,
        });

        sendResponse({ ok: true, data: { total, series } });
      } catch (err) {
        console.error("[BG] NOVAI_FETCH_VISITS_SERIES erro", err);
        sendResponse({ ok: false, error: String(err?.message || err) });
      }
    })();
    return true;
  }
  // guardar dados de produto no cache local
  if (message.type === "NOVAI_STORE_PRODUCT_DATA") {
    const data = message.data;
    (async () => {
      try {
        if (!data?.itemId) {
          sendResponse({ ok: false, error: "itemId ausente" });
          return;
        }
        const map = await readProductStorage();
        map[data.itemId] = { ...(map[data.itemId] || {}), ...data, storedAt: Date.now() };
        await writeProductStorage(map);
        sendResponse({ ok: true });
      } catch (err) {
        console.error("[BG] NOVAI_STORE_PRODUCT_DATA erro", err);
        sendResponse({ ok: false, error: String(err?.message || err) });
      }
    })();
    return true; // async
  }

  // ler dados de produto do cache local
  if (message.type === "NOVAI_GET_PRODUCT_DATA") {
    const itemIds = Array.isArray(message.itemIds) ? message.itemIds : [];
    (async () => {
      try {
        const map = await readProductStorage();
        if (itemIds.length === 0) {
          sendResponse({ ok: true, data: map });
          return;
        }
        const subset = {};
        for (const id of itemIds) {
          if (id && map[id]) subset[id] = map[id];
        }
        sendResponse({ ok: true, data: subset });
      } catch (err) {
        console.error("[BG] NOVAI_GET_PRODUCT_DATA erro", err);
        sendResponse({ ok: false, error: String(err?.message || err) });
      }
    })();
    return true; // async
  }

  // ====== Botão “Ativar Métricas de Busca” (bulk) ======
  if (message.type === "GET_SEARCH_METRICS_BULK") {
    const items   = Array.isArray(message.items) ? message.items : [];
    const itemIds = Array.isArray(message.itemIds) ? message.itemIds : [];

    const payload = items.length
      ? { items }
      : { items: itemIds.map((id) => ({ item_id: id })) };

    const firstUrl =
      (items[0] && items[0].url) ||
      "https://www.mercadolivre.com.br";

    (async () => {
      try {
        const cookieHeader = await getCookieHeaderForUrl(firstUrl);

        // Envia cookies no corpo (ou adapte p/ header customizado se seu backend preferir)
        const data = await postFirst(
          ["/scraping", "/search_metrics_bulk"],
          { ...payload, cookie: cookieHeader }
        );

        console.log("[BG] bulk metrics ok:", data);
        sendResponse({ ok: true, data: data ?? {} });
      } catch (err) {
        console.error("[BG] bulk metrics error:", err);
        sendResponse({ ok: false, error: String(err?.message || err) });
      }
    })();
    return true; // async
  }

  // (sem return -> síncrono)
});











