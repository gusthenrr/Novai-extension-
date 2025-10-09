// background.js
console.log("[BG] service worker up");

const API_BASE = "https://nossopoint-backend-flask-server.com";



// Retorna string "name=value; name2=value2" para o hostname da URL
function getCookieHeaderForUrl(url) {
  return new Promise((resolve) => {
    try {
      chrome.cookies.getAll({ url }, (cookies) => {
        if (!cookies || cookies.length === 0) return resolve("");
        const kv = cookies.map(c => `${c.name}=${c.value}`).join("; ");
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
  const headers = Object.assign(
    { "Content-Type": "application/json" },
    extraHeaders
  );

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const txt = await res.text();
  let data;
  try { data = JSON.parse(txt); } catch { data = txt; }
  if (!res.ok) {
    console.error("[BG] HTTP", res.status, data);
    throw new Error(`HTTP ${res.status}`);
  }
  return data;
}

// tenta uma lista de endpoints alternativos (nome flexível no backend)
async function postFirst(paths, body, extraHeaders = {}) {
  let lastErr;
  for (const p of (Array.isArray(paths) ? paths : [paths])) {
    try { return await postJSON(`${API_BASE}${p}`, body, extraHeaders); }
    catch (e) { lastErr = e; }
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

    // domínios/caminhos típicos de "Patrocinado" no ML
    if (/^click\d*\.mercadolivre/.test(host) || /^click\d*\.mercadolibre/.test(host)) return true;
    if (/publicidade\.mercadolivre/i.test(host) || /publicidad\.mercadolibre/i.test(host)) return true;
    if (/\/mlm\/clicks\/external/i.test(full)) return true;
    if (/\/count_cking/i.test(full)) return true;

    // parâmetros clássicos de ads (não determinístico, mas ajuda)
    if (/[?&](gclid|msclkid|fbclid)=/i.test(full)) return true;

    return false;
  } catch {
    return false;
  }
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
    const priceNum = Number(price) || 0;

    postJSON(`${API_BASE}/visitas_por_mes`, {
      item_id: itemId,
      conversion: convNum,
      price: priceNum,
    })
      .then((data) => {
        // Esperado: { meses: [...], faturamentos: [...], quantityMonths:[...], data_criacao: ... }
        let visitasArr = Array.isArray(data?.meses) ? data.meses.slice() : [];
        let faturArr   = Array.isArray(data?.faturamentos) ? data.faturamentos.slice() : [];
        let quantArr   = Array.isArray(data?.quantityMonths) ? data.quantityMonths.slice() : [];

        // Backend vem 1 mês atrás → 24 meses atrás; normaliza p/ cronologia
        visitasArr.reverse();
        faturArr.reverse();
        quantArr.reverse();

        const labels = makeMonthLabels_30dWindows(Math.min(24, visitasArr.length));
        const len = Math.min(labels.length, visitasArr.length, faturArr.length);

        const payload = {
          labels: labels.slice(-len),
          visits: visitasArr.slice(-len),
          revenues: faturArr.slice(-len),
          createdAt: data?.data_criacao ?? null,
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

  // ====== NOVO: botão “Ativar Métricas de Busca” ======
if (message.type === "GET_SEARCH_METRICS_BULK") {
  const items   = Array.isArray(message.items) ? message.items : [];
  const itemIds = Array.isArray(message.itemIds) ? message.itemIds : [];

  const payload = items.length
    ? { items }
    : { items: itemIds.map(id => ({ item_id: id })) };

  const firstUrl = (items[0] && items[0].url) || "https://www.mercadolivre.com.br";

  (async () => {
    try {
      const cookieHeader = await getCookieHeaderForUrl(firstUrl);

      // >>> ENVIE OS COOKIES NO CORPO (ou num header customizado tipo X-ML-Cookie)
      const data = await postFirst("/scraping", {
        ...payload,
        cookie: cookieHeader,        // <-- AQUI
      });

      console.log("[BG] bulk metrics ok:", data);
      sendResponse({ ok: true, data: data ?? {} });
    } catch (err) {
      console.error("[BG] bulk metrics error:", err);
      sendResponse({ ok: false, error: String(err?.message || err) });
    }
  })();

  return true; // async
}

});