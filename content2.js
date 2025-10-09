var mfyMainColor = "#4656f8",
  mfyMainColorNumbers = mfyMainColor.split("#")[1],
  extensionPath = "";

function sendRequestToContentScript() {
  const e = new CustomEvent("requestMfyGlobals");
  document.dispatchEvent(e);
}

document.addEventListener("responseMfyGlobals", function (e) {
  extensionPath = e.detail.extensionUrlPath;
});
sendRequestToContentScript();

var globalLogs = [],
  eaOnAdminPanel = !1,
  listView = void 0,
  mfy_version = null,
  trackDataParsed = {},
  dataLayer = window.dataLayer,
  melidata_namespace = window.melidata_namespace,
  altPreloadedState =
    Array.from(document.getElementsByTagName("script")).filter(
      (e) => "__PRELOADED_STATE__" === e.id
    ).length > 0
      ? JSON.parse(
          Array.from(document.getElementsByTagName("script")).filter(
            (e) => "__PRELOADED_STATE__" === e.id
          )[0].innerHTML
        )
      : void 0,
  preLoadedState = window.__PRELOADED_STATE__,
  rawID = void 0,
  userId = null,
  uid = null,
  meliCurrentFee = 6.5,
  catalogRemoteLookupData = [],
  eaAPIHeaders = new Headers();

eaAPIHeaders.append(
  "X-Api-Key",
  "Ps-RXiTdFgN62dmQhZ9bsoHMCEyT2!ypg!ov%7MEFR#jP3mtZWbDoSvEdctMgF6a"
);

var registeringAcc = !1,
  requestOptions = {
    method: "GET",
    headers: eaAPIHeaders,
    redirect: "follow",
  },
  mfyuser = void 0,
  mfy_userdata = {},
  myHeaders = new Headers();

myHeaders.append("accept", "application/json");
myHeaders.append("content-type", "application/x-www-form-urlencoded");

var TTL0 = 9e5,
  TTL1 = 216e5,
  TTL2 = 3e4,
  TTL3 = 72e5,
  mfyHost = "https://api2.metrify.com.br/api",
  mfyEndpoints = {
    api_host: "https://api2.metrify.com.br/api",
    auth: `${mfyHost}/auth`,
    register: `${mfyHost}/register`,
    track: `${mfyHost}/trackworks`,
    validate: `${mfyHost}/validate`,
  };

function getRandomProxy() {
  const e = ["https://mfy-cors.up.railway.app/"];
  return e[Math.floor(Math.random() * e.length)];
}
var mfyProxy = getRandomProxy(),
  mfyProxyLessRestricted = "https://mfy.herokuapp.com/";

class SpinLoaderManager {
  constructor() {
    this.template = null;
    this.localPath = "";
  }
  getLocalPath() {
    return (
      !this.localPath &&
        extensionPath &&
        (this.localPath = `${extensionPath}src/lotties/lf20_uwR49r.json`),
      this.localPath || "src/lotties/lf20_uwR49r.json"
    );
  }
  createTemplate() {
    if (this.template) return this.template;

    const e = document.createElement("div");
    e.style.cssText = "width: 25px;\n height: 25px;\n margin: auto;\n";

    const t = document.createElement("lottie-player");

    return (
      t.setAttribute("src", this.getLocalPath()),
      t.setAttribute("background", "transparent"),
      t.setAttribute("speed", "1"),
      t.setAttribute("loop", ""),
      t.setAttribute("autoplay", ""),
      (t.style.cssText = "width: 100%;\n height: 100%;\n"),
      e.appendChild(t),
      (this.template = e),
      this.template
    );
  }
  getInstance() {
    return this.createTemplate().cloneNode(!0);
  }
  getHTML() {
    return `<lottie-player src="${this.getLocalPath()}" background="transparent" speed="1" style="width: 25px;
height:25px;
margin:auto;
" loop="" autoplay=""></lottie-player>`;
  }
  replaceContent(e) {
    (e.innerHTML = ""), e.appendChild(this.getInstance());
  }
  hasSpinner(e) {
    return null !== e.querySelector("lottie-player");
  }
  getWrappedHTML(e = "") {
    return `<div style="${e}">${this.getHTML()}</div>`;
  }
  getInlineHTML() {
    return `<span style="display: inline-block;
 vertical-align: middle;
">${this.getHTML()}</span>`;
  }
}
const spinLoaderManager = new SpinLoaderManager();
var SpinLoader = spinLoaderManager.getHTML(),
  localePTBR = [
    {
      name: "pt-BR",
      options: {
        months: [
          "Janeiro",
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
          "Dezembro",
        ],
        shortMonths: [
          "Jan",
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
          "Dez",
        ],
        days: [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
        ],
        shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        toolbar: {
          exportToSVG: "Baixar SVG",
          exportToPNG: "Baixar PNG",
          menu: "Menu",
          selection: "Seleção",
          selectionZoom: "Zoom na seleção",
          zoomIn: "Zoom In",
          zoomOut: "Zoom Out",
          pan: "Panorâmica",
          reset: "Resetar Zoom",
        },
      },
    },
  ],
  fullIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" class="logo-full" width="151" height="39" viewBox="0 0 151 39" data-reactroot="" style="width: 3.75em;\nheight: auto;\nposition: relative;\ntop: 0.2em;\npadding: 0em 0em 0em 0.35em;\n"><g fill="#00A650" fill-rule="evenodd"><path d="M9.577 0L0 22.286h15.962L9.577 39l25.54-25.071H19.153L28.732 0zM56.094 27.925h-6.931l5.924-24.38h19.706l-1.33 5.483H60.688l-.886 3.801h12.452l-1.33 5.483H58.433l-2.338 9.613zm33.718.439c-8.262 0-12.332-3.582-12.332-8.7 0-.402.12-1.242.202-1.608l3.546-14.51h7.052L84.774 17.91c-.04.183-.12.585-.12 1.023.04 2.01 1.732 3.948 5.158 3.948 3.707 0 5.601-2.12 6.286-4.971l3.507-14.365h7.012L103.11 18.02c-1.451 5.921-4.998 10.344-13.3 10.344zm36.014-.439h-17.732l5.924-24.38h6.932l-4.554 18.897h10.76l-1.33 5.483zm23.844 0h-17.732l5.924-24.38h6.932l-4.554 18.897H151l-1.33 5.483z"></path></g></svg>';

function parseJwt(e) {
  var t = e?.split(".")[1],
    n = t.replace(/-/g, "+").replace(/_/g, "/"),
    a = decodeURIComponent(
      window
        .atob(n)
        .split("")
        .map(function (e) {
          return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  return JSON.parse(a);
}
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (e, t) => e.get(t),
});

function sendToContentScript(e) {
  try {
    document.dispatchEvent(new CustomEvent("MetrifyExtension", { detail: e }));
  } catch (e) {}
}
function AuthDataStore(e, t) {
  sendToContentScript({ type: "STORE", key: e, value: t });
}
function AuthDataRetrieve(e) {
  sendToContentScript({ type: "RETRIEVE", key: e });
}
function AuthDataCheck(e) {
  sendToContentScript({ type: "AUTH_CHECK", key: e });
}
function isList() {
  null != document.getElementsByClassName("ui-search-breadcrumb__title")[0] &&
    (paginaAtual = "lista");
}
function eadataStore(e, t, n) {
  const a = { value: t, expiry: new Date().getTime() + n };
  localStorage.setItem(e, JSON.stringify(a));
}
function eadataRetrieve(e) {
  const t = localStorage.getItem(e);
  if (!t) return null;

  const n = JSON.parse(t);
  return new Date().getTime() > n.expiry
    ? (localStorage.removeItem(e), null)
    : n.value;
}
document.addEventListener("MetrifyExtensionResponse", function (e) {
  "RETRIEVE" == e.detail.type
    ? (mfy_userdata = e.detail.value)
    : "AUTH_CHECK" == e.detail.type && (mfy_userdata.remote = e.detail.value);
});
document.addEventListener("MetrifyAuthCheck", function (e) {
  mfy_userdata.remote = e.detail.value;
});
isList();
var getHTML = async function (e, t) {
    try {
      const n = new Headers();
      n.append("Access-Control-Allow-Origin", "*");

      const a = await fetch(e, { headers: n });
      if (!a.ok) throw new Error(`HTTP error! status: ${a.status}`);

      const i = await a.text(),
        s = new DOMParser().parseFromString(i, "text/html");
      t && "function" == typeof t && t(s);
    } catch (e) {
      t && "function" == typeof t && t(null, e);
    }
  },
  scrapedData = {},
  itemsLocalData = {},
  inFlightScrapeRequests = new Set(),
  inFlightScriptRequests = new Set();
document.addEventListener("ProductDataResponse", function (e) {
  try {
    const t = e.detail || {};
    itemsLocalData = { ...(itemsLocalData || {}), ...t };
  } catch (t) {
    itemsLocalData = e.detail;
  }
});
document.addEventListener("ScrapedURL", function (e) {
  const { url: t, html: n, idRef: a } = e.detail;
  scrapedData[a] = n;
});
document.addEventListener("ScrapedScriptsURL", function (e) {
  const { url: t, response: n, idRef: a } = e.detail;
  scrapedData[a] = n;
});
var scrapeHTML = async function (e, t, n, a, i) {
    let s = 1 == n ? `canonical-${e}` : e;
    if (void 0 !== scrapedData[s]) {
      let e = scrapedData[s],
        t = null;
      if ("string" == typeof e)
        try {
          t = new DOMParser().parseFromString(e, "text/html");
        } catch (e) {
          t = null;
        }
      else e instanceof Document && (t = e);
      return void (a && "function" == typeof a && a(t));
    }
    inFlightScrapeRequests.has(s) ||
      (inFlightScrapeRequests.add(s),
      document.dispatchEvent(
        new CustomEvent("ScrapeURL", {
          detail: { url: t, idRef: s, noRedirect: i },
        })
      ));
    (async () => {
      if (void 0 !== scrapedData[s]) return void n();
      let e = 0;

      const t = () => {
          void 0 !== scrapedData[s]
            ? (n(), inFlightScrapeRequests.delete(s))
            : e >= 1e4
            ? (a && "function" == typeof a && a(null),
              inFlightScrapeRequests.delete(s))
            : ((e += 750), setTimeout(t, 750));
        },
        n = () => {
          let e = scrapedData[s],
            t = null;
          if ("string" == typeof e)
            try {
              t = new DOMParser().parseFromString(e, "text/html");
            } catch (e) {
              t = null;
            }
          else e instanceof Document && (t = e);
          a && "function" == typeof a && a(t);
        };
      setTimeout(t, 750);
    })();
  },
  scrapeForScripts = async function (e, t, n, a, i, s) {
    let o = n ? `canonical-scripts-${e}` : `scripts-${e}`;

    const r = s ? `${s}${t}` : t;
    if (void 0 !== scrapedData[o]) {
      const e = scrapedData[o];
      return void (e && e.error
        ? a && "function" == typeof a && a(null, e.error)
        : a && "function" == typeof a && a(e.scripts || e.html, null));
    }
    inFlightScriptRequests.has(o) ||
      (inFlightScriptRequests.add(o),
      document.dispatchEvent(
        new CustomEvent("ScrapeScriptsURL", {
          detail: { url: r, idRef: o, noRedirect: i },
        })
      ));
    (async () => {
      let e = 0;
      for (; void 0 === scrapedData[o] && e < 1e4; )
        await new Promise((e) => setTimeout(e, 100)), (e += 100);
      if (void 0 === scrapedData[o])
        a && "function" == typeof a && a(null, "Timeout"),
          inFlightScriptRequests.delete(o);
      else {
        const e = scrapedData[o];
        e.error
          ? (a && "function" == typeof a && a(null, e.error),
            inFlightScriptRequests.delete(o))
          : (a && "function" == typeof a && a(e.scripts || e.html, null),
            inFlightScriptRequests.delete(o));
      }
    })();
  },
  eaHeaders = new Headers();
async function fetchUserMeData(e, t = !1) {
  return new Promise((n) => {
    const a = mfyuser?.id || null;
    if (!a) return void n({ success: !1, error: "No user ID available" });
    document.dispatchEvent(
      new CustomEvent("FetchUserMe", {
        detail: { userId: a, authToken: e, forceRefresh: t },
      })
    );

    const i = (e) => {
      document.removeEventListener("UserMeResponse", i), n(e.detail);
    };
    document.addEventListener("UserMeResponse", i),
      setTimeout(() => {
        document.removeEventListener("UserMeResponse", i),
          n({ success: !1, error: "Timeout waiting for user data" });
      }, 2e4);
  });
}
eaHeaders.append("pragma", "no-cache");
eaHeaders.append("cache-control", "no-cache");
var eaInit = { method: "GET", headers: eaHeaders, cache: "no-store" },
  title = "",
  spot = "",
  spot2 = "",
  spot3 = "",
  reflow = "",
  maisFunc = "",
  spot_catalog = "",
  catalog_subt = "",
  iscatalog = !1,
  eatrial = "not",
  iFrame = "",
  stepOne = "",
  stepTwo = "",
  stepLoading = "",
  cota_minima_MLB = 79,
  taxa_cota = meliCurrentFee,
  cota_valid = 0,
  taxaML_verif = 0,
  taxa_percentual = 0,
  productCost = 0,
  PAV = 0,
  quotationData = localStorage.getItem("lastquote"),
  aliquota = 0,
  margem_raw = "",
  taxa_mlb = "",
  taxa_frete = "",
  frete_valid = 0,
  simular_btn = "",
  alerta_form = "",
  eapricefix = "",
  paginaAtual = "anuncio",
  vendas = "",
  dLayer = void 0,
  dLayerAlt = "",
  vendasAlt = "",
  catalogData = [{ body: {} }],
  eaMLtaxdata = "",
  taxlitedata = "",
  data_br = "",
  dataMilisec = "",
  eanow = Date.now(),
  eadiff = "",
  dias = "",
  media_vendas = "",
  media_vendas_catalogo = "",
  eabar_category = "",
  MLenvios = !0,
  nomeProduto = "",
  categoryDomain = "",
  eaList = !1,
  alert_media_vendas = !1,
  visitasparavender = null;
null != document.getElementsByClassName("ui-pdp-title")[0] &&
  (nomeProduto = document.getElementsByClassName("ui-pdp-title")[0].innerHTML);

var checkeddimensions = "dimensions=15x30x5,150",
  toolModal =
    '\n  <div id="mfy-tool-modal" class="toolmodal">\n    <div class="andes-modal__portal" style="display:none" id="mfy-modal-portal">\n      <div id="mfy-modal-overlay" class="andes-modal__overlay andes-modal__overlay--small">\n        <div role="dialog" tabindex="-1" class="andes-modal ui-pdp-iframe-reviews andes-modal--small" data-ismodal="true" aria-modal="true" style="max-height: 100%;\n max-width: 100%;\n">\n          <div id="close-modal" style="position: absolute;\ntop: -3rem;\nright: -6%;\ncursor: pointer;\nz-index: 1000;\n" onclick="this.parentElement.parentElement.parentElement.style.display = \'none\';\n">\n            <img src="https://img.icons8.com/sf-regular/48/ffffff/close-window.png" style="width: 3.1rem;\n">\n          </div>\n          <div class="andes-modal__scroll">\n            <div class="andes-modal__content" id="mfy-modal-content" style="padding: 4rem;\ndisplay: flex;\nflex-direction: column;\njustify-content: center;\nalign-items: center;\n min-width: 51rem;\n">\n              <span style="font-size: 1.75rem;\nfont-weight: 800;\n">Análise de Dados Rastreados</span>\n              <span style="font-size: 1.31rem;\nfont-weight: 700;\n">Sobreposição de Visitas/Vendas</span>\n              <div id="mfy-track-chart" style="width: 59rem;\nheight: 27rem;\npadding-top: 2.1rem;\nmin-height: 365px;\n">Gráfico</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div id="tool-modal" style="max-width: 1100px;\nmin-width: 80rem;\nborder-radius: 0.21em;\nposition: relative;\nbackground-color:#F5F5F5;\nwidth: 77vw;\nheight: 93vh;\ndisplay: flex;\njustify-content: space-between;\nfont-size: 1.5rem;\nfont-family: \'montserrat\';\nfont-weight: 500;\n">\n      <div class="branding" style="width: 5rem;\nbackground: #fff;\ndisplay: flex;\nalign-items: flex-start;\npadding: 1.31rem;\njustify-content: center;\nborder-radius: 0.21em;\n">\n        <img src="https://i.ibb.co/K7Lc6cr/metrify.png" style="width: 1.75rem;\nheight: 1.75rem;\n">\n      </div>\n\n      <div class="modal-content" style="width: 100%;\nheight: 100%;\ndisplay: flex;\npadding: 2rem;\nflex-direction: column;\n">\n        <div class="row1" style="display: flex;\nwidth: 100%;\nheight: 8rem;\njustify-content: space-between;\nalign-items: center;\npadding: 1.31rem;\n">\n          <div class="column1" style="display: flex;\nflex-direction: column;\njustify-content: space-between;\nalign-items: flex-start;\n">\n            <span style="font-size: 1.31em;\nfont-weight: 700;\n">Painel</span>\n            <span style="font-size: 0.77em;\ncolor: rgb(0,0,0,.5);\n">de Ferramentas</span>\n          </div>\n        </div>\n\n        <div class="row2" style="display: flex;\nwidth: 100%;\nheight: fit-content;\njustify-content: left;\nalign-items: flex-start;\npadding: 1.31rem 0rem 2.1rem 0rem;\nborder-bottom: 2px solid rgb(215 215 215 / 50%);\n">\n          <div class="block" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;\ndisplay: flex;\nflex-direction: column;\nbackground-color: #fff;\nwidth: 16rem;\nheight: 8.5em;\nborder-radius: 0.31rem;\npadding: 2rem;\n">\n            <span style="font-size: 1.5rem;\nfont-weight: 700;\n">Gerador</span>\n            <span style="font-size: 1rem;\nfont-weight: 600;\ncolor: rgb(0,0,0,.5)">de códigos EAN13</span>\n            <span style="font-size: 2.75rem;\nfont-weight: 800;\nmargin-top: 1rem;\n">\n              <img style="opacity: .36;\n margin: 7px 0px;\n" src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/64/external-barcode-cyber-monday-xnimrodx-lineal-gradient-xnimrodx.png">\n            </span>\n          </div>\n\n          <div class="block2" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;\ndisplay: flex;\nbackground-color: #fff;\nwidth: 100%;\nheight: 8.5em;\nborder-radius: 0.31rem;\npadding: 2rem;\n">\n            <div class="inner-column-1" style="display: flex;\nflex-direction: row;\nflex: 1;\n">\n              <div class="eangen" style="pointer-events: all;\nbackground: rgb(52, 131, 250);\nborder-radius: 11px;\nwidth: fit-content;\nheight: fit-content;\ncursor: pointer;\ntransition: all 0.35s ease 0s;\ntransform: scale(1);\nmargin: 0em 0.7em 0em 0em;\n">\n                <img src="https://img.icons8.com/carbon-copy/100/ffffff/refresh-barcode.png" style="width: 6rem;\nmargin: 1em 0.5em;\n">\n              </div>\n              <div style="display: flex;\nflex-direction: column;\n">\n                <div style="display: flex;\nmargin-bottom: 7px;\n">\n                  <span class="codefield" style="pointer-events: all;\nfont-weight: 700;\ntext-align: left;\nfont-size: 1.35em;\npadding: 0.75em 1em;\nborder: 1px solid var(--mfy-main)54;\nborder-radius: 1em;\n">0000000000000</span>\n                </div>\n                <span style="font-size: 1rem;\nfont-weight: 400;\ncolor: rgb(0,0,0,.5);\npadding: 0em 0.5em;\n">Clique para gerar um novo código de barras</span>\n              </div>\n              <span id="snackbar" style="margin: 1.21em 0em;\n">Copiado!</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div id="close-track" style="position: relative;\n top: -44.5%;\n cursor: pointer;\n z-index: 1000;\n">\n      <img src="https://img.icons8.com/sf-regular/48/ffffff/close-window.png" style="width: 3.1rem;\n">\n    </div>\n  </div>\n',
  eawarning_mlenvios =
    '<li style=" font-size: 0.77em;\n padding: 1em 2em 1em 2em;\n background-color: #ebebeb;\n margin-right: 3.5em;\n margin-top: 0.35em;\n text-align: center;\n"> <b>Atenção:</b> Produto pode não ser aceito pelo Mercado Envios devido ao tamanho.</li>',
  btn =
    "Criado em: " +
    data_br +
    "  |  Há cerca de: " +
    dias +
    " dias <br /> <span id='mediabtn' class= ' andes-button--loud mfy-main-bg  andes-button ' style = 'margin-top: 0.35em;\nfont-size: 12px!important;\ndisplay:inline!important;\npadding-top: 1em;\npadding-bottom: 1em;\nposition: relative;\nz-index: 10;\nborder-radius:2rem;\n'> Média: " +
    media_vendas +
    ' vendas/mês </span><img style="float:left;\nmargin-right:0.35em;\nwidth:28%;\nmargin-top: 0.45em;\n" src="https://i.ibb.co/Y8mQ2MT/metrifylogo.png"><div id="plusf_wrap" class="hdn smooth transp" style=";\nfont-size:14px;\npadding: 1.35em;\nmargin: 0.7em 0em -2.35em 0em;\nwidth: 110%;\n"> <div id="plusf" style="margin-left: 0.5em;\n"> <img alt="icon" src="https://ci3.googleusercontent.com/proxy/4AHE0GSzeLFc0tuceXt2Hib-rWVbcK8yqriCrBnrQFdt3LpCrH-NA3nyDKu-IO-65xO2yjlS7rsjGiJWV6QunadzFZlJPWqeb2Shj_fYgwagdLoTOAljMen83VI1eloEUOdeZcR4Su7DrJRWooeRNOF5nZ2fJv2BE06zEE2uKHkiVrr1vOvtY78kR28=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-mail.png" style="float: left ;\n transform: translate(-2px, 0px) ;\n opacity: 21% ;\n padding-right: 0.31em ;\n "><span id="nofull" style=""><b>0</b> produtos no<svg xmlns="http://www.w3.org/2000/svg" class="logo-full" width="151" height="39" viewBox="0 0 151 39" data-reactroot="" style="width: 3.75em ;\n height: auto ;\n position: relative ;\n top: 0.2em ;\n padding: 0em 0em 0em 0.35em ;\n "><g fill= "#00A650" fill-rule= "evenodd"><path d="M9.577 0L0 22.286h15.962L9.577 39l25.54-25.071H19.153L28.732 0zM56.094 27.925h-6.931l5.924-24.38h19.706l-1.33 5.483H60.688l-.886 3.801h12.452l-1.33 5.483H58.433l-2.338 9.613zm33.718.439c-8.262 0-12.332-3.582-12.332-8.7 0-.402.12-1.242.202-1.608l3.546-14.51h7.052L84.774 17.91c-.04.183-.12.585-.12 1.023.04 2.01 1.732 3.948 5.158 3.948 3.707 0 5.601-2.12 6.286-4.971l3.507-14.365h7.012L103.11 18.02c-1.451 5.921-4.998 10.344-13.3 10.344zm36.014-.439h-17.732l5.924-24.38h6.932l-4.554 18.897h10.76l-1.33 5.483zm23.844 0h-17.732l5.924-24.38h6.932l-4.554 18.897H151l-1.33 5.483z"></path></g></svg><span style="margin-right: 0.35em;\nfont-size: 0.86em;\ncolor: #1ac54f!important;\nmargin-top: 0.14em;\n">  (top 50)</span><br><span id="nofull2" style="font-size: 0.92em;\n">- categoria: <b>?</b></span></span></div></div>',
  mlfee = "",
  mfyloader =
    '<mfyloader style="width: 5rem;\nheight: 5rem;\ndisplay: flex;\n">\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;\n background: rgb(255, 255, 255, 0);\n display: block;\n" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n<defs>\n<filter id="ldio-r0lbqrngywn-filter" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB">\n  <feGaussianBlur in="SourceGraphic" stdDeviation="2.4000000000000004"></feGaussianBlur>\n  <feComponentTransfer result="cutoff">\n    <feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1"></feFuncA>\n  </feComponentTransfer>\n</filter>\n</defs>\n<g filter="url(#ldio-r0lbqrngywn-filter)"><g transform="translate(50 50)">\n<g>\n<circle cx="17" cy="0" r="5" fill="#6252c5">\n  <animate attributeName="r" keyTimes="0;\n0.5;\n1" values="3.5999999999999996;\n8.399999999999999;\n3.5999999999999996" dur="4s" repeatCount="indefinite" begin="-0.25s"></animate>\n</circle>\n<animateTransform attributeName="transform" type="rotate" keyTimes="0;\n1" values="0;\n360" dur="4s" repeatCount="indefinite" begin="0s"></animateTransform>\n</g>\n</g><g transform="translate(50 50)">\n<g>\n<circle cx="17" cy="0" r="5" fill="#2a9fde">\n  <animate attributeName="r" keyTimes="0;\n0.5;\n1" values="3.5999999999999996;\n8.399999999999999;\n3.5999999999999996" dur="2s" repeatCount="indefinite" begin="-0.2s"></animate>\n</circle>\n<animateTransform attributeName="transform" type="rotate" keyTimes="0;\n1" values="0;\n360" dur="2s" repeatCount="indefinite" begin="-0.05s"></animateTransform>\n</g>\n</g><g transform="translate(50 50)">\n<g>\n<circle cx="17" cy="0" r="5" fill="#00d9ff">\n  <animate attributeName="r" keyTimes="0;\n0.5;\n1" values="3.5999999999999996;\n8.399999999999999;\n3.5999999999999996" dur="1.3333333333333333s" repeatCount="indefinite" begin="-0.15s"></animate>\n</circle>\n<animateTransform attributeName="transform" type="rotate" keyTimes="0;\n1" values="0;\n360" dur="1.3333333333333333s" repeatCount="indefinite" begin="-0.1s"></animateTransform>\n</g>\n</g><g transform="translate(50 50)">\n<g>\n<circle cx="17" cy="0" r="5" fill="#6e2aff">\n  <animate attributeName="r" keyTimes="0;\n0.5;\n1" values="3.5999999999999996;\n8.399999999999999;\n3.5999999999999996" dur="1s" repeatCount="indefinite" begin="-0.1s"></animate>\n</circle>\n<animateTransform attributeName="transform" type="rotate" keyTimes="0;\n1" values="0;\n360" dur="1s" repeatCount="indefinite" begin="-0.15s"></animateTransform>\n</g>\n</g><g transform="translate(50 50)">\n<g>\n<circle cx="17" cy="0" r="5" fill="#6252c5">\n  <animate attributeName="r" keyTimes="0;\n0.5;\n1" values="3.5999999999999996;\n8.399999999999999;\n3.5999999999999996" dur="0.8s" repeatCount="indefinite" begin="-0.05s"></animate>\n</circle>\n<animateTransform attributeName="transform" type="rotate" keyTimes="0;\n1" values="0;\n360" dur="0.8s" repeatCount="indefinite" begin="-0.2s"></animateTransform>\n</g>\n</g></g>\n</svg>\n</mfyloader>',
  eanotifytag =
    '<div style="background-color: var(--mfy-main);\nbackground-image: linear-gradient(to right, #003eba -42%, var(--mfy-main) 35%);\nwidth:2em;\nheight:2em;\nposition: absolute;\ntop: 2.7em;\nright: -1em;\ncursor: pointer;\nborder-right: 2px solid #2c4cff;\nborder-radius: 0px 5px 5px 0px;\nbox-shadow: 0.31em 0 0.35em -0.35em rgb(0 0 0);\n"><img src="https://img.icons8.com/fluent-systems-regular/48/ffffff/urgent-message.png" style="width: 2em;\npadding: 0.5em 0.35em;\nposition: relative;\ntop: -0.2em;\n"></div>',
  eameter =
    '<span id="eahealthmeter" style="z-index: 100;\nmargin: 0.31em 0.5em;\noverflow: hidden;\nalign-items: center;\ncolor: rgb(52, 131, 250);\nfont-weight: 700;\nfont-size: 1.31em;\nbackground-color: rgb(255, 255, 255);\npadding: 0.35em 0.55em 0.35em 0.5em;\nbox-shadow: rgba(0, 0, 0, 0.11) 0px 3px 6px, rgba(0, 0, 0, 0.1) 0px 3px 6px;\nborder-radius: 1em;\ndisplay: inline-flex;\nposition: relative;\nz-index: 999;\n"><img id="eametersvg" src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-speedometer-web-hosting-kmg-design-flat-kmg-design.png" style="width: 1em;\nmargin-right: 3px;\npointer-events: none;\n"><div id="earatewrapper" class="eameter"><span id="eameterRate">87</span><span style="font-size: 0.75em;\nopacity: 50%;\n">/100</span></div></span>',
  eameterModal =
    '<div id="eameter_modal" class="andes-tooltip andes-tooltip--light" style="margin-bottom: -2em;\nbox-shadow: rgb(0 0 0 / 21%) 0px 3px 6px;\nposition: relative;\ntop: -3em;\nopacity: 0;\ntransition: opacity 0.35s ease 0s;\nbackground-color: rgb(255, 255, 255);\nborder-radius: 0.35em;\ntext-align: left;\ndisplay: none;\nwidth: 13em;\npadding: 3em 1em 1em 1em;\n"><span style=" font-size: 1em;\n font-weight: 600;\n color: var(--mfy-main);\n">Saúde do Anúncio</span><br><span style=" font-size: 11px;\n font-weight: 600;\n position: relative;\n top: -0.7em;\n opacity: 50%;\n">Métrica criada pelo MercadoLivre</span><br><ul style=" display: flex;\n flex: auto;\n flex-flow: wrap;\n"><li id="eameter_li_specs" class="eameter_li">Descrição / especificações</li><li class="eameter_li" id="eameter_li_immediate_payment">Mercado Pago Ativo</li><li class="eameter_li" id="eameter_li_good_quality_picture">Imagens com boa qualidade</li><li id="eameter_li_loyalty_discount_eligible" class="eameter_li_off">Desconto por fidelidade</li><li class="eameter_li_off" id="eameter_li_brand_verified">Marca verificada</li><li class="eameter_li" id="eameter_li_cart_eligible">Aceita catálogo</li><li class="eameter_li_off" id="eameter_li_premium">Premium</li></ul><div style="margin-top: 1em;\nfont-size: 0.86em;\npadding: 1.35em 1em;\nfont-weight: 700;\nbackground-color: #ebebebad;\nborder-radius: 1em;\n"><span style=" color: #80808080;\n"> Sugestão:</span><span id="eameter_tips" style=" font-size: 0.86em;\n font-weight: 400;\n color: #3f3f3f;\n"> Este anúncio já está otimizado.</span></div><style>.eameter_li{text-align: center;\n background-color: rgb(52, 131, 250);\n color: rgb(255, 255, 255);\n margin-right: 0.1em;\n font-size: 10px;\n letter-spacing: 0.2px;\n font-weight: 100;\n border-radius: 1em;\n padding: 0.35em 0.5em;\n margin: 0.1em;\n}.eameter_li_off{text-align: center;\n background-color: rgb(229 229 229);\n color: rgb(146 146 146);\n margin-right: 0.1em;\n font-size: 10px;\n letter-spacing: 0.2px;\n font-weight: 100;\n border-radius: 1em;\n padding: 0.35em 0.75em;\n margin: 0.1em;\n}.eameter_li_off::before{content: "x ";\n✔}.eameter_li::before{content: "✔ ";\n}</style></div>',
  eafollow_ad =
    '<br><span id="eafollow_ad" class="eafollow_ad"><img class="eafollow_img" src="https://img.icons8.com/cotton/64/000000/private-wall-mount-camera.png"></span>',
  eamoretools =
    '<span id="eamoretools" class="eatoolboxicon"><img id="eatoolsicon" src="https://img.icons8.com/fluency-systems-filled/48/c7c7c7/chevron-up--v2.png" style="pointer-events: none;\nwidth: 1.11em;\ntransform: rotate(180deg);\nmargin: 1px;\ntransition: all 0.2s;\nopacity: .35;\n"></span>',
  eatoolbox =
    '<span id="eatoolbox"> <span class="eatoolboxbar">',
  eatoolbox_close = "</span></span>",
  eafollow_url = "https://www.metrify.com.br/seguir-anuncio/",
  eagrossrev =
    '<span id="eagrossrev"><div><img src="https://img.icons8.com/windows/32/c7c7c7/old-cash-register.png" style="width: 1.5em;\nheight: 1.5em;\nposition: relative;\ntop: 0.21em;\nmargin-right: 0.5em;\n"><span style="font-size: 0.92em;\nfont-weight: 900;\n"><span class="eahiddenlabel2 revtitle">Faturando:</span> <span class="eagrossrev-title" style="font-size: 1.35em;\n">R$0,00</span><span class="revtitle">/mês</span></span></div> <div class="earevstats"><span style="font-size: 11px;\n" class="ui-pdp-review__amount" id="mfy_rev_estimate">Média de faturamento estimada. </span><br><button class="andes-button--loud mfy-main-bg  revbtn1" style="padding: 0.1em 0.5em;\nborder-radius: 5px;\nmargin: 2px;\n">1 Dia</button><button class="andes-button--loud mfy-main-bg  revbtn7" style="padding: 0.1em 0.5em;\nborder-radius: 5px;\nmargin: 2px;\n">7 Dias</button><button class="andes-button--loud mfy-main-bg  revbtn30" style="padding: 0.1em 0.5em;\nborder-radius: 5px;\nmargin: 2px;\n">30 dias</button><button class="andes-button--loud mfy-main-bg  revbtn60" style="padding: 0.1em 0.5em;\nborder-radius: 5px;\nmargin: 2px;\n">60 dias</button><button class="andes-button--loud mfy-main-bg  revbtn90" style="padding: 0.1em 0.5em;\nborder-radius: 5px;\nmargin: 2px;\n">90 dias</button><button class="andes-button--loud mfy-main-bg  revbtntotal" style="padding: 0.1em 0.5em;\nborder-radius: 5px;\nmargin: 2px;\n">Total</button></div> </span>',
  ranksearch =
    '<span id="eaadvsearchBtn"><img src="https://img.icons8.com/material-rounded/24/3f8afe/search-property.png" style="width: 1.5em;\nheight: 1.5em;\nposition: relative;\ntop: 0.21em;\nmargin-right: 0.5em;\n"><span class="eahiddenlabel"> Ranking por palavra-chave</span></span>',
  easwitchoff =
    '<span id="eaoffSwitch" ><img src="https://img.icons8.com/external-gradak-royyan-wijaya/24/3f8afe/external-interface-gradak-interface-gradak-royyan-wijaya-5.png" style="width: 1.5em;\nheight: 1.5em;\nposition: relative;\ntop: 0.21em;\nmargin-right: 0.5em;\n"><span class="eahiddenlabel"> Desligar Análises</span></span>',
  analytics_ui =
    eagrossrev +
    eamoretools +
    eatoolbox +
    eameter +
    ranksearch +
    easwitchoff +
    eatoolbox_close +
    eameterModal +
    ' <span id="eaadvsearchForm" style="position: relative;\ntop: 2.7em;\nz-index: 0;\n"> <input type="text" class="nav-search-input" name="as_word" placeholder="Posição deste anúncio (busca)" maxlength="120" autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="off" tabindex="3" style=" width: 100%;\n"><button class="nav-search-btn" tabindex="4" style=" position: relative;\n top: -1.75em;\n background-color: #ebebeb;\n right: -12.7em;\n border-radius: 0em 0.31em 0.31em 0em;\n"><div role="img" aria-label="Buscar" class="nav-icon-search"></div></button> </span> <br> <span id="eaadvsearchResult" style="display: none;\nposition: relative;\ntop: 0.5em;\n"> <span style="color: #333333;\ndisplay: block;\nfont-weight: bold;\nposition: relative;\ntop: -0.77em;\npadding: 1em 0.5em 0.7em 0.5em;\nborder: 1px solid #ebebeb;\n"><img src="https://img.icons8.com/material-rounded/24/7e7e7e/search-property.png" style="width: 1.27em;\nposition: relative;\ntop: 0.27em;\nopacity: 0.5;\n"> <earesult> - | - <span style=" font-size: 0.7em;\n color: #00000050;\n letter-spacing: 0.035em;\n padding: 0.35em 0.75em;\n background-color: #ebebeb;\n border-radius: 1em;\n">"-"</span></earesult> </span></span>',
  btn_preco =
    '<div id="preco-btn" class="andes-button andes-button--loud mfy-main-bg  pricebtn" style="width: 3em;\nheight: 3em;\nmargin-top: 1em;\nmargin-right: 0.5em;\npadding:0.5em 0.1em 1em 0.1em;\nborder-radius: 3.5em;\n"><img id="preco-img" style="width:50%;\n" src="https://img.icons8.com/ios-glyphs/30/ffffff/estimate.png"/></div>',
  price_tool = "",
  condicao_produto = "",
  preco_Local = "",
  categoria_Local = "",
  tipo_anuncio = "",
  nomeCategoria = "",
  rad_btn = "",
  eapricewarning = !1;


function pricingWarning() {
  if (1 == eapricewarning) {
    let e = document.getElementById("vermais");
    e.innerHTML =
      'Ver mais detalhes <img src="https://img.icons8.com/officexs/16/000000/warning-shield.png" style="margin-left: 0.35em;">';
    e.setAttribute(
      "style",
      "float: right; margin: 1em 6em 0em 0em; display: flex; align-items: center;"
    );
  }
}

function media_ponderada(e) {
  var t = [],
    n = [],
    a = 0,
    i = 0;

  if (e.length % 3 != 0) throw new Error("Não foi possível calcular média.");

  for (let a = 0; a < e.length; a += 3) t.push(e[a] * e[a + 1]), n.push(e[a + 2]);

  for (let e = 0; e < t.length; e += 1) (a += t[e] * n[e]), (i += t[e]);

  return a / i;
}

var comprador = "",
  vendedor = "",
  usuario_base = comprador;

function verifDimensions(e) {
  if (e) {
    let t = [];
    for (let n = 0; n < e?.length; n++)
      "PACKAGE_HEIGHT" == e[n].id
        ? (t[0] = e[n].value_struct?.number)
        : "PACKAGE_WIDTH" == e[n].id
        ? (t[1] = e[n].value_struct?.number)
        : "PACKAGE_LENGTH" == e[n].id
        ? (t[2] = e[n].value_struct?.number)
        : "PACKAGE_WEIGHT" == e[n].id && (t[3] = e[n].value_struct?.number);
    t.length > 3 &&
      (checkeddimensions =
        "dimensions=" +
        Math.ceil(t[0]) +
        "x" +
        Math.ceil(t[1]) +
        "x" +
        Math.ceil(t[2]) +
        "," +
        Math.ceil(t[3]));
  }
}

function dLayerMainFallback() {
  NaN === preco_Local &&
    (preco_Local = parseFloat(catalogData[0].body.price)),
    null == comprador &&
      (comprador = document.documentElement.innerHTML
        .split("user_id")[1]
        .split(",")[0]
        .split(":")[1]),
    null == tipo_anuncio &&
      (tipo_anuncio =
        null == melidata.q
          ? document.documentElement.innerHTML
              .split("listing_type_id")[1]
              .split('"')[2]
          : catalogData[0].body.listing_type_id);
}

function dlayerFallback() {
  (dLayerAlt = catalogData[0].body.date_created ?? dataLayer[0].startTime),
    (vendasAlt = catalogData[0].body.sold_quantity),
    0 == vendas.length &&
      (vendas =
        vendasAlt ||
        (() => {
          const e =
            document.getElementsByClassName("ui-pdp-header__subtitle")[0];
          if (!e) return vendas;
          let t = e.innerHTML.split(" | ")[1]?.split(" vendidos")[0]?.trim();
          return t
            ? (t.endsWith("mil") &&
                (t = 1e3 * parseFloat(t.replace("mil", ""))),
              parseFloat(t) || vendas)
            : vendas;
        })()),
    (dLayer = dLayerAlt?.split("T")[0]),
    (data_br = "" == data_br ? dLayer?.split("-").reverse().join("/") : data_br),
    (dataMilisec = Date.parse(dLayer)),
    (eadiff = eanow - dataMilisec),
    "" == dias &&
      (dias = Math.round(eadiff / (8.64 * Math.pow(10, 7)))),
    "" == media_vendas &&
      (media_vendas = isNaN(Math.round(vendas / (dias / 30)))
        ? "Indisponível"
        : Math.round(vendas / (dias / 30))),
    0 == dias ? (media_vendas = "0") : dias < 30 && (alert_media_vendas = !0),
    dLayerMainFallback();
}

function altContentScpt() {
  (spot0 = document.getElementsByClassName("ui-pdp-header")),
    spot0[0].insertAdjacentHTML(
      "afterbegin",
      '<span id="eaoffSwitch" style="top: 0em; left: 0em; background-color:rgb(52, 131, 250); color:#fff;"><img src="https://img.icons8.com/external-gradak-royyan-wijaya/24/3f8afe/external-interface-gradak-interface-gradak-royyan-wijaya-5.png" style="width: 1.5em; height: 1.5em; position: relative; top: 0.21em; margin-right: 0.5em; filter: brightness(5); transform: scaleX(-1);"><span class="eahiddenlabel"> Ligar Análises</span></span>'
    );
  let e = document.getElementById("eaoffSwitch");
  e.addEventListener("click", function (t) {
    (e.lastChild.innerText = " Desligar Análises"),
      (e.firstChild.style.filter = "brightness(1)"),
      (e.firstChild.style.transform = "scaleX(1)"),
      e.setAttribute("style", "top: 0em; left: 0em;"),
      (localSwitchState = eadataRetrieve("eaActive")),
      null === localSwitchState && (localSwitchState = !0),
      eadataStore("eaActive", !localSwitchState, TTL1),
      setTimeout(function () {
        window.location.reload();
      }, 500);
  });
}

function parseSalesText(e) {
  let t = e?.split(" | ")[1]?.split(" "),
    n = "",
    a = 0;
  if (t) {
    for (let e = 0; e < t?.length; e++)
      if (t[e].trim().length > 0) {
        n = t[e];
        break;
      }
  } else n = "0";
  if (n) {
    const e = n.match(/^[+]?(\d+)(mil)?/i);
    a = e ? parseInt(e[1], 10) * (e[2] ? 1e3 : 1) : 0;
  }
  return { salesText: n, thisItemSales: a };
}

async function fetchProductDataFromPage(e, t) {
  let n = document.getElementsByClassName("ui-pdp-header");
  n.length > 0 &&
    n[0].insertAdjacentHTML("afterbegin", buildMainComponentSkeleton());

  if (((iscatalog = !0),
    itemsLocalData[e] ||
      (document.dispatchEvent(
        new CustomEvent("GetProductData", { detail: { itemIds: [e] } })
      ),
      await new Promise((e) => setTimeout(e, 100)))),
    itemsLocalData[e] &&
      itemsLocalData[e].startTime &&void 0 !== itemsLocalData[e].itemSales) {
    const n = itemsLocalData[e];
    (vendas = n.itemSales),
      n.startTime &&
        ((dataLayer[0] = dataLayer[0] || {}), (dataLayer[0].startTime = n.startTime));
    let a = document.getElementsByClassName("ui-pdp-subtitle")[0];
    if (a && vendas > 0) {
      let e = a.innerHTML;
      (a.parentElement.style.margin = "1rem 0"),
        (a.innerHTML =
          e +
          ' (no catálogo)<br><strong style="font-weight: 900; color: var(--mfy-main);">' +
          vendas +
          ' vendas</strong><span style="font-size: 0.77em; position: relative; top: -0.1em;"> (deste modelo &amp; vendedor)</span>'),
        a.setAttribute("sales", vendas);
    }
    t();
  } else {
    const n = `https://produto.mercadolivre.com.br/MLB-${e.split("MLB")[1]}`;
    try {
      scrapeForScripts(
        e,
        n,
        !0,
        (function (n, a) {
          if (a) t();
          else
            try {
              let a,
                i,
                s = n || [],
                o = 0;
              if (s.length > 0) {
                let n = null,
                  r = null,
                  l = !1;
                for (let t of s) {
                  let s = t;
                  if (t.includes("<script")) {
                    const e = /<script\b[^>]*>([\s\S]*?)<\/script>/i.exec(t);
                    s = e ? e[1] : "";
                  }
                  if (
                    s &&
                    (s.indexOf("initialState") > -1 ||
                      s.indexOf("pageState") > -1)
                  ) {
                    let t = s.match(/w\[l\]\.push\((.*)\)/);
                    if (t && t.length > 1)
                      try {
                        (n = JSON.parse(t[0].split("(")[1].split(")")[0])),
                          n && (dataLayer[0] = n);
                      } catch (e) {
                        if (s.startsWith('{"pageState":'))
                          try {
                            (n = JSON.parse(s)),
                              n.initialState || (n = n.pageState),
                              (dataLayer[0] = n);
                          } catch (e) {}
                      }
                    let d = null,
                      m = s.match(
                        /window\.__PRELOADED_STATE__\s*=\s*(\{.*\});\n/
                      );
                    if (m && m[1])
                      try {
                        (d = JSON.parse(m[1])), (l = !0);
                      } catch (e) {}
                    if (!d)
                      try {
                        (d = JSON.parse(s)), (l = !0);
                      } catch (e) {}
                    if (d) {
                      (r = d.pageState.initialState || d.initialState),
                        (t =
                          r?.components?.header?.subtitle ?? ""),
                        (i =
                          r?.startTime ??
                          r?.components?.track?.gtm_event?.startTime);
                      let n = t?.split(" | ")[1]?.split(" "),
                        s = "";
                      if (n) {
                        for (let e = 0; e < n?.length; e++)
                          if (n[e].trim().length > 0) {
                            s = n[e];
                            break;
                          }
                      } else s = "0";
                      if (t) {
                        const t = s.match(/^[+]?(\d+)(mil)?/i);
                        (a = t
                          ? parseInt(t[1], 10) * (t[2] ? 1e3 : 1)
                          : 0),
                          i &&
                            ((o = dayjs().diff(i, "day")
                              ? dayjs().diff(i, "day")
                              : 0),
                            o++,
                            ((a >= 100 && o > 30) ||
                              (a < 100 && o >= 90) ||
                              (a < 5 && o > 45)) &&
                              document.dispatchEvent(
                                new CustomEvent("StoreProductData", {
                                  detail: { itemId: e, startTime: i, itemSales: a },
                                })
                              ));
                      }
                      if (l) break;
                    }
                  }
                }
              }
              if (o > 0 && null != a) {
                (vendas = a),
                  (dias = o),
                  (data_br = dayjs(i).locale("pt-br").format("DD/MM/YYYY")),
                  (media_vendas = isNaN(Math.round(vendas / (dias / 30)))
                    ? "-"
                    : Math.round(vendas / (dias / 30)));
                let e = document.getElementsByClassName("ui-pdp-subtitle")[0];
                if (e) {
                  let t = e.innerHTML;
                  (e.parentElement.style.margin = "1rem 0"),
                    (e.innerHTML =
                      t +
                      ' (no catálogo)<br><strong style="font-weight: 900; color: var(--mfy-main);">' +
                      vendas +
                      ' vendas</strong><span style="font-size: 0.77em; position: relative; top: -0.1em;"> (deste modelo &amp; vendedor)</span>'),
                    e.setAttribute("sales", vendas);
                }
                let t = document.getElementById("mediabtn");
                if (t && dias > 0) {
                  let e =
                      '<span class="mfy-info-icon_catalog-sales" style="margin: 0 -0.75rem 0 0.75rem; cursor:pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></span>',
                    n = `<div class="mfy-catalog-info-tooltip" style="pointer-events: none; display: flex; align-items:center; justify-content:center; cursor-events: none; position: absolute; bottom: 35px; left: -15rem; background-color: var(--mfy-main); padding: 0 1rem; z-index: 1000; color: white; border-radius: 0.5rem 0.5rem 0 0.5rem; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.51); width: fit-content; transition: opacity 0.4s ease-in-out; opacity: 0;">
                <div style="font-size: 0.85em; margin-right:.5rem; display:flex; align-items:center; justify-content:center; gap:0.85rem;">
                  ${e}
                  <span style="line-height: 1.1rem; text-align: start; padding: 0 0 0 1rem;">
                    Média de vendas apenas do anúncio vencedor atual deste catálogo.
                  </span>
                </div>
              </div>`;
                  t.innerHTML =
                    (isNaN(Math.round(vendas / (dias / 30)))
                      ? "-"
                      : Math.round(vendas / (dias / 30))) +
                    " vendas/mês" +
                    e +
                    n;
                  let a = document.getElementsByClassName(
                    "mfy-catalog-info-tooltip"
                  )[0];
                  a &&
                    (t.addEventListener("mouseover", function () {
                      a.style.opacity = 1;
                    }),
                    t.addEventListener("mouseout", function () {
                      a.style.opacity = 0;
                    }));
                }
              }
              l && t();
            } catch (e) {
              t();
            }
        }),
        !1,
        mfyProxy
      );
    } catch (e) {}
  }
}

function buildMainComponentSkeleton() {
  return `
   <div id="main-component-skeleton" style="font-family: Proxima Nova, -apple-system, Roboto, Arial, sans-serif; color: #333;">
      <style>
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          color: transparent;
          border-radius: 4px;
        }
        .skeleton-pill {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          color: transparent;
          border-radius: 4px;
          border-radius: 16px;
        }
      </style>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0 2rem 0 0;">
        <div style="display: flex; align-items: center;">
          <div style="width: 40px; height: 40px; background-color: var(--mfy-main); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width: 1.35em; margin: auto;">
          </div>
          <div>
            <div style="font-size: 15px;"><span class="skeleton">30884</span> Visitas totais</div>
            <div class="skeleton-pill" style="font-size: 14px; padding: 4px 12px; margin-top: 4px; display: inline-block;">Conversão: 3.2%</div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 14px;">Vende a cada:</div>
          <div style="font-size: 16px; font-weight: bold; color: var(--mfy-main);"><span class="skeleton">000</span> Visitas</div>
        </div>
      </div>

      <div style="display: flex; align-items: center; ju; justify-content: space-around; margin-bottom: 1.5rem; box-shadow: rgb(0 0 0 / 11%) 0 3px 6px, rgb(0 0 0 / 10%) 0 3px 6px; color: rgb(90, 90, 90); font-weight: 400; font-size: .91em; border-radius: 16px; padding: 8px 16px;">
        <img src="https://img.icons8.com/windows/32/c7c7c7/old-cash-register.png" style="width: 1.5em; height: 1.5em; position: relative; top: 0.21em; margin-right: 0.5em;">
        <div style="font-size: 1.1em; font-weight: 900; width: -webkit-fill-available;">Faturando: <strong style="font-size: 15px;"><span class="skeleton">R$ 1.932,56</span>/mês</strong></div>
        <div style="min-width: 32px; height: 32px; border-radius: 50%; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="font-size: 0.95rem; font-weight: 700; display: inline-flex; border-radius: 1em; color: rgb(90, 90, 90); box-shadow: rgb(0, 0, 0) 0px 2px 11px -7px; padding: 0.35em 1em; position: relative; transition: 0.35s; min-width: fit-content;">
          Criado há: <span class="skeleton">520</span> dia(s)
        </div>
        <div class="skeleton-pill" style="background-color: #3483fa; color: transparent; padding: 10px 20px; font-size: 16px; font-weight: bold;">
          Média: 58 vendas/mês
        </div>
      </div>
    </div>
  `;
}

async function altInfo(e) {
  function t() {
    let e = document.getElementById("main-component-skeleton");
    if (
      (e && e.remove(),
      verifDimensions(catalogData[0]?.body.attributes),
      dlayerFallback(),
      dLayerMainFallback(),
      "anuncio" == paginaAtual)
    ) {
      let e = eadataRetrieve("eaActive");
      null === e && (e = !0), e ? contentScpt() : altContentScpt();
    } else contentScpt();
  }
  dataLayer[0]?.catalogProductId || "vip" != altPreloadedState.pageState.page
    ? await fetchProductDataFromPage(e, t)
    : t();
}

function askPermissions(e, t) {
  if (t == null) t = !1;

  let n = "";
  let a = "";

  if (e != null) {
    n = `
      <div id="modal-permission" style="" aria-hidden="false" class="is-open">
        <div style="position: fixed; top: 11vh; left: 29vw; z-index: 10000000000; align-content: center; align-items: center;">
          <div style="display: flex; justify-content: center; margin-right: 1em;">
            <img src="https://i.ibb.co/NV9yg3y/icon-white.png" style="max-width: 4vw;">
          </div>
          <br>
          <div style="text-align: center; padding: 1em 3.5em 3.1em 3.5em; width: 35vw; height: 46vh; background-color: #f1f2f3; margin: 1em 4em 0em 3.1em; border-radius: 0.7em;">
            <lottie-player
              src="https://assets8.lottiefiles.com/private_files/lf30_gtudsjto.json"
              background="transparent"
              speed="1"
              style="width: 200px; height: 200px; margin: auto; margin-bottom: -2em;"
              loop
              autoplay
            ></lottie-player>
            <span style="font-size: 2.1em; font-weight: 700; color: var(--mfy-main); line-height: 1em; letter-spacing: -0.05em;">
              Ok, vamos autorizar esta conta.
            </span>
            <br>
            <span style="font-weight: 200;">
              <div style="text-align: center; font-size: 0.92em; padding: 1.35em 2em 1em 2em; background-color: #ebebeb; margin: 1em 0em; font-weight: 900;">
                Seu e-email no Mercado Livre:
                <br>
                <span style="font-size: 1.7em; color: var(--mfy-main);">${e}</span>
              </div>
              <span style="font-weight: 400; color: gray; font-size: 0.85em;">
                Autorize o app para utilizá-lo em sua conta do Mercado Livre acima.
                <b style="font-weight: bolder;">OBS.: Evite refazer esse processo.</b>
              </span>
              <a href="https://bit.ly/metrify-ext-conectar">
                <div
                  style="color: #fff; background-color: #4a90f9; padding: 1.11em 2em; margin-top: 1em; font-size: 1.21em; font-weight: 900; text-transform: uppercase; letter-spacing: 0.035em; border-radius: 4em; cursor: pointer;"
                >
                  Clique para autorizar
                </div>
              </a>
            </span>
          </div>
        </div>
        <div
          id="eafollow_bg"
          style="background-color: #000c20d6 !important; position: absolute; z-index: 100000000; width: 100vw; height: 10000vh; overflow: hidden; color: rgb(0,0,0,0); backdrop-filter: blur(7px);"
        ></div>
      </div>
    `;

    a = `
      <div
        class="auth-alert"
        style="color: var(--mfy-main); font-weight: 700; position: absolute; background-color: #f1f4ffb0; padding: 1.1em 0em 0em 0em; width: 21vw; height: 275px; z-index: 1000; backdrop-filter: blur(4px); right: 11em; top: 7em; border-radius: 11px 0px 11px 11px; line-height: 1.35em!important; text-align: center; box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 1px 10px 4px -7px rgb(0 0 0 / 35%); transition: 0.35s all;"
      >
        <div class="auth-step1" style=" /* display: none; */ ">
          <lottie-player
            src="https://assets8.lottiefiles.com/private_files/lf30_gtudsjto.json"
            background="transparent"
            speed="1"
            style="width: 100px; height: 100px; margin: auto; margin-bottom: -0.35em;"
            loop
            autoplay
          ></lottie-player>
          <div style="margin: auto; max-width: 70%; margin-top: -1rem;">
            <span style="font-size: 1.21em;">Já autorizou o uso do Metrify em sua conta?</span>
          </div>
          <span style="font-size: 0.86em; font-weight: 400;">Para continuar a usá-lo, clique abaixo:</span>
          <br>
          <div
            class="eaauth-check"
            style="background-color: var(--mfy-main); font-size: 1.15em; font-weight: 900; color: #fff; padding: 1em; width: 77%; margin: auto; letter-spacing: 0.035em; border-radius: 4em; cursor: pointer; position: relative; top: 0.35em;"
          >
            Sim, já autorizei.
          </div>
          <br>
          <div
            class="eaauth-pop"
            style="background-color: #4a70a8; font-size: 1.1em; font-weight: 900; color: #fff; padding: 0.7em; width: 77%; margin: auto; letter-spacing: 0.035em; border-radius: 4em; cursor: pointer; position: relative; /* top: 0.35em; */"
          >
            Ainda não autorizei
          </div>
        </div>

        <div class="auth-step2" style="opacity: 0%; transition: 0.7s all; display: none;">
          <lottie-player
            src="https://assets8.lottiefiles.com/private_files/lf30_gtudsjto.json"
            background="transparent"
            speed="1"
            style="width: 70px; height: 70px; margin: auto; margin-bottom: 0.75em; margin-top: 1em;"
            loop
            autoplay
          ></lottie-player>
          <span style="font-size: 2em;">Verificando...</span>
          <br>
          <span style="font-size: 0.86em; font-weight: 400;">Atualizando informações...</span>
        </div>

        <div class="auth-step3" style="opacity: 0%; transition: 0.7s all;">
          <lottie-player
            autoplay
            loop
            style="width: 70px; height: 70px; margin: auto; margin-bottom: 0.75em; margin-top: 1em;"
            speed="1"
            background="rgba(0, 0, 0, 0)"
            src="https://assets4.lottiefiles.com/packages/lf20_b8rtfk3s.json"
          ></lottie-player>
          <span style="font-size: 1.7em; padding: 0em 0.5em; display: flex; line-height: 1em; margin: -0.5em 0em -0.5em 0em;">
            Que pena... Não encontramos uma autorização válida.
          </span>
          <br>
          <span style="font-size: 0.86em; font-weight: 400; margin-bottom: 0.75em;">
            Clique abaixo para liberar o Metrify.
          </span>
          <br>
          <div
            class="eaauth-pop2"
            style="background-color: var(--mfy-main); font-size: 1.15em; font-weight: 900; color: #fff; padding: 1em; width: 77%; margin: auto; letter-spacing: 0.035em; border-radius: 4em; cursor: pointer; position: relative; top: 0.75em;"
          >
            Autorizar Metrify
          </div>
        </div>

        <div class="auth-step4" style="opacity: 0; transition: all 0.7s ease 0s; display: none;">
          <lottie-player
            autoplay
            loop
            style="width: 70px; height: 70px; margin: auto; margin-bottom: 0.75em; margin-top: 1em;"
            speed="1"
            background="transparent"
            src="https://assets7.lottiefiles.com/packages/lf20_94HTw9.json"
          ></lottie-player>
          <span style="font-size: 1.7em;">Autorização encontrada.</span>
          <br>
          <span style="font-size: 0.86em; font-weight: 400; margin-bottom: 0.75em;">Atualize a página.</span>
          <br>
          <div
            class="eaauth-pop4"
            style="background-color: var(--mfy-main); font-size: 1.15em; font-weight: 900; color: #fff; padding: 1em; width: 77%; margin: auto; letter-spacing: 0.035em; border-radius: 4em; cursor: pointer; position: relative; top: 0.75em;"
          >
            Atualizar página
          </div>
        </div>
      </div>
    `;

    if (t) {
      document.getElementsByClassName("auth-alert")[0].style.display = "none";
      document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", n);
      document.getElementsByClassName("eaauth_title")[0].innerText = "Atualize a sua autorização.";
    } else {
      document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", a);

      (function () {
        let e = document.getElementsByClassName("auth-alert")[0];
        let t = document.getElementsByClassName("auth-step1")[0];
        let a = document.getElementsByClassName("auth-step2")[0];
        let i = document.getElementsByClassName("eaauth-pop")[0];

        document
          .getElementsByClassName("eaauth-check")[0]
          .addEventListener("click", function () {
            e.style.height = "175px";
            t.style.display = "none";
            a.style.display = "block";
            a.style.opacity = "100%";
            findfreshAuth(usuario_logado);
          });

        i.addEventListener("click", function () {
          e.style.display = "none";
          document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", n);
        });
      })();
    }
  }
}


async function getnewToken(e){var t=new Headers;

    t.append("accept","application/json"),
    t.append("content-type","application/x-www-form-urlencoded"),
    fetch("https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=323521671107951&client_secret=FbKILwMpPIa89q6lYd59yA5wJrPK2noN&refresh_token="+e,
        {method:"POST",headers:t,redirect:"follow"})
        .then((e=>e.json()))
        .then((e=>{400!=e.status?appendToken(e.access_token):findPermission()}))
        .catch((e=>{}))}

function confirmAuth(e, t) {
  const n = `
    <div id="modal-permission" style="" aria-hidden="false" class="is-open">
      <div style="position: fixed; top: 11vh; left: 29vw; z-index: 10000000000; align-content: center; align-items: center;">
        <div style="display: flex; justify-content: center; margin-right: 1em;">
          <img src="https://i.ibb.co/NV9yg3y/icon-white.png" style="max-width: 4vw;">
        </div>
        <br>
        <div
          style="text-align: center; padding: 1em 3.5em 3.1em 3.5em; width: 35vw; height: 46vh; background-color: #f1f2f3; margin: 1em 4em 0em 3.1em; border-radius: 0.7em;"
        >
          <lottie-player
            src="https://assets8.lottiefiles.com/private_files/lf30_gtudsjto.json"
            background="transparent"
            speed="1"
            style="width: 200px; height: 200px; margin: auto; margin-bottom: -2em;"
            loop
            autoplay
          ></lottie-player>

          <span style="font-size: 2.1em; font-weight: 700; color: var(--mfy-main); line-height: 1em; letter-spacing: -0.05em;">
            Ok, vamos autorizar esta conta.
          </span>
          <br>

          <span style="font-weight: 200;">
            <div
              style="text-align: center; font-size: 0.92em; padding: 1.35em 2em 1em 2em; background-color: #ebebeb; margin: 1em 0em; font-weight: 900;"
            >
              Seu e-email no Mercado Livre:
              <br />
              <span style="font-size: 1.7em; color: var(--mfy-main);">${usuario_logado}</span>
            </div>

            <span style="font-weight: 400; color: gray; font-size: 0.85em;">
              Autorize o app para utilizá-lo em sua conta do Mercado Livre acima.
              <b style="font-weight: bolder;">OBS.: Evite refazer esse processo.</b>
            </span>

            <a href="https://bit.ly/metrify-ext-conectar">
              <div
                style="color: #fff; background-color: #4a90f9; padding: 1.11em 2em; margin-top: 1em; font-size: 1.21em; font-weight: 900; text-transform: uppercase; letter-spacing: 0.035em; border-radius: 4em; cursor: pointer;"
              >
                Clique para autorizar
              </div>
            </a>
          </span>
        </div>
      </div>

      <div
        id="eafollow_bg"
        style="background-color: #000c20d6 !important; position: absolute; z-index: 100000000; width: 100vw; height: 10000vh; overflow: hidden; color: rgb(0,0,0,0); backdrop-filter: blur(7px);"
      ></div>
    </div>
  `;

  if (e) {
    // Tentativa de renovar via refresh_token
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("content-type", "application/x-www-form-urlencoded");

    fetch(
      `https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=323521671107951&client_secret=FbKILwMpPIa89q6lYd59yA5wJrPK2noN&refresh_token=${t}`,
      { method: "POST", headers, redirect: "follow" }
    )
      .then((r) => r.json())
      .then((r) => {
        if (r.status !== 400) {
          appendToken(r.access_token);

          const alertBox = document.getElementsByClassName("auth-alert")[0];
          const step2 = document.getElementsByClassName("auth-step2")[0];
          const step3 = document.getElementsByClassName("auth-step3")[0];
          const step4 = document.getElementsByClassName("auth-step4")[0];

          alertBox.style.height = "235px";
          step3.style.display = "none";
          step2.style.display = "none";
          step4.style.display = "block";
          step4.style.opacity = "100%";

          document
            .getElementsByClassName("eaauth-pop4")[0]
            .addEventListener("click", function () {
              document.location.reload(true);
            });
        } else {
          askPermissions(usuario_logado, true);
        }
      })
      .catch(() => {});
  } else {
    // Sem autorização válida
    const alertBox = document.getElementsByClassName("auth-alert")[0];
    const step2 = document.getElementsByClassName("auth-step2")[0];
    const step3 = document.getElementsByClassName("auth-step3")[0];
    const goBtn = document.getElementsByClassName("eaauth-pop2")[0];

    alertBox.style.height = "275px";
    step2.style.display = "none";
    step3.style.display = "block";
    step3.style.opacity = "100%";

    goBtn.addEventListener("click", function () {
      alertBox.style.display = "none";
      document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", n);
    });
  }
}

function checkrefresh() {
  const e = parseJwt(mfy_userdata?.token)?.token;
  if (e && e !== "") {
    eadataStore("ealocalrst", null, TTL3);
    setTimeout(function () {
      document.location.reload(true);
    }, 1500);
  } else {
    confirmAuth(false);
  }
}

async function checkDatalayer() {
  askPermissions(usuario_logado);
}
async function findPermission() {
  checkDatalayer();
}

function requestData(url, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      method = "GET",
      body,
      headers,
      cache,
      responseEvent,
    } = options;

    const respEvent = responseEvent || `Response_${method}_${Date.now()}_${Math.random()}`;

    // Normalize headers to plain object
    const hdrs = {};
    if (headers instanceof Headers) {
      headers.forEach((v, k) => (hdrs[k] = v));
    } else {
      Object.assign(hdrs, headers);
    }

    const detail = {
      type: "REQUEST_DATA",
      responseEvent: respEvent,
      payload: { url, method, body, headers: hdrs, cache },
    };

    const handler = (evt) => {
      document.removeEventListener(respEvent, handler);
      if (evt.detail.success) resolve(evt.detail.data);
      else reject(new Error(evt.detail.error));
    };

    document.addEventListener(respEvent, handler);
    document.dispatchEvent(new CustomEvent("RequestDataEvent", { detail }));
  });
}

function getMLinfo() {
  if (paginaAtual == "anuncio") {
    if (dataLayer) {
      item_ID = dataLayer[0]?.itemId;
      altInfo(item_ID);
    }
  } else if (paginaAtual == "lista") {
    runOnList();
  } else if (paginaAtual == "painel" && verif == "pro" && window.location.href.indexOf("hub") >= 0) {
    const qs = window.location.search;
    new URLSearchParams(qs);

    const t = setInterval(function () {
      if (document.getElementsByClassName("andes-form-control__label")[0] != null) {
        const labels = document.getElementsByClassName("andes-form-control__label");
        const varLabels = document.getElementsByClassName("sc-ui-variations__field-label");

        // Campo principal
        for (let idx = 0; idx < labels.length; idx++) {
          if (labels[idx].innerHTML == "Código universal de produto") {
            const block = `
              <div class="eangen"
                   style="padding: 0em 0.5em; background: var(--mfy-main); border-radius: 1em; margin: 1.5em 1em; width: 5em; height: 5em; text-align: center; cursor: pointer; transition: all 0.35s; transform: scale(1);">
                <div style="width: 2.1em; height: 2em; margin-bottom: -2em; background-color: var(--mfy-main); position: relative; top: -1em; left: -1.1em; display: flex; border-radius: 10em;">
                  <img src="https://i.ibb.co/7tHHPPY/icon-color.png"
                       style="pointer-events:none; width:15px; margin: auto; filter: brightness(7.5);">
                </div>
                <img src="https://img.icons8.com/carbon-copy/100/ffffff/refresh-barcode.png"
                     style="margin: auto; width: 100%; margin-bottom: -0.5em;">
                <span style="font-size: 11px; color: var(--mfy-main); font-weight: 900;">Gerar EAN13</span>
              </div>
            `;

            labels[idx].parentNode.parentNode.insertAdjacentHTML("afterbegin", block);

            const btn = document.getElementsByClassName("eangen")[0];
            btn.addEventListener("mouseover", function () {
              this.style.transform = "scale(1.1)";
            });
            btn.addEventListener("mouseout", function () {
              this.style.transform = "scale(1)";
            });
            btn.addEventListener("click", function () {
              rawID ? generateEAN13(labels[idx], idx, false) : findDocID(labels[idx], idx, false);
            });

            clearInterval(t);
          }
        }

        // Campo em variações (opcional)
        for (let i = 0; i < varLabels.length; i++) {
          if (varLabels[i].innerHTML == "Código universal de produto (opcional)") {
            const blockMini = `
              <div class="eangen"
                   style="display: flex; background: var(--mfy-main); border-radius: 1em; margin: 1em 1em 0em 1em; width: 3em; height: 3em; text-align: left; cursor: pointer; transition: all 0.35s; transform: scale(1);">
                <div style="width: 2.1em; height: 2em; margin-bottom: -2em; background-color: var(--mfy-main); position: relative; top: 0.5em; left: -1.5em; display: flex; padding: 0em 0.35em; border-radius: 10em;">
                  <img src="https://i.ibb.co/7tHHPPY/icon-color.png" style="pointer-events:none; width:15px; margin: auto; filter: brightness(7.5);">
                </div>
                <img src="https://img.icons8.com/carbon-copy/100/ffffff/refresh-barcode.png"
                     style="display: flex; width: 3em; margin-left: -1.75em;">
                <span style="display: flex; margin: auto; font-size: 12px; line-height: 1em; padding-left: 0.4em; color: var(--mfy-main); font-weight: 900;">
                  Gerar EAN13
                </span>
              </div>
            `;

            const inputs =
              varLabels[i]
                .parentNode.parentNode.parentNode.parentNode
                .getElementsByTagName("tbody")[0]
                .getElementsByTagName("input");

            for (let j = 0; j < inputs.length; j++) {
              if (inputs[j].getAttribute("uniqueid") != null) {
                inputs[j].parentNode.parentNode.parentNode.insertAdjacentHTML("beforebegin", blockMini);
              }
            }

            const btns = document.getElementsByClassName("eangen");
            for (let k = 0; k < btns.length; k++) {
              btns[k].addEventListener("mouseover", function () {
                this.style.transform = "scale(1.1)";
              });
              btns[k].addEventListener("mouseout", function () {
                this.style.transform = "scale(1)";
              });
              btns[k].addEventListener("click", function () {
                rawID == null ? findDocID(btns[k], k, true) : generateEAN13(btns[k], k, true);
              });
            }

            clearInterval(t);
          }
        }
      }
    }, 500);
  }
}

async function findDocID(el, idx, inVariation) {
  idx = idx || 0;

  await fetch(`${mfyProxy}https://api.mercadolibre.com/users/me`, eaInit)
    .then((r) => r.json())
    .then((r) => (rawID = r.identification.number ?? undefined))
    .catch(function () {});

  generateEAN13(el, idx, !!inVariation);
}

function generateEAN13(el, idx, inVariation) {
  const sib = el.nextSibling;
  let input = "";

  if (inVariation) {
    input = el.nextSibling.firstChild.getElementsByTagName("input")[0];
  } else {
    try {
      input = sib.getElementsByTagName("input")[0];
      input.focus();
    } catch {
      input = el.nextSibling.firstChild;
    }
  }

  const s =
    "789" +
    (rawID?.substr(3, 5) ?? "00000") +
    Math.floor(1000 + 9000 * Math.random());
  const o = s + (function (code) {
    if (!code || code.length !== 12) throw new Error("Invalid EAN 13, should have 12 digits");
    const weights = [1, 3];
    let sum = 0;
    code.split("").forEach((d, i) => {
      sum += parseInt(d, 10) * weights[i % 2];
    });
    return 10 * Math.ceil(sum / 10) - sum;
  })(s).toString();

  if (inVariation) {
    const label = el.nextSibling.lastChild.firstChild;
    label.innerHTML = o;
    label.setAttribute(
      "style",
      "font-weight: 700; font-size: 1.1em; color: var(--mfy-main); width:16em;"
    );
  } else {
    const cf = document.getElementsByClassName("codefield")[0];
    if (cf) {
      cf.innerHTML = o;
    } else {
      document.getElementsByClassName("eangen")[0].parentElement.lastChild.innerHTML = `
        <span style="font-weight: 700; font-size: 1.1em; color: var(--mfy-main);">${o}</span>
      `;
    }
  }

  if (input) {
    input.value = "";
    input.placeholder = "Cole o código abaixo neste campo.";
  }

  navigator.clipboard.writeText(o);

  const sb = document.getElementById("snackbar");
  sb.className = "show";
  setTimeout(() => {
    sb.className = sb.className.replace("show", "");
  }, 3000);
}

var verif = "pro";
eadataStore("local_userType", verif, TTL1);

const d = new Date();
let month = d.getMonth() + 1;
let day = d.getDate();
if (month <= 9 && day <= 20) eadataStore("local_userType", (verif = "pro"), TTL1);

var eanotify = "";

function fetchCategoryWithCache(categoryId, cb) {
  document.dispatchEvent(new CustomEvent("GetCategoryData", { detail: { categoryId } }));

  const handler = (ev) => {
    const { categoryId: id, categoryData } = ev.detail;

    if (id === categoryId) {
      if (categoryData) {
        cb(categoryData);
      } else {
        fetch(`${mfyProxy}https://api.mercadolibre.com/categories/${categoryId}`, eaInit)
          .then((r) => r.json())
          .then((data) => {
            if (!data.error) {
              document.dispatchEvent(
                new CustomEvent("StoreCategoryData", { detail: { categoryId, categoryData: data } })
              );
            }
            cb(data);
          })
          .catch(function () {
            cb(null);
          });
      }

      document.removeEventListener("CategoryDataResponse", handler);
    }
  };

  document.addEventListener("CategoryDataResponse", handler);
}

function contentScpt() {
  function e() {
    salesSpot = document.getElementsByClassName("ui-pdp-header__subtitle");
    newSalesDiv = `
      <div id="salesfix"
           style="width: fit-content; display: flex; flex-direction: row; height: 14px; align-items: center; border-radius: 1rem; border: 1px solid rgba(0,0,0,0.14); padding: 1rem; position: relative; top: 8px; margin-left: 1rem;">
        <img src="https://i.ibb.co/K7Lc6cr/metrify.png"
             style="width: 14px; height: 14px; position: relative; left: 1px; margin-right: -0.5rem">
        ${vendas} vendidos
      </div>
    `;

    if (iscatalog) {
      salesSpot[0].setAttribute(
        "style",
        "display: flex; flex-direction: row; gap: 1rem; margin: 1rem 0; align-items: center;"
      );
    } else {
      salesSpot[0].firstChild.setAttribute(
        "style",
        "display: flex; flex-direction: row; align-items: center; margin-bottom:1.35rem"
      );
      salesSpot[0].firstChild.style.width = "max-content";
    }
  }

  function t() {
    var pages = [];

    function tInner() {
      earanksearchBtn = document.getElementById("eaadvsearchBtn");
      earanksearchForm = document.getElementById("eaadvsearchForm");
      earanksearchResult = document.getElementById("eaadvsearchResult");
      earanksearchGo = earanksearchForm.getElementsByTagName("button")[0];
      earanksearchValue = earanksearchForm.getElementsByTagName("input")[0];

      var icon = earanksearchBtn.getElementsByTagName("img")[0];

      iscatalog || dataLayer[0].catalogProductId;

      earanksearchForm.setAttribute("style", "display: none;");

      earanksearchBtn.addEventListener("click", function () {
        pages = [];
        earanksearchForm.getElementsByTagName("input")[0].value = "";
        earanksearchResult.setAttribute("style", "display:none;");

        if (earanksearchBtn.style.backgroundColor != "rgb(52, 131, 250)") {
          earanksearchForm.setAttribute("style", "position: relative; top: 2.7em; z-index: 0;");
          earanksearchBtn.style.backgroundColor = "rgb(52, 131, 250)";
          icon.setAttribute(
            "style",
            "width: 1.5em; height: 1.5em; position: relative; top: 0.21em; filter: brightness(11);"
          );
          earanksearchBtn.getElementsByClassName("eahiddenlabel")[0].setAttribute("style", "display:none;");
        } else {
          earanksearchBtn.getElementsByClassName("eahiddenlabel")[0].removeAttribute("style");
          earanksearchForm.setAttribute("style", "display:none;");
          icon.setAttribute(
            "style",
            "width: 1.5em; height: 1.5em; position: relative; top: 0.21em; margin-right: 0.5em;"
          );
          earanksearchBtn.removeAttribute("style");
        }
      });

      earanksearchGo.addEventListener("click", function () {
        earanksearchForm.setAttribute("style", "display:none; position: relative; z-index: 0;");

        (async function (q) {
          earanksearchForm.insertAdjacentHTML(
            "afterend",
            `<div id="mfyloaderdiv" style="display: flex; width: 100%;">${mfyloader}<span style="position: relative; font-size: 0.86em; font-weight: 700; top: 5em; flex: 1;">Buscando este anúncio nas 20 primeiras páginas. Um momento... </span></div>`
          );
          document.getElementsByTagName("mfyloader")[0].style.marginTop = "3em";

          let found = false;

          for (let i = 0; i < 20; i++) {
            function showResult(index) {
              document.getElementById("mfyloaderdiv")?.remove();
              document.getElementById("eaadvsearchResult").setAttribute("style", "position: relative; top:1.75em;");

              var res = document.getElementsByTagName("earesult")[0];
              res.innerHTML =
                'Não encontrado <span style="font-size:0.7em; position: relative; left: -10.5em; top: 1.1em;">(nas 20 primeiras páginas)</span> ' +
                `<span style="font-size: 0.7em; color: #00000050; display: inline-flex; letter-spacing: 0.035em; padding: 0.35em 0.75em; background-color: #ebebeb; border-radius: 1em; position: relative; right: -15.5em; top: -1.35em;">"${q}"</span>`;

              res.setAttribute("style", "position:relative; top:-0.35em;");

              if (index != -1) {
                let page = Math.floor(index / 50) + 1;
                let pos = (index % 50) + 1;

                res.innerHTML = `${page}ª Página | ${pos}º lugar <span style="font-size: 0.7em; color: #00000050; letter-spacing: 0.035em; padding: 0.35em 0.75em; background-color: #ebebeb; border-radius: 1em; display:inline-block; margin-left: 2.1em;">"${q}"</span><br><span style="font-size: 0.77em; padding: 2em; color: var(--mfy-main);">*Após anúncios de catálogo e patrocinados.</span>`;
                res.setAttribute("style", "position:relative;");
              }
            }

            const ids = [...pages.map((pg) => pg?.map((it) => it.id))];
            if (ids.join().split(",").indexOf(item_ID) !== -1) {
              found = true;
            }

            if (!found) {
              await fetch(
                `${mfyProxy}https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&offset=${50 * i}`,
                eaInit
              )
                .then((r) => r.json())
                .then((json) => pages.push(json.results))
                .catch(function () {});

              if (i >= 19) {
                showResult(ids.join().split(",").indexOf(item_ID));
              }
            } else {
              showResult(ids.join().split(",").indexOf(item_ID));
            }
          }
        })(earanksearchValue.value);
      });
    }

    function n() {
      let btn = document.getElementById("eamoretools");
      let open = false;

      btn.addEventListener("click", function () {
        let bar = document.getElementsByClassName("eatoolboxbar")[0];

        if (open) {
          open = false;
          bar.setAttribute("class", "eatoolboxbar");
          this.getElementsByTagName("img")[0].setAttribute(
            "style",
            "width: 1.11em; transform: rotate(180deg); margin: 2px; transition: all 0.2s;"
          );
        } else {
          open = true;
          bar.setAttribute("class", "eatoolboxbar eatoolboxbaropen");
          this.getElementsByTagName("img")[0].setAttribute(
            "style",
            "width: 1.11em; transform: rotate(90deg); margin: 2px; transition: all 0.2s;"
          );
        }
      });

      (function () {
        let monthly = isNaN(media_vendas * preco_Local) ? 0 : media_vendas * preco_Local;
        let thisItem = parseSalesText(document.getElementsByClassName("ui-pdp-subtitle")[0].innerText).thisItemSales;
        let thisItemRev = isNaN(thisItem * preco_Local) ? 0 : thisItem * preco_Local;

        const title = document.getElementsByClassName("eagrossrev-title")[0];
        const stats = document.getElementsByClassName("earevstats")[0];
        const catTitles = document.getElementsByClassName("eagrossrev-catalog-title");

        if (iscatalog) {
          title.setAttribute("class", "");
          title.parentElement.lastChild.remove();
          title.parentElement.setAttribute("style", "font-size: 0.92em; display: flex; font-weight: 900;");

          const prev = title.parentElement.previousSibling;
          title.parentElement.previousSibling.remove();
          title.parentElement.insertAdjacentElement("afterbegin", prev);

          title.parentElement.parentElement.setAttribute("style", "display: flex; flex-direction: column;");
          title.innerHTML = `
            <div style="padding: 0rem 1rem; margin: 0 .75rem; font-size: .85rem; width: fit-content; border-radius:1rem; border:1px solid #ebebeb;">
              Catálogo & Anúncio vencedor
            </div>
          `;

          stats &&
            stats.insertAdjacentHTML(
              "beforeend",
              `<div style="display:flex; flex-direction:column; margin-top:1rem;">
                 <span style="font-size: 0.92em; font-weight: 900;">
                   <span class="ui-pdp-review__amount">-Anúncio</span>
                   <span class="eagrossrev-catalog-title" style="font-size: 1.35em;">R$0</span>
                   <span class="revtitle revperiod">/mês</span>
                 </span>
                 <span style="font-size: 0.92em; font-weight: 900;">
                   <span class="ui-pdp-review__amount">- Catálogo:</span>
                   <span class="eagrossrev-catalog-title" style="font-size: 1.35em;">R$0</span>
                   <span class="revtitle"> Total</span>
                 </span>
               </div>`
            );

          if (catTitles?.length > 0) {
            catTitles[1].innerHTML = `${parseFloat(thisItemRev.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;
          }

          document.getElementsByClassName("eagrossrev-catalog-title")[0].innerHTML = `${parseFloat(
            monthly.toFixed(2)
          ).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`;
        } else {
          title.innerHTML = `${parseFloat(monthly.toFixed(2)).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}`;
        }

        stats.setAttribute(
          "style",
          "transition:all 0.35s; padding: 0em 1em 0.35em 1.7em; color: gray; display: none; margin-top: -4em; opacity: 0"
        );

        const gross = document.getElementById("eagrossrev");
        const brand = document.getElementsByClassName("ui-pdp__header-top-brand")[0];
        const highlights = document.getElementsByClassName("ui-pdp-highlights")[0];

        if (brand) {
          const img = brand.getElementsByClassName("ui-pdp__header-top-brand__image-container")[0];
          const subt = document.getElementsByClassName("ui-pdp-subtitle")[0];
          subt.parentElement.style.margin = img || highlights ? "1.5rem 0 0 0" : "1rem 0px 1rem";
        }

        const header = document.getElementsByClassName("ui-pdp-header")[0];
        if (header && iscatalog && highlights) {
          header.setAttribute("style", "display: block!important;");
        }

        gross.addEventListener("mouseover", function () {
          if (iscatalog) {
            stats.setAttribute(
              "style",
              "transition:all 0.35s; margin-top: 0em; padding: 0em 1em 0.35em 1.7em; color: gray; opacity: 1"
            );
          } else {
            stats.setAttribute(
              "style",
              "transition:all 0.35s; margin-top: -1em; padding: 0em 1em 0.35em 1.7em; color: gray; opacity: 1"
            );
          }
        });

        gross.addEventListener("mouseout", function () {
          stats.setAttribute(
            "style",
            "transition:all 0.35s; padding: 0em 1em 0.35em 1.7em; color: gray; display: none; margin-top: -4em; opacity: 0"
          );
        });

        const b1 = document.getElementsByClassName("revbtn1")[0];
        const b7 = document.getElementsByClassName("revbtn7")[0];
        const b30 = document.getElementsByClassName("revbtn30")[0];
        const b60 = document.getElementsByClassName("revbtn60")[0];
        const b90 = document.getElementsByClassName("revbtn90")[0];
        const bAll = document.getElementsByClassName("revbtntotal")[0];
        const revTitles = document.getElementsByClassName("revtitle");

        if (dias / vendas > 1) b1.style.display = "none";
        if (dias <= 30) {
          b90.style.display = "none";
          b60.style.display = "none";
        }
        if (monthly <= 0) {
          b1.style.display = "none";
          b7.style.display = "none";
          b30.style.display = "none";
          b60.style.display = "none";
          b90.style.display = "none";
        }

        const revPeriods = document.getElementsByClassName("revperiod");

        b1.addEventListener("click", function () {
          const val = isNaN(monthly / 30) ? 0 : monthly / 30;
          if (catTitles?.length > 0)
            catTitles[0].innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;
          else
            title.innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;

          revTitles[0].innerHTML = "Faturamento:";
          revTitles[1].innerHTML = " /dia";
          for (let i = 0; i < revPeriods?.length; i++) revPeriods[i].innerHTML = " /dia";
        });

        b7.addEventListener("click", function () {
          const val = isNaN(monthly / 2) ? 0 : monthly / 2;
          if (catTitles?.length > 0)
            catTitles[0].innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;
          else
            title.innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;

          revTitles[0].innerHTML = "Faturamento:";
          revTitles[1].innerHTML = " /semana";
          for (let i = 0; i < revPeriods?.length; i++) revPeriods[i].innerHTML = " /semana";
        });

        b30.addEventListener("click", function () {
          const val = isNaN(monthly) ? 0 : monthly;
          if (catTitles?.length > 0)
            catTitles[0].innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;
          else
            title.innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;

          revTitles[0].innerHTML = "Faturamento:";
          revTitles[1].innerHTML = " /mês";
          for (let i = 0; i < revPeriods?.length; i++) revPeriods[i].innerHTML = " /mês";
        });

        b60.addEventListener("click", function () {
          const val = isNaN(2 * monthly) ? 0 : 2 * monthly;
          if (catTitles?.length > 0)
            catTitles[0].innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;
          else
            title.innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;

          revTitles[0].innerHTML = "Faturamento:";
          revTitles[1].innerHTML = " /60 dias";
          for (let i = 0; i < revPeriods?.length; i++) revPeriods[i].innerHTML = " /60 dias";
        });

        b90.addEventListener("click", function () {
          const val = isNaN(3 * monthly) ? 0 : 3 * monthly;
          if (catTitles?.length > 0)
            catTitles[0].innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;
          else
            title.innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;

          revTitles[0].innerHTML = "Faturamento:";
          revTitles[1].innerHTML = " /90 dias";
          for (let i = 0; i < revPeriods?.length; i++) revPeriods[i].innerHTML = " /90 dias";
        });

        bAll.addEventListener("click", function () {
          const val = isNaN(vendas * preco_Local) ? 0 : vendas * preco_Local;
          if (catTitles?.length > 0)
            catTitles[0].innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;
          else
            title.innerHTML = `${parseFloat(val.toFixed(2)).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`;

          revTitles[0].innerHTML = "Faturamento:";
          revTitles[1].innerHTML = " /Total";
          for (let i = 0; i < revPeriods?.length; i++) revPeriods[i].innerHTML = " /Total";
        });

        const est = document.getElementById("mfy_rev_estimate");
        if (est) est.innerHTML = "Média de faturamento estimada por períodos";
      })();
    }

    // init inner helpers
    tInner();
    n();
  }

  function a() {
    function e(user) {
      (function (nick) {
        fetch(`https://api.mercadolibre.com/sites/MLB/search?nickname=${nick}`, eaInit)
          .then((r) => r.json())
          .then((json) => t(json))
          .catch(function () {});
      })(user.nickname);
    }

    function t(resp) {
      if (resp == null) {
        let panel = "";
        const titles = document.getElementsByClassName("ui-box-component__title");
        for (let i = 0; i < titles.length; i++) {
          if (
            titles[i].innerText == "Informações sobre o vendedor" ||
            titles[i].innerText == "Informações da loja" ||
            titles[i].innerText == "Devolução grátis"
          ) {
            panel = titles[i].parentElement.parentElement;
          }
        }

        const html =
          `<span id="easellerbtn" sellerdata="none" open="false" class="andes-button--loud mfy-main-bg  andes-button" style="position:relative; z-index:1; margin-bottom: 28px; margin-top: -1em; width: 100%;">
             <img src="https://img.icons8.com/material-outlined/48/ffffff/individual-server.png" style="width: 1.35em; margin: 0.8em 0.2em -0.35em 0em; display: inline-block;">
             Informações Extras
           </span>` +
          `<div class="smooth ui-pdp-component-list pr-16 pl-16 alinharvertical" id="sellerinfobox" style="margin: -3em 0em 0em 0em; padding: 2em 0em 1em 0em; height: 0px; overflow: hidden; opacity: 0;">
             ${mfyloader}
           </div>`;

        if (panel !== "" && panel?.firstChild != null) {
          panel?.firstChild.insertAdjacentHTML("beforebegin", html);
        }

        const btn = document.getElementById("easellerbtn");
        const box = document.getElementById("sellerinfobox");

        btn?.addEventListener("click", function () {
          if (this.getAttribute("open") == "true") {
            box.style.opacity = "0";
            box.style.height = "0px";
            box.style.margin = "-3em 0em 0em 0em";
            this.setAttribute("open", "false");
          } else if (this.getAttribute("open") == "false") {
            box.style.opacity = "1";
            box.style.height = "auto";
            box.style.margin = "-3em 0em 2em 0em";
            this.setAttribute("open", "true");
          }

          if (this.getAttribute("sellerdata") == "none") {
            fetch(`${mfyProxy}https://api.mercadolibre.com/users/${vendedor}`, eaInit)
              .then((r) => e(r))
              .catch(function () {});
          }
        });
      } else {
        document.getElementById("easellerbtn").setAttribute("sellerdata", "true");

        const box = document.getElementById("sellerinfobox");
        const loaders = box.getElementsByTagName("mfyloader");
        if (loaders.length > 0) box.removeChild(loaders[0]);

        const created = new Date(resp.seller.registration_date).toLocaleDateString("pt-br");
        let since = "";
        const y0 = new Date(resp.seller.registration_date).getFullYear();
        const y1 = new Date().getFullYear();

        if (parseFloat(y0) < parseFloat(y1)) {
          const diff = parseFloat(y1) - parseFloat(y0);
          if (diff > 1) since = `Há ${diff} anos`;
          else if (diff == 1) since = `Há ${diff} ano`;
          else {
            const d0 = new Date(resp.seller.registration_date);
            const n0 = Math.floor(d0 / 86400000);
            const n1 = Math.floor(new Date() / 86400000);
            since = `Há ${n1 - n0} dias`;
          }
        }

        let l = resp;

        function n(arr) {
          l += arr;

          (function (arr) {
            let free = 0,
              full = 0,
              t079 = 0,
              t150 = 0,
              tabv = 0,
              catsPrice = [];

            for (let i = 0; i < arr.length; i++) {
              free += [...arr[i].results.map((x) => x.shipping.free_shipping)].reduce(
                (acc, v) => acc + (v === true),
                0
              );
              full += [...arr[i].results.map((x) => x.shipping.logistic_type)].reduce(
                (acc, v) => acc + (v === "fulfillment"),
                0
              );

              const prices = [...arr[i].results.map((x) => x.price)];
              t079 += prices.reduce((acc, v) => acc + (v <= 79), 0);
              t150 += prices.reduce((acc, v) => acc + (v > 79 && v <= 150), 0);
              tabv += prices.reduce((acc, v) => acc + (v > 150), 0);
            }

            const filters = arr[0].available_filters;
            for (let i = 0; i < filters.length; i++) {
              if (filters[i].id == "price") catsPrice.push(filters[i].values);
            }

            const allFilters = arr[0].available_filters;
            const catFilter = [];
            const catNames = [];

            for (let i = 0; i < allFilters.length; i++) {
              if (allFilters[i].name == "Categories") catFilter.push(allFilters[i]);
            }
            for (let i = 0; i < catFilter[0]?.values.length; i++) {
              catNames.push(catFilter[0].values[i].name);
            }

            let catHtml = "";
            for (let i = 0; i < catNames.length; i++) {
              catHtml += `<span style="padding: 1px 7px; border-radius:11px; font-weight: 400; font-size:12px; margin: 2px 2px;" class="andes-button--loud mfy-main-bg ">${catNames[i]}</span>`;
            }

            const canceled = resp.seller.seller_reputation.transactions.canceled;
            const rate = (canceled / m) * 100;

            const byTicket = `
              <span style="font-weight: 900; font-size: 0.92em; display: block; margin: 4px;">
                ${t079} Anúncios
                <span style="padding: 1px 7px; border-radius:11px; font-weight: 400; font-size:12px; margin: 2px 2px; border: 2px solid #ebebeb;">até R$79</span>
              </span>
              <span style="font-weight: 400; font-size: 0.92em; display: block; margin: 4px;">
                ${t150} Anúncios
                <span style="padding: 1px 7px; border-radius:11px; font-weight: 400; font-size:12px; margin: 2px 2px; border: 2px solid #ebebeb;">R$80 até R$150</span>
              </span>
              <span style="font-weight: 400; font-size: 0.92em; display: block; margin: 4px;">
                ${tabv} Anúncios
                <span style="padding: 1px 7px; border-radius:11px; font-weight: 400; font-size:12px; margin: 2px 2px; border: 2px solid #ebebeb;">Acima de R$150</span>
              </span>
            `;

            const x = `
              <div class="ealine" style="display: flex; flex-wrap: wrap;">
                <img src="https://img.icons8.com/fluency-systems-regular/96/${mfyMainColorNumbers}/shop-location.png"
                     style="width: 2.7em; margin: 0px 7px 7px 7px;">
                <div style="display: grid;">
                  <span style="font-size: 1.1em; font-weight: 700;">${resp.seller.nickname}</span>
                  <span style="font-size: 11px; margin-top: -0.75em;">
                    Conta criada: ${created}
                    <span class="andes-button--loud mfy-main-bg " style="margin-left: 0.5em; padding: 1px 5px; border-radius: 11px; font-weight: 900; font-size: 10px;">${since}</span>
                  </span>
                </div>
              </div>

              <div style="width: 100%; background: #ebebeb; height: 1px;"></div>

              <div class="ealine" style="display: flex; flex-wrap: wrap; margin-top: 0.5em;">
                <div style="padding-left: 1em;">
                  <span style="font-size: 1em; font-weight: 900;">Vendas totais: </span>${m}
                  <span style="padding: 1px 7px; border-radius: 11px; font-weight: 400; font-size: 10px; background-color: #a3a3a3;" class="andes-button--loud mfy-main-bg ">
                    ${canceled} canceladas (${rate.toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div class="ealine" style="display: flex; flex-wrap: wrap;">
                <div style="padding-left: 1em; margin: 4px 0px;">
                  <span style="font-size: 1em; font-weight: 900;">Anúncios:</span> ${resp.paging.total}
                  <span style="padding: 1px 7px; border-radius: 11px; font-weight: 400; font-size: 10px; background-color: #39b54a; margin: 0px 4px;" class="andes-button--loud mfy-main-bg ">
                    ${full}
                    <svg xmlns="http://www.w3.org/2000/svg" class="logo-full" width="151" height="39" viewBox="0 0 151 39" data-reactroot=""
                         style="width: 3.75em; height: auto; position: relative; top: 0.2em; padding: 0em 0em 0em 0.35em;">
                      <g fill="#ffffff" fill-rule="evenodd">
                        <path d="M9.577 0L0 22.286h15.962L9.577 39l25.54-25.071H19.153L28.732 0zM56.094 27.925h-6.931l5.924-24.38h19.706l-1.33 5.483H60.688l-.886 3.801h12.452l-1.33 5.483H58.433l-2.338 9.613zm33.718.439c-8.262 0-12.332-3.582-12.332-8.7 0-.402.12-1.242.202-1.608l3.546-14.51h7.052L84.774 17.91c-.04.183-.12.585-.12 1.023.04 2.01 1.732 3.948 5.158 3.948 3.707 0 5.601-2.12 6.286-4.971l3.507-14.365h7.012L103.11 18.02c-1.451 5.921-4.998 10.344-13.3 10.344zm36.014-.439h-17.732l5.924-24.38h6.932l-4.554 18.897h10.76l-1.33 5.483zm23.844 0h-17.732l5.924-24.38h6.932l-4.554 18.897H151l-1.33 5.483z"></path>
                      </g>
                    </svg>
                  </span>
                  <span style="padding: 1px 7px; border-radius: 11px; font-weight: 400; font-size: 10px; background-color: #39b54a;" class="andes-button--loud mfy-main-bg ">
                    ${free} Frete Grátis
                  </span>
                </div>
              </div>

              <div class="ealine" style="display: flex; flex-wrap: wrap;">
                <div style="padding-left: 1em; margin: 4px 0px;">
                  <span style="font-size: 1em; font-weight: 900;">Anúncios por Ticket:</span>
                  <div style="border-left: 2px solid var(--mfy-main);">${byTicket}</div>
                </div>
              </div>

              <div class="ealine" style="display: flex; flex-wrap: wrap;">
                <div style="padding-left: 1em; display: flex; flex-wrap: wrap;">
                  <span style="font-size: 1em; font-weight: 900;">Categorias principais do vendedor: </span>
                  ${catHtml}
                </div>
              </div>
            `;

            box.insertAdjacentHTML("afterbegin", x);

            const lines = document.getElementsByClassName("ealine");
            if (iscatalog) {
              for (let i = 1; i < lines.length - 2; i++) {
                lines[i].firstElementChild.setAttribute("style", "display:inline-table;");
              }
            }
          })(arr);
        }

        let done = false;
        const m = resp.seller.seller_reputation.transactions.total;
        const pages = Math.ceil(resp.paging.total / 50);
        if (pages == 1) done = true;
      }
    }
  }

  // call the three inner helpers of contentScpt
  e();
  t();
  a();
}


const p = (responses) =>
  Promise.all(
    responses.map((res) => {
      if (res.ok) return res.json();
      throw new Error(res.statusText);
    })
  );

(function () {
  let requests = [];
  for (let t = 0; t < c; t++) {
    requests.push(
      fetch(
        `${mfyProxy}https://api.mercadolibre.com/sites/MLB/search?seller_id=${vendedor}&offset=${50 * t}`,
        eaInit
      )
    );
  }
  return Promise.all(requests);
})()
  .then(p)
  .then((e) => n(e))
  .then((d = !0))
  .catch(function () {});

function i() {
  document
    .getElementsByClassName("ui-pdp-breadcrumb")[0]
    .insertAdjacentHTML(
      "beforeend",
      `<div id="eacattrends" style="width:62em">
        <span id="eacattrendsbtn" style="font-weight:700; background-color:var(--mfy-main); color:#fff; padding:0.35em 0.75em; border-radius:7px; margin: 0em 0.5em; cursor: pointer; position: relative; top: -4px; z-index: 3;">
          <img src="https://img.icons8.com/ios-glyphs/60/ffffff/hot-sales-hours.png" style="width: 1.21em; position: relative; top: 3px;">
          <span>Termos mais buscados! </span>
          <span style="font-size: 0.7em; position: relative; top: -2px; right: -3px; padding: 0px 5px 1px 5px; margin: 0px 0px 0px 5px; border: 1px solid #fff; border-radius: 1em;">categoria</span>
        </span>
      </div>`
    );

  let e = document.getElementById("eacattrends");

  function t() {
    n.getElementsByTagName("span")[0].innerText = "Carregando...";

    fetch(`${mfyProxy}https://api.mercadolibre.com/trends/MLB/${categoria_Local}`, eaInit)
      .then((r) => r.json())
      .then((data) =>
        (function (data) {
          const n = data;
          let terms = [];
          for (let i = 0; i < n.length; i++) terms.push(n[i].keyword);

          const textLines = terms.map((k) => k + "\r\n");
          const s = document.getElementById("eacattrends");

          s.firstChild.getElementsByTagName("span")[0].innerText = `${terms.length} Resultados `;

          fetchCategoryWithCache(categoria_Local, (cat) => {
            if (cat) s.lastChild.lastChild.innerText = cat.name;
          });

          const boxHtml = `
            <div id="eatrendsbox" style="margin-left:4px; margin-top: -11px; position: absolute; background: #fff; width: 21em; padding:3em 1em 1.35em 1em; box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px; z-index: 2; border-radius: 7px;">
              <span>Lista de termos mais buscados:</span>
              <textarea style="width: 20em; min-width: 20em; max-width: 20em; height:14em; min-height:14em; max-height:35em; margin: 4px 0px; text-transform: capitalize;" spellcheck="false">${textLines
                .join()
                .toString()}</textarea>
              <button id="eacopytrends" style="font-size: 1.1em; font-weight: 600; letter-spacing: -0.01em; padding: 0em 1em; border-radius: 3em; border: 0px; cursor: pointer;">Copiar tudo</button>
              <span id="eaclosetrendsbox" style="float: right; cursor: pointer; font-size: 0.86em;">
                Fechar
                <img src="https://img.icons8.com/external-android-line-2px-amoghdesign/48/4a90e2/external-close-multimedia-line-24px-android-line-2px-amoghdesign.png" style="width: 1.5em; position: relative; top: 5px;">
              </span>
            </div>`;

          const r = document.getElementById("eatrendsbox");
          const l = document.getElementById("eacattrendsbtn");

          // Unbind click (to avoid stacking), then toggle box
          l && l.removeEventListener("click", t);

          if (r) {
            r.outerHTML = "";
            document.getElementById("eacattrends").firstChild.insertAdjacentHTML("beforebegin", boxHtml);
          } else {
            document.getElementById("eacattrends").firstChild.insertAdjacentHTML("beforebegin", boxHtml);

            document.getElementById("eacopytrends").addEventListener("click", function () {
              const ta = this.parentNode.getElementsByTagName("textarea")[0];
              ta.select();
              navigator.clipboard.writeText(ta.value);
              this.innerText = "Copiado!";
            });
          }

          document.getElementById("eaclosetrendsbox").addEventListener("click", function () {
            document.getElementById("eatrendsbox").style.display = "none";
          });

          l &&
            l.addEventListener("click", function () {
              document.getElementById("eatrendsbox").style.display = "block";
            });
        })(data)
      )
      .catch(function () {});
  }

  iscatalog ? e.setAttribute("style", "min-width:fit-content") : e.parentElement.setAttribute("style", "margin-bottom: -1.5em;");

  let n = document.getElementById("eacattrendsbtn");
  n.addEventListener("click", t);
}

spot0[0].insertAdjacentHTML("afterbegin", analytics_ui);
i();

(function () {
  let e = document.getElementById("eahealthmeter");
  let t = document.getElementById("eameter_modal");
  e && e.remove();
  t && t.remove();
})();

t();

(function () {
  let e = eadataRetrieve("eaActive");
  let t = document.getElementById("eaoffSwitch");

  function n() {
    e = eadataRetrieve("eaActive");
    if (e === null) e = !0;

    if (e) {
      t.lastChild.innerText = " Desligar Análises";
      t.firstChild.style.filter = "brightness(1)";
      t.firstChild.style.transform = "scaleX(1)";
      t.setAttribute("style", "");
      if (!iscatalog) t.style.top = "0.31em";
    } else {
      t.setAttribute("style", "background-color:rgb(52, 131, 250); color:#fff;");
      t.firstChild.style.filter = "brightness(5)";
      t.firstChild.style.transform = "scaleX(-1)";
      t.lastChild.innerText = " Ligar Análises";
    }
  }

  n();

  t &&
    t.addEventListener("click", function () {
      e = eadataRetrieve("eaActive");
      if (e === null) e = !0;
      eadataStore("eaActive", !e, TTL1);
      n();
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
})();

n();

if (iscatalog) {
  document.getElementById("eaoffSwitch")?.setAttribute("style", "top: 0.35em;");
  document.getElementById("eaadvsearchBtn")?.setAttribute("style", "left: 0.25em;");
}

a();

(function () {
  const e = document.getElementById("highlights");
  if (e) {
    const t = e.cloneNode(!0);
    t.style.marginBottom = "1rem";
    e.remove();
    document.querySelector(".ui-pdp-header")?.insertAdjacentElement("beforebegin", t);
  }
})();

function n(e) {
  taxaML_verif = parseFloat(e) < parseFloat(cota_minima_MLB) ? taxa_mlb - taxa_cota : taxa_mlb;
  taxa_percentual = (taxaML_verif / preco_Local).toFixed(3);
}

function a() {
  let e = setInterval(() => {
    if ((rad_btn = document.getElementById("simular"))) {
      rad_btn.checked = !0;
      clearInterval(e);
    }
  }, 500);
}

function i() {
  price_tool = `
    <style>
      @import url("https://fonts.cdnfonts.com/css/montserrat");
    </style>

    <div id="price-tool"
         style="position: relative; top: -1.35em; background-color: #fff; box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px; border: 0px !important;"
         class="ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical">

      <div id="etapa2" class="smooth hdn transp" style="width: inherit; float: left; transform: translate(-10px, 0px)">
        <div style="text-align: right; padding-left: 1.85em; width: 45%">O valor <b>sugerido</b> para publicar seu anúncio é de:</div>

        <h1 class="price-tag price-tag-fraction" style="width: 53%; overflow: hidden; float: right; margin-top: -1.5em">
          <span style="margin-right: 0.15em">
            <img src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"
                 height="16" width="20" style="margin-top: 0.2em; opacity: 35%" />R$
          </span>
          <span id="valor_sugerido_reais">00</span>
          <span id="valor_sugerido_centavos" style="font-size: 0.5em; font-weight: 100">,00</span>
        </h1>

        <p style="float: right; margin: -1.35em 3.75em 0em 0em; font-size: 11px" class="ui-pdp-review__amount">*Sugestão com alíquota..</p>

        <div class="detalhamento" id="detalhamento">
          <ul class="ui-pdp-review__amount">
            <li>
              Seu custo:
              <img alt="icon" src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"
                   height="11" style="padding: 0em 0.5em 0em 0em" />
              <span class="ui-pdp-price" id="detalhe-custo">R$&nbsp;0,00</span>
            </li>

            <li>
              Impostos:
              <img alt="icon" src="https://ci3.googleusercontent.com/proxy/kgbUUHgOg_Wtd56AXKaaRk0M4A-EQe-kjbq9Cr4as2SUCOfQIjNrN6zcNl1wWyUslua9x1khV2gtnzRhC4xLj6fKrzNwgEblwySpi5Jn0YwOcJnJausP9aoTC0Sc81rJQMLdJEWgJO0kfywjk97OD9sFrum7D_GDtT4OxdcKLplxbn643Xo=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/payments/payment.png"
                   height="11" style="padding: 0em 0.5em 0em 0.61em" />
              <span class="ui-pdp-price" id="detalhe-imposto">R$&nbsp;0</span>
            </li>

            <li style="transform: translate(4px, 0px)">
              Seu lucro:
              <img alt="icon" src="https://ci5.googleusercontent.com/proxy/t9hOuXHFrNPYlckwjpVbXLSlkxMtwzLYCTIi7PchhDo9m0lT7QD15EK5HN7R_R-xZrKcTgNktsim1qXR1LlKrEKQNa030zOY_S-rBf1-Eds9chp_rizwkWlvcacgOpH-Hj7BTbJJ-tG97e7u8JhDtjRMp8DP9Bwv9jtS-VYIrGWn=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/common/back.png"
                   height="11" style="padding: 0em 0.2em; padding-right: 0.45em" />
              <span class="ui-pdp-price" id="detalhe-lucro">R$&nbsp;0,00</span>
            </li>

            <li style="transform: translate(-7px, 0px)">
              Taxa do ML:
              <img alt="icon" src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png"
                   height="11" style="padding-right: 0.2em; padding-left: 0.15em" />
              <span class="ui-pdp-price" id="detalhe-taxa">R$&nbsp;0,00</span>
            </li>

            <li style="transform: translate(9px, 0px)">
              Taxa Fixa:
              <img alt="icon" src="https://ci3.googleusercontent.com/proxy/ZG5FLXGDXbk602QJeqgzhTwuKjwnGLhuBMgUeetEB1qxNi8LEnUTmvci9Se0YjumB0a2DrA-uf1Xeb52hj41rmg9hKW-Sh2tH4xqoGR5cn6k-r_deVRoI31lrjw84JyS22rnTXvilfhHu7q_Lj6l-ZeR_MT9MvmskNkjUaKqu-bI9f9CypObTG-9JnJyZA=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-office.png"
                   height="11" style="padding-right: 0.2em" />
              <span class="ui-pdp-price" id="detalhe-taxafixa">R$&nbsp;0,00</span>
            </li>

            <li style="transform: translate(30px, 0px)">
              Envio:
              <img alt="icon" src="https://ci3.googleusercontent.com/proxy/4AHE0GSzeLFc0tuceXt2Hib-rWVbcK8yqriCrBnrQFdt3LpCrH-NA3nyDKu-IO-65xO2yjlS7rsjGiJWV6QunadzFZlJPWqeb2Shj_fYgwagdLoTOAljMen83VI1eloEUOdeZcR4Su7DrJRWooeRNOF5nZ2fJv2BE06zEE2uKHkiVrr1vOvtY78kR28=s0-d-e1-ft#https://http2.mlstatic.com/resources/frontend/statics/buyingflow-frontend-emails/1.15.0/images/shipping/shipping-mail.png"
                   height="11" style="padding-right: 0.3em; transform: translate(-2px, 0px)" />
              <span class="ui-pdp-price" id="detalhe-envio">R$&nbsp;0,00</span>
            </li>
          </ul>
        </div>

        <a id="vermais" style="float: right; margin: 1em 7em 0em 0em">Ver mais detalhes</a>

        <p id="eareset" style="float: right; margin: 1em 8.35em 0em 0em; font-weight: 900; color: #aeaeae; font-size: 0.77em; text-align: center;">
          Problemas no cálculo?<br />Aperte Ctrl+Shift+R
        </p>

        <br />

        <a id="refazer" class="andes-button--quiet"
           style="padding: 1em; border-radius: 0.7em; float: right; margin: 1em 5.5em 0em 0em;">
          ↻ Refazer simulação
        </a>
      </div>

      <div id="etapa1" class="smooth" style="margin: auto; overflow: hidden; width: 100%; margin-top: -1em">
        <div id="pricetool_header"
             style="height: 4em; margin-bottom: 1.5em; background-color: #f5f5f5; display: flex; align-items: center; padding: 0em 1em;">
          <img style="opacity: 0.21; width: 3.5rem; position: absolute; left: 0.21rem"
               src="https://i.ibb.co/FDxGScN/icon-gray.png" title="Metrify" />
          <h3 style="float: left; font-size: 1.5rem; font-family: 'Montserrat', sans-serif; font-weight: 700; margin-left: 1rem;">
            Precificador
          </h3>
        </div>

        <div id="pricetool_content" style="line-height: 1em; padding: 0em 1em">
          <div id="pricetool_loading" class="new-loader new-hdn">
            <lottie-player src="${extensionPath}src/lotties/lf20_uwR49r.json" background="transparent" speed="1"
                           style="width: 7rem; height: 7rem; margin: auto" loop autoplay>
            </lottie-player>
          </div>

          <div id="passo-02" class="new-hdn">
            <div class="pt_row" style="display: flex; justify-content: center; align-items: center; flex-direction: column; padding-top: 1rem;">
              <span style="background: -webkit-linear-gradient(left, rgba(121, 51, 255, 1), rgba(6, 189, 252, 1)); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.35rem; font-weight: 800; font-family: 'Montserrat', sans-serif;">
                PAV Dinâmico:
              </span>
              <br />
              <span style="font-size: 1rem; margin-top: -0.7rem;">(Preço alvo de vendas)</span>

              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 1.75rem; font-weight: 600; max-width: 100%; min-width: 21rem; margin: 0 auto; padding: 1em;">
                <range-slider class="rangeslider" id="pav-slider" min="7" max="100" step="0.50"></range-slider>
              </div>

              <span style="background: -webkit-linear-gradient(left, rgba(121, 51, 255, 1), rgba(6, 189, 252, 1)); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.35rem; font-weight: 800; font-family: 'Montserrat', sans-serif;">
                Seus Resultados:
              </span>
              <br />

              <div id="pt_highlight_result" style="width: 90%">
                <div style="width: 100%; border: 1px solid #00000011; border-radius: 4rem; font-size: 1.35rem; display: flex; justify-content: space-between; padding: 1em; font-family: 'Montserrat', sans-serif; margin: 0.21em 0em;">
                  <span style="font-weight: bold">Você recebe</span>
                  <span id="pt_result_revenue" style="font-weight: 500">R$0,00</span>
                </div>

                <div style="width: 100%; border: 1px solid #00000011; border-radius: 4rem; font-size: 1.35rem; display: flex; justify-content: space-between; padding: 1em; font-family: 'Montserrat', sans-serif; margin: 0.21em 0em;">
                  <span style="font-weight: bold">Lucro</span>
                  <div>
                    <abbr title="Valor de lucro final após todas as tarifas, taxas e custos (exceto tributos)." style="text-decoration:none">
                      <img id="profit_info" src="https://img.icons8.com/ios-filled/50/000000/info.png" style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />
                    </abbr>
                    <span id="pt_result_profit" style="font-weight: 500">R$0,00</span>
                  </div>
                </div>

                <div style="width: 100%; border: 1px solid #00000011; border-radius: 4rem; font-size: 1.35rem; display: flex; justify-content: space-between; padding: 1em; font-family: 'Montserrat', sans-serif; margin: 0.21em 0em;">
                  <span style="font-weight: bold">Margem/venda</span>
                  <abbr title="Margem de lucro relativa ao preço alvo de venda cadastrado no marketplace." style="text-decoration:none">
                    <img id="profitpct_info" src="https://img.icons8.com/ios-filled/50/000000/info.png" style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />
                  </abbr>
                  <span id="pt_result_profitpct" style="font-weight: 500">0%</span>
                </div>

                <div style="width: 100%; border: 1px solid #00000011; border-radius: 4rem; font-size: 1.35rem; display: flex; justify-content: space-between; padding: 1em; font-family: 'Montserrat', sans-serif; margin: 0.21em 0em;">
                  <span style="font-weight: bold">Markup</span>
                  <div>
                    <abbr title="Percentual indicador de quanto o preço do produto está acima do seu custo de produção/compra." style="text-decoration:none">
                      <img id="markup_info" src="https://img.icons8.com/ios-filled/50/000000/info.png" style="margin-right: 0.1em; width: 1rem; opacity: 0.21; cursor: pointer" />
                    </abbr>
                    <span id="pt_result_markup" style="font-weight: 500">0%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt_row" style="width: 77%; margin: auto; margin-top: 1.35rem; margin-bottom: 2rem;">
              <span style="font-size: 1.21rem; font-weight: bold; font-family: 'Montserrat', sans-serif;">Custos de venda:</span>

              <div class="pt_row" class="andes-form-control">
                <div class="sub_row" style="width: 100%; display: flex; justify-content: space-between; margin-top: 0.7rem; font-weight: bold; font-size: 1.21rem; padding: 0.14em 0em; border-bottom: 1px solid #00000021;">
                  <span>Tarifa:</span>
                  <span id="pt_result_marketplacecut" style="font-weight: 500">R$0,00</span>
                </div>

                <div class="sub_row" style="width: 100%; display: flex; justify-content: space-between; margin-top: 0.7rem; font-weight: bold; font-size: 1.21rem; padding: 0.14em 0em; border-bottom: 1px solid #00000021;">
                  <span>Impostos:</span>
                  <span id="pt_result_tax" style="font-weight: 500">R$0,00</span>
                </div>

                <div class="sub_row" style="width: 100%; display: flex; justify-content: space-between; margin-top: 0.7rem; font-weight: bold; font-size: 1.21rem; padding: 0.14em 0em; border-bottom: 1px solid #00000021;">
                  <span>Taxa Fixa:</span>
                  <span id="pt_result_fee" style="font-weight: 500">R$0,00</span>
                </div>

                <div class="sub_row" style="width: 100%; display: flex; justify-content: space-between; margin-top: 0.7rem; font-weight: bold; font-size: 1.21rem; padding: 0.14em 0em; border-bottom: 1px solid #00000021;">
                  <span>Custo:</span>
                  <span id="pt_result_cost" style="font-weight: 500">R$0,00</span>
                </div>

                <div class="sub_row" style="width: 100%; display: flex; justify-content: space-between; margin-top: 0.7rem; font-weight: bold; font-size: 1.21rem; padding: 0.14em 0em; border-bottom: 1px solid #00000021;">
                  <span>Envio:</span>
                  <span id="pt_result_shipping" style="font-weight: 500">R$0,00</span>
                </div>
              </div>
            </div>

            <div id="pt_goback"
                 style="display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1.35rem; width: 90%; height: 2.5rem; border-radius: 4rem; padding: 1rem; margin: auto; margin-top: 0.1em; margin-bottom: 1rem; background: -webkit-linear-gradient(left, #3c73ff, #12b0fd); color: white; font-family: Montserrat, sans-serif; cursor: pointer; box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;">
              Voltar
            </div>
          </div>

          <div id="passo-01">
            <div class="pt_row">
              <span style="background: -webkit-linear-gradient(left, rgba(121, 51, 255, 1), rgba(6, 189, 252, 1)); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.35rem; font-weight: 800; margin: 0.5em 0em 0em 0.5em; font-family: 'Montserrat', sans-serif;">
                PAV
              </span>
              <br />
              <span style="margin: 0.5em 0em 0em 0.5em">(Preço alvo de venda)</span>

              <div class="andes-form-control" style="padding: 0em 0.7em 0em 0em; font-weight: bold">
                <input id="pav-input" type="number" placeholder="digite o valor"
                       style="margin: 0.5em 0em 0.5em 0.35em; font-weight: 400; background-color: #80808000; border-radius: 0.25em; border: 2px solid #00000021; width: 100%; font-size: 1em; padding: 0.35em 0.35em 0.35em 2.1em; font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;" />
                <span style="position: absolute; top: 1.7rem; left: 1rem">R$:</span>
              </div>
            </div>

            <div class="pt_row" style="display: flex; justify-content: space-between; margin-top: 0.7rem; font-weight: bold;" class="andes-form-control">
              <div id="pt_cost" style="flex: 1; padding: 0em 0.7em 0em 0.7em">
                <span style="font-size: 1.21rem; font-weight: bold; font-family: 'Montserrat', sans-serif;">Custo do produto:</span>
                <input id="custo" type="number"
                       style="margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; background-color: #80808000; border-radius: 0.25em; border: 2px solid #00000021; width: 100%; font-size: 1.1em; padding: 0.5em 0.35em 0.5em 2em;" />
                <span style="position: relative; top: -2.6rem; left: 1rem">R$:</span>
              </div>

              <div id="pt_taxes" style="flex: 1; padding: 0em 0.7em 0em 0.7em">
                <span style="font-size: 1.21rem; font-weight: bold; font-family: 'Montserrat', sans-serif;">Sua alíquota de imposto</span>
                <input id="aliq" type="number"
                       style="margin: 0.5em 0em 0.5em 0em; font-weight: bold; background-color: #80808000; border-radius: 0.25em; border: 2px solid #00000021; width: 100%; font-size: 1.1em; padding: 0.5em 0.35em 0.5em 0.75em;"
                       value="0" />
                <span style="position: relative; top: -2.7rem; right: -7rem; font-size: 1.21rem;">%</span>
              </div>
            </div>

            <div id="preco-ativar"
                 style="display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1.35rem; width: 90%; height: 4.5rem; border-radius: 7px; padding: 1rem; margin: auto; margin-top: 0.1em; margin-bottom: 1rem; background: var(--mfy-main); color: white; font-family: Montserrat, sans-serif; cursor: pointer; box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 11px -7px, rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;">
              Simular
            </div>

            <div id="alerta-form1" class="hdn" style="width: 90%; margin: auto">
              <img src="https://img.icons8.com/officexs/16/000000/spam.png" style="width: 0.77em" />
              <span style="color: red; font-size: 14px; vertical-align: top">Preencha os campos acima para simular.</span>
            </div>
          </div>

          <div style="display: none">
            <iframe id="quotation-iframe" src=""></iframe>
            <input type="checkbox" id="simular" style="margin-left: 0.5em" />
            <label for="simular" style="font-size: 0.7em; float: right; display: inline-block; max-width: 6em; position: relative; left: -0.7em; top: 1em;" value="false">Simular com minha conta</label>

            <span style="margin: 0.5em 0em 0em 0.5em">Margem de lucro desejada:</span>

            <div class="andes-form-control" style="padding: 0em 0em 0em 0em; font-weight: bold">
              <input id="margem" type="number" class=""
                     style="margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; background-color: #80808000; border-radius: 0.35em; border: 1px solid #80808047; width: 7.7em; font-size: 1em; padding: 0.35em; width: 3.5em; font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;" />
              % ou R$
              <input id="mrgbrl" type="number" class=""
                     style="margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; background-color: #80808000; border-radius: 0.35em; border: 1px solid #80808047; width: 7.7em; font-size: 1em; padding: 0.35em; width: 7em; font-family: Proxima Nova, -apple-system, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;" />
            </div>
          </div>
        </div>
      </div>
    </div>`;

  spot2[0].insertAdjacentHTML("afterbegin", btn_preco);
  spot2[0].insertAdjacentHTML("beforeend", price_tool);

  (function () {
    let tipo = "";
    switch (tipo_anuncio) {
      case "gold_pro":
        tipo = "Premium";
        break;
      case "gold_special":
        tipo = "Clássico";
        break;
      case "free":
        tipo = "Básico/Gratuito";
        break;
      default:
        tipo = "";
    }

    const marker = `
      <div id="mfy-admarker"
           style="font-size: 0.95rem; display: inline-flex; border-radius: 1em; color: #5a5a5a; box-shadow: 0px 2px 11px -7px #000; padding: 0.2em 1.2em 0.2em 0.2em; align-items: center; width: fit-content; height: 1.5rem;"
           class="ui-pdp-review__amount">
        <svg class="ui-pdp-icon ui-pdp-icon--protected ui-pdp-color--GRAY" style="width: 1rem; margin: -2px 7px;" xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14">
          <use href="#warranty"></use>
        </svg>
        ${tipo}
      </div>`;

    let n = document.getElementsByClassName("ui-pdp-subtitle")[0];
    let a = n?.parentElement;

    if (a.firstElementChild == n) {
      a.insertAdjacentHTML("afterbegin", marker);
      a.setAttribute("style", "padding-top: 1rem; align-items: center; display: flex; gap: .5rem;");
    } else if (n) {
      n[0].insertAdjacentHTML("beforebegin", marker);
    }
  })();

  var e = document.getElementById("price-tool");
  e.className = "hdn";

  document.getElementById("preco-btn").onclick = function () {
    if (document.getElementById("mlfee") == null) {
      if (e.className == "hdn" || e.className == "hdn ui-pdp-buybox") {
        e.className = "ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical";
      } else {
        e.className = "hdn";
      }
    } else {
      if (e.className == "hdn" || e.className == "hdn ui-pdp-buybox") {
        e.className = "ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical";
        document.getElementById("mlfee").style.display = "none";
        document.getElementById("mlpft").style.display = "none";
      } else {
        e.className = "hdn";
        document.getElementById("mlfee").style.display = "flex";
        document.getElementById("mlpft").style.display = "flex";
      }
    }

    if (iscatalog) {
      let btn = document.getElementById("preco-btn");
      if (
        btn &&
        btn.parentElement?.previousSibling?.previousSibling?.classList.contains("ui-pdp-price__part__container")
      ) {
        btn.parentElement?.previousSibling?.previousSibling?.setAttribute(
          "style",
          "position: relative; left: 4rem;"
        );
      }
    }
  };

  var t = document.getElementById("mrgbrl"),
    n = document.getElementById("margem");

  if (
    t.addEventListener("focus", function () {
      n.setAttribute(
        "style",
        "margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; color: lightgray; background-color: #80808024; border-radius: 0.35em; border: 1px solid #80808000; width: 7.7em; font-size: 1em; padding: 0.35em; width: 3.5em; font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"
      );
      n.setAttribute("disabled", "disabled");

      var e = document.createElement("div");
      e.setAttribute(
        "style",
        "width: 3.7em; background-color: transparent; position: absolute; height: 2.7em; top: 0.35em; left: 0.2em;"
      );
      e.setAttribute("id", "overformbtn");
      e.setAttribute(
        "onclick",
        'var mrgbrl=document.getElementById("mrgbrl"),mrgpct=document.getElementById("margem");' +
          'mrgpct.setAttribute("style","margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; background-color: #80808000; border-radius: 0.35em; border: 1px solid #80808047; width: 7.7em; font-size: 1em; padding: 0.35em; width: 3.5em; font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;");' +
          'mrgbrl.setAttribute("disabled","disabled");' +
          "mrgpct.removeAttribute(\"disabled\");" +
          'mrgbrl.setAttribute("disabled", "disabled");' +
          'mrgbrl.setAttribute("style","margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; color: lightgray; background-color: #80808024; border-radius: 0.35em; border: 1px solid #80808000; width: 7.1em; font-size: 1em; padding: 0.35em; font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;");' +
          "this.remove()"
      );
      t.parentNode.insertBefore(e, t);
    })
  );

  n.addEventListener("focus", function () {
    t.setAttribute(
      "style",
      "margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; color: lightgray; background-color: #80808024; border-radius: 0.35em; border: 1px solid #80808000; width: 7.1em; font-size: 1em; padding: 0.35em; font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"
    );
    t.setAttribute("disabled", "disabled");

    var e = document.createElement("div");
    e.setAttribute(
      "style",
      "width: 7.35em; background-color: transparent; position: absolute; height: 2.7em; top: 0.35em; right: 0.5em;"
    );
    e.setAttribute("id", "overformbtn");
    e.setAttribute(
      "onclick",
      'var mrgbrl=document.getElementById("mrgbrl"),mrgpct=document.getElementById("margem");' +
        'mrgpct.setAttribute("style","margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; color: lightgray; background-color: #80808024; border-radius: 0.35em; border: 1px solid #80808000; width: 7.7em; font-size: 1em; padding: 0.35em; width: 3.5em; font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;");' +
        'mrgpct.setAttribute("disabled","disabled");' +
        "mrgbrl.removeAttribute(\"disabled\")," +
        'mrgbrl.setAttribute("style","margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; background-color: #80808000; border-radius: 0.35em; border: 1px solid #80808047; width: 7.7em; font-size: 1em; padding: 0.35em; width: 7em; font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;");' +
        "this.remove()"
    );
    t.parentNode.insertBefore(e, n);

    n.removeAttribute("disabled");
    n.setAttribute(
      "style",
      "margin: 0.5em 0em 0.5em 0.35em; font-weight: bold; background-color: #80808000; border-radius: 0.35em; border: 1px solid #80808047; width: 7.7em; font-size: 1em; padding: 0.35em; width: 3.5em; font-family: Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"
    );
  });

  if (iscatalog) {
    let e = document.getElementById("price-tool");
    e.classList.add("ui-pdp-buybox");
    e.parentElement.setAttribute("style", "align-items:start");
    e.style.minWidth = "fit-content";

    let t = document.getElementsByClassName("ui-pdp-price__main-container");
    t.length < 2 && e.parentElement?.previousElementSibling?.setAttribute("style", "margin: 0 0 .75rem 2.2rem");

    let n = document.getElementById("preco-btn");
    if (n) {
      n.style.marginTop = "-2rem";
      n.nextSibling.style.margin = "-2rem 0 0 4.2rem";
      n.style.top = "-2rem";

      if (n.parentElement?.previousSibling?.previousSibling?.classList.contains("ui-pdp-price__part__container")) {
        n.parentElement?.previousSibling?.previousSibling?.setAttribute("style", "position: relative; left: 4rem;");
      }

      t.length > 2 && ((n.nextSibling.style.margin = "1rem 0px 0px 0rem"), (n.style.margin = "2.5rem -1rem 1rem 0"));

      let e2 = n.parentElement;
      if (e2) {
        e2.getElementsByClassName("andes-money-amount__discount")[0] &&
          ((n.style.margin = "3rem 1rem 0rem 0px"), n.nextSibling.setAttribute("style", ""));
      }
    }

    let a = document.getElementsByClassName("ui-pdp-price__second-line")[0],
      i = a?.parentElement,
      s = i?.firstChild,
      o = s == a,
      r = a.getElementsByClassName("ui-pdp-price__second-line__label");

    if (t.length > 1) {
      let count = 0;
      if (r[0]) count = r[0].children.length;

      if (o) {
        if (count > 0) {
          a.firstChild.setAttribute("style", "position: relative; left: 3.1em;");
        } else {
          a.firstChild.setAttribute("style", "position: relative; left: 4rem;");
          a.nextSibling && a.nextSibling.style && (a.nextSibling.style.marginTop = "1rem");
        }
      } else if (count > 2) {
        a.style.margin = "-7rem 0rem 2rem 4rem";
        s.setAttribute("style", "top: -6.8rem; left: 4rem; position: relative;");
      } else {
        let high = document.getElementsByClassName("ui-pdp-highlights"),
          pills = document.getElementsByClassName("ui-vpp-coupons__pills-container");
        if (high.length > 0 && pills.length > 0) {
          a.style.margin = "0 0 -5rem 4rem";
          s.setAttribute("style", "top: 0; left: 4rem; position: relative;");
        }
      }
    } else if ((t.length = 1)) {
      a.style.margin = "0 0 0.75rem 0.5rem";
    }
  }
}

function s() {
  function e(t) {
    localStorage.removeItem("lastquote");

    var n = window.setInterval(function () {
      quotationData = localStorage.getItem("lastquote");
      quoteObject = quotationData ? JSON.parse(quotationData) : [];
      quoteObject?.length > 0 &&
        (window.clearInterval(n),
        (function () {
          if (
            ((quotationData = localStorage.getItem("lastquote")),
            (quoteObject = quotationData ? JSON.parse(quotationData) : []),
            quoteObject.length > 0)
          ) {
            var t = document.getElementsByTagName("range-slider");
            document.getElementById("dynamic-pav") ||
              t[0].insertAdjacentHTML(
                "beforebegin",
                `
            <input
              style="font-family: 'Montserrat', sans-serif; border: 0; font-size: 1.75rem; font-weight: 600; text-align: center;"
              id="dynamic-pav"
              value="R$ ${t[0].value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}"
            >`
              );

            document.getElementById("pricetool_loading").classList.add("new-hdn");
            document.getElementById("passo-02").classList.remove("new-hdn");
            iFrame.setAttribute("src", "");

            var n = document.getElementById("pt_result_tax"),
              a = document.getElementById("pt_result_shipping"),
              i = document.getElementById("pt_result_fee"),
              s = document.getElementById("pt_result_revenue"),
              o = document.getElementById("pt_result_profit"),
              r = document.getElementById("pt_result_profitpct"),
              l = document.getElementById("pt_result_markup"),
              d = document.getElementById("pt_result_marketplacecut"),
              m = quoteObject[0];

            let e = {},
              b = {};
            var c = 0,
              p = 0,
              g = 0;

            try {
              e = m.bricks.find((e) => "summary" === e.id);
              b = e.bricks.find((e) => "summary_container_col0_row3" === e.id);
              c = b.bricks[0].data.text.split("R$")[1].trim();
              p = m.bricks.find((e) => "shipping_container" === e.id);
              g = p.bricks[5].bricks[0].data.new_price.split("R$")[1].trim();
            } catch (t) {
              e = m.bricks[5];
              c = e.bricks[6].bricks[0].data.text.split("R$")[1].trim();
              p = quoteObject[0].bricks[4].bricks;
              g = p[Object.keys(p).length - 1].bricks
                .find((e) => null != e.data?.new_price)
                .data.new_price.split("R$")[1]
                .trim();
            }

            c = c.replace(".", "").replace(",", ".");
            c = parseFloat(c);
            s.innerText = c.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            g = g.replace(".", "").replace(",", ".");
            g = parseFloat(g);
            a.innerText = g.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            var f = PAV >= 79 ? 0 : meliCurrentFee;
            i.innerText = f.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            let v = PAV - c,
              x = PAV * (aliquota / 100);

            n.innerHTML =
              `<span style="font-size: 0.92rem"> (${parseFloat(aliquota).toFixed(2)}%) </span>` +
              x.toFixed(2).toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            let w = c - productCost - x;
            o.innerText = w.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            let _ = w / PAV;
            r.innerText = (100 * _).toFixed(2) + "%";

            let E = (w / productCost) * 100;
            l.innerText = E.toFixed(2) + "%";

            let k = v - g - f;
            var u = (k / PAV) * 100;

            d.innerHTML =
              `<span style="font-size: 0.92rem"> (${u.toFixed(1)}%) </span>` +
              k.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            document.getElementById("pt_result_cost").innerText = parseFloat(productCost).toLocaleString(
              "pt-br",
              { style: "currency", currency: "BRL" }
            );

            let L = document.getElementById("dynamic-pav");

            function y(e, t = 350) {
              let n;
              return (...a) => {
                clearTimeout(n);
                n = setTimeout(() => {
                  e.apply(this, a);
                }, t);
              };
            }

            L.value = PAV.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            const T = y(() => h());
            L.addEventListener("keyup", function () {
              T();
            });

            const A = y(() => h());
            t[0].addEventListener("input", (e) => {
              const t = e.target,
                n = document.getElementById("dynamic-pav");
              n &&
                (n.value = `R$ ${t.value.replace(".", ",").toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`);
              A();
            });

            let S = document.getElementById("pav-slider");
            if (PAV >= 79) {
              S.setAttribute("min", 79);
              S.setAttribute("aria-valuemin", 79);
              S.setAttribute("max", 5 * PAV);
              S.setAttribute("aria-valuemax", 5 * PAV);
              S.setAttribute("value", PAV);
            } else {
              S.setAttribute("min", 7);
              S.setAttribute("aria-valuemin", 7);
              S.setAttribute("max", 78);
              S.setAttribute("aria-valuemax", 78);
              S.setAttribute("value", PAV);
            }

            let B = document.getElementById("pt_goback");
            B &&
              (B.onclick = function () {
                localStorage.removeItem("lastquote");
                stepOne.classList.remove("new-hdn");
                stepTwo.classList.add("new-hdn");
                stepLoading.classList.add("new-hdn");
              });
          }

          function h() {
            let t = document.getElementById("dynamic-pav");

            function a() {
              let e = PAV * (parseFloat(aliquota) / 100);
              n.innerHTML =
                `<span style="font-size: 0.92rem"> (${parseFloat(aliquota).toFixed(2)}%) </span>` +
                e.toFixed(2).toLocaleString("pt-br", { style: "currency", currency: "BRL" });
              d.innerHTML =
                `<span style="font-size: 0.92rem"> (${u.toFixed(1)}%) </span>` +
                ((u.toFixed(1) / 100) * PAV).toLocaleString("pt-br", { style: "currency", currency: "BRL" });

              let t = PAV - (u.toFixed(1) / 100) * PAV - f - g;
              s.innerText = t.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

              let a = t - productCost - e;
              o.innerText = a.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

              let i = (a / PAV) * 100;
              r.innerText = i.toFixed(2) + "%";

              let m = (a / productCost) * 100;
              l.innerText = m.toFixed(2) + "%";
            }

            t = parseFloat(t.value.replace("R$", ""));

            if (null == (PAV = t) || isNaN(PAV) || "R$ NaN" == PAV || "NaN" == PAV || "" == PAV || " " == PAV || 0 == PAV || PAV < 7) {
              PAV = 7;
            }

            t.value = PAV.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

            if (PAV < 79 && f == meliCurrentFee) a();
            else if (PAV >= 79 && f == meliCurrentFee) {
              f = 0;
              e(!0);
            } else if (PAV >= 79 && 0 == f) a();
            else if (PAV < 79 && 0 == f) {
              f = meliCurrentFee;
              e(!0);
            }
          }
        })());
    }, 500);

    if (
      (productCost = document.getElementById("custo")?.value),
      (PAV = t
        ? parseFloat(document.getElementById("dynamic-pav")?.value.replace("R$", ""))
        : parseFloat(document.getElementById("pav-input")?.value.replace("R$", ""))),
      0 == (aliquota = document.getElementById("aliq")?.value ?? 0) && (aliquota = 1e-4),
      "" == productCost || "" == PAV || "" == aliquota
    )
      alerta_form.classList.toggle("hdn");
    else {
      alerta_form.classList.add("hdn");
      (PAV * (Math.abs(aliquota) / 100)).toFixed(2);

      iFrame = document.getElementById("quotation-iframe");
      stepOne = document.getElementById("passo-01");
      stepTwo = document.getElementById("passo-02");
      stepLoading = document.getElementById("pricetool_loading");

      stepOne.classList.add("new-hdn");
      stepLoading.classList.remove("new-hdn");
      t && stepTwo.classList.add("new-hdn");

      fetchCategoryWithCache(categoria_Local, (e) => {
        var t;
        if (
          e &&
          ((t = e?.settings?.catalog_domain),
          "" == (iFrame = document.getElementById("quotation-iframe"))?.getAttribute("src"))
        ) {
          iFrame?.setAttribute(
            "src",
            `https://www.mercadolivre.com.br/simulador-de-custos/api/refresh-calculator?user_id=${comprador}&site_id=MLB&locale=pt_BR&channels=marketplace&category_id=${categoria_Local}&domain_id=${t}&condition=new&selling_price_ML=${PAV}&listing_type_id=${tipo_anuncio}&shipping_channel=mercado_envios&listing_types_col1_row2_SUB1=installments&selling_price_MS=0`
          );
        }
      });
    }
  }

  simular_btn = document.getElementById("preco-ativar");
  alerta_form = document.getElementById("alerta-form1");

  let t = setInterval(() => {
    (simular_btn = document.getElementById("preco-ativar")) &&
      ((simular_btn.onclick = function () {
        e();
      }),
      clearInterval(t));
  }, 350);
}

// IIFE de inicialização da página/anúncio
!(function () {
  if ("anuncio" == paginaAtual) {
    spot0 = document.getElementsByClassName("ui-pdp-header");
    spot = document.getElementsByClassName("ui-pdp-title");
    title = spot[0]?.innerText;
    (spot2 = document.getElementsByClassName("ui-pdp-container__row--price"))[0] ||
      (spot2 = document.getElementsByClassName("ui-pdp-price__main-container"));

    null != document.getElementsByClassName("ui-pdp-price__subtitles")[0] &&
      (eapricefix = document.getElementsByClassName("ui-pdp-price__subtitles")[0].firstChild);

    let r = new Date();
    r = r.toLocaleDateString("pt-br");

    let l = document.getElementsByClassName("ui-pdp--sticky-wrapper")[iscatalog ? 2 : 0];
    if (l) {
      new MutationObserver(function (e) {
        e.forEach(function (e) {
          "top: 10px;\n" != e.target.getAttribute("style") &&
            "top: 10px;\nmargin-top: 0px;\n" != e.target.getAttribute("style") &&
            e.target.setAttribute("style", "top: 10px;\nmargin-top: 0px;\n");
        });
      }).observe(l, { attributes: !0, attributeFilter: ["style"] });
    }

    if (
      (price_tool_fix =
        '<div id="price-tool" style="border: 1px solid #0000001a; border-radius: 0.7em;" class="ui-pdp-buybox smooth ui-pdp-container__row ui-pdp-component-list pr-16 pl-16 alinharvertical"> ... (conteúdo omitido aqui para brevidade) ... </div>',
      (btn_preco_fix =
        '<div id="preco-btn" class="andes-button andes-button--loud mfy-main-bg  pricebtn" style="width: 3em; height: 3em; margin-top: 1em; margin-right: 0.5em; padding:0.5em 0.1em 1em 0.1em; border-radius: 3.5em; position: relative; z-index: 100;"><img id="preco-img" style="width:50%;" src="https://img.icons8.com/ios-glyphs/30/ffffff/estimate.png"/></div>'),
      iscatalog)
    ) {
      variationsbtn = document.getElementsByClassName("ui-pdp-variations--thumbnail");
      btn_preco = btn_preco_fix;
      spot2 = document.getElementsByClassName("ui-pdp-price__subtitles");

      let e = document.getElementsByClassName("ui-pdp-price__main-container");
      if (!spot2[0] && e.length < 2) {
        let e2 = document.createElement("div");
        e2.innerHTML = btn_preco_fix;
        let t2 = e2.firstElementChild;
        t2.style.margin = "0rem -1rem 3rem 0";
        t2.style.float = "left";
        spot2 = document.getElementsByClassName("ui-pdp-price__main-container");
        btn_preco = `${t2.outerHTML}`;
      } else if (e.length > 2) {
        let e2 = document.createElement("div");
        e2.innerHTML = btn_preco_fix;
        let t2 = e2.firstElementChild;
        t2.style.margin = "0rem -1rem 3rem 0";
        spot2 = document.getElementsByClassName("ui-pdp-container__row--price");
        btn_preco = `${t2.outerHTML}`;
      }

      for (let e3 = 0; e3 < variationsbtn.length; e3++)
        variationsbtn[e3].addEventListener("click", function () {
          let e = this,
            t = e.getAttribute("href");
          e.setAttribute("href", window.location.href.split("br/")[0] + "br" + t);
          window.location.href = e.getAttribute("href");
        });
    }

    function o() {
      if (null != verif && "pro" == verif) {
        eaSince =
          '<div style="font-size: 0.95rem; font-weight: 700; display: inline-flex; border-radius: 1em; color: rgb(90, 90, 90); box-shadow: rgb(0, 0, 0) 0px 2px 11px -7px; padding: 0.35em 1em; position: relative; transition: 0.35s; min-width: fit-content;" id="easince"><span style=" margin-top: 0.2em;">Criado há: ' +
          (isNaN(dias) ? "?" : dias) +
          ' dia(s)</span><span style="position: absolute; top: 1.75em; font-size: 0.92em; font-weight: 200; opacity: 0; transition: all 0.35s;">(' +
          (data_br ?? "--/--/----") +
          ")</span></div>";

        btn = !alert_media_vendas && dias > 30
          ? ` ... HTML do botão com média ... `
          : ` ... HTML alternativo com alerta ... `;

        visits = '<span>? Visitas totais <span class="andes-button--loud mfy-main-bg  andes-button" style="margin-left: 0.5em; margin-top: 0.35em; font-size:14px!important; display: inherit; padding: 0.1em 0.4em;"> Conversão de <strong>?%</strong></span></span><br><span class="ui-pdp-subtitle" id="vendaporvisitas" style="position: relative; top: -0.86em;">Vende a cada x Visitas</span>';

        const c = (e) => e.charAt(0).toUpperCase() + e.slice(1),
          p = dayjs(),
          g = 6;

        let f = p.month() - g,
          u = p.year();
        f < 0 && ((u -= 1), (f += 12));

        const y = [],
          h = [];
        for (let e = 0; e < g; e++) {
          const t = dayjs().year(u).month(f + e).date(1);
          let n = c(t.locale("pt-br").format("MMM"));
          n = n.replace(".", "");
          y.push(n);
          h.push(t.format("YYYY-MM-01"));
        }

        const b = h.map((e) => dayjs(e).endOf("month").format("YYYY-MM-DD")),
          v = [
            ...h.map(
              (e, t) =>
                `${mfyProxyLessRestricted}https://api.mercadolibre.com/items/visits?ids=${item_ID}&date_from=${e}&date_to=${b[t]}`
            ),
          ],
          x = [];

        function o(e, t) {
          let n = document.getElementById("eagraph"),
            a = document.getElementById("salesestimatebtn");

          if (n) {
            // ... monta conteúdo do gráfico (omitido para brevidade) ...
            new ApexCharts(document.querySelector("#eachart"), i).render();
          }

          let w = !1,
            _ = !0,
            E = !1,
            k = "";

          function r() {
            let e = document.getElementById("eagraph");
            e && (e.classList.toggle("hdn2"), e.classList.toggle("transp"));
            visitChartOpening = !1;
          }

          function l() {
            let e = document.getElementById("eabtn-chart");
            if (e) {
              function t() {
                if (w) r();
                else if (((w = !0), _)) {
                  document.querySelector("#eachart") ||
                    (async function (e) {
                      k = e.innerHTML;
                      spinLoaderManager.replaceContent(e);
                      e.style.backgroundColor = "#ebebeb";
                      x.length = v.length;

                      await Promise.all(
                        v
                          .map((e, t) =>
                            fetch(e, eaInit)
                              .then((e) => e.json())
                              .then((e) => {
                                x[t] = parseFloat(e[0].total_visits);
                              })
                              .catch(function () {
                                x[t] = 0;
                              })
                          )
                      ).then(() => {
                        o(x);
                      });

                      document.getElementById("salesestimatebtn")?.addEventListener("click", function (e) {
                        e.target.style.visibility = "hidden";
                        o(x, !0);
                      });

                      _ = !1;
                      w = !1;
                      e.innerHTML = k;
                      E = !0;
                      r();
                      e.style.backgroundColor = "";
                    })(e);
                }
              }

              e.removeEventListener("click", t);
              if (dias > 30) e.addEventListener("click", t);
              else {
                e.style.transition = "all 0.35s ease";
                e.style.alignItems = "center";
                e.addEventListener("mouseover", function () {
                  e.style.width = "fit-content";
                  e.style.backgroundColor = "#ebebeb";

                  const t = document.getElementById("eabtn-chart-tooltip");
                  t && ((t.style.display = "flex"), (t.style.opacity = "1"));
                });

                e.addEventListener("mouseout", function () {
                  e.style.backgroundColor = "";
                  e.style.width = "2.35em";

                  const t = document.getElementById("eabtn-chart-tooltip");
                  t && ((t.style.display = "none"), (t.style.opacity = "0"));
                });
              }
            } else setTimeout(l, 300);
          }

          l();

          const L = Date.now();

          function d(e) {
            visitastotais = e[Object.keys(e)[0]];
            conversaototal = isNaN(vendas / visitastotais) ? 0 : vendas / visitastotais;
            visitaporvenda = visitastotais / (vendas > 0 ? vendas : 1);
            visitaporvenda_fix = isNaN(visitaporvenda) ? "?" : parseFloat(visitaporvenda).toFixed(0);
            visitasparavender = parseFloat(visitaporvenda_fix);

            const t = (function ({ isCatalog: e, totalVisits: t, conversion: n, visitsPerSale: a, hasSales: i }) {
              return e
                ? ` ... bloco de HTML para catálogo ... `
                : ` ... bloco de HTML para não catálogo ... `;
            })({
              isCatalog: iscatalog,
              totalVisits: Number(visitastotais) ?? "-",
              conversion: parseFloat(100 * conversaototal).toFixed(1) ?? "-",
              visitsPerSale: visitasparavender,
              hasSales: vendas > 0,
            });

            const n = Date.now() - L,
              a = Math.max(0, 800 - n);

            setTimeout(() => {
              const e = document.getElementById("visits-component");
              e && ((e.outerHTML = t), setTimeout(l, 250));
            }, a);
          }

          document.dispatchEvent(new CustomEvent("GetVisitsData", { detail: { itemId: item_ID } }));

          const T = (e) => {
            const { itemId: t, visitsData: n } = e.detail;
            t === item_ID && n
              ? d(n)
              : fetch(`${mfyProxyLessRestricted}https://api.mercadolibre.com/visits/items?ids=${item_ID}`, eaInit)
                  .then((e) => e.json())
                  .then((e) => {
                    d(e);
                    document.dispatchEvent(
                      new CustomEvent("StoreVisitsData", { detail: { itemId: item_ID, visitsData: e } })
                    );
                  })
                  .catch(function () {
                    const t = document.getElementById("visits-component");
                    t &&
                      (t.innerHTML = `
                      <div style="opacity: 0.5;">
                        <span>-</span>
                      </div>`);
                  }),
              document.removeEventListener("VisitsDataResponse", T)};
        }
      }
    }
  }
})();

function m(e) {
  let t = 0;

  function n() {
    pct_calc1 = (taxa_mlb - t) / preco_Local;
    pct_calc = 100 * pct_calc1;

    mlfee =
      '<br><div id="mlfee" style="background-color: #efefef; ' +
      " box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px; " +
      " color: rgb(63, 63, 63); " +
      " padding: 0em 0.77em 0.45em 0.35em; " +
      " display: inline-flex; " +
      " border-radius: 1em 1em 1em 0em; " +
      " margin-left: 3.5em; " +
      ' visibility: visible; ">' +
      '<img src="https://img.icons8.com/plumpy/24/000000/refund-2.png" style=" position: relative; ' +
      " top: 0.21em; " +
      ' width: 1.35em; ">' +
      '<span style=" font-size: 0.77em; ' +
      " position: relative; " +
      " top: 0.5em; " +
      " left: 0.35em; " +
      ' font-weight: bolder; ">' +
      "<strong>" +
      taxa_mlb.toLocaleString("pt-br", { style: "currency", currency: "BRL" }) +
      "</strong> em taxas <b>(" +
      pct_calc.toFixed(1) +
      "%)</b> </span></div>";

    pftcalc = preco_Local - taxa_mlb;

    mlpft =
      '<div id="mlpft" style="background-color: var(--mfy-main); ' +
      "color: #ffffff; " +
      "padding: 0em 1em 0.45em 0.35em; " +
      "display: inline-flex; " +
      "border-radius: 0em 1em 1em 1em; " +
      "margin-top: 0.35em; " +
      'margin-left: 3.5em; ">' +
      '<img src="https://img.icons8.com/ios-glyphs/64/ffffff/refund-2.png" style="position: relative; ' +
      "top: 0.21em; " +
      'width: 1.35em; ">' +
      '<span style="font-size: 1.1em; ' +
      "position: relative; " +
      "top: 0.21em; " +
      "left: 0.31em; " +
      'font-weight: bolder; ">' +
      "<strong>" +
      pftcalc.toLocaleString("pt-br", { style: "currency", currency: "BRL" }) +
      "</strong> de receita </span></div>";

    spot2[0].insertAdjacentHTML("beforeend", mlfee);
    spot2[0].insertAdjacentHTML("beforeend", mlpft);
  }

  taxa_mlb = e.sale_fee_amount,
  preco_Local < cota_minima_MLB
    ? (t = taxa_cota, n())
    : (t = 0, n());
}

document.addEventListener("VisitsDataResponse", T),
function () {
  spot[0].parentElement.setAttribute("style", "flex-direction: column;"),
  spot[0].insertAdjacentHTML("beforebegin", btn);

  let e = document.getElementById("easince");
  e &&
    (e.addEventListener("mouseover", function () {
      this.style.padding = "0.35em 1em 1.35em 1em",
      (this.lastChild.style.opacity = "100%");
    }),
    e.addEventListener("mouseout", function () {
      this.style.padding = "0.35em 1em 0.35em 1em",
      (this.lastChild.style.opacity = "0%");
    }));

  let t = document.getElementsByClassName("easalesavg-alert")[0];
  if (
    t &&
    (t.addEventListener("mouseover", function () {
      let e = document.getElementById("eamediapop");
      if (null == e) {
        let e =
          '<div id="eamediapop" class="ui-pdp-buybox" style="pointer-events: none; ' +
          "box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.35) 1px 10px 4px -7px; " +
          "position: absolute; " +
          "top: 12rem; " +
          "padding: 1em; " +
          "font-size: 14px; " +
          "font-weight: 400; " +
          "color: rgb(255, 255, 255); " +
          "background-color: var(--mfy-main); " +
          "z-index: 11; " +
          'display: block; ">' +
          "<b>Anúncio com menos de 30 dias.</b> (Média mensal foi estimada apenas a partir das vendas do primeiro mês).</div>";
        this.insertAdjacentHTML("afterend", e);
      } else e.style.display = "block";
    }),
    t.addEventListener("mouseout", function () {
      document.getElementById("eamediapop").style.display = "none";
    })),
    "anuncio" == paginaAtual && "pro" == verif
  ) {
    let e = document.getElementsByClassName("ui-pdp-gallery__wrapper"),
      t =
        '<div class="eadownloadicon"> <img src="https://img.icons8.com/fluency-systems-regular/48/ffffff/file-download.png" style=" width: 100%; "></div>',
      a =
        '<span class="eagetallimgs ui-pdp-gallery__wrapper"><label class="ui-pdp-gallery__label"><div class="ui-pdp-thumbnail ui-pdp-gallery__thumbnail"><div class="eagetallimgs-inside ui-pdp-thumbnail__picture" style="background: var(--mfy-main); ' +
        "padding: 1em; " +
        '"><img width="44" height="44" src="https://img.icons8.com/material-rounded/24/ffffff/download-2.png" style=" position: relative; ' +
        " top: -0.5em; " +
        '"><span style=" color: #fff; ' +
        " position: relative; " +
        " top: -1em; " +
        " left: -0.21em; " +
        ' font-size: 11px; ">' +
        "Todas</span></div></div></label></span>",
      i = document.getElementsByClassName("ui-pdp-gallery__column")[0],
      s = [];

    for (let n = 0; n < e.length; n++)
      if (void 0 !== e[n].getElementsByTagName("img")[0]) {
        let a = `${
          e[n]
            .getElementsByTagName("img")[0]
            .getAttribute("src")
            .replace("_Q", "_NQ")
            .replace("NP_", "NP_2X_")
            .replace("-R", "-F")
            .replace(".webp", ".jpg")
        }`;
        s.push(a),
        e[n].getElementsByTagName("img")[0].parentNode.parentNode.insertAdjacentHTML("afterend", t);
      }

    i.insertAdjacentHTML("afterbegin", a);

    let o = document.getElementsByClassName("eagetallimgs")[0],
      r = document.getElementsByClassName("eadownloadicon");

    async function n(e, t) {
      const n = await fetch(e),
        a = await n.blob(),
        i = URL.createObjectURL(a),
        s = document.createElement("a");
      (s.href = i),
        (s.download = t),
        document.body.appendChild(s),
        s.click(),
        document.body.removeChild(s);
    }
if (void 0 !== r) {
  for (let e = 0; e < r.length; e++) {
    r[e].addEventListener("click", function () {
      n(s[e], "imagem" + (e + 1));
    });
  }
}

if (void 0 !== o) {
  o.addEventListener("click", function () {
    for (let e = 0; e < s.length; e++) {
      n(s[e], "imagem" + (e + 1));
    }
  });
}
}}(),t(),

(async function () {
  document.dispatchEvent(
    new CustomEvent("GetCategoryData", {
      detail: { categoryId: categoria_Local },
    })
  );

  const e = (t) => {
    const { categoryId: n, categoryData: a } = t.detail;

    if (n === categoria_Local && a && a.listing) {
      m(a.listing);
    } else {
      fetch(
        `${mfyProxyLessRestricted}https://api.mercadolibre.com/sites/MLB/listing_prices?price=${preco_Local}&category_id=${categoria_Local}&listing_type_id=${tipo_anuncio}`,
        eaInit
      )
        .then((e) => e.json())
        .then((e) => {
          if (a) {
            const t = { ...a, listing: e };
            document.dispatchEvent(
              new CustomEvent("StoreCategoryData", {
                detail: { categoryId: categoria_Local, categoryData: t },
              })
            );
          }
          m(e);
        })
        .catch(function (e) {});
    }

    document.removeEventListener("CategoryDataResponse", e);
  };

  document.addEventListener("CategoryDataResponse", e);
  n(preco_Local);
})();

dLayerMainFallback();

fetchCategoryWithCache(categoria_Local, (e) => {
  if (e) nomeCategoria = e.name;
});

setTimeout(i, 50);
setTimeout(e, 150);
setTimeout(a, 175);
setTimeout(s, 500);

setTimeout(function () {
  if (spot0[0]) {
    spot0[0].insertAdjacentHTML(
      "afterbegin",
      (function () {
        const e = `background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
 background-size: 200% 100%;
 animation: loading 1.5s infinite;`;

        return `
              <div id="visits-component">
                <style>
                  @keyframes loading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                  }
                  .skeleton-text {
                    ${e}
                    border-radius: 4px;
                    height: 1em;
                    display: inline-block;
                  }
                  .skeleton-pill {
                    ${e}
                    border-radius: 12px;
                    height: 1.2em;
                    display: inline-block;
                  }
                </style>
                ${
                  iscatalog
                    ? `
                <div style="display:flex">
                    <div id="eabtn-chart" style="border-radius: 2rem;
 width: 2.35em;
 padding: 0.14em 0.5em;
 height: 2.35em;
 display: inline-flex;
 position: relative;
 z-index: 10;
 transition: 0.35s;
 align-items: center;
" class="andes-button--loud mfy-main-bg andes-button">
                    <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width: 1.35em;
 margin: auto;
">
                      <div id="eabtn-chart-tooltip" style="width: fit-content;
 display: none;
 flex-direction: column;
 text-align: start;
 line-height: 1;
 font-size: 1rem;
 color:var(--mfy-main);
 padding: 1rem;
 opacity: 0;
">
                        Anúncio com menos de 30 dias,<span style="opacity: .5;">gráfico sem dados suficientes.</span>
                  </div>
                    </div>
                    <span style="margin-left: 3.1em;
position: absolute;
top: 0.45em;
font-weight: 400;
"><span class="skeleton-text" style="width: 80px;"></span> Visitas totais</span>
                  <div id="eadivider"></div>
                </div>
                `
                    : `
                  <div style="display:flex;
margin: 0rem 0 1.25rem 0;
gap: 1rem;
">
                    <div id="eabtn-chart" style="border-radius: 2rem;
 width: 2.35em;
 padding: 0.14em 0.5em;
 height: 2.35em;
 display: inline-flex;
 position: relative;
 z-index: 10;
 transition: 0.35s;
 align-items: center;
" class="andes-button--loud mfy-main-bg andes-button">
                      <img src="https://img.icons8.com/ios-glyphs/32/ffffff/combo-chart.png" style="width: 1.35em;
 margin: auto;
">
                      <div id="eabtn-chart-tooltip" style="width: fit-content;
 display: none;
 flex-direction: column;
 text-align: start;
 line-height: 1;
 font-size: 1rem;
 color:var(--mfy-main);
 padding: 1rem;
 opacity: 0;
">
                        Anúncio com menos de 30 dias,<span style="opacity: .5;">gráfico sem dados suficientes.</span>
                      </div>
                    </div>
                    <div style="display: flex;
gap: 1rem;
min-width: fit-content;
justify-content: space-between;
">
                      <div style="display: flex;
 flex-direction: column;
">
                        <div style="display: flex;
gap: 0.5rem;
">
                          <span class="skeleton-text" style="width: 25px;"></span> 
                          <span>Visitas totais</span>
                        </div>
                        <div class="mfy-main-bg" style="position:relative;
font-size:14px!important;
min-width: fit-content;
padding: 0.2rem 1em;
display: flex;
gap: .25rem;
color: #fff;
border-radius: 1rem;
">
                          <span style="min-width: fit-content;">Conversão:</span> <span style="opacity: 0.25;
font-weight: 700;
"><span class="skeleton-text" style="width: 30px;"></span>%</span>
                        </div>
                      </div>
                      <div id="vendaporvisitas" style="position: relative;
text-align: end;
">
                        Vende a cada:<br>
                        <span class="skeleton-text" style="width: 80px;"></span>
                      </div>
                    </div>
                  </div>
                  <div id="eadivider" style="background-color: #00000014;
height: 1px;
width: 22.7em;
margin: 0rem 0rem 1rem 0rem;
"></div>
                `
                }
              </div>`;
      })()
    );

    let e = spot0[0].parentElement;
    e.parentElement.firstElementChild;
  }


else btn = "", spot[0].insertAdjacentHTML("afterbegin", btn);

spot3 = document.getElementsByClassName("ui-pdp-title");
reflow = document.getElementsByClassName("ui-pdp-header__title-container");
maisFunc = document.getElementById("plusf");

document
  .getElementsByClassName("ui-pdp-header")[0]
  .parentNode.parentNode.setAttribute(
    "style",
    "max-width:352px; margin:auto; margin-right:1em;"
  );

if (iscatalog) {
  document
    .getElementsByClassName("ui-pdp-bookmark")[0]
    ?.setAttribute(
      "style",
      "transform: scale(0.77); top: 1.21em!important; position: absolute; left: 22.5em!important;"
    );
} else {
  document
    .getElementsByClassName("ui-pdp-bookmark")[0]
    ?.setAttribute(
      "style",
      "transform: scale(0.77); top: 1.21em!important; position: absolute; left: 21.5em!important;"
    );
}

if (dataLayer) {
  condicao_produto = dataLayer[0]?.condition;
  preco_Local = dataLayer[0]?.localItemPrice;
  categoria_Local = dataLayer[0]?.categoryId;
  tipo_anuncio =
    dataLayer[0]?.listingType ??
    document.documentElement.innerHTML.split("listing_type_id")[1].split('"')[2];
  comprador = dataLayer[0]?.buyerId;
  vendedor = dataLayer[0]?.sellerId;
  dLayer = dataLayer[0]?.startTime;
  item_ID = dataLayer[0]?.itemId;
}

let d = document
  .getElementsByClassName("ui-pdp-header__subtitle")[0]
  .innerHTML.split(" | ")[1]
  ?.split(" vendidos")[0]
  ?.trim();

d?.endsWith("mil") && ((d = d.replace("mil", "")), (d = 1e3 * parseFloat(d)));

vendas = 0 == vendas.length ? d : vendas;

if (dLayer && "" == data_br) {
  data_br = dayjs(dLayer).locale("pt-br").format("DD/MM/YYYY");
  dataMilisec = Date.parse(dLayer);
  eadiff = eanow - dataMilisec;
  dias = Math.round(eadiff / (8.64 * Math.pow(10, 7)));
  media_vendas =
    0 == dias || isNaN(vendas)
      ? "Indisponível (0 dias)"
      : Math.round(vendas / (dias / 30));
  o();
} else {
  o();
}

function storeFresh(e) {
  AuthDataStore("ealocalrst", e);
  checkrefresh(true);
}

async function findfreshAuth(e) {
  await fetch(mfyEndpoints.auth, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email: `${usuario_logado}`, id: `${uid}` }),
  })
    .then((e) => e.json())
    .then((e) => {
      storeFresh(e);
    })
    .catch((e) => {});
}

function appendToken(e) {
  eaHeaders.append("Authorization", " Bearer " + e);
  eadataStore("local_usertkn", e, TTL1);
}

function dataCleanup() {
  if ("anuncio" === paginaAtual) {
    let e = document.getElementsByTagName("mfyloader");
    if (e) for (loader of e) loader.remove();
  }
  getMLinfo();
}

var tried = !1;

async function validateToken() {
  let e = eadataRetrieve("local_usertkn");

  async function t() {
    let e = parseJwt(mfy_userdata?.token);
    if (0 == tried) {
      var t = { method: "POST", headers: myHeaders, redirect: "follow" };
      fetch(
        "https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=323521671107951&client_secret=FbKILwMpPIa89q6lYd59yA5wJrPK2noN&refresh_token=" +
          e.token,
        t
      )
        .then((e) => e.json())
        .then((e) => {
          if (400 != e.status) {
            let t = e.access_token;
            eaHeaders.append("Authorization", " Bearer " + t);
            eadataStore("local_usertkn", t, TTL1);
            window.location.reload(!0);
          } else (tried = !0), validateToken();
        })
        .catch((e) => {});
    } else askPermissions(usuario_logado);
  }

  if (null == e || null == e) t();
  else {
    var n = new Headers();
    if (
      (n.append("pragma", "no-cache"),
      n.append("cache-control", "no-cache"),
      n.append("Authorization", " Bearer " + e.toString()),
      AuthDataCheck("remote_user"),
      await new Promise((e) => setTimeout(e, 500)),
      mfy_userdata?.remote?.email != usuario_logado)
    )
      try {
        const n = await fetchUserMeData(e, !1);
        if (n.success && n.data) {
          const a = n.data;
          AuthDataStore("remote_user", { email: a.email, id: a.id }),
            a.email == usuario_logado
              ? (eaHeaders.append("Authorization", " Bearer " + e),
                dataCleanup())
              : t(),
            n.fromCache;
        } else t();
      } catch (e) {
        t();
      }
    else eaHeaders.append("Authorization", " Bearer " + e), dataCleanup();
  }
}

function findTier(e) {
  verif = e.tier;
  verif = "pro";
  validateToken();
}

var extdataVerified = !1,
  userdataOk = !0,
  dataTrial = 0;

async function registerNewAcc() {
  null == uid &&
    null == uid &&
    (uid = `${
      dataLayer?.at(0)?.buyerId
        ? dataLayer[0].buyerId
        : melidata_namespace?.actual_track.user.user_id
        ? melidata_namespace?.actual_track.user.user_id
        : preLoadedState?.user?.id
    }`),
    (registeringAcc = !0),
    await fetch(mfyEndpoints.register, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email: `${usuario_logado}`, id: uid }),
    })
      .then((e) => e.json())
      .then((e) => (window ? window.location.reload() : null))
      .catch((e) => {});
}

async function getnstoreData(e) {
  if (null != usuario_logado)
    if (
      ((extdataVerified = !0),
      null == uid &&
        null == uid &&
        (uid = `${
          dataLayer?.at(0)?.buyerId
            ? dataLayer[0].buyerId
            : melidata_namespace?.actual_track.user.user_id
            ? melidata_namespace?.actual_track.user.user_id
            : preLoadedState?.user?.id
        }`),
      await fetch(mfyEndpoints.auth, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email: `${usuario_logado}`, id: uid }),
      })
        .then((e) => e.json())
        .then((e) => AuthDataStore("ealocalrst", e))
        .catch((e) => {}),
      "userverif" == e && window.location.reload(),
      1 == e)
    )
      if (++dataTrial > 1) {
        userdataOk = !1;
        let e = document.getElementsByTagName("mfyloader");
        if (e) for (loader of e) loader.remove();
        setTimeout(() => {
          registeringAcc || registerNewAcc();
        }, 1e3);
        spot0 = document.getElementsByClassName("ui-pdp-header");
        document.getElementById("acc-register-btn");
      } else verifyData("getnstoreData-try2");
    else verifyData("getnstoreData");
}

async function verifyData(e) {
  if (
    (AuthDataRetrieve("ealocalrst"),
    await new Promise((e) => setTimeout(e, 1e3)),
    mfy_userdata || eadataRetrieve("local_usertkn"))
  )
    if (null == mfy_userdata?.token)
      if (extdataVerified) {
        userdataOk = !1;
        let e = document.getElementsByClassName("eadropdown")[0],
          t =
            '<div style=" position: absolute; background: red; width: 1em; text-align: center; border-radius: 2em; color: #fff; font-size: 0.75em; font-weight: bolder; padding: 0em 0.85em 0em 0.6em; top: 7.5em; left: 81.5em; z-index: 14;" class="eadropalert">!</div>';
        (userdataOk = !1), e && e.insertAdjacentHTML("beforebegin", t);
      } else getnstoreData();
    else {
      findTier(parseJwt(mfy_userdata?.token));
    }
  else getnstoreData(!0);
}

const kFormatter = (e) => {
  if (Math.abs(e) > 999) {
    const t = Math.sign(e),
      n = (Math.abs(e) / 1e3).toFixed(1);
    return t * parseFloat(n) + "k";
  }
  return e.toString();
};


function runOnList() {
  if ("lista" === paginaAtual) {
    preLoadedState =
      typeof window.__PRELOADED_STATE__ !== "object" ||
      window.__PRELOADED_STATE__ === null ||
      window.__PRELOADED_STATE__.tagName
        ? altPreloadedState?.pageState
        : window.__PRELOADED_STATE__;
    listView = preLoadedState?.initialState.analytics_track.pageLayout;

    let d =
      document.getElementsByClassName("ui-search-results")[0] ??
      document.getElementsByClassName("ui-search-layout--grid__grid__layout--grid")[0];
    let m =
      d.getElementsByTagName("ol")[0] ??
      d.getElementsByClassName("ui-search-layout--grid__grid")[0];
    let c = d.querySelectorAll("li");

    var e =
      preLoadedState.initialState.results
        .filter((e) => e.polycard)
        .map((e) => e.polycard).length > 0
        ? preLoadedState.initialState.results
            .filter((e) => e.polycard)
            .map((e) => e.polycard)
        : preLoadedState.initialState.results[4].trends_categories.polycards;

    c = Array.from(c);
    c = c.filter((e) => e.classList.contains("ui-search-layout__item"));

    let p = c.length,
      g = p;
    var t = p;

    let f = `
      <div id="ealistrequest" style="transition: all 0.25s;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(60,115,255);
        background: linear-gradient( #3483fa 92%,  var(--mfy-main) 92%);
        padding: 0.75em 2em;
        margin: 0rem 0rem 1rem 0rem;
        border-radius: 0.5em;
        width: fit-content;
        color: #fff;
        font-size: 0.77em;
        cursor: pointer;
        box-shadow: rgb(0 0 0 / 10%) 0px 11px 6px -7px, rgb(0 0 0 / 13%) 0px 4px 3px -3px;">
        <img src="https://img.icons8.com/pastel-glyph/64/ffffff/analytics.png" style="width: 21px; margin-right: 0.75em;">
        <span style="font-weight: 500; font-size: 1.11em; letter-spacing: 0.01em; margin: 0.35em; font-family: Montserrat;">
          Ativar Métricas de Busca
        </span>
      </div>`;

    let u = `
    <div class="mfy-ad-listinfo_widget" style="display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5rem;
      margin: 0rem 1rem;
      position: relative;
      z-index:999">
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
          gap: .25rem;" class="imageset">
          <img width="16" height="16" src="https://img.icons8.com/material-outlined/ffffff/24/stack-of-photos--v1.png" alt="stack-of-photos--v1">10
        </div>
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
          box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;" class="reviews">
          <img width="18" height="18" src="https://img.icons8.com/sf-ultralight-filled/${mfyMainColorNumbers}/25/star.png" alt="star">4.5
        </div>
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
          box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;" class="local">
          <img width="16" height="16" src="https://img.icons8.com/material-outlined/${mfyMainColorNumbers}/24/visit.png" alt="box--v1">0un
        </div>
      </div>

      ${`
      <div style="
        background-color: #fff159;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .35rem 1rem;
        border-radius: 1rem 0 0 1rem;
        margin-right: -1rem;
        font-size: 1.1rem;
        font-weight: 900;
        letter-spacing: 0.02rem;
        gap: 1rem;
        box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;
        position: absolute;
        top: -1000%;
        right: 0;" class="iscatalog">
        Catálogo
      </div>`}
    </div>`;

    c &&
      verif == "pro" &&
      (m.insertAdjacentHTML("beforebegin", f),
      (function () {
        let e =
            !!preLoadedState.initialState.results[4].trends_categories?.polycards,
          t = e
            ? preLoadedState.initialState.results[4].trends_categories.polycards
            : preLoadedState.initialState.results,
          n = e ? t : t.filter((e) => e.id && e.id.startsWith("POLYCARD")),
          i = !!(n[0]?.polycard || e);

        n = n[0]?.polycard
          ? n.map((e) => e.polycard)
          : n.filter((e) => e?.id && e.id.startsWith("MLB"));

        var s = { imageset: null, reviews: null, medal: null, local: null };
        let o = 0;

        try {
          n.forEach((e, t) => {
            const n = e;
            const r = {
              reviews: i
                ? n?.reviews?.rating_average
                : n?.components?.filter((e) => "reviews" === e.type)[0]?.reviews
                    ?.rating_average,
            };

            Object.keys(r).forEach((e) => {
              r[e] && !s[e] && (s[e] = true);
            });

            let l = !n?.metadata?.url.startsWith("produto");
            l = l != null && l;

            let d = n?.is_ad ?? n?.ads_promotions?.text === "Patrocinado",
              m = false;

            i &&
              n?.components.forEach((e) => {
                if (
                  e &&
                  e.id === "shipped_from" &&
                  e.shipped_from?.text?.includes("{vpp_full_icon}")
                ) {
                  m = true;
                }
              });

            m && (a == null ? (a = 1) : (a += 1));

            let p = u,
              g = document.createElement("div");
            g.innerHTML = p;

            let f,
              y = g.firstElementChild;

            if (l == 0) {
              y.querySelector(".iscatalog").remove();
            } else {
              y.setAttribute("catalog", true);
              o++;
            }

            if (y.querySelector(".local")) y.querySelector(".local").remove();
            if (y.querySelector(".imageset"))
              y.querySelector(".imageset").remove();

            if (d && c[t]) {
              let e =
                c[t].querySelector(".ui-search-item__pub-label") ??
                c[t].querySelector(".poly-component__ads-promotions");
              e &&
                e.setAttribute(
                  "style",
                  "background-color: #eaeaea; color: var(--mfy-dark); border-radius: 0.5em; padding: 0.25em 0.75em; font-size: 0.86em; font-weight: 800; letter-spacing: 0.01em; margin-left: 0.5em;"
                );
            }

            if (listView == "listing") {
              y.style.position = "absolute";
              y.style.bottom = "7%";
              let e = y.querySelector(".iscatalog");
              if (e) {
                e.style.borderRadius = "0 1rem 1rem 0";
                e.style.position = "absolute";
                e.style.top = "-3.5rem";
                e.style.left = "-2.7rem";
                e.style.right = "auto";
              }
            }

            r.reviews
              ? (y.querySelector(".reviews").innerHTML =
                  y.querySelector(".reviews").getElementsByTagName("img")[0]
                    .outerHTML + `${r.reviews}`)
              : y.querySelector(".reviews").remove();

            if (y.querySelector(".imageset")) {
              y.querySelector(".imageset").innerHTML =
                y.querySelector(".imageset").getElementsByTagName("img")[0]
                  .outerHTML + `${r.imageset}`;
            }

            if (r.local) {
              y.querySelector(".local").innerHTML =
                y.querySelector(".local").getElementsByTagName("img")[0]
                  .outerHTML + `${r.local}`;
            }

            if (c[t]) {
              f =
                c[t].querySelector(".ui-search-result__image") ||
                c[t].querySelector(".poly-card__portada");
            }
            f?.insertAdjacentElement("afterend", y);
          });
        } catch (e) {}

        function l(e) {
          switch (e) {
            case "imageset":
              return "Imagens (Soma de todas as variações)";
            case "reviews":
              return "Média de avaliações";
            case "local":
              return "Local do vendedor";
            default:
              return "";
          }
        }

        (async function (e) {
          let t = document.getElementById("eabar_catalograte");
          while (!t) {
            await new Promise((e) => setTimeout(e, 100));
            t = document.getElementById("eabar_catalograte");
          }
          if (t) {
            t.innerHTML = `${e
              .toString()
              .padStart(2, "0")}${t.innerHTML
              .split("-")
              .splice(1)
              .join("-")
              .split("(0%)")[0]}(${((e / g) * 100)
              .toFixed(0)
              .toString()
              .padStart(2, "0")}%)`;
          }
          r(null, 1 + e / g);

          [
            { id: "eabar_category", content: "Categoria" },
            { id: "eabar_fullrate", content: "Anúncios no Full" },
            { id: "eabar_adsrate", content: "Patrocinados" },
            { id: "eabar_catalograte", content: "Anúncios em Catálogo" },
          ].forEach((e) => {
            let t = document.getElementById(e.id).previousElementSibling;
            if (t) {
              t.setAttribute("id", `${e.id}_sibling`);
              tippy(`#${e.id}_sibling`, {
                content: e.content,
                placement: "top",
                theme: "mfy",
              });
            }
          });
        })(o);

        Object.keys(s).forEach((e) => {
          if (s[e] === true) {
            tippy(`.${e}`, {
              content: `${l(e)}`,
              placement: "top",
              theme: "mfy",
            });
          }
        });
      })());

    let y = document.getElementById("ealistrequest");
  }
}


function n(e) {
  let t = e.target
  a = document.getElementById("ealistrequest");

  t.removeEventListener("click", n);
  a.style.margin = "0rem 0rem 1rem 0rem";
  a.outerHTML = `<div id="ealistrequest" style=" margin: 0.35rem 0.35rem 1rem 0.35rem;
 font-weight: 500;
font-size: 1em;
letter-spacing: 0.01em;
font-family: Montserrat;
transition: all 0.25s;
display: flex;
align-items: center;
justify-content: center;
background: var(--mfy-main);
/* background: linear-gradient(25deg, rgb(121 51 255) 92%, rgb(77 18 190) 100%);
 */padding: 0.75em 2em;
border-radius: 0.5em;
width: fit-content;
color: #fff;
font-size: 0.77em;
cursor: pointer;
box-shadow: rgb(0 0 0 / 10%) 0px 11px 6px -7px, rgb(0 0 0 / 13%) 0px 4px 3px -3px;
">Carregando dados ${SpinLoader} </div>`;

  i = document.getElementsByClassName("mfy-ad-listinfo_widget");
  for (let e = 0; e < i.length; e++) i[e].style.display = "none";
  for (let e = 0; e < c.length; e++) l(c[e], e);

  function s(e) {
    let t = e[0],
      n = Array.from(t.querySelectorAll("ol > li")),
      a = document.getElementById("easortselect");

    a &&
      a.addEventListener("change", (e) => {
        !(function (e, t) {
          let n = document.getElementById("easortselect").value,
            a = e[0]?.parentNode || t;
          if ("og" !== n && a) {
            let t = [...e];
            switch (n) {
              case "sales":
                const e = (e) => {
                  const t = parseFloat(e.getAttribute("sales"));
                  return isNaN(t) ? 0 : t;
                };
                t.sort((t, n) => e(n) - e(t));
                break;
              case "lessprice":
                t.sort(
                  (e, t) =>
                    parseFloat(e.getAttribute("product-price")) -
                    parseFloat(t.getAttribute("product-price"))
                );
                break;
              case "mostprice":
                t.sort(
                  (e, t) =>
                    parseFloat(t.getAttribute("product-price")) -
                    parseFloat(e.getAttribute("product-price"))
                );
                break;
              case "time":
                t.sort(
                  (e, t) =>
                    parseFloat(e.getAttribute("product-days")) -
                    parseFloat(t.getAttribute("product-days"))
                );
                break;
            }
            t.forEach((e) => {
              e.style.margin = "0rem 0rem 1rem 0rem";
              a.appendChild(e);
            }),
              (a.style.display = "flex"),
              (a.style.justifyContent = "space-around"),
              a.querySelectorAll(".slick-active img").forEach((e) => {
                e.dataset.src && (e.src = e.dataset.src);
              });
          }
        })(n, t);
      });
  }

  setTimeout(function () {
    let e = `
          <div style="display: flex;
 flex-direction: row;
 align-items: center;
">
          <div style="margin: 1rem 1rem 1rem 0;
width: fit-content;
border: 1px solid rgb(0,0,0,0.31);
border-radius: 1rem;
display: flex;
align-items: center;
justify-content: center;
padding: 1rem 0.5rem;
box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
">
          <img src="https://i.ibb.co/K7Lc6cr/metrify.png" style="pointer-events:none;
 width:15px;
margin: auto;
margin-left:0.75rem;
 margin-right: 0.5rem;
">
          <span>
            Filtrar por <select disabled id="easortselect" style="margin-left: 0.5rem;
 border: none;
 background: transparent;
 font-size: 1.1rem;
 font-weight: 700;
 color: rgb(0,0,0,0.7);
 font-family: Montserrat;
">
            <option value="og">Selecione</option>
            <option value="time">Mais recentes</option>
            <option value="sales">Número de vendas</option>
            <option value="mostprice">Maior preço</option>
            <option value="lessprice">Menor preço</option>
            </select>
          </span>
          </div>
          <div id="mfy-smetrics-status" style="display:flex;
flex-direction:row;
align-items:center">
          <label for="mfy-smetrics-progress">Carregando vendas...</label>
          <progress id="mfy-smetrics-progress" value="0" max=${p} style=" width:  7rem;
 height: 2rem;
 margin: 1rem;
" />
          </div>
          <div id="mfy-catalog-filter-container" style="display:none">
            <label for="mfy-catalog-filter" style="font-size: 1.21rem;
font-weight: 700;
">Exibir:</label>
            <select id="mfy-catalog-filter" style="padding: 0.25rem 0.5rem;
 border-radius: 4px;
 border: 1px solid #ccc;
">
              <option value="todos">Todos</option>
              <option value="ocultar">Ocultar catálogos</option>
              <option value="filtrar">Apenas catálogos</option>
            </select>
          </div>
</div>`;

    let t =
        document.getElementsByClassName("ui-search-results")[0] ??
        document.getElementsByClassName(
          "ui-search-layout--grid__grid__layout--grid"
        )[0],
      n = t.querySelectorAll("ol");

    n[0].insertAdjacentHTML("beforebegin", e);
    s(n);

    document.getElementById("ealistrequest")?.remove();

    document
      .getElementById("mfy-catalog-filter")
      .addEventListener("change", (e) => {
        !(function (e, t) {
          let n = e[0];
          Array.from(n.querySelectorAll("ol > li")).forEach((e) => {
            const n = e.getAttribute("catalog") === "true";
            switch (t) {
              case "todos":
                e.style.display = "";
                break;
              case "ocultar":
                e.style.display = n ? "none" : "";
                break;
              case "filtrar":
                e.style.display = n ? "" : "none";
                break;
              default:
                e.style.display = "";
            }
          });
        })(t.querySelectorAll("ol"), e.target.value);
      });
  }, 2750);

  y?.addEventListener("click", (e) => n(e));
  y?.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.05)";
  });
  y?.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
  });

  document.getElementsByTagName("mfyloader");

  var a =
      document.getElementsByClassName(
        "fulfillment ui-pb-label-builder fulfillment fulfillment"
      ).length > 0
        ? document.getElementsByClassName(
            "fulfillment ui-pb-label-builder fulfillment fulfillment"
          )
        : document.querySelectorAll(".poly-component__shipped-from"),
    i = e.filter((e) => e.metadata && e.metadata.is_pad === "true"),
    s = [];

  function o(e) {
    let t = document.getElementById("eacatextrainfo");

    function n() {
      a.getElementsByTagName("span")[0].innerText = "Carregando...";
      fetch(
        `${mfyProxy}https://api.mercadolibre.com/trends/MLB/${e}`,
        eaInit
      )
        .then((e) => e.json())
        .then((t) =>
          (function (t) {
            let a = t,
              i = [];
            for (let e = 0; e < a.length; e++) i.push(a[e].keyword);

            let s = i.map((e) => e + "\r\n"),
              o = document.getElementById("eacattrends");

            o.firstChild.getElementsByTagName(
              "span"
            )[0].innerText = `${i.length} Resultados `;

            fetchCategoryWithCache(e, (e) => {
              e && (o.lastChild.lastChild.innerText = e.name);
            });

            let r = `<div id="eatrendsbox" style="margin-left:4px;
margin-top: -11px;
position: absolute;
background: #fff;
width: 21em;
padding:3em 1em 1.35em 1em;
box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;
z-index: 2;
border-radius: 7px;
"><span>Lista de termos mais buscados:</span><textarea style="width: 20em;
min-width: 20em;
max-width: 20em;
height:14em;
min-height:14em;
max-height:35em;
margin: 4px 0px;
text-transform: capitalize;
" spellcheck="false">${s.join().toString()}</textarea><button id="eacopytrends" style="font-size: 1.1em;
font-weight: 600;
letter-spacing: -0.01em;
padding: 0em 1em;
border-radius: 3em;
border: 0px;
cursor: pointer;
">Copiar tudo</button><span id="eaclosetrendsbox" style="float: right;
cursor: pointer;
font-size: 0.86em;
">Fechar <img src="https://img.icons8.com/external-android-line-2px-amoghdesign/48/4a90e2/external-close-multimedia-line-24px-android-line-2px-amoghdesign.png" style="width: 1.5em;
position: relative;
top: 5px;
"></span></div>`;

            let l = document.getElementById("eatrendsbox"),
              d = document.getElementById("eacattrendsbtn");

            d && d.removeEventListener("click", n);

            if (l) {
              l.outerHTML = "";
              document
                .getElementById("eacattrends")
                .firstChild.insertAdjacentHTML("beforebegin", r);
            } else {
              document
                .getElementById("eacattrends")
                .firstChild.insertAdjacentHTML("beforebegin", r);

              document
                .getElementById("eacopytrends")
                .addEventListener("click", function () {
                  let e =
                    this.parentNode.getElementsByTagName("textarea")[0];
                  e.select();
                  navigator.clipboard.writeText(e.value);
                  this.innerText = "Copiado!";
                });
            }

            document
              .getElementById("eaclosetrendsbox")
              .addEventListener("click", function () {
                document.getElementById("eatrendsbox").style.display = "none";
              });

            d &&
              d.addEventListener("click", function () {
                document.getElementById("eatrendsbox").style.display = "block";
              });
          })(t)
        )
        .catch(function (e) {});
    }

    t?.insertAdjacentHTML(
      "beforeend",
      '<div id="eacattrends" style="display: inline-block; margin-bottom: 21px;"><span id="eacattrendsbtn" style="position:relative; z-index:3; font-weight:700; background-color:var(--mfy-main); color:#fff; padding:0.35em 0.75em; border-radius:7px; margin: 0em 0.5em; cursor: pointer;"><img src="https://img.icons8.com/ios-glyphs/60/ffffff/hot-sales-hours.png" style="width: 1.21em; position: relative; top: 3px;">\n            <span>Termos mais buscados! </span> <span style="font-size: 0.7em; position: relative; top: -2px; right: -3px; padding: 0px 5px 1px 5px; margin: 0px 0px 0px 5px; border: 1px solid #fff; border-radius: 1em;">categoria</span></span></div>'
    );
    t.setAttribute("style", "margin-bottom: -1.5em;");

    let a = document.getElementById("eacattrendsbtn");
    a.addEventListener("click", n);
  }
}

function r(e, t) {
  eabar_competition = document.getElementById("eabar_competition");
  let n = !!e;
  e = n ? e : eabar_competition.getAttribute("points");
  let a = t ? parseFloat(t.toFixed(2)) : 1,
    i = e;

  eabar_competition.setAttribute("points", n ? i.reduce((e, t) => e + t, 0) : i);

  let s = n ? media_ponderada(i).toFixed(0) : e * a,
    o = "Calculando...";

  s < 40
    ? (o = "Baixa")
    : s >= 40 && s < 80
    ? ((o = "Média"),
      (eabar_competition.style.background = "#fff159"),
      (eabar_competition.style.color = "#1e3d6e"))
    : s >= 80 && ((o = "Alta"), (eabar_competition.style.background = "red"));

  eabar_competition.innerHTML = o;
}

async function l(n, a) {
  var i = n,
    s =
      i?.querySelector(".poly-component__title-wrapper")?.innerText ??
      i?.querySelector(".poly-poly-component__title")?.innerText,
    o = e[a];

  (
    i.getElementsByClassName("ui-search-result__content-wrapper")[0] ??
    i.getElementsByClassName("poly-card__content")[0]
  )?.insertAdjacentHTML("afterbegin", mfyloader),
    (async function (e) {
      !(function (n) {
        function a(e) {
          let t = ("true" == i.getAttribute("catalog") || n.catalogListed),
            a = e.match(
              /window\.__PRELOADED_STATE__\s*=\s*(\{.*\});\n/
            );
          !a && e.startsWith('{"pageState":') && ((a = []), (a[1] = e));

          let r,
            l = null,
            d = e.match(/w\[l\]\.push\((.*)\)/);
          d && d.length > 1
            ? (r = d[0])
            : (t || (d && d.length > 1)) && (r = `(${e})`);

          try {
            if (r) {
              try {
                l = JSON.parse(r.split("w[l].push(")[1].split(")")[0]);
              } catch (e) {
                l = null;
              }
              null == l?.startTime &&
                e.startsWith('{"pageState":{') &&
                ((r = e),
                (l = JSON.parse(r)),
                l.initialState || (l = l.pageState));
            }
            (null != l && null != l) ||
              (e.startsWith('{"pageState":{') &&
                ((l = JSON.parse(e)), l.initialState || (l = l.pageState)));
          } catch (e) {
            l = null;
          }

          if (a && a.length >= 1) {
            let r = a[1];
            try {
              let a = JSON.parse(r);
              a.initialState || (a = a.pageState);
              let d = !1,
                c = 0,
                p =
                  l?.startTime ??
                  l?.initialState?.components?.track?.gtm_event?.startTime,
                g =
                  a.initialState.components.header.subtitle
                    ?.split(" | ")[1]
                    ?.split(" "),
                f = "";
              if (g) {
                for (let e = 0; e < g?.length; e++)
                  if (g[e].trim().length > 0) {
                    f = g[e];
                    break;
                  }
              } else f = 0;
              f = f ?? "0";
              var m = 0;

              let u = i
                .getElementsByClassName("poly-component__title-wrapper")
                ?.[0]
                ?.getElementsByTagName("a")
                ?.[0]
                ?.getAttribute("href");
              u?.split("wid=MLB")[1]?.split("&")[0], u?.split("#")[0];

              if (t && n.itemID) {
                if (itemsLocalData[n.itemID])
                  (p = itemsLocalData[n.itemID]?.startTime ?? 0),
                    (m = itemsLocalData[n.itemID]?.itemSales ?? 0) &&
                      null == i.getAttribute("sales") &&
                      i.setAttribute("sales", m),
                    (c = dayjs().diff(p, "day")
                      ? dayjs().diff(p, "day")
                      : 0),
                    c++;
                else if (e) {
                  let t = e,
                    a = null;
                  try {
                    a = JSON.parse(t);
                  } catch (e) {
                    try {
                      const e = t.match(/(\{(?:[^{}]|{[^{}]*})*\})/);
                      if (!e || !e[1]) throw new Error("No JSON object found");
                      a = JSON.parse(e[1]);
                    } catch (e) {
                      try {
                        const e = t.split("w[l].push(")[1].split(")")[0];
                        a = JSON.parse(e);
                      } catch (e) {
                        try {
                          const e = t.match(
                            /window\.\w+\s*=\s*({.*?});\n?/
                          );
                          if (!e) return;
                          a = JSON.parse(e[1]);
                        } catch (e) {
                          return;
                        }
                      }
                    }
                  }
                }

                if (a) {
                  const e = a.pageState.initialState || a;
                  let t = e?.components?.header?.subtitle;
                  if (((f = t?.split("|  ")?.[1]?.split(" ")?.[0]), t && f)) {
                    const t = f.match(/^[+]?(\d+)(mil)?/i);
                    (m = t ? parseInt(t[1], 10) * (t[2] ? 1e3 : 1) : 0),
                      (a = e?.components?.track?.gtm_event?.startTime),
                      globalLogs.push(n.itemID, a),
                      a &&
                        ((c = dayjs().diff(a, "day")
                          ? dayjs().diff(a, "day")
                          : 0),
                        c++,
                        c > 180 && c < 365
                          ? (s = "#f7b500")
                          : c > 365 && (s = "#ff0000"),
                        (null != i.getAttribute("product-days") &&
                          0 != i.getAttribute("product-days")) ||
                          i.setAttribute("product-days", c),
                        (m >= 100 && c > 30) ||
                          (m < 100 && c >= 90) ||
                          (m < 5 && c > 45)) &&
                        document.dispatchEvent(
                          new CustomEvent("StoreProductData", {
                            detail: {
                              itemId: n.itemID,
                              startTime: a,
                              itemSales: m,
                            },
                          })
                        );
                  }
                  i.querySelector(`#${n.itemID}`) &&
                    m &&
                    i.setAttribute("sales", m);
                }
              } else {
                if (null != f && null != f && !m) {
                  let e = f.toString().match(/^[+]?(\d+)(mil)?/i);
                  m = e ? parseInt(e[1], 10) * (e[2] ? 1e3 : 1) : 0;
                }
                i.setAttribute("sales", m);
              }

              p &&
                ((c = dayjs().diff(p, "day") ? dayjs().diff(p, "day") : 0),
                c++,
                c > 180 && c < 365 ? (s = "#f7b500") : c > 365 && (s = "#ff0000"),
                (null != i.getAttribute("product-days") &&
                  0 != i.getAttribute("product-days")) ||
                  (i.setAttribute("product-days", c),
                  ((m >= 100 && c > 30) ||
                    (m < 100 && c >= 90) ||
                    (m < 5 && c > 45)) &&
                    document.dispatchEvent(
                      new CustomEvent("StoreProductData", {
                        detail: {
                          itemId: n.itemID,
                          startTime: p,
                          itemSales: m,
                        },
                      })
                    )));
              let y =
                a.initialState.track?.melidata_event?.event_data?.price ??
                n.price;
              i.setAttribute("product-price", y),
                m && null == i.getAttribute("sales") && i.setAttribute("sales", m),
                i.setAttribute("product-id", n.itemID),
                i.setAttribute("product-price", y),
                i.setAttribute("shipping", l?.shipping ?? ""),
                o(c, m, d);
            } catch (e) {}
          } else if (e?.startsWith('{"pageState":{')) {
            let a = JSON.parse(e).pageState.initialState.components.header
              .subtitle;
            if (((salesText = a?.split("|  ")[1]?.split(" ")[0]), salesText)) {
              const e = salesText.match(/^[+]?(\d+)(mil)?/i);
              m = e ? parseInt(e[1], 10) * (e[2] ? 1e3 : 1) : 0;
            } else m = 0;

            i.setAttribute("sales", m);

            const r = i.querySelector(`#${n.itemID}`);
            r && (r.innerHTML = `${m < 5 ? m : "+" + m}`);

            let d =
                l?.startTime ??
                l.initialState.components.track?.gtm_event?.startTime,
              c = 0;

            d &&
              ((c = dayjs().diff(d, "day") ? dayjs().diff(d, "day") : 0),
              c++,
              c > 180 && c < 365 ? (s = "#f7b500") : c > 365 && (s = "#ff0000"),
              null == i.getAttribute("product-days") &&
                (i.setAttribute("product-days", c),
                ((m >= 100 && c > 30) ||
                  (m < 100 && c >= 90) ||
                  (m < 5 && c > 45)) &&
                  document.dispatchEvent(
                    new CustomEvent("StoreProductData", {
                      detail: { itemId: n.itemID, startTime: d, itemSales: m },
                    })
                  )));

            let p =
              state.initialState.track?.melidata_event?.event_data?.price ??
              n.price;

            i.setAttribute("product-price", p),
              m && null == i.getAttribute("sales") && i.setAttribute("sales", m),
              i.setAttribute("product-id", n.itemID),
              i.setAttribute("product-price", p),
              i.setAttribute("shipping", l?.shipping ?? "");

            let g = !1;
            (state.initialState?.metadata?.url_canonical?.startsWith(
              "https://www.mercadolivre"
            ) ||
              t) && (g = !0),
              o(c, m, !0);
          }
        }

        var s = "#7CFC00";

        function o(a, o, r) {
          let l = null != itemsLocalData[n.itemID];
          a > 180 && a < 365 ? (s = "#f7b500") : a > 365 && (s = "#ff0000");

          const d = (e) => dayjs(e).format("YYYY-MM-DD"),
            m = dayjs().subtract(6, "month"),
            c = Array.from({ length: 6 }, ((_, t) => m.add(t, "month"))),
            g = c.map((e) => d(e.startOf("month"))),
            f = c.map((e) => d(e.endOf("month"))),
            u = f.map(
              ( (e, t) =>
                `${mfyProxyLessRestricted}https://api.mercadolibre.com/items/visits?ids=${n.itemID}&date_from=${g[t]}&date_to=${e}`
              )
            );

          let y = `position: absolute;
 bottom: -21px;
 z-index: 99;
`;
          "gallery" == listView &&
            (y = `position: relative;
 z-index: 99;
`);

          let h = `<div class="${n.itemID}" style="${y}font-family: 'Montserrat', sans-serif;
margin: -2.5em 0em 1em 0em;
display: flex;
padding: 0em 0.5em;
background: white;
align-items: center;
justify-content: center;
width: 19rem;
height: 3.5rem;
border-radius: 0.7em;
border-left: 8px solid ${s};
box-shadow: rgba(0, 0, 0, 0.21) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
">\n          
          <div style="font-size: 0.61em;
font-weight: 400;
color: black;
line-height: 1.31em;
flex: 1.35;
">Criado há: <br><span style="font-size: 0.86rem;
font-weight: 700;
"><div class="created-at" style="font-size: 1.1rem;
font-weight: 700;
">${r && !l ? SpinLoader : a}</d> ${r ? "" : "dia(s)"}</div> </div>\n          
          <div style="font-size: 0.61em;
font-weight: 400;
color: black;
line-height: 1.31em;
flex: 1;
padding-left: 1em;
border-left: 1px solid #e3e2e2;
">Vendas: <br>
<span id="${n.itemID}" style="font-size: 1.21rem;
font-weight: 700;
">${SpinLoader}</span> </div>\n          
          
<div style="font-size: 0.61em;
font-weight: 400;
color: black;
line-height: 1.31em;
flex:2;
padding-left: 1em;
border-left: 1px solid #e3e2e2;
display:flex"><div>Visitas: <br><span style="font-size: 0.8rem">(6m)</span></div> \n          
<div id="loader-${n.itemID}" class="itemloader" style="cursor: pointer;
margin: auto;
display: flex;
align-items: end;
justify-content: center;
">\n 
<img style="cursor: pointer;
width:1.21rem;
margin-right: 0.31rem;
"src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/777777/external-qr-code-scan-coding-tanah-basah-basic-outline-tanah-basah.png"/> Ver\n</div> 
</div> </div>`,
            b = i.getElementsByTagName("mfyloader")[0];

          b && (b.outerHTML = h);

          let v = null != o ? `${o < 5 ? o : "+" + o}` : "-";
          r || (i.querySelector(`#${n.itemID}`).innerHTML = v),
            i.setAttribute("product-days", a),
            o && null == i.getAttribute("sales") && i.setAttribute("sales", o),
            document
              .getElementById(`loader-${n.itemID}`)
              .addEventListener("mouseover", function () {
                spinLoaderManager.hasSpinner(this) ||
                  "true" == this.getAttribute("visit-data") ||
                  (spinLoaderManager.replaceContent(this),
                  (async function (t) {
                    var n = [],
                      a = t;
                    for (let e = 0; e < u.length; e++)
                      await fetch(u[e], eaInit)
                        .then((e) => e.json())
                        .then((t) =>
                          n.push({
                            date: new Date().getTime() * (e + 1),
                            value: parseFloat(t[0].total_visits),
                          })
                        )
                        .catch(function (t) {
                          n.push({
                            date: new Date().getTime() * (e + 1),
                            value: 0,
                          });
                        });

                    am5.ready(function () {
                      var t = am5.color(3441658),
                        i = am5.color(11730944),
                        s =
                          Math.round(
                            (1e3 *
                              (((e[e.length - 1]?.value ?? 0) / e[0]?.value) -
                                1)) /
                              10
                          ) < 0
                            ? i
                            : t,
                        o = a;

                      o.style.overflow = "auto";
                      var r = document.createElement("div");
                      (r.style.fontSize = "0em"),
                        (r.style.width = "57px"),
                        (r.style.height = "25px"),
                        (r.style.padding = "0.2em 0.4em"),
                        (r.style.float = "left"),
                        (o.innerHTML = ""),
                        o.setAttribute("visit-data", "true"),
                        o.appendChild(r),
                        (function (e, t, n) {
                          var a = am5.Root.new(e);
                          a.setThemes([am5themes_Micro.new(a)]);

                          var i = a.container.children.push(
                            am5xy.XYChart.new(a, {
                              panX: !1,
                              panY: !1,
                              wheelX: "none",
                              wheelY: "none",
                            })
                          );
                          i.plotContainer.set("wheelable", !1),
                            i.zoomOutButton.set("forceHidden", !0);

                          var s = i.xAxes.push(
                              am5xy.DateAxis.new(a, {
                                maxDeviation: 0,
                                baseInterval: { timeUnit: "day", count: 1 },
                                renderer: am5xy.AxisRendererX.new(a, {}),
                              })
                            ),
                            o = i.yAxes.push(
                              am5xy.ValueAxis.new(a, {
                                strictMinMax: !0,
                                renderer: am5xy.AxisRendererY.new(a, {}),
                              })
                            ),
                            r = i.series.push(
                              am5xy.LineSeries.new(a, {
                                xAxis: s,
                                yAxis: o,
                                valueYField: "value",
                                valueXField: "date",
                                stroke: n,
                              })
                            );
                          r.strokes.template.setAll({ strokeWidth: 2 }),
                            r.data.setAll(t);
                        })(r, n, s);
                    });
                  })(this));
              }),
            (function () {
              t--,
                (function () {
                  function e() {
                    let e = document.getElementById("easortselect");
                    e && (e.disabled = !1);

                    let t = document.getElementById("mfy-catalog-filter-container");
                    t && (t.style.display = "block");

                    let n = document.getElementById("mfy-smetrics-status");
                    n &&
                      setTimeout(function () {
                        n.style.display = "none";
                      }, 700);
                  }

                  t <= 2 && e();
                  t / p >= 0.7 &&
                    setTimeout(function () {
                      e();
                    }, 14e3);
                })();

              let e = document.getElementById("mfy-smetrics-progress"),
                n = setInterval(function () {
                  e = document.getElementById("mfy-smetrics-progress"),
                    e && ((e.value = e.value + 1), clearInterval(n));
                }, 500);
            })();
        }

        let r = n.title
            .toLowerCase()
            .replace(/[ãâàáäåāăąạảấầẩẫậắằẳẵặ]/g, "")
            .replace(/[õôòóöøōŏőơọỏốồổỗộớờởỡợ]/g, "")
            .replace(/[ñńņňṅṇṉṋṅ]/g, "")
            .replace(/[ēĕėęěẹẻẽếềểễệ]/g, "")
            .replace(/[īĭįỉịớờởỡợ]/g, "")
            .replace(/[ūŭůűųụủứừửữự]/g, "")
            .replace(/[ýỳỵỷỹ]/g, "")
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .split(" ")
            .join("-")
            .replace(/[^a-zA-Z0-9-]/g, "")
            .replace(/^-/, ""),
          l = "https://produto.mercadolivre.com.br/MLB-" + n.itemID.split("MLB")[1],
          d = (n.catalogID.split("MLB")[1], n.itemID, i.getElementsByClassName("mfy-ad-listinfo_widget")[0]?.getAttribute("catalog"), l);

        if (
          (i.setAttribute("product-id", n.itemID),
          i.setAttribute("product-price", n.price),
          i.setAttribute("shipping", n.shipping),
          "true" ==
            i
              .getElementsByClassName("mfy-ad-listinfo_widget")[0]
              ?.getAttribute("catalog") || n.catalogListed)
        ) {
          i.setAttribute("catalog", !0);
          let e = `<div style="background-color: #fff159;
display: flex;
align-items: center;
justify-content: center;
border-radius: 1rem 0 1rem 1rem;
margin-right: 2rem;
font-size: 1.1rem;
font-weight: 900;
letter-spacing: 0.02rem;
gap: 1rem;
padding: 0.75rem 1rem 0.5rem 1rem;
box-shadow: rgba(0, 0, 0, 0.21) 0px 6px 11px -3px, rgba(0, 0, 0, 0.05) 0px 2px 5px -2px;
position: absolute;
right: 0;
" class="iscatalog">Catálogo</div>`;
          i
            .getElementsByClassName("poly-card__content")[0]
            .insertAdjacentHTML("afterbegin", e);
        } else i.setAttribute("catalog", !1);

        null == itemsLocalData[n.itemID] &&
          "true" !== i.getAttribute("cache-req-started") &&
          (i.setAttribute("cache-req-started", "true"),
          document.dispatchEvent(
            new CustomEvent("GetProductData", {
              detail: { itemIds: [n.itemID] },
            })
          ));

        if (null == itemsLocalData[n.itemID])
          scrapeForScripts(
            n.itemID,
            d,
            !1,
            function (e, t) {
              if (t) itemSales = 0;
              else
                try {
                  const t = e || [];
                  if (t.length > 0)
                    for (let e of t) {
                      const t = /<script\b[^>]*>([\s\S]*?)<\/script>/i.exec(e);
                      let n = t ? t[1] : e;
                      (n && n.indexOf("initialState") > -1) ||
                      n.indexOf('"pageState":{') > -1
                        ? a(n)
                        : null;
                    }
                  else itemSales = 0;
                } catch (e) {
                  itemSales = 0;
                }
            },
            !1,
            n.catalogListed ? mfyProxy : null
          );
        else {
          let e = itemsLocalData[n.itemID]?.startTime ?? 0,
            t = itemsLocalData[n.itemID]?.itemSales ?? 0,
            a = dayjs().diff(e, "day") ? dayjs().diff(e, "day") : 0;
          a++, o(a, t, !1);
        }

        if ("gallery" != listView) {
          let e = document.getElementById(n.itemID)?.parentElement?.parentElement;
          e && (e.style.bottom = "-7px");
        }
      })({ itemID: e.metadata.id ?? "", title: s ?? "", catalogID: "", permalink: "", category: "", shipping: "", startTime: "", initialQuantity: "", availableQuantity: "", listingType: "", price: "", categoryId: e?.metadata.category_id ?? "", soldQuantity: "", catalogListed: !e?.metadata?.url?.startsWith("produto") });
    })(o);

  "lite" != verif &&
    document.addEventListener("load", function () {
      let e = `<div id="eanotify"
      // style="background: var(--mfy-main);
 margin-top: 0em;
 transition: all 0.35s ease 0s;
 display: flex;
 align-items: center;
 justify-content: center;
 height: 3.5em;
">
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
          <div style="display: flex;
align-items: center;
margin-right: 1em;
"><img
                  src="https://img.icons8.com/metro/26/ffffff/opened-folder.png"
                  style="width: 21px;
margin-right: 0.35em;
"><span id="eabar_category"
                  style="font-weight: 900;
font-size: 1.1em;
color: #dceaff;
margin-left: 0.21em;
margin-bottom: 0.1em;
">-</span>
          </div>
          
          <div style="display: flex;
align-items: center;
margin-right: 1em;
 min-width: 4em;
"></div>

          <div style="display: flex;
align-items: center;
margin-right: 1em;
"><img
                  src="https://img.icons8.com/fluent-systems-filled/48/ffffff/lightning-bolt.png"
                  style="width: 21px;
margin-right: 0.35em;
"><span id="eabar_fullrate" class="eafont2">-<span
                      style="font-size: 0.77em;
"><span
                          style="letter-spacing: 1px;
margin-left: -0.31em;
color: #ffffff70;
">/${p}</span><span
                          style="color: #14305c;
letter-spacing: 0.05em;
">(0%)</span></span></span></div>
          <div style="display: flex;
align-items: center;
margin-right: 1em;
"><img
                  src="https://img.icons8.com/fluent-systems-filled/48/ffffff/post-ads.png"
                  style="width: 21px;
margin-right: 0.35em;
"><span id="eabar_adsrate" class="eafont2">-<span
                      style="font-size: 0.77em;
"><span
                          style="letter-spacing: 1px;
margin-left: -0.31em;
color:#ffffff70;
">/${p}</span><span
                          style="color: #14305c;
letter-spacing: 0.05em;
">(0%)</span></span></span></div>
          <div style="display: flex;
align-items: center;
margin-right: 1em;
"><img
          src="https://img.icons8.com/ios-glyphs/ffffff/30/pricing-structure.png"
          style="width: 21px;
margin-right: 0.35em;
"><span id="eabar_catalograte" class="eafont2">-<span
              style="font-size: 0.77em;
"><span
                  style="letter-spacing: 1px;
color:#ffffff70;
">/${p}</span><span
                  style="color: #14305c;
margin-left: 0.2rem;
">(0%)</span></span></span></div>

          <div style="margin-right: 1em;
display: flex;
align-items: center;
"><img
                  src="https://img.icons8.com/ios-glyphs/30/ffffff/fire-element--v1.png"
                  style="width: 21px;
margin-right: 0.35em;
"><span
                  class="eafont1">Concorrência: </span><span id="eabar_competition"
                  style="font-weight: 900;
font-size: 1.14em;
color: #ffffff;
margin-left: 0.21em;
background-color: #3456e270;
border-radius: 4px;
padding: 0.21em 1em;
">-
              </span><img id="notyhide" src="https://img.icons8.com/fluent/48/000000/collapse-arrow.png"
                  style="transition:all 0.35s;
width: 3em;
margin-top: 3.1em;
margin-left: 1em;
z-index: 14;
padding: 0.5em;
cursor: pointer;
background-color: #1f2734;
border-radius: 2em;
filter: hue-rotate(40deg);
">
          </div>
          

      </div>
</div>`,
        t = `<div id="eacatextrainfo"><span style="padding: 4px;
"><img style="width: 1.5em;
margin-bottom: -4px;
" src="https://img.icons8.com/cotton/64/000000/info--v2.png"/></span><span id="eaadsoncategory" style="font-size: 14px;
">Carregando...</span></div>`,
        n = document.getElementById("root-app"),
        l = n.firstChild.getElementsByTagName("section")[0],
        d = t,
        m = l,
        c = "beforeend";

      l?.children.length > 0
        ? ("ul" === l.firstChild.tagName.toLowerCase()
            ? (l?.setAttribute(
                "style",
                "padding: 1em; margin: 0 0 7px; border-radius: 5px; display: flex; align-items: flex-start; flex-direction: column;"
              ),
              (l.firstChild.style.marginBottom = "1.2em"))
            : ((d = `<section id='ealistsection' class="ui-search-top-keywords" style=" padding: 1em;
 margin: 0 0 7px;
 border-radius: 5px;
 display: flex;
 align-items: flex-start;
 flex-direction: column;
">${t}</section>`),
              (m = document.getElementById("root-app").firstChild),
              (c = "afterbegin")),
          m?.insertAdjacentHTML(c, d))
        : ((d = `<section id='ealistsection' class="ui-search-top-keywords" style="z-index:999;
 padding: 1em;
 margin: 0 0 7px;
 border-radius: 5px;
 display: flex;
 align-items: flex-start;
 flex-direction: column;
">${t}</section>`),
          (m = document.getElementById("root-app").firstChild),
          (c = "afterbegin"),
          m?.insertAdjacentHTML(c, d));

      n.insertAdjacentHTML("afterbegin", e),
        (eabar_category = document.getElementById("eabar_category")).innerHTML =
          "carregando...",
        (eabar_fullrate = document.getElementById("eabar_fullrate")),
        (eabar_fullrate.innerHTML = `${
          a.length > 50 ? 50 : a.length.toString().padStart(2, "0")
        } <span style="font-size: 0.77em;
"> <span style="letter-spacing: 1px;
margin-left: -0.31em;
color: #ffffff70;
"> /${p}</span> <span style="color: #14305c;
letter-spacing: 0.05em;
">(${
          (a.length / 50 * 100).toFixed(0) > 100
            ? 100
            : (a.length / 50 * 100).toFixed(0).padStart(2, "0")
        }%)</span></span>`),
        (eabar_adsrate = document.getElementById("eabar_adsrate")),
        (eabar_adsrate.innerHTML =
          i.length.toString().padStart(2, "0") +
          ` <span style="font-size: 0.77em;
"> <span style="letter-spacing: 1px;
margin-left: -0.31em;
color: #ffffff70;
"> /${p}</span> <span style="color: #14305c;
letter-spacing: 0.05em;
">(` +
          (i.length / 50 * 100).toFixed(0).padStart(2, "0") +
          "%)</span></span>");

      let g = parseFloat((i.length / 50 * 100).toFixed(0));
      g <= 0 && (g = 1),
        r([
          g,
          parseFloat((0).toFixed(0)),
          parseFloat((a.length / 50 * 100).toFixed(0)),
        ]),
        (eanotify = document.getElementById("eanotify"));

      var f = document.getElementById("notyhide");
      eanotify.addEventListener("mouseover", function () {
        (this.style.marginTop = "0em"),
          f.setAttribute(
            "style",
            `transition:all 0.35s;
width: 3em;
margin-top: 3.1em;
margin-left: 1em;
z-index: 1;
padding: 0.5em;
cursor: pointer;
 border-radius: 2em;
background-color: #1f2734;
border-radius: 2em;
filter: hue-rotate(40deg);
z-index: 14;`
          );
      }),
        f.addEventListener("click", function () {
          (eanotify.style.marginTop = "-2.77em"),
            f.setAttribute(
              "style",
              `transform: rotate(180deg);
margin-top: 3.1em;
z-index:1;
transition:all 0.35s;
 width: 2em;
margin-left: 1em;
padding: 0.5em;
cursor: pointer;
border-radius: 2em;
background-color: #1f2734;
border-radius: 2em;
filter: hue-rotate(40deg);
z-index: 14;`
            );
        }),
        (function () {
          let e = preLoadedState.initialState.melidata_track.event_data
            .category_id;
          e?.length > 0 && o(e),
            (async function (e) {
              "" != e &&
                null != e &&
                (await new Promise((t) => {
                  fetchCategoryWithCache(e, (e) => {
                    e && (s = e), t();
                  });
                })),
                (eabar_category.innerHTML = s.name ? s.name : "Categoria");

              let t = document.getElementById("eaadsoncategory");
              s.total_items_in_this_category && t
                ? (t.innerHTML = `<b style="color: var(--mfy-main);
font-size:18px;
">${s.total_items_in_this_category}</b> anúncios na categoria.`)
                : t.parentElement.parentElement.remove();
            })(e);
        })();
    })();
}

function pageType(){
null==preLoadedState?.userId?null!=document.getElementsByClassName("ui-search-breadcrumb__title")[0]&&(paginaAtual="lista"):paginaAtual="painel",verifyData("pageType")}if(null!=sessionStorage.getItem("eauser"))usuario_logado=sessionStorage.getItem("eauser");
else var usuario_logado=null;

function runLogged(){
eaOnAdminPanel||"https://www.mercadolivre.com.br/"!=window.location.href&&function(e){let t=document.getElementsByClassName("nav-header-plus-menu-wrapper")[0],n=`<div class="eadropdown" style="pointer-events: all;
min-width: 27px;
height: 27px;
transition: all 0.35s ease 0s;
background-color: ${"lite"==verif?"var(--mfy-main)":"rgb(255, 214, 43)"};
position: relative;
top: 4px;
left: -1em;
display: flex;
border-radius: 10em;
align-items: center;
cursor: pointer;
z-index: 31;
"> <img src="https://i.ibb.co/K7Lc6cr/metrify.png" style="pointer-events:none;
width:15px;
margin: auto;
${"lite"==verif?"filter: brightness(10.5);":""}"></div>`;
if(void 0!==t&&t.insertAdjacentHTML("afterbegin",n),e);
else var a=document.getElementsByClassName("eadropdown")[0];
a&&(a.addEventListener("mouseover",(function(){
let e=document.getElementsByClassName("eamaindropdownmenu")[0];
if(e)e.style.opacity="100%",e.style.display="block",e.style.transform="scale(1)",a.style.backgroundColor="var(--mfy-main)";
else{let e="";
"pro"==verif&&(e='<li class="eadropmenu-tools"> Ferramentas <img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/000000/external-single-chevron-arrow-as-a-notch-badge-basic-shadow-tal-revivo.png" style=" height: 1em; margin-right: -1.1em; position: relative; top: 0.21em;"></li>');
let t=`<div class="modeless-box eamaindropdownmenu" style="width: 175px; z-index:999; top: 8em; margin-right: 2.7em; right: 12em; transition: all 0.1s ease 0.21s; text-align: right; display: block;"><div class="modeless-box-header"><span style="font-size: 0.86em; letter-spacing: -0.1px; font-weight: bolder;">${usuario_logado}</span></div><div class="eadrop01" style="opacity: 100%; transition: 0.7s all;"><ul style="list-style-type: none; margin: 0; padding: 0; font-size: 14px; display: block; cursor: pointer;"><li><a target="_blank"  href="https://bit.ly/metrify-ext-conectar">Reconectar</a></li>`+e+("lite"!=verif?"":"<li>Fazer Upgrade</li>")+`</ul></div><div style="font-size: 0.86em; font-weight: 400; color: lightgray; text-align: center;" class="modeless-box-header">Versão `+mfy_version+`</div></div>`;
this.insertAdjacentHTML("afterend",t);
let n=document.getElementsByClassName("eamaindropdownmenu")[0],i='<div class="eaxtradropdown" style="box-sizing: border-box; width: 171px; right: -13.16em; top: 3.1em; transition: all 0.1s ease 0.21s; text-align: left; display: block; max-height: 440px; position: absolute; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased; font-size: 13px; z-index: 77; opacity: 0; pointer-events: none;" ><div class="eadropxtra" style="background-color: #ededed; opacity: 100%; transition: 0.7s all; border-radius: 0em 3px 3px 3px; box-shadow: 0px 11px 4px -10px rgb(0 0 0 / 51%);"><ul style="list-style-type: none; margin: 0; padding: 0; font-size: 14px; display: block; cursor: pointer;"><li>Gerador de EAN13</li></ul></div></div>',s=document.getElementsByClassName("eadropmenu-tools")[0];
if(s){s.innerHTML=s.innerHTML+i;
let e=document.getElementsByClassName("eadropmenu-tools")[0],t=document.getElementsByClassName("eaxtradropdown")[0];
e.onclick=function(){
t.style.opacity="1",t.style.pointerEvents="auto"},t.addEventListener("mouseout",(function(){
setTimeout((function(){
t.style.opacity="0",t.style.pointerEvents="none"}),1e3)})),t.addEventListener("mouseover",(function(){
this.style.opacity="1",this.style.pointerEvents="auto"})),t.getElementsByTagName("li")[0].onclick=function(){
let e=document.getElementById("mfy-tool-modal");
if(e)e.style.display="block";
else{document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin",toolModal),document.getElementById("close-track").addEventListener("click",(function(){
document.getElementById("mfy-tool-modal").style.display="none"}));
let e=document.getElementsByClassName("eangen")[0];
e.addEventListener("mouseover",(function(){
this.style.transform="scale(1.1)"})),e.addEventListener("mouseout",(function(){
this.style.transform="scale(1)"})),e.addEventListener("click",(function(){
rawID?generateEAN13(e,!1):findDocID(e,!1)}))}}}
let o=document.getElementsByClassName("eadrop01")[0].firstChild.firstChild;
if(0==userdataOk){if(o){o.style.fontWeight="bold",o.style.color="red";
let e='<div style="background: red; width: 1em; text-align: center; border-radius: 5em; color: #fff; display: inline; font-size: 0.7em; font-weight: bolder; padding: 0em 0.7em; margin-left: 0.35em;" class="eadropalert">!</div>';
o.firstChild.insertAdjacentHTML("beforeend",e)}}else o.remove();
let r='<div class="eatiertag" style="position: relative; display: block; text-align: center; background-color: #ebebeb; margin: 0.7em 1.6em -0.8em 1.6em; padding: 0.2em 1em; border-radius: 3.5em; cursor: pointer; z-index: 11;">...</div>';
n.lastChild.insertAdjacentHTML("beforebegin",r);
let l=document.getElementsByClassName("eatiertag")[0];
l.innerHTML="lite"==verif?"Ativar Licença":`Conta ${verif.charAt(0).toUpperCase()}${verif.slice(1)}<img style="width:1rem" src="https://img.icons8.com/${mfyMainColorNumbers}/ios-glyphs/30/guarantee--v1.png">`,l.addEventListener("mouseover",(function(){
this.style.backgroundColor="var(--mfy-main)",this.style.color="#fff",this.style.fontWeight="bold",this.innerHTML="pro"==verif?"Verificar":"Ativar"})),l.addEventListener("mouseout",(function(){
this.style.backgroundColor="#ebebeb",this.style.color="inherit",this.style.fontWeight="inherit",this.innerHTML="lite"==verif?"Ativar Licença":`Conta ${verif.charAt(0).toUpperCase()}${verif.slice(1)}`})),l.addEventListener("click",(function(){
if(this.style.backgroundColor="var(--mfy-main)",this.style.color="#fff",this.style.fontWeight="bold",this.innerHTML="Verificando conta...","pro"!=verif){window.localStorage.clear();

const e='<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;" id="paycheck"> <span style="font-weight: bolder; margin: 0.2rem; font-size: 1.35rem; font-variant: small-caps;">e-mail de compra</span> <input type="text" value="" style="border: 1px solid rgba(0,0,0,.1); border-radius: 1rem;"><button style="position: relative; display: block; border: 0; text-align: center; background-color: rgb(235, 235, 235); margin: 0.7em 1.6em -0.8em; padding: 0.2em 1em; border-radius: 0.35rem; cursor: pointer; z-index: 11; color: inherit; font-weight: inherit;" id="validatebuy">Validar</button></div>';
l.style.display="none",this.insertAdjacentHTML("beforebegin",e),document.getElementById("validatebuy").addEventListener("click",(
async function(){
const e=document.getElementById("paycheck"),t=e.firstChild.nextSibling.nextElementSibling,n=t?.value;
if(null==n||null==n||""==n)t.style.border="1px solid var(--mfy-main)";
else{e.lastChild.innerHTML="Verificando...";
try{await fetch(mfyEndpoints.validate,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:freya.messages.user.email,buyEmail:n})}).then((e=>e.json())).then((t=>{"Plano atualizado!"==t||"Plano atualizado!"==t.msg?(e.lastChild.innerHTML="Conta verificada!",e.lastChild.style.backgroundColor="var(--mfy-main)",e.lastChild.style.color="#fff",e.lastChild.style.fontWeight="bold",localStorage.setItem("userverif","pro"),getnstoreData("userverif")):(e.lastChild.innerHTML=t.msg,e.lastChild.style.backgroundColor="red",e.lastChild.style.color="#fff",e.lastChild.style.fontWeight="bold",e.lastChild.style.padding="0.5rem 0rem")}))}catch(e){}}}
))}else getnstoreData("userverif")})),n.addEventListener("mouseover",(function(){
let e=document.getElementsByClassName("eamaindropdownmenu")[0];
e.style.opacity="100%",e.style.display="block",e.style.transform="scale(1)",a.style.backgroundColor="var(--mfy-main)"}))}e=document.getElementsByClassName("eamaindropdownmenu")[0],e.addEventListener("mouseout",(function(){
let e=document.getElementsByClassName("eamaindropdownmenu")[0];
e.style.opacity=0,e.style.transform="scale(0)",a.style.filter=""}))})),a.addEventListener("mouseout",(function(){
let e=document.getElementsByClassName("eamaindropdownmenu")[0];
e.style.opacity=0,e.style.transform="scale(0)",a.style.backgroundColor="#ffd62b",a.style.filter=""})))}(),pageType()}async function findUser(){
if("undefined"!=sessionStorage.getItem("eauser")&&null!=sessionStorage.getItem("eauser")){let e=sessionStorage.getItem("eauser"),t=null;
if("loading"!==document.readyState){const n=()=>new Promise((e=>{if(window.freya&&window.freya.messages&&window.freya.messages.user)return void e(window.freya.messages.user);

const t=setInterval((()=>{window.freya&&window.freya.messages&&window.freya.messages.user&&(clearInterval(t),clearTimeout(n),e(window.freya.messages.user))}),100),n=setTimeout((()=>{clearInterval(t),e(void 0)}),5e3)}));
try{mfyuser=await n()}catch(e){mfyuser=void 0}let a=window.melidata_namespace?window.melidata_namespace:null;

const i=Date.now(),s=5e3;
for(;
!(a&&a.actual_track&&a.actual_track.user&&a.actual_track.user.user_id||Date.now()-i>s);
)await new Promise((e=>setTimeout(e,500)));
a?.actual_track?.user?.user_id&&(mfyuser.id=a.actual_track.user.user_id),t=mfyuser.email,usuario_logado=t,t!=e&&sessionStorage.setItem("eauser",t)}runLogged()}else if("loading"!==document.readyState){let e=sessionStorage.getItem("eauser"),t=null;
for(;
!window.freya||!window.freya.messages||!window.freya.messages.user;
)await new Promise((e=>setTimeout(e,500)));
mfyuser=freya.messages.user;
let n=window.melidata_namespace?window.melidata_namespace:null;
for(;
!(n&&n.actual_track&&n.actual_track.user&&n.actual_track.user.user_id);
)await new Promise((e=>setTimeout(e,500)));
if(mfyuser.id=n.actual_track.user.user_id,t=mfyuser.email,usuario_logado=t,t&&t!=e&&sessionStorage.setItem("eauser",t),null!=usuario_logado)runLogged();
else{let e='<a href="https://www.mercadolivre.com/jms/mlb/lgz/login"><span style="font-size: 0.92em; font-variant-caps: all-small-caps; padding: 0.21em 0.75em; border: 1px solid gray; border-radius: 2em; position: relative;">Usuário não logado</span></a>';
document.getElementsByClassName("nav-header-menu-wrapper")[0]?.lastChild?.insertAdjacentHTML("afterbegin",e)}}}

function mfyStart(){
if(dayjs=window.dayjs,null==uid&&null==uid){!
async function(){
let e=window.melidata_namespace?window.melidata_namespace:null;
for(;
!(e&&e.actual_track&&e.actual_track.user&&e.actual_track.user.user_id);
)await new Promise((e=>setTimeout(e,500)));
uid=e.actual_track.user.user_id}()}if(null!=mfy_version&&null!=mfy_version&&""!=mfy_version||document.dispatchEvent(new CustomEvent("MetrifyVersion",{detail:""})),window.location.href.startsWith("https://lista")||window.location.href.startsWith("https://produto")|window.location.href.startsWith("https://www.mercadolivre")){let e=`.select {
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
\n      fill: none;
\n      stroke-linecap: round;
\n      stroke-linejoin: round;
\n      pointer-events: none;
\n    }\n    .select select {\n      margin-left: 1rem;
\n      -webkit-appearance: none;
\n      padding: 7px 40px 7px 12px;
\n      width: 100%;
\n      border: 1px solid #e8eaed;
\n      border-radius: 5px;
\n      background: #fff;
\n      box-shadow: 0 1px 3px -2px #9098a9;
\n      cursor: pointer;
\n      font-family: inherit;
\n      font-size: 14px;
\n      transition: all 150ms ease;
\n    }\n    .select select:required:invalid {\n      color: #5a667f;
\n    }\n    .select select option {\n      color: #223254;
\n    }\n    .select select option[value=""][disabled] {\n      display: none;
\n    }\n    .select select:focus {\n      outline: none;
\n      border-color: #07f;
\n      box-shadow: 0 0 0 2px rgba(0,119,255,0.2);
\n    }\n    .select select:hover + svg {\n      stroke: #07f;
\n    }\n    .sprites {\n      position: absolute;
\n      width: 0;
\n      height: 0;
\n      pointer-events: none;
\n      user-select: none;
\n    }\n    '+"*{ scrollbar-width: auto;
 scrollbar-color: #c2c2c2 #ffffff;
} *::-webkit-scrollbar{ width: 11px;
 height:11px} *::-webkit-scrollbar-track{ background: #ffffff11;
} *::-webkit-scrollbar-thumb{ background-color: #c2c2c2;
 border-radius: 10px;
 }"+".eatoolboxbar{opacity: 0;
overflow: hidden;
color: #333333;
height: 3.75em;
border-radius: 2em;
display: block;
font-weight: bold;
position: relative;
background-color: #fff;
z-index: 31;
right: -2em;
border: 1px solid #ebebeb;
margin-bottom: -2em;
box-shadow: rgb(0 0 0 / 7%) 0 3px 6px;
pointer-events: none;
}.eatoolboxicon{z-index: 100;
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
right: 0em;
}.eatoolboxbaropen{pointer-events: auto;
opacity: 1;
color: #333333;
height: 3.75em;
border-radius: 2em;
display: block;
font-weight: bold;
position: relative;
background-color: #fff;
z-index: 31;
top:-.5rem;
transition: all 0.21s;
 right: 0;
width: 102%;
border: 1px solid #ebebeb;
margin-bottom: -1em;
box-shadow: rgb(0 0 0 / 7%) 0px 3px 6px;
}"+"#eagrossrev{transition:all 0.35s;
overflow:hidden;
flex-wrap: wrap;
box-shadow:rgb(0 0 0 / 11%) 0 3px 6px,rgb(0 0 0 / 10%) 0 3px 6px;
color:rgb(90, 90, 90);
font-weight:400;
font-size:.91em;
position:absolute;
z-index:21;
background-color:#ffffff;
padding:.5em .75em .35em .75em;
line-height:2.1em;
cursor:pointer;
border-radius:2em} earevstats{transition: all 0.21s} /* #eagrossrev:hover .eahiddenlabel2{opacity:1;
margin-right:0;
font-weight:900;
transition:all .35s} .eahiddenlabel2{opacity:0;
margin-right:-5em;
font-weight:900;
transition:all .35s}*/ .eahiddenlabel2{opacity:1;
margin-right:0;
font-weight:900;
transition:all .35s}"+"#eaoffSwitch{overflow: hidden;
display: inline-flex;
box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;
color: var(--mfy-main);
font-weight: 400;
font-size: 0.91em;
position: relative;
z-index:30;
background-color: #ffffff;
top:-0.31em;
 left:1em;
 min-width: 3.1em;
 height: 3.1em;
 padding: 0.5em 0.75em 0.35em 0.75em;
line-height: 2.1em;
cursor: pointer;
border-radius: 2em;
} #eaoffSwitch:hover > .eahiddenlabel{opacity: 1;
margin-right: 0em;
font-weight: 900;
transition: all 0.35s;
}"+"#eaadvsearchBtn{overflow: hidden;
display: none /* inline-flex */;
box-shadow: rgb(0 0 0 / 11%) 0px 3px 6px, rgb(0 0 0 / 10%) 0px 3px 6px;
color: var(--mfy-main);
font-weight: 400;
font-size: 0.91em;
position: absolute;
z-index:31;
background-color: #ffffff;
top: 0.35em;
height: 3.1em;
/* font-size: 0.7em;
 */padding: 0.5em 0.75em 0.35em 0.75em;
line-height: 2.1em;
cursor: pointer;
border-radius: 2em;
} #eaadvsearchBtn:hover > .eahiddenlabel{opacity: 1;
margin-right: 0em;
font-weight: 900;
transition: all 0.35s;
} .eahiddenlabel{opacity: 0;
margin-right: -12.2em;
font-weight: 900;
transition: all 0.35s;
}"+".eagetallimgs{display: inline-block;
} .eagetallimgs-inside{transform: scale(1);
transition: all 0.14s;
line-height: 1.3em;
}.eagetallimgs-inside:hover{transform: scale(1.1);
line-height:1em;
}.eadownloadicon{padding: 4px;
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
}.eadownloadicon:hover{opacity: 1;
transform: scale(1);
transition: all 0.35s;
}"+".eadrop01 li{padding: 11px; padding-right: 21px; } .eadrop01 li a{color: #333; text-decoration: none; } .eadrop01 li:hover{background-color: #f5f5f5} .eadropdown:hover{ background-color:var(--mfy-main)!important; transition:all 0.35s; } .eadropdown:hover img{filter: brightness(35); } .eadropxtra li{padding: 11px; padding-left: 21px; border-bottom: 1px solid #7e7e7e1f;
} .eadropxtra li a{color: #333} .eadropxtra li:hover{background-color: #fff} .eameter{opacity: 0;
margin-right: -2.77em;
transition: all 0.35s;
pointer-events: none;
} #eahealthmeter:hover .eameter{pointer-events: none;
opacity:100;
 margin-right: 0;
 transition: all 0.35s;
} .smooth{transition:all 0.35s;
opacity: 100%;
} .new-loader{display: flex;
 height: 21rem;
 align-content: center} .new-hdn{display:none;
} .hdn{transform: rotateX(90deg);
overflow:hidden;
padding: 0px;
height: 0em;
transition:opacity 0.5s;
} .hdn2{transition:all 0.5s ease-in-out;
display:none;
-webkit-box-shadow: 0 0px 0px 0 #fff0!important;
 background-color:#fff0!important;
 border-top: 0px solid #fff0!important;
margin-top: -6.1em!important;
overflow:hidden;
padding: 0px;
height:0em!important;
transition:opacity 0.35s;
} .transp{opacity: 0%;
} .detalhamento{transition:all 0.5s ease-in-out;
opacity:100%;
text-align: -webkit-left;
margin: 2em 1em 0em 2em;
padding: 0.7em 0em 0em 3.5em;
margin-top: 1em;
 border-top: 1px solid #80808075;
} .alinharvertical{padding: 1em 0em;
}.eafollow_ad{border: 1px solid lightgray;
border-radius: 2em;
display: flex;
align-items: center;
position: absolute;
right: 1px;
padding: 0.35em 0.75em;
cursor: pointer;
}.eafollow_img{margin-top: 3px;
width: 1.75em;
filter: grayscale(100%);
opacity: 35%;
 transition: all 0.14s;
}.eafollow_img:hover{width: 2em;
filter: grayscale(0%);
opacity:100%;
transition: all 0.14s;
} \n\n      :root {\n        --mfy-main: ${mfyMainColor};
\n        --mfy-dark: #212936;
\n  --mfy-outline: #eef0f3;
\n  --mfy-success: #57dd98;
\n  --mfy-smoke: #f9fafb;
\n  --mfy-main-font: "Montserrat", sans-serif;
\n  --mfy-outline-10: #eef0f310;
\n  --mfy-dark-50: #21293650;
\n  --mfy-dark-35: #21293635;
\n  --mfy-main-14: #7933ff14;
\n  --mfy-warning: #fbbd23;
\n  --mfy-danger: #ff4545;
\n      }\n\n      .mfy-main-bg{\n        background-color: var(--mfy-main);
\n      }\n\n      .tippy-box[data-theme~="mfy"] {\n        background-color: var(--mfy-main);
\n        color: white;
\n      }\n\n    .tracked-results-maindiv {\t\n      display: flex;
flex-direction: column;
width: 100%;
overflow-y: scroll;
max-height: 40vh;
\n      height: 40vh;
\n    }\n    @media only screen and (min-height: 900px) {\n      .tracked-results-maindiv {\n        max-height: 38rem;
\n        height: 38rem;
\n      }\n    }\n    .track-menu-button {\n      color: rgb(0,0,0,.5);
font-weight: 600;
font-size: 1rem;
border: 1px solid rgb(0,0,0,.1);
padding: 0.5em 1em;
margin: 0em 1em;
cursor: pointer;
box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;
border-radius: 1em;
\n    }\n    .track-menu-button_active {\n      font-weight: 700;
background-color: #fff;
 padding: 0.5em 1em;
 margin: 0em 1em;
 cursor: pointer;
 box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px 0px;
 border-radius: 1em;
 \n    }\n\n    .starttime{\n      font-size: 0.86rem;
\n    }\n    .mfy-result-button{\n      text-align: center;
 border: 1px solid rgb(0 0 0 / 10%);
 display: flex;
 justify-content: center;
 padding: 0.5rem;
 border-radius: 5rem;
 cursor: pointer;
 margin-top: 1em;
    transition: 0.35s all;
\n    }\n    .mfy-result-button:hover{\n      background-color: #F56565;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
transform: translate(0px, 7px);
transition: 0.35s all;
\n    }\n    .mfy-result-button:hover img{\n      filter: invert(1) brightness(100);
\n    }\n\n    .mfy-result-button_options{\n      display: flex;
 flex-direction: row;
 justify-content: center;
\n    }\n\n    .mfy-result-button_style{\n      border: 1px solid rgb(0 0 0 / 10%);
 display: flex;
 justify-content: center;
 padding: 0.5rem;
 border-radius: 5rem;
 cursor: pointer;
 /* margin-top: 1em;
 */    transition: 0.35s all;
\n    }\n    .mfy-result-button_style:hover{\n      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
transform: translate(0px, 7px);
transition: 0.35s all;
 border: 2px solid rgb(0 0 0 / 10%);
\n    }\n    .result-div{\n      margin-bottom: 0.75em;
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
\n    }\n    \n    #pav-slider input:focus-visible {\n      outline: none !important;
\n    }\n    pav-slider :focus-visible {\n      outline: none !important;
\n    }\n    .track-btn{\n      border: 2px solid #ededed;
 border-radius: 2rem;
 margin: 1em;
 padding: 0.5em 1em;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
\n      transition: all 0.35s;
\n    }\n    .track-btn:hover{\n      transform: scale(0.9);
 box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
\n      transition: all 0.35s;
\n    }\n    .eabanner{ \n      margin: auto;
\n      margin-bottom: 1rem;
\n      width: 100%;
\n      height: 200px;
\n      box-shadow: rgb(0 0 0 / 14%) -1px 20px 16px -10px;
\n      border-radius: 0.5rem;
\n      display: flex;
\n      justify-content: center;
\n      align-items: end;
\n      cursor: pointer;
\n    }\n    .notificationtext{\n      border-radius: 0.5rem;
\n      transition: all 0.35s;
\n      opacity: 0;
\n      height: 100%;
\n      width: 100%;
\n      display: flex;
\n      flex-direction: column;
\n      align-items: center;
\n      justify-content: flex-end;
\n      padding: 1rem;
\n    }\n    .eabanner:hover .notificationtext{\n      border-radius: 0.5rem;
\n      transition: all 0.35s;
\n      opacity: 1;
\n      font-size: 1em;
\n      height: 100%;
\n      width: 100%;
\n      display: flex;
\n      flex-direction: column;
\n      align-items: center;
\n      justify-content: flex-end;
\n      padding: 1rem;
\n      color: white;
\n      background: var(--mfy-main);
\n      /* background: linear-gradient(0deg, rgba(0,0,0,1) 11%, rgba(0,0,0,0) 100%);
 */\n    }\n    .myml-nav__section-title{\n      opacity: 1;
\n    }\n    .toolmodal {\n      position: fixed;
top: 0;
background-color: #000000ab;
width:100vw;
height: 100vh;
z-index: 999;
backdrop-filter: blur(11px);
display: flex;
justify-content: center;
align-items: center;
\n    }\n\n    #snackbar {\n      visibility: hidden;
\n      color: #fff;
\n      background-color: #333;
\n      min-width: 250px;
\n      margin-left: -125px;
\n      border-radius: 2px;
\n      padding: 16px;
\n      text-align: center;
\n      left: 50%;
\n      bottom: 30px;
\n      z-index: 1;
\n      position: fixed;
\n    }\n\n    /* This will be activated when the snackbar's class is 'show' which will be added through JS */\n    #snackbar.show {\n      visibility: visible;
\n      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
\n      animation: fadein 0.5s, fadeout 0.5s 2.5s;
\n    }\n\n    /* Animations for fading in and out */\n    @-webkit-keyframes fadein {\n      from {bottom: 0;
 opacity: 0;
}\n      to {bottom: 30px;
 opacity: 1;
}\n    }\n\n    @keyframes fadein {\n      from {bottom: 0;
 opacity: 0;
}\n      to {bottom: 30px;
 opacity: 1;
}\n    }\n\n    @-webkit-keyframes fadeout {\n      from {bottom: 30px;
 opacity: 1;
}\n      to {bottom: 0;
 opacity: 0;
}\n    }\n\n    @keyframes fadeout {\n      from {bottom: 30px;
 opacity: 1;
}\n      to {bottom: 0;
 opacity: 0;
}\n    }\n\n    </style>\n    `,t=document.createElement("style");
t.innerHTML=e,document.body.appendChild(t);
let n=document.createElement("link");
n.rel="preconnect",n.href="https://fonts.googleapis.com";
let a=document.createElement("link");
a.rel="preconnect",a.href="https://fonts.gstatic.com",a.crossOrigin="true";
let i=document.createElement("link");
i.href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap",i.rel="stylesheet",document.body.appendChild(n),document.body.appendChild(a),document.body.appendChild(i);
let s=document.createElement("link");
s.rel="stylesheet",s.href="https://cdn.jsdelivr.net/npm/range-slider-element@2/dist/range-slider-element.css",document.body.appendChild(s)}findUser()}
function onMessage(e){if("https://www.mercadolivre.com.br"===e.origin){var t=e.data;
"function"==typeof window[t.func]&&window[t.func].call(null,t.message)}}
function iframeCall(e){try{localStorage.setItem("lastquote",e)}catch(e){}}document.addEventListener("MetrifyVersion",(function(e){""!=e.detail&&null!=e.detail&&null!=e.detail&&(mfy_version=e.detail,document.removeEventListener("MetrifyVersion",(function(e){})))})),window.addEventListener?window.addEventListener("message",onMessage,!1):window.attachEvent&&window.attachEvent("onmessage",onMessage,!1),window.addEventListener("load",(async()=>{for(document.dispatchEvent(new CustomEvent("GetProductData",{detail:{itemIds:[]}}));
!window.dayjs;
)await new Promise((e=>setTimeout(e,200)));
mfyStart()})),0===window.location.href.indexOf("https://www.mercadolivre.com.br/")&&parent.postMessage({func:"iframeCall",message:document.body.innerText},"*");
