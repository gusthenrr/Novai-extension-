var mfyMainColor = "#4656f8", mfyMainColorNumbers = mfyMainColor.split("#")[1], extensionPath = "";
function sendRequestToContentScript() {
  const e = new CustomEvent("requestMfyGlobals");
  document.dispatchEvent(e)
}
document.addEventListener("responseMfyGlobals", (function (e) {
  extensionPath = e.detail.extensionUrlPath
}
)), sendRequestToContentScript();
// --- NOVAI KPI styles (injeta 1x no <head>) ---
function ensureNovaiKpiStyles() {
  if (document.getElementById('novai-kpi-styles')) return;
  const css = `
/* ===== NOVAI KPI CARDS – estilo puro ===== */
:root {
  --novai-ml-yellow: #ffe600;
  --novai-fg: #222;
  --novai-muted: #6b7280;     /* cinza */
  --novai-border: #e5e7eb;    /* borda clara */
  --novai-bg: #ffffff;        /* fundo card */
  --novai-shadow: 0 6px 18px rgba(0,0,0,.06);
}

/* deixa só os círculos “clicáveis” */
#novai-chart text, #novai-chart line, #novai-chart path, #novai-chart rect { pointer-events: none; }
#novai-chart circle { pointer-events: all; }

@media (prefers-color-scheme: dark) {
  :root {
    --novai-fg: #f3f4f6;
    --novai-muted: #9ca3af;
    --novai-border: #272a30;
    --novai-bg: #0f1115;
    --novai-shadow: 0 8px 24px rgba(0,0,0,.35);
  }
}

/* container genérico */
.novai-kpi-grid {
  display: grid; width: 100%; box-sizing: border-box; gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 900px) { .novai-kpi-grid { grid-template-columns: 1fr; } .novai-kpi-card.big { grid-column: auto; } }
@media (max-width: 1100px) { .novai-kpi-grid { grid-template-columns: repeat(2, minmax(160px, 1fr)); } }
@media (max-width: 720px) { .novai-kpi-grid { grid-template-columns: 1fr; } }

#novai-fat-card { position: relative; overflow: visible; }

#novai-chart-tip{
  position:absolute; left:0; top:0; transform:translate(-9999px,-9999px);
  pointer-events:none; background:#111; color:#fff;
  border:1px solid var(--novai-ml-yellow);
  box-shadow:0 8px 18px rgba(0,0,0,.35);
  border-radius:8px; padding:6px 8px; white-space:nowrap;
  font:500 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto;
  transition:opacity .08s linear; opacity:0;
  z-index: 2147483647 !important;  /* > panel */
}

/* Painel do gráfico (fixo) */
#novai-chart-panel{
  position: fixed !important; inset: auto auto auto auto; /* JS define left/top */
  background:#111; border:1px solid #fff; border-radius:12px;
  box-shadow:0 10px 25px rgba(0,0,0,.12);
  padding:10px 12px; width:420px; height:240px;
  display:none; z-index: 2147483646 !important;
}

.novai-chart-head{ display:flex; align-items:center; justify-content:center; gap:8px; margin:0 6px 8px; text-align:center; }
.novai-chart-title{ font:600 12px/1.4 system-ui, -apple-system, Segoe UI, Roboto; color:#fff; }
.novai-chart-hint{ font:400 12px/1.4 system-ui, -apple-system, Segoe UI, Roboto; color:#9ca3af; }

/* card base */
.novai-kpi-card {
  position: relative; background: #222; color: #fff;
  border: 1px solid #fff; border-radius: 12px; padding: 10px 12px;
  overflow: hidden;
}
/* filete amarelo superior */
.novai-kpi-card::before {
  content: ""; position: absolute; top: -1px; left: -1px; right: -1px;
  height: 4px; background: var(--novai-ml-yellow);
  border-top-left-radius: inherit; border-top-right-radius: inherit; pointer-events:none;
}

.novai-kpi-head { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
.novai-kpi-icon { width:26px; height:26px; border-radius:999px; background: rgba(255, 230, 0, .25);
  display:inline-flex; align-items:center; justify-content:center; font-size:14px; }
.novai-kpi-title { color:#fff; text-transform:uppercase; letter-spacing:.04em; font-weight:700; font-size:12px; }

.novai-kpi-card.big { grid-column: 1 / -1; }

.novai-kpi-value { color:#fff; font-weight:900; font-size:24px; line-height:1.1; margin:2px 0 6px; word-break:break-word; }

.novai-kpi-sub { display:flex; align-items:baseline; gap:8px; color:#bbb; font-size:12px; }

/* badges utilitárias (mantidas se precisar) */
.novai-badge { display:inline-flex; align-items:center; gap:6px; padding:2px 8px; border-radius:999px;
  border:1px solid var(--novai-border); font-weight:600; font-size:12px; background:transparent; }
.novai-badge.up{ color:#0ea5e9; } .novai-badge.ok{ color:#10b981; } .novai-badge.down{ color:#ef4444; }

.novai-compact .novai-kpi-value{ font-size:20px; }
.novai-compact .novai-kpi-title{ font-size:11px; }
.novai-compact .novai-badge{ padding:1px 6px; font-size:11px; }

.novai-muted { color: var(--novai-muted); }
.novai-sep { height:1px; margin:8px 0; background:var(--novai-border); }

/* Subtitle Pills (se quiser usar em outros cards) */
.novai-subtitle { display:inline-flex; align-items:center; gap:8px; flex-wrap:wrap; margin:2px 0 6px; font:600 12px/1.3 system-ui,-apple-system,Segoe UI,Roboto; }
.novai-pill { display:inline-flex; align-items:center; padding:4px 10px; border-radius:999px; background:#222; color:#fff; border:1px solid #fff; box-shadow:var(--novai-shadow); white-space:nowrap; gap:8px; }
.novai-pill::before { content:""; width:8px; height:8px; border-radius:999px; background:var(--novai-ml-yellow); flex:0 0 8px; }
.novai-pill--yellow { display:inline-flex; align-items:center; padding:2px 10px; border-radius:999px; background:var(--novai-ml-yellow); color:#111; border:1px solid #111; font-weight:800; }
.novai-pill .nv-dot { width:8px; height:8px; border-radius:999px; background:var(--novai-ml-yellow); flex:0 0 8px; }
.novai-dot { color:var(--novai-muted); font-weight:700; transform:translateY(-1px); }

/* Métricas strip (se usar) */
.novai-metrics-strip {
  position:absolute; top:0; left:0; right:0; display:flex; gap:10px; align-items:center; justify-content:flex-start;
  background:#111; color:#fff; border-bottom:1px solid var(--novai-ml-yellow,#ffe600);
  padding:6px 8px; z-index:10; font:600 12px/1 system-ui,-apple-system,Segoe UI,Roboto;
}
.novai-metrics-strip b { color:var(--novai-ml-yellow,#ffe600); font-weight:900; }

/* Barra de carregamento (compat se precisar) */
#novai-loading{ margin:6px 0 10px 0; }
#novai-loading .novai-loading-wrap{ display:flex; align-items:center; gap:10px; }
#novai-loading .novai-loading-text{ color:#fff; background:#111; border:1px solid #fff; padding:6px 10px; border-radius:9999px; font-weight:700; font-size:12px; }
#novai-loading .novai-loading-bar{ position:relative; width:220px; height:8px; background:#222; border:1px solid var(--novai-ml-yellow,#ffe600); border-radius:9999px; overflow:hidden; }
#novai-loading .novai-loading-bar-inner{ position:absolute; left:0; top:0; bottom:0; width:40%; background: var(--novai-ml-yellow,#ffe600); opacity:.9; animation: novai-bar-move 1.2s linear infinite; }
@keyframes novai-bar-move { 0% { transform: translateX(-40%); } 100% { transform: translateX(220px); } }
`;
  const style = document.createElement('style');
  style.id = 'novai-kpi-styles';
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
}
var globalLogs = [], eaOnAdminPanel = !1, listView = void 0, mfy_version = null, trackDataParsed = {}, dataLayer = window.dataLayer, melidata_namespace = window.melidata_namespace, altPreloadedState = Array.from(document.getElementsByTagName("script")).filter((e => "__PRELOADED_STATE__" === e.id)).length > 0 ? JSON.parse(Array.from(document.getElementsByTagName("script")).filter((e => "__PRELOADED_STATE__" === e.id))[0].innerHTML): void 0, preLoadedState = window.__PRELOADED_STATE__, rawID = void 0, userId = null, uid = null, meliCurrentFee = 6.5, catalogRemoteLookupData = [], eaAPIHeaders = new Headers;
eaAPIHeaders.append("X-Api-Key", "Ps-RXiTdFgN62dmQhZ9bsoHMCEyT2!ypg!ov%7MEFR#jP3mtZWbDoSvEdctMgF6a");
var registeringAcc = !1, requestOptions = {
  method: "GET",
  headers: eaAPIHeaders,
  redirect: "follow"
}
, mfyuser = void 0, mfy_userdata = {}, myHeaders = new Headers;
myHeaders.append("accept", "application/json"), myHeaders.append("content-type", "application/x-www-form-urlencoded");
var TTL0 = 9e5, TTL1 = 216e5, TTL2 = 3e4, TTL3 = 72e5, mfyHost = "https://api2.metrify.com.br/api", mfyEndpoints = {
  api_host: "https://api2.metrify.com.br/api",
  auth: `${mfyHost}/auth`,
  register: `${mfyHost}/register`,
  track: `${mfyHost}/trackworks`,
  validate: `${mfyHost}/validate`
}
;
function getRandomProxy() {
  const e = ["https://mfy-cors.up.railway.app/"];
  return e[Math.floor(Math.random() * e.length)]
}
var mfyProxy = getRandomProxy(), mfyProxyLessRestricted = "https://mfy.herokuapp.com/";
class SpinLoaderManager {
  constructor() {
    this.template = null, this.localPath = ""
  }
  getLocalPath() {
    return !this.localPath && extensionPath && (this.localPath = `${extensionPath}src/lotties/lf20_uwR49r.json`), this.localPath || "src/lotties/lf20_uwR49r.json"
  }
  createTemplate() {
    if (this.template) return this.template;
    const e = document.createElement("div");
    e.style.cssText = "width: 25px; height: 25px; margin: auto;";
    const t = document.createElement("lottie-player");
    return t.setAttribute("src", this.getLocalPath()), t.setAttribute("background", "transparent"), t.setAttribute("speed", "1"), t.setAttribute("loop", ""), t.setAttribute("autoplay", ""), t.style.cssText = "width: 100%; height: 100%;", e.appendChild(t), this.template = e, this.template
  }
  getInstance() {
    return this.createTemplate().cloneNode(!0)
  }
  getHTML() {
    return `<lottie-player src="${this.getLocalPath()}" background="transparent" speed="1" style="width: 25px;height:25px;margin:auto;" loop="" autoplay=""></lottie-player>`
  }
  replaceContent(e) {
    e.innerHTML = "", e.appendChild(this.getInstance())
  }
  hasSpinner(e) {
    return null !== e.querySelector("lottie-player")
  }
  getWrappedHTML(e = "") {
    return `<div style="${e}">${this.getHTML()}</div>`
  }
  getInlineHTML() {
    return `<span style="display: inline-block; vertical-align: middle;">${this.getHTML()}</span>`
  }
}
const spinLoaderManager = new SpinLoaderManager;
var SpinLoader = spinLoaderManager.getHTML(), localePTBR = [{
  name: "pt-BR",
  options: {
    months: ["Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"],
    shortMonths: ["Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"],
    days: ["Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"],
    shortDays: ["Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb"],
    toolbar: {
      exportToSVG: "Baixar SVG",
      exportToPNG: "Baixar PNG",
      menu: "Menu",
      selection: "Seleção",
      selectionZoom: "Zoom na seleção",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      pan: "Panorâmica",
      reset: "Resetar Zoom"
    }
  }
}
], fullIcon = '<svg xmlns="http://www.w3.org/2000/svg" class="logo-full" width="151" height="39" viewBox="0 0 151 39" data-reactroot="" style="width: 3.75em;height: auto;position: relative;top: 0.2em;padding: 0em 0em 0em 0.35em;"><g fill="#00A650" fill-rule="evenodd"><path d="M9.577 0L0 22.286h15.962L9.577 39l25.54-25.071H19.153L28.732 0zM56.094 27.925h-6.931l5.924-24.38h19.706l-1.33 5.483H60.688l-.886 3.801h12.452l-1.33 5.483H58.433l-2.338 9.613zm33.718.439c-8.262 0-12.332-3.582-12.332-8.7 0-.402.12-1.242.202-1.608l3.546-14.51h7.052L84.774 17.91c-.04.183-.12.585-.12 1.023.04 2.01 1.732 3.948 5.158 3.948 3.707 0 5.601-2.12 6.286-4.971l3.507-14.365h7.012L103.11 18.02c-1.451 5.921-4.998 10.344-13.3 10.344zm36.014-.439h-17.732l5.924-24.38h6.932l-4.554 18.897h10.76l-1.33 5.483zm23.844 0h-17.732l5.924-24.38h6.932l-4.554 18.897H151l-1.33 5.483z"></path></g></svg>';
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
function sendToContentScript(e) {
  try {
    document.dispatchEvent(new CustomEvent("MetrifyExtension", {
      detail: e
    }
    ))
  }
  catch (e) {}
}
function AuthDataStore(e, t) {
  sendToContentScript({
    type: "STORE",
    key: e,
    value: t
  }
  )
}
function AuthDataRetrieve(e) {
  sendToContentScript({
    type: "RETRIEVE",
    key: e
  }
  )
}
function AuthDataCheck(e) {
  sendToContentScript({
    type: "AUTH_CHECK",
    key: e
  }
  )
}
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
document.addEventListener("MetrifyExtensionResponse", (function (e) {
  "RETRIEVE" == e.detail.type ? mfy_userdata = e.detail.value: "AUTH_CHECK" == e.detail.type && (mfy_userdata.remote = e.detail.value)
}
)), document.addEventListener("MetrifyAuthCheck", (function (e) {
  mfy_userdata.remote = e.detail.value
}
)), isList();
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
async function fetchUserMeData(e, t = !1) {
  return new Promise((n => {
    const a = mfyuser?.id || null;
    if (!a) return void n({
      success: !1,
      error: "No user ID available"
    }
    );
    document.dispatchEvent(new CustomEvent("FetchUserMe", {
      detail: {
        userId: a,
        authToken: e,
        forceRefresh: t
      }
    }
    ));
    const i = e => {
      document.removeEventListener("UserMeResponse", i), n(e.detail)
    }
    ;
    document.addEventListener("UserMeResponse", i), setTimeout((() => {
      document.removeEventListener("UserMeResponse", i), n({
        success: !1,
        error: "Timeout waiting for user data"
      }
      )
    }
    ), 2e4)
  }
  ))
}
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
<span id="mediabtn" class="andes-button--loud mfy-main-bg andes-button" style="margin-top: 0.35em;font-size: 12px!important;display:inline!important;padding-top: 1em;padding-bottom: 1em;position: relative;z-index: 10;border-radius:2rem;">
  Média: ${media_vendas} vendas/mês
</span>
<img style="float:left;margin-right:0.35em;width:28%;margin-top: 0.45em;" src="https://i.ibb.co/Y8mQ2MT/metrifylogo.png">
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

var mfyloader = `
<mfyloader style="width: 5rem;height: 5rem;display: flex;">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255, 0); display: block;" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<defs>
<filter id="ldio-r0lbqrngywn-filter" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="2.4000000000000004"></feGaussianBlur>
  <feComponentTransfer result="cutoff">
    <feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1"></feFuncA>
  </feComponentTransfer>
</filter>
</defs>
<g filter="url(#ldio-r0lbqrngywn-filter)"><g transform="translate(50 50)">
<g>
<circle cx="17" cy="0" r="5" fill="#6252c5">
  <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="4s" repeatCount="indefinite" begin="-0.25s"></animate>
</circle>
<animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="4s" repeatCount="indefinite" begin="0s"></animateTransform>
</g>
</g><g transform="translate(50 50)">
<g>
<circle cx="17" cy="0" r="5" fill="#2a9fde">
  <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="2s" repeatCount="indefinite" begin="-0.2s"></animate>
</circle>
<animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="2s" repeatCount="indefinite" begin="-0.05s"></animateTransform>
</g>
</g><g transform="translate(50 50)">
<g>
<circle cx="17" cy="0" r="5" fill="#00d9ff">
  <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="1.3333333333333333s" repeatCount="indefinite" begin="-0.15s"></animate>
</circle>
<animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="1.3333333333333333s" repeatCount="indefinite" begin="-0.1s"></animateTransform>
</g>
</g><g transform="translate(50 50)">
<g>
<circle cx="17" cy="0" r="5" fill="#6e2aff">
  <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="1s" repeatCount="indefinite" begin="-0.1s"></animate>
</circle>
<animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="1s" repeatCount="indefinite" begin="-0.15s"></animateTransform>
</g>
</g><g transform="translate(50 50)">
<g>
<circle cx="17" cy="0" r="5" fill="#6252c5">
  <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="0.8s" repeatCount="indefinite" begin="-0.05s"></animate>
</circle>
<animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.8s" repeatCount="indefinite" begin="-0.2s"></animateTransform>
</g>
</g></g>
</svg>
</mfyloader>
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
<span id="eagrossrev">
  <div class="novai-kpi-grid">
    <!-- CARD PRINCIPAL: FATURAMENTO -->
    <div class="novai-kpi-card big" id="novai-fat-card" style="position:relative;">
      <div class="novai-kpi-head">
        <div class="novai-kpi-icon">💰</div>
        <div class="novai-kpi-title">FATURAMENTO</div>
      </div>

      <!-- Mantemos a classe .eagrossrev-title para compatibilidade com sua lógica -->
      <div id="novai-faturamento" class="novai-kpi-value eagrossrev-title">--</div>

      <!-- Sub-linha: mantém .revperiod para sua troca /mês /semana /dia -->
      <div class="novai-kpi-sub">
        <span class="revtitle revperiod">/mês</span>
        <span id="novai-dias" class="novai-muted">--</span>
      </div>

      <!-- Mantemos .earevstats pois seu código injeta extras aqui quando é catálogo -->
      <div class="earevstats" style="display:none"></div>

      <!-- Painel do gráfico (hover) -->
      <div id="novai-chart-panel">
        <div class="novai-chart-head">
          <span class="novai-chart-title">Faturamento mensal e quantidade vendidas (estimadas)</span>
        </div>
        <svg id="novai-chart" viewBox="0 0 400 180" width="100%" height="180" role="img" aria-label="Gráfico de faturamento"></svg>
      </div>
    </div>

    <!-- CARD VISUALIZAÇÕES -->
    <div class="novai-kpi-card">
      <div class="novai-kpi-head">
        <div class="novai-kpi-icon">👁️</div>
        <div class="novai-kpi-title">VISUALIZAÇÕES</div>
      </div>
      <div id="novai-visitas" class="novai-kpi-value">--</div>
    </div>

    <!-- CARD CONVERSÃO -->
    <div class="novai-kpi-card">
      <div class="novai-kpi-head">
        <div class="novai-kpi-icon">📈</div>
        <div class="novai-kpi-title">CONVERSÃO</div>
      </div>
      <div id="novai-conversao" class="novai-kpi-value">--</div>
    </div>
  </div>
</span>
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

var btn_preco = `
<div id="preco-btn" class="andes-button andes-button--loud mfy-main-bg pricebtn"
     style="width: 3em;height: 3em;margin-top: 1em;margin-right: 0.5em;padding:0.5em 0.1em 1em 0.1em;border-radius: 3.5em;">
  <img id="preco-img" style="width:50%;" src="https://img.icons8.com/ios-glyphs/30/ffffff/estimate.png"/>
</div>
`;

var price_tool = "";

var condicao_produto = "";

var preco_Local = "";

var categoria_Local = "";

var tipo_anuncio = "";

var nomeCategoria = "";

var rad_btn = "";

var eapricewarning = !1;

function pricingWarning() {
  if (1 == eapricewarning) {
    let e = document.getElementById("vermais");
    e.innerHTML = 'Ver mais detalhes <img src="https://img.icons8.com/officexs/16/000000/warning-shield.png" style="margin-left: 0.35em;">', e.setAttribute("style", "float: right;margin: 1em 6em 0em 0em;display: flex;align-items: center;")
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
  dLayerAlt = catalogData[0].body.date_created ?? dataLayer[0].startTime, vendasAlt = catalogData[0].body.sold_quantity, 0 == vendas.length && (vendas = vendasAlt || (() => {
    const e = document.getElementsByClassName("ui-pdp-header__subtitle")[0];
    if (!e) return vendas;
    let t = e.innerHTML.split(" | ")[1]?.split(" vendidos")[0]?.trim();
    return t ? (t.endsWith("mil") && (t = 1e3 * parseFloat(t.replace("mil", ""))), parseFloat(t) || vendas): vendas
  }
  )()), dLayer = dLayerAlt?.split("T")[0], data_br = "" == data_br ? dLayer?.split("-").reverse().join("/"): data_br, dataMilisec = Date.parse(dLayer), eadiff = eanow - dataMilisec, "" == dias && (dias = Math.round(eadiff / (8.64 * Math.pow(10, 7)))), "" == media_vendas && (media_vendas = isNaN(Math.round(vendas / (dias / 30))) ? "Indisponível": Math.round(vendas / (dias / 30))), 0 == dias ? media_vendas = "0": dias < 30 && (alert_media_vendas = !0), dLayerMainFallback()
}
function altContentScpt() {
  spot0 = document.getElementsByClassName("ui-pdp-header"), spot0[0].insertAdjacentHTML("afterbegin", '<span id="eaoffSwitch" style="top: 0em;left: 0em;background-color:rgb(52, 131, 250);color:#fff;"><img src="https://img.icons8.com/external-gradak-royyan-wijaya/24/3f8afe/external-interface-gradak-interface-gradak-royyan-wijaya-5.png" style="width: 1.5em; height: 1.5em; position: relative; top: 0.21em; margin-right: 0.5em; filter: brightness(5); transform: scaleX(-1);"><span class="eahiddenlabel"> Ligar Análises</span></span>');
  let e = document.getElementById("eaoffSwitch");
  e.addEventListener("click", (function (t) {
    e.lastChild.innerText = " Desligar Análises", e.firstChild.style.filter = "brightness(1)", e.firstChild.style.transform = "scaleX(1)", e.setAttribute("style", "top: 0em;left: 0em;"), localSwitchState = eadataRetrieve("eaActive"), null === localSwitchState && (localSwitchState = !0), eadataStore("eaActive", !localSwitchState, TTL1), setTimeout((function () {
      window.location.reload()
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
async function fetchProductDataFromPage(e, t) {
  let n = document.getElementsByClassName("ui-pdp-header");
  n.length > 0 && n[0].insertAdjacentHTML("afterbegin", buildMainComponentSkeleton());
  if (iscatalog = !0, itemsLocalData[e] || (document.dispatchEvent(new CustomEvent("GetProductData", {
    detail: {
      itemIds: [e]
    }
  }
  )), await new Promise((e => setTimeout(e, 100)))), itemsLocalData[e] && itemsLocalData[e].startTime && void 0 !== itemsLocalData[e].itemSales) {
    const n = itemsLocalData[e];
    vendas = n.itemSales, n.startTime && (dataLayer[0] = dataLayer[0] || {}, dataLayer[0].startTime = n.startTime);
    let a = document.getElementsByClassName("ui-pdp-subtitle")[0];
    if (a && vendas > 0) {
      let e = a.innerHTML;
      a.parentElement.style.margin = "1rem 0", a.innerHTML = e + ' (no catálogo)<br><strong style="font-weight: 900;color: var(--mfy-main);">' + vendas + ' vendas</strong><span style="font-size: 0.77em;position: relative;top: -0.1em;"> (deste modelo &amp; vendedor)</span>', a.setAttribute("sales", vendas)
    }
    t()
  }
  else {
    const n = `https://produto.mercadolivre.com.br/MLB-${e.split("MLB")[1]}`;
    try {
      scrapeForScripts(e, n, !0, ((n, a) => {
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
                let d = null, m = s.match(/window\.__PRELOADED_STATE__\s*=\s*(\{.*\});/);
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
                        itemId: e,
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
              vendas = a, dias = o, data_br = dayjs(i).locale("pt-br").format("DD/MM/YYYY"), media_vendas = isNaN(Math.round(vendas / (dias / 30))) ? "-": Math.round(vendas / (dias / 30));
              let e = document.getElementsByClassName("ui-pdp-subtitle")[0];
              if (e) {
                let t = e.innerHTML;
                e.parentElement.style.margin = "1rem 0", e.innerHTML = t + ' (no catálogo)<br><strong style="font-weight: 900;color: var(--mfy-main);">' + vendas + ' vendas</strong><span style="font-size: 0.77em;position: relative;top: -0.1em;"> (deste modelo &amp; vendedor)</span>', e.setAttribute("sales", vendas)
              }
              let t = document.getElementById("mediabtn");
              if (t && dias > 0) {
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
      ), !1, mfyProxy)
    }
    catch (e) {}
  }
}
function buildMainComponentSkeleton() {
 return `
  <div id="main-component-skeleton" class="mfy-skel-root">
    <style>
      .mfy-skel-root{
        font-family: Proxima Nova, -apple-system, Roboto, Arial, sans-serif;
        color:#333;
      }

      /* shimmer */
      @keyframes mfy-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      .skeleton,
      .skeleton-pill{
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: mfy-loading 1.5s infinite;
        color: transparent;
        display: inline-block;
      }
      .skeleton{ border-radius: 4px; }
      .skeleton-pill{ border-radius: 16px; }

      /* layout */
      .mfy-row{ display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; padding:0 2rem 0 0; }
      .mfy-left{ display:flex; align-items:center; }
      .mfy-avatar{
        width:40px; height:40px; background-color: var(--mfy-main);
        border-radius:50%; display:flex; align-items:center; justify-content:center; margin-right:12px;
      }
      .mfy-left .mfy-title { font-size:15px; }
      .mfy-left .mfy-conv { font-size:14px; padding:4px 12px; margin-top:4px; }

      .mfy-right{ text-align:right; }
      .mfy-right .mfy-label{ font-size:14px; }
      .mfy-right .mfy-value{ font-size:16px; font-weight:bold; color: var(--mfy-main); }

      .mfy-rev-card{
        display:flex; align-items:center; justify-content:space-around; margin-bottom:1.5rem;
        box-shadow: rgb(0 0 0 / 11%) 0 3px 6px, rgb(0 0 0 / 10%) 0 3px 6px;
        color: rgb(90,90,90); font-weight:400; font-size:.91em; border-radius:16px; padding:8px 16px;
      }
      .mfy-rev-card .mfy-rev-text{ font-size:1.1em; font-weight:900; flex:1; }
      .mfy-dropdown{
        min-width:32px; height:32px; border-radius:50%; background:#f5f5f5;
        display:flex; align-items:center; justify-content:center; box-shadow:0 1px 3px rgba(0,0,0,.1);
      }

      .mfy-footer{ display:flex; align-items:center; justify-content:space-between; }
      .mfy-footer .mfy-created{
        font-size:.95rem; font-weight:700; display:inline-flex; border-radius:1em; color:rgb(90,90,90);
        box-shadow: rgb(0 0 0) 0 2px 11px -7px; padding:.35em 1em; min-width:fit-content;
      }
      .mfy-footer .mfy-avg{ background-color:#3483fa; color:transparent; padding:10px 20px; font-size:16px; font-weight:bold; }
    </style>

    <div class="mfy-row">
      <div class="mfy-left">
        <div class="mfy-avatar">
          <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width:1.35em; margin:auto;">
        </div>
        <div>
          <div class="mfy-title"><span class="skeleton">30884</span> Visitas totais</div>
          <div class="skeleton-pill mfy-conv">Conversão: 3.2%</div>
        </div>
      </div>

      <div class="mfy-right">
        <div class="mfy-label">Vende a cada:</div>
        <div class="mfy-value"><span class="skeleton">000</span> Visitas</div>
      </div>
    </div>

    <div class="mfy-rev-card">
      <img src="https://img.icons8.com/windows/32/c7c7c7/old-cash-register.png"
           style="width:1.5em; height:1.5em; position:relative; top:.21em; margin-right:.5em;">
      <div class="mfy-rev-text">
        Faturando: <strong style="font-size:15px;"><span class="skeleton">R$ 1.932,56</span>/mês</strong>
      </div>
      <div class="mfy-dropdown">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <div class="mfy-footer">
      <div class="mfy-created">Criado há: <span class="skeleton">520</span> dia(s)</div>
      <div class="skeleton-pill mfy-avg">Média: 58 vendas/mês</div>
    </div>
  </div>
`;

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
  dataLayer[0]?.catalogProductId || "vip" != altPreloadedState.pageState.page ? await fetchProductDataFromPage(e, t): t()
}
function askPermissions(e, t) {
  null == t && (t = !1);
  let n = "", a = "";
  if (
  null != e &&
  (
    n =
      '<div id="modal-permission" style="" aria-hidden="false" class="is-open"><div style="position: fixed;top: 11vh;left: 29vw;z-index: 10000000000;align-content: center;align-items: center;"> <div style="display: flex; justify-content: center; margin-right: 1em;"> <img src="https://i.ibb.co/NV9yg3y/icon-white.png" style="max-width: 4vw;"> </div> <br><div style="text-align: center;padding: 1em 3.5em 3.1em 3.5em;width: 35vw;height: 46vh;background-color: #f1f2f3;margin: 1em 4em 0em 3.1em;border-radius: 0.7em;"> <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_gtudsjto.json" background="transparent" speed="1" style="width: 200px;height: 200px;margin: auto;margin-bottom: -2em;" loop="" autoplay=""></lottie-player><span style="font-size: 2.1em;font-weight: 700;color: var(--mfy-main);line-height: 1em;letter-spacing: -0.05em;">Ok, vamos autorizar esta conta.</span> <br><span style="font-weight: 200;"><div style="text-align: center;font-size: 0.92em;padding: 1.35em 2em 1em 2em;background-color: #ebebeb;margin: 1em 0em;font-weight: 900;"> Seu e-email no Mercado Livre: <br><span style="font-size: 1.7em;color: var(--mfy-main);">' + e + '</span></div><span style="font-weight: 400;color: gray;font-size: 0.85em;">Autorize o app para utilizá-lo em sua conta do Mercado Livre acima. <b style="font-weight: bolder;">OBS.: Evite refazer esse processo.</b></span><a href="https://bit.ly/metrify-ext-conectar"><div style="color: #fff;background-color: #4a90f9;padding: 1.11em 2em;margin-top: 1em;font-size: 1.21em;font-weight: 900;text-transform: uppercase;letter-spacing: 0.035em;border-radius: 4em;cursor: pointer;"> Clique para autorizar</div> </a> </span></div></div><div id="eafollow_bg" style="background-color: #000c20d6 !important;position: absolute;z-index: 100000000;width: 100vw;height: 10000vh;overflow: hidden;color: rgb(0,0,0,0);backdrop-filter: blur(7px);"></div></div>',
    a =
      '<div class="auth-alert" style="color: var(--mfy-main);font-weight: 700;position: absolute;background-color: #f1f4ffb0;padding: 1.1em 0em 0em 0em;width: 21vw;height: 275px;z-index: 1000;backdrop-filter: blur(4px);right: 11em;top: 7em;border-radius: 11px 0px 11px 11px;line-height: 1.35em!important;text-align: center;box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 1px 10px 4px -7px rgb(0 0 0 / 35%);transition: 0.35s all;"><div class="auth-step1" style=" /* display: none; */ "> <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_gtudsjto.json" background="transparent" speed="1" style="width: 100px;height: 100px;margin: auto;margin-bottom: -0.35em;" loop="" autoplay=""> </lottie-player> <div style="margin: auto; max-width: 70%; margin-top: -1rem; "><span style="font-size: 1.21em;">Já autorizou o uso do Metrify em sua conta?</span></div> <span style="font-size: 0.86em;font-weight: 400;">Para continuar a usá-lo, clique abaixo:</span><br><div class="eaauth-check" style="background-color: var(--mfy-main);font-size: 1.15em;font-weight: 900;color: #fff;padding: 1em;width: 77%;margin: auto;letter-spacing: 0.035em;border-radius: 4em;cursor: pointer;position: relative;top: 0.35em;"> Sim, já autorizei.</div> <br><div class="eaauth-pop" style="background-color: #4a70a8;font-size: 1.1em;font-weight: 900;color: #fff;padding: 0.7em;width: 77%;margin: auto;letter-spacing: 0.035em;border-radius: 4em;cursor: pointer;position: relative;/* top: 0.35em; */"> Ainda não autorizei</div></div><div class="auth-step2" style=" opacity: 0%; transition: 0.7s all; display: none; "> <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_gtudsjto.json" background="transparent" speed="1" style="width: 70px;height: 70px;margin: auto;margin-bottom: 0.75em;margin-top: 1em;" loop="" autoplay=""></lottie-player> <span style="font-size: 2em;">Verificando...</span> <br> <span style="font-size: 0.86em;font-weight: 400;">Atualizando informações...</span></div><div class="auth-step3" style=" opacity: 0%; transition: 0.7s all; "> <lottie-player autoplay="" loop="" style="width: 70px;height: 70px;margin: auto;margin-bottom: 0.75em;margin-top: 1em;" speed="1"  background="rgba(0, 0, 0, 0)" src="https://assets4.lottiefiles.com/packages/lf20_b8rtfk3s.json"></lottie-player> <span style="font-size: 1.7em;padding: 0em 0.5em;display: flex;line-height: 1em;margin: -0.5em 0em -0.5em 0em;">Que pena... Não encontramos uma autorização válida.</span> <br> <span style="font-size: 0.86em;font-weight: 400;margin-bottom: 0.75em;">Clique abaixo para liberar o Metrify.</span> <br><div class="eaauth-pop2" style="background-color: var(--mfy-main);font-size: 1.15em;font-weight: 900;color: #fff;padding: 1em;width: 77%;margin: auto;letter-spacing: 0.035em;border-radius: 4em;cursor: pointer;position: relative;top: 0.75em;"> Autorizar Metrify</div></div><div class="auth-step4" style="opacity: 0; transition: all 0.7s ease 0s; display: none;"> <lottie-player autoplay="" loop="" style="width: 70px;height: 70px;margin: auto;margin-bottom: 0.75em;margin-top: 1em;" speed="1" background="transparent" src="https://assets7.lottiefiles.com/packages/lf20_94HTw9.json"></lottie-player> <span style="font-size: 1.7em;">Autorização encontrada.</span> <br> <span style="font-size: 0.86em;font-weight: 400;margin-bottom: 0.75em;">Atualize a página.</span> <br><div class="eaauth-pop4" style="background-color: var(--mfy-main);font-size: 1.15em;font-weight: 900;color: #fff;padding: 1em;width: 77%;margin: auto;letter-spacing: 0.035em;border-radius: 4em;cursor: pointer;position: relative;top: 0.75em;"> Atualizar página</div></div></div>'
  ),
  t
) {

    document.getElementsByClassName("auth-alert")[0].style.display = "none", document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", n), document.getElementsByClassName("eaauth_title")[0].innerText = "Atualize a sua autorização."
  }
  else document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", a), function () {
    let e = document.getElementsByClassName("auth-alert")[0], t = document.getElementsByClassName("auth-step1")[0], a = document.getElementsByClassName("auth-step2")[0], i = document.getElementsByClassName("eaauth-pop")[0];
    document.getElementsByClassName("eaauth-check")[0].addEventListener("click", (function () {
      e.style.height = "175px", t.style.display = "none", a.style.display = "block", a.style.opacity = "100%", findfreshAuth(usuario_logado)
    }
    )), i.addEventListener("click", (function () {
      e.style.display = "none", document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", n)
    }
    ))
  }
  ()
}
async function getnewToken(e) {
  var t = new Headers;
  t.append("accept", "application/json"), t.append("content-type", "application/x-www-form-urlencoded"), fetch("https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=323521671107951&client_secret=FbKILwMpPIa89q6lYd59yA5wJrPK2noN&refresh_token=" + e, {
    method: "POST",
    headers: t,
    redirect: "follow"
  }
  ).then((e => e.json())).then((e => {
    400 != e.status ? appendToken(e.access_token): findPermission()
  }
  )).catch ((e => {}))
}
function confirmAuth(e, t) {
  let n = '<div id="modal-permission" style="" aria-hidden="false" class="is-open"><div style="position: fixed;top: 11vh;left: 29vw;z-index: 10000000000;align-content: center;align-items: center;"> <div style="display: flex; justify-content: center; margin-right: 1em;"> <img src="https://i.ibb.co/NV9yg3y/icon-white.png" style="max-width: 4vw;"> </div> <br><div style="text-align: center;padding: 1em 3.5em 3.1em 3.5em;width: 35vw;height: 46vh;background-color: #f1f2f3;margin: 1em 4em 0em 3.1em;border-radius: 0.7em;"> <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_gtudsjto.json" background="transparent" speed="1" style="width: 200px;height: 200px;margin: auto;margin-bottom: -2em;" loop="" autoplay=""></lottie-player><span style="font-size: 2.1em;font-weight: 700;color: var(--mfy-main);line-height: 1em;letter-spacing: -0.05em;">Ok, vamos autorizar esta conta.</span> <br><span style="font-weight: 200;"><div style="text-align: center;font-size: 0.92em;padding: 1.35em 2em 1em 2em;background-color: #ebebeb;margin: 1em 0em;font-weight: 900;"> Seu e-email no Mercado Livre: <br><span style="font-size: 1.7em;color: var(--mfy-main);">' + usuario_logado + '</span></div><span style="font-weight: 400;color: gray;font-size: 0.85em;">Autorize o app para utilizá-lo em sua conta do Mercado Livre acima. <b style="font-weight: bolder;">OBS.: Evite refazer esse processo.</b></span><a href="https://bit.ly/metrify-ext-conectar"><div style="color: #fff;background-color: #4a90f9;padding: 1.11em 2em;margin-top: 1em;font-size: 1.21em;font-weight: 900;text-transform: uppercase;letter-spacing: 0.035em;border-radius: 4em;cursor: pointer;"> Clique para autorizar</div> </a> </span></div></div><div id="eafollow_bg" style="background-color: #000c20d6 !important;position: absolute;z-index: 100000000;width: 100vw;height: 10000vh;overflow: hidden;color: rgb(0,0,0,0);backdrop-filter: blur(7px);"></div></div>';
  if (e) {
    let e = new Headers;
    e.append("accept", "application/json"), e.append("content-type", "application/x-www-form-urlencoded"), fetch("https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=323521671107951&client_secret=FbKILwMpPIa89q6lYd59yA5wJrPK2noN&refresh_token=" + t, {
      method: "POST",
      headers: e,
      redirect: "follow"
    }
    ).then((e => e.json())).then((e => {
      if (400 != e.status) {
        appendToken(e.access_token);
        let t = document.getElementsByClassName("auth-alert")[0], n = document.getElementsByClassName("auth-step2")[0], a = document.getElementsByClassName("auth-step3")[0], i = document.getElementsByClassName("auth-step4")[0];
        t.style.height = "235px", a.style.display = "none", n.style.display = "none", i.style.display = "block", i.style.opacity = "100%", document.getElementsByClassName("eaauth-pop4")[0].addEventListener("click", (function () {
          document.location.reload(!0)
        }
        ))
      }
      else askPermissions(usuario_logado, !0)
    }
    )).catch ((e => {}))
  }
  else {
    let e = document.getElementsByClassName("auth-alert")[0], t = document.getElementsByClassName("auth-step2")[0], a = document.getElementsByClassName("auth-step3")[0], i = document.getElementsByClassName("eaauth-pop2")[0];
    e.style.height = "275px", t.style.display = "none", a.style.display = "block", a.style.opacity = "100%", i.addEventListener("click", (function () {
      e.style.display = "none", document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", n)
    }
    ))
  }
}
function checkrefresh() {
  let e = parseJwt(mfy_userdata?.token)?.token;
  e && "" != e ? (eadataStore("ealocalrst", null, TTL3), setTimeout((function () {
    document.location.reload(!0)
  }
  ), 1500)): confirmAuth(!1)
}
async function checkDatalayer() {
  askPermissions(usuario_logado)
}
async function findPermission() {
  checkDatalayer()
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
  t = t || 0, await fetch(`${mfyProxy}https://api.mercadolibre.com/users/me`, eaInit).then((e => e.json())).then((e => rawID = e.identification.number ?? void 0)).catch ((function (e) {})), generateEAN13(e, t, !!n)
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
    i === e && (s ? t(s): fetch(`${mfyProxy}https://api.mercadolibre.com/categories/${e}`, eaInit).then((e => e.json())).then((n => {
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
  function e() {
    salesSpot = document.getElementsByClassName("ui-pdp-header__subtitle"), newSalesDiv = `<div id="salesfix" style="width: fit-content;display: flex;flex-direction: row;height: 14px;align-items: center;border-radius: 1rem;border: 1px solid rgba(0,0,0,0.14);padding: 1rem;position: relative;top: 8px;margin-left: 1rem;">\n    <img src="https://i.ibb.co/K7Lc6cr/metrify.png" style="width: 14px;height: 14px;position: relative;left: 1px;margin-right: -0.5rem">\n    ${vendas} vendidos\n    </div>`, iscatalog ? salesSpot[0].setAttribute("style", "display: flex;flex-direction: row;gap: 1rem; margin: 1rem 0;align-items: center;"): (salesSpot[0].firstChild.setAttribute("style", "display: flex;flex-direction: row;align-items: center;margin-bottom:1.35rem"), salesSpot[0].firstChild.style.width = "max-content")
  }
  function t() {
    var e = [];
    function t() {
      earanksearchBtn = document.getElementById("eaadvsearchBtn"), earanksearchForm = document.getElementById("eaadvsearchForm"), earanksearchResult = document.getElementById("eaadvsearchResult"), earanksearchGo = earanksearchForm.getElementsByTagName("button")[0], earanksearchValue = earanksearchForm.getElementsByTagName("input")[0];
      var t = earanksearchBtn.getElementsByTagName("img")[0];
      iscatalog || dataLayer[0].catalogProductId, earanksearchForm.setAttribute("style", "display: none;"), earanksearchBtn.addEventListener("click", (function () {
        e = [], [], earanksearchForm.getElementsByTagName("input")[0].value = "", earanksearchResult.setAttribute("style", "display:none;"), "rgb(52, 131, 250)" != earanksearchBtn.style.backgroundColor ? (earanksearchForm.setAttribute("style", "position: relative;top: 2.7em;z-index: 0;"), earanksearchBtn.style.backgroundColor = "rgb(52, 131, 250)", t.setAttribute("style", "width: 1.5em;height: 1.5em;position: relative;top: 0.21em;filter: brightness(11);"), earanksearchBtn.getElementsByClassName("eahiddenlabel")[0].setAttribute("style", "display:none;")): (earanksearchBtn.getElementsByClassName("eahiddenlabel")[0].removeAttribute("style"), earanksearchForm.setAttribute("style", "display:none;"), t.setAttribute("style", "width: 1.5em;height: 1.5em;position: relative;top: 0.21em;margin-right: 0.5em;"), earanksearchBtn.removeAttribute("style"))
      }
      )), earanksearchGo.addEventListener("click", (function () {
        earanksearchForm.setAttribute("style", "display:none;position: relative; z-index: 0;"), async function (t) {
          earanksearchForm.insertAdjacentHTML("afterend", `<div id="mfyloaderdiv" style="display: flex;width: 100%;">${mfyloader}<span style="position: relative;font-size: 0.86em;font-weight: 700;top: 5em;flex: 1;">Buscando este anúncio nas 20 primeiras páginas. Um momento... </span></div>`), document.getElementsByTagName("mfyloader")[0].style.marginTop = "3em";
          let n = !1;
          for (let i = 0;
          i < 20;
          i++) {
            function a(e) {
              document.getElementById("mfyloaderdiv")?.remove(), document.getElementById("eaadvsearchResult").setAttribute("style", "position: relative;top:1.75em;");
              var n = document.getElementsByTagName("earesult")[0];
              if (n.innerHTML = 'Não encontrado <span style="font-size:0.7em;position: relative;left: -10.5em;top: 1.1em;">(nas 20 primeiras páginas)</span> <span style="font-size: 0.7em;color: #00000050;display: inline-flex;letter-spacing: 0.035em;padding: 0.35em 0.75em;background-color: #ebebeb;border-radius: 1em;position: relative;right: -15.5em;top: -1.35em;">"' + t + '"</span>', n.setAttribute("style", "position:relative;top:-0.35em;"), -1 != e) {
                let a = Math.floor(e / 50) + 1, i = e % 50;
                i += 1, n.innerHTML = `${a}ª Página | ${i}º lugar <span style=" font-size: 0.7em; color: #00000050; letter-spacing: 0.035em; padding: 0.35em 0.75em; background-color: #ebebeb; border-radius: 1em;display:inline-block; margin-left: 2.1em;">"${t}"</span><br><span style="font-size: 0.77em;padding: 2em;color: var(--mfy-main);">*Após anúncios de catálogo e patrocinados.</span>`, n.setAttribute("style", "position:relative;")
              }
            }
            let s = [...e.map((e => e?.map((e => e.id))))];
            -1 !== s.join().split(",").indexOf(item_ID) && (s.join().split(","), n = !0), 0 == n ? (await fetch(`${mfyProxy}https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(t)}&offset=${50*i}`, eaInit).then((e => e.json())).then((t => e.push(t.results))).catch ((function (e) {})), i >= 19 && a(s.join().split(",").indexOf(item_ID))): a(s.join().split(",").indexOf(item_ID))
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
      }
      )), function () {
        let e = isNaN(media_vendas * preco_Local) ? 0: media_vendas * preco_Local, t = parseSalesText(document.getElementsByClassName("ui-pdp-subtitle")[0].innerText).thisItemSales, n = isNaN(t * preco_Local) ? 0: t * preco_Local, a = document.getElementsByClassName("eagrossrev-title")[0], i = document.getElementsByClassName("earevstats")[0], s = document.getElementsByClassName("eagrossrev-catalog-title");
        if (iscatalog) {
          a.setAttribute("class", ""), a.parentElement.lastChild.remove(), a.parentElement.setAttribute("style", "font-size: 0.92em;display: flex;font-weight: 900;");
          let t = a.parentElement.previousSibling;
          a.parentElement.previousSibling.remove(), a.parentElement.insertAdjacentElement("afterbegin", t), a.parentElement.parentElement.setAttribute("style", "display: flex;flex-direction: column;"), a.innerHTML = '<div style="padding: 0rem 1rem;margin: 0 .75rem;font-size: .85rem;width: fit-content;border-radius:1rem;border:1px solid #ebebeb;">Catálogo & Anúncio vencedor</div>', i && i.insertAdjacentHTML("beforeend", '<div style="display:flex;flex-direction:column;margin-top:1rem;"><span style="font-size: 0.92em;font-weight: 900;"><span class="ui-pdp-review__amount">-Anúncio</span> <span class="eagrossrev-catalog-title" style="font-size: 1.35em;">R$0</span><span class="revtitle revperiod">/mês</span></span>\n            <span style="font-size: 0.92em;font-weight: 900;"><span class="ui-pdp-review__amount">- Catálogo:</span> <span class="eagrossrev-catalog-title" style="font-size: 1.35em;">R$0</span><span class="revtitle"> Total</span></span></div>'), s?.length > 0 && (s[1].innerHTML = `${parseFloat(n.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`), document.getElementsByClassName("eagrossrev-catalog-title")[0].innerHTML = `${parseFloat(e.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`
        }
        else a.innerHTML = `${parseFloat(e.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`;
        i.setAttribute("style", "transition:all 0.35s;padding: 0em 1em 0.35em 1.7em;color: gray;display: none;margin-top: -4em;opacity: 0");
        let o = document.getElementById("eagrossrev"), r = document.getElementsByClassName("ui-pdp__header-top-brand")[0], l = document.getElementsByClassName("ui-pdp-highlights")[0];
        if (r) {
          let e = r.getElementsByClassName("ui-pdp__header-top-brand__image-container")[0], t = document.getElementsByClassName("ui-pdp-subtitle")[0];
          t.parentElement.style.margin = e || l ? "1.5rem 0 0 0": "1rem 0px 1rem"
        }
        let d = document.getElementsByClassName("ui-pdp-header")[0];
        d && iscatalog && l && d.setAttribute("style", "display: block!important;");
        o.addEventListener("mouseover", (function () {
          iscatalog ? i.setAttribute("style", "transition:all 0.35s;;margin-top: 0em;padding: 0em 1em 0.35em 1.7em;color: gray;opacity: 1"): i.setAttribute("style", "transition:all 0.35s;;margin-top: -1em;padding: 0em 1em 0.35em 1.7em;color: gray;opacity: 1")
        }
        )), o.addEventListener("mouseout", (function () {
          i.setAttribute("style", "transition:all 0.35s;;padding: 0em 1em 0.35em 1.7em;color: gray;display: none;margin-top: -4em;opacity: 0")
        }
        ));
        let m = document.getElementsByClassName("revbtn1")[0], c = document.getElementsByClassName("revbtn7")[0], p = document.getElementsByClassName("revbtn30")[0], g = document.getElementsByClassName("revbtn60")[0], f = document.getElementsByClassName("revbtn90")[0], u = document.getElementsByClassName("revbtntotal")[0], y = document.getElementsByClassName("revtitle");
        dias / vendas > 1 && (m.style.display = "none");
        dias <= 30 && (f.style.display = "none", g.style.display = "none", p.style.display = "none");
        e <= 0 && (m.style.display = "none", c.style.display = "none", p.style.display = "none", g.style.display = "none", f.style.display = "none");
        let h = document.getElementsByClassName("revperiod");
        m.addEventListener("click", (function (t) {
          let n = isNaN(e / 30) ? 0: e / 30;
          s?.length > 0 ? s[0].innerHTML = `${parseFloat(n.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`: a.innerHTML = `${parseFloat(n.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`, y[0].innerHTML = "Faturamento:", y[1].innerHTML = " /dia";
          for (let e = 0;
          e < h?.length;
          e++) h[e].innerHTML = " /dia"
        }
        )), c.addEventListener("click", (function () {
          let t = isNaN(e / 2) ? 0: e / 2;
          s?.length > 0 ? s[0].innerHTML = `${parseFloat(t.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`: a.innerHTML = `${parseFloat(t.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`, y[0].innerHTML = "Faturamento:", y[1].innerHTML = " /semana";
          for (let e = 0;
          e < h?.length;
          e++) h[e].innerHTML = " /semana"
        }
        )), p.addEventListener("click", (function (t) {
          let n = isNaN(e) ? 0: e;
          s?.length > 0 ? s[0].innerHTML = `${parseFloat(n.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`: a.innerHTML = `${parseFloat(n.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`, y[0].innerHTML = "Faturamento:", y[1].innerHTML = " /mês";
          for (let e = 0;
          e < h?.length;
          e++) h[e].innerHTML = " /mês"
        }
        )), g.addEventListener("click", (function () {
          let t = isNaN(2 * e) ? 0: 2 * e;
          s?.length > 0 ? s[0].innerHTML = `${parseFloat(t.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`: a.innerHTML = `${parseFloat(t.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`, y[0].innerHTML = "Faturamento:", y[1].innerHTML = " /60 dias";
          for (let e = 0;
          e < h?.length;
          e++) h[e].innerHTML = " /60 dias"
        }
        )), f.addEventListener("click", (function () {
          let t = isNaN(3 * e) ? 0: 3 * e;
          s?.length > 0 ? s[0].innerHTML = `${parseFloat(t.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`: a.innerHTML = `${parseFloat(t.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`, y[0].innerHTML = "Faturamento:", y[1].innerHTML = " /90 dias";
          for (let e = 0;
          e < h?.length;
          e++) h[e].innerHTML = " /90 dias"
        }
        )), u.addEventListener("click", (function () {
          let e = isNaN(vendas * preco_Local) ? 0: vendas * preco_Local;
          s?.length > 0 ? s[0].innerHTML = `${parseFloat(e.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`: a.innerHTML = `${parseFloat(e.toFixed(2)).toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`, y[0].innerHTML = "Faturamento:", y[1].innerHTML = " /Total";
          for (let e = 0;
          e < h?.length;
          e++) h[e].innerHTML = " /Total"
        }
        ));
        let b = document.getElementById("mfy_rev_estimate");
        b && (b.innerHTML = "Média de faturamento estimada por períodos")
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
          let a = `${'<span id="easellerbtn" sellerdata="none" open="false" class="andes-button--loud mfy-main-bg  andes-button" style="position:relative; z-index:1;margin-bottom: 28px;margin-top: -1em;width: 100%;"><img src="https://img.icons8.com/material-outlined/48/ffffff/individual-server.png" style="width: 1.35em;margin: 0.8em 0.2em -0.35em 0em;display: inline-block;">Informações Extras</span>'}${`<div class="smooth ui-pdp-component-list pr-16 pl-16 alinharvertical" id="sellerinfobox" style="margin: -3em 0em 0em 0em;padding: 2em 0em 1em 0em;height: 0px;overflow: hidden;opacity: 0;">${mfyloader}</div>`}`;
          "" != t && null != t?.firstChild && t?.firstChild.insertAdjacentHTML("beforebegin", a);
          let i = document.getElementById("easellerbtn"), s = document.getElementById("sellerinfobox");
          i?.addEventListener("click", (function () {
            "true" == this.getAttribute("open") ? (s.style.opacity = "0", s.style.height = "0px", s.style.margin = "-3em 0em 0em 0em", this.setAttribute("open", "false")): "false" == this.getAttribute("open") && (s.style.opacity = "1", s.style.height = "auto", s.style.margin = "-3em 0em 2em 0em", this.setAttribute("open", "true")), "none" == this.getAttribute("sellerdata") && fetch(`${mfyProxy}https://api.mercadolibre.com/users/${vendedor}`, eaInit).then((t => e(t))).catch ((function (e) {}))
          }
          ))
        }
        else {
          document.getElementById("easellerbtn").setAttribute("sellerdata", "true");
          let e = document.getElementById("sellerinfobox"), a = e.getElementsByTagName("mfyloader");
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
              e++) y += `<span style="padding: 1px 7px;border-radius:11px;font-weight: 400;font-size:12px;margin: 2px 2px;" class="andes-button--loud mfy-main-bg ">${u[e]}</span>`;
              let h = t.seller.seller_reputation.transactions.canceled, b = h / m * 100, v = `<span style="font-weight: 900;font-size: 0.92em;display: block;margin: 4px;">${r} Anúncios <span style="padding: 1px 7px;border-radius:11px;font-weight: 400;font-size:12px;margin: 2px 2px;border: 2px solid #ebebeb;">até R$79</span></span>\n\n                        <span style="font-weight: 400;font-size: 0.92em;display: block;margin: 4px;">${l} Anúncios <span style="padding: 1px 7px;border-radius:11px;font-weight: 400;font-size:12px;margin: 2px 2px;border: 2px solid #ebebeb;">R$80 até R$150</span></span>\n\n                        <span style="font-weight: 400;font-size: 0.92em;display: block;margin: 4px;">${d} Anúncios <span style="padding: 1px 7px;border-radius:11px;font-weight: 400;font-size:12px;margin: 2px 2px;border: 2px solid #ebebeb;">Acima de R$150</span></span>`, x = `<div class="ealine" style="display: flex;flex-wrap: wrap;"><img src="https://img.icons8.com/fluency-systems-regular/96/${mfyMainColorNumbers}/shop-location.png" style="width: 2.7em;margin: 0px 7px 7px 7px;"> <div style="display: grid;"><span style="font-size: 1.1em;font-weight: 700;">${t.seller.nickname}</span><span style="font-size: 11px;margin-top: -0.75em;">Conta criada: ${i}<span class="andes-button--loud mfy-main-bg " style="margin-left: 0.5em;padding: 1px 5px;border-radius: 11px;font-weight: 900;font-size: 10px;">${s}</span></span></div></div>\n\n                        <div style="width: 100%;background: #ebebeb;height: 1px;"></div>\n                        \n                        <div class="ealine" style="display: flex;flex-wrap: wrap;margin-top: 0.5em;"> <div style="padding-left: 1em;"><span style="font-size: 1em;font-weight: 900;">Vendas totais: </span>${m} <span style="padding: 1px 7px;border-radius: 11px;font-weight: 400;font-size: 10px;background-color: #a3a3a3;" class="andes-button--loud mfy-main-bg ">${h} canceladas (${b.toFixed(1)}%)</span></div></div>\n                        \n                        <div class="ealine" style="display: flex;flex-wrap: wrap;"> <div style="padding-left: 1em;margin: 4px 0px;"><span style="font-size: 1em;font-weight: 900;">Anúncios:</span> ${t.paging.total} <span style="padding: 1px 7px;border-radius: 11px;font-weight: 400;font-size: 10px;background-color: #39b54a;margin: 0px 4px;" class="andes-button--loud mfy-main-bg ">${o} <svg xmlns="http://www.w3.org/2000/svg" class="logo-full" width="151" height="39" viewBox="0 0 151 39" data-reactroot="" style="width: 3.75em;height: auto;position: relative;top: 0.2em;padding: 0em 0em 0em 0.35em;"><g fill="#ffffff" fill-rule="evenodd"><path d="M9.577 0L0 22.286h15.962L9.577 39l25.54-25.071H19.153L28.732 0zM56.094 27.925h-6.931l5.924-24.38h19.706l-1.33 5.483H60.688l-.886 3.801h12.452l-1.33 5.483H58.433l-2.338 9.613zm33.718.439c-8.262 0-12.332-3.582-12.332-8.7 0-.402.12-1.242.202-1.608l3.546-14.51h7.052L84.774 17.91c-.04.183-.12.585-.12 1.023.04 2.01 1.732 3.948 5.158 3.948 3.707 0 5.601-2.12 6.286-4.971l3.507-14.365h7.012L103.11 18.02c-1.451 5.921-4.998 10.344-13.3 10.344zm36.014-.439h-17.732l5.924-24.38h6.932l-4.554 18.897h10.76l-1.33 5.483zm23.844 0h-17.732l5.924-24.38h6.932l-4.554 18.897H151l-1.33 5.483z"></path></g></svg></span><span style="padding: 1px 7px;border-radius: 11px;font-weight: 400;font-size: 10px;background-color: #39b54a;" class="andes-button--loud mfy-main-bg ">${a} Frete Grátis</span></div></div>\n\n                        <div class="ealine" style="display: flex;flex-wrap: wrap;"> <div style="padding-left: 1em;margin: 4px 0px;"><span style="font-size: 1em;font-weight: 900;">Anúncios por Ticket:</span><div style="border-left: 2px solid var(--mfy-main);">${v}</div></div></div>\n                        \n                        <div class="ealine" style="display: flex;flex-wrap: wrap;"> <div style="padding-left: 1em;display: flex;flex-wrap: wrap;"><span style="font-size: 1em;font-weight: 900;">Categorias principais do vendedor: </span>${y}</div></div>`;
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
            t++) e.push(fetch(`${mfyProxy}https://api.mercadolibre.com/sites/MLB/search?seller_id=${vendedor}&offset=${50*t}`, eaInit));
            return Promise.all(e)
          }
          )().then(p).then((e => n(e))).then(d = !0).catch ((function (e) {}))
        }
      }
      t()
    }
    function i() {
      document.getElementsByClassName("ui-pdp-breadcrumb")[0].insertAdjacentHTML("beforeend", '<div id="eacattrends" style="width:62em"><span id="eacattrendsbtn" style="font-weight:700;background-color:var(--mfy-main);color:#fff;padding:0.35em 0.75em;border-radius:7px;margin: 0em 0.5em;cursor: pointer;position: relative;top: -4px;z-index: 3;"><img src="https://img.icons8.com/ios-glyphs/60/ffffff/hot-sales-hours.png" style="width: 1.21em;position: relative;top: 3px;">\n            <span>Termos mais buscados! </span> <span style="font-size: 0.7em;position: relative;top: -2px;right: -3px;padding: 0px 5px 1px 5px;margin: 0px 0px 0px 5px;border: 1px solid #fff;border-radius: 1em;">categoria</span></span></div>');
      let e = document.getElementById("eacattrends");
      function t() {
        n.getElementsByTagName("span")[0].innerText = "Carregando...", fetch(`${mfyProxy}https://api.mercadolibre.com/trends/MLB/${categoria_Local}`, eaInit).then((e => e.json())).then((e => function (e) {
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
    ensureNovaiKpiStyles(), spot0[0].insertAdjacentHTML("afterbegin", analytics_ui), i(), function () {
      let e = document.getElementById("eahealthmeter"), t = document.getElementById("eameter_modal");
      e && e.remove(), t && t.remove()
    }
    (), t(), function () {
      let e = eadataRetrieve("eaActive"), t = document.getElementById("eaoffSwitch");
      function n() {
        e = eadataRetrieve("eaActive"), null === e && (e = !0), e ? (t.lastChild.innerText = " Desligar Análises", t.firstChild.style.filter = "brightness(1)", t.firstChild.style.transform = "scaleX(1)", t.setAttribute("style", ""), iscatalog || (t.style.top = "0.31em")): (t.setAttribute("style", "background-color:rgb(52, 131, 250);color:#fff;"), t.firstChild.style.filter = "brightness(5)", t.firstChild.style.transform = "scaleX(-1)", t.lastChild.innerText = " Ligar Análises")
      }
      n(), t && t.addEventListener("click", (function () {
        e = eadataRetrieve("eaActive"), null === e && (e = !0), eadataStore("eaActive", !e, TTL1), n(), setTimeout((function () {
          window.location.reload()
        }
        ), 1e3)
      }
      ))
    }
    (), n(), function bindNovaiChartHover() {
      const e = document.getElementById("novai-fat-card");
      const t = document.getElementById("novai-chart-panel");
      if (!e || !t) return;
      const n = n => {
        const a = n.clientX + 12;
        const o = n.clientY - (t.offsetHeight + 12);
        t.style.left = a + "px";
        t.style.top = Math.max(8, o) + "px";
      };
      e.addEventListener("mouseenter", (() => { t.style.display = "block"; }));
      e.addEventListener("mouseleave", (() => { t.style.display = "none"; }));
      e.addEventListener("mousemove", n);
    }(), iscatalog && (document.getElementById("eaoffSwitch")?.setAttribute("style", "top: 0.35em;"), document.getElementById("eaadvsearchBtn")?.setAttribute("style", "left: 0.25em;")), a(), function () {
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
    price_tool = `\n    <style>\n    @import url("https://fonts.cdnfonts.com/css/montserrat");\n    </style>\n\n    <div id="price-tool" style="\n          position: relative;\n          top: -1.35em;\n          background-color: #fff;\n          box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px,\n            rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;\n          border: 0px !important;\n          /* overflow: hidden; */\n        " class="ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical">\n        <div id="etapa2" class="smooth hdn transp" style="width: inherit; float: left; transform: translate(-10px, 0px)">\n            <div style="text-align: right; padding-left: 1.85em; width: 45%">\n                O valor <b>sugerido</b> para publicar seu anúncio é de:\n            </div>\n            <h1 class="price-tag price-tag-fraction" style="width: 53%; overflow: hidden; float: right; margin-top: -1.5em">\n                <span style="margin-right: 0.15em"><img\n                        src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"\n                        height="16" width="20" style="margin-top: 0.2em; opacity: 35%" />R$</span><span\n                    id="valor_sugerido_reais">00</span><span id="valor_sugerido_centavos"\n                    style="font-size: 0.5em; font-weight: 100">,00</span>\n            </h1>\n            <p style="float: right; margin: -1.35em 3.75em 0em 0em; font-size: 11px" class="ui-pdp-review__amount">\n                *Sugestão com alíquota..\n            </p>\n            <div class="detalhamento" id="detalhamento">\n                <ul class="ui-pdp-review__amount">\n                    <li>\n                        Seu custo:\n                        <img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"\n                            height="11" style="padding: 0em 0.5em 0em 0em" /><span class="ui-pdp-price"\n                            id="detalhe-custo">R$&nbsp; 0,00</span>\n                    </li>\n                    <li>\n                        Impostos:<img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"\n                            height="11" style="padding: 0em 0.5em 0em 0.61em" /><span class="ui-pdp-price"\n                            id="detalhe-imposto">R$&nbsp;0</span>\n                    </li>\n                    <li style="transform: translate(4px, 0px)">\n                        Seu lucro:\n                        <img alt="icon"\n                            src="https://ci5.googleusercontent.com/proxy/t9hOuXHFrNPYlckwjpVbXLSlkxMtwzLYCTIi7PchhDo9m0lT7QD15EK5HN7R_R-xZrKcTgNktsim1qXR1LlKrEKQNa030zOY_S-rBf1-Eds9chp_rizwkWlvcacgOpH-Hj7BTbJJ-tG97e7u8JhDtjRMp8DP9Bwv9jtS-VYIrGWn=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/common/back.png"\n                            height="11" style="padding: 0em 0.2em; padding-right: 0.45em" /><span class="ui-pdp-price"\n                            id="detalhe-lucro">R$&nbsp; 0,00</span>\n                    </li>\n                    <li style="transform: translate(-7px, 0px)">\n                        Taxa do ML:<img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png"\n                            height="11" style="padding-right: 0.2em; padding-left: 0.15em" />\n                        <span class="ui-pdp-price" id="detalhe-taxa">R$&nbsp; 0,00</span>\n                    </li>\n                    <li style="transform: translate(9px, 0px)">\n                        Taxa Fixa:<img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png"\n                            height="11" style="padding-right: 0.2em" />\n                        <span class="ui-pdp-price" id="detalhe-taxafixa">R$&nbsp; 0,00</span>\n                    </li>\n                    <li style="transform: translate(30px, 0px)">\n                        Envio:\n                        <img alt="icon"\n                            src="https://ci3.googleusercontent.com/proxy/4AHE0GSzeLFc0tuceXt2Hib-rWVbcK8yqriCrBnrQFdt3LpCrH-NA3nyDKu-IO-65xO2yjlS7rsjGiJWV6QunadzFZlJPWqeb2Shj_fYgwagdLoTOAljMen83VI1eloEUOdeZcR4Su7DrJRWooeRNOF5nZ2fJv2BE06zEE2uKHkiVrr1vOvtY78kR28=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-mail.png"\n                            height="11" style="padding-right: 0.3em; transform: translate(-2px, 0px)" /><span\n                            class="ui-pdp-price" id="detalhe-envio">R$&nbsp; 0,00</span>\n                    </li>\n                </ul>\n            </div>\n            <a id="vermais" style="float: right; margin: 1em 7em 0em 0em">Ver mais detalhes</a>\n            <p id="eareset" style="\n              float: right;\n              margin: 1em 8.35em 0em 0em;\n              font-weight: 900;\n              color: #aeaeae;\n              font-size: 0.77em;\n              text-align: center;\n            ">\n                Problemas no cálculo?<br />Aperte Ctrl+Shift+R\n            </p>\n            <br />\n            <a id="refazer" style="\n              padding: 1em;\n              border-radius: 0.7em;\n              float: right;\n              margin: 1em 5.5em 0em 0em;\n            " class="andes-button--quiet">↻ Refazer simulação</a>\n        </div>\n\n        <div id="etapa1" style="margin: auto; overflow: hidden; width: 100%; margin-top: -1em" class="smooth">\n            <div id="pricetool_header" style="\n              height: 4em;\n              margin-bottom: 1.5em;\n              background-color: #f5f5f5;\n              display: flex;\n              align-items: center;\n              padding: 0em 1em;\n            ">\n                <img style="opacity: 0.21; width: 3.5rem; position: absolute; left: 0.21rem"\n                    src="https://i.ibb.co/FDxGScN/icon-gray.png" title="Metrify" />\n                <h3 style="\n                float: left;\n                font-size: 1.5rem;\n                font-family: 'Montserrat', sans-serif;\n                font-weight: 700;\n                margin-left: 1rem;\n              ">\n                    Precificador\n                </h3>\n                \n            </div>\n\n            <div id="pricetool_content" style="line-height: 1em; padding: 0em 1em">\n                <div id="pricetool_loading" class="new-loader new-hdn">\n                    <lottie-player src="${extensionPath}src/lotties/lf20_uwR49r.json" background="transparent"\n                        speed="1" style="width: 7rem; height: 7rem; margin: auto" loop autoplay></lottie-player>\n                </div>\n\n                <div id="passo-02" class="new-hdn">\n                    <div class="pt_row" style="\n                  display: flex;\n                  justify-content: center;\n                  align-items: center;\n                  flex-direction: column;\n                  padding-top: 1rem;\n                ">\n                        <span style="\n                    background: -webkit-linear-gradient(\n                      left,\n                      rgba(121, 51, 255, 1),\n                      rgba(6, 189, 252, 1)\n                    );\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                    -webkit-text-fill-color: transparent;\n                    font-size: 1.35rem;\n                    font-weight: 800;\n                    font-family: 'Montserrat', sans-serif;\n                  ">\n                            PAV Dinâmico:\n                        </span>\n                        <br />\n                        <span style="font-size: 1rem;margin-top: -0.7rem;">\n                            (Preço alvo de vendas)\n                        </span>\n\n                        <div style="\n              display: flex;\n              flex-direction: column;\n              justify-content: center;\n              align-items: center;\n              font-size: 1.75rem;\n              font-weight: 600;\n              max-width: 100%;\n              min-width: 21rem;\n              margin: 0 auto;\n              padding: 1em;\n              ">\n                            <range-slider class="rangeslider" id="pav-slider" min="7" max="100" step="0.50"></range-slider>\n                        </div>\n\n                        <span style="\n                    background: -webkit-linear-gradient(\n                      left,\n                      rgba(121, 51, 255, 1),\n                      rgba(6, 189, 252, 1)\n                    );\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                    -webkit-text-fill-color: transparent;\n                    font-size: 1.35rem;\n                    font-weight: 800;\n                    font-family: 'Montserrat', sans-serif;\n                  ">\n                            Seus Resultados:\n                        </span>\n                        <br />\n\n                        <div id="pt_highlight_result" style="width: 90%">\n                            <div style="\n                      width: 100%;\n                      border: 1px solid #00000011;\n                      border-radius: 4rem;\n                      font-size: 1.35rem;\n                      display: flex;\n                      justify-content: space-between;\n                      padding: 1em;\n                      font-family: 'Montserrat', sans-serif;\n                      margin: 0.21em 0em;\n                    ">\n                                <span style="font-weight: bold">Você recebe</span>\n                                <span id="pt_result_revenue" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div style="\n                      width: 100%;\n                      border: 1px solid #00000011;\n                      border-radius: 4rem;\n                      font-size: 1.35rem;\n                      display: flex;\n                      justify-content: space-between;\n                      padding: 1em;\n                      font-family: 'Montserrat', sans-serif;\n                      margin: 0.21em 0em;\n                    ">\n                                <span style="font-weight: bold">Lucro</span>\n                                <div>\n                                    <abbr\n                                        title="Valor de lucro final após todas as tarifas, taxas e custos (exceto tributos)."\n                                        style=" text-decoration:none">\n                                        <img id="profit_info" src="https://img.icons8.com/ios-filled/50/000000/info.png"\n                                            style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />\n                                    </abbr>\n                                    <span id="pt_result_profit" style="font-weight: 500">R$0,00</span>\n                                </div>\n                            </div>\n\n                            <div style="\n                      width: 100%;\n                      border: 1px solid #00000011;\n                      border-radius: 4rem;\n                      font-size: 1.35rem;\n                      display: flex;\n                      justify-content: space-between;\n                      padding: 1em;\n                      font-family: 'Montserrat', sans-serif;\n                      margin: 0.21em 0em;\n                    ">\n\n                                <span style="font-weight: bold">Margem/venda</span>\n                                <abbr title="Margem de lucro relativa ao preço alvo de venda cadastrado no marketplace."\n                                    style=" text-decoration:none">\n                                    <img id="profitpct_info" src="https://img.icons8.com/ios-filled/50/000000/info.png"\n                                        style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />\n                                </abbr>\n                                <span id="pt_result_profitpct" style="font-weight: 500">0%</span>\n                            </div>\n\n                            <div style="\n                      width: 100%;\n                      border: 1px solid #00000011;\n                      border-radius: 4rem;\n                      font-size: 1.35rem;\n                      display: flex;\n                      justify-content: space-between;\n                      padding: 1em;\n                      font-family: 'Montserrat', sans-serif;\n                      margin: 0.21em 0em;\n                    ">\n                                <span style="font-weight: bold">Markup</span>\n                                <div>\n                                    <abbr\n                                        title="Percentual indicador de quanto o preço do produto está acima do seu custo de produção/compra."\n                                        style=" text-decoration:none">\n                                        <img id="markup_info" src="https://img.icons8.com/ios-filled/50/000000/info.png"\n                                            style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />\n                                    </abbr>\n                                    <span id="pt_result_markup" style="font-weight: 500">0%</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="pt_row" style="\n                  width: 77%;\n                  margin: auto;\n                  margin-top: 1.35rem;\n                  margin-bottom: 2rem;\n                ">\n                        <span style="\n                    font-size: 1.21rem;\n                    font-weight: bold;\n                    font-family: 'Montserrat', sans-serif;\n                  ">\n                            Custos de venda:\n                        </span>\n\n                        <div class="pt_row" class="andes-form-control">\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Tarifa:</span>\n                                <span id="pt_result_marketplacecut" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Impostos:</span>\n                                <span id="pt_result_tax" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Taxa Fixa:</span>\n                                <span id="pt_result_fee" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Custo:</span>\n                                <span id="pt_result_cost" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                            <div class="sub_row" style="\n                      width: 100%;\n                      display: flex;\n                      justify-content: space-between;\n                      margin-top: 0.7rem;\n                      font-weight: bold;\n                      font-size: 1.21rem;\n                      padding: 0.14em 0em;\n                      border-bottom: 1px solid #00000021;\n                    ">\n                                <span>Envio:</span>\n                                <span id="pt_result_shipping" style="font-weight: 500">R$0,00</span>\n                            </div>\n\n                        </div>\n                    </div>\n\n                    <div id="pt_goback" style="\n                  display: flex;\n                  align-items: center;\n                  justify-content: center;\n                  font-weight: 600;\n                  font-size: 1.35rem;\n                  width: 90%;\n                  height: 2.5rem;\n                  border-radius: 4rem;\n                  padding: 1rem;\n                  margin: auto;\n                  margin-top: 0.1em;\n                  margin-bottom: 1rem;\n                  background: -webkit-linear-gradient(left, #3c73ff, #12b0fd);\n                  color: white;\n                  font-family: Montserrat, sans-serif;\n                  cursor: pointer;\n                  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px,\n                    rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;\n                ">\n                        Voltar\n                    </div>\n                </div>\n\n                <div id="passo-01">\n                    <div class="pt_row">\n                        <span style="\n                    background: -webkit-linear-gradient(\n                      left,\n                      rgba(121, 51, 255, 1),\n                      rgba(6, 189, 252, 1)\n                    );\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                    -webkit-text-fill-color: transparent;\n                    font-size: 1.35rem;\n                    font-weight: 800;\n                    margin: 0.5em 0em 0em 0.5em;\n                    font-family: 'Montserrat', sans-serif;\n                  ">\n                            PAV\n                        </span>\n                        <br />\n                        <span style="margin: 0.5em 0em 0em 0.5em">(Preço alvo de venda)\n                        </span>\n\n                        <div class="andes-form-control" style="padding: 0em 0.7em 0em 0em; font-weight: bold">\n                            <input id="pav-input" type="number" placeholder="digite o valor" style="\n                      margin: 0.5em 0em 0.5em 0.35em;\n                      font-weight: 400;\n                      background-color: #80808000;\n                      border-radius: 0.25em;\n                      border: 2px solid #00000021;\n                      width: 100%;\n                      font-size: 1em;\n                      padding: 0.35em 0.35em 0.35em 2.1em;\n                      font-family: Proxima Nova, -apple-system, Helvetica Neue,\n                        Helvetica, Roboto, Arial, sans-serif;\n                    " />\n                            <span style="position: absolute; top: 1.7rem; left: 1rem">R$:</span>\n                        </div>\n                    </div>\n\n                    <div class="pt_row" style="\n                  display: flex;\n                  justify-content: space-between;\n                  margin-top: 0.7rem;\n                  font-weight: bold;\n                " class="andes-form-control">\n                        <div id="pt_cost" style="flex: 1; padding: 0em 0.7em 0em 0.7em">\n                            <span style="\n                      font-size: 1.21rem;\n                      font-weight: bold;\n                      font-family: 'Montserrat', sans-serif;\n                    ">\n                                Custo do produto:\n                            </span>\n                            <input id="custo" type="number" style="\n                      margin: 0.5em 0em 0.5em 0.35em;\n                      font-weight: bold;\n                      background-color: #80808000;\n                      border-radius: 0.25em;\n                      border: 2px solid #00000021;\n                      width: 100%;\n                      font-size: 1.1em;\n                      padding: 0.5em 0.35em 0.5em 2em;\n                    " />\n                            <span style="position: relative; top: -2.6rem; left: 1rem">R$:</span>\n                        </div>\n\n                        <div id="pt_taxes" style="flex: 1; padding: 0em 0.7em 0em 0.7em">\n                            <span style="\n                      font-size: 1.21rem;\n                      font-weight: bold;\n                      font-family: 'Montserrat', sans-serif;\n                    ">Sua alíquota de imposto</span><input id="aliq" type="number" style="\n                      margin: 0.5em 0em 0.5em 0em;\n                      font-weight: bold;\n                      background-color: #80808000;\n                      border-radius: 0.25em;\n                      border: 2px solid #00000021;\n                      width: 100%;\n                      font-size: 1.1em;\n                      padding: 0.5em 0.35em 0.5em 0.75em;\n                    " value="0" />\n                            <span style="\n                      position: relative;\n                      top: -2.7rem;\n                      right: -7rem;\n                      font-size: 1.21rem;\n                    ">%</span>\n                        </div>\n                    </div>\n\n                    <div id="preco-ativar" style="\n                  display: flex;\n                  align-items: center;\n                  justify-content: center;\n                  font-weight: 600;\n                  font-size: 1.35rem;\n                  width: 90%;\n                  height: 4.5rem;\n                  border-radius: 7px;\n                  padding: 1rem;\n                  margin: auto;\n                  margin-top: 0.1em;\n                  margin-bottom: 1rem;\n                  background:  var(--mfy-main);\n                  color: white;\n                  font-family: Montserrat, sans-serif;\n                  cursor: pointer;\n                  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px,\n                    rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;\n                ">\n                        Simular\n                    </div>\n\n                    <div id="alerta-form1" class="hdn" style="width: 90%; margin: auto">\n                        <img src="https://img.icons8.com/officexs/16/000000/spam.png" style="width: 0.77em" /><span\n                            style="color: red; font-size: 14px; vertical-align: top">\n                            Preencha os campos acima para simular.</span>\n                    </div>\n                </div>\n\n                <div style="display: none">\n                    <iframe id="quotation-iframe" src=""></iframe>\n                    <input type="checkbox" id="simular" style="margin-left: 0.5em" /><label for="simular" style="\n                  font-size: 0.7em;\n                  float: right;\n                  display: inline-block;\n                  max-width: 6em;\n                  position: relative;\n                  left: -0.7em;\n                  top: 1em;\n                " value="false">Simular com minha conta</label>\n                    <span style="margin: 0.5em 0em 0em 0.5em">Margem de lucro desejada:\n                    </span>\n                    <div class="andes-form-control" style="padding: 0em 0em 0em 0em; font-weight: bold">\n                        <input id="margem" type="number" class="" style="\n                    margin: 0.5em 0em 0.5em 0.35em;\n                    font-weight: bold;\n                    background-color: #80808000;\n                    border-radius: 0.35em;\n                    border: 1px solid #80808047;\n                    width: 7.7em;\n                    font-size: 1em;\n                    padding: 0.35em;\n                    width: 3.5em;\n                    font-family: Proxima Nova, -apple-system, Helvetica Neue,\n                      Helvetica, Roboto, Arial, sans-serif;\n                  " />\n                        % ou R$\n                        <input id="mrgbrl" type="number" class="" style="\n                    margin: 0.5em 0em 0.5em 0.35em;\n                    font-weight: bold;\n                    background-color: #80808000;\n                    border-radius: 0.35em;\n                    border: 1px solid #80808047;\n                    width: 7.7em;\n                    font-size: 1em;\n                    padding: 0.35em;\n                    width: 7em;\n                    font-family: Proxima Nova, -apple-system, Helvetica Neue,\n                      Helvetica, Roboto, Arial, sans-serif;\n                  " />\n                    </div>\n                    </div>\n                </div>\n            </div>\n        </div>`, spot2[0].insertAdjacentHTML("afterbegin", btn_preco), spot2[0].insertAdjacentHTML("beforeend", price_tool), function () {
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
const t = `\n      <div id="mfy-admarker" style="font-size: 0.95rem;display: inline-flex;border-radius: 1em;color: #5a5a5a;box-shadow: 0px 2px 11px -7px #000;padding: 0.2em 1.2em 0.2em 0.2em;align-items: center;width: fit-content;height: 1.5rem;" class="ui-pdp-review__amount">\n        <svg class="ui-pdp-icon ui-pdp-icon--protected ui-pdp-color--GRAY" style="width: 1rem; margin: -2px 7px;" xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14">\n          <use href="#warranty"></use>\n        </svg>\n        ${e}\n      </div>`;
let n = document.getElementsByClassName("ui-pdp-subtitle")[0], a = n?.parentElement;
a.firstElementChild == n ? (a.insertAdjacentHTML("afterbegin", t), a.setAttribute("style", "padding-top: 1rem;align-items: center;display: flex;gap: .5rem;")): n && n[0].insertAdjacentHTML("beforebegin", t)
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
    if (price_tool_fix =
    '<div id="price-tool" style="border: 1px solid #0000001a;border-radius: 0.7em;" class="ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical"><div id="etapa2" class="smooth hdn transp" style="width: inherit;float: left;transform: translate(-10px, 0px);"><div style="text-align: right;padding-left: 1.85em;width: 45%;">O valor <b>sugerido</b> para publicar seu anúncio é de:</div><h1 class="price-tag price-tag-fraction" style="width: 53%;overflow: hidden;float: right;margin-top: -1.5em;"><span style="margin-right: 0.15em;"><img src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png" height="16" width="20" style="margin-top: 0.2em;opacity: 35%;">R$</span><span id="valor_sugerido_reais">00</span><span id="valor_sugerido_centavos" style="font-size: 0.5em;font-weight: 100;">,00</span></h1><p style="float: right;margin: -1.35em 3.75em 0em 0em;font-size: 11px;" class="ui-pdp-review__amount"> *Sugestão com alíquota..</p><div class="detalhamento" id="detalhamento"><ul class="ui-pdp-review__amount"><li>Seu custo: <img alt="icon" src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png" height="11" style="padding: 0em 0.5em 0em 0em;"><span class="ui-pdp-price" id="detalhe-custo">R$&nbsp; 0,00</span></li><li>Impostos:<img alt="icon" src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png" height="11" style="padding: 0em 0.5em 0em 0.61em;"><span class="ui-pdp-price" id="detalhe-imposto">R$&nbsp;0</span></li><li style="transform: translate(4px, 0px);">Seu lucro: <img alt="icon" src="https://ci5.googleusercontent.com/proxy/t9hOuXHFrNPYlckwjpVbXLSlkxMtwzLYCTIi7PchhDo9m0lT7QD15EK5HN7R_R-xZrKcTgNktsim1qXR1LlKrEKQNa030zOY_S-rBf1-Eds9chp_rizwkWlvcacgOpH-Hj7BTbJJ-tG97e7u8JhDtjRMp8DP9Bwv9jtS-VYIrGWn=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/common/back.png" height="11" style="padding: 0em 0.2em;padding-right: 0.45em;"><span class="ui-pdp-price" id="detalhe-lucro">R$&nbsp; 0,00</span></li><li style="transform: translate(-7px, 0px);">Taxa do ML:<img alt="icon" src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png" height="11" style="padding-right: 0.2em;padding-left: 0.15em;"> <span class="ui-pdp-price" id="detalhe-taxa">R$&nbsp; 0,00</span></li><li style="transform: translate(9px, 0px);">Taxa Fixa:<img alt="icon" src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png" height="11" style="padding-right: 0.2em;/* padding-left: 0.15em; */"> <span class="ui-pdp-price" id="detalhe-taxafixa">R$&nbsp; 0,00</span></li><li style="transform: translate(30px, 0px);">Envio: <img alt="icon" src="https://ci3.googleusercontent.com/proxy/4AHE0GSzeLFc0tuceXt2Hib-rWVbcK8yqriCrBnrQFdt3LpCrH-NA3nyDKu-IO-65xO2yjlS7rsjGiJWV6QunadzFZlJPWqeb2Shj_fYgwagdLoTOAljMen83VI1111111eloEUOdeZcR4Su7DrJRWooeRNOF5nZ2fJv2BE06zEE2uKHkiVrr1vOvtY78kR28=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-mail.png" height="11" style="padding-right: 0.3em;transform: translate(-2px, 0px);"><span class="ui-pdp-price" id="detalhe-envio">R$&nbsp; 0,00</span></li></ul></div><a id="vermais" style="float: right;margin: 1em 7em 0em 0em;">Ver mais detalhes</a><p id="eareset" style="float: right;margin: 1em 8.35em 0em 0em;font-weight: 900;color: #aeaeae;font-size: 0.77em;text-align: center;">Problemas no cálculo?<br>Aperte Ctrl+Shift+R</p><br> <a id="refazer" style="padding: 1em;border-radius: 0.7em;float: right;margin: 1em 5.5em 0em 0em;" class="andes-button--quiet">↻ Refazer simulação</a></div><div style="float:left;padding: 0em 1em;" id="etapa1" class="smooth"> <img src="https://img.icons8.com/cotton/64/000000/profit-report.png" style="float: left;width: 2.5em;margin: 0em 0.53em 0em 0em;"><h3 class="ui-pdp-variations__selected-label" style="float: left;">Precificador Escalada Ecom</h3><br><h4 class="ui-pdp-color--GRAY ui-pdp-media__text" style="padding-left: 3.5em;margin-top: 0.5em;">Simule um preço de venda a partir deste anúncio com sua margem.</h4><br><div style="line-height: 1em;"> <span style="margin: 0.5em 0em 0em 0.5em;">Custo do seu produto: </span><div class="andes-form-control" style="padding: 0em 0em 0em 0.7em;font-weight: bold;"> R$:<input id="custo" type="number" class="" style="margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 5.7em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><div id="preco-ativar" class="andes-button andes-button--quiet" style="float: right;margin-top: 0.35em;"><img id="preco-img" style="width: 1.5em;position: relative;top: 0.4em;left: -0.1em;" src="https://img.icons8.com/ios-glyphs/30/ffffff/estimate.png"> Simular</div></div><div><span style="margin: 0.5em 0em 0em 0.5em;">Margem de lucro desejada: </span><div class="andes-form-control" style="padding: 0em 0em 0em 0em;font-weight: bold;"> <input id="margem" type="number" class="" style="margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 3.5em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"> % ou R$ <input id="mrgbrl" type="number" class="" style="margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 7em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"> <br> <span style=" font-size: 0.77em; position: relative; margin: 0em 0em 0em 0.5em; width: 6em; display: inline-block; text-align: right; top: 0.5em; ">Sua alíquota de imposto</span><input id="aliq" type="number" class="" style="margin: 0.5em 0em 0.5em 0.35em;font-weight: bold;background-color: #80808000;border-radius: 0.35em;border: 1px solid #80808047;width: 7.7em;font-size: 1em;padding: 0.35em;width: 3.1em;font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;" value="0"> % <input type="checkbox" id="simular" style="margin-left: 0.5em;"><label for="simular" style="font-size: 0.7em;float: right;display: inline-block;max-width: 6em;position: relative;left: -0.7em;top: 1em;" value="false">Simular com minha conta</label><div id="alerta-form1" class="hdn"><img src="https://img.icons8.com/officexs/16/000000/spam.png" style="width: 0.77em;"><span style="color:red;font-size: 14px;vertical-align: top;"> Preencha os campos acima para simular.</span></div></div></div></div></div></div>',
    btn_preco_fix =
    '<div id="preco-btn" class="andes-button andes-button--loud mfy-main-bg  pricebtn" style="width: 3em;height: 3em;margin-top: 1em;margin-right: 0.5em;padding:0.5em 0.1em 1em 0.1em;border-radius: 3.5em;position: relative;z-index: 100;"><img id="preco-img" style="width:50%;" src="https://img.icons8.com/ios-glyphs/30/ffffff/estimate.png"/></div>',
  iscatalog
) {
      variationsbtn = document.getElementsByClassName("ui-pdp-variations--thumbnail"), btn_preco = btn_preco_fix, spot2 = document.getElementsByClassName("ui-pdp-price__subtitles");
      let e = document.getElementsByClassName("ui-pdp-price__main-container");
      if (!spot2[0] && e.length < 2) {
        let e = document.createElement("div");
        e.innerHTML = btn_preco_fix;
        let t = e.firstElementChild;
        t.style.margin = "0rem -1rem 3rem 0", t.style.float = "left", spot2 = document.getElementsByClassName("ui-pdp-price__main-container"), btn_preco = `${t.outerHTML}`
      }
      else if (e.length > 2) {
        let e = document.createElement("div");
        e.innerHTML = btn_preco_fix;
        let t = e.firstElementChild;
        t.style.margin = "0rem -1rem 3rem 0", spot2 = document.getElementsByClassName("ui-pdp-container__row--price"), btn_preco = `${t.outerHTML}`
      }
      for (let e = 0;
      e < variationsbtn.length;
      e++) variationsbtn[e].addEventListener("click", (function () {
        let e = this, t = e.getAttribute("href");
        e.setAttribute("href", window.location.href.split("br/")[0] + "br" + t), window.location.href = e.getAttribute("href")
      }
      ))
    }
    function o() {
      if (null != verif && "pro" == verif) {
        eaSince = '<div style="font-size: 0.95rem;font-weight: 700;display: inline-flex;border-radius: 1em;color: rgb(90, 90, 90);box-shadow: rgb(0, 0, 0) 0px 2px 11px -7px;padding: 0.35em 1em;position: relative;transition: 0.35s;min-width: fit-content;cursor:default" id="easince"><span style=" margin-top: 0.2em;">Criado há: ' + (isNaN(dias) ? "?": dias) + ' dia(s)</span><span style="position: absolute;top: 1.75em;font-size: 0.92em;font-weight: 200;opacity: 0;transition: all 0.35s;">(' + (data_br ?? "--/--/----") + ")</span></div>", btn = !alert_media_vendas && dias > 30 ? `<div style="display: flex;align-items: center;justify-content: start;gap: .5rem;">\n            ${eaSince}\n              <span id="mediabtn" class="andes-button--loud mfy-main-bg  andes-button" style="font-size: 12px!important;display: flex;padding-bottom: 1em;position: relative;z-index: 10;border-radius:2rem;cursor:default">\n                Média: ${iscatalog&&0==media_vendas?"-":media_vendas} vendas/mês\n              </span>\n              </div>\n              <img style="float:left;margin-right:0.35em;width:28%;margin-top: 0.45em;" src="https://i.ibb.co/Y8mQ2MT/metrifylogo.png">`: `<div style="display: flex;align-items: center;justify-content: start;gap: .5rem;">\n            ${eaSince}\n              <div id="mediabtn" class="andes-button--loud mfy-main-bg  andes-button" style="font-size: 12px!important;display: flex;padding-bottom: 1em;position: relative;z-index: 10;border-radius:2rem;gap: 0.25rem;">\n                Média:  <div style="min-width: fit-content;font-size: 1.2rem;">${iscatalog&&0==media_vendas?"-":media_vendas}</div> <span style="font-size: .9rem;">vendas/mês</span>\n              </div>\n              <div class="easalesavg-alert" style="display: inline-flex;background: var(--mfy-main);position: relative;z-index: 11;height: 1.75em;border-radius: 100%;padding: 5px;margin-left: -0.5rem;">\n                <img src="https://img.icons8.com/material-outlined/24/ffffff/clock-alert.png">\n              </div>\n              </div>\n              <img style="float:left;margin-right:0.35em;width:28%;margin-top: 0.45em;" src="https://i.ibb.co/Y8mQ2MT/metrifylogo.png"> `, visits = '<span>? Visitas totais <span class="andes-button--loud mfy-main-bg  andes-button" style="margin-left: 0.5em;margin-top: 0.35em;font-size:14px!important;display: inherit;padding: 0.1em 0.4em;"> Conversão de <strong>?%</strong></span></span><br><span class="ui-pdp-subtitle" id="vendaporvisitas" style="position: relative;top: -0.86em;">Vende a cada x Visitas</span>';
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
        const b = h.map((e => dayjs(e).endOf("month").format("YYYY-MM-DD"))), v = [...h.map(((e, t) => `${mfyProxyLessRestricted}https://api.mercadolibre.com/items/visits?ids=${item_ID}&date_from=${e}&date_to=${b[t]}`))], x = [];
        function o(e, t) {
          let n = document.getElementById("eagraph"), a = document.getElementById("salesestimatebtn");
          if (n) {
            n.innerHTML = '<span style="font-size: 1.5em;margin-left: 0.35em;font-weight: 700;color: #333;">Análise de Interesse</span> <br> <span style="color: var(--mfy-main);font-size: 1.35em;position: relative;top: -0.31em;margin-left: 0.35em;">dos últimos 6 meses</span><br><div id="eachart" style="width:100%;position: relative;top: -1em;left: -0.7em;"></div><button id="salesestimatebtn" class="andes-button--loud mfy-main-bg " style="margin-top: -1em;font-size: 1.1rem;width: 100%;font-weight: 800;padding: 7px 11px;border-radius: 7px;">Estimativa de vendas</button>', n.style.top = "2rem", document.getElementById("salesestimatebtn").remove(), n.insertAdjacentElement("beforeend", a), document.getElementById("salesestimatebtn").style.display = "none", document.getElementById("eachart").style.marginBottom = "-1.5em";
            const e = document.getElementById("eagraph");
            e.style.top = "1.5rem", e.style.padding = "2em 1em", iscatalog && (n.style.marginTop = "-1.65em", n.style.right = "0", n.style.marginBottom = "-5rem")
          }
          else document.getElementById("eadivider").insertAdjacentHTML("beforebegin", '<div class="hdn2 transp smooth" id="eagraph"\n    style="z-index: 111;background-color:#fff;height: fit-content;position: relative;margin-top:-4.35em;font-weight: bolder;font-size: 0.7em;text-align: left;padding: 1em;border-top: 3px solid var(--mfy-main);border-radius: 6px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 0 0 / 21%);">\n    <div style="display: flex; justify-content: space-between;">\n        <div>\n            <span style="font-size: 1.5em;margin-left: 0.35em;font-weight: 700;color: #333;">Análise de\n                Interesse</span>\n            <br>\n            <span\n                style="color: var(--mfy-main);font-size: 1.35em;position: relative;top: -0.31em;margin-left: 0.35em;">dos\n                últimos 6 meses</span>\n        </div>\n    </div>\n    <br>\n    <div id="eachart" style="width:308px!important;position: relative;top: -1em;left: -0.7em;"></div><button\n        id="salesestimatebtn" class="andes-button--loud mfy-main-bg "\n        style="margin-top: -1em;font-size: 1.1rem;width: 100%;font-weight: 800;padding: 7px 11px;border-radius: 7px;">Estimativa\n        de vendas</button>\n</div>');
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
                    k = e.innerHTML, spinLoaderManager.replaceContent(e), e.style.backgroundColor = "#ebebeb", x.length = v.length, await Promise.all(v.map(((e, t) => fetch(e, eaInit).then((e => e.json())).then((e => {
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
        function d(e) {
          visitastotais = e[Object.keys(e)[0]], conversaototal = isNaN(vendas / visitastotais) ? 0: vendas / visitastotais, visitaporvenda = visitastotais / (vendas > 0 ? vendas: 1), visitaporvenda_fix = isNaN(visitaporvenda) ? "?": parseFloat(visitaporvenda).toFixed(0), visitasparavender = parseFloat(visitaporvenda_fix);
          const t = function ({
            isCatalog: e,
            totalVisits: t,
            conversion: n,
            visitsPerSale: a,
            hasSales: i
          }
          ) {
            return e ? `\n                <div style="display:flex;margin: 0rem 0 5rem 0;gap: 1rem;">\n                <div id="eabtn-chart" style="border-radius: 2rem; width: 2.35em; padding: 0.14em 0.5em; height: 2.35em; display: inline-flex; position: relative; z-index: 10; transition: 0.35s; align-items: center;" class="andes-button--loud mfy-main-bg andes-button">\n                  <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width: 1.35em; margin: auto;">\n                </div>\n                <div style="display: flex;gap: 1rem;min-width: fit-content;justify-content: space-between;align-items: anchor-center;">\n                  <div style="display: flex;flex-direction: column;min-width: fit-content;">\n                    ${isNaN(t)?"-":t} Visitas totais\n                    <div class="mfy-main-bg" style="position:relative;font-size:14px!important;min-width: fit-content;padding: 0.2rem 1em;display: flex;gap: .25rem;color: #fff;border-radius: 1rem;">\n                  <span style="min-width: fit-content;">Conversão:</span> <span style="font-weight: 700;">${isNaN(n)?"-":n}%</span>\n                </div>\n                  </div>\n                   <div id="vendaporvisitas" style="position: relative;text-align: end;font-size: 1.1rem;margin-left: 1rem;${i?"display: block;":"display: none;"}">\n                   Vende a cada:<br>\n                   <span style="font-weight: 800;color: var(--mfy-main);">${isNaN(a)?"-":a} Visitas</span>\n                 </div>\n                </div>\n              </div>\n\n                <div id="eadivider" style="background-color: transparent;height: 1px;width: 22.7em;position: relative;top: -0.75em;margin-bottom: -3em;"></div>`: `\n            <div style="display:flex;margin: 0rem 0 1.25rem 0;gap: 1rem;">\n              <div id="eabtn-chart" style="border-radius: 2rem; width: 2.35em; padding: 0.14em 0.5em; height: 2.35em; display: inline-flex; position: relative; z-index: 10; transition: 0.35s; align-items: center;" class="andes-button--loud mfy-main-bg andes-button">\n                <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width: 1.35em; margin: auto;">\n                <div id="eabtn-chart-tooltip" style="min-width: 18rem; position:absolute; display: none; flex-direction: column; text-align: start; line-height: 1; font-size: 1rem; color:var(--mfy-main); padding: 1rem 0rem 1rem 2rem; opacity: 0;background-color: rgb(235, 235, 235); border-radius: 2rem;">\n                        Anúncio com menos de 30 dias,<span style="opacity: .5;">gráfico sem dados suficientes.</span>\n                      </div>\n              </div>\n              <div style="display: flex;gap: 1rem;min-width: fit-content;justify-content: space-between;">\n              <div style="display: flex; flex-direction: column;">\n                ${t} Visitas totais \n                <div class="mfy-main-bg" style="position:relative;font-size:14px!important;min-width: fit-content;padding: 0.2rem 1em;display: flex;gap: .25rem;color: #fff;border-radius: 1rem;">\n                  <span style="min-width: fit-content;">Conversão:</span> <span style="font-weight: 700;">${n}%</span>\n                </div>\n              </div>\n              <div id="vendaporvisitas" style="position: relative;text-align: end;${i?"display: block;":"display: none;"}">\n                   Vende a cada:<br>\n                   <span style="font-size: 1.21em;font-weight: 800;color: var(--mfy-main);">${i?a:"-"} Visitas</span>\n                 </div></div>\n              </div>\n              \n              <div id="eadivider" style="background-color: #00000014;height: 1px;width: 22.7em;margin: 0rem 0rem 1rem 0rem;/* position: relative; */top: -2.75em;/* margin-bottom: -3em; */"></div>\n              `
          }
          ({
            isCatalog: iscatalog,
            totalVisits: Number(visitastotais) ?? "-",
            conversion: parseFloat(100 * conversaototal).toFixed(1) ?? "-",
            visitsPerSale: visitasparavender,
            hasSales: vendas > 0
          }
          ), n = Date.now() - L, a = Math.max(0, 800 - n);
          setTimeout((() => {
            const e = document.getElementById("visits-component");
            e && (e.outerHTML = t, setTimeout(l, 250))
          }
          ), a)
        }
        document.dispatchEvent(new CustomEvent("GetVisitsData", {
          detail: {
            itemId: item_ID
          }
        }
        ));
        const T = e => {
          const {
            itemId: t, visitsData: n
          }
          = e.detail;
          t === item_ID && n ? d(n): fetch(`${mfyProxyLessRestricted}https://api.mercadolibre.com/visits/items?ids=${item_ID}`, eaInit).then((e => e.json())).then((e => {
            d(e), document.dispatchEvent(new CustomEvent("StoreVisitsData", {
              detail: {
                itemId: item_ID,
                visitsData: e
              }
            }
            ))
          }
          )).catch ((function (e) {
            const t = document.getElementById("visits-component");
            t && (t.innerHTML = '\n                      <div style="opacity: 0.5;">\n                        <span>-</span>\n                      </div>')
          }
          )), document.removeEventListener("VisitsDataResponse", T)
        }
        ;
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
            ) + "</strong> de receita </span></div>", spot2[0].insertAdjacentHTML("beforeend", mlfee), spot2[0].insertAdjacentHTML("beforeend", mlpft)
          }
          taxa_mlb = e.sale_fee_amount, preco_Local < cota_minima_MLB ? (t = taxa_cota, n()): (t = 0, n())
        }
        document.addEventListener("VisitsDataResponse", T), function () {
          spot[0].parentElement.setAttribute("style", "flex-direction: column;"), spot[0].insertAdjacentHTML("beforebegin", btn);
          let e = document.getElementById("easince");
          e && (e.addEventListener("mouseover", (function () {
            this.style.padding = "0.35em 1em 1.35em 1em", this.lastChild.style.opacity = "100%"
          }
          )), e.addEventListener("mouseout", (function () {
            this.style.padding = "0.35em 1em 0.35em 1em", this.lastChild.style.opacity = "0%"
          }
          )));
          let t = document.getElementsByClassName("easalesavg-alert")[0];
          if (t && (t.addEventListener("mouseover", (function () {
            let e = document.getElementById("eamediapop");
            if (null == e) {
              let e = '<div id="eamediapop" class="ui-pdp-buybox" style="pointer-events: none;box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.35) 1px 10px 4px -7px;position: absolute;top: 12rem;padding: 1em;font-size: 14px;font-weight: 400;color: rgb(255, 255, 255);background-color: var(--mfy-main);z-index: 11;display: block;"><b>Anúncio com menos de 30 dias.</b> (Média mensal foi estimada apenas a partir das vendas do primeiro mês).</div>';
              this.insertAdjacentHTML("afterend", e)
            }
            else e.style.display = "block"
          }
          )), t.addEventListener("mouseout", (function () {
            document.getElementById("eamediapop").style.display = "none"
          }
          ))), "anuncio" == paginaAtual && "pro" == verif) {
            let e = document.getElementsByClassName("ui-pdp-gallery__wrapper"), t = '<div class="eadownloadicon"> <img src="https://img.icons8.com/fluency-systems-regular/48/ffffff/file-download.png" style=" width: 100%;"></div>', a = '<span class="eagetallimgs ui-pdp-gallery__wrapper"><label class="ui-pdp-gallery__label"><div class="ui-pdp-thumbnail ui-pdp-gallery__thumbnail"><div class="eagetallimgs-inside ui-pdp-thumbnail__picture" style="background: var(--mfy-main);padding: 1em;"><img width="44" height="44" src="https://img.icons8.com/material-rounded/24/ffffff/download-2.png" style=" position: relative; top: -0.5em;"><span style=" color: #fff; position: relative; top: -1em; left: -0.21em; font-size: 11px;">Todas</span></div></div></label></span>', i = document.getElementsByClassName("ui-pdp-gallery__column")[0], s = [];
            for (let n = 0;
            n < e.length;
            n++) if (void 0 !== e[n].getElementsByTagName("img")[0]) {
              let a = `${e[n].getElementsByTagName("img")[0].getAttribute("src").replace("_Q","_NQ").replace("NP_","NP_2X_").replace("-R","-F").replace(".webp",".jpg")}`;
              s.push(a), e[n].getElementsByTagName("img")[0].parentNode.parentNode.insertAdjacentHTML("afterend", t)
            }
            i.insertAdjacentHTML("afterbegin", a);
            let o = document.getElementsByClassName("eagetallimgs")[0], r = document.getElementsByClassName("eadownloadicon");
            async function n(e, t) {
              const n = await fetch(e), a = await n.blob(), i = URL.createObjectURL(a), s = document.createElement("a");
              s.href = i, s.download = t, document.body.appendChild(s), s.click(), document.body.removeChild(s)
            }
            if (void 0 !== r) for (let e = 0;
            e < r.length;
            e++) r[e].addEventListener("click", (function () {
              n(s[e], "imagem" + (e + 1))
            }
            ));
            void 0 !== o && o.addEventListener("click", (function () {
              for (let e = 0;
              e < s.length;
              e++) n(s[e], "imagem" + (e + 1))
            }
            ))
          }
        }
        (), t(), async function () {
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
            n === categoria_Local && a && a.listing ? m(a.listing): fetch(`${mfyProxyLessRestricted}https://api.mercadolibre.com/sites/MLB/listing_prices?price=${preco_Local}&category_id=${categoria_Local}&listing_type_id=${tipo_anuncio}`, eaInit).then((e => e.json())).then((e => {
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
            spot0[0].insertAdjacentHTML("afterbegin", function () {
              const e = "background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite;";
              return `\n              <div id="visits-component">\n                <style>\n                  @keyframes loading {\n                    0% { background-position: 200% 0; }\n                    100% { background-position: -200% 0; }\n                  }\n                  .skeleton-text {\n                    ${e}\n                    border-radius: 4px;\n                    height: 1em;\n                    display: inline-block;\n                  }\n                  .skeleton-pill {\n                    ${e}\n                    border-radius: 12px;\n                    height: 1.2em;\n                    display: inline-block;\n                  }\n                </style>\n                ${iscatalog?'\n                <div style="display:flex">\n                    <div id="eabtn-chart" style="border-radius: 2rem; width: 2.35em; padding: 0.14em 0.5em; height: 2.35em; display: inline-flex; position: relative; z-index: 10; transition: 0.35s; align-items: center;" class="andes-button--loud mfy-main-bg andes-button">\n                    <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width: 1.35em; margin: auto;">\n                      <div id="eabtn-chart-tooltip" style="width: fit-content; display: none; flex-direction: column; text-align: start; line-height: 1; font-size: 1rem; color:var(--mfy-main); padding: 1rem; opacity: 0;">\n                        Anúncio com menos de 30 dias,<span style="opacity: .5;">gráfico sem dados suficientes.</span>\n                  </div>\n                    </div>\n                    <span style="margin-left: 3.1em;position: absolute;top: 0.45em;font-weight: 400;"><span class="skeleton-text" style="width: 80px;"></span> Visitas totais</span>\n                  <div id="eadivider"></div>\n                </div>\n                ':'\n                  <div style="display:flex;margin: 0rem 0 1.25rem 0;gap: 1rem;">\n                    <div id="eabtn-chart" style="border-radius: 2rem; width: 2.35em; padding: 0.14em 0.5em; height: 2.35em; display: inline-flex; position: relative; z-index: 10; transition: 0.35s; align-items: center;" class="andes-button--loud mfy-main-bg andes-button">\n                      <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width: 1.35em; margin: auto;">\n                      <div id="eabtn-chart-tooltip" style="width: fit-content; display: none; flex-direction: column; text-align: start; line-height: 1; font-size: 1rem; color:var(--mfy-main); padding: 1rem; opacity: 0;">\n                        Anúncio com menos de 30 dias,<span style="opacity: .5;">gráfico sem dados suficientes.</span>\n                      </div>\n                    </div>\n                    <div style="display: flex;gap: 1rem;min-width: fit-content;justify-content: space-between;">\n                      <div style="display: flex; flex-direction: column;">\n                        <div style="display: flex;gap: 0.5rem;">\n                          <span class="skeleton-text" style="width: 25px;"></span> \n                          <span>Visitas totais</span>\n                        </div>\n                        <div class="mfy-main-bg" style="position:relative;font-size:14px!important;min-width: fit-content;padding: 0.2rem 1em;display: flex;gap: .25rem;color: #fff;border-radius: 1rem;">\n                          <span style="min-width: fit-content;">Conversão:</span> <span style="opacity: 0.25;font-weight: 700;"><span class="skeleton-text" style="width: 30px;"></span>%</span>\n                        </div>\n                      </div>\n                      <div id="vendaporvisitas" style="position: relative;text-align: end;">\n                        Vende a cada:<br>\n                        <span class="skeleton-text" style="width: 80px;"></span>\n                      </div>\n                    </div>\n                  </div>\n                  <div id="eadivider" style="background-color: #00000014;height: 1px;width: 22.7em;margin: 0rem 0rem 1rem 0rem;"></div>\n                '}\n              </div>`
            }
            ());
            let e = spot0[0].parentElement;
            e.parentElement.firstElementChild
          }
        }
        ), 200)
      }
      else btn = "", spot[0].insertAdjacentHTML("afterbegin", btn)
    }
    spot3 = document.getElementsByClassName("ui-pdp-title"), reflow = document.getElementsByClassName("ui-pdp-header__title-container"), maisFunc = document.getElementById("plusf"), document.getElementsByClassName("ui-pdp-header")[0].parentNode.parentNode.setAttribute("style", "max-width:352px;margin:auto;margin-right:1em;"), iscatalog ? document.getElementsByClassName("ui-pdp-bookmark")[0]?.setAttribute("style", "transform: scale(0.77);top: 1.21em!important;position: absolute;left: 22.5em!important;"): document.getElementsByClassName("ui-pdp-bookmark")[0]?.setAttribute("style", "transform: scale(0.77);top: 1.21em!important;position: absolute;left: 21.5em!important;"), dataLayer && (condicao_produto = dataLayer[0]?.condition, preco_Local = dataLayer[0]?.localItemPrice, categoria_Local = dataLayer[0]?.categoryId, tipo_anuncio = dataLayer[0]?.listingType ?? document.documentElement.innerHTML.split("listing_type_id")[1]?.split('"')[2], comprador = dataLayer[0]?.buyerId, vendedor = dataLayer[0]?.sellerId, dLayer = dataLayer[0]?.startTime, item_ID = dataLayer[0]?.itemId ?? dataLayer[0].catalogProductId);
    let d = document.getElementsByClassName("ui-pdp-header__subtitle")[0].innerHTML.split(" | ")[1]?.split(" vendidos")[0]?.trim();
    d?.endsWith("mil") && (d = d.replace("mil", ""), d = 1e3 * parseFloat(d)), vendas = 0 == vendas.length ? d: vendas, dLayer && "" == data_br ? (data_br = dayjs(dLayer).locale("pt-br").format("DD/MM/YYYY"), dataMilisec = Date.parse(dLayer), eadiff = eanow - dataMilisec, dias = Math.round(eadiff / (8.64 * Math.pow(10, 7))), media_vendas = 0 == dias || isNaN(vendas) ? "Indisponível (0 dias)": Math.round(vendas / (dias / 30)), o()): o()
  }
}
()
}
function storeFresh(e) {
  AuthDataStore("ealocalrst", e), checkrefresh(!0)
}
async function findfreshAuth(e) {
  await fetch(mfyEndpoints.auth, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
    ,
    body: JSON.stringify({
      email: `${usuario_logado}`,
      id: `${uid}`
    }
    )
  }
  ).then((e => e.json())).then((e => {
    storeFresh(e)
  }
  )).catch ((e => {}))
}
function appendToken(e) {
  eaHeaders.append("Authorization", " Bearer " + e), eadataStore("local_usertkn", e, TTL1)
}
function dataCleanup() {
  if ("anuncio" === paginaAtual) {
    let e = document.getElementsByTagName("mfyloader");
    if (e) for (loader of e) loader.remove()
  }
  getMLinfo()
}
var tried = !1;
async function validateToken() {
  let e = eadataRetrieve("local_usertkn");
  async function t() {
    let e = parseJwt(mfy_userdata?.token);
    if (0 == tried) {
      var t = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      }
      ;
      fetch("https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=323521671107951&client_secret=FbKILwMpPIa89q6lYd59yA5wJrPK2noN&refresh_token=" + e.token, t).then((e => e.json())).then((e => {
        if (400 != e.status) {
          let t = e.access_token;
          eaHeaders.append("Authorization", " Bearer " + t), eadataStore("local_usertkn", t, TTL1), window.location.reload(!0)
        }
        else tried = !0, validateToken()
      }
      )).catch ((e => {}))
    }
    else askPermissions(usuario_logado)
  }
  if (null == e || null == e) t();
  else {
    var n = new Headers;
    if (n.append("pragma", "no-cache"), n.append("cache-control", "no-cache"), n.append("Authorization", " Bearer " + e.toString()), AuthDataCheck("remote_user"), await new Promise((e => setTimeout(e, 500))), mfy_userdata?.remote?.email != usuario_logado) try {
      const n = await fetchUserMeData(e, !1);
      if (n.success && n.data) {
        const a = n.data;
        AuthDataStore("remote_user", {
          email: a.email,
          id: a.id
        }
        ), a.email == usuario_logado ? (eaHeaders.append("Authorization", " Bearer " + e), dataCleanup()): t(), n.fromCache
      }
      else t()
    }
    catch (e) {
      t()
    }
    else eaHeaders.append("Authorization", " Bearer " + e), dataCleanup()
  }
}
function findTier(e) {
  verif = e.tier, verif = "pro", validateToken()
}
var extdataVerified = !1, userdataOk = !0, dataTrial = 0;
async function registerNewAcc() {
  null == uid && null == uid && (uid = `${dataLayer?.at(0)?.buyerId?dataLayer[0].buyerId:melidata_namespace?.actual_track.user.user_id?melidata_namespace?.actual_track.user.user_id:preLoadedState?.user?.id}`), registeringAcc = !0, await fetch(mfyEndpoints.register, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
    ,
    body: JSON.stringify({
      email: `${usuario_logado}`,
      id: uid
    }
    )
  }
  ).then((e => e.json())).then((e => window ? window.location.reload(): null)).catch ((e => {}))
}
async function getnstoreData(e) {
  if (null != usuario_logado) if (extdataVerified = !0, null == uid && null == uid && (uid = `${dataLayer?.at(0)?.buyerId?dataLayer[0].buyerId:melidata_namespace?.actual_track.user.user_id?melidata_namespace?.actual_track.user.user_id:preLoadedState?.user?.id}`), await fetch(mfyEndpoints.auth, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
    ,
    body: JSON.stringify({
      email: `${usuario_logado}`,
      id: uid
    }
    )
  }
  ).then((e => e.json())).then((e => AuthDataStore("ealocalrst", e))).catch ((e => {})), "userverif" == e && window.location.reload(), 1 == e) if (++dataTrial > 1) {
    userdataOk = !1;
    let e = document.getElementsByTagName("mfyloader");
    if (e) for (loader of e) loader.remove();
    setTimeout((() => {
      registeringAcc || registerNewAcc()
    }
    ), 1e3);
    spot0 = document.getElementsByClassName("ui-pdp-header");
    document.getElementById("acc-register-btn")
  }
  else verifyData("getnstoreData-try2");
  else verifyData("getnstoreData")
}
async function verifyData(e) {
  if (AuthDataRetrieve("ealocalrst"), await new Promise((e => setTimeout(e, 1e3))), mfy_userdata || eadataRetrieve("local_usertkn")) if (null == mfy_userdata?.token) if (extdataVerified) {
    userdataOk = !1;
    let e = document.getElementsByClassName("eadropdown")[0], t = '<div style=" position: absolute; background: red; width: 1em; text-align: center; border-radius: 2em; color: #fff; font-size: 0.75em; font-weight: bolder; padding: 0em 0.85em 0em 0.6em; top: 7.5em; left: 81.5em; z-index: 14;" class="eadropalert">!</div>';
    userdataOk = !1, e && e.insertAdjacentHTML("beforebegin", t)
  }
  else getnstoreData();
  else {
    findTier(parseJwt(mfy_userdata?.token))
  }
  else getnstoreData(!0)
}
const kFormatter = e => {
  if (Math.abs(e) > 999) {
    const t = Math.sign(e), n = (Math.abs(e) / 1e3).toFixed(1);
    return t * parseFloat(n) + "k"
  }
  return e.toString()
}
;
function runOnList() {
  if ("lista" === paginaAtual) {
    preLoadedState = "object" != typeof window.__PRELOADED_STATE__ || null === window.__PRELOADED_STATE__ || window.__PRELOADED_STATE__.tagName ? altPreloadedState?.pageState: window.__PRELOADED_STATE__, listView = preLoadedState?.initialState.analytics_track.pageLayout;
    let d = document.getElementsByClassName("ui-search-results")[0] ?? document.getElementsByClassName("ui-search-layout--grid__grid__layout--grid")[0], m = d.getElementsByTagName("ol")[0] ?? d.getElementsByClassName("ui-search-layout--grid__grid")[0], c = d.querySelectorAll("li");
    var e = preLoadedState.initialState.results.filter((e => e.polycard)).map((e => e.polycard)).length > 0 ? preLoadedState.initialState.results.filter((e => e.polycard)).map((e => e.polycard)): preLoadedState.initialState.results.filter((e => e.trends_categories?.polycards))[0].trends_categories.polycards;
    c = Array.from(c), c = c.filter((e => e.classList.contains("ui-search-layout__item")));
    let p = c.length, g = p;
    var t = p;
    let f = '<div id="ealistrequest" style="transition: all 0.25s;display: flex;align-items: center;justify-content: center;background: rgb(60,115,255);background: linear-gradient( #3483fa 92%,  var(--mfy-main) 92%);padding: 0.75em 2em; margin: 0rem 0rem 1rem 0rem; border-radius: 0.5em;width: fit-content;color: #fff;font-size: 0.77em;cursor: pointer;box-shadow: rgb(0 0 0 / 10%) 0px 11px 6px -7px, rgb(0 0 0 / 13%) 0px 4px 3px -3px;"><img src="https://img.icons8.com/pastel-glyph/64/ffffff/analytics.png" style="width: 21px;margin-right: 0.75em;"><span style="font-weight: 500;font-size: 1.11em;letter-spacing: 0.01em;margin: 0.35em;font-family: Montserrat;">Ativar Métricas de Busca </span></div>';
    let u = `\n    <div class="mfy-ad-listinfo_widget" style="display: flex;align-items: center;justify-content: space-between;border-radius: 5rem;margin: 0rem 1rem;position: relative; z-index:999">\n    <div style="display: flex; gap: .5rem;">\n    <div style="\n    background-color: var(--mfy-main);\n    color: #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: .25rem .75rem;\n    border-radius: 5rem;\n    font-size: 1.1rem;\n    font-weight: 700;\n    letter-spacing: 0.02rem;\n    gap: .25rem;\n" class="imageset"><img width="16" height="16" src="https://img.icons8.com/material-outlined/ffffff/24/stack-of-photos--v1.png" alt="stack-of-photos--v1">10</div>\n<div style="\n    background-color: #fff;\n    color: var(--mfy-main);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: .2rem .5rem;\n    border-radius: 5rem;\n    font-size: 1rem;\n    font-weight: 900;\n    letter-spacing: 0.02rem;\n    border: 1px solid #ebebeb;\n    box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;\n" class="reviews"><img width="18" height="18" src="https://img.icons8.com/sf-ultralight-filled/${mfyMainColorNumbers}/25/star.png" alt="star">4.5</div>\n<div style="\n    background-color: #fff;\n    color: var(--mfy-main);\n    display: flex;\n    gap: .25rem;\n    align-items: center;\n    justify-content: center;\n    padding: .2rem .5rem;\n    border-radius: 5rem;\n    font-size: 1rem;\n    font-weight: 900;\n    letter-spacing: 0.02rem;\n    border: 1px solid #ebebeb;\n    box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;\n" class="local"><img width="16" height="16" src="https://img.icons8.com/material-outlined/${mfyMainColorNumbers}/24/visit.png" alt="box--v1">0un</div>\n</div>\n\n${'<div style="\n      background-color: #fff159;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: .35rem 1rem;\n      border-radius: 1rem 0 0 1rem;\n      margin-right: -1rem;\n      font-size: 1.1rem;\n      font-weight: 900;\n      letter-spacing: 0.02rem;\n      gap: 1rem;\n      box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;\n      position: absolute;\n      top: -1000%;\n      right: 0;\n      " class="iscatalog">Catálogo</div>'}\n    \n</div>`;
    c && "pro" == verif && (m.insertAdjacentHTML("beforebegin", f), function () {
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
            e && e.setAttribute("style", "background-color: #eaeaea;color: var(--mfy-dark);border-radius: 0.5em;padding: 0.25em 0.75em;font-size: 0.86em;font-weight: 800;letter-spacing: 0.01em;margin-left: 0.5em;")
          }
          if ("listing" == listView) {
            y.style.position = "absolute", y.style.bottom = "7%";
            let e = y.querySelector(".iscatalog");
            e && (e.style.borderRadius = "0 1rem 1rem 0", e.style.position = "absolute", e.style.top = "-3.5rem", e.style.left = "-2.7rem", e.style.right = "auto")
          }
          i.reviews ? y.querySelector(".reviews").innerHTML = y.querySelector(".reviews").getElementsByTagName("img")[0].outerHTML + `${i.reviews}`: y.querySelector(".reviews").remove(), y.querySelector(".imageset") && (y.querySelector(".imageset").innerHTML = y.querySelector(".imageset").getElementsByTagName("img")[0].outerHTML + `${i.imageset}`), i.local && (y.querySelector(".local").innerHTML = y.querySelector(".local").getElementsByTagName("img")[0].outerHTML + `${i.local}`), c[t] && (f = c[t].querySelector(".ui-search-result__image") || c[t].querySelector(".poly-card__portada")), f?.insertAdjacentElement("afterend", y)
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
  t.removeEventListener("click", n), a.style.margin = "0rem 0rem 1rem 0rem", a.outerHTML = `<div id="ealistrequest" style=" margin: 0.35rem 0.35rem 1rem 0.35rem; font-weight: 500;font-size: 1em;letter-spacing: 0.01em;font-family: Montserrat;transition: all 0.25s;display: flex;align-items: center;justify-content: center;background: var(--mfy-main);/* background: linear-gradient(25deg, rgb(121 51 255) 92%, rgb(77 18 190) 100%); */padding: 0.75em 2em;border-radius: 0.5em;width: fit-content;color: #fff;font-size: 0.77em;cursor: pointer;box-shadow: rgb(0 0 0 / 10%) 0px 11px 6px -7px, rgb(0 0 0 / 13%) 0px 4px 3px -3px;">Carregando dados ${SpinLoader} </div>`;
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
  let e = `\n          <div style="display: flex; flex-direction: row; align-items: center;">\n          <div style="margin: 1rem 1rem 1rem 0;width: fit-content;border: 1px solid rgb(0,0,0,0.31);border-radius: 1rem;display: flex;align-items: center;justify-content: center;padding: 1rem 0.5rem;box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;">\n          <img src="https://i.ibb.co/K7Lc6cr/metrify.png" style="pointer-events:none; width:15px;margin: auto;margin-left:0.75rem; margin-right: 0.5rem;">\n          <span>\n            Filtrar por <select disabled id="easortselect" style="margin-left: 0.5rem; border: none; background: transparent; font-size: 1.1rem; font-weight: 700; color: rgb(0,0,0,0.7); font-family: Montserrat;">\n            <option value="og">Selecione</option>\n            <option value="time">Mais recentes</option>\n            <option value="sales">Número de vendas</option>\n            <option value="mostprice">Maior preço</option>\n            <option value="lessprice">Menor preço</option>\n            </select>\n          </span>\n          </div>\n          <div id="mfy-smetrics-status" style="display:flex;flex-direction:row;align-items:center">\n          <label for="mfy-smetrics-progress">Carregando vendas...</label>\n          <progress id="mfy-smetrics-progress" value="0" max=${p} style=" width:  7rem; height: 2rem; margin: 1rem;" />\n          </div>\n          <div id="mfy-catalog-filter-container" style="display:none">\n            <label for="mfy-catalog-filter" style="font-size: 1.21rem;font-weight: 700;">Exibir:</label>\n            <select id="mfy-catalog-filter" style="padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid #ccc;">\n              <option value="todos">Todos</option>\n              <option value="ocultar">Ocultar catálogos</option>\n              <option value="filtrar">Apenas catálogos</option>\n            </select>\n          </div>\n</div>`, t = document.getElementsByClassName("ui-search-results")[0] ?? document.getElementsByClassName("ui-search-layout--grid__grid__layout--grid")[0], n = t.querySelectorAll("ol");
  n[0].insertAdjacentHTML("beforebegin", e), s(n), document.getElementById("ealistrequest")?.remove(), document.getElementById("mfy-catalog-filter").addEventListener("change", (e => {
    !function (e, t) {
      let n = e[0];
      Array.from(n.querySelectorAll("ol > li")).forEach((e => {
        const n = "true" === e.getAttribute("catalog");
        switch (t) {
        case "todos": e.style.display = "";
        break;
      case "ocultar": e.style.display = n ? "none": "";
      break;
    case "filtrar": e.style.display = n ? "": "none";
    break;
  default : e.style.display = ""
}
}
))
}
(t.querySelectorAll("ol"), e.target.value)
}
))
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
document.getElementsByTagName("mfyloader");
var a = document.getElementsByClassName("fulfillment ui-pb-label-builder fulfillment fulfillment").length > 0 ? document.getElementsByClassName("fulfillment ui-pb-label-builder fulfillment fulfillment"): document.querySelectorAll(".poly-component__shipped-from").length > 0 ? document.querySelectorAll(".poly-component__shipped-from"): document.getElementsByClassName("poly-shipping__promise-icon--full"), i = e.filter((e => e.metadata && "true" === e.metadata.is_pad)), s = [];
function o(e) {
  let t = document.getElementById("eacatextrainfo");
  function n() {
    a.getElementsByTagName("span")[0].innerText = "Carregando...", fetch(`${mfyProxy}https://api.mercadolibre.com/trends/MLB/${e}`, eaInit).then((e => e.json())).then((t => function (t) {
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
  (i.getElementsByClassName("ui-search-result__content-wrapper")[0] ?? i.getElementsByClassName("poly-card__content")[0])?.insertAdjacentHTML("afterbegin", mfyloader), async function (e) {
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
        , ((e, t) => m.add(t, "month"))), g = c.map((e => d(e.startOf("month")))), f = c.map((e => d(e.endOf("month")))), u = f.map(((e, t) => `${mfyProxyLessRestricted}https://api.mercadolibre.com/items/visits?ids=${n.itemID}&date_from=${g[t]}&date_to=${e}`));
        let y = "position: absolute; bottom: -21px; z-index: 99;";
        "gallery" == listView && (y = "position: relative; z-index: 99;");
        let h = `<div class="${n.itemID}" style="${y}font-family: 'Montserrat', sans-serif;margin: -2.5em 0em 1em 0em;display: flex;padding: 0em 0.5em;background: white;align-items: center;justify-content: center;width: 19rem;height: 3.5rem;border-radius: 0.7em;border-left: 8px solid ${s};box-shadow: rgba(0, 0, 0, 0.21) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">\n          \n          <div style="font-size: 0.61em;font-weight: 400;color: black;line-height: 1.31em;flex: 1.35;">Criado há: <br><span style="font-size: 0.86rem;font-weight: 700;"><div class="created-at" style="font-size: 1.1rem;font-weight: 700;">${r&&!l?SpinLoader:a}</d> ${r?"":"dia(s)"}</div> </div>\n          \n          <div style="font-size: 0.61em;font-weight: 400;color: black;line-height: 1.31em;flex: 1;padding-left: 1em;border-left: 1px solid #e3e2e2;">Vendas: <br><span id="${n.itemID}" style="font-size: 1.21rem;font-weight: 700;">${SpinLoader}</span> </div>\n          \n          <div style="font-size: 0.61em;font-weight: 400;color: black;line-height: 1.31em;flex:2;padding-left: 1em;border-left: 1px solid #e3e2e2;display:flex"><div>Visitas: <br><span style="font-size: 0.8rem">(6m)</span></div> \n          <div id="loader-${n.itemID}" class="itemloader" style="cursor: pointer;margin: auto;display: flex;align-items: end;justify-content: center;">\n          <img style="cursor: pointer;width:1.21rem;margin-right: 0.31rem;"src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/777777/external-qr-code-scan-coding-tanah-basah-basic-outline-tanah-basah.png"/> Ver\n          </div> </div> </div>`, b = i.getElementsByTagName("mfyloader")[0];
        b && (b.outerHTML = h);
        let v = null != o ? `${o<5?o:"+"+o}`: "-";
        r || (i.querySelector(`#${n.itemID}`).innerHTML = v), i.setAttribute("product-days", a), o && null == i.getAttribute("sales") && i.setAttribute("sales", o), document.getElementById(`loader-${n.itemID}`).addEventListener("mouseover", (function () {
          spinLoaderManager.hasSpinner(this) || "true" == this.getAttribute("visit-data") || (spinLoaderManager.replaceContent(this), async function (t) {
            var n = [], a = t;
            for (let e = 0;
            e < u.length;
            e++) await fetch(u[e], eaInit).then((e => e.json())).then((t => n.push({
              date: (new Date).getTime() * (e + 1),
              value: parseFloat(t[0].total_visits)
            }
            ))).catch ((function (t) {
              n.push({
                date: (new Date).getTime() * (e + 1),
                value: 0
              }
              )
            }
            ));
            am5.ready((function () {
              var t = am5.color(3441658), i = am5.color(11730944), s = Math.round(1e3 * (e[e.length - 1]?.value ?? 0 / e[0]?.value - 1)) / 10 < 0 ? i: t, o = a;
              o.style.overflow = "auto";
              var r = document.createElement("div");
              r.style.fontSize = "0em", r.style.width = "57px", r.style.height = "25px", r.style.padding = "0.2em 0.4em", r.style.float = "left", o.innerHTML = "", o.setAttribute("visit-data", "true"), o.appendChild(r), function (e, t, n) {
                var a = am5.Root.new (e);
                a.setThemes([am5themes_Micro.new (a)]);
                var i = a.container.children.push(am5xy.XYChart.new (a, {
                  panX: !1,
                  panY: !1,
                  wheelX: "none",
                  wheelY: "none"
                }
                ));
                i.plotContainer.set("wheelable", !1), i.zoomOutButton.set("forceHidden", !0);
                var s = i.xAxes.push(am5xy.DateAxis.new (a, {
                  maxDeviation: 0,
                  baseInterval: {
                    timeUnit: "day",
                    count: 1
                  }
                  ,
                  renderer: am5xy.AxisRendererX.new (a, {})
                }
                )), o = i.yAxes.push(am5xy.ValueAxis.new (a, {
                  strictMinMax: !0,
                  renderer: am5xy.AxisRendererY.new (a, {})
                }
                )), r = i.series.push(am5xy.LineSeries.new (a, {
                  xAxis: s,
                  yAxis: o,
                  valueYField: "value",
                  valueXField: "date",
                  stroke: n
                }
                ));
                r.strokes.template.setAll({
                  strokeWidth: 2
                }
                ), r.data.setAll(t)
              }
              (r, n, s)
            }
            ))
          }
          (this))
        }
        )), function () {
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
        }
        ()
      }
      let r = n.title.toLowerCase().replace(/[ãâàáäåāăąạảấầẩẫậắằẳẵặ]/g, "").replace(/[õôòóöøōŏőơọỏốồổỗộớờởỡợ]/g, "").replace(/[ñńņňṅṇṉṋṅ]/g, "").replace(/[ēĕėęěẹẻẽếềểễệ]/g, "").replace(/[īĭįỉịớờởỡợ]/g, "").replace(/[ūŭůűųụủứừửữự]/g, "").replace(/[ýỳỵỷỹ]/g, "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^-/, ""), l = "https://produto.mercadolivre.com.br/MLB-" + n.itemID.split("MLB")[1], d = (n.catalogID.split("MLB")[1], n.itemID, i.getElementsByClassName("mfy-ad-listinfo_widget")[0]?.getAttribute("catalog"), l);
      if (i.setAttribute("product-id", n.itemID), i.setAttribute("product-price", n.price), i.setAttribute("shipping", n.shipping), "true" == i.getElementsByClassName("mfy-ad-listinfo_widget")[0]?.getAttribute("catalog") || n.catalogListed) {
        i.setAttribute("catalog", !0);
        let e = '<div style="background-color: #fff159;display: flex;align-items: center;justify-content: center;border-radius: 1rem 0 1rem 1rem;margin-right: 2rem;font-size: 1.1rem;font-weight: 900;letter-spacing: 0.02rem;gap: 1rem;padding: 0.75rem 1rem 0.5rem 1rem;box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;position: absolute;right: 0;" class="iscatalog">Catálogo</div>';
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
      ), !1, n.catalogListed ? mfyProxy: null);
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
  (o)
}
"lite" != verif && document.addEventListener("load", function () {
  let e = `<div id="eanotify"\n      // style="background: var(--mfy-main); margin-top: 0em; transition: all 0.35s ease 0s; display: flex; align-items: center; justify-content: center; height: 3.5em;">\n      <div style="\n      display: flex;\n      justify-content: space-between;\n      gap: 1.2rem;\n      width: 100%;\n      max-width: 1215px;\n      padding: 0 1em;\n      ">\n      \n      <style>\n      .eafont1 {\n        font-weight: 900;\n        text-transform: uppercase;\n        letter-spacing: 0.035em;\n        font-size: 0.75em\n        }\n        \n        .eafont2 {\n          font-weight: 900;\n                  font-size: 1.1em;\n                  color: #fff;\n                  margin-left: 0.21em;\n                  margin-bottom: 0.1em\n              }\n          </style>\n          <div style="display: flex;align-items: center;margin-right: 1em;"><img\n                  src="https://img.icons8.com/metro/26/ffffff/opened-folder.png"\n                  style="width: 21px;margin-right: 0.35em;"><span id="eabar_category"\n                  style="font-weight: 900;font-size: 1.1em;color: #dceaff;margin-left: 0.21em;margin-bottom: 0.1em;">-</span>\n          </div>\n          \n          <div style="display: flex;align-items: center;margin-right: 1em; min-width: 4em;"></div>\n\n          <div style="display: flex;align-items: center;margin-right: 1em;"><img\n                  src="https://img.icons8.com/fluent-systems-filled/48/ffffff/lightning-bolt.png"\n                  style="width: 21px;margin-right: 0.35em;"><span id="eabar_fullrate" class="eafont2">-<span\n                      style="font-size: 0.77em;"><span\n                          style="letter-spacing: 1px;margin-left: -0.31em;color: #ffffff70;">/${p}</span><span\n                          style="color: #14305c;letter-spacing: 0.05em;">(0%)</span></span></span></div>\n          <div style="display: flex;align-items: center;margin-right: 1em;"><img\n                  src="https://img.icons8.com/fluent-systems-filled/48/ffffff/post-ads.png"\n                  style="width: 21px;margin-right: 0.35em;"><span id="eabar_adsrate" class="eafont2">-<span\n                      style="font-size: 0.77em;"><span\n                          style="letter-spacing: 1px;margin-left: -0.31em;color:#ffffff70;">/${p}</span><span\n                          style="color: #14305c;letter-spacing: 0.05em;">(0%)</span></span></span></div>\n          <div style="display: flex;align-items: center;margin-right: 1em;"><img\n          src="https://img.icons8.com/ios-glyphs/ffffff/30/pricing-structure.png"\n          style="width: 21px;margin-right: 0.35em;"><span id="eabar_catalograte" class="eafont2">-<span\n              style="font-size: 0.77em;"><span\n                  style="letter-spacing: 1px;color:#ffffff70;">/${p}</span><span\n                  style="color: #14305c;margin-left: 0.2rem;">(0%)</span></span></span></div>\n\n          <div style="margin-right: 1em;display: flex;align-items: center;"><img\n                  src="https://img.icons8.com/ios-glyphs/30/ffffff/fire-element--v1.png"\n                  style="width: 21px;margin-right: 0.35em;"><span\n                  class="eafont1">Concorrência: </span><span id="eabar_competition"\n                  style="font-weight: 900;font-size: 1.14em;color: #ffffff;margin-left: 0.21em;background-color: #3456e270;border-radius: 4px;padding: 0.21em 1em;">-\n              </span><img id="notyhide" src="https://img.icons8.com/fluent/48/000000/collapse-arrow.png"\n                  style="transition:all 0.35s;width: 3em;margin-top: 3.1em;margin-left: 1em;z-index: 14;padding: 0.5em;cursor: pointer;background-color: #1f2734;border-radius: 2em;filter: hue-rotate(40deg);">\n          </div>\n          \n\n      </div>\n</div>`, t = '<div id="eacatextrainfo"><span style="padding: 4px;"><img style="width: 1.5em;margin-bottom: -4px;" src="https://img.icons8.com/cotton/64/000000/info--v2.png"/></span><span id="eaadsoncategory" style="font-size: 14px;">Carregando...</span></div>', n = document.getElementById("root-app"), l = n.firstChild.getElementsByTagName("section")[0], d = t, m = l, c = "beforeend";
  l?.children.length > 0 ? ("ul" === l.firstChild.tagName.toLowerCase() ? (l?.setAttribute("style", "padding: 1em; margin: 0 0 7px; border-radius: 5px; display: flex; align-items: flex-start; flex-direction: column;"), l.firstChild.style.marginBottom = "1.2em"): (d = `<section id='ealistsection' class="ui-search-top-keywords" style=" padding: 1em; margin: 0 0 7px; border-radius: 5px; display: flex; align-items: flex-start; flex-direction: column;">${t}</section>`, m = document.getElementById("root-app").firstChild, c = "afterbegin"), m?.insertAdjacentHTML(c, d)): (d = `<section id='ealistsection' class="ui-search-top-keywords" style="z-index:999; padding: 1em; margin: 0 0 7px; border-radius: 5px; display: flex; align-items: flex-start; flex-direction: column;">${t}</section>`, m = document.getElementById("root-app").firstChild, c = "afterbegin", m?.insertAdjacentHTML(c, d));
  n.insertAdjacentHTML("afterbegin", e), (eabar_category = document.getElementById("eabar_category")).innerHTML = "carregando...", eabar_fullrate = document.getElementById("eabar_fullrate"), eabar_fullrate.innerHTML = `${a.length>50?50:a.length.toString().padStart(2,"0")} <span style="font-size: 0.77em;"> <span style="letter-spacing: 1px;margin-left: -0.31em;color: #ffffff70;"> /${p}</span> <span style="color: #14305c;letter-spacing: 0.05em;">(${(a.length/50*100).toFixed(0)>100?100:(a.length/50*100).toFixed(0).padStart(2,"0")}%)</span></span>`, eabar_adsrate = document.getElementById("eabar_adsrate"), eabar_adsrate.innerHTML = i.length.toString().padStart(2, "0") + ` <span style="font-size: 0.77em;"> <span style="letter-spacing: 1px;margin-left: -0.31em;color: #ffffff70;"> /${p}</span> <span style="color: #14305c;letter-spacing: 0.05em;">(` + (i.length / 50 * 100).toFixed(0).padStart(2, "0") + "%)</span></span>";
  let g = parseFloat((i.length / 50 * 100).toFixed(0));
  g <= 0 && (g = 1), r([g,
  parseFloat((0).toFixed(0)),
  parseFloat((a.length / 50 * 100).toFixed(0))]), eanotify = document.getElementById("eanotify");
  var f = document.getElementById("notyhide");
  eanotify.addEventListener("mouseover", (function () {
    this.style.marginTop = "0em", f.setAttribute("style", "transition:all 0.35s;width: 3em;margin-top: 3.1em;margin-left: 1em;z-index: 1;padding: 0.5em;cursor: pointer; border-radius: 2em;background-color: #1f2734;border-radius: 2em;filter: hue-rotate(40deg);z-index: 14;")
  }
  )), f.addEventListener("click", (function () {
    eanotify.style.marginTop = "-2.77em", f.setAttribute("style", "transform: rotate(180deg);margin-top: 3.1em;z-index:1;transition:all 0.35s; width: 2em;margin-left: 1em;padding: 0.5em;cursor: pointer;border-radius: 2em;background-color: #1f2734;border-radius: 2em;filter: hue-rotate(40deg);z-index: 14;")
  }
  )), function () {
    let e = preLoadedState.initialState.melidata_track.event_data.category_id;
    e?.length > 0 && o(e), async function (e) {
      "" != e && null != e && await new Promise((t => {
        fetchCategoryWithCache(e, (e => {
          e && (s = e), t()
        }
        ))
      }
      )), eabar_category.innerHTML = s.name ? s.name: "Categoria";
      let t = document.getElementById("eaadsoncategory");
      s.total_items_in_this_category && t ? t.innerHTML = `<b style="color: var(--mfy-main);font-size:18px;">${s.total_items_in_this_category}</b> anúncios na categoria.`: t.parentElement.parentElement.remove()
    }
    (e)
  }
  ()
}
(), !1)
}
}
function pageType() {
  null == preLoadedState?.userId ? null != document.getElementsByClassName("ui-search-breadcrumb__title")[0] && (paginaAtual = "lista"): paginaAtual = "painel", verifyData("pageType")
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
        l.innerHTML = "lite" == verif ? "Ativar Licença": `Conta ${verif.charAt(0).toUpperCase()}${verif.slice(1)}<img style="width:1rem" src="https://img.icons8.com/${mfyMainColorNumbers}/ios-glyphs/30/guarantee--v1.png">`, l.addEventListener("mouseover", (function () {
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
  if (dayjs = window.dayjs, null == uid && null == uid) {
    !async function () {
      let e = window.melidata_namespace ? window.melidata_namespace: null;
      for (;
      !(e && e.actual_track && e.actual_track.user && e.actual_track.user.user_id);
      ) await new Promise((e => setTimeout(e, 500)));
      uid = e.actual_track.user.user_id
    }
    ()
  }
  if (null != mfy_version && null != mfy_version && "" != mfy_version || document.dispatchEvent(new CustomEvent("MetrifyVersion", {
    detail: ""
  }
  )), window.location.href.startsWith("https://lista") || window.location.href.startsWith("https://produto") | window.location.href.startsWith("https://www.mercadolivre")) {
    let e = '.select {\n      position: relative;\n      min-width: 200px;\n    }\n    .select svg {\n      position: absolute;\n      right: 12px;\n      top: calc(50% - 3px);\n      width: 10px;\n      height: 6px;\n      stroke-width: 2px;\n      stroke: #9098a9;\n      fill: none;\n      stroke-linecap: round;\n      stroke-linejoin: round;\n      pointer-events: none;\n    }\n    .select select {\n      margin-left: 1rem;\n      -webkit-appearance: none;\n      padding: 7px 40px 7px 12px;\n      width: 100%;\n      border: 1px solid #e8eaed;\n      border-radius: 5px;\n      background: #fff;\n      box-shadow: 0 1px 3px -2px #9098a9;\n      cursor: pointer;\n      font-family: inherit;\n      font-size: 14px;\n      transition: all 150ms ease;\n    }\n    .select select:required:invalid {\n      color: #5a667f;\n    }\n    .select select option {\n      color: #223254;\n    }\n    .select select option[value=""][disabled] {\n      display: none;\n    }\n    .select select:focus {\n      outline: none;\n      border-color: #07f;\n      box-shadow: 0 0 0 2px rgba(0,119,255,0.2);\n    }\n    .select select:hover + svg {\n      stroke: #07f;\n    }\n    .sprites {\n      position: absolute;\n      width: 0;\n      height: 0;\n      pointer-events: none;\n      user-select: none;\n    }\n    ' + "*{ scrollbar-width: auto; scrollbar-color: #c2c2c2 #ffffff;} *::-webkit-scrollbar{ width: 11px; height:11px} *::-webkit-scrollbar-track{ background: #ffffff11;} *::-webkit-scrollbar-thumb{ background-color: #c2c2c2; border-radius: 10px; }" + ".eatoolboxbar{opacity: 0;overflow: hidden;color: #333333;height: 3.75em;border-radius: 2em;display: block;font-weight: bold;position: relative;background-color: #fff;z-index: 31;right: -2em;border: 1px solid #ebebeb;margin-bottom: -2em;box-shadow: rgb(0 0 0 / 7%) 0 3px 6px;pointer-events: none;}.eatoolboxicon{z-index: 100;overflow: hidden;cursor: alias;align-items: center;color: rgb(52, 131, 250);font-weight: 700;font-size: 1.36em;background-color: rgb(250, 250, 250);padding: 0.35em 0.31em;border-radius: 1em;display: inline-flex;position: absolute;right: 0em;}.eatoolboxbaropen{pointer-events: auto;opacity: 1;color: #333333;height: 3.75em;border-radius: 2em;display: block;font-weight: bold;position: relative;background-color: #fff;z-index: 31;top:-.5rem;transition: all 0.21s; right: 0;width: 102%;border: 1px solid #ebebeb;margin-bottom: -1em;box-shadow: rgb(0 0 0 / 7%) 0px 3px 6px;}" + "#eagrossrev{transition:all 0.35s;overflow:hidden;flex-wrap: wrap;box-shadow:rgb(0 0 0 / 11%) 0 3px 6px,rgb(0 0 0 / 10%) 0 3px 6px;color:rgb(90, 90, 90);font-weight:400;font-size:.91em;position:absolute;z-index:21;background-color:#ffffff;padding:.5em .75em .35em .75em;line-height:2.1em;cursor:pointer;border-radius:2em} earevstats{transition: all 0.21s} /* #eagrossrev:hover .eahiddenlabel2{opacity:1;margin-right:0;font-weight:900;transition:all .35s} .eahiddenlabel2{opacity:0;margin-right:-5em;font-weight:900;transition:all .35s}*/ .eahiddenlabel2{opacity:1;margin-right:0;font-weight:900;transition:all .35s}" + "#eaoffSwitch{overflow: hidden;display: inline-flex;box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;color: var(--mfy-main);font-weight: 400;font-size: 0.91em;position: relative;z-index:30;background-color: #ffffff;top:-0.31em; left:1em; min-width: 3.1em; height: 3.1em; padding: 0.5em 0.75em 0.35em 0.75em;line-height: 2.1em;cursor: pointer;border-radius: 2em;} #eaoffSwitch:hover > .eahiddenlabel{opacity: 1;margin-right: 0em;font-weight: 900;transition: all 0.35s;}" + "#eaadvsearchBtn{overflow: hidden;display: none /* inline-flex */;box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;color: var(--mfy-main);font-weight: 400;font-size: 0.91em;position: absolute;z-index:31;background-color: #ffffff;top: 0.35em;height: 3.1em;/* font-size: 0.7em; */padding: 0.5em 0.75em 0.35em 0.75em;line-height: 2.1em;cursor: pointer;border-radius: 2em;} #eaadvsearchBtn:hover > .eahiddenlabel{opacity: 1;margin-right: 0em;font-weight: 900;transition: all 0.35s;} .eahiddenlabel{opacity: 0;margin-right: -12.2em;font-weight: 900;transition: all 0.35s;}" + ".eagetallimgs{display: inline-block;} .eagetallimgs-inside{transform: scale(1);transition: all 0.14s;line-height: 1.3em;}.eagetallimgs-inside:hover{transform: scale(1.1);line-height:1em;}.eadownloadicon{padding: 4px;position: relative;z-index: 11;background: var(--mfy-main);width: 2em;height: 2em;border-radius: 7px;margin-top: -2em;cursor: grabbing;opacity: 0.7;transform: scale(0.75);transition: all 0.21s;}.eadownloadicon:hover{opacity: 1;transform: scale(1);transition: all 0.35s;}" + `.eadrop01 li{padding: 11px;padding-right: 21px;} .eadrop01 li a{color: #333;text-decoration: none;} .eadrop01 li:hover{background-color: #f5f5f5} .eadropdown:hover{ background-color:var(--mfy-main)!important; transition:all 0.35s;} .eadropdown:hover img{filter: brightness(35);} .eadropxtra li{padding: 11px;padding-left: 21px; border-bottom: 1px solid #7e7e7e1f;} .eadropxtra li a{color: #333} .eadropxtra li:hover{background-color: #fff} .eameter{opacity: 0;margin-right: -2.77em;transition: all 0.35s;pointer-events: none;} #eahealthmeter:hover .eameter{pointer-events: none;opacity:100; margin-right: 0; transition: all 0.35s;} .smooth{transition:all 0.35s;opacity: 100%;} .new-loader{display: flex; height: 21rem; align-content: center} .new-hdn{display:none;} .hdn{transform: rotateX(90deg);overflow:hidden;padding: 0px;height: 0em;transition:opacity 0.5s;} .hdn2{transition:all 0.5s ease-in-out;display:none;-webkit-box-shadow: 0 0px 0px 0 #fff0!important; background-color:#fff0!important; border-top: 0px solid #fff0!important;margin-top: -6.1em!important;overflow:hidden;padding: 0px;height:0em!important;transition:opacity 0.35s;} .transp{opacity: 0%;} .detalhamento{transition:all 0.5s ease-in-out;opacity:100%;text-align: -webkit-left;margin: 2em 1em 0em 2em;padding: 0.7em 0em 0em 3.5em;margin-top: 1em; border-top: 1px solid #80808075;} .alinharvertical{padding: 1em 0em;}.eafollow_ad{border: 1px solid lightgray;border-radius: 2em;display: flex;align-items: center;position: absolute;right: 1px;padding: 0.35em 0.75em;cursor: pointer;}.eafollow_img{margin-top: 3px;width: 1.75em;filter: grayscale(100%);opacity: 35%; transition: all 0.14s;}.eafollow_img:hover{width: 2em;filter: grayscale(0%);opacity:100%;transition: all 0.14s;} \n\n      :root {\n        --mfy-main: ${mfyMainColor};\n        --mfy-dark: #212936;\n  --mfy-outline: #eef0f3;\n  --mfy-success: #57dd98;\n  --mfy-smoke: #f9fafb;\n  --mfy-main-font: "Montserrat", sans-serif;\n  --mfy-outline-10: #eef0f310;\n  --mfy-dark-50: #21293650;\n  --mfy-dark-35: #21293635;\n  --mfy-main-14: #7933ff14;\n  --mfy-warning: #fbbd23;\n  --mfy-danger: #ff4545;\n      }\n\n      .mfy-main-bg{\n        background-color: var(--mfy-main);\n      }\n\n      .tippy-box[data-theme~="mfy"] {\n        background-color: var(--mfy-main);\n        color: white;\n      }\n\n    .tracked-results-maindiv {\t\n      display: flex;flex-direction: column;width: 100%;overflow-y: scroll;max-height: 40vh;\n      height: 40vh;\n    }\n    @media only screen and (min-height: 900px) {\n      .tracked-results-maindiv {\n        max-height: 38rem;\n        height: 38rem;\n      }\n    }\n    .track-menu-button {\n      color: rgb(0,0,0,.5);font-weight: 600;font-size: 1rem;border: 1px solid rgb(0,0,0,.1);padding: 0.5em 1em;margin: 0em 1em;cursor: pointer;box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;border-radius: 1em;\n    }\n    .track-menu-button_active {\n      font-weight: 700;background-color: #fff; padding: 0.5em 1em; margin: 0em 1em; cursor: pointer; box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px; border-radius: 1em; \n    }\n\n    .starttime{\n      font-size: 0.86rem;\n    }\n    .mfy-result-button{\n      text-align: center; border: 1px solid rgb(0 0 0 / 10%); display: flex; justify-content: center; padding: 0.5rem; border-radius: 5rem; cursor: pointer; margin-top: 1em;    transition: 0.35s all;\n    }\n    .mfy-result-button:hover{\n      background-color: #F56565;box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;transform: translate(0px, 7px);transition: 0.35s all;\n    }\n    .mfy-result-button:hover img{\n      filter: invert(1) brightness(100);\n    }\n\n    .mfy-result-button_options{\n      display: flex; flex-direction: row; justify-content: center;\n    }\n\n    .mfy-result-button_style{\n      border: 1px solid rgb(0 0 0 / 10%); display: flex; justify-content: center; padding: 0.5rem; border-radius: 5rem; cursor: pointer; /* margin-top: 1em; */    transition: 0.35s all;\n    }\n    .mfy-result-button_style:hover{\n      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;transform: translate(0px, 7px);transition: 0.35s all; border: 2px solid rgb(0 0 0 / 10%);\n    }\n    .result-div{\n      margin-bottom: 0.75em;display: flex;flex-direction: row;background-color: #fff;height: 14rem;width: 100%;justify-content: center;align-items: center;box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;border-radius: 0.71rem;border-left: 7px solid; border-color: #00000020;\n    }\n    \n    #pav-slider input:focus-visible {\n      outline: none !important;\n    }\n    pav-slider :focus-visible {\n      outline: none !important;\n    }\n    .track-btn{\n      border: 2px solid #ededed; border-radius: 2rem; margin: 1em; padding: 0.5em 1em; cursor: pointer; display: flex; align-items: center; justify-content: center;\n      transition: all 0.35s;\n    }\n    .track-btn:hover{\n      transform: scale(0.9); box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;\n      transition: all 0.35s;\n    }\n    .eabanner{ \n      margin: auto;\n      margin-bottom: 1rem;\n      width: 100%;\n      height: 200px;\n      box-shadow: rgb(0 0 0 / 14%) -1px 20px 16px -10px;\n      border-radius: 0.5rem;\n      display: flex;\n      justify-content: center;\n      align-items: end;\n      cursor: pointer;\n    }\n    .notificationtext{\n      border-radius: 0.5rem;\n      transition: all 0.35s;\n      opacity: 0;\n      height: 100%;\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: flex-end;\n      padding: 1rem;\n    }\n    .eabanner:hover .notificationtext{\n      border-radius: 0.5rem;\n      transition: all 0.35s;\n      opacity: 1;\n      font-size: 1em;\n      height: 100%;\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: flex-end;\n      padding: 1rem;\n      color: white;\n      background: var(--mfy-main);\n      /* background: linear-gradient(0deg, rgba(0,0,0,1) 11%, rgba(0,0,0,0) 100%); */\n    }\n    .myml-nav__section-title{\n      opacity: 1;\n    }\n    .toolmodal {\n      position: fixed;top: 0;background-color: #000000ab;width:100vw;height: 100vh;z-index: 999;backdrop-filter: blur(11px);display: flex;justify-content: center;align-items: center;\n    }\n\n    #snackbar {\n      visibility: hidden;\n      color: #fff;\n      background-color: #333;\n      min-width: 250px;\n      margin-left: -125px;\n      border-radius: 2px;\n      padding: 16px;\n      text-align: center;\n      left: 50%;\n      bottom: 30px;\n      z-index: 1;\n      position: fixed;\n    }\n\n    /* This will be activated when the snackbar's class is 'show' which will be added through JS */\n    #snackbar.show {\n      visibility: visible;\n      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n      animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    }\n\n    /* Animations for fading in and out */\n    @-webkit-keyframes fadein {\n      from {bottom: 0; opacity: 0;}\n      to {bottom: 30px; opacity: 1;}\n    }\n\n    @keyframes fadein {\n      from {bottom: 0; opacity: 0;}\n      to {bottom: 30px; opacity: 1;}\n    }\n\n    @-webkit-keyframes fadeout {\n      from {bottom: 30px; opacity: 1;}\n      to {bottom: 0; opacity: 0;}\n    }\n\n    @keyframes fadeout {\n      from {bottom: 30px; opacity: 1;}\n      to {bottom: 0; opacity: 0;}\n    }\n\n    </style>\n    `, t = document.createElement("style");
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